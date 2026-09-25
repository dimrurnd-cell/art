/* Куратор в холле: вырезанное фото в полный рост (166 см) у входа в первый
   раздел, между проёмом и экраном. Фигура всегда повёрнута к зрителю, над
   головой — облачко «Могу ли я Вам чем-то помочь?» (элемент страницы, его
   ставит index.js по экранным координатам головы). Нажатие на фигуру или
   облачко открывает окно вопросов — его рисует catalog.js (bridge.curator),
   одно на 3D-галерею и простой зал.

   Движение — ролик curator/idle.mp4 или .webm (Wan 2.2 по фото, фон убран, цикл
   замкнут; собирает tools/curator-anim.py): в каждом кадре сверху цвет,
   снизу прозрачность серым — так прозрачное видео играет везде, включая
   iPhone, а в видеопамяти один кадр. Низ кадра — пол, стоящая фигура —
   ANIM_FIG высоты кадра. Пока ролик не пошёл (или посетитель просит
   меньше движения) — неподвижное фото. */
import * as THREE from 'three';
import { ARCH_W } from './layout.js';

const H = 1.66;              // рост, м
const AR = 513 / 1200;       // пропорции curator/figure.webp
const ANIM_FIG = 0.9;        // доля высоты кадра ролика, которую занимает стоящая фигура

/* Кадр ролика: цвет — верхняя половина, прозрачность — нижняя (серым).
   Цвет видео three.js переводит из sRGB сам (DECODE_VIDEO_TEXTURE),
   прозрачность берём до перевода — как записана. */
function stackedAlpha(mat) {
  mat.onBeforeCompile = (sh) => {
    sh.fragmentShader = sh.fragmentShader.replace('#include <map_fragment>', `#ifdef USE_MAP
      vec4 sampledDiffuseColor = texture2D( map, vec2( vMapUv.x, 0.5 + vMapUv.y * 0.5 ) );
      float matte = texture2D( map, vec2( vMapUv.x, vMapUv.y * 0.5 ) ).g;
      #ifdef DECODE_VIDEO_TEXTURE
        sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
      #endif
      sampledDiffuseColor.a = matte;
      diffuseColor *= sampledDiffuseColor;
    #endif`);
  };
  mat.customProgramCacheKey = () => 'curator-stacked-alpha';
  return mat;
}

function shadowTexture() {
  const c = document.createElement('canvas');
  c.width = 128; c.height = 64;
  const g = c.getContext('2d');
  const gr = g.createRadialGradient(64, 32, 2, 64, 32, 62);
  gr.addColorStop(0, 'rgba(30,24,16,0.42)');
  gr.addColorStop(0.55, 'rgba(30,24,16,0.16)');
  gr.addColorStop(1, 'rgba(30,24,16,0)');
  g.fillStyle = gr;
  g.fillRect(0, 0, 128, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export class Curator {
  constructor(world, bridge) {
    const P = world.plan, h = P.hall, c = P.corridors[0];
    const x = c ? c.cx + ARCH_W / 2 + 2.2 : 0;
    const z = h.z0 + 1.4;
    this.pos = new THREE.Vector3(x, 0, z);
    this.v = new THREE.Vector3();
    this.ready = false;

    // текстура есть сразу (пустая до загрузки): вариант шейдера с картой
    // собирается при прогреве, а не когда придёт картинка
    const tex = new THREE.TextureLoader().setCrossOrigin('anonymous').load(bridge.url('curator/figure.webp'), (t) => {
      this.ready = true;
      this.mask = this.alphaMask(t.image);
    });
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = world.aniso;

    const geo = new THREE.PlaneGeometry(H * AR, H).translate(0, H / 2, 0);
    this.mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
      map: tex, transparent: true, alphaTest: 0.08, toneMapped: false,
    }));
    this.mesh.position.copy(this.pos);
    this.mesh.userData.curator = true;
    this.mesh.userData.noAO = true;           // плоскость в проходе нормалей GTAO дала бы тёмный прямоугольник
    const sh = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.55).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({
      map: shadowTexture(), transparent: true, depthWrite: false, toneMapped: false,
      polygonOffset: true, polygonOffsetFactor: -2,
    }));
    sh.position.set(x, 0.006, z + 0.04);
    sh.userData.noAO = true;
    world.hallGroup.add(this.mesh, sh);
    this.makeVideo(world, bridge);
    world.pickables.push(this.mesh);
    P.block.push({ x0: x - 0.5, x1: x + 0.5, z0: z - 0.45, z1: z + 0.45 });
  }

  /* Ролик движения. Меш создан сразу (скрытым): прогрев шейдеров
     собирает и его вариант, ролик потом только подменяет фото. */
  makeVideo(world, bridge) {
    const still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (still || !bridge.url) return;
    const v = document.createElement('video');
    v.crossOrigin = 'anonymous';
    v.muted = true;
    v.defaultMuted = true;
    v.loop = true;
    v.playsInline = true;
    v.setAttribute('playsinline', '');
    v.setAttribute('muted', '');
    v.preload = 'auto';
    const tex = new THREE.VideoTexture(v);
    tex.colorSpace = THREE.SRGBColorSpace;
    const mat = stackedAlpha(new THREE.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: 0.08, toneMapped: false }));
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(H * AR / ANIM_FIG, H / ANIM_FIG).translate(0, H / ANIM_FIG / 2, 0), mat);
    mesh.position.copy(this.pos);
    mesh.visible = false;
    mesh.userData.noAO = true;
    world.hallGroup.add(mesh);
    this.video = { v, mesh, tex, ok: false, broken: false, pending: false, blocked: false };
    // ширина — по пропорциям самого ролика (кадр — две половины друг над другом)
    v.addEventListener('loadedmetadata', () => {
      const ar = v.videoWidth / (v.videoHeight / 2);
      if (!ar) return;
      const hh = H / ANIM_FIG;
      mesh.geometry.dispose();
      mesh.geometry = new THREE.PlaneGeometry(hh * ar, hh).translate(0, hh / 2, 0);
    });
    v.addEventListener('playing', () => { this.video.ok = true; });
    v.addEventListener('error', () => { this.video.broken = true; });
    // H.264 — Chrome, Safari, iPhone; где его нет (свободные сборки Chromium) — VP9
    const h264 = v.canPlayType('video/mp4; codecs="avc1.640028"');
    v.src = bridge.url(h264 ? 'curator/idle.mp4' : 'curator/idle.webm');
  }

  /* Играть, только пока фигура может быть в кадре: зритель в холле, не
     дальше 30 м, вкладка видна. Браузер не дал запустить сам
     (энергосбережение на iPhone) — пробуем снова после касания сцены
     (unblock), а пока стоит фото. */
  play(on) {
    const V = this.video;
    if (!V || V.broken) return;
    if (on && V.v.paused && !V.pending && !V.blocked) {
      V.pending = true;
      const p = V.v.play();
      const done = () => { V.pending = false; };
      if (p && p.then) p.then(done, () => { done(); V.blocked = true; });
      else done();
    } else if (!on && !V.v.paused) {
      V.v.pause();
    }
    // ролик пошёл — фото не рисуем, но оставляем для щелчков: по его маске
    // определяется попадание в силуэт
    const show = !!(on && V.ok && !V.v.paused && V.v.readyState >= 2);
    V.mesh.visible = show;
    this.mesh.material.visible = !show;
  }

  unblock() {
    if (this.video) this.video.blocked = false;
  }

  dispose() {
    const V = this.video;
    if (!V) return;
    V.v.pause();
    V.v.removeAttribute('src');
    V.v.load();
    V.tex.dispose();
  }

  /* Грубая маска прозрачности: щелчок мимо силуэта (в пустой угол
     картинки) — это щелчок по полу или стене за ней */
  alphaMask(img) {
    try {
      const w = 24, h = 56;
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      const g = c.getContext('2d');
      g.drawImage(img, 0, 0, w, h);
      const d = g.getImageData(0, 0, w, h).data;
      const m = new Uint8Array(w * h);
      for (let i = 0; i < m.length; i++) m[i] = d[i * 4 + 3];
      return { w, h, m };
    } catch (e) { return null; }
  }

  /* Попадание по силуэту (uv точки на плоскости) */
  hit(uv) {
    const k = this.mask;
    if (!k || !uv) return true;
    const x = Math.min(k.w - 1, Math.max(0, Math.floor(uv.x * k.w)));
    const y = Math.min(k.h - 1, Math.max(0, Math.floor((1 - uv.y) * k.h)));
    // соседние клетки тоже: палец толще пикселя
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const xx = x + dx, yy = y + dy;
        if (xx >= 0 && yy >= 0 && xx < k.w && yy < k.h && k.m[yy * k.w + xx] > 60) return true;
      }
    }
    return false;
  }

  /* Лицом к зрителю: поворот только вокруг вертикали */
  face(cam) {
    this.mesh.rotation.y = Math.atan2(cam.position.x - this.pos.x, cam.position.z - this.pos.z);
    if (this.video) this.video.mesh.rotation.y = this.mesh.rotation.y;
  }

  /* Где на экране макушка: { x, y, d } в пикселях сцены или null */
  head(cam, w, h) {
    const v = this.v.set(this.pos.x, H + 0.08, this.pos.z);
    const d = Math.hypot(cam.position.x - this.pos.x, cam.position.z - this.pos.z);
    v.project(cam);
    if (v.z > 1 || v.z < -1) return null;
    return { x: (v.x + 1) / 2 * w, y: (1 - v.y) / 2 * h, d };
  }
}
