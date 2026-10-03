/* Другие посетители в 3D-зале (онлайн-режим): фигуры в выбранном образе,
   с именем над головой, движутся в реальном времени.

   Служба присылает позиции 15 раз/с с отметкой времени (moves.ts). Фигура
   рисуется с небольшой задержкой (~120 мс) — между двумя соседними
   отметками: так движение плавное при любой неровности сети. Кончились
   данные — короткое продолжение по инерции, дальше фигура стоит.

   Дёшево для видеочипа: все фигуры одного пола — один InstancedMesh для
   одежды (цвет костюма — цвет экземпляра) и один для лица, рук и обуви:
   четыре вызова отрисовки на всех посетителей. Походка без скелета —
   покачивание в ритме шага и лёгкий наклон; на месте — дыхание. Имена —
   канвас-спрайты у ближайших. Стены закрывают фигуры сами (буфер глубины).

   Ближние посетители (до 14 м, не больше 8, на телефоне 4) — реалистичные
   аватары со скелетом и анимацией (avatars.js); остальные и те, чья модель
   ещё грузится, — простые фигуры. Уходит аватар дальше 17 м — снова фигура:
   запас в 3 м, чтобы на границе вид не менялся туда-сюда. */
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { Avatars } from './avatars.js';

// основной цвет одежды каждого образа (outfit 0…7) — для простых фигур и точек на плане
export const OUTFITS = {
  f: [0x2b2b2e, 0x4a3024, 0x7a6250, 0xc97a82, 0x4a5680, 0x5a4a48, 0xc8c8bc, 0xd8d6cc],
  m: [0x26262a, 0x2c3448, 0x8fa8c4, 0xa8302c, 0x3a3836, 0xe6e6e2, 0xb8a488, 0x58585c],
};
const SKIN = new THREE.Color(0xe9c9a8);
const HAIR = new THREE.Color(0x4a3a2e);
const SHOE = new THREE.Color(0x1e1b18);
const MAX = 24;               // фигур одновременно
const NAMES = 12;             // подписей — у ближайших
const FAR = 40;               // дальше не рисуем, м
const DELAY = 100;            // задержка показа при ровной сети, мс (дальше — по разбросу)
const EXTRA = 150;            // продолжение по инерции, мс
const JUMP = 6;               // скачок дальше — перенос, а не шаг, м
const CLOSE = 0.8;                // ближе — посетителя не рисуем (камера была бы внутри него), м
const NEAR = 14, NEAR_OUT = 17;   // аватар ближе NEAR, обратно в фигуру — дальше NEAR_OUT, м

/* Часть фигуры: геометрия + цвет вершин (для одежды — белый: красит экземпляр) */
function part(g, color, x, y, z, rx = 0, rz = 0) {
  if (rx || rz) g.rotateX(rx).rotateZ(rz);
  g.translate(x, y, z);
  const n = g.attributes.position.count;
  const c = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { c[i * 3] = color.r; c[i * 3 + 1] = color.g; c[i * 3 + 2] = color.b; }
  g.setAttribute('color', new THREE.BufferAttribute(c, 3));
  g.deleteAttribute('uv');
  return g;
}

const WHITE = new THREE.Color(1, 1, 1);
const cyl = (rt, rb, h, s = 10) => new THREE.CylinderGeometry(rt, rb, h, s, 1);
const ball = (r, w = 12, h = 8) => new THREE.SphereGeometry(r, w, h);

/* Лицом к −Z (как камера при yaw = 0). Рост ~1.68 м. */
function body(sex) {
  const cloth = [], skin = [];
  if (sex === 'm') {
    cloth.push(part(cyl(0.075, 0.068, 0.82), WHITE, -0.095, 0.47, 0));            // брюки
    cloth.push(part(cyl(0.075, 0.068, 0.82), WHITE, 0.095, 0.47, 0));
    cloth.push(part(cyl(0.2, 0.17, 0.58), WHITE, 0, 1.15, 0));                    // пиджак
    cloth.push(part(ball(0.2, 12, 6).scale(1, 0.35, 0.8), WHITE, 0, 1.43, 0));    // плечи
    cloth.push(part(cyl(0.05, 0.045, 0.58), WHITE, -0.235, 1.12, 0, 0, 0.08));    // рукава
    cloth.push(part(cyl(0.05, 0.045, 0.58), WHITE, 0.235, 1.12, 0, 0, -0.08));
    skin.push(part(new THREE.BoxGeometry(0.1, 0.07, 0.24), SHOE, -0.095, 0.035, -0.03));
    skin.push(part(new THREE.BoxGeometry(0.1, 0.07, 0.24), SHOE, 0.095, 0.035, -0.03));
    skin.push(part(new THREE.BoxGeometry(0.07, 0.3, 0.02), new THREE.Color(0xf4f1ea), 0, 1.3, -0.165));  // рубашка
    skin.push(part(ball(0.042, 6, 4), SKIN, -0.26, 0.8, 0));                      // кисти
    skin.push(part(ball(0.042, 6, 4), SKIN, 0.26, 0.8, 0));
    skin.push(part(cyl(0.045, 0.05, 0.1, 8), SKIN, 0, 1.52, 0));                  // шея
    skin.push(part(ball(0.105).scale(0.92, 1.1, 1), SKIN, 0, 1.61, 0));           // голова
    skin.push(part(ball(0.11, 12, 6).scale(0.95, 0.7, 1), HAIR, 0, 1.66, 0.012));  // стрижка
  } else {
    cloth.push(part(cyl(0.16, 0.3, 0.72, 14), WHITE, 0, 0.5, 0));                 // юбка
    cloth.push(part(cyl(0.155, 0.16, 0.5), WHITE, 0, 1.11, 0));                   // лиф
    cloth.push(part(ball(0.17, 12, 6).scale(1, 0.32, 0.8), WHITE, 0, 1.36, 0));   // плечи
    cloth.push(part(cyl(0.042, 0.038, 0.52), WHITE, -0.195, 1.1, 0, 0, 0.1));     // рукава
    cloth.push(part(cyl(0.042, 0.038, 0.52), WHITE, 0.195, 1.1, 0, 0, -0.1));
    skin.push(part(cyl(0.035, 0.03, 0.14, 8), SKIN, -0.07, 0.1, 0));              // ноги
    skin.push(part(cyl(0.035, 0.03, 0.14, 8), SKIN, 0.07, 0.1, 0));
    skin.push(part(new THREE.BoxGeometry(0.075, 0.05, 0.2), SHOE, -0.07, 0.025, -0.03));
    skin.push(part(new THREE.BoxGeometry(0.075, 0.05, 0.2), SHOE, 0.07, 0.025, -0.03));
    skin.push(part(ball(0.036, 6, 4), SKIN, -0.23, 0.82, 0));                     // кисти
    skin.push(part(ball(0.036, 6, 4), SKIN, 0.23, 0.82, 0));
    skin.push(part(cyl(0.04, 0.045, 0.1, 8), SKIN, 0, 1.44, 0));                  // шея
    skin.push(part(ball(0.098).scale(0.9, 1.1, 0.98), SKIN, 0, 1.55, 0));         // голова
    skin.push(part(ball(0.108, 12, 8).scale(0.98, 1.05, 1.02), HAIR, 0, 1.57, 0.02));   // волосы
    skin.push(part(new THREE.BoxGeometry(0.2, 0.3, 0.07), HAIR, 0, 1.43, 0.07));  // волосы на спине
  }
  const merge = (list) => { const g = mergeGeometries(list.map((x) => x.index ? x.toNonIndexed() : x), false); g.computeVertexNormals(); return g; };
  return { cloth: merge(cloth), skin: merge(skin) };
}

function shadowTex() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const gr = g.createRadialGradient(32, 32, 2, 32, 32, 31);
  gr.addColorStop(0, 'rgba(30,24,16,0.38)');
  gr.addColorStop(0.6, 'rgba(30,24,16,0.12)');
  gr.addColorStop(1, 'rgba(30,24,16,0)');
  g.fillStyle = gr;
  g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function nameSprite(name) {
  const c = document.createElement('canvas');
  const g = c.getContext('2d');
  const font = '600 40px "Helvetica Neue", Arial, sans-serif';
  g.font = font;
  const w = Math.min(560, Math.ceil(g.measureText(name).width) + 44);
  c.width = w; c.height = 64;
  g.font = font;
  g.fillStyle = 'rgba(255,255,255,0.92)';
  const r = 30;
  g.beginPath();
  g.moveTo(r, 2); g.arcTo(w - 2, 2, w - 2, 62, r); g.arcTo(w - 2, 62, 2, 62, r); g.arcTo(2, 62, 2, 2, r); g.arcTo(2, 2, w - 2, 2, r);
  g.fill();
  g.fillStyle = '#2a2a2a';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(name, w / 2, 34, w - 30);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  const m = new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false, toneMapped: false, fog: false });
  // в HD кадр целиком проходит тон-маппинг и белое сереет — светлее белого, как лампы
  m.color.setScalar(1.45);
  const s = new THREE.Sprite(m);
  s.center.set(0.5, 0);
  s.userData.aspect = w / 64;
  s.userData.noAO = true;          // полупрозрачное — в проход объёмного затенения не пускаем
  s.renderOrder = 5;
  return s;
}

const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(0, 0, 0, 'YXZ');
const _p = new THREE.Vector3(), _s = new THREE.Vector3(1, 1, 1), _c = new THREE.Color();
const _sph = new THREE.Sphere(new THREE.Vector3(), 1.1);

export class Peers {
  /* url(p) — адрес файла рядом с gallery.js (без него — только фигуры);
     pick — список объектов для щелчка, туда же добавляются меши аватаров */
  constructor(scene, small, url, pick) {
    this.scene = scene;
    this.small = small;
    this.avs = url ? new Avatars(url) : null;
    this.amax = small ? 4 : 8;
    this.pick = pick || [];
    this.frustum = new THREE.Frustum();
    this.list = new Map();          // id → посетитель
    this.me = null;
    this.base = null;               // часы службы относительно наших: max(ts − now) за 10 с
    this.arr = [];                  // [когда пришло, ts − now] — для оценки разброса доставки
    this.delay = DELAY;
    this.meshes = [];
    this.ids = { f: [], m: [] };    // номер экземпляра → id посетителя
    const mat = (vc) => new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.8, metalness: 0, envMapIntensity: 0.4 });
    this.group = new THREE.Group();
    this.group.name = 'peers';
    for (const sex of ['f', 'm']) {
      const b = body(sex);
      const cloth = new THREE.InstancedMesh(b.cloth, mat(), MAX);
      cloth.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(MAX * 3), 3);
      const skin = new THREE.InstancedMesh(b.skin, mat(), MAX);
      for (const m of [cloth, skin]) {
        m.count = 0;
        m.frustumCulled = false;      // границы меняются каждый кадр; фигур мало
        m.userData.peer = sex;
        m.castShadow = false;
        this.group.add(m);
      }
      this[sex] = { cloth, skin };
      this.meshes.push(cloth, skin);
    }
    if (!small) {
      const sg = new THREE.PlaneGeometry(0.9, 0.9).rotateX(-Math.PI / 2);
      this.shadow = new THREE.InstancedMesh(sg, new THREE.MeshBasicMaterial({ map: shadowTex(), transparent: true, depthWrite: false, toneMapped: false }), MAX);
      this.shadow.count = 0;
      this.shadow.frustumCulled = false;
      this.shadow.renderOrder = 1;
      this.shadow.userData.noAO = true;
      this.group.add(this.shadow);
    }
    scene.add(this.group);
  }

  /* Кто на выставке: [{id, name, sex, outfit}] (себя служба не присылает) */
  set(list) {
    const keep = new Set();
    for (const p of list) { keep.add(p.id); this.upsert(p); }
    for (const id of [...this.list.keys()]) if (!keep.has(id)) this.drop(id);
  }

  upsert(p) {
    let o = this.list.get(p.id);
    if (!o) {
      o = { id: p.id, buf: [], x: 0, z: 0, yaw: 0, shown: false, speed: 0, phase: Math.random() * 6, breath: Math.random() * 6 };
      this.list.set(p.id, o);
    }
    if (o.name !== p.name && o.label) { this.group.remove(o.label); o.label.material.map.dispose(); o.label.material.dispose(); o.label = null; }
    o.name = p.name;
    o.sex = p.sex === 'm' ? 'm' : 'f';
    o.outfit = OUTFITS[o.sex][p.outfit] != null ? p.outfit : 0;
    if (o.av && o.av.key !== o.sex + o.outfit) this.unav(o);   // сменил образ
    return o;
  }

  unav(o) {
    const a = o.av;
    if (!a) return;
    this.group.remove(a.root);
    for (const m of a.meshes) { const i = this.pick.indexOf(m); if (i >= 0) this.pick.splice(i, 1); }
    a.dispose();
    o.av = null;
  }

  /* Аватар для посетителя: готов — {…, on}, модель ещё грузится — null */
  avatar(o) {
    if (o.av) return o.av;
    const a = this.avs.make(o.sex, o.outfit);
    if (!a) return null;
    a.key = o.sex + o.outfit;
    a.on = false;
    a.root.visible = false;
    for (const m of a.meshes) { m.userData.peer = 'a'; m.userData.pid = o.id; this.pick.push(m); }
    this.group.add(a.root);
    return (o.av = a);
  }

  drop(id) {
    const o = this.list.get(id);
    if (!o) return;
    if (o.label) { this.group.remove(o.label); o.label.material.map.dispose(); o.label.material.dispose(); }
    this.unav(o);
    this.list.delete(id);
  }

  /* Пакет позиций: [[id, sec, room, x, z, yaw], …], ts — время службы, мс */
  move(m, ts) {
    const now = performance.now();
    if (ts) {
      // часы: самый быстрый пакет за 10 с; разброс — насколько остальные опаздывают
      this.arr.push([now, ts - now]);
      while (this.arr.length > 1 && now - this.arr[0][0] > 10000) this.arr.shift();
      let base = -Infinity;
      for (const a of this.arr) if (a[1] > base) base = a[1];
      this.base = base;
      const late = this.arr.slice(-60).map((a) => base - a[1]).sort((x, y) => x - y);
      const p95 = late[Math.floor(late.length * 0.95)] || 0;
      const want = Math.max(DELAY, Math.min(1500, p95 + 50));
      // вверх — сразу (иначе фигура застынет в ожидании), вниз — плавно
      this.delay = want > this.delay ? want : this.delay + (want - this.delay) * 0.03;
    }
    const t = ts || (now + (this.base || 0));
    for (const r of m) {
      if (r[0] === this.me) continue;
      const o = this.list.get(r[0]);
      if (!o) continue;
      const last = o.buf[o.buf.length - 1];
      const s = { t, sec: r[1], room: r[2], x: r[3], z: r[4], yaw: r[5] };
      if (last && Math.hypot(s.x - last.x, s.z - last.z) > JUMP) o.buf.length = 0;   // перенос через затемнение
      if (last && t <= last.t) s.t = last.t + 1;
      o.buf.push(s);
      if (o.buf.length > 30) o.buf.shift();
      o.sec = s.sec;
      if (!o.shown) { o.x = s.x; o.z = s.z; o.yaw = s.yaw; }
    }
  }

  /* Где посетитель в момент t (по буферу) */
  sample(o, t) {
    const b = o.buf;
    if (!b.length) return null;
    if (t <= b[0].t) return b[0];
    for (let i = b.length - 1; i > 0; i--) {
      const a = b[i - 1], c = b[i];
      if (t >= a.t && t <= c.t) {
        const k = (t - a.t) / Math.max(1, c.t - a.t);
        let dy = c.yaw - a.yaw;
        dy = Math.atan2(Math.sin(dy), Math.cos(dy));        // поворот по кратчайшей дуге
        return { x: a.x + (c.x - a.x) * k, z: a.z + (c.z - a.z) * k, yaw: a.yaw + dy * k };
      }
    }
    const L = b[b.length - 1], P = b.length > 1 ? b[b.length - 2] : null;
    if (P && t - L.t < EXTRA) {
      const k = (t - L.t) / Math.max(1, L.t - P.t);
      return { x: L.x + (L.x - P.x) * k, z: L.z + (L.z - P.z) * k, yaw: L.yaw };
    }
    return L;
  }

  /* Кадр: позы, экземпляры, подписи. cam — камера зрителя */
  update(dt, cam) {
    const now = performance.now();
    const t = now + (this.base || 0) - this.delay;
    const cx = cam.position.x, cz = cam.position.z;
    const vis = [];
    for (const o of this.list.values()) {
      const s = this.sample(o, t);
      if (!s) { o.shown = false; continue; }
      const px = o.x, pz = o.z;
      o.x = s.x; o.z = s.z;
      let dy = s.yaw - o.yaw;
      o.yaw += Math.atan2(Math.sin(dy), Math.cos(dy)) * Math.min(1, dt * 14);
      const v = o.shown && dt > 0 ? Math.hypot(o.x - px, o.z - pz) / dt : 0;
      o.speed += (Math.min(v, 3) - o.speed) * Math.min(1, dt * 8);
      o.shown = true;
      o.d = Math.hypot(o.x - cx, o.z - cz);
      // вплотную к камере не рисуем: иначе видно лицо изнутри (губы, зубы, ресницы)
      if (o.d < FAR && o.d > CLOSE) vis.push(o);
    }
    vis.sort((a, b) => a.d - b.d);
    if (vis.length > MAX) vis.length = MAX;

    // ближние — аватарами (кто уже аватар, остаётся им до NEAR_OUT)
    let na = 0;
    if (this.avs) {
      this.frustum.setFromProjectionMatrix(_m.multiplyMatrices(cam.projectionMatrix, cam.matrixWorldInverse));
      for (const o of vis) {
        const want = na < this.amax && o.d < (o.av && o.av.on ? NEAR_OUT : NEAR);
        const a = want ? this.avatar(o) : o.av;
        if (!a) continue;
        a.on = want;
        a.root.visible = want;
        if (!want) continue;
        na++;
        a.root.position.set(o.x, 0, o.z);
        a.root.rotation.y = o.yaw + Math.PI;        // модель смотрит на +Z, фигуры и камера — на −Z
        // скелет считаем только у видимых на экране
        _sph.center.set(o.x, 0.9, o.z);
        if (this.frustum.intersectsSphere(_sph)) a.update(dt, o.speed);
      }
    }
    for (const o of this.list.values()) if (o.av && o.av.on && !vis.includes(o)) { o.av.on = false; o.av.root.visible = false; }

    const n = { f: 0, m: 0 };
    this.ids.f.length = 0; this.ids.m.length = 0;
    let ns = 0;
    for (let i = 0; i < vis.length; i++) {
      const o = vis[i];
      const walk = Math.min(1, o.speed / 0.9);
      o.phase += dt * (o.speed / 0.72) * Math.PI;            // шаг ~0.72 м
      o.breath += dt * 1.6;
      const bob = walk * 0.022 * Math.abs(Math.sin(o.phase)) + (1 - walk) * 0.004 * Math.sin(o.breath);
      _e.set(-0.05 * walk, o.yaw, 0.03 * walk * Math.sin(o.phase));
      _q.setFromEuler(_e);
      _p.set(o.x, bob, o.z);
      _m.compose(_p, _q, _s);
      const av = o.av && o.av.on;
      if (!av) {
        const k = n[o.sex]++;
        const g = this[o.sex];
        g.cloth.setMatrixAt(k, _m);
        g.skin.setMatrixAt(k, _m);
        g.cloth.setColorAt(k, _c.setHex(OUTFITS[o.sex][o.outfit]));
        this.ids[o.sex][k] = o.id;
      }
      if (this.shadow) {
        _m.compose(_p.set(o.x, 0.012, o.z), _q.identity(), _s);
        this.shadow.setMatrixAt(ns++, _m);
      }
      // подпись — у ближайших
      if (i < (this.small ? 10 : NAMES)) {
        if (!o.label) { o.label = nameSprite(o.name); this.group.add(o.label); }
        o.label.visible = true;
        o.label.position.set(o.x, av ? o.av.h + 0.1 : (o.sex === 'm' ? 1.84 : 1.78) + bob, o.z);
        // вблизи — 22 см высотой, издали растёт: имя читается и в конце зала
        const lh = 0.22 * Math.max(1, o.d / 9);
        o.label.scale.set(lh * o.label.userData.aspect, lh, 1);
        o.label.material.opacity = o.d < 12 ? 1 : Math.max(0.25, 1 - (o.d - 12) / 20);
      } else if (o.label) o.label.visible = false;
      o.hidden = false;
    }
    for (const o of this.list.values()) {
      if (!vis.includes(o) && o.label) o.label.visible = false;
    }
    for (const sex of ['f', 'm']) {
      const g = this[sex];
      g.cloth.count = g.skin.count = n[sex];
      g.cloth.instanceMatrix.needsUpdate = g.skin.instanceMatrix.needsUpdate = true;
      if (g.cloth.instanceColor) g.cloth.instanceColor.needsUpdate = true;
      g.cloth.boundingSphere = g.skin.boundingSphere = null;   // для щелчка — пересчитается по фигурам
    }
    if (this.shadow) { this.shadow.count = ns; this.shadow.instanceMatrix.needsUpdate = true; }
  }

  /* Щелчок попал в фигуру: id посетителя */
  hitId(h) {
    const u = h.object.userData;
    if (u.pid) return u.pid;
    return (u.peer && h.instanceId != null) ? this.ids[u.peer][h.instanceId] : null;
  }

  /* Для плана залов: [{x, z, sec, name, color}] */
  dots() {
    const out = [];
    for (const o of this.list.values()) if (o.shown) out.push({ x: o.x, z: o.z, name: o.name, color: '#' + new THREE.Color(OUTFITS[o.sex][o.outfit]).getHexString() });
    return out;
  }

  dispose() {
    for (const id of [...this.list.keys()]) this.drop(id);
    if (this.avs) this.avs.dispose();
    this.scene.remove(this.group);
    this.group.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) { if (o.material.map) o.material.map.dispose(); o.material.dispose(); }
    });
  }
}
