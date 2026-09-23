/* Живой свет: настоящие споты над работами рядом со зрителем.

   Спотов в сцене всегда одно и то же число (16 на компьютере, 6 на
   телефоне): если бы оно менялось, каждый раз пересобирались бы шейдеры
   всех материалов. Раз в несколько кадров споты раздаются ближайшим
   видимым работам (впереди — охотнее, чем за спиной); освободившийся спот
   сначала плавно гаснет и только потом переезжает к новой работе, новый —
   плавно разгорается. У ближайших четырёх на компьютере — мягкие тени:
   рама отбрасывает тень на стену, как от настоящего светильника. */
import * as THREE from 'three';
import { ART_Y, COR_H } from './layout.js';

const TRACK = 1.55;
const REACH = 24;             // дальше спот не нужен — работа мелкая и в дымке
const FADE = 3.5;             // скорость разгорания/затухания, 1/с

export class Spots {
  constructor(scene, small) {
    this.n = small ? 6 : 16;
    this.shadowN = small ? 0 : 4;
    this.shadows = !small;
    this.power = 95;          // сила света, кандел
    this.pool = [];
    for (let i = 0; i < this.n; i++) {
      // тёплый белый, как у музейных светодиодов 3000–3500 K
      const l = new THREE.SpotLight(0xfff0dc, 0, 9, 0.34, 0.85, 2);
      l.target = new THREE.Object3D();
      if (i < this.shadowN) {
        l.castShadow = true;
        l.shadow.mapSize.set(1024, 1024);
        l.shadow.bias = -0.0006;
        l.shadow.normalBias = 0.02;
        l.shadow.radius = 4;
        l.shadow.camera.near = 0.4;
        l.shadow.camera.far = 8;
      }
      scene.add(l, l.target);
      this.pool.push({ l, it: null, cur: 0, next: null });
    }
    this.tmp = new THREE.Vector3();
    this.factor = null;
  }

  setShadows(on) {
    this.shadows = on;
    this.pool.forEach((s, i) => { s.l.castShadow = on && i < this.shadowN; });
  }

  place(s, it) {
    s.it = it;
    s.l.position.set(it.x - it.side * TRACK, COR_H - 0.3, it.z);
    // целимся чуть ниже центра: верх картины не пересвечен, пятно уходит на стену под ней
    s.l.target.position.set(it.x - it.side * 0.05, ART_Y - it.h * 0.18, it.z);
    s.l.target.updateMatrixWorld();
  }

  /* Раздать споты: paintings — собранные работы, cam — камера */
  assign(paintings, cam) {
    const dir = cam.getWorldDirection(this.tmp);
    const cand = [];
    for (const it of paintings) {
      if (!it.mesh || !it.mesh.visible || (it.group && !it.group.visible) || !(it.dist < REACH)) continue;
      const dx = it.x - cam.position.x, dz = it.z - cam.position.z;
      const facing = (dx * dir.x + dz * dir.z) / (Math.hypot(dx, dz) || 1);
      cand.push({ it, score: it.dist - facing * 4 });
    }
    cand.sort((a, b) => a.score - b.score);
    const want = new Set(cand.slice(0, this.n).map((c) => c.it));
    // ближайшим — споты с тенью: они в начале пула
    const busy = new Set(this.pool.filter((s) => s.it && want.has(s.it)).map((s) => s.it));
    const free = this.pool.filter((s) => !s.it || !want.has(s.it));
    const need = [...want].filter((it) => !busy.has(it));
    free.forEach((s, k) => { s.next = need[k] || null; });
    this.pool.forEach((s) => { if (s.it && want.has(s.it)) s.next = undefined; });
  }

  update(dt) {
    const k = Math.min(1, dt * FADE);
    for (const s of this.pool) {
      const leaving = s.next !== undefined && s.next !== s.it;
      const target = leaving || !s.it ? 0 : 1;
      s.cur += (target - s.cur) * k;
      if (leaving && s.cur < 0.02) {
        s.cur = 0;
        if (s.next) this.place(s, s.next); else s.it = null;
        s.next = undefined;
      }
      // спот не прячем (visible = false), а гасим: иначе менялось бы число
      // источников света и пересобирались бы шейдеры всей сцены
      // сила — ещё и по освещённости зала (свет по датчику движения)
      s.l.intensity = s.cur * this.power * (s.it && this.factor ? this.factor(s.it) : 1);
    }
  }
}
