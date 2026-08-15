#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Разбор печатного каталога (PDF): кто на странице и где чей портрет.

Зачем. В папке художника лежат вперемешку портрет автора и снимки работ, и
по именам файлов portrait не всегда опознаётся. В печатном каталоге это
известно точно: сверху страницы — имя художника или галереи, а портрет
всегда стоит левее всех остальных изображений.

Что делает скрипт: проходит страницы, берёт заголовок сверху, собирает
изображения с их координатами, самое левое считает портретом, остальные —
работами (в порядке чтения). Для каждого изображения считает устойчивый
отпечаток (dHash), по которому потом можно узнать тот же снимок среди
исходных файлов художника — даже если в PDF он ужат и пересжат.

Запуск:

    python3 tools/pdf-portraits.py catalog.pdf                  # отчёт на экран
    python3 tools/pdf-portraits.py catalog.pdf --json map.json  # карта для prepare.html
    python3 tools/pdf-portraits.py catalog.pdf --dump-dir out   # + сами картинки, посмотреть глазами

Нужен PyMuPDF:  pip install pymupdf
"""

import argparse
import json
import os
import re
import sys

try:
    import pymupdf                      # PyMuPDF ≥ 1.24
except ImportError:                     # старые версии ставились как fitz
    try:
        import fitz as pymupdf
    except ImportError:
        sys.exit("Нужен PyMuPDF: pip install pymupdf")

try:
    from PIL import Image, ImageStat
except ImportError:
    sys.exit("Нужен Pillow: pip install Pillow")

import io


# ---------- отпечаток изображения ----------
# dHash: сравниваем соседние пиксели по горизонтали. Устойчив к изменению
# размера, яркости и пересжатию — то есть переживает и подготовку к печати,
# и наши собственные превью. Совпадение ищем по расстоянию Хэмминга.

HASH_W = 9      # 9 столбцов дают 8 сравнений в строке
HASH_H = 8


def dhash(img):
    g = img.convert("L").resize((HASH_W, HASH_H), Image.LANCZOS)
    px = g.load()
    bits = 0
    for y in range(HASH_H):
        for x in range(HASH_W - 1):
            bits = (bits << 1) | (1 if px[x, y] < px[x + 1, y] else 0)
    return "%016x" % bits


def hamming(a, b):
    return bin(int(a, 16) ^ int(b, 16)).count("1")


# ---------- разбор страницы ----------

# строки, которые заголовком быть не могут
JUNK = re.compile(r"^\s*(\d+|стр\.?\s*\d+|www\.|https?://|art-?rostov|арт-?ростов)\s*$", re.I)


def page_title(page, top_fraction=0.33):
    """Заголовок сверху страницы: самая крупная строка в верхней трети."""
    data = page.get_text("dict")
    limit = page.rect.y0 + page.rect.height * top_fraction
    best = None
    for block in data.get("blocks", []):
        if block.get("type") != 0:                    # 0 — текст, 1 — картинка
            continue
        for line in block.get("lines", []):
            text = "".join(s.get("text", "") for s in line.get("spans", []))
            text = re.sub(r"\s+", " ", text).strip()
            if not text or JUNK.match(text):
                continue
            y = line["bbox"][1]
            if y > limit:
                continue
            size = max((s.get("size", 0) for s in line.get("spans", [])), default=0)
            # крупнее — вероятнее заголовок; при равном кегле берём то, что выше
            key = (round(size, 1), -y)
            if best is None or key > best[0]:
                best = (key, text)
    return best[1] if best else ""


def open_small(data, box=256):
    """Открывает картинку сразу уменьшенной. В печатном каталоге снимки по
    300 dpi — распаковывать их целиком незачем: для отпечатка хватает
    миниатюры, а времени и памяти это экономит на порядок."""
    img = Image.open(io.BytesIO(data))
    try:
        img.draft("L", (box, box))       # быстрый путь для JPEG
    except Exception:
        pass
    img.load()
    return img


def page_images(page, doc, min_side=60, keep_image=False):
    """Изображения страницы с координатами. Мелкие значки отбрасываем."""
    out = []
    parea = page.rect.width * page.rect.height
    for info in page.get_images(full=True):
        xref = info[0]
        try:
            rects = page.get_image_rects(xref)
        except Exception:
            rects = []
        if not rects:
            continue
        try:
            raw = doc.extract_image(xref)
        except Exception:
            continue
        # настоящий размер берём из описания, а не из уменьшенной копии
        full_px = [info[2], info[3]]
        try:
            img = open_small(raw["image"])
        except Exception:
            continue
        if min(full_px) < min_side:                   # логотипы, линейки, иконки
            continue
        h = dhash(img)
        # разброс яркости: у подложки под текстом он около нуля, у снимка
        # работы — десятки. Отличает заливку от изображения надёжнее размера
        sd = ImageStat.Stat(img.convert("L")).stddev[0]
        for r in rects:
            if min(r.width, r.height) < 20:
                continue
            # фон во всю страницу и то, что вынесено за обрез, — не работы
            cover = (r.width * r.height) / parea if parea else 0
            iw = max(0.0, min(r.x1, page.rect.x1) - max(r.x0, page.rect.x0))
            ih = max(0.0, min(r.y1, page.rect.y1) - max(r.y0, page.rect.y0))
            inside = iw * ih / max(1e-6, r.width * r.height)
            if cover >= 0.9 or inside < 0.5:
                continue
            item = {
                "xref": xref,
                "x": round(r.x0, 1), "y": round(r.y0, 1),
                "w_pt": round(r.width, 1), "h_pt": round(r.height, 1),
                "px": full_px,
                "hash": h,
                "sd": round(sd, 1),
            }
            if keep_image:
                item["_img"] = img
            out.append(item)
    # порядок чтения: сверху вниз рядами, внутри ряда слева направо.
    # ряд определяем с допуском — картинки редко выровнены пиксель в пиксель
    if out:
        tol = max(24.0, min(i["h_pt"] for i in out) * 0.5)
        out.sort(key=lambda i: (round(i["y"] / tol), i["x"]))
    return out


def analyse(path, min_side=60, dump_dir=None, min_pt=0.0, flat_sd=14.0, titles=None,
            merge_untitled=False):
    doc = pymupdf.open(path)

    raw = []
    for page in doc:
        imgs = page_images(page, doc, min_side)
        if min_pt:
            imgs = [i for i in imgs if min(i["w_pt"], i["h_pt"]) >= min_pt]
        raw.append((page, imgs))

    # Логотип, плашка, рамка повторяются из страницы в страницу — по этому их
    # и опознаём, не гадая с размерами: работа художника на нескольких
    # страницах подряд не встречается.
    seen = {}
    for _, imgs in raw:
        for h in set(i["hash"] for i in imgs):
            seen[h] = seen.get(h, 0) + 1
    limit = max(3, int(len(raw) * 0.3))
    furniture = set(h for h, c in seen.items() if c >= limit)

    pages = []
    for n, (page, imgs) in enumerate(raw, 1):
        dropped = [i for i in imgs if i["hash"] in furniture]
        imgs = [i for i in imgs if i["hash"] not in furniture]
        title = (titles or {}).get(n) or page_title(page)
        if not imgs:
            pages.append({"page": n, "title": title, "portrait": None, "works": [],
                          "skipped": len(dropped), "note": "изображений не найдено"})
            continue
        # Портрет — самый левый на странице. Но заливки и подложки тоже
        # бывают левее всех, поэтому в кандидаты берём только настоящие
        # изображения: с разбросом яркости выше порога.
        real = [i for i in imgs if i["sd"] >= flat_sd] or imgs
        portrait = min(real, key=lambda i: (round(i["x"], 0), i["y"]))
        works = [i for i in imgs if i is not portrait and i["sd"] >= flat_sd]
        if dump_dir:
            d = os.path.join(dump_dir, "%03d" % n)
            os.makedirs(d, exist_ok=True)
            portrait["_img"].save(os.path.join(d, "portrait.png"))
            for k, w in enumerate(works, 1):
                w["_img"].save(os.path.join(d, "work%d.png" % k))
        strip = lambda i: {k: v for k, v in i.items() if k != "_img"}
        pages.append({
            "page": n,
            "title": title,
            "portrait": strip(portrait),
            "works": [strip(w) for w in works],
            "skipped": len(dropped),
        })
    doc.close()

    if merge_untitled:
        pages = merge_continuations(pages)
    return pages


def merge_continuations(pages):
    """Художнику бывает мало одной страницы: на следующей идут ещё работы,
    но заголовка и портрета там уже нет. Такую страницу приклеиваем к
    предыдущей — иначе часть работ просто потеряется. Признак продолжения:
    нет заголовка, а картинки есть."""
    out = []
    for p in pages:
        cont = not p["title"] and (p.get("portrait") or p.get("works"))
        if cont and out and out[-1]["title"]:
            prev = out[-1]
            if p.get("portrait"):
                prev["works"].append(p["portrait"])      # слева тут уже работа, не портрет
            prev["works"].extend(p.get("works", []))
            prev.setdefault("pages", [prev["page"]]).append(p["page"])
            continue
        out.append(p)
    return out


# ---------- отчёт ----------

def report(pages):
    named = [p for p in pages if p["title"]]
    withimg = [p for p in pages if p.get("portrait")]
    print("страниц: %d, с заголовком: %d, с изображениями: %d"
          % (len(pages), len(named), len(withimg)))
    multi = [p for p in withimg if len(p["works"]) == 0]
    if multi:
        print("страниц, где кроме портрета ничего нет: %d" % len(multi))
    print()
    for p in pages:
        if not p.get("portrait"):
            print("  стр. %3d  %-42s  %s" % (p["page"], (p["title"] or "—")[:42],
                                             p.get("note", "")))
            continue
        pr = p["portrait"]
        print("  стр. %3d  %-42s  портрет %dx%d @x=%.0f  работ: %d"
              % (p["page"], (p["title"] or "— БЕЗ ЗАГОЛОВКА —")[:42],
                 pr["px"][0], pr["px"][1], pr["x"], len(p["works"])))


def main():
    ap = argparse.ArgumentParser(description="Портреты и работы из печатного каталога PDF")
    ap.add_argument("pdf", help="файл каталога")
    ap.add_argument("--json", help="куда сохранить карту (для prepare.html)")
    ap.add_argument("--dump-dir", help="куда выложить извлечённые картинки для проверки глазами")
    ap.add_argument("--min-side", type=int, default=60,
                    help="игнорировать картинки мельче N пикселей (логотипы), по умолчанию 60")
    ap.add_argument("--min-pt", type=float, default=0.0,
                    help="игнорировать картинки мельче N пунктов на странице (1 пункт ≈ 0.35 мм)")
    ap.add_argument("--flat-sd", type=float, default=14.0,
                    help="считать заливкой всё с разбросом яркости ниже N (по умолчанию 14)")
    ap.add_argument("--titles", help="файл JSON {номер страницы: имя} — если в PDF текст переведён в кривые")
    ap.add_argument("--merge-untitled", action="store_true",
                    help="приклеивать страницы без заголовка к предыдущей (продолжение работ художника)")
    args = ap.parse_args()

    titles = None
    if args.titles:
        with open(args.titles, encoding="utf-8") as f:
            titles = {int(k): v for k, v in json.load(f).items()}
    pages = analyse(args.pdf, args.min_side, args.dump_dir, args.min_pt, args.flat_sd,
                    titles, args.merge_untitled)
    report(pages)

    if args.json:
        data = {
            "source": os.path.basename(args.pdf),
            "hash": {"kind": "dhash", "w": HASH_W, "h": HASH_H, "bits": (HASH_W - 1) * HASH_H},
            "pages": [p for p in pages if p.get("portrait")],
        }
        with open(args.json, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=1)
        print("\nкарта сохранена: %s" % args.json)
    if args.dump_dir:
        print("картинки выложены: %s" % args.dump_dir)


if __name__ == "__main__":
    main()
