/* Сборка помещений: холл, коридоры разделов, полотна, таблички.

   Стиль — светлая современная галерея: белые стены, светло-серый пол из
   микроцемента, тонкие чёрные рамы, световые линии в потолке и трековые
   споты над работами. Никаких карнизов и позолоты; глубину дают мягкие
   тени под работами и светлая дымка, в которой тают дальние стены.
   Каждый зал — своя группа (THREE.Group) и собирается, когда впервые
   нужен: при входе — холл и первые залы разделов, остальные — когда
   попадают в поле зрения или оказываются рядом. Перегородка между залами
   и стена холла с проёмами — отдельные группы: их видно из обоих
   помещений. Видимость групп задаёт visibility.js (отсечение по проёмам).
   Повторяющиеся детали зала (рамы, тени, споты) — InstancedMesh, по
   одному вызову отрисовки на зал; всё неподвижное одного материала
   (стены, пол, потолок, швы, треки, световые линии) при сборке зала
   сливается в один меш, а фактура стен и пола раскладывается по мировым
   координатам — без швов на стыках кусков. */
import * as THREE from 'three';
import { project, cut } from './visibility.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { PBR } from './pbr.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import {
  ART_Y, COR_W, COR_H, ARCH_W, ARCH_H, WALL_T, SPINE_T, SPINE_H, DOOR_W, DOOR_H, aisleX,
} from './layout.js';
import {
  softShadow, aoGradient, plantTexture, textCanvas, wrapText, spaced, canvasTexture, SANS, fitLines,
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

/* Фамилия (первое слово), у галерей — название в кавычках */
function surname(name) {
  const q = String(name).match(/[«"]([^»"]+)[»"]/);
  return (q ? q[1] : String(name).split(/\s+/)[0]).replace(/[,.;:]+$/, '');
}

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

/* Багетный профиль: планка единичной длины вдоль X. Сечение в плоскости
   YZ: Y — от края работы наружу (0 — край полотна), Z — от стены к зрителю.
   Внутренняя ступенька чуть заходит на край холста, внешний край скруглён. */
function mouldingGeometry() {
  const s = new THREE.Shape();
  s.moveTo(-0.004, 0);          // у стены, чуть под краем холста
  s.lineTo(-0.004, 0.056);      // внутренняя ступенька — поверх края работы
  s.lineTo(0.006, 0.056);
  s.lineTo(0.01, 0.05);
  s.lineTo(0.036, 0.05);
  s.quadraticCurveTo(0.045, 0.05, 0.045, 0.041);   // скругление внешнего края
  s.lineTo(0.045, 0);
  s.lineTo(-0.004, 0);
  const g = new THREE.ExtrudeGeometry(s, { depth: 1, bevelEnabled: false, curveSegments: 4 });
  // выдавливание идёт по Z — переводим в X: сечение (x,y) → (y,z)
  g.applyMatrix4(new THREE.Matrix4().set(0, 0, 1, -0.5, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1));
  g.computeVertexNormals();
  return g;
}

/* Цвет картины: доля uNatural — собственный цвет изображения, остальное —
   освещённый. При uInvTM — обратное преобразование к нейтральному
   тон-маппингу (Khronos PBR Neutral): последний проход кадра вернёт цвет
   ровно к исходному. Сначала снимается сжатие светлых, потом — «носок» тёмных. */
const PAINTING_FRAG = `
{
  // освещённость: во сколько раз свет в этой точке ярче «нормального» (uLit.x);
  // цвет всегда из изображения, свет только слегка меняет яркость — в пределах uLit.zw
  vec3 src = diffuseColor.rgb;
  const vec3 LW = vec3( 0.2126, 0.7152, 0.0722 );
  float ratio = dot( gl_FragColor.rgb, LW ) / max( dot( src, LW ), 1e-3 );
  float f = clamp( 1.0 + ( ratio / uLit.x - 1.0 ) * uLit.y, uLit.z, uLit.w );
  gl_FragColor.rgb = mix( src * f, src, uNatural );
}
if ( uInvTM > 0.5 ) {
  vec3 c = max( gl_FragColor.rgb, vec3( 0.0 ) );
  float pk = max( c.r, max( c.g, c.b ) );
  if ( pk > 0.76 ) {
    // не выше 0.955: иначе чисто белое уходило бы в яркость ×12, и свечение
    // (bloom) заливало бы светлые работы белым ореолом
    float np = min( pk, 0.955 );
    float p0 = 0.0576 / ( 1.0 - np ) - 0.24 + 0.76;
    c *= p0 / pk;
  }
  float m = min( c.r, min( c.g, c.b ) );
  float m0 = m < 0.04 ? sqrt( m / 6.25 ) : m + 0.04;
  gl_FragColor.rgb = c + ( m0 - m );
}
`;

/* Запил планок рамы под 45°: концы планки сдвигаются по мере удаления от
   края работы, и в углах планки сходятся по диагонали, как у настоящего
   багета. Длина планки — масштаб по X в матрице экземпляра. */
function mitred(mat) {
  mat.onBeforeCompile = (sh) => {
    sh.vertexShader = sh.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
      #ifdef USE_INSTANCING
        float barLen = length(instanceMatrix[0].xyz);
        transformed.x = sign(position.x) * (0.5 + (position.y - 0.045) / barLen);
      #endif`);
  };
  mat.customProgramCacheKey = () => 'artg-mitre';
  return mat;
}

/* Рамка работы на экране (плоскость вдоль стены, по Z) */
function projectArt(camera, x, it) {
  const a = project(camera, x, x, ART_Y - it.h / 2, ART_Y + it.h / 2, it.z - it.w / 2);
  const b = project(camera, x, x, ART_Y - it.h / 2, ART_Y + it.h / 2, it.z + it.w / 2);
  if (a[0] === -1 && a[2] === 1 || b[0] === -1 && b[2] === 1) return [-1, -1, 1, 1];
  return [Math.min(a[0], b[0]), Math.min(a[1], b[1]), Math.max(a[2], b[2]), Math.max(a[3], b[3])];
}

/* Материал, куски которого при сборке сливаются в один меш */
export function batch(mat, opts) {
  Object.assign(mat.userData, { batch: true }, opts || {});
  return mat;
}

/* Текстурные координаты по мировым: грань получает проекцию по своей
   нормали, плитка tile метров. Соседние куски стены стыкуются без шва. */
function worldUV(g, tile) {
  const pos = g.attributes.position, nor = g.attributes.normal, uv = g.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    const ax = Math.abs(nor.getX(i)), ay = Math.abs(nor.getY(i)), az = Math.abs(nor.getZ(i));
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    if (ax >= ay && ax >= az) uv.setXY(i, z / tile, y / tile);
    else if (ay >= az) uv.setXY(i, x / tile, z / tile);
    else uv.setXY(i, x / tile, y / tile);
  }
}

export class World {
  constructor(renderer, plan, bridge) {
    this.plan = plan;
    this.bridge = bridge;
    this.scene = new THREE.Scene();
    this.aniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    this.paintings = [];
    this.pendingProps = [];     // залы, собранные заранее, но ещё без мебели
    this.pickables = [];
    this.plaques = new Map();         // painting -> mesh
    this.banners = new Map();         // bay -> [mesh, mesh]
    this.bays = [];

    const haze = new THREE.Color(HAZE);
    this.scene.background = haze;
    this.scene.fog = new THREE.Fog(haze, 30, 120);

    // Рассеянный свет помещения: окружение для отражений и подсветки
    // физических материалов (пока — нейтральная «комната»; живое окружение
    // зала подставляется позже) и слабая полусфера — свет от пола и потолка.
    this.pbr = new PBR(renderer, bridge, renderer.capabilities.maxTextureSize < 8192 || /Mobi|Android|iPhone|iPad/.test(navigator.userAgent));
    const pm = new THREE.PMREMGenerator(renderer);
    this.scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environmentIntensity = 0.32;
    pm.dispose();
    this.hemi = new THREE.HemisphereLight(0xfffdf8, 0xc9c6bf, 0.55);
    this.scene.add(this.hemi);
    // «естественный свет»: 0 — картины под спотами, 1 — в цветах исходного
    // изображения, без бликов и пересвета (см. paintingMat)
    this.natural = { value: 0 };
    // на высоком качестве тон-маппинг делает последний проход по всему кадру;
    // картины заранее «разжимаются» обратным преобразованием, чтобы их цвет
    // остался как в изображении (на других уровнях они просто без тон-маппинга)
    this.invTM = { value: 0 };
    // выставочный свет на картине: x — освещённость, принятая за «как в
    // изображении», y — насколько заметен спот, z/w — пределы яркости
    // (замер: спот даёт в 1.3 раза больше света у низа картины, в 1.8 — в
    // центре, в 2.7 — у верха; после калибровки центр как в изображении,
    // верх +12 %, низ −7 %, работы в приглушённых залах — до −15 %)
    this.lit = { value: new THREE.Vector4(1.8, 0.24, 0.85, 1.12) };
    this.camLight = new THREE.PointLight(0xfffaf2, 5, 14, 1.6);
    this.scene.add(this.camLight);

    this.mat = this.makeMaterials();
    this.onPaintings = null;          // сюда менеджер текстур подписывается на новые работы
    this.props = null;                // мебель и оборудование (props.js), подключается до build()
  }

  /* Сборка: холл и первые залы разделов. Отдельно от конструктора — чтобы
     до неё успели подключить мебель (props.js), которой нужен сам мир. */
  build() {
    const plan = this.plan;
    this.hallGroup = this.group();
    this.hallNorth = this.group();    // стена холла с проёмами: видна и из холла, и из первых залов
    this.target = this.hallGroup;
    this.beginBatch();
    this.buildHall();
    this.endBatch();
    this.target = null;
    plan.corridors.forEach((c) => this.prepareSection(c));
    plan.corridors.forEach((c) => this.ensureRoom(c.rooms[0]));
  }

  makeMaterials() {
    const a = this.aniso;
    return {
      // рама: чёрная полуматовая краска по дереву
      frame: mitred(new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.42, metalness: 0 })),
      gap: batch(new THREE.MeshBasicMaterial({ color: 0x9a9995 })),
      // откосы проёмов — шлифованный алюминий, отражает зал
      reveal: batch(new THREE.MeshStandardMaterial({ color: 0xd2d4d6, roughness: 0.34, metalness: 1 })),
      // светящиеся поверхности ярче белого: в постобработке они дают свечение
      light: batch(new THREE.MeshBasicMaterial({ color: new THREE.Color(3, 2.9, 2.75), fog: false })),
      lens: new THREE.MeshBasicMaterial({ color: new THREE.Color(9, 8.2, 7.2), fog: false }),
      slot: batch(new THREE.MeshBasicMaterial({ color: 0xd9d8d4 })),
      track: batch(this.pbr.material('metal'), { tile: 0.6 }),
      shadow: batch(new THREE.MeshBasicMaterial({
        alphaMap: softShadow(), color: 0x000000, transparent: true, opacity: 0.2, depthWrite: false,
      })),
      // мягкая тень у стыков: чёрный с прозрачностью по градиенту
      ao: batch(new THREE.MeshBasicMaterial({
        color: 0x000000, alphaMap: aoGradient(), transparent: true, opacity: 0.2,
        depthWrite: false, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -2,
      })),
      pot: batch(new THREE.MeshStandardMaterial({ color: 0xd8d6d1, roughness: 0.85 })),
      soil: batch(new THREE.MeshLambertMaterial({ color: 0x3b3129 })),
      white: batch(new THREE.MeshStandardMaterial({ color: 0xf6f5f2, roughness: 0.55, metalness: 0 })),
      oak: batch(this.pbr.material('oak'), { tile: 1.2 }),
      grey: batch(new THREE.MeshStandardMaterial({ color: 0xb5b4b0, roughness: 0.3, metalness: 0 })),
    };
  }

  /* Общие материалы стен, потолка и пола: фактура по мировым координатам */
  get wall() {
    return this._wall || (this._wall = batch(this.pbr.material('wall', { normalScale: new THREE.Vector2(0.6, 0.6) }), { tile: 3, blocker: true }));
  }
  get ceil() {
    // потолок снизу освещён слабее всего — чуть подсвечиваем его сами
    return this._ceil || (this._ceil = batch(this.pbr.material('ceiling', { emissive: 0xffffff, emissiveIntensity: 0.1 }), { tile: 3 }));
  }
  get floorMat() {
    // полированный микроцемент: мягкое зеркало, рельеф слабый — иначе вдали искрит
    return this._floor || (this._floor = batch(this.pbr.material('floor', { envMapIntensity: 1.0, roughness: 0.62, normalScale: new THREE.Vector2(0.35, 0.35) }), { tile: 4, floor: true }));
  }

  wallMat() { return this.wall; }
  ceilMat() { return this.ceil; }

  box(w, h, d, mat, x, y, z) {
    if (this.batch && mat.userData.batch) {
      const g = new THREE.BoxGeometry(w, h, d);
      g.translate(x, y, z);
      this.push(mat, g);
      return null;
    }
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    this.add(m);
    return m;
  }

  plane(w, h, mat, x, y, z, ry = 0, rx = 0) {
    if (this.batch && mat.userData.batch) {
      const g = new THREE.PlaneGeometry(w, h);
      g.applyMatrix4(_m.makeRotationFromEuler(_e.set(rx, ry, 0, 'YXZ')));
      g.translate(x, y, z);
      this.push(mat, g);
      return null;
    }
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    m.position.set(x, y, z);
    m.rotation.set(rx, ry, 0, 'YXZ');
    this.add(m);
    return m;
  }

  cyl(rt, rb, h, seg, mat, x, y, z) {
    const g = new THREE.CylinderGeometry(rt, rb, h, seg);
    g.translate(x, y, z);
    if (this.batch && mat.userData.batch) { this.push(mat, g); return null; }
    const m = new THREE.Mesh(g, mat);
    this.add(m);
    return m;
  }

  /* Произвольная геометрия (уже в мировых координатах) в текущую группу:
     при сборке зала неподвижное сливается по материалу */
  geoMesh(g, mat) {
    if (this.batch && mat.userData.batch) { this.push(mat, g); return null; }
    const m = new THREE.Mesh(g, mat);
    this.add(m);
    return m;
  }

  /* Всё строится в текущую группу (зал, перегородку, холл) */
  add(obj) { (this.target || this.scene).add(obj); }

  group() {
    const g = new THREE.Group();
    this.scene.add(g);
    return g;
  }

  /* Стена, сквозь которую нельзя «нажать» картину за ней */
  blocker(m) { if (m) { m.userData.blocker = true; this.pickables.push(m); } return m; }

  /* ---------- слияние неподвижной геометрии ---------- */

  beginBatch() { this.batch = new Map(); }

  push(mat, g) {
    if (mat.userData.tile) worldUV(g, mat.userData.tile);
    if (!this.batch.has(mat)) this.batch.set(mat, []);
    this.batch.get(mat).push(g);
  }

  endBatch() {
    const b = this.batch;
    this.batch = null;
    if (!b) return;
    for (const [mat, list] of b) {
      // экструзия и вращение дают геометрию без индекса — тогда все без индекса
      if (list.some((x) => !x.index)) list.forEach((x, i) => { if (x.index) { list[i] = x.toNonIndexed(); x.dispose(); } });
      const g = mergeGeometries(list, false);
      list.forEach((x) => x.dispose());
      if (!g) continue;
      const m = new THREE.Mesh(g, mat);
      this.add(m);
      // тени спотов ложатся на стены, остров, пол и потолок
      if (mat === this._wall || mat === this._floor || mat === this._ceil) m.receiveShadow = true;
      if (mat === this._wall) m.castShadow = true;
      if (mat.userData.blocker) this.blocker(m);
      if (mat.userData.floor) { m.userData.floor = true; this.pickables.push(m); }
    }
  }

  /* Сменить группу посреди сборки: накопленное уходит в прежнюю */
  setTarget(g) {
    const was = !!this.batch;
    if (was) this.endBatch();
    this.target = g;
    if (was) this.beginBatch();
  }

  /* Пол — микроцемент со слабым бликом от света у зрителя */
  floor(x0, x1, z0, z1) {
    return this.plane(x1 - x0, z1 - z0, this.floorMat, (x0 + x1) / 2, 0, (z0 + z1) / 2, 0, -Math.PI / 2);
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

    // световые панели заподлицо с потолком; два ряда — настоящие площадные
    // источники: мягкий свет без резких теней, как от светового короба
    RectAreaLightUniformsLib.init();
    for (let ix = -1; ix <= 1; ix++) {
      for (let iz = -1; iz <= 1; iz += 2) {
        this.plane(W / 4.2, 1.1, M.light, ix * W / 3.3, H - 0.01, iz * D / 4.5, 0, Math.PI / 2);
      }
    }
    [-1, 1].forEach((iz) => {
      const ra = new THREE.RectAreaLight(0xfff6ea, 3.2, W * 0.85, 1.4);
      ra.position.set(0, H - 0.02, iz * D / 4.5);
      ra.lookAt(0, 0, iz * D / 4.5);
      this.add(ra);
    });
    // световая щель по периметру потолка
    this.plane(W - 1, 0.08, M.light, 0, H - 0.01, hall.z1 - 0.5, 0, Math.PI / 2);
    this.plane(0.08, D - 1, M.light, hall.x0 + 0.5, H - 0.01, 0, 0, Math.PI / 2);
    this.plane(0.08, D - 1, M.light, hall.x1 - 0.5, H - 0.01, 0, 0, Math.PI / 2);

    // стены: южная (за спиной на входе), западная, восточная
    this.box(W + WALL_T * 2, H, WALL_T, this.wallMat(W, H), 0, H / 2, hall.z1 + WALL_T / 2);
    this.box(WALL_T, H, D, this.wallMat(D, H), hall.x0 - WALL_T / 2, H / 2, 0);
    this.box(WALL_T, H, D, this.wallMat(D, H), hall.x1 + WALL_T / 2, H / 2, 0);

    // северная стена с проёмами в залы
    this.setTarget(this.hallNorth);
    const zN = hall.z0;
    const cuts = corridors.map((c) => [c.cx - ARCH_W / 2, c.cx + ARCH_W / 2]);
    let x = hall.x0 - WALL_T;
    cuts.concat([[hall.x1 + WALL_T, hall.x1 + WALL_T]]).forEach(([a, b]) => {
      if (a - x > 0.01) this.blocker(this.box(a - x, H, WALL_T, this.wallMat(a - x, H), (x + a) / 2, H / 2, zN));
      if (b > a) this.box(b - a, H - ARCH_H, WALL_T, this.wallMat(b - a, H - ARCH_H), (a + b) / 2, ARCH_H + (H - ARCH_H) / 2, zN);
      x = b;
    });

    // мягкие тени у стыков холла; у северной стены — между проёмами
    this.aoWallX(hall.x0, hall.z1, hall.z0, 1, H);
    this.aoWallX(hall.x1, hall.z1, hall.z0, -1, H);
    this.aoWallZ(hall.z1, hall.x0, hall.x1, -1, H);
    let ax = hall.x0;
    corridors.map((c) => [c.cx - ARCH_W / 2, c.cx + ARCH_W / 2]).concat([[hall.x1, hall.x1]]).forEach(([a, b]) => {
      if (a > ax) this.aoWallZ(hall.z0 + WALL_T / 2, ax, a, 1, H);
      ax = b;
    });

    // кадки с растениями по углам у северной стены
    const plant = new THREE.MeshLambertMaterial({ map: plantTexture(), alphaTest: 0.5, side: THREE.DoubleSide });
    [[hall.x0 + 1.3, hall.z0 + 1.3], [hall.x1 - 1.3, hall.z0 + 1.3]].forEach(([px, pz]) => {
      this.cyl(0.36, 0.3, 0.72, 28, M.pot, px, 0.36, pz);
      this.cyl(0.33, 0.33, 0.02, 28, M.soil, px, 0.7, pz);
      this.plane(1.3, 1.3, M.shadow, px, 0.004, pz, 0, -Math.PI / 2);                 // тень под кадкой
      for (let k = 0; k < 3; k++) {
        const m = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 2.55), plant);
        m.position.set(px, 0.7 + 1.25, pz);
        m.rotation.y = k * Math.PI / 3;
        this.add(m);
      }
      this.plan.block.push({ x0: px - 0.8, x1: px + 0.8, z0: pz - 0.8, z1: pz + 0.8 });
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
    this.setTarget(this.hallGroup);

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
      const prev = this.target;
      this.target = this.hallGroup;                 // картинка пришла позже — кладём в холл
      this.plane(h * ar, h, mat, hall.x0 + 0.005, 3.2, -2.4, Math.PI / 2);
      this.target = prev;
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
    this.plantMat = plant;
    if (this.props) this.props.hall();
  }

  /* ---------------- анфилада раздела ---------------- */

  /* Подготовка без геометрии: подписи залов (нужны плану и спискам),
     связи работ и «пролётов» с разделом */
  prepareSection(c) {
    c.parts = [];
    c.rooms.forEach((r) => {
      const names = r.bays.map((b) => surname(this.bridge.artists[b.gi].name));
      r.label = names.length > 1 ? names[0] + ' — ' + names[names.length - 1] : (names[0] || '');
      r.sectionRef = c;
      r.group = null;
    });
    c.works.forEach((it) => { it.room = c.i; it.level = 0; });
    c.bays.forEach((b) => { b.room = c; this.bays.push(b); });
  }

  /* Собрать зал, если он ещё не собран. Возвращает true, если собрали сейчас */
  ensureRoom(r, withProps = true) {
    if (r.group) {
      if (withProps && r.propsPending) this.roomProps(r);
      return false;
    }
    const c = r.sectionRef;
    const prev = this.target;
    r.group = this.group();
    this.target = r.group;
    this.beginBatch();
    this.buildRoom(c, r, r.idx);
    this.endBatch();
    this.target = prev;
    if (r.idx > 0) this.ensurePart(c, r.idx - 1);
    if (r.idx < c.rooms.length - 1) this.ensurePart(c, r.idx);
    // мебель — отдельным шагом (следующим кадром): это больше половины
    // времени сборки зала; зал, который уже виден, собирается целиком
    r.propsPending = true;
    if (withProps) this.roomProps(r); else this.pendingProps.push(r);
    return true;
  }

  /* Мебель и мелочи зала, отложенные при заблаговременной сборке.
     all = false — один шаг (за кадр); куски копятся в своём буфере слияния
     зала и сливаются в конце, поэтому вызовов отрисовки не больше, чем
     при сборке сразу. */
  roomProps(r, all = true) {
    if (!r || !r.propsPending) return false;
    if (!this.props) { r.propsPending = false; return false; }
    if (!r.propSteps) { r.propSteps = this.props.roomSteps(r.sectionRef, r); r.propBatch = new Map(); }
    const prevT = this.target, prevB = this.batch;
    this.target = r.group;
    this.batch = r.propBatch;
    do r.propSteps.shift()(); while (all && r.propSteps.length);
    if (!r.propSteps.length) {
      this.endBatch();
      r.propsPending = false;
      r.propSteps = r.propBatch = null;
      const i = this.pendingProps.indexOf(r);
      if (i >= 0) this.pendingProps.splice(i, 1);
    }
    this.batch = prevB;
    this.target = prevT;
    return true;
  }

  /* Зал: свой отрезок пола, потолка и наружных стен, остров, треки,
     номер на торцах острова, рамы, тени, споты и сами полотна */
  buildRoom(c, r, ri) {
    const M = this.mat;
    const H = COR_H;
    const last = ri === c.rooms.length - 1;
    const xl = c.cx - COR_W / 2, xr = c.cx + COR_W / 2;
    const z0 = r.z0, z1 = last ? r.z1 : r.z1 - WALL_T;   // вместе с полосой под перегородкой
    const L = z0 - z1, zMid = (z0 + z1) / 2;
    // свой материал световых линий и линз у каждого зала: свет по датчику движения
    r.lightMat = M.light.clone();
    r.lensMat = M.lens.clone();
    r.lightBase = M.light.color.clone();
    r.lensBase = M.lens.color.clone();

    this.floor(xl, xr, z1, z0);
    this.plane(COR_W, L, this.ceilMat(COR_W, L), c.cx, H, zMid, 0, Math.PI / 2);
    this.blocker(this.plane(L, H, this.wallMat(L, H), xl, H / 2, zMid, Math.PI / 2));
    this.blocker(this.plane(L, H, this.wallMat(L, H), xr, H / 2, zMid, -Math.PI / 2));

    // теневой шов у пола и световые линии вдоль наружных стен
    [[xl, 1], [xr, -1]].forEach(([x, s]) => {
      this.aoWallX(x, z0, z1, s, H);
      this.box(0.01, 0.035, L, M.gap, x + s * 0.004, 0.0175, zMid);
      this.plane(0.12, L, M.slot, x + s * 0.55, H - 0.005, zMid, 0, Math.PI / 2);
      this.plane(0.06, L, r.lightMat, x + s * 0.55, H - 0.008, zMid, 0, Math.PI / 2);
    });

    if (ri === 0) {                                  // стена холла со стороны зала, кроме проёма
      this.aoWallZ(r.z0, xl, c.cx - ARCH_W / 2, -1, H);
      this.aoWallZ(r.z0, c.cx + ARCH_W / 2, xr, -1, H);
    }
    if (last) {
      this.aoWallZ(c.zEnd, xl, xr, 1, H);
      // торцевая стена последнего зала — выход обратно по правому проходу
      this.blocker(this.plane(COR_W, H, this.wallMat(COR_W, H), c.cx, H / 2, c.zEnd, 0));
      const endCv = textCanvas(1024, 420, (g, w) => {
        g.textAlign = 'center';
        g.fillStyle = MUTED;
        const f = fitLines(g, 'Последний зал раздела «' + (c.title || 'Экспозиция') + '»', w - 60, { size: 44, min: 30, maxLines: 1 });
        g.fillText(f.lines[0], w / 2, 120);
        g.font = '400 44px ' + SANS;
        g.fillText('Обратно к холлу — по правой стороне', w / 2, 190);
        g.fillStyle = ACCENT;
        g.font = '500 60px ' + SANS;
        g.fillText('Сразу в холл  →', w / 2, 320);
        g.fillRect(w / 2 - 230, 345, 460, 4);
      });
      this.sign(endCv, 3.4, 1.39, c.cx, 2.1, c.zEnd + 0.01, 0, { type: 'hall' });
    }

    // остров: белая стена не до потолка, с теневым швом у пола
    const len = r.spine0 - r.spine1;
    const zs = (r.spine0 + r.spine1) / 2;
    this.blocker(this.box(SPINE_T, SPINE_H, len, this.wallMat(len, SPINE_H), c.cx, SPINE_H / 2, zs));
    // тень у подножия острова — с обеих сторон и у торцов
    [-1, 1].forEach((s) => {
      const x = c.cx + s * SPINE_T / 2;
      this.ao([x + s * 0.003, 0.003, r.spine0], [x + s * 0.003, 0.003, r.spine1], [s * 0.5, 0, 0]);
      this.ao([x + s * 0.003, 0, r.spine0], [x + s * 0.003, 0, r.spine1], [0, 0.35, 0]);
    });
    this.ao([c.cx - SPINE_T / 2, 0.003, r.spine0 + 0.003], [c.cx + SPINE_T / 2, 0.003, r.spine0 + 0.003], [0, 0, 0.45]);
    this.ao([c.cx - SPINE_T / 2, 0.003, r.spine1 - 0.003], [c.cx + SPINE_T / 2, 0.003, r.spine1 - 0.003], [0, 0, -0.45]);
    this.box(SPINE_T + 0.02, 0.035, len - 0.02, M.gap, c.cx, 0.0175, zs);

    // треки: над наружными стенами и над обеими сторонами острова
    const rl = r.z0 - r.z1 - 0.6;
    const zr = (r.z0 + r.z1) / 2;
    [xl + TRACK, c.cx - SPINE_T / 2 - TRACK, c.cx + SPINE_T / 2 + TRACK, xr - TRACK].forEach((x) => {
      this.box(0.035, 0.035, rl, M.track, x, H - 0.02, zr);
    });

    // номер зала на торцах острова — виден из проёмов
    const tag = textCanvas(512, 512, (g, w) => {
      g.fillStyle = INK; g.textAlign = 'center';
      g.font = '200 220px ' + SANS;
      g.fillText(String(ri + 1), w / 2, 250);
      g.fillStyle = MUTED;
      g.font = '400 40px ' + SANS;
      spaced(g, 'ЗАЛ', w / 2, 330, 14);
    });
    this.sign(tag, 0.3, 0.3, c.cx, 2.2, r.spine0 + 0.004, 0);
    this.sign(tag, 0.3, 0.3, c.cx, 2.2, r.spine1 - 0.004, Math.PI);

    const ws = r.works;
    const face = (it) => (it.side < 0 ? Math.PI / 2 : -Math.PI / 2);
    if (ws.length) {
      // тонкая чёрная рама и мягкая тень под работой
      this.add(instanced(this.geo('plane'), M.shadow, ws, (it, p, e, s) => {
        p.set(it.x - it.side * 0.003, ART_Y - 0.07, it.z); e.set(0, face(it), 0); s.set(it.w * 1.12 + 0.35, it.h * 1.12 + 0.4, 1);
      }));
      // багет: четыре планки из профиля с внутренней ступенькой; планка
      // растягивается только по длине — профиль не искажается
      const bars = [];
      ws.forEach((it) => {
        const fw = 0.045;
        bars.push([it, 0, it.h / 2, it.w + fw * 2, 0], [it, 0, -it.h / 2, it.w + fw * 2, Math.PI],
          [it, -it.w / 2, 0, it.h + fw * 2, Math.PI / 2], [it, it.w / 2, 0, it.h + fw * 2, -Math.PI / 2]);
      });
      const frames = new THREE.InstancedMesh(this.geo('moulding'), M.frame, bars.length);
      const mw = new THREE.Matrix4(), ml = new THREE.Matrix4(), q = new THREE.Quaternion();
      bars.forEach(([it, lx, ly, len, rz], i) => {
        // рама на стене: поворот к залу, сдвиг к центру работы
        q.setFromEuler(_e.set(0, face(it), 0));
        mw.compose(_p.set(it.x, ART_Y, it.z), q, _s.set(1, 1, 1));
        ml.compose(_p.set(lx, ly, 0), q.setFromEuler(_e.set(0, 0, rz)), _s.set(len, 1, 1));
        frames.setMatrixAt(i, mw.multiply(ml));
      });
      frames.instanceMatrix.needsUpdate = true;
      frames.computeBoundingSphere();
      frames.castShadow = true;                     // тень рамы на стене от спота
      this.add(frames);
      // споты: корпус на треке, наклонён к работе
      const spotAt = (it, p, e, s) => {
        p.set(it.x - it.side * TRACK, H - 0.15, it.z);
        e.set(0, 0, it.side * 0.62);
        s.set(1, 1, 1);
      };
      const bodies = instanced(this.geo('spot'), M.track, ws, spotAt);
      bodies.castShadow = true;
      this.add(bodies);
      // линза на торце корпуса — светится
      this.add(instanced(this.geo('lens'), r.lensMat, ws, spotAt));
    }

    // сами полотна
    ws.forEach((it) => {
      // холст: переплетение нитей и неровный лак — видно вблизи и в бликах
      const cn = this.pbr.tex('canvas', 'normal').clone();
      const co = this.pbr.tex('canvas', 'orm').clone();
      cn.repeat.set(it.w / 0.3, it.h / 0.3);
      co.repeat.copy(cn.repeat);
      const mat = this.paintingMat(new THREE.MeshStandardMaterial({
        color: PLACEHOLDER, roughness: 1, metalness: 0, normalMap: cn, normalScale: new THREE.Vector2(0.45, 0.45),
        roughnessMap: co, aoMap: co, aoMapIntensity: 0.6, envMapIntensity: 0.6,
      }));
      const m = this.plane(it.w, it.h, mat, it.x - it.side * 0.046, ART_Y, it.z, face(it));
      m.userData.art = it;
      it.mesh = m;
      it.group = r.group;
      this.paintings.push(it);
      this.pickables.push(m);
    });
    if (this.onPaintings && ws.length) this.onPaintings(ws);
  }

  /* Материал картины: при «естественном свете» цвет берётся прямо из
     изображения — без света, бликов и тон-маппинга, как в оригинале */
  paintingMat(mat) {
    const u = this.natural, inv = this.invTM, lit = this.lit;
    mat.onBeforeCompile = (sh) => {
      sh.uniforms.uNatural = u;
      sh.uniforms.uInvTM = inv;
      sh.uniforms.uLit = lit;
      sh.fragmentShader = 'uniform float uNatural;\nuniform float uInvTM;\nuniform vec4 uLit;\n' + sh.fragmentShader.replace('#include <opaque_fragment>',
        '#include <opaque_fragment>\n' + PAINTING_FRAG);
    };
    mat.customProgramCacheKey = () => 'artg-painting';
    mat.toneMapped = false;
    return mat;
  }

  /* Общая геометрия для InstancedMesh всех залов */
  geo(kind) {
    this.geos = this.geos || {
      plane: new THREE.PlaneGeometry(1, 1),
      box: new THREE.BoxGeometry(1, 1, 1),
      spot: new THREE.CylinderGeometry(0.045, 0.055, 0.2, 16),
      moulding: mouldingGeometry(),
      // диск линзы на нижнем торце корпуса (корпус — вдоль Y, длина 0.2)
      lens: new THREE.CircleGeometry(0.042, 16).rotateX(Math.PI / 2).translate(0, -0.101, 0),
    };
    return this.geos[kind];
  }

  /* Перегородка k — между залами k и k+1: два проёма по осям проходов,
     «ЗАЛ n+1» и фамилии над средним простенком, с той стороны — «ЗАЛ n» */
  ensurePart(c, k) {
    if (c.parts[k]) return;
    const M = this.mat;
    const H = COR_H;
    const r = c.rooms[k], next = c.rooms[k + 1];
    const prev = this.target;
    const g = this.target = this.group();
    c.parts[k] = g;
    this.beginBatch();

    const xl = c.cx - COR_W / 2, xr = c.cx + COR_W / 2;
    const zw = r.z1 - WALL_T / 2;
    const xa = aisleX(c, -1), xb = aisleX(c, 1);
    const segs = [[xl, xa - DOOR_W / 2], [xa + DOOR_W / 2, xb - DOOR_W / 2], [xb + DOOR_W / 2, xr]];
    segs.forEach(([a, b]) => this.blocker(this.box(b - a, H, WALL_T, this.wallMat(b - a, H), (a + b) / 2, H / 2, zw)));
    [xa, xb].forEach((x) => {
      this.box(DOOR_W, H - DOOR_H, WALL_T, this.wallMat(DOOR_W, H - DOOR_H), x, DOOR_H + (H - DOOR_H) / 2, zw);
      this.box(0.02, DOOR_H, WALL_T, M.reveal, x - DOOR_W / 2 + 0.01, DOOR_H / 2, zw);
      this.box(0.02, DOOR_H, WALL_T, M.reveal, x + DOOR_W / 2 - 0.01, DOOR_H / 2, zw);
      this.box(DOOR_W, 0.02, WALL_T, M.reveal, x, DOOR_H - 0.01, zw);
    });
    this.box(COR_W, 0.035, 0.01, M.gap, c.cx, 0.0175, zw + WALL_T / 2 + 0.004);
    this.box(COR_W, 0.035, 0.01, M.gap, c.cx, 0.0175, zw - WALL_T / 2 - 0.004);
    // тени по обе стороны перегородки — по кускам стены между проёмами
    segs.forEach(([a, b]) => {
      this.aoWallZ(zw + WALL_T / 2, a, b, 1, H);
      this.aoWallZ(zw - WALL_T / 2, a, b, -1, H);
    });

    const plate = (num, sub, arrow) => textCanvas(1024, 300, (g2, w) => {
      g2.fillStyle = INK; g2.textAlign = 'center';
      g2.font = '300 88px ' + SANS;
      spaced(g2, 'ЗАЛ ' + num, w / 2, 120, 16);
      g2.fillStyle = MUTED;
      const f = fitLines(g2, sub, w - 60, { size: 38, min: 26, maxLines: 2 });
      f.lines.forEach((l, i) => g2.fillText(l, w / 2, (f.lines.length > 1 ? 180 : 200) + i * f.size * 1.15));
      if (arrow) { g2.font = '400 40px ' + SANS; g2.fillText(arrow, w / 2, 268); }
    });
    const mw = (xb - DOOR_W / 2) - (xa + DOOR_W / 2) - 0.6;
    this.sign(plate(k + 2, next.label, '↑'), mw, mw * 300 / 1024, c.cx, 3.05, zw + WALL_T / 2 + 0.005, 0);
    this.sign(plate(k + 1, r.label, '↑'), mw, mw * 300 / 1024, c.cx, 3.05, zw - WALL_T / 2 - 0.005, Math.PI);
    this.endBatch();
    this.target = prev;
  }

  /* Материалы, которые отражают окружение зала (зонд отражений) */
  reflectMats() {
    const M = this.mat;
    return [this.floorMat, M.frame, M.track, M.white, M.grey, M.pot, M.reveal];
  }

  /* Коробка помещения и точка съёмки зонда: у зала — перед островом */
  probeSpot(r) {
    const P = this.plan;
    if (!r) {
      const h = P.hall;
      return { key: 'hall', min: new THREE.Vector3(h.x0, 0, h.z0), max: new THREE.Vector3(h.x1, h.h, h.z1), pos: new THREE.Vector3(0, 1.7, 0) };
    }
    const c = r.sectionRef;
    return {
      key: c.i + '.' + r.idx, room: r,
      min: new THREE.Vector3(c.cx - COR_W / 2, 0, r.z1),
      max: new THREE.Vector3(c.cx + COR_W / 2, COR_H, r.z0),
      pos: new THREE.Vector3(c.cx, 1.7, (r.z0 + r.spine0) / 2),
    };
  }

  /* Мягкие тени у стыков — на обоих уровнях: на HD их дополняет GTAO,
     поэтому полосы бледнее, чтобы не удваивать */
  setDetail(level) {
    this.mat.ao.visible = true;
    this.mat.shadow.visible = true;
    this.mat.ao.opacity = level === 'hd' ? 0.08 : 0.2;
  }

  /* Полоса мягкой тени: p0–p1 — линия стыка, off — куда тень спадает.
     Строится прямо в буфер слияния, отдельных объектов не создаёт. */
  ao(p0, p1, off) {
    if (!this.batch) return;
    const g = new THREE.BufferGeometry();
    const P = [p0, p1, [p1[0] + off[0], p1[1] + off[1], p1[2] + off[2]], [p0[0] + off[0], p0[1] + off[1], p0[2] + off[2]]];
    g.setAttribute('position', new THREE.Float32BufferAttribute([].concat(...P), 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute([0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0], 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute([0, 1, 1, 1, 1, 0, 0, 0], 2));
    g.setIndex([0, 1, 2, 0, 2, 3]);
    this.push(this.mat.ao, g);
  }

  /* Тени вдоль стены: у пола (на полу и на стене) и под потолком.
     Стена — отрезок x = x, z от za до zb, s — в какую сторону от неё зал */
  aoWallX(x, za, zb, s, H) {
    const e = 0.003;
    this.ao([x + s * e, e, za], [x + s * e, e, zb], [s * 0.55, 0, 0]);          // пол у стены
    this.ao([x + s * e, 0, za], [x + s * e, 0, zb], [0, 0.4, 0]);               // низ стены
    this.ao([x + s * e, H, za], [x + s * e, H, zb], [0, -0.7, 0]);              // верх стены
    this.ao([x + s * e, H - e, za], [x + s * e, H - e, zb], [s * 0.6, 0, 0]);   // потолок у стены
  }

  aoWallZ(z, xa, xb, s, H) {
    const e = 0.003;
    this.ao([xa, e, z + s * e], [xb, e, z + s * e], [0, 0, s * 0.55]);
    this.ao([xa, 0, z + s * e], [xb, 0, z + s * e], [0, 0.4, 0]);
    this.ao([xa, H, z + s * e], [xb, H, z + s * e], [0, -0.7, 0]);
    this.ao([xa, H - e, z + s * e], [xb, H - e, z + s * e], [0, 0, s * 0.6]);
  }

  /* Видимость: холл и множество залов → группы. Перегородку видно, если
     виден хоть один из залов по её сторонам; стену холла — если виден
     холл или первый зал любого раздела. */
  setVisible(hall, rooms, win, camera) {
    this.hallGroup.visible = hall;
    let north = hall;
    for (const c of this.plan.corridors) {
      for (const r of c.rooms) {
        const on = rooms.has(r);
        if (on) this.ensureRoom(r);
        if (r.group) r.group.visible = on;
        if (on) {
          // работы дальнего зала — только те, что попадают в его проём
          const w = win && win.get(r);
          const full = !w || (w[0] <= -1 && w[1] <= -1 && w[2] >= 1 && w[3] >= 1);
          for (const it of r.works) {
            if (!it.mesh) continue;
            let v = !(it.dist > 125);
            if (v && !full) {
              const x = it.x - it.side * 0.05;
              v = !!cut(w, projectArt(camera, x, it));
            }
            it.mesh.visible = v;
          }
        }
        if (on && r.idx === 0) north = true;
      }
      c.parts.forEach((g, k) => { if (g) g.visible = rooms.has(c.rooms[k]) || rooms.has(c.rooms[k + 1]); });
    }
    this.hallNorth.visible = north;
  }

  /* ---------------- ленивые таблички ---------------- */

  plaque(it) {
    const a = this.bridge.artists[it.gi];
    const cv = textCanvas(512, 256, (g, w, h) => {
      g.fillStyle = '#ffffff'; g.fillRect(0, 0, w, h);
      // имя и название целиком: общий масштаб уменьшается, пока оба не
      // поместятся над ссылкой «О художнике →»
      const title = it.work.title ? it.work.title : 'Без названия';
      let nm, tt;
      for (let k = 1; k >= 0.62; k -= 0.04) {
        nm = fitLines(g, a.name, w - 48, { size: Math.round(32 * k), min: Math.round(32 * k), weight: 600, maxLines: 3 });
        tt = fitLines(g, title, w - 48, { size: Math.round(29 * k), min: Math.round(29 * k), maxLines: 4 });
        if (!nm.cut && !tt.cut && nm.lines.length * nm.size * 1.18 + 10 + tt.lines.length * tt.size * 1.18 <= h - 70) break;
      }
      g.fillStyle = INK;
      g.font = '600 ' + nm.size + 'px ' + SANS;
      let y = 22 + nm.size;
      nm.lines.forEach((l) => { g.fillText(l, 24, y); y += nm.size * 1.18; });
      g.font = '400 ' + tt.size + 'px ' + SANS;
      g.fillStyle = '#55554f';
      y += 10 - nm.size * 0.18;
      const room = Math.max(1, Math.floor((h - 58 - y + tt.size) / (tt.size * 1.18)));
      const tl = tt.lines.length > room ? fitLines(g, title, w - 48, { size: tt.size, min: tt.size, maxLines: room }).lines : tt.lines;
      g.font = '400 ' + tt.size + 'px ' + SANS;
      tl.forEach((l) => { g.fillText(l, 24, y); y += tt.size * 1.18; });
      // ссылка — кнопкой: видно, что табличку можно нажать
      g.font = '600 22px ' + SANS;
      const lw = g.measureText('О художнике →').width + 30;
      g.fillStyle = ACCENT;
      g.beginPath();
      if (g.roundRect) g.roundRect(20, h - 54, lw, 38, 19); else g.rect(20, h - 54, lw, 38);
      g.fill();
      g.fillStyle = '#ffffff';
      g.fillText('О художнике →', 35, h - 28);
    });
    const mat = new THREE.MeshLambertMaterial({ map: canvasTexture(cv, this.aniso) });
    const face = it.side < 0 ? Math.PI / 2 : -Math.PI / 2;
    // этикетка справа от работы, по музейной привычке, на уровне руки
    const along = it.side < 0 ? -1 : 1;             // «вправо» для смотрящего на стену
    const prev = this.target;
    this.target = it.group;
    const m = this.plane(0.38, 0.19, mat, it.x - it.side * 0.006, 1.3, it.z + along * (it.w / 2 + 0.38), face);
    this.target = prev;
    m.userData.plaque = it;
    this.pickables.push(m);
    return m;
  }

  banner(b) {
    const a = this.bridge.artists[b.gi];
    const len = Math.min(4.4, Math.max(1.8, b.z0 - b.z1 - 0.6));
    // имя целиком: сначала уменьшаем кегль, потом переносим на вторую строку
    const CH = 240;
    const cv = textCanvas(1024, CH, (g, w) => {
      g.fillStyle = INK; g.textAlign = 'center';
      let f = fitLines(g, a.name, w - 40, { size: 62, min: 46, weight: 300, maxLines: 1 });
      if (f.cut) f = fitLines(g, a.name, w - 40, { size: 50, min: 34, weight: 300, maxLines: 2 });
      const lh = f.size * 1.12;
      const top = f.lines.length > 1 ? 50 : 76;
      f.lines.forEach((l, i) => g.fillText(l, w / 2, top + i * lh));
      // город и ссылка на карточку: имя на стене можно нажать
      const y2 = top + (f.lines.length - 1) * lh + 52;
      g.font = '400 28px ' + SANS; g.fillStyle = MUTED;
      const city = a.city ? a.city.toUpperCase() : '';
      const link = 'О ХУДОЖНИКЕ →';
      g.textAlign = 'center';
      const cw = city ? g.measureText(city).width + city.length * 6 : 0;
      g.font = '600 28px ' + SANS;
      const lw2 = g.measureText(link).width + link.length * 4;
      const gap = city ? 44 : 0;
      let x = (w - cw - gap - lw2) / 2;
      if (city) { g.font = '400 28px ' + SANS; g.fillStyle = MUTED; spaced(g, city, x + cw / 2, y2, 6); x += cw + gap; }
      g.font = '600 28px ' + SANS; g.fillStyle = ACCENT;
      spaced(g, link, x + lw2 / 2, y2, 4);
    });
    const tex = canvasTexture(cv, this.aniso);
    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, toneMapped: false });
    const zc = (b.z0 + b.z1) / 2;
    const h = len * CH / 1024;
    // над работами художника — и на наружной стене, и на острове напротив
    const ai = b.aisle;
    const prev = this.target;
    this.target = b.room.rooms[b.sub].group;
    const out = [
      this.plane(len, h, mat, b.xWall - ai * 0.006, 3.35, zc, ai < 0 ? Math.PI / 2 : -Math.PI / 2),
      this.plane(len * 0.8, h * 0.8, mat, b.xSpine + ai * 0.006, 3.3, zc, ai < 0 ? -Math.PI / 2 : Math.PI / 2),
    ];
    this.target = prev;
    out.forEach((m) => { m.userData.banner = b; this.pickables.push(m); });
    return out;
  }

  removeMesh(m) {
    if (m.parent) m.parent.remove(m);
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
      const pl = this.plaques.get(it);
      if (!pl && d < PLAQUE_NEAR) this.plaques.set(it, this.plaque(it));
      else if (pl && d > PLAQUE_FAR) { this.removeMesh(pl); this.plaques.delete(it); }
    }
    for (const b of this.bays) {
      if (!b.room.rooms[b.sub].group) continue;       // зал ещё не собран
      const d = Math.abs((b.z0 + b.z1) / 2 - cz) + Math.abs(b.xWall - cx) * 0.5;
      const bn = this.banners.get(b);
      if (!bn && d < BANNER_NEAR) this.banners.set(b, this.banner(b));
      else if (bn && d > BANNER_FAR) {
        bn[0].material.map.dispose();
        bn.forEach((m) => {
          if (m.parent) m.parent.remove(m);
          const i = this.pickables.indexOf(m);
          if (i >= 0) this.pickables.splice(i, 1);
          m.geometry.dispose();
        });
        bn[0].material.dispose();
        this.banners.delete(b);
      }
    }
  }
}
