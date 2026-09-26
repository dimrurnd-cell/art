/* Перемещение зрителя: клавиши, колесо, перетаскивание, кнопки шага,
   автоматический подход к точке (к полотну, в арку, в холл).
   Столкновения — по плану из layout.js: камера скользит вдоль стен. */
import { canStand, roomAt, subRoomAt, inGap, aisleX, COR_W } from './layout.js';

const SPEED = 3.3;       // шаг, м/с
const RUN = 2.3;         // во сколько раз быстрее с Shift
const TURN = 1.9;        // поворот стрелками, рад/с
const PITCH_MAX = 0.55;

function angDiff(a, b) {
  let d = (b - a) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return d;
}

export class Nav {
  constructor(plan) {
    this.plan = plan;
    this.x = 0;
    this.z = plan.hall.z1 - 2.2;
    this.yaw = 0;
    this.pitch = -0.02;
    this.keys = {};
    this.hold = 0;            // кнопки шага на экране: +1 / −1
    this.joy = { x: 0, y: 0 }; // джойстик на сенсорном экране, −1…1
    this.wheel = 0;           // накопленный импульс колеса
    this.path = null;         // очередь точек автоматического движения
    this.onArrive = null;
  }

  get room() { return roomAt(this.plan, this.x, this.z); }

  moveTo(x, z) {
    if (canStand(this.plan, x, z)) { this.x = x; this.z = z; return; }
    if (canStand(this.plan, x, this.z)) this.x = x;
    else if (canStand(this.plan, this.x, z)) this.z = z;
  }

  cancel() { this.path = null; this.onArrive = null; }

  /* Маршрут до точки. Между помещениями — через проёмы: из холла в раздел
     по оси проёма, внутри раздела — по оси прохода (там проёмы в
     перегородках), на другую сторону острова — у его торца. */
  goTo(x, z, yaw, pitch, onArrive) {
    const plan = this.plan;
    const pts = [];
    const from = this.room;
    const to = roomAt(plan, x, z);
    const hz = plan.hall.z0;
    let px = this.x, pz = this.z;

    if (from >= 0 && from !== to) {
      // выйти из раздела к проёму в холл
      const c = plan.corridors[from];
      this.aislePath(pts, c, px, pz, c.cx, c.rooms[0].z0 - 1.6);
      pts.push({ x: c.cx, z: c.rooms[0].z0 - 1.6, fast: true });
      pts.push({ x: c.cx, z: hz + 1.6, fast: true });
      px = c.cx; pz = hz + 1.6;
    }
    if (to >= 0 && from !== to) {
      const c = plan.corridors[to];
      pts.push({ x: c.cx, z: hz + 1.6, fast: true });
      pts.push({ x: c.cx, z: hz - 1.8, fast: true });
      px = c.cx; pz = hz - 1.8;
    }
    if (to >= 0) this.aislePath(pts, plan.corridors[to], px, pz, x, z);

    pts.push({ x, z, yaw, pitch: pitch == null ? -0.02 : pitch });
    this.path = this.detour(this.x, this.z, pts);
    this.onArrive = onArrive || null;
  }

  /* Обход мебели: отрезок пути, задевающий препятствие (скамьи, стойка,
     кадки, урны — plan.block), огибает его через угол с запасом 0.5 м.
     По маршруту столкновения не проверяются (он быстрый и плавный), так
     что без обхода камера проезжала сквозь скамью холла. */
  detour(x0, z0, pts) {
    const blocks = this.plan.block;
    const PAD = 0.35;
    const hits = (ax, az, bx, bz) => {
      const n = Math.max(2, Math.ceil(Math.hypot(bx - ax, bz - az) / 0.2));
      for (const b of blocks) {
        for (let i = 1; i < n; i++) {
          const t = i / n, x = ax + (bx - ax) * t, z = az + (bz - az) * t;
          if (x > b.x0 - PAD && x < b.x1 + PAD && z > b.z0 - PAD && z < b.z1 + PAD) return b;
        }
      }
      return null;
    };
    const out = [];
    let ax = x0, az = z0;
    for (const p of pts) {
      for (let guard = 0; guard < 4; guard++) {
        const b = hits(ax, az, p.x, p.z);
        if (!b) break;
        const m = PAD + 0.2;
        const corners = [[b.x0 - m, b.z0 - m], [b.x1 + m, b.z0 - m], [b.x0 - m, b.z1 + m], [b.x1 + m, b.z1 + m]];
        let best = null, bl = Infinity;
        for (const [cx, cz] of corners) {
          if (!canStand(this.plan, cx, cz) || hits(ax, az, cx, cz) === b) continue;
          const l = Math.hypot(cx - ax, cz - az) + Math.hypot(p.x - cx, p.z - cz);
          if (l < bl) { bl = l; best = [cx, cz]; }
        }
        if (!best) break;
        out.push({ x: best[0], z: best[1], fast: p.fast });
        ax = best[0]; az = best[1];
      }
      out.push(p);
      ax = p.x; az = p.z;
    }
    return out;
  }

  /* Точки пути внутри раздела от (px, pz) до (x, z), без самой цели */
  aislePath(pts, c, px, pz, x, z) {
    const plan = this.plan;
    const rp = subRoomAt(plan, px, pz), rt = subRoomAt(plan, x, z);
    const side = (vx) => (vx < c.cx ? -1 : 1);
    const gp = inGap(plan, px, pz), gt = inGap(plan, x, z);
    // рядом и в одном зале, на одной стороне или у торца — напрямую
    if (rp === rt && Math.abs(z - pz) < 5 && (gp || gt || side(px) === side(x))) return;
    const ap = gp ? side(x) : side(px);
    const at = gt ? ap : side(x);
    const xa = aisleX(c, ap), xt = aisleX(c, at);
    pts.push({ x: xa, z: pz, fast: true });
    if (ap !== at) {
      // перейти на другую сторону у торца острова в зале цели
      const zg = Math.abs(rt.spine0 - z) < Math.abs(rt.spine1 - z) ? (rt.spine0 + rt.z0) / 2 : (rt.spine1 + rt.z1) / 2;
      pts.push({ x: xa, z: zg, fast: true });
      pts.push({ x: xt, z: zg, fast: true });
    }
    pts.push({ x: xt, z, fast: true });
  }

  update(dt) {
    const k = this.keys;
    let fwd = 0, side = 0, turn = 0;
    if (k.KeyW || k.ArrowUp) fwd += 1;
    if (k.KeyS || k.ArrowDown) fwd -= 1;
    if (k.KeyA) side -= 1;
    if (k.KeyD) side += 1;
    if (k.ArrowLeft || k.KeyQ) turn += 1;
    if (k.ArrowRight || k.KeyE) turn -= 1;
    fwd += this.hold - this.joy.y;
    side += this.joy.x;
    const run = k.ShiftLeft || k.ShiftRight ? RUN : 1;

    if (fwd || side || turn || Math.abs(this.wheel) > 0.01) this.cancel();

    this.yaw += turn * TURN * dt;

    let vx = 0, vz = 0;
    const s = Math.sin(this.yaw), c = Math.cos(this.yaw);
    const v = (fwd * SPEED * run) + this.wheel;
    vx += -s * v + c * side * SPEED * run;
    vz += -c * v - s * side * SPEED * run;
    this.wheel *= Math.exp(-dt * 5);
    if (Math.abs(this.wheel) < 0.02) this.wheel = 0;

    if (this.path) this.followPath(dt);
    else if (vx || vz) this.moveTo(this.x + vx * dt, this.z + vz * dt);
  }

  followPath(dt) {
    const p = this.path[0];
    const dx = p.x - this.x, dz = p.z - this.z;
    const dist = Math.hypot(dx, dz);
    const last = this.path.length === 1;
    // по дороге смотрим, куда идём; в конце — куда просили
    const heading = dist > 0.3 ? Math.atan2(-dx, -dz) : this.yaw;
    const aimYaw = last && p.yaw != null && dist < 2.5 ? p.yaw : (dist > 0.3 ? heading : this.yaw);
    const ky = 1 - Math.exp(-dt * 5);
    this.yaw += angDiff(this.yaw, aimYaw) * ky;
    if (last && p.pitch != null) this.pitch += (p.pitch - this.pitch) * ky;
    else this.pitch += (-0.02 - this.pitch) * ky;

    // быстрый проход по длинному коридору, плавное торможение у цели
    const vmax = p.fast ? 26 : 16;
    const step = Math.min(dist, Math.max(1.2, Math.min(vmax, dist * 2.6)) * dt);
    if (dist > 1e-4) { this.x += dx / dist * step; this.z += dz / dist * step; }
    const settled = dist < (last ? 0.02 : 0.5) &&
      (!last || p.yaw == null || Math.abs(angDiff(this.yaw, p.yaw)) < 0.01);
    if (settled) {
      this.path.shift();
      if (!this.path.length) {
        this.path = null;
        const cb = this.onArrive;
        this.onArrive = null;
        if (cb) cb();
      }
    }
  }

  look(dx, dy) {
    this.yaw += dx;
    this.pitch = Math.max(-PITCH_MAX, Math.min(PITCH_MAX, this.pitch + dy));
  }

  /* Ближайшая точка, где можно стоять, по пути к нажатой точке пола */
  clampToPlan(x, z) {
    for (let t = 1; t > 0; t -= 0.05) {
      const px = this.x + (x - this.x) * t, pz = this.z + (z - this.z) * t;
      if (canStand(this.plan, px, pz)) return { x: px, z: pz };
    }
    return null;
  }
}

export { COR_W };
