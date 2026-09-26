#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Сборка варианта каталога для сервера без CORS-заголовков.

Создаёт два файла в static/artcatalog/:
  catalog-standalone.css — стили каталога и зала вместе со шрифтом,
                           встроенным прямо в файл (шрифт по обычной
                           ссылке требовал бы разрешения сервера);
  artists.js             — те же данные, что в artists.json, но в виде
                           обычного скрипта: его браузер грузит с любого
                           домена без разрешения.

Запуск после любых правок стилей или данных:
    python3 tools/build-standalone.py
"""
import base64
import json
import os
import re

BASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'static', 'artcatalog')
BASE = os.path.normpath(BASE)


def build_css():
    catalog = open(os.path.join(BASE, 'catalog.css'), encoding='utf-8').read()
    hall = open(os.path.join(BASE, 'hall.css'), encoding='utf-8').read()

    font = open(os.path.join(BASE, 'fonts', 'parangon.woff2'), 'rb').read()
    font_b64 = base64.b64encode(font).decode('ascii')

    # заменяем ссылку на файл шрифта его содержимым
    catalog = re.sub(
        r"src:\s*url\('fonts/parangon\.woff2'\)\s*format\('woff2'\);",
        "src: url(data:font/woff2;base64," + font_b64 + ") format('woff2');",
        catalog,
    )

    out = (
        '/* Собрано автоматически: tools/build-standalone.py\n'
        '   Стили каталога и зала + встроенный шрифт Parangon.\n'
        '   Правьте catalog.css и hall.css, затем пересоберите этот файл. */\n\n'
        + catalog + '\n\n' + hall
    )
    path = os.path.join(BASE, 'catalog-standalone.css')
    open(path, 'w', encoding='utf-8').write(out)
    return path, len(out.encode('utf-8'))


def build_data():
    data = json.load(open(os.path.join(BASE, 'artists.json'), encoding='utf-8'))
    out = (
        '/* Собрано автоматически: tools/build-standalone.py\n'
        '   Данные художников для сервера без CORS-заголовков.\n'
        '   Правьте artists.json, затем пересоберите этот файл. */\n'
        'window.ARTCATALOG_DATA = '
        + json.dumps(data, ensure_ascii=False, separators=(',', ':'))
        + ';\n'
    )
    path = os.path.join(BASE, 'artists.js')
    open(path, 'w', encoding='utf-8').write(out)
    return path, len(out.encode('utf-8'))


if __name__ == '__main__':
    for path, size in (build_css(), build_data()):
        print('%-52s %8d байт' % (os.path.basename(path), size))
