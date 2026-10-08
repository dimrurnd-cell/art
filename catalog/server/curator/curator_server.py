#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Куратор выставки «Арт-Ростов» — маленькая служба на сервере, которая
отвечает на вопросы посетителей нейросетью GigaChat.

Зачем отдельная служба: сайт выставки на Tilda, а Tilda не выполняет код на
сервере. Ключ GigaChat в браузер класть нельзя (его сразу украдут), поэтому
он живёт здесь, на сервере со статикой каталога. nginx передаёт сюда адрес
https://<сервер>/api/artcatalog/curator/…, страница на Tilda спрашивает его.

    POST /api/artcatalog/curator/ask/   {"q": "вопрос", "history": [{"q":..,"a":..}], "mode": "3d"|"simple"}
         → {"answer": "...", "source": "faq"|"ai"|"fallback"}
    GET  /api/artcatalog/curator/ping   → {"ok": true, "ai": true|false, ...} — проверка

Порядок ответа: готовый ответ (curator/faq.json), если вопрос явно про него;
иначе GigaChat со сведениями о выставке (curator/kb.md) и данными художников
(artists.json); нейросеть недоступна — ближайший готовый ответ или вежливое
«уточните у организаторов». faq.json, kb.md и artists.json перечитываются
раз в 5 минут — правки доезжают без перезапуска.

Только стандартная библиотека: Python 3.6+ или 2.7 (CentOS 7 — там из
коробки только он). Настройки — переменные окружения
(в systemd — файл /etc/artcatalog-curator.env, см. curator.env.example):

    GIGACHAT_KEY        «Ключ авторизации» из личного кабинета GigaChat (Base64)
    GIGACHAT_SCOPE      GIGACHAT_API_PERS (физлицо) | GIGACHAT_API_B2B | GIGACHAT_API_CORP
    GIGACHAT_MODEL      GigaChat-3-Ultra (список доступных ключу — в выводе --check)
    GIGACHAT_URL        https://api.giga.chat/v1
    GIGACHAT_AUTH_URL   https://ngw.devices.sberbank.ru:9443/api/v2/oauth
    GIGACHAT_CA         путь к корневому сертификату НУЦ Минцифры (PEM)
    CURATOR_STATIC      папка статики каталога (там artists.json и curator/)
    CURATOR_ORIGINS     сайты, с которых можно спрашивать, через запятую
    CURATOR_NAME        имя куратора (Татьяна)
    CURATOR_HOST, CURATOR_PORT   где слушать (по умолчанию 127.0.0.1:8765)
    CURATOR_RATE=20, CURATOR_WINDOW=3600   вопросов с одного адреса в час
    CURATOR_DAILY=3000  вопросов к нейросети в сутки на весь сайт
    Голос ответов — Яндекс SpeechKit (API v3), без ключа озвучку делает устройство посетителя:
    YANDEX_TTS_KEY      секретный API-ключ сервисного аккаунта (роль ai.speechkit-tts.user)
    YANDEX_TTS_VOICE=vera, YANDEX_TTS_ROLE=casual, YANDEX_TTS_MODEL=livetts
    YANDEX_TTS_DIR      где хранить готовые mp3 (по умолчанию ~/.cache/artcatalog-voice)
    YANDEX_TTS_DAILY=1500   синтезов в сутки (повторы из файлов не считаются)

Проверка ключа и сертификата без nginx и браузера (ключ читается из файла,
а не из командной строки — в списке процессов его не видно):
    sudo python3 curator_server.py --check --env /etc/artcatalog-curator.env
(на CentOS 7 без Python 3 — /usr/bin/python вместо python3)
"""
from __future__ import print_function, unicode_literals

import base64
import hashlib
import hmac
import io
import json
import os
import re
import ssl
import sys
import threading
import time
import uuid

try:  # Python 3
    from http.server import BaseHTTPRequestHandler, HTTPServer
    from socketserver import ThreadingMixIn
    from urllib.parse import urlencode, quote, urlparse, parse_qs
    from urllib.request import Request, urlopen
except ImportError:  # Python 2.7
    from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
    from SocketServer import ThreadingMixIn
    from urllib import urlencode, quote
    from urllib2 import Request, urlopen
    from urlparse import urlparse, parse_qs

PY2 = sys.version_info[0] == 2
TEXT = type("")          # str в Python 3, unicode в 2.7


def txt(x):
    """Текст из чего угодно (в 2.7 байты и исключения — отдельно)"""
    if isinstance(x, TEXT):
        return x
    if isinstance(x, bytes):
        return x.decode("utf-8", "replace")
    try:
        return TEXT(x)
    except Exception:
        return repr(x)


def out(stream, line):
    """Строка в журнал или на экран: в 2.7 — байтами UTF-8, иначе кириллица роняет запись"""
    stream.write(line.encode("utf-8") if PY2 else line)
    stream.flush()


def say(*parts):
    out(sys.stdout, " ".join(txt(p) for p in parts) + "\n")


def request(url, data, headers):
    """Запрос наружу. В 2.7 адрес и заголовки — байтовые строки: иначе httplib
    склеивает юникодный заголовок с телом в UTF-8 и падает на кириллице"""
    if PY2:
        n = lambda v: v.encode("utf-8") if isinstance(v, TEXT) else v
        url = n(url)
        headers = dict((n(k), n(v)) for k, v in headers.items())
    return Request(url, data=data, headers=headers)


def to_json(obj):
    body = json.dumps(obj, ensure_ascii=False)
    return body.encode("utf-8") if isinstance(body, TEXT) else body



def env_file(argv):
    """--env ФАЙЛ: настройки из файла в формате systemd (ИМЯ=значение, # — комментарий)"""
    if "--env" not in argv:
        return
    path = argv[argv.index("--env") + 1]
    with io.open(path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            k, v = k.strip(), v.strip().strip('"').strip("'")
            if PY2:
                k, v = k.encode("utf-8"), v.encode("utf-8")
            os.environ[k] = v


env_file(sys.argv)


def E(name, default=""):
    v = os.environ.get(name)
    return default if v is None else txt(v)

KEY = E("GIGACHAT_KEY", "").strip()
SCOPE = E("GIGACHAT_SCOPE", "GIGACHAT_API_PERS")
MODEL = E("GIGACHAT_MODEL", "GigaChat-3-Ultra")
API = E("GIGACHAT_URL", "https://api.giga.chat/v1").rstrip("/")
AUTH = E("GIGACHAT_AUTH_URL", "https://ngw.devices.sberbank.ru:9443/api/v2/oauth")
CA = E("GIGACHAT_CA", "")
STATIC = E("CURATOR_STATIC", "/home/develop/donexpo/static/artcatalog")
ORIGINS = [o.strip().rstrip("/") for o in E("CURATOR_ORIGINS", ",".join([
    "https://monthly-delicious-mirror.tilda.ws",
    "https://xn----7sbh1cajbjfe.xn--p1ai",          # арт-ростов.рф
    "https://www.xn----7sbh1cajbjfe.xn--p1ai",
    "https://donexpocentre.ru",
])).split(",") if o.strip()]
NAME = E("CURATOR_NAME", "Татьяна")
HOST = E("CURATOR_HOST", "127.0.0.1")
PORT = int(E("CURATOR_PORT", "8765"))
RATE = int(E("CURATOR_RATE", "20"))
WINDOW = int(E("CURATOR_WINDOW", "3600"))
DAILY = int(E("CURATOR_DAILY", "3000"))

TTS_KEY = E("YANDEX_TTS_KEY", "").strip()
TTS_VOICE = E("YANDEX_TTS_VOICE", "vera")
TTS_ROLE = E("YANDEX_TTS_ROLE", "casual")
TTS_MODEL = E("YANDEX_TTS_MODEL", "livetts")
TTS_URL = E("YANDEX_TTS_URL", "https://tts.api.cloud.yandex.net/tts/v3/utteranceSynthesis")
TTS_DIR = os.path.expanduser(E("YANDEX_TTS_DIR", "~/.cache/artcatalog-voice"))
TTS_DAILY = int(E("YANDEX_TTS_DAILY", "1500"))
# подпись ссылок на озвучку: озвучить можно только то, что ответила служба
TTS_SECRET = hashlib.sha256(("artcatalog-voice:" + TTS_KEY).encode("utf-8")).digest()

Q_MAX = 300          # вопрос длиннее не принимаем
ANSWER_MAX = 600     # ответ длиннее обрезаем
BODY_MAX = 16384

FALLBACK = "Хороший вопрос! Точно ответят организаторы выставки — напишите на ads@donexpocentre.ru, и Вам подскажут."


def log(*parts):
    out(sys.stderr, txt(time.strftime("%Y-%m-%d %H:%M:%S ")) + " ".join(txt(p) for p in parts) + "\n")


# ---------------- данные ----------------

_data = {"t": 0}
_lock = threading.Lock()


def _read(path, parse, default):
    try:
        with open(path, "rb") as f:
            return parse(f.read().decode("utf-8"))
    except Exception as e:
        log("не прочитать", path, "—", e)
        return default


def load():
    """faq.json, kb.md и художники; перечитываются раз в 5 минут"""
    with _lock:
        if time.time() - _data["t"] < 300:
            return _data
        cur = os.path.join(STATIC, "curator")
        _data.update(
            t=time.time(),
            faq=_read(os.path.join(cur, "faq.json"), json.loads, {"items": []}),
            kb=_read(os.path.join(cur, "kb.md"), lambda s: s, ""),
            artists=_read(os.path.join(STATIC, "artists.json"), json.loads, {"artists": [], "sections": []}),
        )
        return _data


# ---------------- готовые ответы (как в catalog.js) ----------------

def norm(text):
    text = (text or "").lower().replace("ё", "е")
    return re.sub(r"[^0-9a-zа-я]+", " ", text).strip()


def stem(word):
    # грубая основа слова: «билеты» и «билетов» совпадут
    return word[:max(4, len(word) - 2)] if len(word) > 5 else word


def words(text):
    return set(stem(w) for w in norm(text).split() if len(w) > 1)


def same(a, b):
    """Короткие слова — только точно («вы», «где»), длинные — по основе"""
    if a == b:
        return True
    if len(a) < 4 or len(b) < 4:
        return False
    return a.startswith(b) or b.startswith(a)


def has(ws, part):
    return any(same(w, part) for w in ws)


# общие слова в названиях участников («Картины с посланием», «Мастерская
# Художника»): по ним художника не узнаём
COMMON = ("карти", "худож", "галер", "студи", "мастер", "школ", "творч", "объед", "искус",
          "салон", "центр", "клуб", "союз", "ассоц", "проект", "арт", "art", "gallery")


def name_match(w, t):
    """Фамилия в другом падеже: «Шитовой» — «Шитова», но «Ростове» — не «Ростовцева»"""
    if w == t:
        return True
    n = min(len(w), len(t))
    if n < 4 or abs(len(w) - len(t)) > 2:
        return False
    k = max(4, n - 1)
    return w[:k] == t[:k]


def name_tokens(name):
    return [t for t in norm(name).split() if len(t) >= 4 and not any(t.startswith(c) for c in COMMON)]


def artist_named(q):
    ws = [w for w in norm(q).split() if len(w) >= 4]
    for a in load()["artists"].get("artists", []):
        for t in name_tokens(a.get("name", "")):
            if any(name_match(w, t) for w in ws):
                return True
    return False


def faq_match(q):
    """(лучший готовый ответ, уверенно ли). Уверенно — одна тема или у лучшей
    больше совпавших ключей, чем у второй, и в вопросе нет фамилии художника
    («где работы Шитовой» — не про адрес выставки)"""
    ws = words(q)
    hits = []
    for item in load()["faq"].get("items", []):
        n = 0
        for k in item.get("keys") or []:
            parts = [stem(p) for p in norm(k).split() if len(p) > 1]
            if parts and all(has(ws, p) for p in parts):
                n += 1
        if n:
            hits.append((n, item))
    if not hits:
        return None, False
    hits.sort(key=lambda x: -x[0])
    sure = len(hits) == 1 or hits[0][0] > hits[1][0]
    if sure and artist_named(q):
        sure = False
    return hits[0][1], sure


def faq_answer(item, mode):
    return (mode == "simple" and item.get("a_simple")) or item.get("a")


def artists_context(q):
    """Художники, о которых, похоже, спрашивают, — до 4, с биографией и
    работами; остальные — только список (чтобы знать, кто есть)"""
    data = load()["artists"]
    sections = dict((s.get("id"), s.get("title")) for s in data.get("sections", []))
    ws = [w for w in norm(q).split() if len(w) >= 4]
    stems = [w for w in words(q) if len(w) >= 4]
    scored = []
    for a in data.get("artists", []):
        s = 3 * sum(1 for t in name_tokens(a.get("name", "")) if any(name_match(w, t) for w in ws))
        other = words(" ".join([a.get("city") or ""] + [w.get("title") or "" for w in a.get("works", [])]))
        s += sum(1 for t in other if len(t) >= 4 and has(stems, t))
        if s >= 3:
            scored.append((s, a))
    scored.sort(key=lambda x: -x[0])
    lines = []
    for _, a in scored[:4]:
        titles = [w.get("title") for w in a.get("works", []) if w.get("title")]
        lines.append("- %s (%s, раздел «%s»). %s Работы: %s." % (
            a.get("name"), a.get("city") or "город не указан", sections.get(a.get("section"), ""),
            (a.get("bio") or "")[:700], ", ".join(titles[:8]) or "названия не указаны"))
    names = "; ".join("%s (%s)" % (a.get("name"), a.get("city") or "") for a in data.get("artists", []))
    return "\n".join(lines), names


# ---------------- GigaChat ----------------

def ssl_ctx():
    # системные корневые сертификаты плюс сертификат НУЦ Минцифры: серверы
    # GigaChat подписаны им, а другие могут быть подписаны обычными центрами
    ctx = ssl.create_default_context()
    if CA:
        ctx.load_verify_locations(cafile=CA)
    return ctx


def fetch(req, timeout):
    try:
        return urlopen(req, timeout=timeout, context=ssl_ctx())
    except TypeError:        # очень старый Python 2.7 без параметра context
        return urlopen(req, timeout=timeout)


_token = {"value": None, "exp": 0}
_token_lock = threading.Lock()


def gigachat_token():
    with _token_lock:
        if _token["value"] and _token["exp"] - 60 > time.time():
            return _token["value"]
        req = request(AUTH, urlencode({"scope": SCOPE}).encode("utf-8"), {
            "Authorization": "Basic " + KEY,
            "RqUID": str(uuid.uuid4()),
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
        })
        data = json.loads(fetch(req, 8).read().decode("utf-8"))
        _token["value"] = data.get("access_token") or data.get("tok")
        exp = data.get("expires_at") or data.get("exp") or 0
        _token["exp"] = exp / 1000.0 if exp > 1e11 else (exp or time.time() + 1500)
        return _token["value"]


SYSTEM = (
    "Вы — %s выставки современного искусства «Арт-Ростов». Вы стоите у входа "
    "в залы виртуальной галереи на сайте выставки и отвечаете посетителям. Отвечайте по-русски, "
    "на «Вы», доброжелательно и коротко: 1–3 предложения, не длиннее 280 символов, без списков "
    "и без markdown. Говорите только о выставке, художниках и их работах, искусстве, покупке "
    "картин и посещении. Опирайтесь только на сведения ниже; чего в них нет — не выдумывайте "
    "(цены, даты, телефоны, имена), а предложите уточнить у организаторов. На посторонние темы "
    "вежливо возвращайте разговор к выставке. Сравнивайте даты выставки с сегодняшней: "
    "если выставка ещё не началась — говорите о ней в будущем времени, если идёт — в настоящем. "
    "Не называйте себя нейросетью, но если прямо "
    "спросят — честно скажите, что вы виртуальный помощник куратора."
) % (("%s, куратор" % NAME) if NAME else "куратор")

MODES = {
    "3d": "Посетитель сейчас в 3D-галерее.",
    "simple": "Посетитель сейчас в простом режиме (стена с работами без 3D).",
}


MONTHS = ("января", "февраля", "марта", "апреля", "мая", "июня", "июля",
          "августа", "сентября", "октября", "ноября", "декабря")


def today():
    """Сегодняшняя дата словами: без неё нейросеть говорит о выставке в прошедшем времени"""
    t = time.localtime()
    return "%d %s %d года" % (t.tm_mday, MONTHS[t.tm_mon - 1], t.tm_year)


def ask_ai(q, history, mode):
    d = load()
    found, names = artists_context(q)
    context = "Сегодня %s. %s\n\nСВЕДЕНИЯ О ВЫСТАВКЕ:\n%s\n\nХУДОЖНИКИ НА ВЫСТАВКЕ: %s" % (today(), MODES[mode], d["kb"], names)
    if found:
        context += "\n\nПОДРОБНО О ХУДОЖНИКАХ ИЗ ВОПРОСА:\n" + found
    messages = [{"role": "system", "content": SYSTEM + "\n\n" + context}]
    for h in history[-2:]:
        messages += [{"role": "user", "content": h["q"][:Q_MAX]}, {"role": "assistant", "content": h["a"][:ANSWER_MAX]}]
    messages.append({"role": "user", "content": q})
    body = json.dumps({"model": MODEL, "messages": messages, "temperature": 0.3, "max_tokens": 220,
                       "profanity_check": True}, ensure_ascii=False)
    if isinstance(body, TEXT):
        body = body.encode("utf-8")
    req = request(API + "/chat/completions", body, {
        "Authorization": "Bearer " + gigachat_token(),
        "Content-Type": "application/json",
        "Accept": "application/json",
    })
    # страница ждёт ответа 20 с, потом отвечает сама готовыми ответами
    data = json.loads(fetch(req, 17).read().decode("utf-8"))
    text = data["choices"][0]["message"]["content"].strip()
    text = re.sub(r"[*_#`>]+", "", text)               # без markdown
    return text[:ANSWER_MAX]


# ---------------- голос: Яндекс SpeechKit ----------------

def voice_id(text):
    msg = ("%s|%s|%s|%s" % (TTS_MODEL, TTS_VOICE, TTS_ROLE, text)).encode("utf-8")
    return hmac.new(TTS_SECRET, msg, hashlib.sha256).hexdigest()[:32]


def voice_link(text):
    """Ссылка на mp3 с ответом (относительно адреса куратора) или None"""
    if not TTS_KEY or not text:
        return None
    return "voice/%s.mp3?t=%s" % (voice_id(text), quote(text.encode("utf-8"), safe=str("")))


def synthesize(text):
    """mp3 голосом из настроек. Ответ API v3 — строки JSON с кусками аудио в Base64"""
    body = json.dumps({
        "text": text,
        "hints": [{"voice": TTS_VOICE}, {"role": TTS_ROLE}],
        "model": TTS_MODEL,
        "outputAudioSpec": {"containerAudio": {"containerAudioType": "MP3"}},
    }, ensure_ascii=False)
    if isinstance(body, TEXT):
        body = body.encode("utf-8")
    req = request(TTS_URL, body, {"Authorization": "Api-Key " + TTS_KEY, "Content-Type": "application/json"})
    raw = fetch(req, 20).read().decode("utf-8")
    audio = b""
    for line in raw.splitlines():
        line = line.strip()
        if not line:
            continue
        obj = json.loads(line)
        if "error" in obj:
            raise RuntimeError("SpeechKit: %s" % txt(obj["error"]))
        chunk = ((obj.get("result") or obj).get("audioChunk") or {}).get("data")
        if chunk:
            audio += base64.b64decode(chunk)
    if not audio:
        raise RuntimeError("SpeechKit не вернул звук: %s" % raw[:200])
    return audio


_voice_lock = threading.Lock()


def voice_file(vid, text):
    """Путь к mp3: из кеша на диске, иначе синтез (с лимитом в сутки)"""
    path = os.path.join(TTS_DIR, vid + ".mp3")
    if os.path.exists(path):
        return path
    if not store.tts_budget():
        raise RuntimeError("исчерпан суточный лимит озвучки (YANDEX_TTS_DAILY)")
    audio = synthesize(text)
    with _voice_lock:
        if not os.path.isdir(TTS_DIR):
            os.makedirs(TTS_DIR)
        tmp = path + ".tmp"
        with open(tmp, "wb") as f:
            f.write(audio)
        os.rename(tmp, path)
    return path


# ---------------- ограничения и кеш (в памяти процесса) ----------------

class Store:
    def __init__(self):
        self.lock = threading.Lock()
        self.hits = {}        # адрес → [время вопроса, …]
        self.day = ("", 0)    # (дата, вопросов к нейросети)
        self.tts_day = ("", 0)
        self.answers = {}     # ключ вопроса → (время, ответ)
        self.last_error = ""
        self.down_until = 0   # нейросеть сбоила — минуту её не спрашиваем
        self.fails = 0        # ошибок нейросети подряд

    def allow(self, ip):
        now = time.time()
        with self.lock:
            h = [t for t in self.hits.get(ip, []) if now - t < WINDOW]
            ok = len(h) < RATE
            if ok:                # отказ не считаем: иначе список растёт без конца,
                h.append(now)     # а настойчивый посетитель заблокирован навсегда
            self.hits[ip] = h
            if len(self.hits) > 20000:                    # не копить вечно
                self.hits = dict((k, v) for k, v in self.hits.items() if v and now - v[-1] < WINDOW)
            return ok

    def ai_budget(self):
        today = time.strftime("%Y%m%d")
        with self.lock:
            d, n = self.day
            n = n + 1 if d == today else 1
            self.day = (today, n)
            return n <= DAILY

    def tts_budget(self):
        today = time.strftime("%Y%m%d")
        with self.lock:
            d, n = self.tts_day
            n = n + 1 if d == today else 1
            self.tts_day = (today, n)
            return n <= TTS_DAILY

    def cached(self, key):
        with self.lock:
            v = self.answers.get(key)
            return v[1] if v and time.time() - v[0] < 86400 else None

    def remember(self, key, answer):
        with self.lock:
            if len(self.answers) > 5000:
                self.answers.clear()
            self.answers[key] = (time.time(), answer)


store = Store()


def answer(q, history, mode):
    faq = load()["faq"]
    item, sure = faq_match(q)
    if item and sure:
        return "faq", faq_answer(item, mode)
    key = mode + ":" + hashlib.sha1(norm(q).encode("utf-8")).hexdigest()
    got = store.cached(key) if not history else None
    if got:
        return "ai", got
    if KEY and time.time() > store.down_until and store.ai_budget():
        try:
            got = ask_ai(q, history, mode)
            # в общий кеш — только ответы без истории: историю присылает сам
            # посетитель, и подложной историей можно было бы «научить» куратора
            # отвечать что угодно — всем, кто спросит то же самое
            if not history:
                store.remember(key, got)
            store.last_error = ""
            store.fails = 0
            return "ai", got
        except Exception as e:
            store.last_error = "%s: %s" % (type(e).__name__, txt(e))
            code = getattr(e, "code", None)
            if code == 401:
                _token["value"] = None                     # токен отозван — получим новый
            store.fails += 1
            # сеть, перегрузка, 5xx — даём нейросети минуту. Ошибка 4xx бывает
            # из-за самого вопроса: из-за одного посетителя ИИ не выключаем
            client_err = isinstance(code, int) and 400 <= code < 500 and code != 429
            if not client_err or store.fails >= 3:
                store.down_until = time.time() + 60
            log("нейросеть не ответила —", store.last_error)
    if item:
        return "faq", faq_answer(item, mode)
    return "fallback", faq.get("fallback") or FALLBACK


# ---------------- HTTP ----------------

class Handler(BaseHTTPRequestHandler):
    server_version = "artcatalog-curator"

    def log_message(self, fmt, *args):
        pass                                          # свой журнал — в answer/ask

    def ip(self):
        # служба слушает только 127.0.0.1: заголовки ставит наш nginx
        return (self.headers.get("X-Real-IP") or (self.headers.get("X-Forwarded-For") or "").split(",")[0].strip()
                or self.client_address[0])

    def send(self, code, obj=None, raw=None, ctype=None, cache=None):
        body = raw if raw is not None else (to_json(obj) if obj is not None else b"")
        self.send_response(code)
        origin = (self.headers.get("Origin") or "").rstrip("/")
        if origin and (origin in ORIGINS or "*" in ORIGINS):
            self.send_header("Access-Control-Allow-Origin", origin)
            self.send_header("Vary", "Origin")
            self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type")
            self.send_header("Access-Control-Max-Age", "86400")
        if ctype or obj is not None:
            self.send_header("Content-Type", ctype or "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", cache or "no-store")
        self.end_headers()
        if body:
            self.wfile.write(body)

    def do_OPTIONS(self):
        self.send(204)

    def do_GET(self):
        if self.path.rstrip("/").endswith("/ping"):
            d = load()
            self.send(200, {"ok": True, "ai": bool(KEY), "voice": bool(TTS_KEY), "faq": len(d["faq"].get("items", [])),
                            "artists": len(d["artists"].get("artists", [])), "kb": len(d["kb"]),
                            "last_error": store.last_error})
        elif "/voice/" in self.path:
            self.voice()
        else:
            self.send(404, {"error": "not found"})

    def voice(self):
        u = urlparse(self.path)
        m = re.search(r"/voice/([0-9a-f]{32})\.mp3$", u.path)
        text = txt((parse_qs(u.query).get("t") or [""])[0])
        if PY2 and not isinstance(text, TEXT):
            text = text.decode("utf-8")
        if not TTS_KEY or not m or not text or len(text) > 700 or not getattr(hmac, 'compare_digest', lambda x, y: x == y)(m.group(1), voice_id(text)):
            self.send(404, {"error": "not found"})
            return
        try:
            path = voice_file(m.group(1), text)
        except Exception as e:
            store.last_error = "озвучка: %s: %s" % (type(e).__name__, txt(e))
            log(store.last_error)
            self.send(502, {"error": "озвучка недоступна"})
            return
        with open(path, "rb") as f:
            self.send(200, raw=f.read(), ctype="audio/mpeg", cache="public, max-age=604800")

    def do_POST(self):
        if not self.path.split("?")[0].rstrip("/").endswith("/ask"):
            self.send(404, {"error": "not found"})
            return
        try:
            n = int(self.headers.get("Content-Length") or 0)
            if n < 0 or n > BODY_MAX:
                raise ValueError("слишком длинно")
            data = json.loads(self.rfile.read(n).decode("utf-8"))
            if not isinstance(data, dict):
                raise ValueError("не объект")
        except (ValueError, UnicodeDecodeError):
            self.send(400, {"error": "Некорректный запрос."})
            return
        q = re.sub(r"\s+", " ", txt(data.get("q") or "")).strip()[:Q_MAX]
        if len(q) < 2:
            self.send(400, {"error": "Задайте вопрос."})
            return
        history = data.get("history") if isinstance(data.get("history"), list) else []
        history = [h for h in history if isinstance(h, dict) and isinstance(h.get("q"), TEXT) and isinstance(h.get("a"), TEXT)
                   and h["q"].strip() and h["a"].strip()][-2:]
        mode = "simple" if data.get("mode") == "simple" else "3d"
        ip = self.ip()
        if not store.allow(ip):
            self.send(429, {"error": "Давайте немного передохнём — спросите чуть позже."})
            return
        source, text = answer(q, history, mode)
        log("вопрос [%s, %s]: %s" % (source, mode, q[:200]))
        self.send(200, {"answer": text, "source": source, "voice": voice_link(text)})


class Server(ThreadingMixIn, HTTPServer):
    daemon_threads = True
    allow_reuse_address = True


def check():
    """Самопроверка: файлы на месте, ключ и сертификат работают"""
    ok = True
    d = load()
    say("статика:", STATIC)
    say("  готовых ответов:", len(d["faq"].get("items", [])), "| kb.md:", len(d["kb"]), "символов",
          "| художников:", len(d["artists"].get("artists", [])))
    if not d["faq"].get("items") or not d["artists"].get("artists"):
        say("  ✗ не нашлись faq.json или artists.json — проверьте CURATOR_STATIC")
        ok = False
    if not KEY:
        say("✗ GIGACHAT_KEY не задан — куратор будет отвечать только готовыми ответами")
        return False
    say("сертификат:", CA or "(только системные)", "— есть" if (not CA or os.path.exists(CA)) else "— ФАЙЛА НЕТ")
    try:
        gigachat_token()
        say("✓ ключ принят, токен получен (scope %s)" % SCOPE)
    except Exception as e:
        say("✗ токен не получен:", type(e).__name__, txt(e))
        t = txt(e)
        if "CERTIFICATE_VERIFY_FAILED" in t:
            say("  → сервер не доверяет сертификату Сбера: скачайте корневой сертификат НУЦ Минцифры и укажите его в GIGACHAT_CA")
        elif "401" in t or "400" in t or "403" in t:
            say("  → неверный ключ или scope: ключ — строка «Ключ авторизации» целиком; для юрлица scope GIGACHAT_API_B2B/CORP")
        else:
            say("  → нет связи с ngw.devices.sberbank.ru:9443: проверьте, что серверу разрешены исходящие соединения на порт 9443")
        return False
    try:
        req = request(API + "/models", None, {"Authorization": "Bearer " + gigachat_token(), "Accept": "application/json"})
        ids = [m.get("id") for m in json.loads(fetch(req, 8).read().decode("utf-8")).get("data", [])]
        say("  модели, доступные ключу:", ", ".join(i for i in ids if i) or "—")
        say("  выбрана:", MODEL, "✓" if MODEL in ids else "✗ НЕТ В СПИСКЕ — впишите в GIGACHAT_MODEL одну из моделей выше")
    except Exception as e:
        say("  список моделей не получен:", type(e).__name__, txt(e))
    try:
        a = ask_ai("Когда и где проходит выставка?", [], "3d")
        say("✓ GigaChat ответил:", a)
    except Exception as e:
        say("✗ GigaChat не ответил:", type(e).__name__, txt(e))
        ok = False
    return ok


def check_voice():
    if not TTS_KEY:
        say("голос: YANDEX_TTS_KEY не задан — ответы озвучивает устройство посетителя")
        return True
    say("голос: Яндекс SpeechKit, %s / %s / %s; файлы — %s" % (TTS_VOICE, TTS_ROLE, TTS_MODEL, TTS_DIR))
    try:
        t = "Добро пожаловать на виртуальную выставку! Меня зовут Татьяна."
        path = voice_file(voice_id(t), t)
        say("✓ голос готов: %s (%d КБ)" % (path, os.path.getsize(path) // 1024))
        return True
    except Exception as e:
        say("✗ озвучка не получилась:", type(e).__name__, txt(e))
        t = txt(e)
        if "401" in t or "403" in t:
            say("  → ключ не подходит: нужен секретный ключ сервисного аккаунта с ролью ai.speechkit-tts.user")
        elif "Permission" in t or "denied" in t or "Errno 13" in t:
            say("  → нет прав на папку для mp3: укажите YANDEX_TTS_DIR, куда может писать пользователь службы")
        return False


def main():
    if "--check" in sys.argv:
        ok = check()
        ok = check_voice() and ok
        sys.exit(0 if ok else 1)
    load()
    srv = Server((str(HOST), PORT), Handler)
    log("куратор слушает %s:%d; нейросеть %s; голос %s; сайты: %s" % (HOST, PORT, "включена" if KEY else "ВЫКЛЮЧЕНА (нет GIGACHAT_KEY)",
        ("Яндекс, " + TTS_VOICE) if TTS_KEY else "устройства", ", ".join(ORIGINS)))
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
