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
"""
from __future__ import unicode_literals

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

PHONE_RE = re.compile(r"^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$")
EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]{2,}$")


def _client_ip(request):
    xff = request.META.get("HTTP_X_FORWARDED_FOR")
    if xff:
        return xff.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR", "unknown")


def _rate_exceeded(ip):
    """True, если с этого IP уже отправлено RATE_LIMIT заявок за окно.

    Только штатные cache.add/incr — работает на Django 1.8
    (cache.get_or_set появился в 1.9).
    """
    key = "artcatalog:lead:%s" % ip
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

    # honeypot: люди это поле не видят и не заполняют
    if data.get("website"):
        return JsonResponse({"ok": True})

    phone = (data.get("phone") or "").strip()
    email = (data.get("email") or "").strip()
    artist = (data.get("artist") or "").strip()[:200]
    work = (data.get("work") or "").strip()[:200]
    work_url = (data.get("work_url") or "").strip()[:500]
    page = (data.get("page") or "").strip()[:300]

    if not PHONE_RE.match(phone):
        return JsonResponse({"error": "Укажите телефон в формате +7 (XXX) XXX-XX-XX."}, status=400)
    if not EMAIL_RE.match(email):
        return JsonResponse({"error": "Укажите корректный email."}, status=400)
    if not artist:
        return JsonResponse({"error": "Не указан художник."}, status=400)

    ip = _client_ip(request)
    if _rate_exceeded(ip):
        return JsonResponse({"error": "Слишком много заявок. Попробуйте позже."}, status=429)

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
