#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Фактуры 3D-галереи: цвет, рельеф (карта нормалей) и ORM-карта
(R — затенение впадин, G — шероховатость, B — металличность) для каждого
материала помещения. Всё процедурное и бесшовное: шум строится в частотной
области, поэтому плитка повторяется без стыков. Лицензионных вопросов нет —
это не чужие фотографии, а результат этого скрипта.

Запуск (нужны numpy и Pillow):
    python3 catalog/gallery/tools/gen-textures.py
Результат: catalog/static/artcatalog/gallery-assets/{hi,lo}/<материал>_{color,normal,orm}.webp
    hi — для компьютера (2048 px у пола и стен), lo — для телефона (вдвое меньше).
Детерминированно: одинаковый результат при каждом запуске.
"""
import os
import numpy as np
from PIL import Image

OUT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                    '..', '..', 'static', 'artcatalog', 'gallery-assets'))
rng = np.random.default_rng(20260922)


# ---------------------------------------------------------------- шум

def spectral(n, beta, aniso=(1.0, 1.0), angle=0.0, lo=0.0, hi=None):
    """Бесшовный шум n×n со спектром 1/f^beta. aniso растягивает зерно вдоль
    направления angle (штрихи, волокна, следы кельмы). lo/hi — полоса частот."""
    fy = np.fft.fftfreq(n)[:, None] * n
    fx = np.fft.fftfreq(n)[None, :] * n
    c, s = np.cos(angle), np.sin(angle)
    u = (fx * c + fy * s) * aniso[0]
    v = (-fx * s + fy * c) * aniso[1]
    f = np.sqrt(u * u + v * v)
    f[0, 0] = 1.0
    amp = f ** (-beta / 2.0)
    if lo:
        amp *= 1.0 / (1.0 + (lo / f) ** 4)
    if hi:
        amp *= 1.0 / (1.0 + (f / hi) ** 4)
    amp[0, 0] = 0.0
    phase = np.exp(2j * np.pi * rng.random((n, n)))
    out = np.real(np.fft.ifft2(amp * phase))
    out -= out.mean()
    return out / (out.std() + 1e-9)


def norm01(a):
    a = a - a.min()
    return a / (a.max() + 1e-9)


def normal_map(h, strength):
    """Карта нормалей из высот (бесшовно: разности берутся по кругу)."""
    dx = (np.roll(h, -1, 1) - np.roll(h, 1, 1)) * 0.5 * strength
    dy = (np.roll(h, -1, 0) - np.roll(h, 1, 0)) * 0.5 * strength
    nz = np.ones_like(h)
    l = np.sqrt(dx * dx + dy * dy + nz * nz)
    # OpenGL-соглашение (как в three.js): зелёный вверх
    n = np.stack([-dx / l, dy / l, nz / l], -1)
    return ((n * 0.5 + 0.5) * 255).clip(0, 255).astype(np.uint8)


def cavity(h, radius=6):
    """Затенение впадин: насколько точка ниже своего окружения."""
    k = np.fft.fftfreq(h.shape[0])[:, None] ** 2 + np.fft.fftfreq(h.shape[1])[None, :] ** 2
    blur = np.real(np.fft.ifft2(np.fft.fft2(h) * np.exp(-k * (np.pi * radius) ** 2 * 2)))
    d = (h - blur)
    return np.clip(1.0 + d / (d.std() * 4 + 1e-9), 0.55, 1.0)


def save(name, color, normal, rough, metal=0.0, ao=None, lo_scale=0.5):
    n = normal.shape[0]
    ao = np.ones((n, n)) if ao is None else ao
    orm = np.stack([ao, rough, np.full((n, n), metal) if np.isscalar(metal) else metal], -1)
    orm = (orm.clip(0, 1) * 255).astype(np.uint8)
    imgs = {
        'normal': Image.fromarray(normal, 'RGB'),
        'orm': Image.fromarray(orm, 'RGB'),
    }
    if color is not None:
        imgs['color'] = Image.fromarray((color.clip(0, 1) * 255).astype(np.uint8), 'RGB')
    for tier, k in (('hi', 1.0), ('lo', lo_scale)):
        d = os.path.join(OUT, tier)
        os.makedirs(d, exist_ok=True)
        for kind, im in imgs.items():
            if k != 1.0:
                im = im.resize((int(n * k), int(n * k)), Image.LANCZOS)
            q = 92 if kind == 'normal' else 88
            im.save(os.path.join(d, '%s_%s.webp' % (name, kind)), 'WEBP', quality=q, method=6)
    print('  %-10s %d px' % (name, n))


def tint(gray, rgb, amount):
    """Серое поле вариаций → цвет вокруг базового rgb (0..1) с разбросом amount"""
    base = np.array(rgb, dtype=np.float64)[None, None, :]
    return base * (1.0 + (gray[..., None] - 0.5) * 2 * amount)


# ---------------------------------------------------------------- материалы

def microcement():
    """Пол: светло-серый микроцемент. Облака затирки, дуги кельмы, редкие
    поры и тёмные вкрапления; полированные места глаже (ниже шероховатость)."""
    n = 2048
    clouds = spectral(n, 3.2, hi=40)
    mid = spectral(n, 2.2, lo=20, hi=260)
    # дуги кельмы: вытянутый шум в нескольких направлениях, смешанный масками
    strokes = np.zeros((n, n))
    for k in range(5):
        mask = norm01(spectral(n, 4.0, hi=6)) ** 2
        strokes += mask * spectral(n, 2.0, aniso=(1.0, 7.0), angle=rng.random() * np.pi, lo=30, hi=500)
    pores = spectral(n, 0.3, lo=500)
    pores = (pores > 3.9).astype(np.float64)
    specks = (spectral(n, 0.5, lo=300) > 3.7).astype(np.float64)

    h = clouds * 0.25 + mid * 0.35 + strokes * 0.18 - pores * 2.5
    gray = norm01(clouds * 0.55 + mid * 0.25 + strokes * 0.12)
    color = tint(gray, (0.74, 0.74, 0.725), 0.05)
    color *= (1 - specks * 0.12)[..., None]
    color *= (1 - pores * 0.2)[..., None]
    polish = norm01(spectral(n, 3.5, hi=18))
    rough = 0.30 + polish * 0.28 + norm01(strokes) * 0.08 + pores * 0.3
    save('floor', color, normal_map(h, 1.1), rough, 0.0, cavity(h))


def plaster(name, rgb, strength, rough_base):
    """Стены и потолок: окрашенная штукатурка — «апельсиновая корка» валика
    и едва заметная волна полотна стены; матовая краска."""
    n = 2048
    peel = spectral(n, 1.1, lo=180, hi=900)
    wave = spectral(n, 3.4, hi=10)
    h = peel * 0.5 + wave * 1.4
    gray = norm01(wave * 0.6 + spectral(n, 2.6, hi=60) * 0.4)
    color = tint(gray, rgb, 0.012)
    rough = rough_base + norm01(peel) * 0.06
    save(name, color, normal_map(h, strength), rough, 0.0, cavity(peel, 3) * 0.2 + 0.8)


def oak():
    """Скамьи: светлый дуб под матовым лаком — годичные слои, лучи
    сердцевины, поры вдоль волокна."""
    n = 1024
    y = np.arange(n)[:, None] / n
    x = np.arange(n)[None, :] / n
    # волокно идёт вдоль X: изгиб слоёв меняется медленно вдоль волокна
    warp = spectral(n, 3.2, aniso=(10.0, 1.0), hi=24) * 0.05
    rings = np.sin((y + warp) * 2 * np.pi * 48)
    rings = norm01(rings) ** 2.2
    rays = (spectral(n, 0.8, aniso=(1.0, 14.0), lo=80) > 2.4).astype(np.float64)   # лучи сердцевины
    fibers = spectral(n, 1.2, aniso=(10.0, 1.0), lo=40)
    pores = (spectral(n, 0.6, aniso=(18.0, 1.0), lo=200) > 2.6).astype(np.float64)
    gray = norm01(rings * 0.55 + fibers * 0.25 + spectral(n, 3.0, aniso=(6.0, 1.0), hi=12) * 0.35 + rays * 0.15)
    color = tint(gray, (0.76, 0.64, 0.47), 0.13) * (1 - pores * 0.25)[..., None]
    h = rings * 0.6 + fibers * 0.3 - pores * 1.5
    rough = 0.42 + norm01(fibers) * 0.12 + pores * 0.25
    save('oak', color, normal_map(h, 1.6), rough, 0.0, cavity(h, 3))


def brushed():
    """Треки и корпуса спотов: чёрный порошковый металл со следами шлифовки."""
    n = 1024
    streak = spectral(n, 1.0, aniso=(30.0, 1.0), lo=20)
    speck = spectral(n, 0.4, lo=300)
    gray = norm01(streak * 0.7 + speck * 0.3)
    color = tint(gray, (0.16, 0.16, 0.165), 0.18)
    h = streak * 0.4 + speck * 0.15
    rough = 0.38 + norm01(streak) * 0.14
    save('metal', color, normal_map(h, 1.0), rough, 0.85, None)


def canvas():
    """Холст под картинами: полотняное переплетение нитей и лак поверх.
    Только рельеф и шероховатость — цвет даёт сама работа."""
    n = 512
    k = 2 * np.pi * 64 / n          # 64 нити на плитку
    y = np.arange(n)[:, None] * k
    x = np.arange(n)[None, :] * k
    jitter = spectral(n, 2.5, hi=40) * 0.35
    warp = np.sin(x + jitter) * 0.5 + 0.5
    weft = np.sin(y + jitter) * 0.5 + 0.5
    over = (np.sin(x * 0.5) * np.sin(y * 0.5) > 0).astype(np.float64)
    h = np.where(over > 0, warp * 0.8 + weft * 0.2, weft * 0.8 + warp * 0.2)
    h += spectral(n, 1.0, lo=60) * 0.12
    rough = 0.55 + norm01(spectral(n, 2.8, hi=16)) * 0.25     # лак лёг неровно
    save('canvas', None, normal_map(h, 1.3), rough, 0.0, cavity(h, 2) * 0.3 + 0.7, lo_scale=0.5)


def main():
    print('Фактуры →', OUT)
    microcement()
    plaster('wall', (0.95, 0.948, 0.94), 1.1, 0.86)
    plaster('ceiling', (0.975, 0.975, 0.97), 0.6, 0.93)
    oak()
    brushed()
    canvas()
    total = 0
    for root, _, files in os.walk(OUT):
        total += sum(os.path.getsize(os.path.join(root, f)) for f in files)
    print('Готово, %.1f МБ' % (total / 1e6))


if __name__ == '__main__':
    main()
