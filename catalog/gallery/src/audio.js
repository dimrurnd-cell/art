/* Звук зала: тихая классическая музыка, шаги и мелкие звуки помещения.

   Музыка — фортепиано, записи в общественном достоянии или CC0 с Wikimedia
   Commons (исполнители — в TRACKS и в music/CREDITS.txt). Файлы выровнены
   по громкости, MP3 96 кбит/с (играет в любом браузере, включая iPhone); грузятся по
   одному, только когда звук включён. Громкость в зале — MUSIC_VOL: музыка
   на фоне, не мешает смотреть. Идёт через Web Audio, а не громкостью
   <audio>: на iPhone громкость элемента менять нельзя.

   Шаги — по пройденному пути (шаг ~0.72 м), а не по времени: стоишь —
   тишина, идёшь быстрее — чаще. Шаг — еле слышный мягкий шорох подошвы
   и едва заметный низкий толчок; у каждого шага своя громкость и высота.
   Эхо (свёртка с синтезированным откликом помещения; в холле длиннее) —
   только у дверей и щелчка света. Прежнего фонового гула помещения нет:
   он звучал как метро.

   Браузеры разрешают звук только после действия зрителя, поэтому звук
   включается кнопкой; выбор запоминается. */

const KEY = 'artg-sound';
const STRIDE = 0.72;
const MUSIC_VOL = 0.3;       // музыка в зале — тихо, на фоне

export const TRACKS = [
  { f: 'music/satie-gymnopedie-1.mp3', t: 'Эрик Сати — Гимнопедия № 1', p: 'Робин Альсиаторе' },
  { f: 'music/bach-goldberg-aria.mp3', t: 'И. С. Бах — Ария из «Гольдберг-вариаций»', p: 'Кимико Исидзака' },
  { f: 'music/chopin-nocturne-op9-2.mp3', t: 'Фредерик Шопен — Ноктюрн op. 9 № 2', p: 'Фрэнк Леви' },
  { f: 'music/debussy-clair-de-lune.mp3', t: 'Клод Дебюсси — «Лунный свет»', p: 'Лауренс Гудхарт' },
  { f: 'music/beethoven-fur-elise.mp3', t: 'Людвиг ван Бетховен — «К Элизе»', p: 'Gaodifan' },
  { f: 'music/chopin-nocturne-op48-1.mp3', t: 'Фредерик Шопен — Ноктюрн op. 48 № 1', p: 'Люк Фолкнер' },
  { f: 'music/beethoven-moonlight-1.mp3', t: 'Людвиг ван Бетховен — «Лунная соната», I часть', p: 'Пол Питман' },
];

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
  /* url — адрес файла каталога по относительному пути (bridge.url) */
  constructor(url) {
    this.url = url || ((p) => p);
    this.ti = Math.floor(Math.random() * TRACKS.length);   // с какой пьесы начать
    this.fails = 0;
    this.onTrack = null;
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

    // музыка — своя громкость, поверх общего выключателя
    this.musicGain = ctx.createGain();
    this.musicGain.gain.value = MUSIC_VOL;
    this.musicGain.connect(this.master);

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
    clearTimeout(this.pauseT);
    if (on) this.play();
    // выключили — музыка стихает и встаёт на паузу, с того же места и продолжит
    else if (this.audio) this.pauseT = setTimeout(() => { if (!this.on) this.audio.pause(); }, 900);
  }

  /* Плейлист: <audio> через Web Audio (громкость на iPhone только так) */
  play() {
    if (!this.audio) {
      const a = this.audio = new Audio();
      a.crossOrigin = 'anonymous';           // иначе Web Audio отдал бы тишину
      a.preload = 'auto';
      this.ctx.createMediaElementSource(a).connect(this.musicGain);
      a.addEventListener('ended', () => { this.fails = 0; this.next(1500); });
      a.addEventListener('error', () => { if (++this.fails < TRACKS.length) this.next(2000); });
      a.addEventListener('playing', () => { if (this.onTrack) this.onTrack(TRACKS[this.ti]); });
      this.load();
    }
    const p = this.audio.play();
    if (p && p.catch) p.catch(() => { /* браузер ждёт жеста — включится с ним */ });
  }

  load() {
    this.audio.src = this.url(TRACKS[this.ti].f);
  }

  /* следующая пьеса — после паузы, как между номерами концерта */
  next(pause) {
    clearTimeout(this.nextT);
    this.nextT = setTimeout(() => {
      if (!this.audio) return;
      this.ti = (this.ti + 1) % TRACKS.length;
      this.load();
      if (this.on && !document.hidden) this.play();
    }, pause || 0);
  }

  /* вкладка спрятана — музыка на паузе; вернулись — играет дальше */
  visible(shown) {
    if (!this.audio || !this.on) return;
    if (shown) this.play(); else this.audio.pause();
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

  /* Свет по датчику: тихий щелчок реле (гул разгорания убран — с ним
     зал звучал как метро) */
  lightsOn() {
    if (!this.on || !this.ctx) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = this.white;
    const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 3000;
    const cg = ctx.createGain();
    cg.gain.setValueAtTime(0.035, t); cg.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
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
    clearTimeout(this.nextT); clearTimeout(this.pauseT);
    if (this.audio) { this.audio.pause(); this.audio.removeAttribute('src'); this.audio.load(); }
    if (this.ctx) this.ctx.close();
  }
}
