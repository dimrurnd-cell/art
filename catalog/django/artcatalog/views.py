# -*- coding: utf-8 -*-
"""
Приём заявок «Хочу купить» из виджета онлайн-каталога Арт-Ростов.

Совместимо с Django 1.8+ (включая старые django CMS-проекты) и Python 2.7/3.x.

GET  /api/artcatalog/lead/  — выставляет csrftoken-cookie (виджет вызывает
                              его при открытии формы).
POST /api/artcatalog/lead/  — принимает JSON-заявку, шлёт письмо на
                              ARTCATALOG_LEAD_EMAIL (по умолчанию
                              ads@donexpocentre.ru) и дублирует в лог.

Настройки (settings.py, все необязательны):
    ARTCATALOG_LEAD_EMAIL      = "ads@donexpocentre.ru"
    ARTCATALOG_RATE_LIMIT      = 5          # заявок с одного IP…
    ARTCATALOG_RATE_WINDOW     = 3600       # …за столько секунд
    ARTCATALOG_IP_HEADER       = ""         # заголовок с адресом посетителя, который
                                            # ставит ваш nginx, напр. "HTTP_X_REAL_IP"

Лимит заявок хранится в кеше Django: нужен общий для всех процессов кеш
(Redis, memcached или database cache), иначе у каждого процесса свой счётчик.
"""
from __future__ import unicode_literals

import hashlib
import json
import logging
import re

from django.conf import settings
from django.core.cache import cache
from django.core.mail import send_mail
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.utils import timezone
from django.views.decorators.http import require_http_methods

logger = logging.getLogger("artcatalog.leads")

LEAD_EMAIL = getattr(settings, "ARTCATALOG_LEAD_EMAIL", "ads@donexpocentre.ru")
RATE_LIMIT = getattr(settings, "ARTCATALOG_RATE_LIMIT", 5)
RATE_WINDOW = getattr(settings, "ARTCATALOG_RATE_WINDOW", 3600)
IP_HEADER = getattr(settings, "ARTCATALOG_IP_HEADER", "")
TEXT = type("")

PHONE_RE = re.compile(r"^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$")
EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]{2,}$")


def _private(ip):
    """Адрес самого сервера или внутренней сети — значит, перед Django прокси"""
    return (not ip or ip in ("::1", "localhost") or ip.startswith(("127.", "10.", "192.168.", "fc", "fd"))
            or bool(re.match(r"^172\.(1[6-9]|2\d|3[01])\.", ip)))


def _client_ips(request):
    """Адреса посетителя, которым можно верить хотя бы отчасти.

    Первый элемент X-Forwarded-For присылает сам клиент — по нему лимит
    обходился подменой заголовка. За прокси берём X-Real-IP и последний
    элемент X-Forwarded-For (его дописывает наш nginx): какой из них ставит
    именно ваш nginx, неизвестно, поэтому лимит считается по обоим — подделать
    сразу оба посетитель не может. ARTCATALOG_IP_HEADER задаёт заголовок явно.
    """
    meta = request.META
    if IP_HEADER:
        ip = (meta.get(IP_HEADER) or "").split(",")[-1].strip()
        return [ip or meta.get("REMOTE_ADDR") or "unknown"]
    remote = (meta.get("REMOTE_ADDR") or "").strip()
    if remote and not _private(remote):
        return [remote]                            # прямое подключение или uwsgi
    ips = []
    real = (meta.get("HTTP_X_REAL_IP") or "").strip()
    last = (meta.get("HTTP_X_FORWARDED_FOR") or "").split(",")[-1].strip()
    for ip in (real, last):
        if ip and ip not in ips:
            ips.append(ip[:64])
    return ips or [remote or "unknown"]


def _rate_exceeded(ip):
    """True, если с этого IP уже отправлено RATE_LIMIT заявок за окно.

    Только штатные cache.add/incr — работает на Django 1.8
    (cache.get_or_set появился в 1.9).
    """
    # хеш — ключ кеша без пробелов и посторонних символов при любом заголовке
    key = "artcatalog:lead:%s" % hashlib.sha1(ip.encode("utf-8")).hexdigest()
    cache.add(key, 0, RATE_WINDOW)
    try:
        count = cache.incr(key)
    except ValueError:
        cache.set(key, 1, RATE_WINDOW)
        count = 1
    return count > RATE_LIMIT


@require_http_methods(["GET", "POST"])
def lead(request):
    if request.method == "GET":
        # выставляем csrf-cookie для последующего POST из виджета
        get_token(request)
        return JsonResponse({"ok": True})

    try:
        data = json.loads(request.body.decode("utf-8"))
    except (ValueError, UnicodeDecodeError):
        return JsonResponse({"error": "Некорректный запрос."}, status=400)
    if not isinstance(data, dict):
        return JsonResponse({"error": "Некорректный запрос."}, status=400)

    # honeypot: люди это поле не видят и не заполняют
    if data.get("website"):
        return JsonResponse({"ok": True})

    def field(name, n, line=False):
        v = data.get(name)
        v = v if isinstance(v, TEXT) else ""
        if line:                                   # тема письма — одна строка
            v = re.sub(r"[\r\n\t]+", " ", v)
        return v.strip()[:n]

    phone = field("phone", 40)
    email = field("email", 254)
    artist = field("artist", 200, True)
    work = field("work", 200, True)
    work_url = field("work_url", 500, True)
    page = field("page", 300, True)

    if not PHONE_RE.match(phone):
        return JsonResponse({"error": "Укажите телефон в формате +7 (XXX) XXX-XX-XX."}, status=400)
    if not EMAIL_RE.match(email):
        return JsonResponse({"error": "Укажите корректный email."}, status=400)
    if not artist:
        return JsonResponse({"error": "Не указан художник."}, status=400)

    ips = _client_ips(request)
    if any([_rate_exceeded(x) for x in ips]):      # список: счёт идёт по всем адресам
        return JsonResponse({"error": "Слишком много заявок. Попробуйте позже."}, status=429)
    ip = " / ".join(ips)

    now = timezone.localtime(timezone.now()).strftime("%d.%m.%Y %H:%M")
    subject = "Заявка на покупку — %s — Арт-Ростов" % artist
    body_lines = [
        "Новая заявка из онлайн-каталога «Арт-Ростов»",
        "",
        "Художник: %s" % artist,
    ]
    if work:
        body_lines.append("Работа: %s" % work)
    if work_url:
        body_lines.append("Изображение: %s" % work_url)
    body_lines += [
        "Телефон: %s" % phone,
        "Email: %s" % email,
        "Дата и время: %s" % now,
        "Страница: %s" % page,
        "IP: %s" % ip,
        "",
    ]
    body = "\n".join(body_lines)

    # резервная копия заявки в лог — на случай проблем с почтой
    logger.info("lead artist=%r work=%r phone=%r email=%r ip=%s page=%r",
                artist, work, phone, email, ip, page)

    try:
        send_mail(
            subject,
            body,
            getattr(settings, "DEFAULT_FROM_EMAIL", None) or "noreply@donexpocentre.ru",
            [LEAD_EMAIL],
            fail_silently=False,
        )
    except Exception:
        logger.exception("lead email delivery failed")
        return JsonResponse(
            {"error": "Не удалось отправить заявку. Попробуйте позже."}, status=502
        )

    return JsonResponse({"ok": True})
