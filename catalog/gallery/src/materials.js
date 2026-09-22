/* Процедурные фактуры помещения. Рисуются на canvas при старте, поэтому
   не весят ничего при загрузке и одинаково выглядят на любом сервере.
   Стиль — светлый минимализм: белые стены, светло-серый микроцемент,
   никакого орнамента; глубину дают мягкие тени и свет. */
import * as THREE from 'three';

let seed = 7;
function rnd() {                     // детерминированный шум: зал одинаков у всех
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
}

function canvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h || w;
  return c;
}

function tex(c, aniso) {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = aniso || 1;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* Мягкие пятна, бесшовные по краям плитки */
function clouds(g, S, count, rMin, rMax, light, dark) {
  for (let i = 0; i < count; i++) {
    const x = rnd() * S, y = rnd() * S, r = rMin + rnd() * (rMax - rMin);
    const grd = g.createRadialGradient(x, y, 0, x, y, r);
    grd.addColorStop(0, rnd() > 0.5 ? light : dark);
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = grd;
    for (let dx = -S; dx <= S; dx += S) {
      for (let dy = -S; dy <= S; dy += S) {
        g.save(); g.translate(dx, dy); g.fillRect(x - r, y - r, r * 2, r * 2); g.restore();
      }
    }
  }
}

function grain(g, S, amp) {
  const img = g.getImageData(0, 0, S, S);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (rnd() - 0.5) * amp;
    img.data[i] += n; img.data[i + 1] += n; img.data[i + 2] += n;
  }
  g.putImageData(img, 0, 0);
}

/* Светло-серый микроцемент, плитка 4×4 м: лёгкие облака и зерно */
export function concrete(aniso) {
  const S = 1024;
  const c = canvas(S);
  const g = c.getContext('2d');
  g.fillStyle = '#d9d9d6';
  g.fillRect(0, 0, S, S);
  clouds(g, S, 120, 80, 300, 'rgba(255,255,255,0.035)', 'rgba(90,90,85,0.025)');
  clouds(g, S, 220, 8, 40, 'rgba(255,255,255,0.03)', 'rgba(80,80,76,0.022)');
  grain(g, S, 7);
  return tex(c, aniso);
}

/* Гладкая окрашенная стена: почти ровный тон, едва заметная неровность */
export function paint(base, aniso) {
  const S = 512;
  const c = canvas(S);
  const g = c.getContext('2d');
  g.fillStyle = base;
  g.fillRect(0, 0, S, S);
  clouds(g, S, 40, 80, 200, 'rgba(255,255,255,0.012)', 'rgba(60,60,60,0.008)');
  grain(g, S, 2);
  return tex(c, aniso);
}

/* Мягкая тень под работой: размытый прямоугольник, края в ноль */
export function softShadow() {
  const S = 256, pad = 48;
  const c = canvas(S);
  const g = c.getContext('2d');
  g.filter = 'blur(18px)';
  g.fillStyle = '#000';
  g.fillRect(pad, pad, S - pad * 2, S - pad * 2);
  g.filter = 'none';
  const t = new THREE.CanvasTexture(c);
  return t;
}

/* Надписи: современный гротеск, как в музейной навигации */
export const SANS = '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif';
export const FONT = SANS;

export function textCanvas(w, h, draw) {
  const c = canvas(w, h);
  draw(c.getContext('2d'), w, h);
  return c;
}

/* Перенос строки по ширине */
export function wrapText(g, text, maxW) {
  const words = String(text || '').split(/\s+/);
  const lines = [];
  let line = '';
  for (const wd of words) {
    const t = line ? line + ' ' + wd : wd;
    if (g.measureText(t).width > maxW && line) { lines.push(line); line = wd; } else line = t;
  }
  if (line) lines.push(line);
  return lines;
}

/* Разрядка для заглавных надписей */
export function spaced(g, text, x, y, spacing) {
  if ('letterSpacing' in g) {
    g.letterSpacing = spacing + 'px';
    g.fillText(text, x, y);
    g.letterSpacing = '0px';
  } else g.fillText(text, x, y);
}

export function canvasTexture(c, aniso) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = aniso || 1;
  return t;
}
