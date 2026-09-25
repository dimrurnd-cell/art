/* Звук зала — весь синтезируется в браузере (Web Audio), файлов нет.

   Фон — тихий «воздух» помещения: бурый шум через фильтр низких частот,
   как далёкая вентиляция и гул большого пространства. Шаги — по пройденному
   пути (шаг ~0.72 м), а не по времени: стоишь — тишина, идёшь быстрее —
   чаще. Шаг — еле слышный мягкий шорох мягкой подошвы (приглушённый шум)
   и едва заметный низкий толчок, без стука каблука; у каждого шага своя
   громкость и высота. Эхо — свёртка с
   синтезированным откликом помещения: в высоком холле длиннее (2.8 с),
   в зале короче (1.5 с), при переходе одно плавно сменяет другое.

   Браузеры разрешают звук только после действия зрителя, поэтому звук
   включается кнопкой; выбор запоминается. */

const KEY = 'artg-sound';
const STRIDE = 0.72;

function impulse(ctx, seconds, decay) {
  const n = Math.round(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(2, n, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < n; i++) {
      const t = i / n;
      // ранние отражения гуще, хвост экспоненциально гаснет
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, decay) * (i < 400 ? i / 400 : 1);
    }
  }
  return buf;
}

function noise(ctx, seconds, brown) {
  const n = Math.round(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(1, n, ctx.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < n; i++) {
    const w = Math.random() * 2 - 1;
    if (brown) { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; } else d[i] = w;
  }
  return buf;
}

export class Sound {
  constructor() {
    let saved = '';
    try { saved = localStorage.getItem(KEY) || ''; } catch (e) { /* приватный режим */ }
    this.want = saved === 'on';
    this.on = false;
    this.ctx = null;
    this.dist = 0;
    this.big = true;
  }

  build() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    // iPhone: при беззвучном режиме (переключатель сбоку) Safari глушит звук
    // страниц; «воспроизведение», как у плеера, переключатель не глушит
    // (Safari 17+; зритель сам включил звук кнопкой)
    try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) { /* нет — не страшно */ }
    const ctx = this.ctx = new AC();
    this.master = ctx.createGain();
    this.master.gain.value = 0;
    this.master.connect(ctx.destination);

    // эхо: два отклика — холл и зал, между ними плавный переход
    this.revHall = ctx.createConvolver(); this.revHall.buffer = impulse(ctx, 2.8, 3.2);
    this.revRoom = ctx.createConvolver(); this.revRoom.buffer = impulse(ctx, 1.5, 4.0);
    this.wetHall = ctx.createGain(); this.wetRoom = ctx.createGain();
    this.revHall.connect(this.wetHall).connect(this.master);
    this.revRoom.connect(this.wetRoom).connect(this.master);
    this.send = ctx.createGain(); this.send.gain.value = 0.55;
    this.send.connect(this.revHall); this.send.connect(this.revRoom);
    this.setRoom(true, true);

    // фон помещения
    const bed = ctx.createBufferSource();
    bed.buffer = noise(ctx, 6, true);
    bed.loop = true;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 280;
    const bedGain = ctx.createGain(); bedGain.gain.value = 0.05;
    bed.connect(lp).connect(bedGain);
    bedGain.connect(this.master);
    bedGain.connect(this.send);
    bed.start();

    this.white = noise(ctx, 0.3, false);
    return true;
  }

  /* Кнопка «звук» — это и есть жест, после которого браузер разрешает звук */
  toggle() {
    this.want = !this.on;
    try { localStorage.setItem(KEY, this.want ? 'on' : 'off'); } catch (e) { /* приватный режим */ }
    this.set(this.want);
    return this.on;
  }

  set(on) {
    if (on && !this.ctx && !this.build()) return;
    if (!this.ctx) return;
    if (on && this.ctx.state === 'suspended') this.ctx.resume();
    this.on = on;
    const t = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(t);
    this.master.gain.setTargetAtTime(on ? 1 : 0, t, 0.25);
  }

  /* Большое помещение (холл) или зал: эхо плавно перетекает */
  setRoom(big, now) {
    if (!this.ctx || (big === this.big && !now)) return;
    this.big = big;
    const t = this.ctx.currentTime;
    this.wetHall.gain.setTargetAtTime(big ? 0.9 : 0, t, now ? 0.01 : 0.6);
    this.wetRoom.gain.setTargetAtTime(big ? 0 : 0.75, t, now ? 0.01 : 0.6);
  }

  step(speed) {
    const ctx = this.ctx, t = ctx.currentTime;
    const loud = (0.7 + Math.random() * 0.3) * Math.min(1, 0.6 + speed * 0.08);
    // мягкий шорох подошвы: приглушённый шум, плавное нарастание и затухание
    const src = ctx.createBufferSource();
    src.buffer = this.white;
    src.playbackRate.value = 0.7 + Math.random() * 0.2;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 500 + Math.random() * 150; lp.Q.value = 0.5;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.022 * loud, t + 0.025);
    g.gain.exponentialRampToValueAtTime(0.0005, t + 0.16);
    src.connect(lp).connect(g);
    g.connect(this.master);
    src.start(t); src.stop(t + 0.2);
    // едва заметный низкий толчок
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(70 + Math.random() * 10, t);
    o.frequency.exponentialRampToValueAtTime(48, t + 0.1);
    const og = ctx.createGain();
    og.gain.setValueAtTime(0, t);
    og.gain.linearRampToValueAtTime(0.018 * loud, t + 0.02);
    og.gain.exponentialRampToValueAtTime(0.0005, t + 0.14);
    o.connect(og); og.connect(this.master);
    o.start(t); o.stop(t + 0.16);
  }

  /* Привод раздвижной двери: мягкий нарастающий шорох и щелчок в конце */
  door(open, dist) {
    if (!this.on || !this.ctx || dist > 9) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const vol = Math.max(0.15, 1 - dist / 9);
    const src = ctx.createBufferSource();
    src.buffer = this.white;
    src.loop = true;
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.setValueAtTime(open ? 500 : 700, t);
    bp.frequency.linearRampToValueAtTime(open ? 900 : 400, t + 0.9); bp.Q.value = 1.6;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.05 * vol, t + 0.15);
    g.gain.linearRampToValueAtTime(0.035 * vol, t + 0.75);
    g.gain.linearRampToValueAtTime(0, t + 0.95);
    src.connect(bp).connect(g);
    g.connect(this.master); g.connect(this.send);
    src.start(t); src.stop(t + 1);
  }

  /* Свет по датчику: тихий щелчок реле и короткий гул разгорания */
  lightsOn() {
    if (!this.on || !this.ctx) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = 'triangle';
    o.frequency.value = 100;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.012, t + 0.05);
    g.gain.exponentialRampToValueAtTime(0.0005, t + 1.2);
    o.connect(g); g.connect(this.master);
    o.start(t); o.stop(t + 1.25);
    const src = ctx.createBufferSource();
    src.buffer = this.white;
    const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 3000;
    const cg = ctx.createGain();
    cg.gain.setValueAtTime(0.06, t); cg.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
    src.connect(hp).connect(cg); cg.connect(this.master); cg.connect(this.send);
    src.start(t); src.stop(t + 0.05);
  }

  /* moved — сколько прошли за кадр (м), dt — длительность кадра (с) */
  update(moved, dt, inHall) {
    if (!this.on || !this.ctx) return;
    this.setRoom(inHall);
    const speed = dt > 0 ? moved / dt : 0;
    // быстрый «перелёт» по маршруту — это не шаги
    if (speed > 6 || speed < 0.2) { this.dist = Math.min(this.dist, STRIDE * 0.6); return; }
    this.dist += moved;
    if (this.dist >= STRIDE) { this.dist -= STRIDE; this.step(speed); }
  }

  dispose() {
    if (this.ctx) this.ctx.close();
  }
}
