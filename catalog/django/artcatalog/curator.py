# -*- coding: utf-8 -*-
"""
Виртуальный куратор выставки «Арт-Ростов»: ответы на вопросы посетителей.
Ответ показывается текстом в облачке рядом с фигурой куратора.

POST /api/artcatalog/curator/ask/    {"q": "вопрос", "history": [{"q":..,"a":..}], "mode": "3d"|"simple"}
     → {"answer": "...", "source": "faq"|"ai"|"fallback"}

Порядок ответа: готовый ответ (faq.json), если вопрос явно про него; иначе
нейросеть GigaChat с базой знаний (kb.md + данные художников); если
нейросеть недоступна — ближайший готовый ответ или вежливое «уточните у
организаторов».

Совместимо с Django 1.8+ и Python 2.7/3.x, только стандартная библиотека.

Настройки (settings.py):
    ARTCATALOG_CURATOR_DIR        — папка static/artcatalog/curator с faq.json и kb.md
                                    (по умолчанию STATIC_ROOT/artcatalog/curator)
    ARTCATALOG_ARTISTS_JSON       — путь к artists.json (по умолчанию STATIC_ROOT/artcatalog/artists.json)
    ARTCATALOG_CORS_ORIGINS       — сайты, с которых можно спрашивать (страница на Tilda)
    ARTCATALOG_CURATOR_NAME       — имя куратора (необязательно; без него — «куратор выставки»)
    GigaChat:
    ARTCATALOG_GIGACHAT_KEY       — «Ключ авторизации» из личного кабинета (Base64)
    ARTCATALOG_GIGACHAT_SCOPE     = "GIGACHAT_API_PERS"
    ARTCATALOG_GIGACHAT_MODEL     = "GigaChat-2"
    ARTCATALOG_GIGACHAT_URL       = "https://api.giga.chat/v1"
    ARTCATALOG_GIGACHAT_CA        — путь к корневому сертификату НУЦ Минцифры (если нужен)
    Ограничения:
    ARTCATALOG_CURATOR_RATE       = 20      # вопросов с одного IP…
    ARTCATALOG_CURATOR_WINDOW     = 3600    # …в час
    ARTCATALOG_CURATOR_DAILY      = 3000    # вопросов к нейросети в сутки на весь сайт
"""
from __future__ import unicode_literals

import hashlib
import json
import logging
import os
import re
import ssl
import time
import uuid

from django.conf import settings
from django.core.cache import cache
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

try:  # Python 3
    from urllib.request import Request, urlopen
    from urllib.parse import urlencode
except ImportError:  # Python 2.7
    from urllib2 import Request, urlopen
    from urllib import urlencode

logger = logging.getLogger("artcatalog.curator")


def _s(name, default=None):
    return getattr(settings, name, default)


STATIC_ROOT = _s("STATIC_ROOT") or ""
CURATOR_DIR = _s("ARTCATALOG_CURATOR_DIR") or os.path.join(STATIC_ROOT, "artcatalog", "curator")
ARTISTS_JSON = _s("ARTCATALOG_ARTISTS_JSON") or os.path.join(STATIC_ROOT, "artcatalog", "artists.json")
CORS_ORIGINS = _s("ARTCATALOG_CORS_ORIGINS", [
    "https://monthly-delicious-mirror.tilda.ws",
    "https://xn----7sbh1cajbjfe.xn--p1ai",       # арт-ростов.рф
    "https://donexpocentre.ru",
])

RATE = _s("ARTCATALOG_CURATOR_RATE", 20)
WINDOW = _s("ARTCATALOG_CURATOR_WINDOW", 3600)
DAILY = _s("ARTCATALOG_CURATOR_DAILY", 3000)

Q_MAX = 300          # вопрос длиннее не принимаем
ANSWER_MAX = 600     # ответ длиннее обрезаем


# ---------------- общие мелочи ----------------

def _cors(request, response):
    origin = request.META.get("HTTP_ORIGIN", "")
    if origin in CORS_ORIGINS or "*" in CORS_ORIGINS:
        response["Access-Control-Allow-Origin"] = origin or "*"
        response["Vary"] = "Origin"
        response["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        response["Access-Control-Max-Age"] = "86400"
    return response


def _client_ip(request):
    xff = request.META.get("HTTP_X_FORWARDED_FOR")
    if xff:
        return xff.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR", "unknown")


def _count(key, window):
    """Счётчик в кеше: сколько раз за окно (только cache.add/incr — Django 1.8)."""
    cache.add(key, 0, window)
    try:
        return cache.incr(key)
    except ValueError:
        cache.set(key, 1, window)
        return 1


def _norm(text):
    text = (text or "").lower().replace("ё", "е")
    return re.sub(r"[^0-9a-zа-я]+", " ", text).strip()


def _read_json(path, default):
    try:
        with open(path, "rb") as f:
            return json.loads(f.read().decode("utf-8"))
    except Exception:
        logger.warning("curator: не прочитать %s", path)
        return default


def _read_text(path):
    try:
        with open(path, "rb") as f:
            return f.read().decode("utf-8")
    except Exception:
        return ""


_data = {"t": 0}


def _load():
    """faq.json, kb.md и художники; перечитываются раз в 5 минут — правки
    в файлах доезжают без перезапуска сайта."""
    if time.time() - _data["t"] < 300:
        return _data
    faq = _read_json(os.path.join(CURATOR_DIR, "faq.json"), {"items": []})
    artists = _read_json(ARTISTS_JSON, {"artists": [], "sections": []})
    _data.update(t=time.time(), faq=faq, kb=_read_text(os.path.join(CURATOR_DIR, "kb.md")), artists=artists)
    return _data


def _stem(word):
    # грубая основа слова: без окончания — «билеты»/«билетов» совпадут
    return word[:max(4, len(word) - 2)] if len(word) > 5 else word


def _words(text):
    """Основы слов текста (однобуквенные — не в счёт)."""
    return set(_stem(w) for w in _norm(text).split() if len(w) > 1)


def _same(a, b):
    """Одно слово? Короткие — только точно («вы», «где»), длинные — по основе
    («Шитовой» и «Шитова», «билеты» и «билет»)."""
    if a == b:
        return True
    if len(a) < 4 or len(b) < 4:
        return False
    return a.startswith(b) or b.startswith(a)


def _has(words, part):
    return any(_same(w, part) for w in words)


# общие слова в названиях участников («Картины с посланием», «Мастерская
# Художника»): по ним художника не узнаём — иначе «как купить картину»
# считался бы вопросом о конкретном участнике
COMMON = ("карти", "худож", "галер", "студи", "мастер", "школ", "творч", "объед", "искус",
          "салон", "центр", "клуб", "союз", "ассоц", "проект", "арт", "art", "gallery")


def _name_words(name):
    return [t for t in _words(name) if len(t) >= 4 and not any(t.startswith(c) for c in COMMON)]


def _artist_named(q):
    """Упомянут ли в вопросе художник — по имени или фамилии (не по названиям
    работ: в них слишком много обычных слов)."""
    words = [w for w in _words(q) if len(w) >= 4]
    for a in _load()["artists"].get("artists", []):
        for t in _name_words(a.get("name", "")):
            if _has(words, t):
                return True
    return False


def _faq_match(q):
    """Готовые ответы, подходящие к вопросу: (лучший, уверенно ли).

    Ключ подходит, если все его слова есть в вопросе (по основам). Уверенно —
    когда подошла ровно одна тема или у лучшей совпало больше ключей, чем у
    второй. Если в вопросе есть фамилия художника, уверенности нет: «где
    висят работы Шитовой» — не про адрес выставки, пусть отвечает нейросеть."""
    words = _words(q)
    hits = []
    for item in _load()["faq"].get("items", []):
        n = 0
        for k in item.get("keys") or []:
            parts = [_stem(p) for p in _norm(k).split()]
            if parts and all(_has(words, p) for p in parts):
                n += 1
        if n:
            hits.append((n, item))
    if not hits:
        return None, False
    hits.sort(key=lambda x: -x[0])
    sure = len(hits) == 1 or hits[0][0] > hits[1][0]
    if sure and _artist_named(q):
        sure = False
    return hits[0][1], sure


def _artists_context(q):
    """Художники, о которых, похоже, спрашивают, — до 4, с биографией и
    работами; остальные — только список фамилий (чтобы знать, кто есть)."""
    data = _load()["artists"]
    sections = dict((s.get("id"), s.get("title")) for s in data.get("sections", []))
    words = [w for w in _words(q) if len(w) >= 4]
    scored = []
    for a in data.get("artists", []):
        name = _name_words(a.get("name", ""))
        other = [t for t in _words(" ".join([a.get("city", "")] + [w.get("title", "") for w in a.get("works", [])])) if len(t) >= 4]
        # имя весит больше города и названий работ
        s = 3 * sum(1 for t in name if _has(words, t)) + sum(1 for t in other if _has(words, t))
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

_token = {"value": None, "exp": 0}


def _ssl_ctx():
    ca = _s("ARTCATALOG_GIGACHAT_CA")
    return ssl.create_default_context(cafile=ca) if ca else ssl.create_default_context()


def _gigachat_token():
    if _token["value"] and _token["exp"] - 60 > time.time():
        return _token["value"]
    req = Request(
        "https://ngw.devices.sberbank.ru:9443/api/v2/oauth",
        data=urlencode({"scope": _s("ARTCATALOG_GIGACHAT_SCOPE", "GIGACHAT_API_PERS")}).encode("utf-8"),
        headers={
            "Authorization": "Basic %s" % _s("ARTCATALOG_GIGACHAT_KEY"),
            "RqUID": str(uuid.uuid4()),
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
        },
    )
    data = json.loads(urlopen(req, timeout=15, context=_ssl_ctx()).read().decode("utf-8"))
    _token["value"] = data.get("access_token") or data.get("tok")
    exp = data.get("expires_at") or data.get("exp") or 0
    _token["exp"] = exp / 1000.0 if exp > 1e11 else (exp or time.time() + 1500)
    return _token["value"]


NAME = _s("ARTCATALOG_CURATOR_NAME", "")   # имя куратора, если она хочет представляться

SYSTEM = (
    "Вы — %s выставки современного искусства «Арт-Ростов». Вы стоите у входа "
    "в залы виртуальной галереи на сайте выставки и отвечаете посетителям. Отвечайте по-русски, "
    "на «Вы», доброжелательно и коротко: 1–3 предложения, не длиннее 280 символов, без списков "
    "и без markdown. Говорите только о выставке, художниках и их работах, искусстве, покупке "
    "картин и посещении. Опирайтесь только на сведения ниже; чего в них нет — не выдумывайте "
    "(цены, даты, телефоны, имена), а предложите уточнить у организаторов. На посторонние темы "
    "вежливо возвращайте разговор к выставке. Не называйте себя нейросетью, но если прямо "
    "спросят — честно скажите, что вы виртуальный помощник куратора."
) % (("куратор %s," % NAME) if NAME else "куратор")


MODES = {
    "3d": "Посетитель сейчас в 3D-галерее.",
    "simple": "Посетитель сейчас в простом режиме (стена с работами без 3D).",
}


def _faq_answer(item, mode):
    return (mode == "simple" and item.get("a_simple")) or item.get("a")


def _ask_ai(q, history, mode):
    d = _load()
    kb = d["kb"]
    found, names = _artists_context(q)
    context = "%s\n\nСВЕДЕНИЯ О ВЫСТАВКЕ:\n%s\n\nХУДОЖНИКИ НА ВЫСТАВКЕ: %s" % (MODES[mode], kb, names)
    if found:
        context += "\n\nПОДРОБНО О ХУДОЖНИКАХ ИЗ ВОПРОСА:\n" + found
    messages = [{"role": "system", "content": SYSTEM + "\n\n" + context}]
    for h in history[-2:]:
        hq, ha = (h.get("q") or "")[:Q_MAX], (h.get("a") or "")[:ANSWER_MAX]
        if hq and ha:
            messages += [{"role": "user", "content": hq}, {"role": "assistant", "content": ha}]
    messages.append({"role": "user", "content": q})
    body = json.dumps({
        "model": _s("ARTCATALOG_GIGACHAT_MODEL", "GigaChat-2"),
        "messages": messages,
        "temperature": 0.3,
        "max_tokens": 220,
        "profanity_check": True,
    }, ensure_ascii=False).encode("utf-8")
    req = Request(
        _s("ARTCATALOG_GIGACHAT_URL", "https://api.giga.chat/v1").rstrip("/") + "/chat/completions",
        data=body,
        headers={
            "Authorization": "Bearer %s" % _gigachat_token(),
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    )
    data = json.loads(urlopen(req, timeout=25, context=_ssl_ctx()).read().decode("utf-8"))
    text = data["choices"][0]["message"]["content"].strip()
    text = re.sub(r"[*_#`>]+", "", text)                  # без markdown
    return text[:ANSWER_MAX]


# ---------------- ответы ----------------

@csrf_exempt
def ask(request):
    if request.method == "OPTIONS":
        return _cors(request, HttpResponse())
    if request.method != "POST":
        return _cors(request, JsonResponse({"error": "POST"}, status=405))
    try:
        data = json.loads(request.body.decode("utf-8"))
    except (ValueError, UnicodeDecodeError):
        return _cors(request, JsonResponse({"error": "Некорректный запрос."}, status=400))
    q = re.sub(r"\s+", " ", (data.get("q") or "")).strip()[:Q_MAX]
    history = data.get("history") if isinstance(data.get("history"), list) else []
    text = type("")          # str в Python 3, unicode в 2.7 (unicode_literals)
    history = [h for h in history if isinstance(h, dict) and isinstance(h.get("q"), text) and isinstance(h.get("a"), text)]
    mode = "simple" if data.get("mode") == "simple" else "3d"
    if len(q) < 2:
        return _cors(request, JsonResponse({"error": "Задайте вопрос."}, status=400))

    ip = _client_ip(request)
    if _count("artcatalog:curator:%s" % ip, WINDOW) > RATE:
        return _cors(request, JsonResponse({"error": "Давайте немного передохнём — спросите чуть позже."}, status=429))

    faq = _load()["faq"]
    item, sure = _faq_match(q)
    source, answer = None, None
    if item and sure:
        source, answer = "faq", _faq_answer(item, mode)
    else:
        key = "artcatalog:curator:ans:%s:%s" % (mode, hashlib.sha1(_norm(q).encode("utf-8")).hexdigest())
        answer = cache.get(key) if not history else None
        if answer:
            source = "ai"
        elif _s("ARTCATALOG_GIGACHAT_KEY") and _count("artcatalog:curator:day:" + time.strftime("%Y%m%d"), 86400) <= DAILY:
            try:
                answer = _ask_ai(q, history, mode)
                source = "ai"
                cache.set(key, answer, 86400)
            except Exception:
                logger.exception("curator: нейросеть не ответила")
        if not answer:
            if item:
                source, answer = "faq", _faq_answer(item, mode)
            else:
                source, answer = "fallback", faq.get("fallback") or (
                    "Хороший вопрос! Точно подскажут организаторы выставки — оставьте заявку на сайте, и с Вами свяжутся.")
    logger.info("curator q=%r source=%s ip=%s", q, source, ip)
    return _cors(request, JsonResponse({"answer": answer, "source": source}))

