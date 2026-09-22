/* План галереи: холл-развилка и по коридору на каждый раздел.

   Единицы — метры. Камера смотрит вдоль −Z. Холл стоит в начале
   координат, все арки прорезаны в его северной стене (z = hall.z0),
   и коридоры уходят от них на север параллельно друг другу. Так
   помещения стыкуются в общих мировых координатах, и в проёме арки
   виден настоящий зал, а не картинка-заглушка. */

export const EYE = 1.62;           // высота глаз
export const ART_Y = 1.72;         // центр полотен по высоте
export const HALL_D = 16;          // глубина холла
export const HALL_H = 6;         // высота холла
export const COR_W = 7;            // ширина коридора
export const COR_H = 5;            // высота коридора
export const ARCH_W = 3.6;         // проём арки
export const ARCH_H = 3.8;
export const WALL_T = 0.3;         // толщина стены холла
const GAP = 8.4;                   // между осями соседних коридоров
const MARGIN = 0.45;               // ближе к стене камера не подходит

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

export function buildLayout(artists, sections) {
  const n = Math.max(1, sections.length);
  const hallW = Math.max(18, n * GAP + 4);
  const hall = { x0: -hallW / 2, x1: hallW / 2, z0: -HALL_D / 2, z1: HALL_D / 2, h: HALL_H };

  const corridors = sections.map((sec, i) => {
    const cx = (i - (n - 1) / 2) * GAP;
    const zStart = hall.z0;
    let z = zStart - 3.4;              // тамбур за аркой
    const works = [];
    const bays = [];
    sec.list.forEach((gi) => {
      const a = artists[gi];
      const ws = (a && a.works) || [];
      if (!ws.length) return;
      const bayStart = z;
      for (let s = 0; s < Math.ceil(ws.length / 2); s++) {
        const L = ws[2 * s];
        const R = ws[2 * s + 1];
        const sl = paintingSize(L.w, L.h);
        const sr = R ? paintingSize(R.w, R.h) : [0, 0];
        const len = Math.max(sl[0], sr[0]) + 1.5;
        const zc = z - len / 2;
        // левая стена: полотно смотрит на +X, правая — на −X
        works.push({ gi, wi: 2 * s, side: -1, x: cx - COR_W / 2, z: zc, w: sl[0], h: sl[1], work: L });
        if (R) works.push({ gi, wi: 2 * s + 1, side: 1, x: cx + COR_W / 2, z: zc, w: sr[0], h: sr[1], work: R });
        z -= len;
      }
      bays.push({ gi, z0: bayStart, z1: z });
      z -= 1.1;                        // простенок с пилястрой между художниками
    });
    const zEnd = z - 3;
    return { i, title: sec.title, count: sec.list.length, cx, zStart, zEnd, works, bays };
  });

  // Где можно стоять: объединение прямоугольников минус препятствия.
  const walk = [{ x0: hall.x0 + MARGIN, x1: hall.x1 - MARGIN, z0: hall.z0 + MARGIN, z1: hall.z1 - MARGIN, room: -1 }];
  corridors.forEach((c) => {
    walk.push({ x0: c.cx - COR_W / 2 + MARGIN, x1: c.cx + COR_W / 2 - MARGIN, z0: c.zEnd + MARGIN, z1: c.zStart - WALL_T / 2 - MARGIN, room: c.i });
    walk.push({ x0: c.cx - ARCH_W / 2 + 0.3, x1: c.cx + ARCH_W / 2 - 0.3, z0: c.zStart - 1.2, z1: c.zStart + 1.2, room: -2 });
  });

  return { hall, corridors, walk, block: [] };
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

/* −1 — холл, иначе номер коридора */
export function roomAt(plan, x, z) {
  if (z > plan.hall.z0) return -1;
  for (const c of plan.corridors) {
    if (Math.abs(x - c.cx) <= COR_W / 2 + 0.01) return c.i;
  }
  return -1;
}

/* Точка, с которой удобно смотреть на полотно, и направление взгляда */
export function viewSpot(p) {
  const d = Math.min(COR_W - 1, Math.max(1.9, p.h * 1.45 + 0.7, p.w * 0.95 + 0.6));
  return { x: p.x - p.side * d, z: p.z, yaw: p.side < 0 ? Math.PI / 2 : -Math.PI / 2 };
}
