/* Какие помещения видны из точки зрения: отсечение по проёмам (portal
   culling).

   Помещения — холл и залы анфилад — соединены проёмами: аркой из холла в
   первый зал раздела и двумя дверями в каждой перегородке. Обход идёт от
   помещения, где стоит зритель: проём проецируется на экран, его рамка
   пересекается с «окном», через которое мы смотрим в текущее помещение
   (для своего помещения окно — весь экран). Пустое пересечение — дальше
   за этим проёмом ничего не видно. Остров посередине зала ничего не
   закрывает — считаем по проёмам в стенах, это консервативно: лишнее
   иногда рисуется, нужное не теряется никогда.

   Проём берём по ближней к зрителю грани стены: у толстой стены видимое
   отверстие — пересечение обеих граней, и ближняя грань на экране его
   заведомо покрывает. Если проём задевает камеру (зритель стоит в
   дверях) или уходит за спину, окно не сужаем. */
import * as THREE from 'three';
import { subRoomAt, aisleX, ARCH_W, ARCH_H, DOOR_W, DOOR_H, WALL_T } from './layout.js';

const MAX_DIST = 125;      // дальше дымка всё равно скрывает
const MAX_DEPTH = 14;
const _v = new THREE.Vector3();
const FULL = [-1, -1, 1, 1];

/* Прямоугольник проёма на экране [x0, y0, x1, y1] в NDC или FULL */
export function project(camera, x0, x1, y0, y1, z) {
  let nx0 = Infinity, ny0 = Infinity, nx1 = -Infinity, ny1 = -Infinity;
  const pts = [[x0, y0], [x1, y0], [x0, y1], [x1, y1]];
  for (const [x, y] of pts) {
    _v.set(x, y, z).applyMatrix4(camera.matrixWorldInverse);
    if (_v.z > -camera.near * 4) return FULL;           // за спиной или вплотную
    _v.applyMatrix4(camera.projectionMatrix);
    nx0 = Math.min(nx0, _v.x); nx1 = Math.max(nx1, _v.x);
    ny0 = Math.min(ny0, _v.y); ny1 = Math.max(ny1, _v.y);
  }
  return [nx0, ny0, nx1, ny1];
}

export function cut(a, b) {
  const r = [Math.max(a[0], b[0]), Math.max(a[1], b[1]), Math.min(a[2], b[2]), Math.min(a[3], b[3])];
  return r[0] < r[2] && r[1] < r[3] ? r : null;
}

/* Проёмы между узлами: список { to, x0, x1, y1, z } */
function links(plan, node) {
  const out = [];
  if (node === 'hall') {
    for (const c of plan.corridors) {
      out.push({ to: c.rooms[0], x0: c.cx - ARCH_W / 2, x1: c.cx + ARCH_W / 2, y1: ARCH_H, z: plan.hall.z0 });
    }
    return out;
  }
  const c = plan.corridors[node.sec];
  const k = node.idx;
  if (k === 0) out.push({ to: 'hall', x0: c.cx - ARCH_W / 2, x1: c.cx + ARCH_W / 2, y1: ARCH_H, z: plan.hall.z0 });
  const doors = (r, to) => [-1, 1].forEach((a) => {
    const x = aisleX(c, a);
    out.push({ to, x0: x - DOOR_W / 2, x1: x + DOOR_W / 2, y1: DOOR_H, z: r.z1 - WALL_T / 2 });
  });
  if (k > 0) doors(c.rooms[k - 1], c.rooms[k - 1]);
  if (k < c.rooms.length - 1) doors(node, c.rooms[k + 1]);
  return out;
}

/* → { hall: bool, rooms: Set(зал), win: Map(зал → окно на экране) }.
   Окно зала — объединение рамок проёмов, через которые его видно: по нему
   отсекаются отдельные работы дальних залов. */
export function computeVisible(plan, camera, x, z) {
  camera.updateMatrixWorld();
  const rooms = new Set();
  const win = new Map();
  let hall = false;
  const start = subRoomAt(plan, x, z) || 'hall';

  const visit = (node, w0, from, depth) => {
    if (node === 'hall') hall = true;
    else {
      rooms.add(node);
      const o = win.get(node);
      win.set(node, o ? [Math.min(o[0], w0[0]), Math.min(o[1], w0[1]), Math.max(o[2], w0[2]), Math.max(o[3], w0[3])] : w0);
    }
    if (depth >= MAX_DEPTH) return;
    for (const l of links(plan, node)) {
      if (l.to === from) continue;
      const zf = l.z + (z > l.z ? 1 : -1) * WALL_T / 2;           // ближняя грань
      if (Math.abs(zf - z) > MAX_DIST) continue;
      const rect = project(camera, l.x0, l.x1, 0, l.y1, zf);
      const w = cut(w0, rect);
      if (w) visit(l.to, w, node, depth + 1);
    }
  };
  visit(start, FULL, null, 0);
  return { hall, rooms, win };
}
