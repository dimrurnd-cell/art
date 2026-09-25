#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Движение куратора: из кадров ролика (Wan 2.2 по фото) и их масок — цикл
для сайта.

    python3 tools/curator-anim.py КАДРЫ МАСКИ --range 1-40 --out static/artcatalog/curator/

КАДРЫ — PNG ролика (001.png, 002.png …: ffmpeg -i clip.mp4 КАДРЫ/%03d.png),
МАСКИ — альфа-маски тех же кадров с теми же именами (rembg, модель
birefnet-portrait: rembg.remove(img, session=…, only_mask=True)).

Что делает:
  1. маска сглаживается по времени (соседние кадры 1:2:1) — край не дрожит;
  2. цвет полупрозрачного края очищается от фона: фон ролика ровный и
     известный (--bg), F = (C − (1 − a)·B) / a — без серого ореола;
  3. цикл «туда-обратно» с плавным разгоном и торможением: кадры 1…N вперёд,
     потом назад; в разворотах движение замирает, поэтому шва нет.
     Промежуточные положения — смешение соседних кадров;
  4. кадрирование: низ кадра — пол (ступни в первом кадре), стоящая фигура
     (первый кадр) — FIG = 90 % высоты кадра, по ширине — с запасом на все
     кадры. Этого соглашения ждут gallery/src/curator.js и catalog.js;
  5. выход:
     idle.mp4  — для 3D: в каждом кадре сверху цвет, снизу прозрачность серым
                 (H.264: Chrome, Safari, iPhone), 24 кадра/с;
     idle.webm — то же в VP9: для браузеров без H.264;
     idle.webp — для простого зала: анимированный WebP с прозрачностью;
     preview.mp4 (рядом с этим файлом, в --preview) — на цвете стены, посмотреть.

Нужны Pillow, numpy и imageio-ffmpeg (pip install imageio-ffmpeg).
"""
import argparse
import glob
import os
import subprocess
import sys

import numpy as np
from PIL import Image, ImageFilter

FIG = 0.9


def load(frames, masks, a, b):
    names = sorted(os.path.basename(p) for p in glob.glob(os.path.join(frames, '*.png')))[a - 1:b]
    if not names:
        sys.exit('нет кадров в ' + frames)
    col = [np.asarray(Image.open(os.path.join(frames, n)).convert('RGB'), dtype=np.float32) for n in names]
    # край маски подрезан на пиксель и смягчён: ореол исходного фото (на нём
    # за спиной была красная картина) нейросеть повторяла тонкой кромкой
    alp = [np.asarray(Image.open(os.path.join(masks, n)).convert('L').filter(ImageFilter.MinFilter(3))
                      .filter(ImageFilter.GaussianBlur(0.6)), dtype=np.float32) / 255 for n in names]
    return col, alp


def smooth_alpha(alp):
    out = []
    for i in range(len(alp)):
        p, n = alp[max(0, i - 1)], alp[min(len(alp) - 1, i + 1)]
        out.append(0.25 * p + 0.5 * alp[i] + 0.25 * n)
    return out


def frame_bg(c, a, bg):
    """Цвет фона этого кадра: у нейросети он слегка гуляет по яркости"""
    m = a < 0.02
    return np.median(c[m], axis=0) if m.sum() > 1000 else bg


def decontaminate(c, a, bg):
    a3 = a[..., None]
    f = np.where(a3 > 0.04, (c - (1 - a3) * bg) / np.maximum(a3, 0.04), c)
    # полупрозрачная кромка — почти без цвета: так не видно цветного ободка
    k = (np.clip((0.9 - a3) / 0.9, 0, 1) * 0.8)
    lum = (f * np.array([0.299, 0.587, 0.114], dtype=np.float32)).sum(axis=2, keepdims=True)
    f = f * (1 - k) + lum * k
    return np.clip(f, 0, 255)


def timeline(n, fps_in, fps_out, hold):
    """Положения (дробный номер кадра) на весь цикл: пауза, вперёд с
    разгоном и торможением, пауза, назад"""
    go = int(round((n - 1) / fps_in * fps_out * 1.15))      # чуть медленнее исходного
    ease = lambda t: t * t * (3 - 2 * t)
    fwd = [(n - 1) * ease(k / (go - 1)) for k in range(go)]
    h = [0.0] * int(round(hold * fps_out))
    return h + fwd + [float(n - 1)] * int(round(hold * fps_out * 0.5)) + fwd[::-1][1:-1]


def frame_at(col, alp, t):
    i = int(np.floor(t))
    w = t - i
    j = min(i + 1, len(col) - 1)
    a = alp[i] * (1 - w) + alp[j] * w
    # смешение с учётом прозрачности (premultiplied), потом обратно
    pc = col[i] * alp[i][..., None] * (1 - w) + col[j] * alp[j][..., None] * w
    c = pc / np.maximum(a[..., None], 1e-4)
    return c, a


def crop_box(alp, width_pad=0.04):
    m0 = alp[0] > 0.5
    ys, xs = np.nonzero(m0)
    top, bot = ys.min(), ys.max() + 1
    cx = (xs.min() + xs.max() + 1) / 2
    fh = (bot - top) / FIG
    half = 0
    for a in alp:
        ys2, xs2 = np.nonzero(a > 0.05)
        half = max(half, abs(xs2.min() - cx), abs(xs2.max() + 1 - cx))
    half *= 1 + width_pad
    return cx, bot, fh, half


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('frames')
    ap.add_argument('masks')
    ap.add_argument('--range', default='1-9999')
    ap.add_argument('--bg', default='236,234,229', help='цвет фона ролика, R,G,B')
    ap.add_argument('--fps-in', type=float, default=16)
    ap.add_argument('--hold', type=float, default=0.6, help='пауза в исходной позе, с')
    ap.add_argument('--height', type=int, default=768, help='высота кадра на выходе')
    ap.add_argument('--webp-height', type=int, default=640)
    ap.add_argument('--webp-fps', type=float, default=15)
    ap.add_argument('--out', default='static/artcatalog/curator/')
    ap.add_argument('--preview', default=None)
    ap.add_argument('--wall', default='243,241,236', help='цвет стены для превью')
    o = ap.parse_args()
    import imageio_ffmpeg
    ff = imageio_ffmpeg.get_ffmpeg_exe()

    a, b = [int(x) for x in o.range.split('-')]
    col, alp = load(o.frames, o.masks, a, b)
    bg = np.array([float(x) for x in o.bg.split(',')], dtype=np.float32)
    alp = smooth_alpha(alp)
    col = [decontaminate(c, al, frame_bg(c, al, bg)) for c, al in zip(col, alp)]
    cx, bot, fh, half = crop_box(alp)
    H0, W0 = alp[0].shape

    def cropped(c, al, height, even=16):
        s = height / fh
        w = int(np.ceil(2 * half * s / even) * even)
        # область исходного кадра, которая попадёт в выходной (с полями, если выходит за край)
        x0, y0 = cx - w / 2 / s, bot - fh
        rgba = np.dstack([c, al * 255]).astype(np.uint8)
        im = Image.fromarray(rgba, 'RGBA')
        box = (int(round(x0)), int(round(y0)), int(round(x0 + w / s)), int(round(y0 + fh)))
        canvas = Image.new('RGBA', (box[2] - box[0], box[3] - box[1]), (0, 0, 0, 0))
        canvas.paste(im, (-box[0], -box[1]))
        return canvas.resize((w, height), Image.LANCZOS)

    def run(args, frames_rgb, size, fps):
        p = subprocess.Popen([ff, '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24',
                              '-s', '%dx%d' % size, '-r', str(fps), '-i', '-'] + args, stdin=subprocess.PIPE)
        for f in frames_rgb:
            p.stdin.write(f.tobytes())
        p.stdin.close()
        if p.wait():
            sys.exit('ffmpeg: ошибка')

    os.makedirs(o.out, exist_ok=True)

    # 3D: цвет сверху, прозрачность снизу, 24 кадра/с
    tl = timeline(len(col), o.fps_in, 24, o.hold)
    stacked = []
    for t in tl:
        c, al = frame_at(col, alp, t)
        fr = cropped(c, al, o.height)
        rgba = np.asarray(fr).astype(np.float32)
        aa = rgba[..., 3:4] / 255
        # цвет края — очищенный (смешивает с фоном уже видеокарта по маске);
        # совсем прозрачное — цветом фона, иначе фильтрация даст тёмную кайму
        top = np.where(aa > 0.004, rgba[..., :3], bg)
        bottom = np.repeat(rgba[..., 3:4], 3, axis=2)
        stacked.append(np.vstack([top, bottom]).round().astype(np.uint8))
    w, h2 = stacked[0].shape[1], stacked[0].shape[0]
    mp4 = os.path.join(o.out, 'idle.mp4')
    run(['-an', '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-preset', 'slow', '-crf', '20',
         '-g', str(len(stacked)), '-movflags', '+faststart', mp4], stacked, (w, h2), 24)
    print('idle.mp4: %d×%d, %d кадров, %.1f с, %d байт' % (w, h2, len(stacked), len(stacked) / 24, os.path.getsize(mp4)))
    # то же в VP9 — для браузеров без H.264 (свободные сборки Chromium)
    webm = os.path.join(o.out, 'idle.webm')
    run(['-an', '-c:v', 'libvpx-vp9', '-pix_fmt', 'yuv420p', '-b:v', '0', '-crf', '34', '-row-mt', '1',
         '-deadline', 'good', '-cpu-used', '2', '-g', str(len(stacked)), webm], stacked, (w, h2), 24)
    print('idle.webm: %d байт' % os.path.getsize(webm))

    # простой зал: анимированный WebP с прозрачностью
    tlw = timeline(len(col), o.fps_in, o.webp_fps, o.hold)
    ims = []
    for t in tlw:
        c, al = frame_at(col, alp, t)
        ims.append(cropped(c, al, o.webp_height))
    webp = os.path.join(o.out, 'idle.webp')
    ims[0].save(webp, 'WEBP', save_all=True, append_images=ims[1:], duration=int(round(1000 / o.webp_fps)),
                loop=0, quality=78, alpha_quality=85, method=6)
    print('idle.webp: %d×%d, %d кадров, %d байт' % (ims[0].width, ims[0].height, len(ims), os.path.getsize(webp)))

    if o.preview:
        wall = np.array([float(x) for x in o.wall.split(',')], dtype=np.float32)
        prev = []
        for f in stacked:
            top, al = f[:f.shape[0] // 2].astype(np.float32), f[f.shape[0] // 2:, :, :1].astype(np.float32) / 255
            prev.append((top * al + wall * (1 - al)).round().astype(np.uint8))
        run(['-an', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-movflags', '+faststart', o.preview],
            prev * 3, (w, h2 // 2), 24)
        print('превью:', o.preview)


if __name__ == '__main__':
    main()
