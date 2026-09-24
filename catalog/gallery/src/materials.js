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

/* Подобрать кегль и перенос так, чтобы текст целиком влез в ширину maxW
   и не больше чем в maxLines строк. Кегль перебирается от size до min;
   если не влезает и на min — последняя строка обрезается по словам с «…».
   Возвращает { size, lines, cut } и оставляет в g.font найденный шрифт. */
export function fitLines(g, text, maxW, o) {
  const size = o.size, min = o.min || Math.round(size * 0.6), weight = o.weight || 400;
  const maxLines = o.maxLines || 1;
  const t = String(text || '').replace(/\s+/g, ' ').trim();
  const font = (s) => { g.font = weight + ' ' + s + 'px ' + SANS; };
  for (let s = size; s >= min; s -= 1) {
    font(s);
    const lines = wrapHard(g, t, maxW);
    if (lines.length <= maxLines) return { size: s, lines, cut: false };
  }
  font(min);
  const lines = wrapHard(g, t, maxW).slice(0, maxLines);
  let last = lines[maxLines - 1];
  while (last && g.measureText(last + '…').width > maxW) {
    const i = last.lastIndexOf(' ');
    last = i > 0 && last.length - i < 12 ? last.slice(0, i) : last.slice(0, -1);
  }
  lines[maxLines - 1] = last.replace(/[\s,.;:«(—-]+$/, '') + '…';
  return { size: min, lines, cut: true };
}

/* Перенос по словам; слово шире строки режется по буквам */
function wrapHard(g, text, maxW) {
  const out = [];
  wrapText(g, text, maxW).forEach((l) => {
    while (g.measureText(l).width > maxW && l.length > 1) {
      let n = l.length - 1;
      while (n > 1 && g.measureText(l.slice(0, n)).width > maxW) n--;
      out.push(l.slice(0, n));
      l = l.slice(n);
    }
    out.push(l);
  });
  return out;
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

/* Мягкая тень у стыка: по v от 1 (у самого стыка) до 0, спадает быстрее
   линейного — как рассеянный свет, которому стык мешает дойти */
export function aoGradient() {
  const c = canvas(4, 128);
  const g = c.getContext('2d');
  const img = g.createImageData(4, 128);
  for (let y = 0; y < 128; y++) {
    const t = 1 - y / 127;                  // строка 0 — верх текстуры (v = 1)
    const a = Math.round(255 * Math.pow(t, 2.2));
    for (let x = 0; x < 4; x++) {
      const i = (y * 4 + x) * 4;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = a;
      img.data[i + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  return new THREE.CanvasTexture(c);
}

/* Растение в кадке для холла: стилизованные листья фикуса на прозрачном */
export function plantTexture() {
  const W = 512, H = 768;
  const c = canvas(W, H);
  const g = c.getContext('2d');
  const leaf = (x, y, len, ang, tone) => {
    g.save();
    g.translate(x, y);
    g.rotate(ang);
    g.fillStyle = tone;
    g.beginPath();
    g.moveTo(0, 0);
    g.bezierCurveTo(len * 0.35, -len * 0.3, len * 0.8, -len * 0.25, len, 0);
    g.bezierCurveTo(len * 0.8, len * 0.25, len * 0.35, len * 0.3, 0, 0);
    g.fill();
    g.strokeStyle = 'rgba(255,255,255,0.18)';
    g.lineWidth = 2;
    g.beginPath(); g.moveTo(len * 0.08, 0); g.lineTo(len * 0.9, 0); g.stroke();
    g.restore();
  };
  // ствол
  g.strokeStyle = '#6b5a45';
  g.lineWidth = 9;
  g.beginPath(); g.moveTo(W / 2, H); g.bezierCurveTo(W / 2 - 10, H * 0.6, W / 2 + 14, H * 0.35, W / 2, H * 0.12); g.stroke();
  const tones = ['#2f5e3a', '#3a6f45', '#28512f', '#447a4c', '#335f3b'];
  // крона: к низу листья длиннее и шире расходятся, к верху — короче и торчат вверх
  for (let i = 0; i < 90; i++) {
    const t = i / 90;
    const y = H * (0.06 + t * 0.68);
    const side = i % 2 ? 1 : -1;
    const len = (110 + rnd() * 70) * (0.75 + t * 0.45);
    const ang = (side > 0 ? 0 : Math.PI) + side * (-1.1 + t * 0.8 + (rnd() - 0.5) * 0.6);
    leaf(W / 2 + side * 4, y, len, ang, tones[Math.floor(rnd() * tones.length)]);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
