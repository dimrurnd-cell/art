/* Мебель, оборудование и анимация пространства.

   Всё процедурное: модели собраны из тел вращения, скруглённых коробок и
   выдавливаний прямо в коде — без файлов моделей. Неподвижное (скамьи,
   огнетушители, датчики, спринклеры, решётки) строится при сборке зала;
   непрозрачное — одним материалом с цветом в вершинах, так что вся мебель
   зала сливается в один меш и почти не добавляет вызовов отрисовки.
   Подвижное — отдельные объекты с update():

   — стеклянные двери в проёмах холла разъезжаются, когда к ним подходят;
   — кинетическая скульптура-мобиль в холле качается и вращается;
   — светодиодный экран показывает живую заставку: работы выставки сменяют
     друг друга поверх фирменного градиента;
   — свет по датчику движения: зал, где стоит зритель, светится полностью,
     остальные приглушены; при входе споты и световые линии загораются
     волной от входа;
   — камеры наблюдения медленно поворачиваются, у датчиков дыма мигает
     светодиод, листья растений шевелятся от вентиляции.

   Места выбраны так, чтобы не мешать пути: скамьи — у торцов острова (их
   обходит маршрут перехода между проходами), навесное — на боковых
   простенках перегородок, мелочи — на потолке. */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { batch } from './world.js';
import { textCanvas, canvasTexture, spaced, SANS } from './materials.js';
import {
  COR_W, COR_H, ARCH_W, ARCH_H, WALL_T, DOOR_W, aisleX,
} from './layout.js';

const _m = new THREE.Matrix4();
const _e = new THREE.Euler();
const TAU = Math.PI * 2;

function ease(t) { return t * t * (3 - 2 * t); }

/* Один материал на всю непрозрачную мебель: цвет, шероховатость и
   металличность записаны в вершины (атрибуты color и rm). Сталь, алюминий,
   белый пластик и резина одного зала сливаются в один меш — один вызов
   отрисовки вместо восьми. Третья компонента rm — свечение: так мигают
   светодиоды датчиков (яркость — общая переменная glow). */
function propsMaterial(glow) {
  const mat = batch(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, metalness: 1 }));
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.uGlow = glow;
    sh.vertexShader = 'attribute vec3 rm;\nvarying vec3 vRM;\n' +
      sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvRM = rm;');
    sh.fragmentShader = 'varying vec3 vRM;\nuniform float uGlow;\n' + sh.fragmentShader
      .replace('#include <roughnessmap_fragment>', THREE.ShaderChunk.roughnessmap_fragment
        .replace('float roughnessFactor = roughness;', 'float roughnessFactor = vRM.x;'))
      .replace('#include <metalnessmap_fragment>', THREE.ShaderChunk.metalnessmap_fragment
        .replace('float metalnessFactor = metalness;', 'float metalnessFactor = vRM.y;'))
      .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\ntotalEmissiveRadiance += vColor.rgb * vRM.z * uGlow;');
  };
  mat.customProgramCacheKey = () => 'artg-props';
  return mat;
}

/* Записать «материал» d = { color, r, m } в вершины геометрии */
function paint(g, d) {
  const n = g.attributes.position.count;
  const col = new Float32Array(n * 3), rm = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    col[i * 3] = d.color.r; col[i * 3 + 1] = d.color.g; col[i * 3 + 2] = d.color.b;
    rm[i * 3] = d.r; rm[i * 3 + 1] = d.m; rm[i * 3 + 2] = d.e;
  }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  g.setAttribute('rm', new THREE.BufferAttribute(rm, 3));
  return g;
}

function merge(list) {
  if (list.some((x) => !x.index)) list = list.map((x) => (x.index ? x.toNonIndexed() : x));
  return mergeGeometries(list, false);
}

export class Props {
  constructor(world) {
    this.w = world;
    this.time = 0;
    this.doors = [];
    this.cams = [];
    this.uTime = { value: 0 };
    this.glow = { value: 0 };
    this.pm = propsMaterial(this.glow);
    this.m = this.materials();
    this.g = this.geometries();
  }

  /* ---------------- материалы и заготовки ---------------- */

  materials() {
    const S = (o) => new THREE.MeshStandardMaterial(Object.assign({ metalness: 0 }, o));
    // «материалы» общего вершинного материала: цвет, шероховатость, металличность
    const D = (color, r, m, e = 0) => ({ desc: true, color: new THREE.Color(color), r, m, e });
    return {
      steel: D(0xbfc2c4, 0.32, 1),
      alu: D(0xd4d6d8, 0.26, 1),
      chrome: D(0xeeeeee, 0.1, 1),
      white: D(0xf1f0ec, 0.48, 0),
      black: D(0x1c1c1c, 0.45, 0),
      rubber: D(0x232323, 0.92, 0),
      red: D(0xb3171d, 0.3, 0),
      smoke: D(0x151719, 0.08, 0.3),
      wire: D(0x202020, 0.4, 1),
      disc: [0xe4736f, 0x3e7d95, 0xf0b450, 0xf4f1ea, 0x2a2a2a].map((c) => D(c, 0.28, 0)),
      // стекло: прозрачное, но с отражениями зала
      glass: batch(S({ color: 0xe8f0ee, roughness: 0.03, transparent: true, opacity: 0.16, depthWrite: false, envMapIntensity: 2.2 })),
      frosted: batch(S({ color: 0xf4f4f0, roughness: 0.6, emissive: 0xfffaf0, emissiveIntensity: 0.55 })),
      led: D(0xff3a2a, 0.4, 0, 1),
    };
  }

  geometries() {
    // датчик дыма: низкий диск с юбкой
    const detector = new THREE.LatheGeometry([
      new THREE.Vector2(0, 0), new THREE.Vector2(0.06, 0), new THREE.Vector2(0.066, -0.01),
      new THREE.Vector2(0.064, -0.03), new THREE.Vector2(0.04, -0.038), new THREE.Vector2(0, -0.04),
    ], 16);
    // спринклер: розетка, штуцер, отражатель
    const sprinkler = new THREE.LatheGeometry([
      new THREE.Vector2(0, 0), new THREE.Vector2(0.038, 0), new THREE.Vector2(0.038, -0.008),
      new THREE.Vector2(0.01, -0.012), new THREE.Vector2(0.008, -0.05), new THREE.Vector2(0.026, -0.056),
      new THREE.Vector2(0.026, -0.06), new THREE.Vector2(0, -0.06),
    ], 8);
    // баллон огнетушителя
    const bottle = new THREE.LatheGeometry([
      new THREE.Vector2(0, 0), new THREE.Vector2(0.07, 0), new THREE.Vector2(0.078, 0.02),
      new THREE.Vector2(0.078, 0.44), new THREE.Vector2(0.066, 0.48), new THREE.Vector2(0.03, 0.5),
      new THREE.Vector2(0.018, 0.53), new THREE.Vector2(0, 0.53),
    ], 20);
    return { detector, sprinkler, bottle };
  }

  /* Положить геометрию в мир: поворот (ry, rx, rz) и сдвиг */
  put(geo, mat, x, y, z, ry = 0, rx = 0, rz = 0) {
    const g = this.piece(geo, mat, x, y, z, ry, rx, rz);
    return this.w.geoMesh(g, mat.desc ? this.pm : mat);
  }

  /* Копия геометрии с поворотом и сдвигом; для «материала» — с цветом в вершинах */
  piece(geo, mat, x = 0, y = 0, z = 0, ry = 0, rx = 0, rz = 0) {
    const g = geo.clone();
    g.applyMatrix4(_m.makeRotationFromEuler(_e.set(rx, ry, rz, 'YXZ')));
    g.translate(x, y, z);
    return mat.desc ? paint(g, mat) : g;
  }

  /* Подвижная деталь: несколько кусков одним мешем общего материала */
  solid(pieces) {
    const m = new THREE.Mesh(merge(pieces), this.pm);
    pieces.forEach((g) => g.dispose());
    return m;
  }

  /* Скруглённая коробка; seg — сегментов на скругление (мелочи хватает одного) */
  rbox(w, h, d, r, mat, x, y, z, ry = 0, rx = 0, seg = 1) {
    return this.put(new RoundedBoxGeometry(w, h, d, seg, r), mat, x, y, z, ry, rx);
  }

  box(w, h, d, mat, x, y, z, ry = 0, rx = 0) {
    return this.put(new THREE.BoxGeometry(w, h, d), mat, x, y, z, ry, rx);
  }

  /* ---------------- модели ---------------- */

  /* Скамья: дубовое сиденье на двух стальных П-образных опорах. ry — поворот */
  bench(x, z, ry, len) {
    const W = this.w, M = this.m;
    const c = Math.cos(ry), s = Math.sin(ry);
    const at = (lx, lz) => [x + lx * c + lz * s, z - lx * s + lz * c];
    this.rbox(len, 0.05, 0.44, 0.012, W.mat.oak, x, 0.455, z, ry, 0, 2);
    [-1, 1].forEach((e) => {
      const lx = e * (len / 2 - 0.2);
      const [px, pz] = at(lx, 0);
      this.box(0.04, 0.43, 0.36, M.steel, px, 0.215, pz, ry);             // стойка
      this.box(0.06, 0.012, 0.4, M.rubber, px, 0.006, pz, ry);           // подпятник
    });
    // мягкая тень под скамьёй
    W.plane(len + 0.5, 0.95, W.mat.shadow, x, 0.004, z, ry, -Math.PI / 2);
  }

  /* Шкаф с огнетушителем и знаком над ним. nz — куда смотрит стена (+1/−1 по Z) */
  extinguisher(x, z, nz) {
    const M = this.m;
    const ry = nz > 0 ? 0 : Math.PI;
    const d = 0.2, cw = 0.44, ch = 0.74, cy = 0.95, t = 0.014;
    const zc = z + nz * d / 2;
    const at = (lz) => z + nz * lz;
    // полый шкаф: задняя стенка, бока, верх и низ, рамка дверцы — баллон виден сквозь стекло
    this.box(cw, ch, 0.01, M.white, x, cy, at(0.005), ry);
    [-1, 1].forEach((e) => {
      this.box(t, ch, d, M.white, x + e * (cw - t) / 2, cy, zc, ry);
      this.box(cw, t, d, M.white, x, cy + e * (ch - t) / 2, zc, ry);
      this.box(0.03, ch, 0.012, M.white, x + e * (cw / 2 - 0.015), cy, at(d), ry);
      this.box(cw, 0.03, 0.012, M.white, x, cy + e * (ch / 2 - 0.015), at(d), ry);
    });
    this.box(0.012, 0.09, 0.016, M.chrome, x + 0.16, cy, at(d + 0.01), ry);          // ручка
    this.box(cw - 0.06, ch - 0.06, 0.004, M.glass, x, cy, at(d - 0.004), ry);       // стекло дверцы
    this.put(this.g.bottle, M.red, x - 0.03, 0.62, zc);                              // баллон
    this.box(0.035, 0.07, 0.035, M.black, x - 0.03, 1.18, zc);                       // головка
    this.box(0.12, 0.016, 0.022, M.chrome, x + 0.01, 1.215, zc, 0, 0.12);           // рычаг
    // шланг с раструбом: от головки вниз вдоль баллона
    const hose = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.03, 1.17, 0), new THREE.Vector3(0.1, 1.12, 0),
      new THREE.Vector3(0.12, 0.95, 0), new THREE.Vector3(0.11, 0.78, 0),
    ]);
    this.put(new THREE.TubeGeometry(hose, 10, 0.009, 6), M.rubber, x - 0.03, 0, zc, ry);
    this.put(new THREE.CylinderGeometry(0.018, 0.012, 0.09, 12), M.black, x + 0.08, 0.74, zc);
    // этикетка на баллоне
    this.put(new THREE.CylinderGeometry(0.079, 0.079, 0.16, 10, 1, true, -0.9, 1.8), M.white, x - 0.03, 0.9, zc, nz > 0 ? 0 : Math.PI);
    this.atlasSign(0, 1, 0.2, 0.2, x, 1.52, z + nz * 0.004, ry);                // знак «огнетушитель»
  }

  /* Атлас мелких табличек на все залы: знак огнетушителя и четыре варианта
     показаний гигрометра. Одна текстура — один материал — одно слияние. */
  signAtlas() {
    if (this.atlasMat) return this.atlasMat;
    const cv = textCanvas(1280, 256, (g) => {
      g.fillStyle = '#c8161d'; g.fillRect(0, 0, 256, 256);
      g.fillStyle = '#fff';
      g.beginPath(); g.roundRect(96, 70, 64, 150, 18); g.fill();          // баллон
      g.fillRect(118, 44, 20, 30);                                        // горловина
      g.fillRect(70, 40, 70, 14);                                         // рукоять
      g.beginPath(); g.moveTo(140, 50); g.quadraticCurveTo(200, 40, 190, 120); g.lineWidth = 10; g.strokeStyle = '#fff'; g.stroke();
      for (let k = 0; k < 4; k++) {
        const x0 = 256 * (k + 1), t = (20.6 + k * 0.5).toFixed(1), h = 47 + ((k * 3) % 8);
        g.fillStyle = '#c9d2c6'; g.fillRect(x0, 0, 256, 200);
        g.fillStyle = '#1d2a22'; g.textAlign = 'right';
        g.font = '600 78px ' + SANS; g.fillText(t + '°', x0 + 236, 88);
        g.font = '500 56px ' + SANS; g.fillText(h + '%', x0 + 236, 168);
      }
    });
    this.atlasMat = batch(new THREE.MeshBasicMaterial({ map: canvasTexture(cv) }));
    return this.atlasMat;
  }

  /* Табличка из атласа: cell — ячейка 256 px, frac — занятая доля её высоты */
  atlasSign(cell, frac, w, h, x, y, z, ry) {
    const g = new THREE.PlaneGeometry(w, h), uv = g.attributes.uv;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, (cell + uv.getX(i)) / 5, 1 - (1 - uv.getY(i)) * frac);
    this.put(g, this.signAtlas(), x, y, z, ry);
  }

  /* Табличка: плоскость с текстурой; с общим материалом — в слияние */
  sign(mat, w, h, x, y, z, ry, rx = 0) {
    return this.put(new THREE.PlaneGeometry(w, h), mat, x, y, z, ry, rx);
  }

  /* Гигрометр с термометром — в музее он висит в каждом зале */
  hygrometer(x, z, nz) {
    const ry = nz > 0 ? 0 : Math.PI;
    this.rbox(0.13, 0.13, 0.03, 0.008, this.m.white, x, 1.5, z + nz * 0.015, ry);
    this.atlasSign(1 + Math.floor(Math.random() * 4), 200 / 256, 0.1, 0.078, x, 1.505, z + nz * 0.031, ry);
  }

  /* Световой указатель «Выход» */
  exitSign(x, y, z, ry) {
    this.box(0.4, 0.17, 0.05, this.m.white, x, y, z - Math.cos(ry) * 0.025);
    if (!this.exitMat) {
      const cv = textCanvas(512, 224, (g, w, h) => {
        g.fillStyle = '#0e9a4a'; g.fillRect(0, 0, w, h);
        g.fillStyle = '#fff';
        // бегущий человечек
        g.beginPath(); g.arc(80, 52, 18, 0, TAU); g.fill();
        g.lineWidth = 16; g.lineCap = 'round'; g.strokeStyle = '#fff';
        g.beginPath(); g.moveTo(74, 80); g.lineTo(64, 140); g.lineTo(96, 190); g.moveTo(64, 140); g.lineTo(34, 180);
        g.moveTo(72, 96); g.lineTo(110, 118); g.moveTo(72, 96); g.lineTo(40, 110); g.stroke();
        g.font = '700 84px ' + SANS; g.textAlign = 'left';
        spaced(g, 'ВЫХОД', 150, 145, 4);
      });
      this.exitMat = batch(new THREE.MeshBasicMaterial({ map: canvasTexture(cv), color: new THREE.Color(2.2, 2.2, 2.2) }));
    }
    this.sign(this.exitMat, 0.37, 0.16, x, y, z + Math.cos(ry) * 0.002, ry);
  }

  /* Камера наблюдения на кронштейне: корпус медленно поворачивается */
  camera(x, y, z, ry) {
    const M = this.m;
    const root = new THREE.Group();
    root.position.set(x, y, z);
    root.rotation.y = ry;
    this.put(new THREE.CylinderGeometry(0.018, 0.018, 0.22, 12), M.white, x, y - 0.11, z);   // кронштейн
    const head = new THREE.Group();
    head.position.set(0, -0.24, 0);
    head.add(this.solid([
      this.piece(new RoundedBoxGeometry(0.1, 0.09, 0.24, 1, 0.02), M.white, 0, 0, 0.06),        // корпус
      this.piece(new THREE.BoxGeometry(0.12, 0.012, 0.26), M.white, 0, 0.052, 0.07),            // козырёк
      this.piece(new THREE.CylinderGeometry(0.028, 0.028, 0.012, 20), M.smoke, 0, 0, 0.186, 0, Math.PI / 2), // объектив
    ]));
    head.rotation.x = 0.35;
    root.add(head);
    this.w.add(root);
    this.cams.push({ head, base: 0, phase: Math.random() * TAU, speed: 0.12 + Math.random() * 0.06 });
  }

  /* Потолок зала: решётки вентиляции, спринклеры, датчики дыма */
  ceiling(c, r) {
    const M = this.m, H = COR_H;
    const z0 = r.z0 - 1.2, z1 = r.z1 + 1.2;
    [-1, 1].forEach((a) => {
      const x = aisleX(c, a);
      for (let z = z0 - 1.5; z > z1; z -= 6) {
        this.grille(x, H - 0.004, z);
      }
      for (let z = z0; z > z1; z -= 4.5) this.put(this.g.sprinkler, M.chrome, x + a * 0.9, H, z);
      this.detector(x - a * 0.8, H, (r.z0 + r.z1) / 2);
    });
  }

  /* Датчик дыма со светодиодом (светодиод мигает — см. update) */
  detector(x, y, z) {
    this.put(this.g.detector, this.m.white, x, y, z);
    this.put(new THREE.SphereGeometry(0.005, 8, 6), this.m.led, x + 0.03, y - 0.041, z);
  }

  grille(x, y, z) {
    // прямоугольник с ламелями: тёмная ниша и светлые рёбра
    const M = this.m;
    this.box(0.18, 0.01, 1.2, M.black, x, y, z);
    for (let k = -3; k <= 3; k++) this.box(0.012, 0.012, 1.18, M.white, x + k * 0.022, y - 0.006, z);
  }

  /* ---------------- расстановка ---------------- */

  /* Зал: скамьи у торцов острова, потолок, камера */
  room(c, r) {
    const len = 1.9;
    const plan = this.w.plan;
    // у обоих торцов острова; маршрут перехода идёт серединой зоны у торца, скамья ближе к острову
    [r.spine0 + 0.62, r.spine1 - 0.62].forEach((z) => {
      this.bench(c.cx, z, 0, len);
      plan.block.push({ x0: c.cx - len / 2 - 0.35, x1: c.cx + len / 2 + 0.35, z0: z - 0.5, z1: z + 0.5 });
    });
    this.ceiling(c, r);
    this.camera(c.cx - COR_W / 2 + 0.35, COR_H - 0.02, r.z0 - 0.4, Math.PI * 0.75);
    if (r.idx === 0) this.exitSign(c.cx + ARCH_W / 2 + 0.6, 3.1, r.z0 - 0.002, Math.PI);
    // навесное на перегородках — в группе зала, чьей стороной оно обращено:
    // сливается с остальной мебелью зала и скрывается вместе с ним
    const xl = c.cx - COR_W / 2, xr = c.cx + COR_W / 2;
    const xa = aisleX(c, -1), xb = aisleX(c, 1);
    const left = (xl + xa - DOOR_W / 2) / 2, right = (xb + DOOR_W / 2 + xr) / 2;
    // дальняя перегородка: огнетушитель на боковом простенке, то слева, то справа
    if (r.idx < c.rooms.length - 1) this.extinguisher(r.idx % 2 ? right : left, r.z1, 1);
    // ближняя перегородка, её сторона к этому залу: гигрометр на среднем простенке
    if (r.idx > 0) this.hygrometer(c.cx + 0.9, c.rooms[r.idx - 1].z1 - WALL_T, -1);
  }

  /* Холл: двери, экран, скульптура, киоск, урны, вход, мелочи на стойке */
  hall() {
    const W = this.w, P = W.plan, h = P.hall, M = this.m;
    // стеклянные раздвижные двери — в группе стены холла (видна и из залов)
    P.corridors.forEach((c) => this.slidingDoor(c.cx, h.z0 + WALL_T / 2 + 0.09));
    // урны у проёмов
    P.corridors.forEach((c) => {
      const bx = c.cx + ARCH_W / 2 + 0.9, bz = h.z0 + 0.55;
      this.put(new THREE.CylinderGeometry(0.17, 0.16, 0.62, 28, 1, true), M.steel, bx, 0.31, bz);
      this.put(new THREE.CylinderGeometry(0.155, 0.155, 0.02, 28), M.black, bx, 0.6, bz);
      this.put(new THREE.TorusGeometry(0.165, 0.008, 8, 28).rotateX(Math.PI / 2), M.steel, bx, 0.62, bz);
      P.block.push({ x0: bx - 0.35, x1: bx + 0.35, z0: bz - 0.35, z1: bz + 0.35 });
    });
    // вход с юга: матовые стеклянные двери, за которыми день, и «Выход» над ними
    const zs = h.z1;
    this.box(2.5, 2.9, 0.06, M.alu, 0, 1.45, zs - 0.03);
    [-1, 1].forEach((s) => {
      this.box(1.14, 2.74, 0.02, M.frosted, s * 0.59, 1.43, zs - 0.065);
      this.box(0.03, 0.6, 0.03, M.chrome, s * 0.14, 1.1, zs - 0.1);
    });
    this.exitSign(0, 3.25, zs - 0.03, Math.PI);
    // киоск с планом у юго-восточного угла
    this.kiosk(h.x1 - 2, h.z1 - 3.6, -Math.PI / 2);
    P.block.push({ x0: h.x1 - 2.5, x1: h.x1 - 1.5, z0: h.z1 - 4.1, z1: h.z1 - 3.1 });
    // стойка: монитор к администратору, буклеты к посетителям
    const dx = h.x0 + 1.5;
    this.rbox(0.6, 0.36, 0.025, 0.01, M.black, dx - 0.15, 1.36, 1.7, Math.PI / 2);
    this.box(0.04, 0.2, 0.04, M.alu, dx - 0.13, 1.18, 1.7);
    this.box(0.22, 0.01, 0.18, M.alu, dx - 0.13, 1.095, 1.7);
    this.brochures(dx + 0.3, 3.3);
    // потолок холла
    for (let x = h.x0 + 3; x < h.x1 - 2; x += 4.5) {
      this.put(this.g.sprinkler, M.chrome, x, h.h, -3.5);
      this.put(this.g.sprinkler, M.chrome, x, h.h, 3.5);
    }
    this.detector(-4, h.h, 0);
    this.detector(4, h.h, 0);
    this.camera(h.x0 + 0.4, h.h - 0.02, h.z1 - 0.4, Math.PI * 0.25 + Math.PI);
    this.camera(h.x1 - 0.4, h.h - 0.02, h.z0 + 0.4, -Math.PI * 0.25);
  }

  brochures(x, z) {
    const M = this.m;
    this.box(0.06, 0.26, 0.5, M.glass, x, 1.22, z);
    // три обложки на одной текстуре — один материал
    const covers = ['#e4736f', '#3e7d95', '#f0b450'];
    const cv = textCanvas(384, 180, (g, w, hh) => {
      covers.forEach((col, i) => {
        const x0 = i * 128;
        g.fillStyle = col; g.fillRect(x0, 0, 128, hh);
        g.fillStyle = '#fff'; g.font = '600 20px ' + SANS; g.fillText('АРТ-', x0 + 12, 40); g.fillText('РОСТОВ', x0 + 12, 64);
        g.font = '400 14px ' + SANS; g.fillText('2026', x0 + 12, 160);
      });
    });
    const mat = batch(new THREE.MeshStandardMaterial({ map: canvasTexture(cv), roughness: 0.5 }));
    covers.forEach((col, i) => {
      const g = new THREE.PlaneGeometry(0.1, 0.14), uv = g.attributes.uv;
      for (let k = 0; k < uv.count; k++) uv.setX(k, (i + uv.getX(k)) / 3);
      this.put(g, mat, x + 0.02, 1.2, z - 0.16 + i * 0.16, Math.PI / 2, -0.25);
    });
  }

  kiosk(x, z, ry) {
    const M = this.m;
    this.rbox(0.5, 0.02, 0.4, 0.008, M.alu, x, 0.01, z, ry);
    this.box(0.07, 1.0, 0.07, M.alu, x, 0.5, z, ry);
    const cv = textCanvas(512, 720, (g, w, hh) => {
      g.fillStyle = '#16181a'; g.fillRect(0, 0, w, hh);
      g.fillStyle = '#fff'; g.font = '300 34px ' + SANS; spaced(g, 'ПЛАН ВЫСТАВКИ', 36, 70, 5);
      g.strokeStyle = 'rgba(255,255,255,.7)'; g.lineWidth = 3;
      g.strokeRect(60, 520, w - 120, 120);                                     // холл
      g.strokeRect(80, 140, 150, 370); g.strokeRect(w - 230, 140, 150, 370);  // разделы
      for (let y = 140; y < 510; y += 46) { g.beginPath(); g.moveTo(80, y); g.lineTo(230, y); g.moveTo(w - 230, y); g.lineTo(w - 80, y); g.stroke(); }
      g.fillStyle = '#e4736f'; g.beginPath(); g.arc(w / 2 + 60, 600, 12, 0, TAU); g.fill();
      g.fillStyle = 'rgba(255,255,255,.8)'; g.font = '400 24px ' + SANS;
      g.fillText('Вы здесь', w / 2 + 84, 608); g.fillText('Арт-салон', 86, 130); g.fillText('Галереи', w - 224, 130);
    });
    const c = Math.cos(ry), s = Math.sin(ry);
    this.rbox(0.62, 0.86, 0.06, 0.02, M.black, x + s * 0.02, 1.35, z + c * 0.02, ry, -0.25);
    this.sign(new THREE.MeshBasicMaterial({ map: canvasTexture(cv), color: new THREE.Color(1.3, 1.3, 1.3) }), 0.54, 0.76, x + s * 0.055, 1.35, z + c * 0.055, ry, -0.25);
  }

  /* Раздвижные двери: две стеклянные створки в алюминиевой раме и короб
     привода над проёмом. Живут вне слияния: они двигаются. */
  slidingDoor(cx, z) {
    const M = this.m;
    const root = new THREE.Group();
    root.position.set(cx, 0, z);
    root.add(this.solid([this.piece(new RoundedBoxGeometry(ARCH_W + 0.5, 0.2, 0.14, 2, 0.02), M.alu, 0, ARCH_H + 0.1, 0.02)]));
    const pw = ARCH_W / 2 + 0.04, ph = ARCH_H - 0.03;
    const leaves = [-1, 1].map((s) => {
      const leaf = new THREE.Group();
      const glass = new THREE.Mesh(new THREE.BoxGeometry(pw - 0.05, ph - 0.1, 0.012), M.glass);
      glass.position.y = ph / 2;
      leaf.add(glass);
      // алюминиевая рама створки — одним мешем
      leaf.add(this.solid([
        this.piece(new THREE.BoxGeometry(0.035, ph, 0.04), M.alu, -pw / 2 + 0.0175, ph / 2, 0),
        this.piece(new THREE.BoxGeometry(0.035, ph, 0.04), M.alu, pw / 2 - 0.0175, ph / 2, 0),
        this.piece(new THREE.BoxGeometry(pw, 0.07, 0.04), M.alu, 0, 0.035, 0),
        this.piece(new THREE.BoxGeometry(pw, 0.04, 0.04), M.alu, 0, ph - 0.02, 0),
      ]));
      root.add(leaf);
      return { leaf, s };
    });
    const prev = this.w.target;
    this.w.target = this.w.hallNorth;
    this.w.add(root);
    this.w.target = prev;
    this.doors.push({ cx, z, leaves, open: 0, pw, was: 0 });
    this.placeDoor(this.doors[this.doors.length - 1]);
  }

  placeDoor(d) {
    const o = ease(d.open);
    d.leaves.forEach(({ leaf, s }) => {
      leaf.position.x = s * (d.pw / 2 - 0.02 + o * (d.pw - 0.12));
    });
  }

  /* ---------------- экран и скульптура ---------------- */

  screen(bridge, tex) {
    const W = this.w, h = W.plan.hall;
    const sw = 5.2, sh = sw * 9 / 16, y = 3.1, z = h.z0 + WALL_T / 2 + 0.07;
    const prev = W.target;
    W.target = W.hallGroup;
    this.rbox(sw + 0.14, sh + 0.14, 0.08, 0.02, this.m.black, 0, y, z - 0.03, 0, 0, 2);
    const U = {
      tA: { value: null }, tB: { value: null }, aA: { value: 1 }, aB: { value: 1 },
      mixv: { value: 0 }, time: { value: 0 }, kA: { value: 1 }, kB: { value: 1 },
      tText: { value: null }, scr: { value: sw / sh }, fA: { value: 0 }, fB: { value: 0 }, prog: { value: 0 },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms: U,
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: `
        uniform sampler2D tA, tB, tText; uniform float aA, aB, mixv, time, kA, kB, scr, fA, fB, prog; varying vec2 vUv;
        vec3 blob(vec2 uv, vec2 p, float r){ return vec3(smoothstep(r, 0.0, length((uv - p) * vec2(scr, 1.0)))); }
        vec3 bg(vec2 uv){
          vec3 c = vec3(0.05, 0.045, 0.045);
          c += vec3(0.89, 0.45, 0.43) * 0.55 * blob(uv, vec2(0.25 + 0.12 * sin(time * 0.21), 0.45 + 0.15 * cos(time * 0.17)), 0.9);
          c += vec3(0.24, 0.49, 0.58) * 0.55 * blob(uv, vec2(0.78 + 0.1 * cos(time * 0.13), 0.62 + 0.12 * sin(time * 0.19)), 1.0);
          c += vec3(0.94, 0.71, 0.31) * 0.40 * blob(uv, vec2(0.55 + 0.15 * sin(time * 0.11), 0.18), 0.7);
          return c;
        }
        vec4 art(sampler2D t, float aspect, float k, float on, float flip){
          vec2 size = vec2(0.8 * aspect / scr, 0.8);
          if (size.x > 0.45) size *= 0.45 / size.x;
          vec2 ctr = vec2(0.71, 0.5);
          vec2 p = (vUv - ctr) / size / k + 0.5;
          float inside = step(0.0, p.x) * step(p.x, 1.0) * step(0.0, p.y) * step(p.y, 1.0);
          vec2 q = (vUv - ctr) / (size * k);
          float mat = step(abs(q.x), 0.5 + 0.018 / size.x) * step(abs(q.y), 0.5 + 0.018 / size.y);   // белое паспарту
          vec2 tp = vec2(p.x, mix(p.y, 1.0 - p.y, flip));          // картинка из ImageBitmap идёт сверху вниз
          vec3 col = mix(vec3(0.95), texture2D(t, clamp(tp, 0.0, 1.0)).rgb, inside);
          return vec4(col, mat * on);
        }
        void main(){
          vec3 c = bg(vUv);
          vec4 a = art(tA, aA, kA, 1.0 - mixv, fA);
          vec4 b = art(tB, aB, kB, mixv, fB);
          c = mix(c, a.rgb, a.a);
          c = mix(c, b.rgb, b.a);
          vec4 tx = texture2D(tText, vUv);
          c = mix(c, tx.rgb, tx.a);
          // полоска времени слайда под именем художника
          float bar = step(0.047, vUv.x) * step(vUv.x, 0.047 + 0.3 * prog) * step(abs(vUv.y - 0.045), 0.0035);
          float rail = step(0.047, vUv.x) * step(vUv.x, 0.347) * step(abs(vUv.y - 0.045), 0.0035);
          c = mix(c, vec3(1.0), rail * 0.18 + bar * 0.7);
          gl_FragColor = vec4(c * 1.35, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
    });
    const scr = new THREE.Mesh(new THREE.PlaneGeometry(sw, sh), mat);
    scr.position.set(0, y, z + 0.012);
    W.add(scr);
    // свет от экрана на пол и стены — площадной источник, цвет следует за заставкой
    this.screenLight = new THREE.RectAreaLight(0xffffff, 1.4, sw, sh);
    this.screenLight.position.set(0, y, z + 0.05);
    this.screenLight.lookAt(0, y, z + 5);
    W.add(this.screenLight);
    W.target = prev;

    this.scr = { U, bridge, tex, next: 0, pool: null, busy: false, textCv: null };
    const cv = document.createElement('canvas');
    cv.width = 1024; cv.height = 576;
    this.scr.textCv = cv;
    U.tText.value = new THREE.CanvasTexture(cv);
    U.tText.value.colorSpace = THREE.SRGBColorSpace;
    const blank = new THREE.DataTexture(new Uint8Array([40, 36, 34, 255]), 1, 1);
    blank.needsUpdate = true;
    U.tA.value = U.tB.value = blank;
    this.caption('');
  }

  /* Надписи экрана: слева колонка с названием выставки, внизу имя художника */
  caption(name) {
    const cv = this.scr.textCv, g = cv.getContext('2d');
    g.clearRect(0, 0, cv.width, cv.height);
    g.fillStyle = 'rgba(255,255,255,0.96)';
    g.font = '300 46px ' + SANS;
    spaced(g, 'АРТ-РОСТОВ', 48, 92, 6);
    g.font = '600 46px ' + SANS;
    spaced(g, '2026', 48, 146, 6);
    g.font = '400 19px ' + SANS;
    g.fillStyle = 'rgba(255,255,255,0.72)';
    spaced(g, 'ВЫСТАВКА-ПРОДАЖА', 50, 192, 4);
    spaced(g, 'СОВРЕМЕННОГО ИСКУССТВА', 50, 218, 4);
    if (name) {
      g.font = '400 17px ' + SANS;
      g.fillStyle = 'rgba(255,255,255,0.6)';
      spaced(g, 'СЕЙЧАС НА ЭКРАНЕ', 50, cv.height - 118, 3);
      g.fillStyle = 'rgba(255,255,255,0.95)';
      g.font = '400 28px ' + SANS;
      // длинное ФИО — в две строки, чтобы не заходить на картину
      const words = name.split(' '), lines = [''];
      words.forEach((wd) => {
        const tryL = lines[lines.length - 1] ? lines[lines.length - 1] + ' ' + wd : wd;
        if (g.measureText(tryL).width > 370 && lines[lines.length - 1]) lines.push(wd); else lines[lines.length - 1] = tryL;
      });
      lines.slice(0, 2).forEach((l, i) => g.fillText(l, 48, cv.height - 80 + i * 34 - (lines.length > 1 ? 0 : -16)));
    }
    this.scr.U.tText.value.needsUpdate = true;
  }

  /* Следующий слайд: случайная работа, крупная версия (800 px) */
  nextSlide() {
    const s = this.scr;
    if (s.busy) return;
    if (!s.pool) {
      s.pool = [];
      s.bridge.artists.forEach((a, gi) => (a.works || []).forEach((w) => { if (w.medium) s.pool.push({ gi, w }); }));
    }
    if (!s.pool.length) return;
    const pick = s.pool[Math.floor(Math.random() * s.pool.length)];
    s.busy = true;
    s.tex.fetchImage(s.bridge.url(pick.w.medium)).then((img) => {
      const t = s.tex.makeTexture(img);
      t.generateMipmaps = true;
      const U = s.U;
      if (s.old) s.old.dispose();                  // уходящая картинка больше не нужна
      s.old = U.tA.value.isDataTexture ? null : U.tA.value;
      U.tA.value = U.tB.value; U.aA.value = U.aB.value; U.kA.value = U.kB.value; U.fA.value = U.fB.value;
      U.tB.value = t; U.aB.value = (img.width || 1) / (img.height || 1); U.fB.value = t.userData.topDown ? 1 : 0;
      U.mixv.value = 0;
      s.shownAt = this.time;
      this.caption(s.bridge.artists[pick.gi].name);
      s.busy = false;
    }, () => { s.busy = false; s.next = this.time + 1; });
  }

  /* Кинетическая скульптура-мобиль: четыре уровня коромысел с дисками */
  sculpture() {
    const W = this.w, h = W.plan.hall, M = this.m;
    const prev = W.target;
    W.target = W.hallGroup;
    const top = new THREE.Group();
    top.position.set(0, h.h, 1.2);
    W.add(top);
    // проволока длиной len вниз от точки (x, y)
    const wire = (len, x = 0, y = 0) => this.piece(new THREE.CylinderGeometry(0.003, 0.003, len, 6), M.wire, x, y - len / 2, 0);
    const disc = (r, mat, x, y) => this.piece(new THREE.CylinderGeometry(r, r, 0.012, 48), mat, x, y, 0, 0, Math.PI / 2);
    // верхняя проволока неподвижна — в общее слияние холла
    this.put(new THREE.CylinderGeometry(0.003, 0.003, 0.9, 6), M.wire, 0, h.h - 0.45, 1.2);
    const levels = [];
    let parent = top, drop = 0.9;
    const spec = [[2.6, 0.42, 0, 0.55], [2.0, 0.33, 1, 0.55], [1.5, 0.26, 2, 0.55], [1.1, 0.2, 4, 0]];
    spec.forEach(([len, r, col, nextDrop], i) => {
      const bar = new THREE.Group();
      bar.position.y = -drop;
      parent.add(bar);
      // коромысло: точка подвеса не в середине — как у настоящего мобиля;
      // на его коротком конце — проволока к следующему уровню (или последний диск)
      const nx = -len * 0.32;
      const rodParts = [this.piece(new THREE.CylinderGeometry(0.004, 0.004, len, 6), M.wire, len * 0.18, 0, 0, 0, 0, Math.PI / 2)];
      if (nextDrop) rodParts.push(wire(nextDrop, nx));
      else rodParts.push(wire(0.3, nx), disc(0.16, M.disc[3], nx, -0.46));
      const rod = this.solid(rodParts);
      rod.castShadow = true;
      bar.add(rod);
      const holder = new THREE.Group();
      holder.position.set(len * 0.68, 0, 0);
      const d = this.solid([wire(0.35), disc(r, M.disc[col], 0, -0.35 - r)]);
      d.castShadow = true;
      holder.add(d);
      bar.add(holder);
      const next = new THREE.Group();
      next.position.set(nx, 0, 0);
      bar.add(next);
      levels.push({ bar, holder, d, w: 0.09 + i * 0.05, a: 0.6 + i * 0.25, ph: i * 1.7, drift: (i % 2 ? -1 : 1) * 0.03 });
      parent = next;
      drop = nextDrop;
    });
    W.target = prev;
    this.mobile = levels;
  }

  /* ---------------- анимация ---------------- */

  reflectMats() {
    const M = this.m;
    return [this.pm, M.glass];
  }

  /* Листья растений шевелятся от вентиляции */
  swayPlants(mat) {
    const u = this.uTime;
    mat.onBeforeCompile = (sh) => {
      sh.uniforms.uTime = u;
      sh.vertexShader = 'uniform float uTime;\n' + sh.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
        float hh = clamp(uv.y, 0.0, 1.0); hh *= hh;
        transformed.x += sin(uTime * 1.3 + position.y * 3.0 + position.x * 5.0) * 0.022 * hh;
        transformed.z += cos(uTime * 1.1 + position.x * 4.0) * 0.016 * hh;`);
    };
    mat.needsUpdate = true;
  }

  /* dt — с; nav — зритель; speed — скорость, м/с; sub — зал зрителя (null — холл) */
  update(dt, nav, speed, sub) {
    this.time += dt;
    const t = this.time;
    this.uTime.value = t;

    // двери: открываются заранее, с запасом на скорость подхода
    for (const d of this.doors) {
      const dist = Math.hypot(nav.x - d.cx, nav.z - d.z);
      const want = dist < 4.2 + Math.min(speed, 30) * 0.9 ? 1 : 0;
      const k = dt / 0.95;
      d.open = want ? Math.min(1, d.open + k) : Math.max(0, d.open - k * 0.8);
      if (want !== d.was && this.onDoor) this.onDoor(want, dist);
      d.was = want;
      this.placeDoor(d);
    }

    // камеры наблюдения: медленный обзор туда-обратно
    for (const c of this.cams) c.head.rotation.y = Math.sin(t * c.speed + c.phase) * 0.7;

    // светодиоды датчиков: короткая вспышка раз в 4 с
    const blink = ((t % 4) < 0.08) ? 1 : 0.05;
    this.glow.value = 6 * blink;

    // мобиль: у каждого уровня свои медленные колебания и дрейф
    if (this.mobile) {
      this.mobile.forEach((l) => {
        l.bar.rotation.y = Math.sin(t * l.w + l.ph) * l.a + t * l.drift;
        l.bar.rotation.z = Math.sin(t * l.w * 1.7 + l.ph) * 0.025;
        l.holder.rotation.y = Math.sin(t * l.w * 0.8 + l.ph * 2) * 1.2;
      });
    }

    // экран: слайд раз в 7 с, плавная смена, лёгкий наезд
    if (this.scr) {
      const s = this.scr, U = s.U;
      U.time.value = t;
      if (t >= s.next) { s.next = t + 7; this.nextSlide(); }
      U.mixv.value = Math.min(1, U.mixv.value + dt / 1.4);
      U.kB.value = 1 + Math.min(1, (t - (s.shownAt || 0)) / 8.4) * 0.05;
      U.kA.value = 1.05;
      U.prog.value = s.shownAt == null ? 0 : Math.min(1, (t - s.shownAt) / 7);
      if (this.screenLight) {
        const p = 0.5 + 0.5 * Math.sin(t * 0.2);
        this.screenLight.color.setRGB(0.9 + 0.1 * p, 0.7 + 0.1 * (1 - p), 0.62 + 0.25 * (1 - p));
      }
    }

    this.roomLights(dt, sub, nav);
  }

  /* Свет по датчику движения. У каждого зала lit: 1 — зритель в нём,
     0.32 — соседний, 0.2 — остальные. Загорание — волной от места входа. */
  roomLights(dt, sub, nav) {
    const P = this.w.plan;
    for (const c of P.corridors) {
      for (const r of c.rooms) {
        if (!r.group) continue;
        if (r.lit == null) { r.lit = 0.2; r.wave = 1; }
        const near = sub && sub.sectionRef === c && Math.abs(sub.idx - r.idx) === 1;
        const hallNear = !sub && r.idx === 0;
        const target = r === sub ? 1 : (near || hallNear ? 0.32 : 0.2);
        if (target === 1 && r.lit < 0.5 && !r.waking) {
          r.waking = true; r.wave = 0; r.entryZ = nav.z;
          if (this.onWake) this.onWake();
        }
        if (target < 1) r.waking = false;
        r.wave = Math.min(1.6, r.wave + dt / 1.6);
        const rate = target > r.lit ? dt / 0.9 : dt / 3.5;
        r.lit += Math.max(-rate, Math.min(rate, target - r.lit));
        const k = 0.12 + 0.88 * r.lit;
        if (r.lightMat) r.lightMat.color.copy(r.lightBase).multiplyScalar(k);
        if (r.lensMat) r.lensMat.color.copy(r.lensBase).multiplyScalar(k);
      }
    }
  }

  /* Сила спота над работой: освещённость её зала и волна от входа */
  spotFactor(it) {
    const c = this.w.plan.corridors[it.room];
    const r = c && c.rooms[it.sub];
    if (!r || r.lit == null) return 1;
    if (!r.waking) return r.lit;
    const d = Math.abs(it.z - (r.entryZ == null ? r.z0 : r.entryZ));
    const wave = Math.max(0, Math.min(1, (r.wave * 22 - d) / 3));
    return Math.max(0.2, r.lit * wave);
  }
}
