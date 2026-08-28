# -*- coding: utf-8 -*-
"""Собирает картинки печатного каталога и цветовые подписи к ним.

Запуск:  python3 build-images.py     (рядом должен лежать catalog.pdf)

Подпись устойчива к кадрированию: верстальщик обрезал фотографии под макет,
и отпечаток dHash этого не переживает (обрез 10% = расхождение 19 бит, как у
чужого снимка), а доля пикселей по цветовым ячейкам почти не меняется.

Картинки нужны как замена: если снимка нет среди файлов участника (не
прислал, лежит в .tif, который браузер не открывает), берём из каталога.
"""
import io, json, os, zipfile
import pymupdf
from PIL import Image

BINS = 4
MAP = "/home/user/art/catalog/tools/catalog-pdf/catalog-map.json"


def sig_hex(im):
    """Цветовая подпись: 64 ячейки, каждая — доля пикселей, 0..255."""
    small = im.convert("RGB").resize((64, 64), Image.LANCZOS)
    px = small.load()
    h = [0] * (BINS ** 3)
    for y in range(64):
        for x in range(64):
            r, g, b = px[x, y]
            h[(r * BINS // 256) * BINS * BINS + (g * BINS // 256) * BINS + (b * BINS // 256)] += 1
    total = float(sum(h)) or 1.0
    return "".join("%02x" % min(255, int(round(v / total * 255 * 8))) for v in h)


def main():
    m = json.load(open(MAP, encoding="utf-8"))
    doc = pymupdf.open("catalog.pdf")
    zf = zipfile.ZipFile("catalog-images.zip", "w", zipfile.ZIP_STORED)
    seen = {}
    done = 0
    for rec in m["pages"]:
        items = [("portrait", rec["portrait"])] + [("work%d" % (i + 1), w) for i, w in enumerate(rec["works"])]
        for name, it in items:
            xref = it["xref"]
            try:
                d = doc.extract_image(xref)
                im = Image.open(io.BytesIO(d["image"]))
                im.load()
            except Exception:
                continue
            if im.mode not in ("RGB", "L"):
                im = im.convert("RGB")
            if xref in seen:
                it["sig"] = seen[xref]
            else:
                it["sig"] = sig_hex(im)
                seen[xref] = it["sig"]
            out = im.copy()
            out.thumbnail((900, 900), Image.LANCZOS)
            if out.mode != "RGB":
                out = out.convert("RGB")
            buf = io.BytesIO()
            out.save(buf, "JPEG", quality=82, optimize=True)
            zf.writestr("p%d/%s.jpg" % (rec["page"], name), buf.getvalue())
        done += 1
        if done % 20 == 0:
            print("...", done, "записей", flush=True)
    zf.close()
    doc.close()
    m["sig"] = {"kind": "rgb444", "bins": BINS}
    json.dump(m, open(MAP, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("ГОТОВО. карта: %.0f КБ, архив картинок: %.1f МБ"
          % (os.path.getsize(MAP) / 1024, os.path.getsize("catalog-images.zip") / 1048576))


if __name__ == "__main__":
    main()
