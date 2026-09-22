/* Перемещение зрителя: клавиши, колесо, перетаскивание, кнопки шага,
   автоматический подход к точке (к полотну, в арку, в холл).
   Столкновения — по плану из layout.js: камера скользит вдоль стен. */
import { canStand, roomAt, COR_W } from './layout.js';

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

  /* Маршрут до точки: если она в другом помещении, идём через арки */
  goTo(x, z, yaw, pitch, onArrive) {
    const pts = [];
    const from = this.room;
    const to = roomAt(this.plan, x, z);
    const hz = this.plan.hall.z0;
    if (from !== to) {
      if (from >= 0) {
        const c = this.plan.corridors[from];
        pts.push({ x: c.cx, z: Math.max(this.z, c.zStart - 2.2), fast: true });
        pts.push({ x: c.cx, z: hz + 1.6, fast: true });
      }
      if (to >= 0) {
        const c = this.plan.corridors[to];
        pts.push({ x: c.cx, z: hz + 1.6, fast: true });
        pts.push({ x: c.cx, z: hz - 2.2, fast: true });
      }
    } else if (from >= 0) {
      // в коридоре идём по оси, а не наискосок сквозь зрителей у стен
      const c = this.plan.corridors[from];
      if (Math.abs(z - this.z) > 6) {
        pts.push({ x: c.cx + Math.max(-1, Math.min(1, this.x - c.cx)), z: this.z, fast: true });
        pts.push({ x: c.cx, z: z + Math.sign(this.z - z) * 2.5, fast: true });
      }
    }
    pts.push({ x, z, yaw, pitch: pitch == null ? -0.02 : pitch });
    this.path = pts;
    this.onArrive = onArrive || null;
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
    fwd += this.hold;
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
