/* Автоэкскурсия «Провести по залу».

   Камера обходит раздел по кольцу — вглубь по левому проходу, обратно по
   правому — и останавливается у каждого художника: сначала у его работ
   на наружной стене, потом разворачивается к острову. Если работ на
   стороне много, остановок несколько, чтобы каждая группа помещалась в
   кадр. Внизу — подпись с именем и кнопки «назад», «дальше», «стоп».
   Любое действие зрителя в сцене (шаг, поворот, щелчок, колесо) экскурсию
   прекращает; пока открыта работа или карточка, экскурсия ждёт. В конце
   раздела — предложение перейти в другой раздел или в холл. */
import { AISLE_W, aisleX } from './layout.js';

const SPAN = 5.5;          // сколько метров стены помещается в одну остановку
const DWELL = 3800;        // стоим у группы работ, мс
const PER_WORK = 900;      // и ещё столько за каждую работу группы

function esc(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* Остановки раздела в порядке обхода */
export function tourStops(c) {
  const stops = [];
  c.bays.forEach((bay, bi) => {
    const dir = bay.aisle < 0 ? -1 : 1;
    const mine = c.works.filter((w) => w.gi === bay.gi && w.aisle === bay.aisle);
    [bay.xWall, bay.xSpine].forEach((xs) => {
      const side = mine.filter((w) => Math.abs(w.x - xs) < 0.01).sort((p, q) => dir * (p.z - q.z));
      let chunk = [];
      const flush = () => {
        if (!chunk.length) return;
        const z0 = Math.min(...chunk.map((w) => w.z - w.w / 2)), z1 = Math.max(...chunk.map((w) => w.z + w.w / 2));
        const it = chunk[0];
        const d = Math.min(AISLE_W - 0.8, Math.max(3.2, (z1 - z0) * 0.75 + 1.4));
        stops.push({
          bay, bi, works: chunk,
          x: it.x - it.side * d, z: (z0 + z1) / 2,
          yaw: it.side < 0 ? Math.PI / 2 : -Math.PI / 2,
        });
        chunk = [];
      };
      side.forEach((w) => {
        const all = chunk.concat([w]);
        const span = Math.max(...all.map((x) => x.z + x.w / 2)) - Math.min(...all.map((x) => x.z - x.w / 2));
        if (chunk.length && span > SPAN) flush();
        chunk.push(w);
      });
      flush();
    });
  });
  return stops;
}

export class Tour {
  constructor(g) {
    this.g = g;
    this.el = g.stage.querySelector('.artg-tour');
    this.running = false;
    this.el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-t]');
      if (!b) return;
      const a = b.getAttribute('data-t');
      if (a === 'next') this.go(this.i + 1);
      else if (a === 'prev') this.go(Math.max(0, this.i - 1));
      else if (a === 'stop') this.stop();
      else if (a === 'hall') { this.stop(); g.goHall(); }
      else if (/^sec/.test(a)) this.start(+a.slice(3), true);
    });
    // кнопки подписи — не «действие в сцене»
    ['pointerdown', 'wheel'].forEach((ev) => this.el.addEventListener(ev, (e) => e.stopPropagation()));
  }

  /* Начать с раздела sec; если зритель уже в нём — с ближайшей остановки */
  start(sec, fromStart) {
    const g = this.g;
    const c = g.plan.corridors[sec];
    if (!c) return;
    this.c = c;
    this.stops = tourStops(c);
    if (!this.stops.length) return;
    let i = 0;
    if (!fromStart && g.room === sec) {
      let best = Infinity;
      this.stops.forEach((s, k) => {
        const d = Math.hypot(s.x - g.nav.x, s.z - g.nav.z);
        if (d < best) { best = d; i = k; }
      });
    }
    this.running = true;
    g.stage.classList.add('is-touring');
    g.focus = null;
    this.go(i);
  }

  go(i) {
    const g = this.g;
    clearTimeout(this.timer);
    if (!this.running) return;
    if (i >= this.stops.length) { this.finish(); return; }
    this.i = i;
    const s = this.stops[i];
    this.caption(s);
    g.travel(s.x, s.z, s.yaw, 0, () => this.dwell(s));
  }

  dwell(s) {
    clearTimeout(this.timer);
    const wait = () => {
      if (!this.running) return;
      if (this.g.modalOpen()) { this.timer = setTimeout(wait, 500); return; }  // зритель смотрит работу
      this.go(this.i + 1);
    };
    this.timer = setTimeout(wait, DWELL + PER_WORK * (s.works.length - 1));
  }

  caption(s) {
    const a = this.g.bridge.artists[s.bay.gi];
    const artistsTotal = this.c.bays.length;
    this.el.innerHTML =
      '<div class="artg-tour__txt"><b>' + esc(a.name) + '</b>' +
        '<span>' + (a.city ? esc(a.city) + ' · ' : '') + 'художник ' + (s.bi + 1) + ' из ' + artistsTotal + '</span></div>' +
      '<div class="artg-tour__btns">' +
        '<button type="button" data-t="prev" aria-label="Предыдущая остановка">‹</button>' +
        '<button type="button" data-t="next" aria-label="Следующая остановка">›</button>' +
        '<button type="button" data-t="stop" class="artg-tour__stop">Стоп</button>' +
      '</div>';
    this.el.hidden = false;
  }

  finish() {
    const g = this.g;
    this.running = false;
    clearTimeout(this.timer);
    g.stage.classList.remove('is-touring');
    const others = g.plan.corridors.filter((c) => c !== this.c);
    this.el.innerHTML =
      '<div class="artg-tour__txt"><b>Раздел «' + esc(this.c.title || 'Экспозиция') + '» пройден</b>' +
        '<span>Спасибо, что прошли его целиком</span></div>' +
      '<div class="artg-tour__btns">' +
        others.map((c) => '<button type="button" data-t="sec' + c.i + '" class="artg-tour__wide">Экскурсия: ' + esc(c.title || '') + '</button>').join('') +
        '<button type="button" data-t="hall" class="artg-tour__wide">В холл</button>' +
        '<button type="button" data-t="stop" aria-label="Закрыть">✕</button>' +
      '</div>';
    this.el.hidden = false;
  }

  /* Прервать: по кнопке или любому действию зрителя в сцене */
  stop() {
    const g = this.g;
    const was = this.running;
    this.running = false;
    clearTimeout(this.timer);
    this.el.hidden = true;
    g.stage.classList.remove('is-touring');
    if (was) g.nav.cancel();
  }
}

export { aisleX };
