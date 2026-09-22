/* Процедурные фактуры помещения. Рисуются на canvas при старте, поэтому
   не весят ничего при загрузке и одинаково выглядят на любом сервере.
   Все тайлятся: размер плитки в метрах указан у каждой. */
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

function tex(c, repeatX, repeatY, aniso, srgb = true) {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeatX || 1, repeatY || 1);
  t.anisotropy = aniso || 1;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* Дубовый паркет «ёлочкой», плитка 2×2 м */
export function parquet(aniso) {
  const S = 1024;
  const c = canvas(S);
  const g = c.getContext('2d');
  g.fillStyle = '#6d4c2c';
  g.fillRect(0, 0, S, S);
  const pl = S / 8;                  // длина планки: 25 см
  const pw = pl / 4;
  const tones = ['#9a6d42', '#a37547', '#8f643b', '#ab7d4f', '#94683f', '#b08453'];
  for (let row = -2; row < S / pw + 2; row++) {
    for (let col = -2; col < S / pl + 2; col++) {
      const x = col * pl;
      const y = row * pw * 2 + (col % 2) * pw;
      g.save();
      g.translate(x, y);
      g.rotate((col % 2 ? -1 : 1) * Math.PI / 4);
      g.fillStyle = tones[Math.floor(rnd() * tones.length)];
      g.fillRect(0, 0, pl * 0.98, pw * 0.94);
      g.globalAlpha = 0.12;
      g.strokeStyle = '#3d2814';
      for (let k = 0; k < 5; k++) {
        const yy = rnd() * pw;
        g.beginPath();
        g.moveTo(0, yy);
        g.bezierCurveTo(pl * 0.3, yy + rnd() * 4 - 2, pl * 0.6, yy + rnd() * 4 - 2, pl, yy);
        g.stroke();
      }
      g.restore();
    }
  }
  // лак: мягкие блики
  const grd = g.createLinearGradient(0, 0, S, S);
  grd.addColorStop(0, 'rgba(255,240,210,0.05)');
  grd.addColorStop(0.5, 'rgba(0,0,0,0.04)');
  grd.addColorStop(1, 'rgba(255,240,210,0.05)');
  g.fillStyle = grd;
  g.fillRect(0, 0, S, S);
  return tex(c, 1, 1, aniso);
}

/* Терраццо для холла, плитка 2×2 м */
export function terrazzo(aniso) {
  const S = 1024;
  const c = canvas(S);
  const g = c.getContext('2d');
  g.fillStyle = '#e6dcc6';
  g.fillRect(0, 0, S, S);
  const chips = ['#b9ab8e', '#8c7f68', '#d59a74', '#6f8f86', '#f4efe4', '#a8584f', '#4f6b73'];
  for (let i = 0; i < 5200; i++) {
    const r = 1 + rnd() * rnd() * 9;
    g.fillStyle = chips[Math.floor(rnd() * chips.length)];
    g.globalAlpha = 0.55 + rnd() * 0.45;
    g.beginPath();
    const x = rnd() * S, y = rnd() * S;
    g.ellipse(x, y, r, r * (0.5 + rnd() * 0.5), rnd() * Math.PI, 0, Math.PI * 2);
    g.fill();
  }
  g.globalAlpha = 1;
  // швы плит 1×1 м
  g.strokeStyle = 'rgba(90,76,56,0.35)';
  g.lineWidth = 2;
  g.strokeRect(0, 0, S / 2, S / 2);
  g.strokeRect(S / 2, S / 2, S / 2, S / 2);
  return tex(c, 1, 1, aniso);
}

/* Штукатурка: тёплый тон с мягкими разводами, плитка 2.5 м.
   Её же берём картой рельефа — стена перестаёт быть пластиком. */
export function plaster(base, aniso) {
  const S = 512;
  const c = canvas(S);
  const g = c.getContext('2d');
  g.fillStyle = base;
  g.fillRect(0, 0, S, S);
  for (let i = 0; i < 90; i++) {
    const x = rnd() * S, y = rnd() * S, r = 30 + rnd() * 110;
    const grd = g.createRadialGradient(x, y, 0, x, y, r);
    const light = rnd() > 0.5;
    grd.addColorStop(0, light ? 'rgba(255,250,240,0.05)' : 'rgba(120,100,70,0.035)');
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = grd;
    for (let dx = -S; dx <= S; dx += S) {      // бесшовно по краям
      for (let dy = -S; dy <= S; dy += S) {
        g.save(); g.translate(dx, dy); g.fillRect(x - r, y - r, r * 2, r * 2); g.restore();
      }
    }
  }
  const img = g.getImageData(0, 0, S, S);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (rnd() - 0.5) * 8;
    img.data[i] += n; img.data[i + 1] += n; img.data[i + 2] += n;
  }
  g.putImageData(img, 0, 0);
  return tex(c, 1, 1, aniso);
}

/* Световое пятно от светильника над картиной */
export function lightPool() {
  const S = 256;
  const c = canvas(S);
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(S / 2, S * 0.38, 0, S / 2, S * 0.45, S / 2);
  grd.addColorStop(0, 'rgba(255,236,200,1)');
  grd.addColorStop(0.45, 'rgba(255,226,180,0.55)');
  grd.addColorStop(1, 'rgba(255,220,170,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, S, S);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* Надпись на canvas: табличка, вывеска над аркой, афиша. */
export const FONT = '"Parangon", "Playfair Display", Georgia, "Times New Roman", serif';
export const SANS = '"Helvetica Neue", Arial, sans-serif';

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

export function canvasTexture(c, aniso) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = aniso || 1;
  return t;
}
