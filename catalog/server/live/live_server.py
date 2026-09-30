#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Онлайн-режим выставки «Арт-Ростов»: посетители видят, кто сейчас на
выставке и где, и разговаривают тет-а-тет (второй человек сначала
принимает приглашение). Переписка хранится; модератор смотрит её на
закрытой странице /admin, удаляет сообщения и блокирует нарушителей.

Одна служба на сервере со статикой каталога. nginx передаёт сюда адрес
https://<сервер>/api/artcatalog/live/… (WebSocket — /ws).

    GET  …/live/ws      WebSocket: протокол — JSON-сообщения (см. ниже)
    GET  …/live/ping    {"ok": true, "online": N} — проверка
    GET  …/live/admin   страница модератора (пароль LIVE_ADMIN_PASSWORD)

Посетитель → служба:
    hello  {token, name, avatar:{sex:"f"|"m", outfit:0..3}, full:bool}
    pos    {where:"3d"|"simple"|"catalog", sec, room, x, z, yaw}
    mode   {full}                 нужны ли позиции 10 раз/с (3D) или только места
    invite {to}                   пригласить к разговору (публичный id)
    answer {conv, accept}         принять / отклонить приглашение
    msg    {conv, text, n}        сообщение в принятый разговор (n — метка клиента)
    typing {conv}
    read   {conv}
    block  {id}                   больше не принимать приглашений и сообщений от id
    report {id, conv, text}       жалоба модератору
Служба → посетителю:
    welcome {me, roster, convs}   после hello: кто онлайн, свои разговоры с историей
    join / leave / place          кто пришёл, ушёл, перешёл в другой зал
    moves  {m:[[id, sec, room, x, z, yaw], …]}   позиции (только full), 10 раз/с
    invite {conv, from}           приглашение
    conv   {conv}                 разговор изменился (принят, отклонён, истёк, закрыт)
    msg    {conv, m}              новое сообщение;  del {conv, id} — удалено модератором
    typing {conv}
    error  {code, text}           name | banned | rate | … ; banned — соединение закрывается

Только стандартная библиотека, Python 3.6+ (на CentOS 7 — /usr/bin/python3.6).
Настройки — переменные окружения (в systemd — /etc/artcatalog-live.env,
см. live.env.example):

    LIVE_ADMIN_PASSWORD  пароль страницы модератора (без него страница закрыта)
    LIVE_ORIGINS         сайты, с которых можно подключаться, через запятую
    LIVE_DB              файл базы (по умолчанию ~/.local/share/artcatalog-live/live.db)
    LIVE_HOST, LIVE_PORT где слушать (по умолчанию 127.0.0.1:8767)
    LIVE_PER_IP=8        соединений с одного адреса
    LIVE_MSG_RATE=10     сообщений в минуту от посетителя
    LIVE_INVITE_RATE=5   приглашений в минуту

Проверка без nginx и браузера:
    python3 live_server.py --check --env /etc/artcatalog-live.env
"""
import asyncio
import base64
import csv
import hashlib
import hmac
import io
import json
import os
import re
import secrets
import sqlite3
import struct
import sys
import time
from collections import deque
from urllib.parse import urlparse, parse_qs

# Python 3.6 без русской локали (systemd, cron) пишет в вывод ASCII и падает на кириллице
for _n in ("stdout", "stderr"):
    _s = getattr(sys, _n)
    if (getattr(_s, "encoding", "") or "").lower().replace("-", "") != "utf8" and hasattr(_s, "buffer"):
        setattr(sys, _n, io.TextIOWrapper(_s.buffer, encoding="utf-8", errors="replace", line_buffering=True))


_FILE_ENV = {}


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
            # не через os.environ: в «C»-локали Python 3.6 не пишет туда кириллицу
            _FILE_ENV[k.strip()] = v.strip().strip('"').strip("'")


env_file(sys.argv)


def E(name, default=""):
    if name in _FILE_ENV:
        return _FILE_ENV[name]
    v = os.environ.get(name)
    if v is None:
        return default
    # systemd в «C»-локали: русские буквы приходят «суррогатами» — возвращаем UTF-8
    try:
        return v.encode("utf-8", "surrogateescape").decode("utf-8")
    except UnicodeError:
        return v


ADMIN_PASSWORD = E("LIVE_ADMIN_PASSWORD", "")
ORIGINS = [o.strip().rstrip("/") for o in E("LIVE_ORIGINS", ",".join([
    "https://monthly-delicious-mirror.tilda.ws",
    "https://xn----7sbh1cajbjfe.xn--p1ai",          # арт-ростов.рф
    "https://www.xn----7sbh1cajbjfe.xn--p1ai",
    "https://donexpocentre.ru",
])).split(",") if o.strip()]
DB_PATH = os.path.expanduser(E("LIVE_DB", "~/.local/share/artcatalog-live/live.db"))
HOST = E("LIVE_HOST", "127.0.0.1")
PORT = int(E("LIVE_PORT", "8767"))
PER_IP = int(E("LIVE_PER_IP", "8"))
MSG_RATE = int(E("LIVE_MSG_RATE", "10"))
INVITE_RATE = int(E("LIVE_INVITE_RATE", "5"))

MSG_MAX = 500            # символов в сообщении
NAME_MIN, NAME_MAX = 2, 24
INVITE_TTL = int(E("LIVE_INVITE_TTL", "60"))   # секунд ждём ответа на приглашение
HISTORY = 60             # сообщений разговора отдаём при входе
FRAME_MAX = 65536        # байт в одном сообщении WebSocket
PING_EVERY = 25          # секунд между ping
IDLE_MAX = 75            # без единого кадра дольше — соединение мёртвое
TICK = 0.066             # рассылка позиций 15 раз/с — движение в реальном времени
OUTFITS = 4


def now():
    return time.time()


def log(*parts):
    print(time.strftime("%Y-%m-%d %H:%M:%S"), *parts, flush=True)


# ---------------------------------------------------------------- фильтр

# Мат: основы слов, с которых слово начинается (с приставками), и корни,
# которые встречаются только в брани. «Себе», «хлеб», «ребёнок», «мудрый»,
# «сукно» не задеваются.
_PFX = r"(?:за|от|отъ|вы|у|на|по|под|подъ|раз|разъ|про|до|недо|при|въ|съ|долбо|вз|из|изъ|о|об|объ|пере)?"
BAD = re.compile(
    r"(?<![а-яёa-z])(?:"
    r"" + _PFX + r"[её]б(?:а|у|ё|е|л|н|ис|ыр|и)[а-яё]*"
    r"|" + _PFX + r"ху[йеёияю][а-яё]*"
    r"|[а-яё]*пизд[а-яё]*"
    r"|бля(?:дь|ди|дин|дск|дств|ть|)[а-яё]*"
    r"|муда[кч][а-яё]*|мудил[а-яё]*|мудозв[а-яё]*"
    r"|пид(?:о|а)?р[а-яё]*"
    r"|шлюх[а-яё]*"
    r"|сук(?:а|и|у|ой|ам|ами|ин|ина)(?![а-яё])|сучк[а-яё]*|сучар[а-яё]*"
    r"|гандон[а-яё]*|залуп[а-яё]*"
    r"|манд(?:а|у|ой|ы)(?![а-яё])"
    r"|(?:x|h)u[yi]|pizd[a-z]*|bly[a@]d[a-z]*|(?:e|ye)ba(?:t|l|n)[a-z]*"
    r")",
    re.IGNORECASE,
)
LINK = re.compile(r"(?:https?://|www\.|\b[a-z0-9-]+\.(?:ru|com|net|org|рф|su|io|me|info|online|site)\b|@[a-z0-9_]{3,})", re.IGNORECASE)


def clean(text):
    """Мат — звёздочками; остальное как есть (выводится на странице только как текст)"""
    return BAD.sub("***", text)


def bad_name(name):
    return bool(BAD.search(name) or LINK.search(name))


def norm_name(raw):
    name = re.sub(r"\s+", " ", str(raw or "")).strip()
    # только буквы, цифры, пробел, дефис, точка, апостроф
    name = re.sub(r"[^\w .'\-ёЁ]", "", name, flags=re.UNICODE).strip(" .-")
    return name


# ---------------------------------------------------------------- база

SCHEMA = """
CREATE TABLE IF NOT EXISTS visitors (
  id INTEGER PRIMARY KEY,
  pid TEXT UNIQUE NOT NULL,
  token TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  sex TEXT NOT NULL DEFAULT 'f',
  outfit INTEGER NOT NULL DEFAULT 0,
  first_seen REAL NOT NULL,
  last_seen REAL NOT NULL,
  ip TEXT, ua TEXT
);
CREATE TABLE IF NOT EXISTS conversations (
  id INTEGER PRIMARY KEY,
  a INTEGER NOT NULL,           -- кто пригласил
  b INTEGER NOT NULL,           -- кого пригласили
  state TEXT NOT NULL,          -- pending | accepted | declined | expired | closed
  created REAL NOT NULL,
  updated REAL NOT NULL
);
CREATE INDEX IF NOT EXISTS conv_ab ON conversations(a, b);
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY,
  conv INTEGER NOT NULL,
  author INTEGER NOT NULL,
  text TEXT NOT NULL,
  raw TEXT NOT NULL,            -- как написал посетитель, до фильтра (для модератора)
  ts REAL NOT NULL,
  deleted INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS msg_conv ON messages(conv, id);
CREATE TABLE IF NOT EXISTS reads (
  visitor INTEGER NOT NULL, conv INTEGER NOT NULL, last INTEGER NOT NULL,
  PRIMARY KEY (visitor, conv)
);
CREATE TABLE IF NOT EXISTS blocks (
  who INTEGER NOT NULL, whom INTEGER NOT NULL, ts REAL NOT NULL,
  PRIMARY KEY (who, whom)
);
CREATE TABLE IF NOT EXISTS reports (
  id INTEGER PRIMARY KEY,
  reporter INTEGER NOT NULL, target INTEGER NOT NULL, conv INTEGER,
  text TEXT, ts REAL NOT NULL, done INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS bans (
  id INTEGER PRIMARY KEY,
  visitor INTEGER, ip TEXT, reason TEXT,
  created REAL NOT NULL, until REAL, lifted INTEGER NOT NULL DEFAULT 0
);
"""


class DB:
    def __init__(self, path):
        d = os.path.dirname(path)
        if d and not os.path.isdir(d):
            os.makedirs(d, mode=0o700)
        self.c = sqlite3.connect(path, isolation_level=None)
        self.c.row_factory = sqlite3.Row
        self.c.execute("PRAGMA journal_mode=WAL")
        self.c.execute("PRAGMA synchronous=NORMAL")
        self.c.executescript(SCHEMA)

    def q(self, sql, *args):
        return self.c.execute(sql, args).fetchall()

    def one(self, sql, *args):
        return self.c.execute(sql, args).fetchone()

    def run(self, sql, *args):
        return self.c.execute(sql, args).lastrowid

    # --- посетители
    def visitor_by_token(self, token_hash):
        return self.one("SELECT * FROM visitors WHERE token=?", token_hash)

    def visitor(self, vid):
        return self.one("SELECT * FROM visitors WHERE id=?", vid)

    def upsert_visitor(self, token_hash, name, sex, outfit, ip, ua):
        t = now()
        v = self.visitor_by_token(token_hash)
        if v:
            self.run("UPDATE visitors SET name=?, sex=?, outfit=?, last_seen=?, ip=?, ua=? WHERE id=?",
                     name, sex, outfit, t, ip, ua, v["id"])
            return self.visitor(v["id"])
        while True:
            pid = secrets.token_hex(4)
            if not self.one("SELECT 1 FROM visitors WHERE pid=?", pid):
                break
        vid = self.run("INSERT INTO visitors(pid, token, name, sex, outfit, first_seen, last_seen, ip, ua) "
                       "VALUES(?,?,?,?,?,?,?,?,?)", pid, token_hash, name, sex, outfit, t, t, ip, ua)
        return self.visitor(vid)

    def seen(self, vid):
        self.run("UPDATE visitors SET last_seen=? WHERE id=?", now(), vid)

    # --- блокировки модератора
    def banned(self, vid, ip):
        t = now()
        return self.one("SELECT * FROM bans WHERE lifted=0 AND (until IS NULL OR until>?) "
                        "AND ((visitor IS NOT NULL AND visitor=?) OR (ip IS NOT NULL AND ip=?))", t, vid, ip)

    # --- разговоры
    def conv_between(self, x, y):
        return self.one("SELECT * FROM conversations WHERE ((a=? AND b=?) OR (a=? AND b=?)) "
                        "AND state IN ('pending','accepted') ORDER BY id DESC LIMIT 1", x, y, y, x)

    def conv(self, cid):
        return self.one("SELECT * FROM conversations WHERE id=?", cid)

    def set_conv(self, cid, state):
        self.run("UPDATE conversations SET state=?, updated=? WHERE id=?", state, now(), cid)

    def blocked(self, who, whom):
        return bool(self.one("SELECT 1 FROM blocks WHERE who=? AND whom=?", who, whom))


# ---------------------------------------------------------------- WebSocket

GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"


def ws_accept(key):
    return base64.b64encode(hashlib.sha1((key + GUID).encode("ascii")).digest()).decode("ascii")


def unmask(data, mask):
    n = len(data)
    if not n:
        return data
    m = (mask * (n // 4 + 1))[:n]
    return (int.from_bytes(data, "big") ^ int.from_bytes(m, "big")).to_bytes(n, "big")


def frame(opcode, payload=b""):
    n = len(payload)
    if n < 126:
        head = struct.pack("!BB", 0x80 | opcode, n)
    elif n < 65536:
        head = struct.pack("!BBH", 0x80 | opcode, 126, n)
    else:
        head = struct.pack("!BBQ", 0x80 | opcode, 127, n)
    return head + payload


class Closed(Exception):
    pass


async def read_frame(reader):
    """(opcode, payload) одного полного сообщения; ping/pong/close — отдельными"""
    parts, first_op = [], None
    while True:
        b1, b2 = await reader.readexactly(2)
        fin, op = b1 & 0x80, b1 & 0x0F
        masked, n = b2 & 0x80, b2 & 0x7F
        if n == 126:
            n = struct.unpack("!H", await reader.readexactly(2))[0]
        elif n == 127:
            n = struct.unpack("!Q", await reader.readexactly(8))[0]
        if n > FRAME_MAX or not masked:            # клиент обязан маскировать
            raise Closed()
        mask = await reader.readexactly(4)
        data = unmask(await reader.readexactly(n), mask)
        if op >= 8:                                # управляющие — не фрагментируются
            return op, data
        if op != 0:
            first_op = op
        parts.append(data)
        if sum(len(p) for p in parts) > FRAME_MAX:
            raise Closed()
        if fin:
            return first_op, b"".join(parts)


# ---------------------------------------------------------------- состояние

class Rate:
    def __init__(self, limit, window):
        self.limit, self.window, self.t = limit, window, deque()

    def ok(self):
        t = now()
        while self.t and t - self.t[0] > self.window:
            self.t.popleft()
        if len(self.t) >= self.limit:
            return False
        self.t.append(t)
        return True


class Client:
    def __init__(self, reader, writer, ip, ua):
        self.r, self.w, self.ip, self.ua = reader, writer, ip, ua
        self.v = None                 # строка visitors после hello
        self.full = False
        self.dead = False
        self.last = now()
        self.msg_rate = Rate(MSG_RATE, 60)
        self.inv_rate = Rate(INVITE_RATE, 60)
        self.typing_rate = Rate(1, 2)
        self.pos_rate = Rate(22, 1)
        self.report_rate = Rate(5, 3600)

    def send(self, obj):
        if self.dead:
            return
        try:
            if self.w.transport.get_write_buffer_size() > 512 * 1024:   # не читает — отключаем
                self.kill()
                return
            self.w.write(frame(1, json.dumps(obj, ensure_ascii=False, separators=(",", ":")).encode("utf-8")))
        except Exception:
            self.kill()

    def kill(self):
        if not self.dead:
            self.dead = True
            try:
                self.w.close()
            except Exception:
                pass


class Hub:
    def __init__(self, db):
        self.db = db
        self.clients = set()
        self.by_vid = {}              # id посетителя → множество соединений
        self.place = {}               # id → [where, sec, room, x, z, yaw]
        self.dirty = set()            # чьи позиции изменились с прошлой рассылки
        self.timers = {}              # разговор → таймер истечения приглашения

    # --- кто есть
    def pub(self, v):
        vid = v["id"]
        p = self.place.get(vid)
        return {"id": v["pid"], "name": v["name"], "sex": v["sex"], "outfit": v["outfit"],
                "where": p[0] if p else "", "sec": p[1] if p else -1, "room": p[2] if p else -1}

    def online(self):
        return [next(iter(cs)).v for cs in self.by_vid.values() if cs]

    def to(self, vid, obj):
        for c in list(self.by_vid.get(vid, ())):
            c.send(obj)

    def others(self, vid, obj, full_only=False):
        for c in list(self.clients):
            if c.v and c.v["id"] != vid and (c.full or not full_only):
                c.send(obj)

    def vid_by_pid(self, pid):
        row = self.db.one("SELECT id FROM visitors WHERE pid=?", str(pid))
        return row["id"] if row else None

    # --- вход и выход
    def attach(self, c):
        vid = c.v["id"]
        first = not self.by_vid.get(vid)
        self.by_vid.setdefault(vid, set()).add(c)
        c.send({"t": "welcome", "me": self.pub(c.v),
                "roster": [self.pub(v) for v in self.online() if v["id"] != vid],
                "convs": self.convs_of(vid)})
        if first:
            self.others(vid, dict({"t": "join"}, **self.pub(c.v)))
            log("вошёл", c.v["pid"], c.v["name"], c.ip)
        # приглашения, которые ещё ждут ответа, — заново (на случай переподключения)
        for cv in self.db.q("SELECT * FROM conversations WHERE b=? AND state='pending'", vid):
            if now() - cv["created"] < INVITE_TTL:
                inviter = self.db.visitor(cv["a"])
                c.send({"t": "invite", "conv": cv["id"], "from": self.pub(inviter)})

    def detach(self, c):
        self.clients.discard(c)
        if not c.v:
            return
        vid = c.v["id"]
        cs = self.by_vid.get(vid)
        if cs:
            cs.discard(c)
            if not cs:
                del self.by_vid[vid]
                self.place.pop(vid, None)
                self.dirty.discard(vid)
                self.db.seen(vid)
                self.others(vid, {"t": "leave", "id": c.v["pid"]})
                log("вышел", c.v["pid"], c.v["name"])

    def refresh_visitor(self, vid):
        """Имя или образ поменялись (повторный hello из другой вкладки) — всем соединениям"""
        v = self.db.visitor(vid)
        for c in self.by_vid.get(vid, ()):
            c.v = v
        return v

    # --- разговоры
    def conv_pub(self, cv, me):
        other = cv["b"] if cv["a"] == me else cv["a"]
        ov = self.db.visitor(other)
        row = self.db.one("SELECT last FROM reads WHERE visitor=? AND conv=?", me, cv["id"])
        last = row["last"] if row else 0
        unread = self.db.one("SELECT COUNT(*) n FROM messages WHERE conv=? AND author<>? AND id>? AND deleted=0",
                             cv["id"], me, last)["n"]
        return {"conv": cv["id"], "state": cv["state"], "mine": cv["a"] == me,
                "with": self.pub(ov), "online": other in self.by_vid, "unread": unread,
                "blocked": self.db.blocked(me, other)}

    def msg_pub(self, m, pid=None):
        if pid is None:
            pid = self.db.visitor(m["author"])["pid"]
        return {"id": m["id"], "from": pid, "text": m["text"], "ts": int(m["ts"])}

    def history(self, cid):
        rows = self.db.q("SELECT m.*, v.pid FROM messages m JOIN visitors v ON v.id=m.author "
                         "WHERE conv=? AND deleted=0 ORDER BY m.id DESC LIMIT ?", cid, HISTORY)
        return [self.msg_pub(m, m["pid"]) for m in reversed(rows)]

    def convs_of(self, vid):
        out = []
        for cv in self.db.q("SELECT * FROM conversations WHERE (a=? OR b=?) AND state IN ('accepted','pending','closed') "
                            "ORDER BY updated DESC LIMIT 30", vid, vid):
            if cv["state"] == "pending" and cv["b"] == vid:
                continue                      # входящее приглашение придёт отдельно
            d = self.conv_pub(cv, vid)
            if cv["state"] != "pending":
                d["msgs"] = self.history(cv["id"])
            out.append(d)
        return out

    def conv_changed(self, cv):
        for me in (cv["a"], cv["b"]):
            self.to(me, {"t": "conv", "conv": self.conv_pub(cv, me)})

    def expire(self, cid):
        self.timers.pop(cid, None)
        cv = self.db.conv(cid)
        if cv and cv["state"] == "pending":
            self.db.set_conv(cid, "expired")
            self.conv_changed(self.db.conv(cid))

    # --- позиции
    def snapshot(self, c):
        """Все, кто сейчас в 3D, — одним пакетом: вошедший в 3D видит их сразу"""
        moves = []
        for vid, p in self.place.items():
            cs = self.by_vid.get(vid)
            if p[0] == "3d" and cs and (not c.v or vid != c.v["id"]):
                moves.append([next(iter(cs)).v["pid"], p[1], p[2], p[3], p[4], p[5]])
        c.send({"t": "moves", "ts": int(now() * 1000), "m": moves, "snap": True})

    async def ticker(self):
        while True:
            await asyncio.sleep(TICK)
            if not self.dirty:
                continue
            moves = []
            for vid in self.dirty:
                p = self.place.get(vid)
                cs = self.by_vid.get(vid)
                if p and cs:
                    moves.append([next(iter(cs)).v["pid"], p[1], p[2], p[3], p[4], p[5]])
            self.dirty.clear()
            if not moves:
                continue
            data = frame(1, json.dumps({"t": "moves", "ts": int(now() * 1000), "m": moves},
                                       separators=(",", ":")).encode("utf-8"))
            for c in list(self.clients):
                if c.full and c.v and not c.dead:
                    try:
                        if c.w.transport.get_write_buffer_size() > 512 * 1024:
                            c.kill()
                        else:
                            c.w.write(data)
                    except Exception:
                        c.kill()

    # --- сообщения от посетителя
    def handle(self, c, d):
        t = d.get("t")
        if t == "hello":
            return self.hello(c, d)
        if not c.v:
            return
        vid = c.v["id"]
        if t == "pos":
            if not c.pos_rate.ok():
                return
            where = str(d.get("where", ""))[:10]
            try:
                sec, room = int(d.get("sec", -1)), int(d.get("room", -1))
                x, z, yaw = round(float(d.get("x", 0)), 2), round(float(d.get("z", 0)), 2), round(float(d.get("yaw", 0)), 3)
            except (TypeError, ValueError):
                return
            old = self.place.get(vid)
            self.place[vid] = [where, sec, room, x, z, yaw]
            if where == "3d":
                self.dirty.add(vid)
            if not old or old[:3] != [where, sec, room]:
                self.others(vid, {"t": "place", "id": c.v["pid"], "where": where, "sec": sec, "room": room})
        elif t == "mode":
            was, c.full = c.full, bool(d.get("full"))
            if c.full and not was:
                self.snapshot(c)
        elif t == "invite":
            self.invite(c, d)
        elif t == "answer":
            self.answer(c, d)
        elif t == "msg":
            self.message(c, d)
        elif t == "typing":
            cv = self.db.conv(int(d.get("conv") or 0))
            if cv and cv["state"] == "accepted" and vid in (cv["a"], cv["b"]) and c.typing_rate.ok():
                other = cv["b"] if cv["a"] == vid else cv["a"]
                if not self.db.blocked(other, vid):
                    self.to(other, {"t": "typing", "conv": cv["id"]})
        elif t == "read":
            cv = self.db.conv(int(d.get("conv") or 0))
            if cv and vid in (cv["a"], cv["b"]):
                last = self.db.one("SELECT MAX(id) m FROM messages WHERE conv=?", cv["id"])["m"] or 0
                self.db.run("INSERT OR REPLACE INTO reads(visitor, conv, last) VALUES(?,?,?)", vid, cv["id"], last)
        elif t == "block":
            other = self.vid_by_pid(d.get("id"))
            if other and other != vid:
                self.db.run("INSERT OR IGNORE INTO blocks(who, whom, ts) VALUES(?,?,?)", vid, other, now())
                cv = self.db.conv_between(vid, other)
                if cv:
                    self.db.set_conv(cv["id"], "closed")
                    self.conv_changed(self.db.conv(cv["id"]))
                log("блокировка", c.v["pid"], "→", d.get("id"))
        elif t == "unblock":
            other = self.vid_by_pid(d.get("id"))
            if other:
                self.db.run("DELETE FROM blocks WHERE who=? AND whom=?", vid, other)
        elif t == "report":
            other = self.vid_by_pid(d.get("id"))
            if other and c.report_rate.ok():
                cid = int(d.get("conv") or 0) or None
                self.db.run("INSERT INTO reports(reporter, target, conv, text, ts) VALUES(?,?,?,?,?)",
                            vid, other, cid, str(d.get("text", ""))[:MSG_MAX], now())
                c.send({"t": "reported"})
                log("жалоба", c.v["pid"], "на", d.get("id"))

    def hello(self, c, d):
        token = str(d.get("token", ""))
        if not re.fullmatch(r"[A-Za-z0-9_-]{16,64}", token):
            c.send({"t": "error", "code": "token", "text": "Обновите страницу"})
            return
        name = norm_name(d.get("name"))
        if not (NAME_MIN <= len(name) <= NAME_MAX) or bad_name(name):
            c.send({"t": "error", "code": "name", "text": "Имя — от 2 до 24 букв, без ссылок и грубых слов"})
            return
        av = d.get("avatar") or {}
        sex = "m" if av.get("sex") == "m" else "f"
        try:
            outfit = max(0, min(OUTFITS - 1, int(av.get("outfit", 0))))
        except (TypeError, ValueError):
            outfit = 0
        th = hashlib.sha256(token.encode("ascii")).hexdigest()
        known = self.db.visitor_by_token(th)
        if self.db.banned(known["id"] if known else None, c.ip):
            c.send({"t": "error", "code": "banned", "text": "Доступ к онлайн-режиму закрыт модератором"})
            c.kill()
            return
        was = c.v
        v = self.db.upsert_visitor(th, name, sex, outfit, c.ip, c.ua)
        c.full = bool(d.get("full"))
        if was and was["id"] == v["id"]:            # сменил имя или образ, не переподключаясь
            v = self.refresh_visitor(v["id"])
            self.others(v["id"], dict({"t": "join"}, **self.pub(v)))
            c.send({"t": "welcome", "me": self.pub(v),
                    "roster": [self.pub(o) for o in self.online() if o["id"] != v["id"]],
                    "convs": self.convs_of(v["id"])})
            return
        if was:                                     # другой посетитель в том же соединении
            self.detach(c)
            self.clients.add(c)
        c.v = v
        if len(self.by_vid.get(v["id"], ())):
            self.refresh_visitor(v["id"])
        self.attach(c)
        if c.full:
            self.snapshot(c)

    def invite(self, c, d):
        vid = c.v["id"]
        other = self.vid_by_pid(d.get("to"))
        if not other or other == vid:
            return
        if other not in self.by_vid:
            c.send({"t": "error", "code": "offline", "text": "Посетитель уже ушёл с выставки"})
            return
        if self.db.blocked(other, vid) or self.db.blocked(vid, other):
            # заблокировавшему не сообщаем, что его заблокировали: просто «не ответил»
            c.send({"t": "error", "code": "unavailable", "text": "Посетитель сейчас не может разговаривать"})
            return
        cv = self.db.conv_between(vid, other)
        if cv:
            if cv["state"] == "accepted":
                c.send({"t": "conv", "conv": dict(self.conv_pub(cv, vid), msgs=self.history(cv["id"]))})
                return
            if cv["state"] == "pending" and cv["a"] == other:   # встречное приглашение — сразу разговор
                self.db.set_conv(cv["id"], "accepted")
                self.cancel_timer(cv["id"])
                self.conv_changed(self.db.conv(cv["id"]))
                return
            return                                  # уже ждём ответа
        if not c.inv_rate.ok():
            c.send({"t": "error", "code": "rate", "text": "Слишком много приглашений — подождите минуту"})
            return
        t = now()
        cid = self.db.run("INSERT INTO conversations(a, b, state, created, updated) VALUES(?,?,?,?,?)",
                          vid, other, "pending", t, t)
        cv = self.db.conv(cid)
        self.to(other, {"t": "invite", "conv": cid, "from": self.pub(c.v)})
        self.to(vid, {"t": "conv", "conv": self.conv_pub(cv, vid)})
        self.timers[cid] = asyncio.get_event_loop().call_later(INVITE_TTL, self.expire, cid)
        log("приглашение", c.v["pid"], "→", d.get("to"))

    def cancel_timer(self, cid):
        tm = self.timers.pop(cid, None)
        if tm:
            tm.cancel()

    def answer(self, c, d):
        vid = c.v["id"]
        cv = self.db.conv(int(d.get("conv") or 0))
        if not cv or cv["b"] != vid or cv["state"] != "pending":
            return
        self.cancel_timer(cv["id"])
        self.db.set_conv(cv["id"], "accepted" if d.get("accept") else "declined")
        cv = self.db.conv(cv["id"])
        for me in (cv["a"], cv["b"]):
            pub = self.conv_pub(cv, me)
            if cv["state"] == "accepted":
                pub["msgs"] = self.history(cv["id"])
            self.to(me, {"t": "conv", "conv": pub})

    def message(self, c, d):
        vid = c.v["id"]
        cv = self.db.conv(int(d.get("conv") or 0))
        if not cv or vid not in (cv["a"], cv["b"]) or cv["state"] != "accepted":
            c.send({"t": "error", "code": "conv", "text": "Разговор закрыт", "n": d.get("n")})
            return
        other = cv["b"] if cv["a"] == vid else cv["a"]
        raw = re.sub(r"[\x00-\x08\x0b-\x1f\x7f]", "", str(d.get("text", ""))).strip()
        if not raw:
            return
        raw = raw[:MSG_MAX]
        if not c.msg_rate.ok():
            c.send({"t": "error", "code": "rate", "text": "Слишком часто — подождите немного", "n": d.get("n")})
            return
        text = clean(raw)
        mid = self.db.run("INSERT INTO messages(conv, author, text, raw, ts) VALUES(?,?,?,?,?)",
                          cv["id"], vid, text, raw, now())
        self.db.run("UPDATE conversations SET updated=? WHERE id=?", now(), cv["id"])
        m = self.msg_pub(self.db.one("SELECT * FROM messages WHERE id=?", mid), c.v["pid"])
        self.to(vid, {"t": "msg", "conv": cv["id"], "m": m, "n": d.get("n")})
        if not self.db.blocked(other, vid):
            self.to(other, {"t": "msg", "conv": cv["id"], "m": m})

    # --- модератор
    def kick(self, vid=None, ip=None):
        for cl in list(self.clients):
            if cl.v and ((vid and cl.v["id"] == vid) or (ip and cl.ip == ip)):
                cl.send({"t": "error", "code": "banned", "text": "Доступ к онлайн-режиму закрыт модератором"})
                cl.kill()


# ---------------------------------------------------------------- HTTP

REASONS = {200: "OK", 204: "No Content", 302: "Found", 400: "Bad Request", 401: "Unauthorized",
           403: "Forbidden", 404: "Not Found", 405: "Method Not Allowed", 413: "Payload Too Large",
           429: "Too Many Requests"}


def http(writer, code, body=b"", ctype="text/plain; charset=utf-8", headers=()):
    if isinstance(body, str):
        body = body.encode("utf-8")
    head = ["HTTP/1.1 %d %s" % (code, REASONS.get(code, "OK")),
            "Content-Type: " + ctype, "Content-Length: %d" % len(body),
            "Cache-Control: no-store", "Connection: close",
            "X-Content-Type-Options: nosniff", "Referrer-Policy: no-referrer"]
    head.extend(headers)
    writer.write(("\r\n".join(head) + "\r\n\r\n").encode("utf-8") + body)


def jbody(obj):
    return json.dumps(obj, ensure_ascii=False).encode("utf-8")


class Server:
    def __init__(self, db):
        self.db = db
        self.hub = Hub(db)
        self.sessions = {}                     # cookie модератора → срок
        self.fails = {}                        # адрес → неверные пароли
        self.per_ip = {}

    async def handle(self, reader, writer):
        peer = (writer.get_extra_info("peername") or ("?",))[0]
        try:
            head = await asyncio.wait_for(reader.readuntil(b"\r\n\r\n"), 15)
        except Exception:
            writer.close()
            return
        if len(head) > 16384:
            writer.close()
            return
        lines = head.decode("latin-1").split("\r\n")
        try:
            method, target, _ = lines[0].split(" ", 2)
        except ValueError:
            writer.close()
            return
        hdr = {}
        for ln in lines[1:]:
            if ":" in ln:
                k, v = ln.split(":", 1)
                hdr[k.strip().lower()] = v.strip()
        # за nginx настоящий адрес посетителя — в X-Real-IP
        ip = hdr.get("x-real-ip", peer) if peer in ("127.0.0.1", "::1") else peer
        u = urlparse(target)
        path = u.path
        path = path.split("/live/", 1)[1] if "/live/" in path else path.lstrip("/")
        qs = parse_qs(u.query)
        upgraded = False
        try:
            if path == "ws" and hdr.get("upgrade", "").lower() == "websocket":
                upgraded = True
                await self.websocket(reader, writer, hdr, ip)
                return
            body = b""
            n = int(hdr.get("content-length") or 0)
            if n > 65536:
                http(writer, 413)
                return
            if n:
                body = await asyncio.wait_for(reader.readexactly(n), 15)
            await self.route(writer, method, path, qs, hdr, body, ip)
            try:
                await writer.drain()
            except Exception:
                pass
        except Exception as e:
            log("ошибка", path, repr(e))
            try:
                http(writer, 400, "bad request")
            except Exception:
                pass
        finally:
            if not upgraded:
                writer.close()

    async def websocket(self, reader, writer, hdr, ip):
        origin = hdr.get("origin", "").rstrip("/")
        if origin not in ORIGINS and "*" not in ORIGINS:
            http(writer, 403, "origin")
            writer.close()
            return
        if self.per_ip.get(ip, 0) >= PER_IP:
            http(writer, 429, "too many")
            writer.close()
            return
        key = hdr.get("sec-websocket-key", "")
        writer.write(("HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\n"
                      "Sec-WebSocket-Accept: %s\r\n\r\n" % ws_accept(key)).encode("ascii"))
        c = Client(reader, writer, ip, hdr.get("user-agent", "")[:200])
        self.per_ip[ip] = self.per_ip.get(ip, 0) + 1
        self.hub.clients.add(c)
        pinger = asyncio.ensure_future(self.pinger(c))
        try:
            while not c.dead:
                op, data = await asyncio.wait_for(read_frame(reader), IDLE_MAX)
                c.last = now()
                if op == 8:
                    break
                if op == 9:
                    writer.write(frame(10, data))
                    continue
                if op != 1:
                    continue
                try:
                    d = json.loads(data.decode("utf-8"))
                except ValueError:
                    continue
                if isinstance(d, dict):
                    self.hub.handle(c, d)
        except (asyncio.IncompleteReadError, asyncio.TimeoutError, ConnectionError, Closed):
            pass
        except Exception as e:
            log("ошибка соединения", repr(e))
        finally:
            pinger.cancel()
            self.hub.detach(c)
            self.per_ip[ip] = self.per_ip.get(ip, 1) - 1
            if self.per_ip[ip] <= 0:
                self.per_ip.pop(ip, None)
            try:
                writer.write(frame(8))
            except Exception:
                pass
            c.kill()

    async def pinger(self, c):
        while not c.dead:
            await asyncio.sleep(PING_EVERY)
            try:
                c.w.write(frame(9))
            except Exception:
                c.kill()

    # --- страница модератора и её API
    def admin_ok(self, hdr):
        m = re.search(r"(?:^|;\s*)live_admin=([A-Za-z0-9_-]+)", hdr.get("cookie", ""))
        if not m:
            return False
        exp = self.sessions.get(m.group(1))
        return bool(exp and exp > now())

    async def route(self, w, method, path, qs, hdr, body, ip):
        hub, db = self.hub, self.db
        if path in ("ping", ""):
            http(w, 200, jbody({"ok": True, "online": len(hub.by_vid)}), "application/json; charset=utf-8")
            return
        if path == "admin" and method == "GET":
            http(w, 200, ADMIN_HTML, "text/html; charset=utf-8",
                 ["Content-Security-Policy: default-src 'self'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; "
                  "connect-src 'self'; img-src 'self' data:; frame-ancestors 'none'"])
            return
        if path == "admin/login" and method == "POST":
            f = [t for t in self.fails.get(ip, []) if now() - t < 900]
            self.fails[ip] = f
            if len(f) >= 5:
                http(w, 429, jbody({"error": "Слишком много попыток — подождите 15 минут"}), "application/json; charset=utf-8")
                return
            try:
                pw = json.loads(body.decode("utf-8")).get("password", "")
            except ValueError:
                pw = ""
            if not ADMIN_PASSWORD or not hmac.compare_digest(pw.encode("utf-8"), ADMIN_PASSWORD.encode("utf-8")):
                f.append(now())
                log("модератор: неверный пароль", ip)
                http(w, 401, jbody({"error": "Неверный пароль" if ADMIN_PASSWORD else "Пароль модератора не задан на сервере"}),
                     "application/json; charset=utf-8")
                return
            sid = secrets.token_urlsafe(24)
            self.sessions[sid] = now() + 12 * 3600
            log("модератор вошёл", ip)
            http(w, 200, jbody({"ok": True}), "application/json; charset=utf-8",
                 ["Set-Cookie: live_admin=%s; Path=/; Max-Age=43200; HttpOnly; Secure; SameSite=Strict" % sid])
            return
        if not path.startswith("admin/api/"):
            http(w, 404, "not found")
            return
        # всё остальное — только модератору; изменения — с заголовком X-Admin (защита от подделки запроса)
        if not self.admin_ok(hdr):
            http(w, 401, jbody({"error": "login"}), "application/json; charset=utf-8")
            return
        if method == "POST" and hdr.get("x-admin") != "1":
            http(w, 403, jbody({"error": "csrf"}), "application/json; charset=utf-8")
            return
        api = path[len("admin/api/"):]
        arg = lambda k, d="": (qs.get(k) or [d])[0]
        data = {}
        if method == "POST":
            try:
                data = json.loads(body.decode("utf-8") or "{}")
            except ValueError:
                data = {}

        def vrow(v):
            ban = db.banned(v["id"], None)
            return {"id": v["id"], "pid": v["pid"], "name": v["name"], "sex": v["sex"], "outfit": v["outfit"],
                    "first": int(v["first_seen"]), "last": int(v["last_seen"]), "ip": v["ip"],
                    "online": v["id"] in hub.by_vid, "banned": ban["id"] if ban else None}

        out = None
        if api == "state":
            out = {"online": [dict(vrow(v), where=hub.place.get(v["id"], [""])[0],
                                   sec=hub.place.get(v["id"], ["", -1])[1], room=hub.place.get(v["id"], ["", -1, -1])[2])
                              for v in hub.online()],
                   "reports": [dict(r) for r in db.q(
                       "SELECT r.*, a.name reporter_name, b.name target_name FROM reports r "
                       "JOIN visitors a ON a.id=r.reporter JOIN visitors b ON b.id=r.target "
                       "WHERE r.done=0 ORDER BY r.id DESC LIMIT 100")],
                   "bans": [dict(b, name=(db.visitor(b["visitor"])["name"] if b["visitor"] else None))
                            for b in db.q("SELECT * FROM bans WHERE lifted=0 ORDER BY id DESC LIMIT 200")],
                   "stats": {"visitors": db.one("SELECT COUNT(*) n FROM visitors")["n"],
                             "convs": db.one("SELECT COUNT(*) n FROM conversations WHERE state IN ('accepted','closed')")["n"],
                             "msgs": db.one("SELECT COUNT(*) n FROM messages")["n"]}}
        elif api == "convs":
            q, d0, d1 = arg("q").strip(), arg("from"), arg("to")
            sql = ("SELECT c.*, a.name an, a.pid ap, b.name bn, b.pid bp, "
                   "(SELECT COUNT(*) FROM messages m WHERE m.conv=c.id) n, "
                   "(SELECT MAX(ts) FROM messages m WHERE m.conv=c.id) lastmsg "
                   "FROM conversations c JOIN visitors a ON a.id=c.a JOIN visitors b ON b.id=c.b WHERE 1=1")
            args = []
            if q:
                sql += " AND (a.name LIKE ? OR b.name LIKE ? OR a.pid=? OR b.pid=? " \
                       "OR EXISTS(SELECT 1 FROM messages m WHERE m.conv=c.id AND m.raw LIKE ?))"
                args += ["%" + q + "%", "%" + q + "%", q, q, "%" + q + "%"]
            for k, op in ((d0, ">="), (d1, "<")):
                if k:
                    try:
                        ts = time.mktime(time.strptime(k, "%Y-%m-%d")) + (86400 if op == "<" else 0)
                        sql += " AND c.updated %s ?" % op
                        args.append(ts)
                    except ValueError:
                        pass
            sql += " ORDER BY c.updated DESC LIMIT 300"
            out = {"convs": [dict(r) for r in db.q(sql, *args)]}
        elif api == "conv":
            cid = int(arg("id", "0") or 0)
            cv = db.conv(cid)
            if not cv:
                http(w, 404, jbody({"error": "нет"}), "application/json; charset=utf-8")
                return
            out = {"conv": dict(cv), "a": vrow(db.visitor(cv["a"])), "b": vrow(db.visitor(cv["b"])),
                   "msgs": [dict(m) for m in db.q("SELECT m.*, v.name FROM messages m JOIN visitors v ON v.id=m.author "
                                                  "WHERE conv=? ORDER BY m.id", cid)]}
        elif api == "visitors":
            q = arg("q").strip()
            rows = db.q("SELECT * FROM visitors WHERE name LIKE ? OR pid=? OR ip=? ORDER BY last_seen DESC LIMIT 200",
                        "%" + q + "%", q, q) if q else db.q("SELECT * FROM visitors ORDER BY last_seen DESC LIMIT 200")
            out = {"visitors": [vrow(v) for v in rows]}
        elif api == "delete" and method == "POST":
            m = db.one("SELECT * FROM messages WHERE id=?", int(data.get("id") or 0))
            if m:
                db.run("UPDATE messages SET deleted=? WHERE id=?", 0 if data.get("restore") else 1, m["id"])
                cv = db.conv(m["conv"])
                if not data.get("restore"):
                    for vid in (cv["a"], cv["b"]):
                        hub.to(vid, {"t": "del", "conv": cv["id"], "id": m["id"]})
                log("модератор: сообщение", m["id"], "восстановлено" if data.get("restore") else "удалено")
            out = {"ok": True}
        elif api == "ban" and method == "POST":
            v = db.visitor(int(data.get("visitor") or 0))
            if v:
                days = data.get("days")
                until = now() + float(days) * 86400 if days else None
                reason = str(data.get("reason", ""))[:300]
                db.run("INSERT INTO bans(visitor, ip, reason, created, until) VALUES(?,?,?,?,?)",
                       v["id"], v["ip"] if data.get("ip") else None, reason, now(), until)
                hub.kick(vid=v["id"], ip=v["ip"] if data.get("ip") else None)
                log("модератор: блокировка", v["pid"], v["name"], "и адрес" if data.get("ip") else "")
            out = {"ok": True}
        elif api == "unban" and method == "POST":
            db.run("UPDATE bans SET lifted=1 WHERE id=?", int(data.get("id") or 0))
            out = {"ok": True}
        elif api == "report_done" and method == "POST":
            db.run("UPDATE reports SET done=1 WHERE id=?", int(data.get("id") or 0))
            out = {"ok": True}
        elif api == "logout" and method == "POST":
            m = re.search(r"live_admin=([A-Za-z0-9_-]+)", hdr.get("cookie", ""))
            if m:
                self.sessions.pop(m.group(1), None)
            out = {"ok": True}
        elif api == "export.csv":
            cid = arg("conv")
            buf = io.StringIO()
            wr = csv.writer(buf, delimiter=";")
            wr.writerow(["разговор", "время", "автор", "id автора", "сообщение (как написано)", "удалено модератором"])
            rows = db.q("SELECT m.*, v.name, v.pid FROM messages m JOIN visitors v ON v.id=m.author " +
                        ("WHERE conv=? " if cid else "") + "ORDER BY m.id", *([int(cid)] if cid else []))
            for m in rows:
                wr.writerow([m["conv"], time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(m["ts"])),
                             m["name"], m["pid"], m["raw"], "да" if m["deleted"] else ""])
            name = "artrostov-chat%s.csv" % ("-" + cid if cid else "")
            # BOM — чтобы Excel сразу открыл русские буквы правильно
            http(w, 200, "﻿" + buf.getvalue(), "text/csv; charset=utf-8",
                 ['Content-Disposition: attachment; filename="%s"' % name])
            return
        if out is None:
            http(w, 404, jbody({"error": "нет такого действия"}), "application/json; charset=utf-8")
            return
        http(w, 200, jbody(out), "application/json; charset=utf-8")


# ---------------------------------------------------------------- страница модератора

ADMIN_HTML = r"""<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Онлайн-режим · модератор</title>
<style>
:root{--ink:#2a2a2a;--mute:#6f6f6b;--line:#e4e1da;--bg:#f6f4ef;--card:#fff;--acc:#d4574f;--ok:#2f7a57}
*{box-sizing:border-box}body{margin:0;font:15px/1.45 "Helvetica Neue",Arial,sans-serif;color:var(--ink);background:var(--bg)}
header{display:flex;align-items:center;gap:16px;flex-wrap:wrap;padding:14px 20px;background:var(--card);border-bottom:1px solid var(--line);position:sticky;top:0;z-index:2}
header b{font-size:17px}header nav{display:flex;gap:6px;flex-wrap:wrap}header .sp{flex:1}
button,.btn{font:inherit;border:1px solid var(--line);background:var(--card);color:var(--ink);border-radius:999px;padding:6px 14px;cursor:pointer;text-decoration:none;display:inline-block}
button:hover,.btn:hover{border-color:var(--ink)}button.on{background:var(--ink);color:#fff;border-color:var(--ink)}
button.danger{color:var(--acc);border-color:#f0c9c5}button.danger:hover{background:var(--acc);color:#fff}
main{max-width:1100px;margin:0 auto;padding:20px}
.card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:16px 18px;margin-bottom:16px}
h2{font-size:16px;margin:0 0 10px}table{width:100%;border-collapse:collapse}td,th{text-align:left;padding:7px 8px;border-bottom:1px solid var(--line);vertical-align:top}
th{font-weight:500;color:var(--mute);font-size:13px}tr.click{cursor:pointer}tr.click:hover{background:#faf8f3}
.mute{color:var(--mute);font-size:13px}.tag{display:inline-block;font-size:12px;border-radius:99px;padding:1px 8px;background:#eee}
.tag.on{background:#dff1e7;color:var(--ok)}.tag.ban{background:#f9dedb;color:var(--acc)}
input,select{font:inherit;padding:7px 10px;border:1px solid var(--line);border-radius:10px;background:#fff}
.row{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:12px}
.msg{padding:8px 10px;border-radius:10px;margin:6px 0;max-width:80%;background:#f1efe9}.msg.b{margin-left:auto;background:#e8eef4}
.msg.del{opacity:.5;text-decoration:line-through}.msg .meta{font-size:12px;color:var(--mute);display:flex;gap:10px;align-items:center}
.msg .meta button{padding:1px 8px;font-size:12px}.stats{display:flex;gap:24px;flex-wrap:wrap}.stats div b{font-size:22px;display:block}
#login{max-width:340px;margin:12vh auto}.err{color:var(--acc);min-height:1.4em}
.hide{display:none!important}
</style></head><body>
<div id="login" class="card hide"><h2>Онлайн-режим · вход модератора</h2>
<form id="lf"><div class="row"><input id="pw" type="password" placeholder="Пароль" autocomplete="current-password" style="flex:1" required></div>
<div class="row"><button class="on" type="submit">Войти</button></div><div class="err" id="lerr"></div></form></div>
<div id="app" class="hide">
<header><b>Онлайн-режим «Арт-Ростов»</b><nav>
<button data-v="now" class="on">Сейчас</button><button data-v="convs">Переписка</button><button data-v="people">Посетители</button><button data-v="bans">Блокировки</button>
</nav><span class="sp"></span><a class="btn" href="admin/api/export.csv">Выгрузить всё в CSV</a><button id="out">Выйти</button></header>
<main>
<section data-p="now"><div class="card"><div class="stats" id="stats"></div></div>
<div class="card"><h2>Жалобы</h2><div id="reports"></div></div>
<div class="card"><h2>Сейчас на выставке</h2><div id="online"></div></div></section>
<section data-p="convs" class="hide"><div class="card"><div class="row">
<input id="cq" placeholder="Имя, id или слово из переписки" style="flex:1;min-width:200px"><input id="cf" type="date"><input id="ct" type="date"><button id="cgo" class="on">Найти</button></div>
<div id="convs"></div></div><div class="card hide" id="convbox"></div></section>
<section data-p="people" class="hide"><div class="card"><div class="row"><input id="pq" placeholder="Имя, id или адрес" style="flex:1"><button id="pgo" class="on">Найти</button></div><div id="people"></div></div></section>
<section data-p="bans" class="hide"><div class="card"><h2>Действующие блокировки</h2><div id="bans"></div></div></section>
</main></div>
<script>
var $=function(s){return document.querySelector(s)};
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function dt(t){if(!t)return'';var d=new Date(t*1000);return d.toLocaleDateString('ru-RU')+' '+d.toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'})}
function api(p,body){return fetch('admin/api/'+p,{method:body?'POST':'GET',credentials:'same-origin',headers:body?{'Content-Type':'application/json','X-Admin':'1'}:{},body:body?JSON.stringify(body):undefined}).then(function(r){if(r.status===401){show(false);throw new Error('login')}return r.json()})}
function show(ok){$('#login').classList.toggle('hide',ok);$('#app').classList.toggle('hide',!ok)}
var WHERE={'3d':'3D-зал','simple':'простой зал','catalog':'каталог'};
function place(v){var w=WHERE[v.where]||'';if(v.where==='3d'){w+=v.sec<0?', холл':', раздел '+(v.sec+1)+(v.room>=0?', зал '+(v.room+1):'')}return w}
function who(n,v){return esc(n)+(v&&v.banned?' <span class="tag ban">заблокирован</span>':'')}
$('#lf').onsubmit=function(e){e.preventDefault();fetch('admin/login',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:$('#pw').value})}).then(function(r){return r.json().then(function(d){if(r.ok){$('#pw').value='';show(true);view('now')}else $('#lerr').textContent=d.error||'Ошибка'})})};
$('#out').onclick=function(){api('logout',{}).then(function(){show(false)})};
document.querySelectorAll('header nav button').forEach(function(b){b.onclick=function(){view(b.getAttribute('data-v'))}});
var cur='now',timer=null;
function view(v){cur=v;document.querySelectorAll('header nav button').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-v')===v)});
document.querySelectorAll('section[data-p]').forEach(function(s){s.classList.toggle('hide',s.getAttribute('data-p')!==v)});
if(v==='now')loadNow();if(v==='convs')loadConvs();if(v==='people')loadPeople();if(v==='bans')loadNow()}
function banBtns(v){return v.banned?'<button data-unban="'+v.banned+'">Разблокировать</button>':'<button class="danger" data-ban="'+v.id+'">Заблокировать</button>'}
function loadNow(){api('state').then(function(d){var s=d.stats;
$('#stats').innerHTML='<div><b>'+d.online.length+'</b><span class="mute">сейчас онлайн</span></div><div><b>'+s.visitors+'</b><span class="mute">посетителей всего</span></div><div><b>'+s.convs+'</b><span class="mute">разговоров</span></div><div><b>'+s.msgs+'</b><span class="mute">сообщений</span></div>';
$('#online').innerHTML=d.online.length?'<table><tr><th>Имя</th><th>Где</th><th>Адрес</th><th></th></tr>'+d.online.map(function(v){return'<tr><td>'+who(v.name,v)+' <span class="mute">'+esc(v.pid)+'</span></td><td>'+esc(place(v))+'</td><td class="mute">'+esc(v.ip)+'</td><td><button data-find="'+esc(v.pid)+'">Переписка</button> '+banBtns(v)+'</td></tr>'}).join('')+'</table>':'<p class="mute">Никого нет.</p>';
$('#reports').innerHTML=d.reports.length?'<table><tr><th>Когда</th><th>Кто</th><th>На кого</th><th>Текст</th><th></th></tr>'+d.reports.map(function(r){return'<tr><td class="mute">'+dt(r.ts)+'</td><td>'+esc(r.reporter_name)+'</td><td>'+esc(r.target_name)+'</td><td>'+esc(r.text)+'</td><td>'+(r.conv?'<button data-conv="'+r.conv+'">Открыть разговор</button> ':'')+'<button data-done="'+r.id+'">Разобрано</button></td></tr>'}).join('')+'</table>':'<p class="mute">Жалоб нет.</p>';
$('#bans').innerHTML=d.bans.length?'<table><tr><th>Кто</th><th>Причина</th><th>С</th><th>До</th><th></th></tr>'+d.bans.map(function(b){return'<tr><td>'+esc(b.name||'')+(b.ip?' <span class="mute">и адрес '+esc(b.ip)+'</span>':'')+'</td><td>'+esc(b.reason)+'</td><td class="mute">'+dt(b.created)+'</td><td class="mute">'+(b.until?dt(b.until):'навсегда')+'</td><td><button data-unban="'+b.id+'">Снять</button></td></tr>'}).join('')+'</table>':'<p class="mute">Блокировок нет.</p>'})}
function loadConvs(){var p='convs?q='+encodeURIComponent($('#cq').value)+'&from='+$('#cf').value+'&to='+$('#ct').value;
api(p).then(function(d){$('#convs').innerHTML=d.convs.length?'<table><tr><th>Кто пригласил</th><th>Кого</th><th>Состояние</th><th>Сообщений</th><th>Последнее</th></tr>'+d.convs.map(function(c){return'<tr class="click" data-conv="'+c.id+'"><td>'+esc(c.an)+'</td><td>'+esc(c.bn)+'</td><td class="mute">'+({pending:'ждёт ответа',accepted:'идёт',declined:'отклонено',expired:'без ответа',closed:'закрыт'}[c.state]||c.state)+'</td><td>'+c.n+'</td><td class="mute">'+dt(c.lastmsg||c.updated)+'</td></tr>'}).join('')+'</table>':'<p class="mute">Ничего не найдено.</p>'})}
function openConv(id){view('convs');api('conv?id='+id).then(function(d){var box=$('#convbox');box.classList.remove('hide');
box.innerHTML='<div class="row"><h2 style="margin:0;flex:1">'+who(d.a.name,d.a)+' ↔ '+who(d.b.name,d.b)+'</h2><a class="btn" href="admin/api/export.csv?conv='+d.conv.id+'">CSV</a> '+banBtns(d.a).replace('Заблокировать','Заблокировать '+esc(d.a.name))+' '+banBtns(d.b).replace('Заблокировать','Заблокировать '+esc(d.b.name))+'</div>'+
(d.msgs.length?d.msgs.map(function(m){return'<div class="msg'+(m.author===d.conv.b?' b':'')+(m.deleted?' del':'')+'"><div class="meta"><b>'+esc(m.name)+'</b><span>'+dt(m.ts)+'</span>'+(m.deleted?'<button data-restore="'+m.id+'">Вернуть</button>':'<button class="danger" data-del="'+m.id+'">Удалить</button>')+'</div>'+esc(m.raw)+'</div>'}).join(''):'<p class="mute">Сообщений нет.</p>');
box.setAttribute('data-id',id);box.scrollIntoView({behavior:'smooth'})})}
function loadPeople(){api('visitors?q='+encodeURIComponent($('#pq').value)).then(function(d){$('#people').innerHTML='<table><tr><th>Имя</th><th>Впервые</th><th>Последний раз</th><th>Адрес</th><th></th></tr>'+d.visitors.map(function(v){return'<tr><td>'+who(v.name,v)+' '+(v.online?'<span class="tag on">онлайн</span>':'')+' <span class="mute">'+esc(v.pid)+'</span></td><td class="mute">'+dt(v.first)+'</td><td class="mute">'+dt(v.last)+'</td><td class="mute">'+esc(v.ip)+'</td><td><button data-find="'+esc(v.pid)+'">Переписка</button> '+banBtns(v)+'</td></tr>'}).join('')+'</table>'})}
function refresh(){if(cur==='now'||cur==='bans')loadNow();if(cur==='people')loadPeople();var b=$('#convbox');if(cur==='convs'&&!b.classList.contains('hide'))openConv(b.getAttribute('data-id'))}
$('#cgo').onclick=loadConvs;$('#cq').onkeydown=function(e){if(e.key==='Enter')loadConvs()};$('#pgo').onclick=loadPeople;$('#pq').onkeydown=function(e){if(e.key==='Enter')loadPeople()};
document.addEventListener('click',function(e){var b=e.target.closest('[data-conv],[data-del],[data-restore],[data-ban],[data-unban],[data-done],[data-find]');if(!b)return;
if(b.hasAttribute('data-conv'))openConv(b.getAttribute('data-conv'));
else if(b.hasAttribute('data-find')){$('#cq').value=b.getAttribute('data-find');view('convs')}
else if(b.hasAttribute('data-del'))api('delete',{id:+b.getAttribute('data-del')}).then(refresh);
else if(b.hasAttribute('data-restore'))api('delete',{id:+b.getAttribute('data-restore'),restore:true}).then(refresh);
else if(b.hasAttribute('data-done'))api('report_done',{id:+b.getAttribute('data-done')}).then(refresh);
else if(b.hasAttribute('data-unban'))api('unban',{id:+b.getAttribute('data-unban')}).then(refresh);
else if(b.hasAttribute('data-ban')){var reason=prompt('Причина блокировки (видна только вам):','');if(reason===null)return;
var days=prompt('На сколько дней? Пусто — навсегда.','');if(days===null)return;var ip=confirm('Заблокировать и адрес (IP)? Так сложнее вернуться под другим именем, но может задеть других людей из той же сети.');
api('ban',{visitor:+b.getAttribute('data-ban'),reason:reason,days:days?+days:null,ip:ip}).then(refresh)}});
api('state').then(function(){show(true);view('now')}).catch(function(){show(false)});
timer=setInterval(function(){if(!$('#app').classList.contains('hide')&&document.visibilityState==='visible'&&cur!=='convs')refresh()},10000);
</script></body></html>"""


# ---------------------------------------------------------------- запуск

def check():
    ok = True
    print("база:", DB_PATH)
    d = os.path.dirname(DB_PATH)
    if hasattr(os, "geteuid") and os.geteuid() == 0:
        # от root базу не создаём и не открываем: она стала бы чужой для службы
        import pwd
        if os.path.isdir(d):
            owner = pwd.getpwuid(os.stat(d).st_uid).pw_name
            print("  ✓ папка есть, владелец:", owner, "(должен совпадать с User= в службе)")
        else:
            ok = False
            print("  ✗ папки нет — создайте её от имени пользователя службы:")
            print("    sudo -u develop mkdir -p", d)
        db = None
    else:
        db = True
    try:
        if db is None:
            raise StopIteration
        db = DB(DB_PATH)
        db.run("CREATE TABLE IF NOT EXISTS _check(x)")
        db.run("DROP TABLE _check")
        n = db.one("SELECT COUNT(*) n FROM visitors")["n"]
        print("  ✓ открывается и пишется; посетителей в базе:", n)
    except StopIteration:
        pass
    except Exception as e:
        ok = False
        print("  ✗ не открывается:", e)
        print("    проверьте права на папку", os.path.dirname(DB_PATH), "у пользователя службы")
    if ws_accept("dGhlIHNhbXBsZSBub25jZQ==") == "s3pPLMBiTxaQ9kYGzzhZRbK+xOo=":
        print("  ✓ WebSocket: рукопожатие считается верно")
    else:
        ok = False
        print("  ✗ WebSocket: рукопожатие неверно")
    if ADMIN_PASSWORD:
        print("  ✓ пароль модератора задан (%d символов)" % len(ADMIN_PASSWORD) +
              ("" if len(ADMIN_PASSWORD) >= 10 else " — лучше не короче 10"))
    else:
        print("  ! пароль модератора не задан (LIVE_ADMIN_PASSWORD) — страница модератора будет закрыта")
    print("сайты:", ", ".join(ORIGINS))
    print("слушаю:", "%s:%d" % (HOST, PORT))
    print("готово" if ok else "есть ошибки")
    return ok


def main():
    if "--check" in sys.argv:
        sys.exit(0 if check() else 1)
    db = DB(DB_PATH)
    srv = Server(db)
    loop = asyncio.get_event_loop()
    server = loop.run_until_complete(asyncio.start_server(srv.handle, HOST, PORT, limit=32768))
    asyncio.ensure_future(srv.hub.ticker())
    log("онлайн-режим: %s:%d, база %s, модератор %s" % (HOST, PORT, DB_PATH, "да" if ADMIN_PASSWORD else "нет (пароль не задан)"))
    try:
        loop.run_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.close()


if __name__ == "__main__":
    main()
