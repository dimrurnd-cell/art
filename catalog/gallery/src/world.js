/* Сборка помещений: холл, коридоры разделов, полотна, таблички.

   Стиль — светлая современная галерея: белые стены, светло-серый пол из
   микроцемента, тонкие чёрные рамы, световые линии в потолке и трековые
   споты над работами. Никаких карнизов и позолоты; глубину дают мягкие
   тени под работами и светлая дымка, в которой тают дальние стены.
   Повторяющиеся детали (рамы, тени, споты) идут через InstancedMesh —
   по одному вызову отрисовки на коридор. */
import * as THREE from 'three';
import { ART_Y, COR_W, COR_H, ARCH_W, ARCH_H, WALL_T } from './layout.js';
import {
  concrete, paint, softShadow, textCanvas, wrapText, spaced, canvasTexture, SANS,
} from './materials.js';

export const HAZE = 0xecebe8;        // цвет дымки и фона
const PLACEHOLDER = 0xe2e0db;        // загрунтованный холст, пока нет картинки
const INK = '#2a2a2a';
const MUTED = '#8c8c88';
const ACCENT = '#d4574f';
const PLAQUE_NEAR = 16;              // таблички создаются ближе этого
const PLAQUE_FAR = 26;               // и удаляются дальше этого
const BANNER_NEAR = 40;
const BANNER_FAR = 55;
const TRACK = 1.55;                  // трек со спотами — на таком расстоянии от стены

export function plural(n, one, few, many) {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
}

const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _s = new THREE.Vector3();
const _p = new THREE.Vector3();
const _e = new THREE.Euler();

function instanced(geo, mat, items, fn) {
  const im = new THREE.InstancedMesh(geo, mat, Math.max(1, items.length));
  items.forEach((it, i) => {
    _e.set(0, 0, 0);
    fn(it, _p, _e, _s);
    _q.setFromEuler(_e);
    _m.compose(_p, _q, _s);
    im.setMatrixAt(i, _m);
  });
  im.count = items.length;
  im.instanceMatrix.needsUpdate = true;
  im.computeBoundingSphere();
  return im;
}

export class World {
  constructor(renderer, plan, bridge) {
    this.plan = plan;
    this.bridge = bridge;
    this.scene = new THREE.Scene();
    this.aniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    this.paintings = [];
    this.pickables = [];
    this.plaques = new Map();         // painting -> mesh
    this.banners = new Map();         // bay -> [mesh, mesh]
    this.bays = [];

    const haze = new THREE.Color(HAZE);
    this.scene.background = haze;
    this.scene.fog = new THREE.Fog(haze, 30, 120);

    this.scene.add(new THREE.HemisphereLight(0xffffff, 0xd6d4cf, 2.7));
    this.camLight = new THREE.PointLight(0xfffaf2, 7, 14, 1.6);
    this.scene.add(this.camLight);

    this.mat = this.makeMaterials();
    this.buildHall();
    plan.corridors.forEach((c) => this.buildCorridor(c));
  }

  makeMaterials() {
    const a = this.aniso;
    return {
      wallTex: paint('#f3f3f1', a),
      ceilTex: paint('#fafaf9', a),
      floorTex: concrete(a),
      frame: new THREE.MeshLambertMaterial({ color: 0x1d1d1d }),
      gap: new THREE.MeshBasicMaterial({ color: 0x9a9995 }),
      reveal: new THREE.MeshLambertMaterial({ color: 0xe6e5e2 }),
      light: new THREE.MeshBasicMaterial({ color: 0xffffff, fog: false }),
      slot: new THREE.MeshBasicMaterial({ color: 0xd9d8d4 }),
      track: new THREE.MeshLambertMaterial({ color: 0x2b2b2b }),
      shadow: new THREE.MeshBasicMaterial({
        alphaMap: softShadow(), color: 0x000000, transparent: true, opacity: 0.2, depthWrite: false,
      }),
      white: new THREE.MeshLambertMaterial({ color: 0xfafaf8 }),
      oak: new THREE.MeshLambertMaterial({ color: 0xcbb99d }),
      grey: new THREE.MeshLambertMaterial({ color: 0xbdbcb8 }),
    };
  }

  /* Материал стены с фактурой, подогнанной под размер грани */
  wallMat(w, h) {
    const t = this.mat.wallTex.clone();
    t.repeat.set(Math.max(1, w / 3), Math.max(1, h / 3));
    t.needsUpdate = true;
    return new THREE.MeshLambertMaterial({ map: t });
  }

  /* Потолок снизу почти не освещён полусферой — подсвечиваем его сами */
  ceilMat(w, h) {
    const t = this.mat.ceilTex.clone();
    t.repeat.set(Math.max(1, w / 3), Math.max(1, h / 3));
    t.needsUpdate = true;
    return new THREE.MeshLambertMaterial({ map: t, emissive: 0xffffff, emissiveMap: t, emissiveIntensity: 0.55 });
  }

  box(w, h, d, mat, x, y, z) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    this.scene.add(m);
    return m;
  }

  plane(w, h, mat, x, y, z, ry = 0, rx = 0) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    m.position.set(x, y, z);
    m.rotation.set(rx, ry, 0, 'YXZ');
    this.scene.add(m);
    return m;
  }

  /* Пол — микроцемент со слабым бликом от света у зрителя */
  floor(x0, x1, z0, z1) {
    const w = x1 - x0, d = z1 - z0;
    const t = this.mat.floorTex.clone();
    t.repeat.set(w / 4, d / 4);
    t.needsUpdate = true;
    const mat = new THREE.MeshStandardMaterial({ map: t, roughness: 0.62, metalness: 0 });
    const m = this.plane(w, d, mat, (x0 + x1) / 2, 0, (z0 + z1) / 2, 0, -Math.PI / 2);
    m.userData.floor = true;
    this.pickables.push(m);
    return m;
  }

  sign(canvasEl, w, h, x, y, z, ry, action) {
    const mat = new THREE.MeshBasicMaterial({ map: canvasTexture(canvasEl, this.aniso), transparent: true, toneMapped: false });
    const m = this.plane(w, h, mat, x, y, z, ry);
    if (action) { m.userData.action = action; this.pickables.push(m); }
    return m;
  }

  /* ---------------- холл ---------------- */

  buildHall() {
    const { hall, corridors } = this.plan;
    const M = this.mat;
    const W = hall.x1 - hall.x0, D = hall.z1 - hall.z0, H = hall.h;

    this.floor(hall.x0, hall.x1, hall.z0, hall.z1);
    this.plane(W, D, this.ceilMat(W, D), 0, H, 0, 0, Math.PI / 2);

    // световые панели заподлицо с потолком
    for (let ix = -1; ix <= 1; ix++) {
      for (let iz = -1; iz <= 1; iz += 2) {
        this.plane(W / 4.2, 1.1, M.light, ix * W / 3.3, H - 0.01, iz * D / 4.5, 0, Math.PI / 2);
      }
    }
    // световая щель по периметру потолка
    this.plane(W - 1, 0.08, M.light, 0, H - 0.01, hall.z1 - 0.5, 0, Math.PI / 2);
    this.plane(0.08, D - 1, M.light, hall.x0 + 0.5, H - 0.01, 0, 0, Math.PI / 2);
    this.plane(0.08, D - 1, M.light, hall.x1 - 0.5, H - 0.01, 0, 0, Math.PI / 2);

    // стены: южная (за спиной на входе), западная, восточная
    this.box(W + WALL_T * 2, H, WALL_T, this.wallMat(W, H), 0, H / 2, hall.z1 + WALL_T / 2);
    this.box(WALL_T, H, D, this.wallMat(D, H), hall.x0 - WALL_T / 2, H / 2, 0);
    this.box(WALL_T, H, D, this.wallMat(D, H), hall.x1 + WALL_T / 2, H / 2, 0);

    // северная стена с проёмами в залы
    const zN = hall.z0;
    const cuts = corridors.map((c) => [c.cx - ARCH_W / 2, c.cx + ARCH_W / 2]);
    let x = hall.x0 - WALL_T;
    cuts.concat([[hall.x1 + WALL_T, hall.x1 + WALL_T]]).forEach(([a, b]) => {
      if (a - x > 0.01) this.box(a - x, H, WALL_T, this.wallMat(a - x, H), (x + a) / 2, H / 2, zN);
      if (b > a) this.box(b - a, H - ARCH_H, WALL_T, this.wallMat(b - a, H - ARCH_H), (a + b) / 2, ARCH_H + (H - ARCH_H) / 2, zN);
      x = b;
    });

    // теневой шов у пола вместо плинтуса
    const g = 0.035;
    this.box(W, g, 0.01, M.gap, 0, g / 2, hall.z1 - 0.004);
    this.box(0.01, g, D, M.gap, hall.x0 + 0.004, g / 2, 0);
    this.box(0.01, g, D, M.gap, hall.x1 - 0.004, g / 2, 0);

    corridors.forEach((c) => {
      // откосы проёма чуть темнее стены — проём читается без обрамления
      this.box(0.02, ARCH_H, WALL_T, M.reveal, c.cx - ARCH_W / 2 + 0.01, ARCH_H / 2, zN);
      this.box(0.02, ARCH_H, WALL_T, M.reveal, c.cx + ARCH_W / 2 - 0.01, ARCH_H / 2, zN);
      this.box(ARCH_W, 0.02, WALL_T, M.reveal, c.cx, ARCH_H - 0.01, zN);

      const n = c.count;
      const cv = textCanvas(1024, 300, (g2, w) => {
        g2.fillStyle = INK; g2.textAlign = 'center';
        g2.font = '300 92px ' + SANS;
        spaced(g2, (c.title || 'Экспозиция').toUpperCase(), w / 2, 130, 14);
        g2.fillStyle = MUTED;
        g2.font = '400 40px ' + SANS;
        g2.fillText(n + ' ' + plural(n, 'художник', 'художника', 'художников') + '   →', w / 2, 220);
      });
      this.sign(cv, 3.6, 1.05, c.cx, ARCH_H + 0.85, zN + WALL_T / 2 + 0.005, 0, { type: 'enter', room: c.i });

      // со стороны зала — путь назад
      const back = textCanvas(768, 160, (g2, w) => {
        g2.fillStyle = MUTED; g2.textAlign = 'center';
        g2.font = '400 58px ' + SANS;
        spaced(g2, '←  ХОЛЛ', w / 2, 100, 8);
      });
      this.sign(back, 1.8, 0.375, c.cx, ARCH_H + 0.5, zN - WALL_T / 2 - 0.005, Math.PI, { type: 'hall' });
    });

    // стойка информации: белый монолит у западной стены
    const dx = hall.x0 + 1.5;
    this.box(1.0, 1.05, 3.6, M.white, dx, 0.545, 2.4);
    this.box(1.04, 0.02, 3.64, M.grey, dx, 1.08, 2.4);
    this.box(0.94, 0.03, 3.54, M.gap, dx, 0.015, 2.4);      // теневой отступ у пола
    this.plan.block.push({ x0: dx - 0.95, x1: dx + 0.95, z0: 2.4 - 2.2, z1: 2.4 + 2.2 });

    // длинные скамьи из светлого дуба
    [-1, 1].forEach((s) => {
      const bx = s * 3.4, bz = 2.6;
      this.box(2.6, 0.06, 0.5, M.oak, bx, 0.44, bz);
      this.box(0.06, 0.41, 0.46, M.oak, bx - 1.1, 0.205, bz);
      this.box(0.06, 0.41, 0.46, M.oak, bx + 1.1, 0.205, bz);
      this.plan.block.push({ x0: bx - 1.75, x1: bx + 1.75, z0: bz - 0.7, z1: bz + 0.7 });
    });

    // логотип на западной стене
    const logoUrl = this.bridge.url('img/logo.png');
    new THREE.TextureLoader().setCrossOrigin('anonymous').load(logoUrl, (t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = this.aniso;
      const ar = t.image.width / t.image.height || 2;
      const h = 1.6;
      const mat = new THREE.MeshBasicMaterial({ map: t, transparent: true, toneMapped: false });
      this.plane(h * ar, h, mat, hall.x0 + 0.005, 3.2, -2.4, Math.PI / 2);
    });
    const tag = textCanvas(1024, 160, (g2, w) => {
      g2.fillStyle = MUTED; g2.textAlign = 'center';
      g2.font = '300 56px ' + SANS;
      spaced(g2, 'ВСЕ ГРАНИ ИСКУССТВА', w / 2, 100, 10);
    });
    this.sign(tag, 3.4, 0.53, hall.x0 + 0.006, 2.05, -2.4, Math.PI / 2);

    // восточная стена: название выставки крупным набором прямо по стене
    const ticket = this.bridge.ticketUrl && this.bridge.ticketUrl !== '#';
    const title = textCanvas(1400, 900, (g2) => {
      g2.fillStyle = INK; g2.textAlign = 'left';
      g2.font = '200 190px ' + SANS;
      g2.fillText('Арт-Ростов', 20, 210);
      g2.font = '600 190px ' + SANS;
      g2.fillText('2026', 20, 420);
      g2.fillStyle = MUTED;
      g2.font = '400 52px ' + SANS;
      wrapText(g2, 'Выставка-продажа современного искусства', 1100).forEach((l, i) => g2.fillText(l, 24, 540 + i * 66));
      if (ticket) {
        g2.fillStyle = ACCENT;
        g2.font = '500 60px ' + SANS;
        g2.fillText('Купить билет  →', 24, 780);
        g2.fillRect(24, 800, 470, 4);
      }
    });
    this.sign(title, 4.2, 2.7, hall.x1 - 0.006, 2.55, -1.2, -Math.PI / 2,
      ticket ? { type: 'url', href: this.bridge.ticketUrl } : null);

    // подсказка на полу перед проёмами
    const hint = textCanvas(1024, 200, (g2, w) => {
      g2.fillStyle = 'rgba(42,42,42,0.45)'; g2.textAlign = 'center';
      g2.font = '400 62px ' + SANS;
      spaced(g2, 'ВЫБЕРИТЕ ЗАЛ', w / 2, 120, 16);
    });
    const hm = this.sign(hint, 4.2, 0.82, 0, 0.005, hall.z0 + 3.2, 0);
    hm.rotation.set(-Math.PI / 2, 0, 0);
  }

  /* ---------------- коридор раздела ---------------- */

  buildCorridor(c) {
    const M = this.mat;
    const L = c.zStart - c.zEnd;
    const zMid = (c.zStart + c.zEnd) / 2;
    const xl = c.cx - COR_W / 2, xr = c.cx + COR_W / 2;
    const H = COR_H;

    this.floor(xl, xr, c.zEnd, c.zStart);
    this.plane(COR_W, L, this.ceilMat(COR_W, L), c.cx, H, zMid, 0, Math.PI / 2);
    this.plane(L, H, this.wallMat(L, H), xl, H / 2, zMid, Math.PI / 2);
    this.plane(L, H, this.wallMat(L, H), xr, H / 2, zMid, -Math.PI / 2);

    // торцевая стена с выходом обратно
    this.plane(COR_W, H, this.wallMat(COR_W, H), c.cx, H / 2, c.zEnd, 0);
    const endCv = textCanvas(1024, 420, (g, w) => {
      g.textAlign = 'center';
      g.fillStyle = MUTED;
      g.font = '400 44px ' + SANS;
      g.fillText('Раздел «' + (c.title || 'Экспозиция') + '» пройден', w / 2, 120);
      g.fillStyle = ACCENT;
      g.font = '500 64px ' + SANS;
      g.fillText('Вернуться в холл  →', w / 2, 250);
      g.fillRect(w / 2 - 300, 275, 600, 4);
    });
    this.sign(endCv, 3.2, 1.31, c.cx, 1.9, c.zEnd + 0.01, 0, { type: 'hall' });

    // теневой шов у пола, световые линии вдоль стен и треки со спотами
    [[xl, 1], [xr, -1]].forEach(([x, s]) => {
      this.box(0.01, 0.035, L, M.gap, x + s * 0.004, 0.0175, zMid);
      this.plane(0.12, L - 0.4, M.slot, x + s * 0.55, H - 0.005, zMid, 0, Math.PI / 2);
      this.plane(0.06, L - 0.4, M.light, x + s * 0.55, H - 0.008, zMid, 0, Math.PI / 2);
      this.box(0.035, 0.035, L - 1, M.track, x + s * TRACK, H - 0.02, zMid);
    });

    const ws = c.works;
    const face = (it) => (it.side < 0 ? Math.PI / 2 : -Math.PI / 2);

    // тонкая чёрная рама и мягкая тень под работой
    this.scene.add(instanced(new THREE.PlaneGeometry(1, 1), M.shadow, ws, (it, p, e, s) => {
      p.set(it.x - it.side * 0.003, ART_Y - 0.07, it.z); e.set(0, face(it), 0); s.set(it.w * 1.12 + 0.35, it.h * 1.12 + 0.4, 1);
    }));
    this.scene.add(instanced(new THREE.BoxGeometry(1, 1, 1), M.frame, ws, (it, p, e, s) => {
      p.set(it.x - it.side * 0.022, ART_Y, it.z); e.set(0, face(it), 0); s.set(it.w + 0.05, it.h + 0.05, 0.044);
    }));
    // споты: корпус на треке, наклонён к работе
    this.scene.add(instanced(new THREE.CylinderGeometry(0.045, 0.055, 0.2, 14), M.track, ws, (it, p, e, s) => {
      p.set(it.x - it.side * TRACK, H - 0.15, it.z);
      e.set(0, 0, it.side * 0.62);
      s.set(1, 1, 1);
    }));

    // сами полотна
    ws.forEach((it) => {
      const mat = new THREE.MeshBasicMaterial({ color: PLACEHOLDER, toneMapped: false });
      const m = this.plane(it.w, it.h, mat, it.x - it.side * 0.046, ART_Y, it.z, face(it));
      m.userData.art = it;
      it.mesh = m;
      it.room = c.i;
      it.level = 0;
      this.paintings.push(it);
      this.pickables.push(m);
    });

    c.bays.forEach((b) => { b.room = c; this.bays.push(b); });
  }

  /* ---------------- ленивые таблички ---------------- */

  plaque(it) {
    const a = this.bridge.artists[it.gi];
    const cv = textCanvas(512, 256, (g, w, h) => {
      g.fillStyle = '#ffffff'; g.fillRect(0, 0, w, h);
      g.fillStyle = INK;
      g.font = '600 32px ' + SANS;
      const nm = wrapText(g, a.name, w - 48).slice(0, 2);
      nm.forEach((l, i) => g.fillText(l, 24, 54 + i * 38));
      g.font = '400 29px ' + SANS;
      g.fillStyle = '#55554f';
      const y0 = 54 + nm.length * 38 + 12;
      wrapText(g, it.work.title ? it.work.title : 'Без названия', w - 48).slice(0, 2)
        .forEach((l, i) => g.fillText(l, 24, y0 + i * 34));
      g.font = '500 23px ' + SANS;
      g.fillStyle = ACCENT;
      g.fillText('О художнике →', 24, h - 26);
    });
    const mat = new THREE.MeshLambertMaterial({ map: canvasTexture(cv, this.aniso) });
    const face = it.side < 0 ? Math.PI / 2 : -Math.PI / 2;
    // этикетка справа от работы, по музейной привычке, на уровне руки
    const along = it.side < 0 ? -1 : 1;             // «вправо» для смотрящего на стену
    const m = this.plane(0.38, 0.19, mat, it.x - it.side * 0.006, 1.3, it.z + along * (it.w / 2 + 0.38), face);
    m.userData.plaque = it;
    this.pickables.push(m);
    return m;
  }

  banner(b) {
    const a = this.bridge.artists[b.gi];
    const len = Math.min(4.4, Math.max(1.8, b.z0 - b.z1 - 0.6));
    const cv = textCanvas(1024, 160, (g, w) => {
      g.fillStyle = INK; g.textAlign = 'center';
      g.font = '300 62px ' + SANS;
      let t = a.name;
      while (g.measureText(t).width > w - 40 && t.length > 4) t = t.slice(0, -2);
      g.fillText(t, w / 2, 74);
      if (a.city) {
        g.font = '400 30px ' + SANS; g.fillStyle = MUTED;
        spaced(g, a.city.toUpperCase(), w / 2, 130, 6);
      }
    });
    const tex = canvasTexture(cv, this.aniso);
    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, toneMapped: false });
    const c = b.room;
    const zc = (b.z0 + b.z1) / 2;
    const h = len * 160 / 1024;
    return [
      this.plane(len, h, mat, c.cx - COR_W / 2 + 0.006, 3.5, zc, Math.PI / 2),
      this.plane(len, h, mat, c.cx + COR_W / 2 - 0.006, 3.5, zc, -Math.PI / 2),
    ];
  }

  removeMesh(m) {
    this.scene.remove(m);
    const i = this.pickables.indexOf(m);
    if (i >= 0) this.pickables.splice(i, 1);
    if (m.material.map) m.material.map.dispose();
    m.material.dispose();
    m.geometry.dispose();
  }

  /* Раз в несколько кадров: таблички рядом, дальние полотна не рисуем */
  update(cam) {
    const cx = cam.x, cz = cam.z;
    for (const it of this.paintings) {
      const d = Math.hypot(it.x - cx, it.z - cz);
      it.dist = d;
      it.mesh.visible = d < 125;
      const pl = this.plaques.get(it);
      if (!pl && d < PLAQUE_NEAR) this.plaques.set(it, this.plaque(it));
      else if (pl && d > PLAQUE_FAR) { this.removeMesh(pl); this.plaques.delete(it); }
    }
    for (const b of this.bays) {
      const d = Math.abs((b.z0 + b.z1) / 2 - cz) + Math.abs(b.room.cx - cx);
      const bn = this.banners.get(b);
      if (!bn && d < BANNER_NEAR) this.banners.set(b, this.banner(b));
      else if (bn && d > BANNER_FAR) {
        bn[0].material.map.dispose();
        bn.forEach((m) => { this.scene.remove(m); m.geometry.dispose(); });
        bn[0].material.dispose();
        this.banners.delete(b);
      }
    }
  }
}
