/* План галереи: холл-развилка и по анфиладе залов на каждый раздел.

   Единицы — метры. Камера смотрит вдоль −Z. Холл стоит в начале
   координат, все проёмы прорезаны в его северной стене (z = hall.z0),
   и анфилады уходят от них на север параллельно друг другу. Так
   помещения стыкуются в общих мировых координатах, и в проёме виден
   настоящий зал, а не картинка-заглушка.

   Зал анфилады: посередине свободностоящая двусторонняя стена («остров»),
   по обе стороны от неё — проходы. Работы висят на четырёх плоскостях:
   наружных стенах и обеих сторонах острова. Раздел — кольцо: вглубь по
   левому проходу через все залы, обратно к холлу по правому. Так путь
   вдвое короче, чем по одному коридору, и в конце не приходится идти
   назад мимо уже увиденного. У торцов острова проходы соединяются —
   перейти на другую сторону можно в любом зале. Художник никогда не
   разрывается между залами и сторонами.

   (Имя corridors в коде осталось за разделом целиком.) */

export const EYE = 1.62;           // высота глаз
export const ART_Y = 1.72;         // центр полотен по высоте
export const HALL_D = 16;          // глубина холла
export const HALL_H = 6;           // высота холла
export const COR_H = 5;            // высота залов
export const SPINE_T = 0.3;        // толщина острова
export const SPINE_H = 4.0;        // его высота: не до потолка, зал читается целиком
export const AISLE_W = 7.2;        // от стены до острова
export const COR_W = AISLE_W * 2 + SPINE_T;   // ширина зала
export const ARCH_W = 3.6;         // проём из холла
export const ARCH_H = 3.8;
export const DOOR_W = 3.2;         // проёмы между залами — по оси каждого прохода
export const DOOR_H = 3.5;
export const WALL_T = 0.3;         // толщина стен
export const SPINE_GAP = 3.2;      // проход вокруг торца острова
const GAP = COR_W + 1.6;           // между осями соседних разделов
const MARGIN = 0.45;               // ближе к стене камера не подходит
const AISLE_MAX = 22;              // длина экспозиции в проходе, после которой — новый зал
const SLOT_GAP = 1.25;             // простенок между соседними работами
const ARTIST_GAP = 1.1;            // и между художниками

/* Ось прохода: −1 — левый (туда), 1 — правый (обратно) */
export function aisleX(c, a) {
  return c.cx + a * (SPINE_T / 2 + AISLE_W / 2);
}

/* Размер полотна на стене по пропорциям файла. Крупные вещи не должны
   упираться в потолок, а узкие — превращаться в полоску: длинная сторона
   от 1.45 до 2.3 м. */
export function paintingSize(w, h) {
  const a = w && h ? w / h : 1;
  let pw = a >= 1 ? Math.min(2.3, 1.45 * a) : 1.45 * a;
  let ph = pw / a;
  if (ph > 1.55) { ph = 1.55; pw = ph * a; }
  return [pw, ph];
}

function groupsOf(artists, list) {
  const groups = [];
  list.forEach((gi) => {
    const a = artists[gi];
    const ws = (a && a.works) || [];
    if (!ws.length) return;
    const slots = [];
    for (let s = 0; s < Math.ceil(ws.length / 2); s++) {
      const P = ws[2 * s], Q = ws[2 * s + 1];
      const sp = paintingSize(P.w, P.h);
      const sq = Q ? paintingSize(Q.w, Q.h) : [0, 0];
      slots.push({ P, Q, sp, sq, wi: 2 * s, len: Math.max(sp[0], sq[0]) + SLOT_GAP });
    }
    groups.push({ gi, slots, len: slots.reduce((t, x) => t + x.len, 0) });
  });
  return groups;
}

const packLen = (p) => p.reduce((t, g, k) => t + g.len + (k ? ARTIST_GAP : 0), 0);

export function buildLayout(artists, sections) {
  const n = Math.max(1, sections.length);
  const hallW = Math.max(18, n * GAP + 4);
  const hall = { x0: -hallW / 2, x1: hallW / 2, z0: -HALL_D / 2, z1: HALL_D / 2, h: HALL_H };
  const block = [];

  const corridors = sections.map((sec, i) => {
    const cx = (i - (n - 1) / 2) * GAP;
    const c = { i, title: sec.title, count: sec.list.length, cx, zStart: hall.z0 };
    const groups = groupsOf(artists, sec.list);

    // Первая половина художников (по длине) — туда, вторая — обратно.
    const total = groups.reduce((t, g) => t + g.len, 0);
    let acc = 0, cut = groups.length;
    for (let k = 0; k < groups.length; k++) {
      if (acc + groups[k].len / 2 > total / 2) { cut = k; break; }
      acc += groups[k].len;
    }
    if (groups.length > 1) cut = Math.max(1, Math.min(groups.length - 1, cut));
    const there = groups.slice(0, cut), back = groups.slice(cut);

    // «Туда» раскладываем жадно по залам, «обратно» — поровну в те же залы
    const packsA = [];
    let cur = [];
    there.forEach((g) => {
      if (cur.length && packLen(cur.concat([g])) > AISLE_MAX) { packsA.push(cur); cur = []; }
      cur.push(g);
    });
    if (cur.length || !packsA.length) packsA.push(cur);
    const N = packsA.length;
    const packsB = Array.from({ length: N }, () => []);
    const backTotal = back.reduce((t, g) => t + g.len, 0) || 1;
    let r = N - 1, got = 0;
    back.forEach((g, k) => {
      // обратно идём от дальнего зала к ближнему: залу — его доля длины,
      // и в каждом ближнем зале должно остаться кому висеть
      const left = back.length - k;
      if (packsB[r].length && r > 0 && (got + g.len / 2 > backTotal * (N - r) / N || left <= r)) r--;
      packsB[r].push(g);
      got += g.len;
    });

    c.works = []; c.bays = []; c.rooms = [];
    let z = hall.z0 - WALL_T / 2;
    for (let ri = 0; ri < N; ri++) {
      const lenA = packLen(packsA[ri]), lenB = packLen(packsB[ri]);
      const expo = Math.max(lenA, lenB, 6);
      const room = { sec: i, idx: ri, z0: z, bays: [], works: [] };
      room.spine0 = z - SPINE_GAP;                 // торцы острова
      room.spine1 = room.spine0 - expo - 0.8;
      room.z1 = room.spine1 - SPINE_GAP;
      block.push({ x0: cx - SPINE_T / 2 - MARGIN, x1: cx + SPINE_T / 2 + MARGIN, z0: room.spine1 - MARGIN, z1: room.spine0 + MARGIN });

      // проход: a = −1 (левый, идём к −Z), a = 1 (правый, идём к +Z)
      const place = (pack, a, len) => {
        const dir = a < 0 ? -1 : 1;
        let zz = a < 0 ? room.spine0 - 0.4 - (expo - len) / 2 : room.spine1 + 0.4 + (expo - len) / 2;
        const xWall = cx + a * (SPINE_T / 2 + AISLE_W);
        const xSpine = cx + a * SPINE_T / 2;
        pack.forEach((g, k) => {
          if (k) zz += dir * ARTIST_GAP;
          const bay = { gi: g.gi, aisle: a, sub: ri, xWall, xSpine, from: zz };
          g.slots.forEach((sl) => {
            const zc = zz + dir * sl.len / 2;
            // side: −1 — полотно смотрит на +X, 1 — на −X
            const onWall = { gi: g.gi, wi: sl.wi, x: xWall, side: a < 0 ? -1 : 1, z: zc, w: sl.sp[0], h: sl.sp[1], work: sl.P, sub: ri, aisle: a };
            c.works.push(onWall); room.works.push(onWall);
            if (sl.Q) {
              const onSpine = { gi: g.gi, wi: sl.wi + 1, x: xSpine, side: a < 0 ? 1 : -1, z: zc, w: sl.sq[0], h: sl.sq[1], work: sl.Q, sub: ri, aisle: a };
              c.works.push(onSpine); room.works.push(onSpine);
            }
            zz += dir * sl.len;
          });
          bay.z0 = Math.max(bay.from, zz);
          bay.z1 = Math.min(bay.from, zz);
          c.bays.push(bay); room.bays.push(bay);
        });
      };
      place(packsA[ri], -1, lenA);
      place(packsB[ri], 1, lenB);
      c.rooms.push(room);
      z = room.z1 - WALL_T;                        // следующая перегородка
    }
    c.zEnd = c.rooms[N - 1].z1;
    // порядок обхода: туда по левому проходу, обратно по правому
    c.bays.sort((p, q) => (p.aisle - q.aisle) || (p.aisle < 0 ? q.z0 - p.z0 : p.z0 - q.z0));
    return c;
  });

  // Где можно стоять: объединение прямоугольников минус препятствия.
  const walk = [{ x0: hall.x0 + MARGIN, x1: hall.x1 - MARGIN, z0: hall.z0 + MARGIN, z1: hall.z1 - MARGIN }];
  corridors.forEach((c) => {
    walk.push({ x0: c.cx - ARCH_W / 2 + 0.3, x1: c.cx + ARCH_W / 2 - 0.3, z0: c.zStart - 1.2, z1: c.zStart + 1.2 });
    c.rooms.forEach((rm, ri) => {
      walk.push({ x0: c.cx - COR_W / 2 + MARGIN, x1: c.cx + COR_W / 2 - MARGIN, z0: rm.z1 + MARGIN, z1: rm.z0 - MARGIN });
      if (ri < c.rooms.length - 1) {
        [-1, 1].forEach((a) => {
          const x = aisleX(c, a);
          walk.push({ x0: x - DOOR_W / 2 + 0.3, x1: x + DOOR_W / 2 - 0.3, z0: rm.z1 - WALL_T - 1.2, z1: rm.z1 + 1.2 });
        });
      }
    });
  });

  return { hall, corridors, walk, block };
}

/* Проверки положения по плану */
export function canStand(plan, x, z) {
  let ok = false;
  for (const r of plan.walk) {
    if (x >= r.x0 && x <= r.x1 && z >= r.z0 && z <= r.z1) { ok = true; break; }
  }
  if (!ok) return false;
  for (const b of plan.block) {
    if (x >= b.x0 && x <= b.x1 && z >= b.z0 && z <= b.z1) return false;
  }
  return true;
}

/* −1 — холл, иначе номер раздела */
export function roomAt(plan, x, z) {
  if (z > plan.hall.z0) return -1;
  for (const c of plan.corridors) {
    if (Math.abs(x - c.cx) <= COR_W / 2 + 0.01) return c.i;
  }
  return -1;
}

/* Зал анфилады, в котором точка, или null (холл) */
export function subRoomAt(plan, x, z) {
  const sec = roomAt(plan, x, z);
  if (sec < 0) return null;
  const rooms = plan.corridors[sec].rooms;
  for (const r of rooms) if (z <= r.z0 + 0.01 && z >= r.z1 - WALL_T) return r;
  return rooms[rooms.length - 1];
}

/* Точка у торца острова (там проходы соединены) или в холле */
export function inGap(plan, x, z) {
  const r = subRoomAt(plan, x, z);
  return !r || z > r.spine0 - 0.2 || z < r.spine1 + 0.2;
}

/* Точка, с которой удобно смотреть на полотно, и направление взгляда */
export function viewSpot(p) {
  const d = Math.min(AISLE_W - 1.2, Math.max(1.9, p.h * 1.45 + 0.7, p.w * 0.95 + 0.6));
  return { x: p.x - p.side * d, z: p.z, yaw: p.side < 0 ? Math.PI / 2 : -Math.PI / 2 };
}
