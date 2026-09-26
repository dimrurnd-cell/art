#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Подготовка художников для каталога: из папок с исходниками — в готовую статику.

Берёт папку, внутри которой лежат папки художников (как их присылают —
фотографии работ плюс текст о художнике в .docx или анкета .xlsx),
и делает из каждой:

  * img/<slug>/avatar.webp|.jpg               — фото автора, 400×400
  * img/<slug>/workN-400|800|1600.webp|.jpg   — работы в трёх размерах
  * artists.generated.json                    — записи для artists.json
  * artcatalog-img.zip                         — архив картинок для сервера

Оригиналы (даже по 14 МБ) остаются у вас: на сайт уходят только сжатые
копии, по 60–250 КБ каждая. В git картинки класть не нужно вовсе.

Запуск:

    python3 tools/prepare-artists.py "путь/к/папке/с/художниками"
    python3 tools/prepare-artists.py "путь" --out static/artcatalog --zip

Если внутри лежат папки разделов («Арт-салон», «Галереи»), а художники —
уже в них, скрипт разложит их по разделам сам: в зале это будут два
отдельных коридора с переключателем.

Нужен Pillow:            pip install Pillow
Для анкет .xlsx:         pip install openpyxl        (необязательно;
                         .docx читается сам, без дополнительных пакетов)
Для фотографий .HEIC:    pip install pillow-heif     (необязательно)
"""

import argparse
import json
import os
import re
import sys
import xml.etree.ElementTree as ET
import zipfile

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Нужен Pillow: pip install Pillow")

try:
    import pillow_heif
    pillow_heif.register_heif_opener()
    HEIC = True
except ImportError:
    HEIC = False

try:
    import openpyxl
    XLSX = True
except ImportError:
    XLSX = False

SIZES = (400, 800, 1600)
PHOTO_EXT = {".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".bmp", ".heic", ".heif"}

# Как назвать папку с картинками латиницей
TRANSLIT = {
    "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "е": "e", "ё": "e", "ж": "zh",
    "з": "z", "и": "i", "й": "y", "к": "k", "л": "l", "м": "m", "н": "n", "о": "o",
    "п": "p", "р": "r", "с": "s", "т": "t", "у": "u", "ф": "f", "х": "kh", "ц": "ts",
    "ч": "ch", "ш": "sh", "щ": "sch", "ъ": "", "ы": "y", "ь": "", "э": "e",
    "ю": "yu", "я": "ya",
}

# Слова, которые в именах файлов не относятся к названию работы
NOISE = re.compile(
    r"\b(каталог|katalog|копия|copy|img|image|photo|фото|final|итог|скан|scan)\b|"
    r"\b(19|20)\d{2}\b|\b\d{1,2}\s*(г|год)\b|\bIMG[_-]?\d+\b|\bDSC[_-]?\d+\b|"
    r"\d{4,}",                       # 20260312_121633 — имя с фотоаппарата
    re.IGNORECASE,
)

# Личные контакты в каталоге не публикуются: в анкетах они попадаются
# вперемешку с городом и биографией, поэтому вычищаем на входе.
PRIVATE = re.compile(
    r"[\w.+-]+@[\w-]+\.[\w.]+"                     # почта
    r"|https?://\S+|\b(?:vk|ok|t)\.me?/\S+"        # ссылки (их берём отдельно)
    r"|(?:\+?\d[\s\-()]*){10,}",                   # телефон
    re.IGNORECASE,
)


def public_text(value):
    """Убирает из текста анкеты личные контакты и лишние знаки."""
    # вычищаем только сами контакты: подписи вроде «тел.» безобидны, а
    # выкусывать их по подстроке опасно — «оформителя» станет «оформи я»
    text = PRIVATE.sub(" ", value or "")
    text = re.sub(r"\s{2,}", " ", text)
    return text.strip(" ,;:-—/").lstrip(".")


# Слова, которые не отличают одну галерею от другой
GENERIC = {"galereya", "galerei", "studiya", "masterskaya", "art", "salon",
           "tsentr", "muzey", "obedinenie", "soyuz", "shkola", "dom"}


def slugify(name, full=False):
    s = name.strip().lower()
    out = []
    for ch in s:
        if ch in TRANSLIT:
            out.append(TRANSLIT[ch])
        elif ch.isalnum():
            out.append(ch)
        elif ch in " -_":
            out.append("-")
    slug = re.sub(r"-+", "-", "".join(out)).strip("-")
    if full:                                   # для разделов: «арт-салон» → art-salon
        return slug or "section"
    # Обычно достаточно фамилии («Вольвич Александра» → volvich), но у галерей
    # первое слово у всех одинаковое — берём то, что их различает.
    parts = [p for p in slug.split("-") if p]
    while len(parts) > 1 and parts[0] in GENERIC:
        parts.pop(0)
    return parts[0] if parts else "artist"


def title_from_filename(path):
    name = os.path.splitext(os.path.basename(path))[0]
    name = re.sub(r"[_\-]+", " ", name)
    name = NOISE.sub(" ", name)
    name = re.sub(r"\s\d{1,2}\s*$", " ", name)       # хвост вида «Ирис 26»
    name = re.sub(r"\s{2,}", " ", name).strip(" .,-")
    if not name or not re.search(r"[^\d\s]", name):   # осталась одна нумерация
        return ""
    return name[0].upper() + name[1:]


W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
R = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"


def read_docx(path):
    """Абзацы документа Word. Сам .docx — это zip с xml, пакетов не нужно."""
    lines, urls = [], []
    with zipfile.ZipFile(path) as z:
        names = z.namelist()
        if "word/document.xml" not in names:
            return []
        targets = {}
        if "word/_rels/document.xml.rels" in names:
            rels = ET.fromstring(z.read("word/_rels/document.xml.rels"))
            for rel in rels:
                t = rel.get("Target", "")
                if t.startswith("http"):
                    targets[rel.get("Id")] = t
        raw = z.read("word/document.xml")
        try:
            doc = ET.fromstring(raw)
        except ET.ParseError:
            # текст всё равно достанем: абзацы разделяем по <w:p>, куски — <w:t>
            text = raw.decode("utf-8", "replace")
            out = []
            for chunk in re.split(r"<w:p[ >]", text)[1:]:
                line = " ".join(re.findall(r"<w:t[^>]*>(.*?)</w:t>", chunk, re.S))
                line = re.sub(r"<[^>]+>", "", line)
                line = re.sub(r"\s+", " ", line).strip()
                if line:
                    out.append(line)
            return out + [t for t in targets.values()]

    def text_of(node):
        return re.sub(r"\s+", " ", "".join(node.itertext())).strip()

    for para in doc.iter(W + "p"):
        text = text_of(para)
        link_text = ""
        for link in para.iter(W + "hyperlink"):
            link_text += text_of(link)
            url = targets.get(link.get(R + "id"))
            if url and url not in urls:
                urls.append(url)
        # абзац целиком — ссылка: её подпись в текст не берём
        if text and text != link_text:
            lines.append(text)
    for url in targets.values():
        if url not in urls:
            urls.append(url)
    return lines + urls


def read_xlsx(path):
    """Ячейки анкеты Excel — по порядку, как они идут в листах."""
    cells = []
    wb = openpyxl.load_workbook(path, data_only=True)
    for ws in wb.worksheets:
        for row in ws.iter_rows(values_only=True):
            for v in row:
                if isinstance(v, str) and v.strip():
                    cells.append(v.strip())
    return cells


# Подписи в анкете: по ним видно, где кончается один ответ и начинается другой
LABELS = re.compile(
    r"^(фамилия|фио|имя|город|населённ|населенн|о себе|биограф|творческ|"
    r"информация|контакт|телефон|почта|e-?mail|соцсет|ссылк|работы|названи)",
    re.IGNORECASE,
)


def read_form(folder):
    """Достаёт из текста о художнике ФИО, город, биографию и соцсети."""
    data = {"name": "", "city": "", "bio": "", "links": []}
    docs = [f for f in os.listdir(folder) if f.lower().endswith(".docx")
            and not f.startswith("~$")]
    forms = [f for f in os.listdir(folder) if f.lower().endswith((".xlsx", ".xlsm"))
             and not f.startswith("~$")]
    cells = []
    try:
        if docs:
            cells = read_docx(os.path.join(folder, docs[0]))
        elif forms and XLSX:
            cells = read_xlsx(os.path.join(folder, forms[0]))
    except Exception as e:                      # файл битый — не повод падать
        print("    ! текст о художнике прочитать не вышло (%s)" % e)
        return data
    if not cells:
        return data

    def after(*keys):
        for i, c in enumerate(cells):
            low = c.lower()
            if any(k in low for k in keys):
                # ответ либо в этой же ячейке после двоеточия, либо в следующей
                tail = c.split(":", 1)[1].strip() if ":" in c else ""
                if len(tail) > 1:
                    return tail
                if i + 1 < len(cells):
                    return cells[i + 1]
        return ""

    def tail(*keys):
        """Всё после подписи и до следующей: в Word рассказ — несколько абзацев."""
        for i, c in enumerate(cells):
            low = c.lower()
            if not any(k in low for k in keys):
                continue
            parts = []
            head = c.split(":", 1)[1].strip() if ":" in c else ""
            if len(head) > 1:
                parts.append(head)
            for nxt in cells[i + 1:]:
                if LABELS.match(nxt) or nxt.startswith("http"):
                    break
                parts.append(nxt)
            if parts:
                return " ".join(parts)
        return ""

    data["name"] = public_text(after("фамилия, имя", "фио", "фамилия имя"))
    # в графе «город» анкеты часто дописывают телефон и почту — берём
    # только сам город и всё равно прогоняем через очистку
    city = after("город", "населённый пункт", "населенный пункт").split(",")[0]
    data["city"] = public_text(re.sub(r"^\s*г\.?\s*", "", city))
    data["bio"] = public_text(tail("о себе", "биограф", "творческ", "информация о"))

    # Текст из Word обычно приходит без подписей — просто рассказ о художнике.
    # Тогда за имя принимаем первую строку, если она похожа на ФИО, за город —
    # строку с «г. …», а всё остальное целиком становится биографией.
    body = [c for c in cells if not c.startswith("http")]
    if not data["name"] and body:
        head = public_text(body[0])
        if re.match(r"^[А-ЯЁA-Z][^.!?]{2,60}$", head) and len(head.split()) <= 5:
            data["name"] = head
            body = body[1:]
    if not data["city"]:
        for c in body:
            m = re.search(r"(?:^|\s)г\.\s*([А-ЯЁ][а-яё-]+(?:[ -][А-ЯЁа-яё-]+)*)", c)
            if m:
                data["city"] = public_text(m.group(1))
                break
    if not data["bio"]:
        data["bio"] = public_text(" ".join(
            c for c in body if len(c) > 40 or re.search(r"[.!?]", c)))
    for c in cells:
        for url in re.findall(r"https?://\S+", c):
            url = url.rstrip(".,;)")
            label = ("ВКонтакте" if "vk.com" in url else
                     "Telegram" if "t.me" in url else
                     "Одноклассники" if "ok.ru" in url else
                     "YouTube" if "youtu" in url else
                     "Сайт")
            if url not in [l["url"] for l in data["links"]]:
                data["links"].append({"label": label, "url": url})
    return data


def save_variants(img, out_dir, stem, sizes):
    """Сохраняет картинку в webp и jpeg во всех размерах. Возвращает размер оригинала."""
    img = ImageOps.exif_transpose(img)          # снимки с телефона бывают повёрнуты
    if img.mode not in ("RGB", "L"):
        img = img.convert("RGB")
    w, h = img.size
    for size in sizes:
        copy = img.copy()
        copy.thumbnail((size, size), Image.LANCZOS)
        base = os.path.join(out_dir, stem if len(sizes) == 1 else "%s-%d" % (stem, size))
        copy.save(base + ".webp", "WEBP", quality=80, method=5)
        copy.save(base + ".jpg", "JPEG", quality=82, optimize=True, progressive=True)
    return w, h


def square(img, size=400):
    img = ImageOps.exif_transpose(img)
    if img.mode not in ("RGB", "L"):
        img = img.convert("RGB")
    return ImageOps.fit(img, (size, size), Image.LANCZOS, centering=(0.5, 0.35))


def process_artist(folder, out_root, order, taken, section=""):
    name_from_folder = os.path.basename(folder.rstrip("/\\"))
    slug = base = slugify(name_from_folder)
    # однофамильцы в списке — обычное дело; папки развести обязательно,
    # иначе второй художник затрёт работы первого
    n = 2
    while slug in taken or os.path.isdir(os.path.join(out_root, "img", slug)):
        slug = "%s%d" % (base, n)
        n += 1
    if slug != base:
        print("    ! папка %s уже занята, беру %s" % (base, slug))
    taken.add(slug)
    print("· %s  →  img/%s/" % (name_from_folder, slug))

    photos = sorted(
        os.path.join(folder, f) for f in os.listdir(folder)
        if os.path.splitext(f)[1].lower() in PHOTO_EXT and not f.startswith((".", "~"))
    )
    heic = [p for p in photos if p.lower().endswith((".heic", ".heif"))]
    if heic and not HEIC:
        print("    ! пропускаю %d фото .heic — поставьте pillow-heif" % len(heic))
        photos = [p for p in photos if p not in heic]
    if not photos:
        print("    ! фотографий не нашлось, пропускаю")
        return None

    # Портрет автора — файл, в имени которого есть фамилия из названия папки
    words = [w.lower() for w in name_from_folder.split() if len(w) >= 4]
    portraits = [p for p in photos
                 if any(w in os.path.basename(p).lower() for w in words)
                 or re.search(r"портрет|автор|photo|avatar", os.path.basename(p), re.I)]
    avatar_src = portraits[0] if portraits else photos[0]
    works_src = [p for p in photos if p != avatar_src]
    if not portraits:
        print("    ! портрет не опознан, взял первый файл: %s"
              % os.path.basename(avatar_src))

    art_dir = os.path.join(out_root, "img", slug)
    os.makedirs(art_dir, exist_ok=True)

    with Image.open(avatar_src) as im:
        save_variants(square(im), art_dir, "avatar", (400,))

    works = []
    for i, src in enumerate(works_src, 1):
        with Image.open(src) as im:
            w, h = save_variants(im, art_dir, "work%d" % i, SIZES)
        works.append({
            "title": title_from_filename(src),
            "thumb": "img/%s/work%d-400.webp" % (slug, i),
            "medium": "img/%s/work%d-800.webp" % (slug, i),
            "full": "img/%s/work%d-1600.webp" % (slug, i),
            "w": w, "h": h,
        })
    print("    работ: %d" % len(works))

    form = read_form(folder)
    if not form["name"]:
        print("    ! ФИО из анкеты не вытащил — впишите вручную")
    entry = {
        "id": slug,
        "name": form["name"] or name_from_folder,
        "city": form["city"] or "Ростов-на-Дону",
        "bio": form["bio"] or "",
        "links": form["links"],
        "avatar": "img/%s/avatar.webp" % slug,
        "works": works,
        "order": order,
    }
    if section:
        entry["section"] = section
    return entry


def main():
    ap = argparse.ArgumentParser(description="Подготовка художников для каталога")
    ap.add_argument("src", help="папка, внутри которой лежат папки художников")
    ap.add_argument("--out", default=os.path.join(os.path.dirname(__file__), "..",
                                                  "static", "artcatalog"),
                    help="куда класть результат (по умолчанию static/artcatalog)")
    ap.add_argument("--start-order", type=int, default=1,
                    help="с какого номера продолжать порядок художников")
    ap.add_argument("--zip", action="store_true",
                    help="сложить готовые картинки в artcatalog-img.zip для сервера")
    args = ap.parse_args()

    out_root = os.path.abspath(args.out)
    src = os.path.abspath(args.src)
    def subdirs(path):
        return sorted(
            os.path.join(path, d) for d in os.listdir(path)
            if os.path.isdir(os.path.join(path, d)) and not d.startswith(".")
        )

    def has_photos(path):
        return any(os.path.splitext(f)[1].lower() in PHOTO_EXT for f in os.listdir(path))

    # Внутри могут лежать либо сразу художники, либо разделы, а художники в них
    top = subdirs(src)
    if not top:
        sys.exit("В «%s» нет папок художников" % src)
    sections, folders = [], []
    if any(not has_photos(d) and subdirs(d) for d in top):
        for d in top:
            title = os.path.basename(d)
            sec_id = slugify(title, full=True)
            inner = subdirs(d)
            if not inner:
                continue
            sections.append({"id": sec_id, "title": title})
            folders += [(f, sec_id) for f in inner]
    else:
        folders = [(f, "") for f in top]

    print("Готовлю %d художников%s. Анкеты: %s. HEIC: %s.\n"
          % (len(folders),
             (" в %d разделах" % len(sections)) if sections else "",
             "да" if XLSX else "нет (pip install openpyxl)",
             "да" if HEIC else "нет (pip install pillow-heif)"))

    artists, taken = [], set()
    counters = {}
    for folder, sec_id in folders:
        counters[sec_id] = counters.get(sec_id, 0) + 1
        entry = process_artist(folder, out_root, args.start_order + counters[sec_id] - 1,
                               taken, sec_id)
        if entry:
            artists.append(entry)

    out = {"artists": artists}
    if sections:
        out = {"sections": sections, "artists": artists}
    dest = os.path.join(out_root, "artists.generated.json")
    with open(dest, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)

    total = sum(len(a["works"]) for a in artists)
    print("\nГотово: %d художников, %d работ." % (len(artists), total))
    print("Данные:   %s" % dest)
    print("Картинки: %s" % os.path.join(out_root, "img"))
    print("\nДальше: проверьте названия работ и тексты в artists.generated.json,")
    print("перенесите записи в artists.json, картинки — на сервер в")
    print("/home/develop/donexpo/static/artcatalog/img/")

    if args.zip:
        zpath = os.path.join(out_root, "artcatalog-img.zip")
        img_root = os.path.join(out_root, "img")
        with zipfile.ZipFile(zpath, "w", zipfile.ZIP_STORED) as z:   # jpeg/webp уже сжаты
            for root, _, files in os.walk(img_root):
                for fn in files:
                    p = os.path.join(root, fn)
                    z.write(p, os.path.relpath(p, out_root))
        print("Архив:    %s (%.1f МБ)" % (zpath, os.path.getsize(zpath) / 1048576))


if __name__ == "__main__":
    main()
