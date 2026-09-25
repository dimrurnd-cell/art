/* Куратор в холле: вырезанное фото в полный рост (166 см) у входа в первый
   раздел, между проёмом и экраном. Фигура всегда повёрнута к зрителю, над
   головой — облачко «Могу ли я Вам чем-то помочь?» (элемент страницы, его
   ставит index.js по экранным координатам головы). Нажатие на фигуру или
   облачко открывает окно вопросов — его рисует catalog.js (bridge.curator),
   одно на 3D-галерею и простой зал.

   Потом фото можно заменить видео (ожидание и речь) — меняется только
   текстура. */
import * as THREE from 'three';
import { ARCH_W } from './layout.js';

const H = 1.66;              // рост, м
const AR = 513 / 1200;       // пропорции curator/figure.webp

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
    world.pickables.push(this.mesh);
    P.block.push({ x0: x - 0.5, x1: x + 0.5, z0: z - 0.45, z1: z + 0.45 });
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
