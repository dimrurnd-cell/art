/* Сборка помещений: холл, коридоры разделов, полотна, таблички.
   Повторяющиеся детали (рамы, светильники, пилястры, световые пятна)
   идут через InstancedMesh — по одному вызову отрисовки на коридор. */
import * as THREE from 'three';
import {
  EYE, ART_Y, COR_W, COR_H, ARCH_W, ARCH_H, WALL_T,
} from './layout.js';
import {
  parquet, terrazzo, plaster, lightPool, textCanvas, wrapText, canvasTexture, FONT, SANS,
} from './materials.js';

const PLACEHOLDER = 0xd9d0bd;        // загрунтованный холст, пока нет картинки
const PLAQUE_NEAR = 16;              // таблички создаются ближе этого
const PLAQUE_FAR = 26;               // и удаляются дальше этого
const BANNER_NEAR = 38;
const BANNER_FAR = 52;

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
    this.billboards = [];
    this.bays = [];

    const fogColor = new THREE.Color(0x221c15);
    this.scene.background = fogColor;
    this.scene.fog = new THREE.Fog(fogColor, 22, 98);

    this.scene.add(new THREE.HemisphereLight(0xfff3df, 0x5b4a36, 2.4));
    this.camLight = new THREE.PointLight(0xffe6c4, 14, 16, 1.6);
    this.scene.add(this.camLight);

    this.mat = this.makeMaterials();
    this.buildHall();
    plan.corridors.forEach((c) => this.buildCorridor(c));
  }

  makeMaterials() {
    const a = this.aniso;
    const wallTex = plaster('#e7d9b8', a);
    const hallWallTex = plaster('#efe4cb', a);
    const ceilTex = plaster('#f3ecdd', a);
    return {
      wallTex, hallWallTex, ceilTex,
      parquet: parquet(a),
      terrazzo: terrazzo(a),
      frame: new THREE.MeshLambertMaterial({ color: 0x2c2118 }),
      gilt: new THREE.MeshStandardMaterial({ color: 0xc9a15c, metalness: 0.35, roughness: 0.4, emissive: 0x3a2a10 }),
      base: new THREE.MeshLambertMaterial({ color: 0x3a2e22 }),
      cornice: new THREE.MeshLambertMaterial({ color: 0xf2e9d6 }),
      pilaster: new THREE.MeshLambertMaterial({ color: 0xded0ae }),
      lamp: new THREE.MeshBasicMaterial({ color: 0xfff1d6 }),
      lampBody: new THREE.MeshLambertMaterial({ color: 0x1d1a16 }),
      strip: new THREE.MeshBasicMaterial({ color: 0xfff6e6 }),
      pool: new THREE.MeshBasicMaterial({
        map: lightPool(), transparent: true, opacity: 0.32, depthWrite: false,
        blending: THREE.AdditiveBlending, color: 0xffe2b8, fog: true,
      }),
      coral: new THREE.MeshLambertMaterial({ color: 0xe4736f }),
      teal: new THREE.MeshLambertMaterial({ color: 0x3e7d95 }),
      wood: new THREE.MeshLambertMaterial({ color: 0x8b6a45 }),
      dark: new THREE.MeshLambertMaterial({ color: 0x2b2620 }),
    };
  }

  /* Материал стены с фактурой, подогнанной под размер грани */
  wallMat(tex, w, h) {
    const t = tex.clone();
    t.repeat.set(Math.max(1, w / 2.5), Math.max(1, h / 2.5));
    t.needsUpdate = true;
    return new THREE.MeshLambertMaterial({ map: t, bumpMap: t, bumpScale: 0.6 });
  }

  /* Потолок снизу почти не освещён полусферой — подсвечиваем его сами */
  ceilMat(w, h) {
    const t = this.mat.ceilTex.clone();
    t.repeat.set(Math.max(1, w / 2.5), Math.max(1, h / 2.5));
    t.needsUpdate = true;
    return new THREE.MeshLambertMaterial({ map: t, emissive: 0xd8cebb, emissiveMap: t, emissiveIntensity: 0.5 });
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

  floor(tex, x0, x1, z0, z1, tile) {
    const w = x1 - x0, d = z1 - z0;
    const t = tex.clone();
    t.repeat.set(w / tile, d / tile);
    t.needsUpdate = true;
    const m = this.plane(w, d, new THREE.MeshLambertMaterial({ map: t }), (x0 + x1) / 2, 0, (z0 + z1) / 2, 0, -Math.PI / 2);
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

    this.floor(M.terrazzo, hall.x0, hall.x1, hall.z0, hall.z1, 2);
    this.plane(W, D, this.ceilMat(W, D), 0, H, 0, 0, Math.PI / 2);

    // световые фонари в потолке
    for (let ix = -1; ix <= 1; ix += 2) {
      for (let iz = -1; iz <= 1; iz += 2) {
        this.box(3.2, 0.06, 3.2, M.strip, ix * W / 5, H - 0.02, iz * D / 5);
        this.box(3.6, 0.22, 0.2, M.cornice, ix * W / 5, H - 0.1, iz * D / 5 - 1.7);
        this.box(3.6, 0.22, 0.2, M.cornice, ix * W / 5, H - 0.1, iz * D / 5 + 1.7);
      }
    }

    const wm = (w, h) => this.wallMat(M.hallWallTex, w, h);
    // южная (за спиной на входе), западная и восточная
    this.box(W + WALL_T * 2, H, WALL_T, wm(W, H), 0, H / 2, hall.z1 + WALL_T / 2);
    this.box(WALL_T, H, D, wm(D, H), hall.x0 - WALL_T / 2, H / 2, 0);
    this.box(WALL_T, H, D, wm(D, H), hall.x1 + WALL_T / 2, H / 2, 0);

    // северная стена с арками
    const zN = hall.z0;
    const cuts = corridors.map((c) => [c.cx - ARCH_W / 2, c.cx + ARCH_W / 2]);
    let x = hall.x0 - WALL_T;
    cuts.concat([[hall.x1 + WALL_T, hall.x1 + WALL_T]]).forEach(([a, b]) => {
      if (a - x > 0.01) this.box(a - x, H, WALL_T, wm(a - x, H), (x + a) / 2, H / 2, zN);
      if (b > a) {
        this.box(b - a, H - ARCH_H, WALL_T, wm(b - a, H - ARCH_H), (a + b) / 2, ARCH_H + (H - ARCH_H) / 2, zN);
      }
      x = b;
    });

    // плинтус и карниз по периметру
    const bh = 0.16;
    this.box(W, bh, 0.04, M.base, 0, bh / 2, hall.z1 - 0.02);
    this.box(0.04, bh, D, M.base, hall.x0 + 0.02, bh / 2, 0);
    this.box(0.04, bh, D, M.base, hall.x1 - 0.02, bh / 2, 0);
    this.box(W, 0.24, 0.12, M.cornice, 0, H - 0.12, hall.z1 - 0.06);
    this.box(W, 0.24, 0.12, M.cornice, 0, H - 0.12, zN + 0.2);
    this.box(0.12, 0.24, D, M.cornice, hall.x0 + 0.06, H - 0.12, 0);
    this.box(0.12, 0.24, D, M.cornice, hall.x1 - 0.06, H - 0.12, 0);

    // порталы арок и вывески разделов
    corridors.forEach((c) => {
      const fr = 0.22;
      [1, -1].forEach((s) => {
        const zf = zN + s * (WALL_T / 2 + 0.03);
        this.box(fr, ARCH_H + fr, 0.08, M.gilt, c.cx - ARCH_W / 2 - fr / 2, (ARCH_H + fr) / 2, zf);
        this.box(fr, ARCH_H + fr, 0.08, M.gilt, c.cx + ARCH_W / 2 + fr / 2, (ARCH_H + fr) / 2, zf);
        this.box(ARCH_W + fr * 2, fr, 0.08, M.gilt, c.cx, ARCH_H + fr / 2, zf);
      });
      // откосы проёма
      this.box(0.02, ARCH_H, WALL_T, M.cornice, c.cx - ARCH_W / 2, ARCH_H / 2, zN);
      this.box(0.02, ARCH_H, WALL_T, M.cornice, c.cx + ARCH_W / 2, ARCH_H / 2, zN);

      const n = c.count;
      const cv = textCanvas(1024, 300, (g, w, h) => {
        g.fillStyle = '#2a241c';
        g.fillRect(0, 0, w, h);
        g.strokeStyle = '#c9a15c'; g.lineWidth = 6;
        g.strokeRect(12, 12, w - 24, h - 24);
        g.fillStyle = '#f6ecd6';
        g.textAlign = 'center';
        g.font = '104px ' + FONT;
        g.fillText(c.title || 'Экспозиция', w / 2, 150);
        g.fillStyle = '#e4a07c';
        g.font = '44px ' + SANS;
        g.fillText(n + ' ' + plural(n, 'художник', 'художника', 'художников') + '  →', w / 2, 236);
      });
      this.sign(cv, 3.3, 0.97, c.cx, ARCH_H + 0.95, zN + WALL_T / 2 + 0.02, 0, { type: 'enter', room: c.i });

      // со стороны коридора — путь назад
      const back = textCanvas(768, 160, (g, w, h) => {
        g.fillStyle = '#2a241c'; g.fillRect(0, 0, w, h);
        g.fillStyle = '#f6ecd6'; g.textAlign = 'center';
        g.font = '64px ' + FONT;
        g.fillText('← В холл', w / 2, 102);
      });
      this.sign(back, 2, 0.42, c.cx, ARCH_H + 0.45, zN - WALL_T / 2 - 0.02, Math.PI, { type: 'hall' });
    });

    // стойка информации у западной стены
    const dx = hall.x0 + 1.4;
    this.box(1.0, 1.05, 3.4, M.coral, dx, 0.525, 2.2);
    this.box(1.2, 0.06, 3.6, M.wood, dx, 1.08, 2.2);
    this.plan.block.push({ x0: dx - 0.95, x1: dx + 0.95, z0: 2.2 - 2.1, z1: 2.2 + 2.1 });

    // скамьи
    [-1, 1].forEach((s) => {
      const bx = s * 3.2, bz = 2.4;
      this.box(2.2, 0.08, 0.55, M.wood, bx, 0.46, bz);
      this.box(0.08, 0.42, 0.5, M.dark, bx - 0.95, 0.21, bz);
      this.box(0.08, 0.42, 0.5, M.dark, bx + 0.95, 0.21, bz);
      this.plan.block.push({ x0: bx - 1.5, x1: bx + 1.5, z0: bz - 0.7, z1: bz + 0.7 });
    });

    // логотип на западной стене и афиша на восточной
    const logoUrl = this.bridge.url('img/logo.png');
    new THREE.TextureLoader().setCrossOrigin('anonymous').load(logoUrl, (t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = this.aniso;
      const ar = t.image.width / t.image.height || 2;
      const h = 1.5;
      const mat = new THREE.MeshBasicMaterial({ map: t, transparent: true, toneMapped: false });
      this.plane(h * ar, h, mat, hall.x0 + 0.02, 3.05, -2.2, Math.PI / 2);
    });
    const tag = textCanvas(1024, 220, (g, w) => {
      g.fillStyle = '#2a241c'; g.textAlign = 'center';
      g.font = '82px ' + FONT;
      g.fillText('Все грани искусства', w / 2, 130);
    });
    this.sign(tag, 3.6, 0.77, hall.x0 + 0.03, 1.95, -2.2, Math.PI / 2);

    const ticket = this.bridge.ticketUrl && this.bridge.ticketUrl !== '#';
    const poster = textCanvas(1024, 1400, (g, w, h) => {
      const grd = g.createLinearGradient(0, 0, w, h);
      grd.addColorStop(0, '#3e7d95'); grd.addColorStop(1, '#2e5b4c');
      g.fillStyle = grd; g.fillRect(0, 0, w, h);
      g.fillStyle = 'rgba(228,115,111,0.9)';
      g.beginPath(); g.arc(w * 0.78, h * 0.2, 250, 0, Math.PI * 2); g.fill();
      g.fillStyle = 'rgba(240,180,80,0.85)';
      g.beginPath(); g.arc(w * 0.15, h * 0.72, 190, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#fbf5e4'; g.textAlign = 'left';
      g.font = '150px ' + FONT;
      g.fillText('Арт-Ростов', 70, 520);
      g.font = '220px ' + FONT;
      g.fillText('2026', 70, 760);
      g.font = '54px ' + SANS;
      wrapText(g, 'Выставка-продажа современного искусства', w - 140).forEach((l, i) => g.fillText(l, 70, 900 + i * 70));
      if (ticket) {
        g.fillStyle = '#e4736f';
        g.fillRect(70, 1160, 560, 130);
        g.fillStyle = '#fff';
        g.font = 'bold 60px ' + SANS;
        g.fillText('Купить билет', 110, 1245);
      }
    });
    this.sign(poster, 2.2, 3.0, hall.x1 - 0.03, 2.3, -1.5, -Math.PI / 2,
      ticket ? { type: 'url', href: this.bridge.ticketUrl } : null);

    // подсказка на полу перед арками
    const hint = textCanvas(1024, 256, (g, w) => {
      g.fillStyle = 'rgba(42,36,28,0.75)'; g.textAlign = 'center';
      g.font = '70px ' + FONT;
      g.fillText('Выберите зал', w / 2, 150);
    });
    const hm = this.sign(hint, 5, 1.25, 0, 0.01, hall.z0 + 3.4, 0);
    hm.rotation.set(-Math.PI / 2, 0, 0);

    // арт-объекты по углам холла
    const objs = this.bridge.objects || [];
    const spots = [[hall.x0 + 0.9, hall.z0 + 0.9], [hall.x1 - 0.9, hall.z0 + 0.9],
      [hall.x1 - 0.9, hall.z1 - 1.2], [hall.x0 + 0.9, hall.z1 - 1.2]];
    spots.forEach((s, i) => {
      if (objs.length) this.billboard(objs[i % objs.length], s[0], s[1], 0.0078);
      this.plan.block.push({ x0: s[0] - 0.6, x1: s[0] + 0.6, z0: s[1] - 0.6, z1: s[1] + 0.6 });
    });
  }

  /* Рисованный силуэт (SVG) стоит на полу и всегда повёрнут к зрителю */
  billboard(obj, x, z, k) {
    const img = new Image();
    const S = 2;
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = obj.w * S; c.height = obj.h * S;
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      const mat = new THREE.MeshLambertMaterial({ map: canvasTexture(c, this.aniso), transparent: true, alphaTest: 0.4 });
      const m = this.plane(obj.w * k, obj.h * k, mat, x, obj.h * k / 2, z);
      this.billboards.push(m);
    };
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(obj.svg);
  }

  /* ---------------- коридор раздела ---------------- */

  buildCorridor(c) {
    const M = this.mat;
    const L = c.zStart - c.zEnd;
    const zMid = (c.zStart + c.zEnd) / 2;
    const xl = c.cx - COR_W / 2, xr = c.cx + COR_W / 2;
    const H = COR_H;

    this.floor(M.parquet, xl, xr, c.zEnd, c.zStart, 2);
    this.plane(COR_W, L, this.ceilMat(COR_W, L), c.cx, H, zMid, 0, Math.PI / 2);
    this.plane(L, H, this.wallMat(M.wallTex, L, H), xl, H / 2, zMid, Math.PI / 2);
    this.plane(L, H, this.wallMat(M.wallTex, L, H), xr, H / 2, zMid, -Math.PI / 2);

    // торцевая стена с выходом обратно
    this.plane(COR_W, H, this.wallMat(M.wallTex, COR_W, H), c.cx, H / 2, c.zEnd, 0);
    const endCv = textCanvas(1024, 520, (g, w) => {
      g.fillStyle = '#2a241c'; g.textAlign = 'center';
      g.font = '58px ' + FONT;
      g.fillText('Раздел «' + (c.title || 'Экспозиция') + '» пройден', w / 2, 150);
      g.fillStyle = '#e4736f';
      g.fillRect(w / 2 - 250, 250, 500, 130);
      g.fillStyle = '#fff';
      g.font = '54px ' + SANS;
      g.fillText('Вернуться в холл', w / 2, 335);
    });
    this.sign(endCv, 3.2, 1.625, c.cx, 1.9, c.zEnd + 0.02, 0, { type: 'hall' });

    // плинтусы, карнизы, световая линия
    [[xl + 0.02, 1], [xr - 0.02, -1]].forEach(([x, s]) => {
      this.box(0.04, 0.16, L, M.base, x, 0.08, zMid);
      this.box(0.14, 0.26, L, M.cornice, x + s * 0.05, H - 0.13, zMid);
      this.box(0.03, 0.04, L, M.dark, x + s * 0.02, 3.05, zMid);   // рейка подвеса картин
    });
    this.box(0.7, 0.06, L - 1, M.cornice, c.cx, H - 0.03, zMid);
    this.box(0.5, 0.03, L - 1, M.strip, c.cx, H - 0.075, zMid);

    // пилястры между художниками — они же ритм зала
    const pil = [];
    c.bays.forEach((b, i) => {
      if (i === c.bays.length - 1) return;
      const z = b.z1 - 0.55;
      pil.push({ x: xl, s: 1, z }, { x: xr, s: -1, z });
    });
    this.scene.add(instanced(new THREE.BoxGeometry(0.56, H, 0.16), M.pilaster, pil, (it, p, e, s) => {
      p.set(it.x + it.s * 0.08, H / 2, it.z); e.set(0, Math.PI / 2, 0); s.set(1, 1, 1);
    }));
    this.scene.add(instanced(new THREE.BoxGeometry(0.64, 0.3, 0.2), M.cornice, pil, (it, p, e, s) => {
      p.set(it.x + it.s * 0.1, 0.15, it.z); e.set(0, Math.PI / 2, 0); s.set(1, 1, 1);
    }));

    // рамы, светильники, световые пятна
    const ws = c.works;
    const face = (it) => (it.side < 0 ? Math.PI / 2 : -Math.PI / 2);
    this.scene.add(instanced(new THREE.BoxGeometry(1, 1, 1), M.frame, ws, (it, p, e, s) => {
      p.set(it.x - it.side * 0.035, ART_Y, it.z); e.set(0, face(it), 0); s.set(it.w + 0.14, it.h + 0.14, 0.07);
    }));
    this.scene.add(instanced(new THREE.BoxGeometry(1, 1, 1), M.gilt, ws, (it, p, e, s) => {
      p.set(it.x - it.side * 0.074, ART_Y, it.z); e.set(0, face(it), 0); s.set(it.w + 0.04, it.h + 0.04, 0.008);
    }));
    this.scene.add(instanced(new THREE.BoxGeometry(1, 1, 1), M.lampBody, ws, (it, p, e, s) => {
      p.set(it.x - it.side * 0.2, ART_Y + it.h / 2 + 0.22, it.z); e.set(0, face(it), 0); s.set(Math.min(0.9, it.w * 0.45), 0.05, 0.1);
    }));
    this.scene.add(instanced(new THREE.BoxGeometry(1, 1, 1), M.lamp, ws, (it, p, e, s) => {
      p.set(it.x - it.side * 0.2, ART_Y + it.h / 2 + 0.19, it.z); e.set(0, face(it), 0); s.set(Math.min(0.86, it.w * 0.43), 0.012, 0.07);
    }));
    this.scene.add(instanced(new THREE.PlaneGeometry(1, 1), M.pool, ws, (it, p, e, s) => {
      p.set(it.x - it.side * 0.012, ART_Y + 0.2, it.z); e.set(0, face(it), 0); s.set(it.w * 2 + 0.8, it.h * 1.8 + 1, 1);
    }));

    // сами полотна
    ws.forEach((it) => {
      const mat = new THREE.MeshBasicMaterial({ color: PLACEHOLDER, toneMapped: false });
      const m = this.plane(it.w, it.h, mat, it.x - it.side * 0.084, ART_Y, it.z, face(it));
      m.userData.art = it;
      it.mesh = m;
      it.room = c.i;
      it.level = 0;
      this.paintings.push(it);
      this.pickables.push(m);
    });

    // арт-объекты на полу у пилястр
    const objs = this.bridge.objects || [];
    if (objs.length) {
      c.bays.forEach((b, i) => {
        if (i % 3 !== 2 || i === c.bays.length - 1) return;
        const left = (i / 3) % 2 === 0;
        this.billboard(objs[i % objs.length], left ? xl + 0.55 : xr - 0.55, b.z1 - 0.55, 0.0068);
      });
    }

    c.bays.forEach((b) => { b.room = c; this.bays.push(b); });
  }

  /* ---------------- ленивые таблички ---------------- */

  plaque(it) {
    const a = this.bridge.artists[it.gi];
    const cv = textCanvas(512, 256, (g, w, h) => {
      g.fillStyle = '#fbf6ea'; g.fillRect(0, 0, w, h);
      g.strokeStyle = 'rgba(0,0,0,0.12)'; g.lineWidth = 4; g.strokeRect(2, 2, w - 4, h - 4);
      g.fillStyle = '#211d17';
      g.font = 'bold 34px ' + SANS;
      const nm = wrapText(g, a.name, w - 48).slice(0, 2);
      nm.forEach((l, i) => g.fillText(l, 24, 56 + i * 40));
      g.font = 'italic 32px Georgia, serif';
      g.fillStyle = '#4a4033';
      const y0 = 56 + nm.length * 40 + 14;
      wrapText(g, it.work.title ? '«' + it.work.title + '»' : 'Без названия', w - 48).slice(0, 2)
        .forEach((l, i) => g.fillText(l, 24, y0 + i * 36));
      g.font = '24px ' + SANS;
      g.fillStyle = '#b3544f';
      g.fillText('О художнике →', 24, h - 26);
    });
    const mat = new THREE.MeshBasicMaterial({ map: canvasTexture(cv, this.aniso), toneMapped: false });
    const face = it.side < 0 ? Math.PI / 2 : -Math.PI / 2;
    // этикетка справа от полотна, по музейной привычке, на уровне руки
    const along = it.side < 0 ? 1 : -1;            // «вправо» для смотрящего на стену
    const z = it.z + along * -1 * (it.w / 2 + 0.36);
    const m = this.plane(0.4, 0.2, mat, it.x - it.side * 0.012, 1.28, z, face);
    m.userData.plaque = it;
    this.pickables.push(m);
    return m;
  }

  banner(b) {
    const a = this.bridge.artists[b.gi];
    const len = Math.min(4.2, Math.max(1.6, b.z0 - b.z1 - 0.6));
    const cv = textCanvas(1024, 150, (g, w, h) => {
      g.fillStyle = '#3a2e22'; g.textAlign = 'center';
      g.font = '66px ' + FONT;
      let t = a.name;
      while (g.measureText(t).width > w - 40 && t.length > 4) t = t.slice(0, -2);
      g.fillText(t, w / 2, 76);
      if (a.city) {
        g.font = '34px ' + SANS; g.fillStyle = '#8b6a45';
        g.fillText(a.city, w / 2, 128);
      }
    });
    const tex = canvasTexture(cv, this.aniso);
    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, toneMapped: false });
    const c = b.room;
    const zc = (b.z0 + b.z1) / 2;
    const h = len * 150 / 1024;
    return [
      this.plane(len, h, mat, c.cx - COR_W / 2 + 0.015, 3.55, zc, Math.PI / 2),
      this.plane(len, h, mat, c.cx + COR_W / 2 - 0.015, 3.55, zc, -Math.PI / 2),
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
      it.mesh.visible = d < 110;
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

  faceBillboards(camPos) {
    for (const m of this.billboards) {
      m.rotation.y = Math.atan2(camPos.x - m.position.x, camPos.z - m.position.z);
    }
  }
}

export { EYE };
