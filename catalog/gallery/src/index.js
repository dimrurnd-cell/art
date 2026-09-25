/* Арт-Ростов — WebGL-галерея. Точка входа: window.ArtGallery.create(host, bridge).

   bridge — связь с виджетом каталога (catalog.js):
     artists, sections      — данные в том виде, в каком их держит виджет;
     url(path)              — абсолютный адрес файла из artists.json;
     ticketUrl              — ссылка «Купить билет» на стене холла;
     openWork(gi, wi)       — открыть работу во весь экран (с карточкой под ней);
     openArtist(gi)         — открыть карточку художника;
     onRoom(i)              — зритель перешёл в зал раздела i (−1 — холл);
     onFullscreen(el|null)  — перенести модальные окна в развёрнутый элемент;
     fallback(reason)       — WebGL-зал невозможен, вернуть CSS-зал. */
import * as THREE from 'three';
import {
  buildLayout, viewSpot, roomAt, subRoomAt, canStand, aisleX, EYE, ART_Y,
} from './layout.js';
import { World } from './world.js';
import { Nav } from './nav.js';
import { COR_W } from './layout.js';

const COR_HALF = COR_W / 2;
import { TextureManager } from './textures.js';
import { computeVisible } from './visibility.js';
import { Quality, NAMES } from './quality.js';
import { Tour } from './tour.js';
import { Spots } from './lights.js';
import { Probe } from './probe.js';
import { FloorMarks } from './markers.js';
import { PBR_OPTS } from './pbr.js';
import { Atmosphere } from './atmosphere.js';
import { Sound } from './audio.js';
import { Props } from './props.js';
import { Curator } from './curator.js';
import { CSS } from './ui-css.js';

const LIGHT_KEY = 'artg-light';
const VERSION = '1';

function isTouch() {
  return window.matchMedia && matchMedia('(pointer: coarse)').matches;
}
function isSmall() {
  return isTouch() || Math.min(screen.width, screen.height) < 700;
}
function esc(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function injectCss() {
  if (document.getElementById('artg-css')) return;
  const st = document.createElement('style');
  st.id = 'artg-css';
  st.textContent = CSS;
  document.head.appendChild(st);
}

class Gallery {
  constructor(host, bridge) {
    injectCss();
    this.host = host;
    this.bridge = bridge;
    this.small = isSmall();
    this.touch = isTouch();

    host.innerHTML =
      '<div class="artg-stage" tabindex="0" role="application" ' +
        'aria-label="Виртуальная галерея: ходьба стрелками или W/S, полотна открываются нажатием">' +
        '<canvas class="artg-canvas"></canvas>' +
        '<div class="artg-top">' +
          '<div class="artg-where"><b></b><span></span></div>' +
          '<div class="artg-actions">' +
            '<button type="button" class="artg-btn artg-btn--icon" data-a="fs" aria-label="Во весь экран">' +
              '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg></button>' +
            '<button type="button" class="artg-btn artg-btn--icon artg-menu-btn" data-a="menu" aria-label="Меню" aria-expanded="false">' +
              '<svg class="artg-ico-menu" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
              '<svg class="artg-ico-close" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
          '</div>' +
        '</div>' +
        '<div class="artg-menu" hidden role="menu" aria-label="Меню галереи">' +
            '<button type="button" class="artg-mi" data-a="tour" role="menuitem"><span class="artg-mi__t">Экскурсия по залу</span><i class="artg-mi__i"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 5v14l11-7z"/></svg></i></button>' +
            '<button type="button" class="artg-mi" data-a="hall" role="menuitem"><span class="artg-mi__t">В холл</span><i class="artg-mi__i"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7M5 10v10h14V10"/></svg></i></button>' +
            '<button type="button" class="artg-mi" data-a="map" role="menuitem"><span class="artg-mi__t">План залов</span><i class="artg-mi__i"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14"/></svg></i></button>' +
            '<button type="button" class="artg-mi" data-a="list" role="menuitem"><span class="artg-mi__t">Художники</span><i class="artg-mi__i"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg></i></button>' +
            (bridge.curator ? '<button type="button" class="artg-mi" data-a="cur" role="menuitem"><span class="artg-mi__t">Спросить куратора</span><i class="artg-mi__i"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.4A8 8 0 1 1 21 12z"/><path d="M9 10.5h6M9 13.5h4"/></svg></i></button>' : '') +
            '<button type="button" class="artg-mi" data-a="snd" role="menuitemcheckbox" aria-checked="false"><span class="artg-mi__t">Звук</span><i class="artg-mi__i">' +
              '<svg class="artg-snd-on" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H3v6h3l5 4V5zM15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>' +
              '<svg class="artg-snd-off" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H3v6h3l5 4V5zM16 9l6 6M22 9l-6 6"/></svg></i></button>' +
            '<button type="button" class="artg-mi" data-a="light" role="menuitemcheckbox" aria-checked="false"><span class="artg-mi__t">Свет</span><i class="artg-mi__i"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/></svg></i></button>' +
            '<button type="button" class="artg-mi" data-a="share" role="menuitem"><span class="artg-mi__t">Ссылка на это место</span><i class="artg-mi__i"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg></i></button>' +
            '<button type="button" class="artg-mi" data-a="q" role="menuitem"><span class="artg-mi__t">Качество изображения</span><i class="artg-mi__i"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/></svg></i></button>' +
            '<button type="button" class="artg-mi" data-a="simple" role="menuitem"><span class="artg-mi__t">Простой режим</span><i class="artg-mi__i"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/></svg></i></button>' +
        '</div>' +
        '<div class="artg-panel" hidden>' +
          '<div class="artg-phead"><b>Художники</b><button type="button" class="artg-close" data-close aria-label="Закрыть">' +
            '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
          '<input type="search" class="artg-panel__q" placeholder="Фамилия или город" aria-label="Поиск художника">' +
          '<div class="artg-panel__list"></div>' +
        '</div>' +
        '<div class="artg-map" hidden>' +
          '<div class="artg-phead"><b>План</b><button type="button" class="artg-close" data-close aria-label="Закрыть">' +
            '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
          '<canvas class="artg-map__plan" width="600" height="300"></canvas>' +
          '<div class="artg-map__list"></div>' +
        '</div>' +
        '<div class="artg-qpanel" hidden role="radiogroup" aria-label="Качество изображения">' +
          '<div class="artg-phead"><b>Качество изображения</b><button type="button" class="artg-close" data-close aria-label="Закрыть">' +
            '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
          [['auto', 'Авто'], ['hd', 'HD · объём и свечение'], ['sd', 'SD · плавнее, для телефона']].map(([m, t]) => '<button type="button" role="radio" data-q="' + m + '">' + t + '</button>').join('') +
          '<small></small>' +
        '</div>' +
        '<div class="artg-hint"></div>' +
        (bridge.curator ? '<button type="button" class="artg-say" tabindex="-1" aria-hidden="true">Могу ли я Вам чем-то помочь?</button>' : '') +
        '<div class="artg-tour" hidden aria-live="polite"></div>' +
        '<div class="artg-joy" aria-hidden="true"><i></i></div>' +
        '<div class="artg-move">' +
          '<button type="button" class="artg-step" data-step="1" aria-label="Шаг вперёд">' +
            '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 5l7 9H5z" fill="currentColor"/></svg></button>' +
          '<button type="button" class="artg-step" data-step="-1" aria-label="Шаг назад">' +
            '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 19l7-9H5z" fill="currentColor"/></svg></button>' +
        '</div>' +
        '<div class="artg-load"><i></i></div>' +
        '<div class="artg-fade is-on"></div>' +
      '</div>';
    this.stage = host.querySelector('.artg-stage');
    this.canvas = host.querySelector('.artg-canvas');

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, powerPreference: 'high-performance' });
    } catch (e) {
      this.dead = true;
      if (bridge.fallback) bridge.fallback('webgl');
      return;
    }
    this.renderer = renderer;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    // нейтральный тон-маппинг: белые стены остаются белыми, а не серыми, как у ACES
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.0;
    this.maxPR = Math.min(window.devicePixelRatio || 1, this.small ? 2 : 2);
    this.pr = this.maxPR;
    renderer.setPixelRatio(this.pr);

    // Бережный режим памяти: Android и устройства с малой памятью. Браузер
    // там даёт странице мало видеопамяти, и не поместившиеся текстуры
    // рисуются чёрными (iPhone выделяет больше — ему не нужно)
    const ua = navigator.userAgent;
    const force = /[?&#]artlean\b/.test(location.search + location.hash);
    this.lean = force || (this.small && (/Android/i.test(ua) || (navigator.deviceMemory && navigator.deviceMemory <= 4)));
    PBR_OPTS.max = this.lean ? 512 : 0;
    // отражения снимаются в формат с плавающей точкой — не все видеочипы это умеют
    const gl = renderer.getContext();
    this.floatRT = !!(gl.getExtension('EXT_color_buffer_float') || gl.getExtension('EXT_color_buffer_half_float'));
    this.diag = { shaderErrors: [], glErrors: 0, lost: 0, hitches: [] };
    this.prof = { on: false };
    renderer.debug.onShaderError = (g, program, vs, fs) => {
      const log = (g.getProgramInfoLog(program) || '') + ' ' + (g.getShaderInfoLog(fs) || '') + ' ' + (g.getShaderInfoLog(vs) || '');
      this.diag.shaderErrors.push(log.trim().slice(0, 300));
      console.warn('[artgallery] шейдер не собрался:', log);
    };

    this.plan = buildLayout(bridge.artists, bridge.sections);
    const tb = performance.now();
    this.world = new World(renderer, this.plan, bridge);
    this.props = new Props(this.world);
    this.world.props = this.props;
    this.marks = new FloorMarks(this.world.scene);
    this.world.build();
    this.curator = bridge.curator ? new Curator(this.world, bridge) : null;
    this.buildMs = Math.round(performance.now() - tb);
    this.scene = this.world.scene;
    // тени спотов (на компьютере); сама карта теней включена всегда, а
    // уровни качества включают и выключают тени у спотов
    renderer.shadowMap.enabled = !this.small;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.spots = new Spots(this.scene, this.small);
    this.atmo = new Atmosphere(this.scene, this.spots, this.small);
    this.sound = new Sound((p) => bridge.url(p));
    // пьеса началась — её название короткой подсказкой
    this.sound.onTrack = (t) => this.hint('♪ ' + t.t + ' · исп. ' + t.p);
    this.onVis = () => this.sound.visible(!document.hidden);
    document.addEventListener('visibilitychange', this.onVis);
    this.lastPos = { x: 0, z: 0 };
    this.bobAmp = 0;
    this.bobPhase = 0;
    let lightPref = '';
    try { lightPref = localStorage.getItem(LIGHT_KEY) || ''; } catch (e) { /* приватный режим */ }
    this.naturalLight = lightPref === 'natural';
    this.probe = new Probe(renderer, this.scene, this.small);
    this.probe.off = !this.floatRT;
    this.world.reflectMats().forEach((m) => this.probe.patch(m));
    this.probeKey = '';
    this.camera = new THREE.PerspectiveCamera(62, 1, 0.05, 140);
    this.camera.rotation.order = 'YXZ';
    this.nav = new Nav(this.plan);
    this.tex = new TextureManager(renderer, bridge, this.small, this.lean);
    // мебель и оборудование: отражения, растения, экран, скульптура, свет по датчику, звуки
    const pr = this.props;
    pr.reflectMats().forEach((m) => this.probe.patch(m));
    if (this.world.plantMat) pr.swayPlants(this.world.plantMat);
    pr.screen(bridge, this.tex);
    pr.sculpture();
    this.spots.factor = (it) => pr.spotFactor(it);
    pr.onDoor = (open, dist) => this.sound.door(open, dist);
    pr.onWake = () => this.sound.lightsOn();
    this.quality = new Quality(this);
    this.quality.onChange = () => this.fillQuality();
    this.world.onPaintings = (items) => this.tex.attach(items);
    this.allWorks = [].concat(...this.plan.corridors.map((c) => c.works));
    this.cull = true;                 // false — рисовать всё (для сравнения кадров)
    this.ray = new THREE.Raycaster();
    this.ray.far = 45;
    this.focus = null;
    this.room = -1;
    this.bay = null;
    this.visible = true;
    this.frames = [];
    this.tick = 0;

    // атлас превью: пока он грузится, над сценой тонкая полоса прогресса
    // Сцена проявляется, когда атлас готов (или через 5 с, если сеть медленная):
    // так зритель не видит ни одной пустой рамы даже в первые секунды.
    const bar = this.stage.querySelector('.artg-load');
    const reveal = () => {
      if (this.revealed || this.warming) return;
      // сначала прогрев за завесой, потом показ
      if (!this.warmed) { this.warming = true; this.warm().then(() => { this.warming = false; reveal(); }); return; }
      this.revealed = true;
      this.tex.resetStats();
      this.applyHash();
      this.stage.querySelector('.artg-fade').classList.remove('is-on');
      if (bridge.onReady) bridge.onReady();
    };
    // Проявляем, когда пришли и атлас превью, и фактуры помещения: пока
    // фактуры нет, three.js рисует на её месте чёрное. Если сеть медленная —
    // через 15 с всё равно показываем (что не пришло, дорисуется само).
    const pbr = this.world.pbr;
    const texTotal = Object.keys(pbr.cache).length;
    let atlasN = 0, atlasT = 1, atlasDone = false;
    const progress = () => {
      const texDone = texTotal - pbr.pending;
      const frac = (atlasN + texDone) / (atlasT + texTotal);
      bar.firstChild.style.width = (frac * 100) + '%';
      // последние 8 % — прогрев шейдеров (warm): загрузчик не стоит на 100 %
      if (bridge.onProgress) bridge.onProgress(frac * 0.92);
      if (atlasDone && pbr.pending <= 0) {
        clearTimeout(this.revealT);
        setTimeout(reveal, 120);                 // дать кадру отрисоваться, потом снять завесу
        setTimeout(() => bar.classList.add('is-done'), 300);
      }
    };
    pbr.onLoad = progress;
    this.revealT = setTimeout(() => { reveal(); bar.classList.add('is-done'); }, 15000);
    this.tex.loadAtlas(this.world.paintings, (n, total) => {
      atlasN = n; atlasT = total || 1;
      if (n >= total) atlasDone = true;
      progress();
    });

    if (this.touch) this.stage.classList.add('is-touch');
    if (/[?&#]artdebug\b/.test(location.search + location.hash)) this.debugPanel();
    this.bindUi();
    this.tour = new Tour(this);
    this.bindInput();
    this.resize();
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(this.stage);
    // последняя запись — актуальная (при переносе сцены их приходит несколько)
    this.io = new IntersectionObserver((es) => { this.visible = es[es.length - 1].isIntersecting; });
    this.io.observe(this.stage);
    this.fsHandler = () => this.onFsChange();
    document.addEventListener('fullscreenchange', this.fsHandler);
    document.addEventListener('webkitfullscreenchange', this.fsHandler);
    this.canvas.addEventListener('webglcontextlost', (e) => {
      this.diag.lost++;
      e.preventDefault();
      this.dead = true;
      if (bridge.fallback) bridge.fallback('context');
    });

    this.last = performance.now();
    this.loop = this.loop.bind(this);
    this.raf = requestAnimationFrame(this.loop);
    this.updateWhere();
    this.hint(this.touch
      ? 'Круг слева внизу — идти, палец по сцене — осмотреться. Коснитесь картины — подойдёте к ней'
      : 'Перетаскивайте мышью, чтобы осмотреться. W/S или стрелки — идти, щелчок по полу или картине — подойти');
  }

  /* ---------------- интерфейс ---------------- */

  bindUi() {
    const st = this.stage;
    st.querySelector('[data-a="hall"]').addEventListener('click', () => this.goHall());
    // имя художника в заголовке — карточка художника
    st.querySelector('.artg-where span').addEventListener('click', () => { if (this.bay) this.bridge.openArtist(this.bay.gi); });
    st.querySelector('[data-a="simple"]').addEventListener('click', () => { if (this.bridge.simple) this.bridge.simple(); });
    st.querySelector('[data-a="list"]').addEventListener('click', () => { this.toggleMap(false); this.togglePanel(); });
    st.querySelector('[data-a="map"]').addEventListener('click', () => { this.togglePanel(false); this.toggleMap(); });
    st.querySelector('[data-a="share"]').addEventListener('click', () => this.share());
    const curBtn = st.querySelector('[data-a="cur"]');
    if (curBtn) curBtn.addEventListener('click', () => this.askCurator());
    this.say = st.querySelector('.artg-say');
    if (this.say) this.say.addEventListener('click', () => this.askCurator());
    st.querySelector('.artg-map__list').addEventListener('click', (e) => {
      const b = e.target.closest('[data-room]');
      if (!b) return;
      const [si, ri] = b.getAttribute('data-room').split('.').map(Number);
      this.toggleMap(false);
      if (si < 0) this.goHall(); else this.goToSubRoom(si, ri);
    });
    st.querySelector('.artg-map__plan').addEventListener('click', (e) => this.mapClick(e));
    st.querySelector('[data-a="fs"]').addEventListener('click', () => this.toggleFullscreen());
    const sndBtn = st.querySelector('[data-a="snd"]');
    const sndShow = () => {
      sndBtn.setAttribute('aria-checked', String(this.sound.on));
      sndBtn.classList.toggle('is-on', this.sound.on);
      sndBtn.firstChild.textContent = this.sound.on ? 'Музыка и звук включены' : 'Музыка и звук выключены';
    };
    sndBtn.addEventListener('click', () => { this.sound.toggle(); sndShow(); });
    // свет: выставочный (споты) или естественный (картины как в оригинале)
    const lightBtn = st.querySelector('[data-a="light"]');
    const lightShow = () => {
      lightBtn.setAttribute('aria-checked', String(this.naturalLight));
      lightBtn.classList.toggle('is-on', this.naturalLight);
      lightBtn.firstChild.textContent = this.naturalLight ? 'Свет: естественный' : 'Свет: споты';
    };
    lightBtn.addEventListener('click', () => {
      this.setNaturalLight(!this.naturalLight);
      lightShow();
      // из меню подсказка не нужна — подпись пункта уже сказала, какой свет
      if (!st.querySelector('.artg-menu').hidden) return;
      this.hint(this.naturalLight
        ? 'Естественный свет: споты погашены, картины — в цветах исходных изображений'
        : 'Выставочный свет: споты над работами');
    });
    lightShow();
    // звук был включён в прошлый раз — включаем при первом касании сцены (раньше браузер не даст)
    const resume = () => { if (this.sound.want && !this.sound.on) { this.sound.set(true); sndShow(); } };
    st.addEventListener('pointerdown', resume, { once: true });
    st.addEventListener('keydown', resume, { once: true });
    sndShow();
    st.querySelector('[data-a="tour"]').addEventListener('click', () => {
      if (this.tour.running) { this.tour.stop(); return; }
      this.closePanels();
      const sec = this.room >= 0 ? this.room : (this.bridge.section ? this.bridge.section() : 0);
      this.tour.start(sec);
    });
    this.bindJoystick();
    st.querySelector('[data-a="q"]').addEventListener('click', () => {
      const p = st.querySelector('.artg-qpanel');
      const show = p.hidden;
      this.closePanels();
      p.hidden = !show;
      st.querySelector('[data-a="q"]').setAttribute('aria-expanded', String(show));
      if (show) { this.placePanels(); this.fillQuality(); }
      st.classList.toggle('has-panel', this.anyPanel());
    });
    // меню: одна кнопка справа, пункты колонкой по правому краю. Пункты,
    // открывающие панель или уводящие зрителя, меню закрывают; звук и свет —
    // переключатели, меню остаётся открытым
    const menu = st.querySelector('.artg-menu');
    const menuBtn = st.querySelector('[data-a="menu"]');
    menuBtn.addEventListener('click', () => {
      const show = menu.hidden;
      this.closePanels();
      if (!show) return;
      menu.hidden = false;
      menuBtn.setAttribute('aria-expanded', 'true');
      st.classList.add('is-menu');
      this.placePanels();
    });
    menu.addEventListener('click', (e) => {
      const b = e.target.closest('[data-a]');
      if (!b) { this.closeMenu(); return; }      // мимо пунктов — как касание сцены
      const a = b.getAttribute('data-a');
      if (a !== 'snd' && a !== 'light' && !menu.hidden) this.closeMenu();
    }, true);
    // у каждой панели своя кнопка «закрыть» — на телефоне кнопки над сценой
    // переносятся в два ряда, и панель не должна их закрывать
    st.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', () => this.closePanels()));
    st.querySelector('.artg-qpanel').addEventListener('click', (e) => {
      const b = e.target.closest('[data-q]');
      if (b) this.quality.choose(b.getAttribute('data-q'));
    });
    const q = st.querySelector('.artg-panel__q');
    q.addEventListener('input', () => this.fillPanel(q.value));
    q.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.togglePanel(false); e.stopPropagation(); });
    st.querySelector('.artg-panel__list').addEventListener('click', (e) => {
      const b = e.target.closest('[data-gi]');
      if (!b) return;
      this.togglePanel(false);
      this.goToArtist(+b.getAttribute('data-gi'));
    });
    st.querySelectorAll('.artg-step').forEach((b) => {
      const dir = +b.getAttribute('data-step');
      const on = (e) => { e.preventDefault(); e.stopPropagation(); if (this.tour.running) this.tour.stop(); this.nav.hold = dir; b.setPointerCapture && b.setPointerCapture(e.pointerId); };
      const off = () => { if (this.nav.hold === dir) this.nav.hold = 0; };
      b.addEventListener('pointerdown', on);
      ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((ev) => b.addEventListener(ev, off));
    });
  }

  /* Джойстик на сенсорном экране: палец в круге — идти (вверх — вперёд,
     вбок — шагом в сторону), сила — насколько далеко от центра. Второй
     палец в это время может водить по сцене и осматриваться. */
  bindJoystick() {
    const joy = this.stage.querySelector('.artg-joy');
    const knob = joy.firstChild;
    let id = null, cx = 0, cy = 0;
    const R = 44;
    const set = (x, y) => {
      const d = Math.hypot(x, y), k = d > R ? R / d : 1;
      x *= k; y *= k;
      knob.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      this.nav.joy.x = x / R;
      this.nav.joy.y = y / R;
    };
    joy.addEventListener('pointerdown', (e) => {
      e.preventDefault(); e.stopPropagation();
      if (this.tour.running) this.tour.stop();
      id = e.pointerId;
      const r = joy.getBoundingClientRect();
      cx = r.left + r.width / 2; cy = r.top + r.height / 2;
      try { joy.setPointerCapture(id); } catch (err) { /* ok */ }
      joy.classList.add('is-on');
      set(e.clientX - cx, e.clientY - cy);
    });
    joy.addEventListener('pointermove', (e) => { if (e.pointerId === id) set(e.clientX - cx, e.clientY - cy); });
    const end = (e) => {
      if (e.pointerId !== id) return;
      id = null;
      joy.classList.remove('is-on');
      set(0, 0);
    };
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((ev) => joy.addEventListener(ev, end));
  }

  fillQuality() {
    const p = this.stage && this.stage.querySelector('.artg-qpanel');
    if (!p || !this.quality) return;
    const q = this.quality;
    p.querySelectorAll('[data-q]').forEach((b) => {
      const on = b.getAttribute('data-q') === q.mode;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-checked', String(on));
    });
    p.querySelector('small').textContent = q.mode === 'auto'
      ? 'Сейчас: ' + NAMES[q.level] + '. Чёткость подстраивается сама под скорость устройства'
      : 'Выбрано вручную';
  }

  /* Закрыть все панели (художники, план, качество) */
  closeMenu() {
    const st = this.stage;
    st.querySelector('.artg-menu').hidden = true;
    st.querySelector('[data-a="menu"]').setAttribute('aria-expanded', 'false');
    st.classList.remove('is-menu');
    st.classList.toggle('has-panel', this.anyPanel());
  }

  closePanels() {
    const st = this.stage;
    this.closeMenu();
    st.querySelector('.artg-panel').hidden = true;
    st.querySelector('.artg-map').hidden = true;
    st.querySelector('.artg-qpanel').hidden = true;
    st.querySelector('[data-a="q"]').setAttribute('aria-expanded', 'false');
    st.classList.remove('has-panel');
  }

  /* убрать всплывающую подсказку (например, когда открывается панель) */
  hideHint() {
    const h = this.stage.querySelector('.artg-hint');
    if (h) h.classList.remove('is-on');
  }

  anyPanel() {
    return ['.artg-panel', '.artg-map', '.artg-qpanel', '.artg-menu'].some((s) => !this.stage.querySelector(s).hidden);
  }

  /* Панели — сразу под кнопками, сколько бы рядов кнопок ни было */
  placePanels() {
    const top = this.stage.querySelector('.artg-top');
    const y = top.offsetTop + top.offsetHeight + 8;
    ['.artg-panel', '.artg-map', '.artg-qpanel', '.artg-menu'].forEach((s) => {
      const p = this.stage.querySelector(s);
      p.style.top = y + 'px';
      p.style.maxHeight = 'calc(100% - ' + (y + 16) + 'px)';
    });
    // пока открыта панель, джойстик и кнопки шага её не перекрывают
    this.stage.classList.toggle('has-panel', this.anyPanel());
    if (this.anyPanel()) this.hideHint();
  }

  togglePanel(on) {
    const p = this.stage.querySelector('.artg-panel');
    const show = on == null ? p.hidden : on;
    if (show) this.closePanels();
    p.hidden = !show;
    this.stage.classList.toggle('has-panel', this.anyPanel());
    if (show) {
      this.placePanels();
      const q = p.querySelector('.artg-panel__q');
      q.value = '';
      this.fillPanel('');
      if (!this.touch) q.focus();
    }
  }

  fillPanel(query) {
    const q = query.trim().toLowerCase();
    const { artists, sections } = this.bridge;
    const html = sections.map((sec) => {
      const items = sec.list.filter((gi) => {
        const a = artists[gi];
        return a.works && a.works.length &&
          (!q || a.name.toLowerCase().includes(q) || (a.city || '').toLowerCase().includes(q));
      });
      if (!items.length) return '';
      return (sections.length > 1 ? '<p class="artg-panel__sec">' + esc(sec.title) + '</p>' : '') +
        items.map((gi) => '<button type="button" data-gi="' + gi + '">' + esc(artists[gi].name) +
          (artists[gi].city ? '<i>' + esc(artists[gi].city) + '</i>' : '') + '</button>').join('');
    }).join('');
    this.stage.querySelector('.artg-panel__list').innerHTML = html || '<p class="artg-panel__none">Никого не нашлось</p>';
  }

  /* Диагностика (адрес с #artdebug): видеочип, память, ошибки. Нужна, чтобы
     разбирать проблемы на конкретном телефоне по одному скриншоту */
  debugPanel() {
    const d = document.createElement('div');
    d.className = 'artg-debug';
    d.style.cssText = 'position:absolute;left:8px;bottom:8px;z-index:9;max-width:calc(100% - 16px);box-sizing:border-box;' +
      'background:rgba(0,0,0,.8);color:#fff;font:11px/1.4 ui-monospace,Menlo,monospace;padding:8px 10px;border-radius:8px;' +
      'white-space:pre-wrap;word-break:break-word;pointer-events:auto;-webkit-user-select:text;user-select:text';
    this.stage.appendChild(d);
    const r = this.renderer, gl = r.getContext();
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const gpu = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
    const hp = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);
    let frames = 0, t0 = performance.now();
    const count = () => { frames++; if (!this.dead) requestAnimationFrame(count); };
    requestAnimationFrame(count);
    const tick = () => {
      if (this.dead) return;
      let e;
      while ((e = gl.getError()) !== gl.NO_ERROR) { this.diag.glErrors++; this.diag.lastGl = '0x' + e.toString(16); }
      const now = performance.now(), fps = frames * 1000 / (now - t0);
      frames = 0; t0 = now;
      const t = this.tex.report(), m = r.info.memory;
      d.textContent = [
        'GPU: ' + gpu,
        'ОЗУ: ' + (navigator.deviceMemory || '?') + ' ГБ · экран ' + screen.width + '×' + screen.height + ' ×' + (window.devicePixelRatio || 1) +
          ' · рендер ×' + this.pr.toFixed(2),
        'качество: ' + this.quality.level + (this.quality.mode === 'auto' ? ' (авто)' : '') + ' · бережный: ' + (this.lean ? 'да' : 'нет') +
          ' · отражения: ' + (this.floatRT ? 'да' : 'нет') + ' · highp: ' + (hp && hp.precision > 0 ? 'да' : 'нет'),
        'макс. текстура ' + r.capabilities.maxTextureSize + ' · текстур ' + m.textures + ' · геометрий ' + m.geometries + ' · шейдеров ' + (r.info.programs || []).length +
          (this.diag.warm ? ' (заранее +' + this.diag.warm.programs + ' за ' + this.diag.warm.ms + ' мс)' : ''),
        'картины ' + t.gpuMB + '/' + t.budgetMB + ' МБ · атлас ' + t.atlasMB + ' МБ · уровни ' + t.byLevel.join('/') + ' · без картинки ' + t.noImage,
        'кадров/с ' + fps.toFixed(0) + ' · вызовов ' + r.info.render.calls,
        this.hitchLine(now),
        'ошибки GL: ' + this.diag.glErrors + (this.diag.lastGl ? ' (' + this.diag.lastGl + ')' : '') + ' · потеря контекста: ' + this.diag.lost,
        'ошибки шейдеров: ' + (this.diag.shaderErrors.length ? '\n' + this.diag.shaderErrors.join('\n') : 'нет'),
      ].join('\n');
      setTimeout(tick, 1000);
    };
    tick();
  }

  /* Естественный свет: выбор запоминается в браузере */
  setNaturalLight(on) {
    this.naturalLight = on;
    try { localStorage.setItem(LIGHT_KEY, on ? 'natural' : 'spots'); } catch (e) { /* приватный режим */ }
  }

  /* Плавный переход между спотами и естественным светом (~0.6 с) */
  stepNatural(dt) {
    const u = this.world.natural, target = this.naturalLight ? 1 : 0;
    if (u.value === target) return;
    u.value = target > u.value ? Math.min(1, u.value + dt / 0.6) : Math.max(0, u.value - dt / 0.6);
    this.spots.dim = 1 - u.value;
    // без спотов зал чуть светлее за счёт рассеянного света
    this.world.hemi.intensity = 0.55 + 0.35 * u.value;
  }

  hint(text) {
    const h = this.stage.querySelector('.artg-hint');
    if (!h) return;
    h.textContent = text;
    h.classList.add('is-on');
    clearTimeout(this.hintT);
    this.hintT = setTimeout(() => h.classList.remove('is-on'), 6000);
  }

  updateWhere() {
    const b = this.stage.querySelector('.artg-where b');
    const s = this.stage.querySelector('.artg-where span');
    if (this.room < 0) { b.textContent = 'Холл'; s.textContent = 'выберите зал'; s.classList.remove('is-link'); return; }
    const c = this.plan.corridors[this.room];
    const r = this.sub;
    b.textContent = (c.title || 'Экспозиция') + (r ? ' · зал ' + (r.idx + 1) + ' из ' + c.rooms.length : '');
    s.textContent = this.bay ? this.bridge.artists[this.bay.gi].name + ' →' : '';
    s.classList.toggle('is-link', !!this.bay);
    s.title = this.bay ? 'Карточка художника' : '';
  }

  /* ---------------- план ---------------- */

  toggleMap(on) {
    const p = this.stage.querySelector('.artg-map');
    const show = on == null ? p.hidden : on;
    if (show) this.closePanels();
    p.hidden = !show;
    this.stage.classList.toggle('has-panel', this.anyPanel());
    if (show) { this.placePanels(); this.fillMap(); this.drawMap(); }
  }

  fillMap() {
    const cur = this.sub;
    let html = '<button type="button" data-room="-1.0"' + (this.room < 0 ? ' class="is-here"' : '') + '>Холл</button>';
    this.plan.corridors.forEach((c) => {
      html += '<p class="artg-panel__sec">' + esc(c.title || 'Экспозиция') + '</p>';
      c.rooms.forEach((r) => {
        html += '<button type="button" data-room="' + c.i + '.' + r.idx + '"' + (r === cur ? ' class="is-here"' : '') + '>' +
          'Зал ' + (r.idx + 1) + '<i>' + esc(r.label || '') + '</i></button>';
      });
    });
    const list = this.stage.querySelector('.artg-map__list');
    list.innerHTML = html;
    const here = list.querySelector('.is-here');
    if (here) here.scrollIntoView({ block: 'center' });
  }

  /* Схема здания: холл внизу, разделы — столбцы залов (зал 1 у холла),
     в каждом зале два прохода; точка — где стоит зритель */
  mapGeom() {
    const cv = this.stage.querySelector('.artg-map__plan');
    const W = cv.width, H = cv.height;
    const cs = this.plan.corridors;
    const colW = Math.min(110, (W - 40) / Math.max(1, cs.length) - 24);
    const hallH = 40, top = 34, bottom = H - hallH - 14;
    const span = cs.length * (colW + 24) - 24;
    const x0 = (W - span) / 2;
    return { cv, W, H, cs, colW, hallH, top, bottom, x0, span };
  }

  drawMap() {
    const { cv, W, H, cs, colW, hallH, top, bottom, x0, span } = this.mapGeom();
    const g = cv.getContext('2d');
    const nav = this.nav;
    const hall = this.plan.hall;
    g.clearRect(0, 0, W, H);
    g.font = '500 17px "Helvetica Neue", Arial, sans-serif';
    g.textAlign = 'center';
    // холл
    const hx = x0 - 12, hw = span + 24, hy = H - hallH - 6;
    g.fillStyle = this.room < 0 ? '#2a2a2a' : '#e2e1dd';
    g.fillRect(hx, hy, hw, hallH);
    g.fillStyle = this.room < 0 ? '#fff' : '#8c8c88';
    g.fillText('ХОЛЛ', W / 2, hy + hallH / 2 + 6);
    const dot = (x, y) => {
      g.fillStyle = '#d4574f';
      g.beginPath(); g.arc(x, y, 7, 0, Math.PI * 2); g.fill();
      g.strokeStyle = '#fff'; g.lineWidth = 2; g.stroke();
    };
    cs.forEach((c, ci) => {
      const cx = x0 + ci * (colW + 24);
      const rh = (bottom - top) / c.rooms.length;
      g.fillStyle = '#2a2a2a';
      g.fillText(c.title || '', cx + colW / 2, 20);
      c.rooms.forEach((r) => {
        const y = bottom - (r.idx + 1) * rh;
        const here = r === this.sub;
        g.fillStyle = here ? '#2a2a2a' : '#e2e1dd';
        g.fillRect(cx, y + 1, colW, Math.max(1, rh - 2));
        g.fillStyle = here ? '#6f6f6b' : '#c9c8c4';
        g.fillRect(cx + colW / 2 - 1, y + rh * 0.22, 2, rh * 0.56);    // остров
      });
      if (this.room === c.i && this.sub) {
        const r = this.sub;
        const t = Math.max(0, Math.min(1, (r.z0 - nav.z) / (r.z0 - r.z1)));
        const half = colW / 2;
        dot(cx + colW / 2 + (nav.x - c.cx) / (COR_HALF) * half * 0.85, bottom - (r.idx + t) * rh);
      }
    });
    if (this.room < 0) {
      const t = (nav.x - hall.x0) / (hall.x1 - hall.x0);
      dot(hx + t * hw, hy + hallH * Math.max(0.2, Math.min(0.8, (nav.z - hall.z0) / (hall.z1 - hall.z0))));
    }
  }

  mapClick(e) {
    const { cv, H, cs, colW, hallH, top, bottom, x0 } = this.mapGeom();
    const rc = cv.getBoundingClientRect();
    const x = (e.clientX - rc.left) * cv.width / rc.width, y = (e.clientY - rc.top) * cv.height / rc.height;
    if (y > H - hallH - 14) { this.toggleMap(false); this.goHall(); return; }
    cs.forEach((c, ci) => {
      const cx = x0 + ci * (colW + 20);
      if (x < cx || x > cx + colW || y < top || y > bottom) return;
      const ri = Math.min(c.rooms.length - 1, Math.floor((bottom - y) / ((bottom - top) / c.rooms.length)));
      this.toggleMap(false);
      this.goToSubRoom(c.i, ri);
    });
  }

  /* ---------------- ссылки на место ---------------- */

  /* #artc-work=<id художника>/<номер работы> или #artc-room=<раздел>/<зал>.
     Адрес меняем через replaceState — история браузера не засоряется;
     чужие якоря страницы (Tilda и т. п.) не трогаем. */
  hashFor() {
    if (this.focus) {
      const a = this.bridge.artists[this.focus.gi];
      return 'artc-work=' + encodeURIComponent(a.id || this.focus.gi) + '/' + (this.focus.wi + 1);
    }
    if (this.sub) return 'artc-room=' + (this.room + 1) + '/' + (this.sub.idx + 1);
    return '';
  }

  syncHash() {
    if (!this.revealed || !window.history || !history.replaceState) return;
    const h = location.hash;
    if (h && !/^#artc-/.test(h)) return;
    const want = this.hashFor();
    if ((h || '#') === '#' + want || (!h && !want)) return;
    try {
      history.replaceState(history.state, '', want ? '#' + want : location.pathname + location.search);
    } catch (e) { /* песочница без истории */ }
  }

  applyHash() {
    const h = decodeURIComponent(location.hash || '');
    let m = h.match(/^#artc-work=([^/]+)\/(\d+)/);
    if (m) {
      const gi = this.bridge.artists.findIndex((a, i) => String(a.id || i) === m[1]);
      const it = this.allWorks.find((p) => p.gi === gi && p.wi === +m[2] - 1);
      if (it) {
        const s = viewSpot(it);
        Object.assign(this.nav, { x: s.x, z: s.z, yaw: s.yaw, pitch: 0 });
        this.focus = it;
        this.hint('Вы у работы по ссылке. Нажмите на неё, чтобы открыть во весь экран');
        return;
      }
    }
    m = h.match(/^#artc-room=(\d+)\/(\d+)/);
    if (m) {
      const c = this.plan.corridors[+m[1] - 1];
      const r = c && c.rooms[+m[2] - 1];
      if (r) Object.assign(this.nav, { x: c.cx, z: r.z0 - 1.6, yaw: 0, pitch: -0.02 });
    }
  }

  share() {
    this.syncHash();
    const url = location.href;
    const title = this.focus ? this.bridge.artists[this.focus.gi].name : 'Арт-Ростов — виртуальная галерея';
    if (navigator.share && this.touch) {
      navigator.share({ title, url }).catch(() => {});
      return;
    }
    const done = () => this.hint('Ссылка на это место скопирована');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done, () => this.hint(url));
    } else this.hint(url);
  }

  /* ---------------- ввод ---------------- */

  bindInput() {
    const st = this.stage;
    const nav = this.nav;
    let down = null;

    st.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.artg-top, .artg-menu, .artg-panel, .artg-move, .artg-map, .artg-qpanel, .artg-tour, .artg-joy, .artg-say, .artc-cur')) return;
      // открыта панель — касание сцены её закрывает, а не ведёт по залу
      if (this.anyPanel()) { this.closePanels(); return; }
      if (this.tour.running) this.tour.stop();
      down = { x: e.clientX, y: e.clientY, lx: e.clientX, ly: e.clientY, t: performance.now(), id: e.pointerId, moved: false };
      st.focus({ preventScroll: true });
    });
    st.addEventListener('pointermove', (e) => {
      if (down && down.id === e.pointerId) {
        const dx = e.clientX - down.lx, dy = e.clientY - down.ly;
        down.lx = e.clientX; down.ly = e.clientY;
        if (!down.moved && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) {
          down.moved = true;
          nav.cancel();
          try { st.setPointerCapture(e.pointerId); } catch (err) { /* ok */ }
        }
        if (down.moved) {
          const k = (this.touch ? 1.25 : 1) * this.camera.fov / 62 / this.stage.clientHeight * 1.9;
          nav.look(dx * k, dy * k);
        }
      } else if (!this.touch) {
        this.hoverAt(e);
      }
    });
    // Нажатие обрабатываем по событию click, а не по отпусканию пальца: иначе
    // окно работы открылось бы раньше, и следом пришедший клик попал бы в
    // кнопку этого окна. Если click не пришёл (бывает на сенсорных экранах) —
    // через 400 мс срабатываем сами.
    const up = (e) => {
      if (!down || down.id !== e.pointerId) return;
      const click = !down.moved && performance.now() - down.t < 700;
      down = null;
      if (!click || e.type !== 'pointerup') return;
      const tap = { clientX: e.clientX, clientY: e.clientY };
      this.pendingTap = tap;
      clearTimeout(this.tapT);
      this.tapT = setTimeout(() => { if (this.pendingTap === tap) { this.pendingTap = null; this.clickAt(tap); } }, 400);
    };
    st.addEventListener('pointerup', up);
    st.addEventListener('pointerleave', () => { this.marks.hover(null); this.setHover(null); });
    st.addEventListener('pointercancel', up);
    st.addEventListener('click', () => {
      const tap = this.pendingTap;
      if (!tap) return;
      this.pendingTap = null;
      clearTimeout(this.tapT);
      this.clickAt(tap);
    });

    st.addEventListener('wheel', (e) => {
      if (e.ctrlKey) return;
      e.preventDefault();
      if (this.tour.running) this.tour.stop();
      nav.cancel();
      nav.wheel = Math.max(-14, Math.min(14, nav.wheel - e.deltaY * 0.012));
    }, { passive: false });

    const typing = (e) => e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName);
    this.onKeyDown = (e) => {
      if (typing(e) || this.modalOpen()) return;
      if (!st.contains(document.activeElement) && document.activeElement !== st) return;
      if (/^(Arrow|Key[WASDQE])/.test(e.code) && this.tour.running) this.tour.stop();
      if (/^(Arrow|Key[WASDQE]|Shift)/.test(e.code)) {
        nav.keys[e.code] = true;
        if (/^Arrow/.test(e.code)) e.preventDefault();
      }
      if (e.code === 'Escape') this.togglePanel(false);
      if (e.code === 'Enter' && this.focus) this.bridge.openWork(this.focus.gi, this.focus.wi);
    };
    this.onKeyUp = (e) => { nav.keys[e.code] = false; };
    this.onBlur = () => { nav.keys = {}; nav.hold = 0; };
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('blur', this.onBlur);
  }

  modalOpen() {
    return !!document.querySelector('.artc-modal.is-open');
  }

  pick(e) {
    const r = this.canvas.getBoundingClientRect();
    const v = new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    this.ray.setFromCamera(v, this.camera);
    const hits = this.ray.intersectObjects(this.world.pickables, false);
    for (const h of hits) {
      let o = h.object, vis = true;
      while (o) { if (!o.visible) { vis = false; break; } o = o.parent; }
      if (!vis) continue;
      if (h.object.userData.curator && !this.curator.hit(h.uv)) continue;
      // стена закрывает всё, что за ней
      return h.object.userData.blocker ? null : h;
    }
    return null;
  }

  hoverAt(e) {
    const now = performance.now();
    if (now - (this.hoverT || 0) < 60) return;
    this.hoverT = now;
    const h = this.pick(e);
    const u = h && h.object.userData;
    const link = u && (u.art || u.plaque || u.action || u.banner || u.curator);
    this.stage.style.cursor = link ? 'pointer' : '';
    // табличка или имя на стене под курсором — чуть крупнее: видно, что это ссылка
    this.setHover(u && (u.plaque || u.banner) ? h.object : null);
    // метка на полу: сюда можно перейти щелчком
    let spot = null;
    if (u && u.floor && !this.nav.path && canStand(this.plan, h.point.x, h.point.z)) spot = h.point;
    this.marks.hover(spot);
    if (spot) this.stage.style.cursor = 'pointer';
  }

  /* Сенсорный экран: бледные кольца на полу по осям проходов впереди, в
     2.5–13 м и в кадре. В пути и в холле их нет — только в зале, где
     пол и есть дорога вдоль работ. */
  placeHints() {
    const nav = this.nav, pts = [];
    if (!nav.path && !this.tour.running && this.room >= 0) {
      const c = this.plan.corridors[this.room];
      const cam = this.camera, v = new THREE.Vector3();
      for (const a of [-1, 1]) {
        const x = aisleX(c, a);
        for (let k = -4; k <= 4; k++) {
          const z = Math.round(nav.z / 3) * 3 + k * 3;
          const d = Math.hypot(x - nav.x, z - nav.z);
          if (d < 2.5 || d > 13 || !canStand(this.plan, x, z)) continue;
          v.set(x, 0, z).project(cam);
          if (v.z > 1 || Math.abs(v.x) > 0.9 || v.y > 0.2 || v.y < -0.95) continue;
          pts.push([x, z, d]);
        }
      }
      pts.sort((p, q) => p[2] - q[2]);
    }
    this.marks.showHints(pts.slice(0, 6));
  }

  setHover(m) {
    if (m === this.hovered) return;
    const set = (o, on) => {
      if (!o) return;
      const k = on ? 1.06 : 1;
      // у имени на стене две копии (наружная стена и остров) — обе
      const all = o.userData.banner ? this.world.banners.get(o.userData.banner) || [o] : [o];
      all.forEach((x) => { x.scale.set(k, k, 1); });
      if (o.material.emissive) o.material.emissive.setHex(on ? 0x1c1c1c : 0x000000);
    };
    set(this.hovered, false);
    this.hovered = m;
    set(m, true);
  }

  clickAt(e) {
    const h = this.pick(e);
    if (!h) return;
    const u = h.object.userData;
    if (u.art) {
      // та же картина, к которой уже подходим или подошли, — открыть сразу
      if (this.focus === u.art) this.bridge.openWork(u.art.gi, u.art.wi);
      else this.focusArt(u.art, () => {
        if (this.touch) return;
        this.hint('Щёлкните по картине ещё раз, чтобы открыть её во весь экран');
      });
    } else if (u.plaque) {
      this.focusArt(u.plaque, () => this.bridge.openArtist(u.plaque.gi));
    } else if (u.banner) {
      this.bridge.openArtist(u.banner.gi);
    } else if (u.curator) {
      this.askCurator();
    } else if (u.action) {
      const a = u.action;
      if (a.type === 'enter') this.goToRoom(a.room);
      else if (a.type === 'hall') this.goHall();
      else if (a.type === 'url') window.open(a.href, '_blank', 'noopener');
    } else if (u.floor) {
      this.focus = null;
      const p = this.nav.clampToPlan(h.point.x, h.point.z);
      if (p) { this.nav.goTo(p.x, p.z, null); this.marks.target(p.x, p.z); }
    }
  }

  /* ---------------- куратор ---------------- */

  askCurator() {
    if (!this.bridge.curator) return;
    if (this.tour.running) this.tour.stop();
    this.closePanels();
    this.nav.keys = {};
    this.bridge.curator(this.stage);
  }

  /* Облачко над головой: только в холле, когда куратор близко и в кадре,
     и пока не открыты окно вопросов, панели или экскурсия */
  placeSay() {
    const b = this.say;
    if (!b) return;
    const st = this.stage, w = st.clientWidth, h = st.clientHeight;
    let p = null;
    if (this.revealed && this.curator.ready && this.room < 0 && !this.tour.running &&
        !st.classList.contains('has-cur') && !st.classList.contains('has-panel')) {
      p = this.curator.head(this.camera, w, h);
      if (p && (p.d > 15 || p.d < 1.2 || p.x < 12 || p.x > w - 60 || p.y < 70 || p.y > h - 40)) p = null;
    }
    const on = !!p;
    if (on !== this.sayOn) {
      this.sayOn = on;
      b.classList.toggle('is-on', on);
    }
    if (on) b.style.transform = 'translate(' + Math.round(p.x - 20) + 'px,' + Math.round(p.y - 10) + 'px) translateY(-100%)';
  }

  /* ---------------- перемещения ---------------- */

  /* Далеко — не идём километр по коридору, а переносимся через затемнение */
  travel(x, z, yaw, pitch, cb) {
    const far = Math.hypot(x - this.nav.x, z - this.nav.z) > 70;
    if (!far) { this.nav.goTo(x, z, yaw, pitch, cb); return; }
    const fade = this.stage.querySelector('.artg-fade');
    fade.classList.add('is-on');
    this.nav.cancel();
    setTimeout(() => {
      // появляемся в нескольких шагах и подходим — так видно, куда попали
      const c = this.plan.corridors[roomAt(this.plan, x, z)];
      const r = c && subRoomAt(this.plan, x, z);
      if (r) {
        // появиться на оси того же прохода, на пару шагов ближе к холлу
        const ax = aisleX(c, x < c.cx ? -1 : 1);
        this.nav.x = ax;
        this.nav.z = Math.min(z + 3.5, r.z0 - 0.8);
        if (!canStand(this.plan, this.nav.x, this.nav.z)) this.nav.z = z;
      } else { this.nav.x = x; this.nav.z = z; }
      this.nav.yaw = 0;
      this.nav.goTo(x, z, yaw, pitch, cb);
      fade.classList.remove('is-on');
    }, 320);
  }

  focusArt(it, cb) {
    this.focus = it;
    const s = viewSpot(it);
    const pitch = Math.atan2(ART_Y - EYE, Math.abs(s.x - it.x)) * 0.8;
    this.travel(s.x, s.z, s.yaw, pitch, cb);
  }

  goToRoom(i) {
    const c = this.plan.corridors[i];
    if (!c) return;
    this.focus = null;
    this.travel(c.cx, c.rooms[0].z0 - 1.8, 0, -0.02);
  }

  goToSubRoom(si, ri) {
    const c = this.plan.corridors[si];
    const r = c && c.rooms[ri];
    if (!r) return;
    this.focus = null;
    this.travel(c.cx, r.z0 - 1.6, 0, -0.02);
  }

  goHall() {
    this.focus = null;
    const hall = this.plan.hall;
    const from = this.plan.corridors[this.room];
    this.travel(from ? from.cx : 0, hall.z1 - 5, 0, -0.02);
  }

  goToArtist(gi) {
    for (const it of this.allWorks) {
      if (it.gi === gi) { this.focusArt(it); return; }
    }
  }

  /* Работу или карточку закрыли — отступаем на шаг, чтобы снова видеть зал */
  onReturn() {
    if (!this.focus) return;
    const it = this.focus;
    this.focus = null;
    const s = viewSpot(it);
    const x = s.x - it.side * 1.1;
    if (canStand(this.plan, x, s.z)) this.nav.goTo(x, s.z, s.yaw, -0.02);
    this.hint(this.touch ? 'Вы снова в зале — коснитесь пола, чтобы идти дальше' : 'Вы снова в зале — идите дальше');
  }

  /* ---------------- во весь экран ---------------- */

  toggleFullscreen() {
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    if (fsEl) { (document.exitFullscreen || document.webkitExitFullscreen).call(document); return; }
    if (this.fsFake) { this.fakeFs(false); return; }
    const req = this.stage.requestFullscreen || this.stage.webkitRequestFullscreen;
    if (!req) { this.fakeFs(true); return; }
    try {
      const p = req.call(this.stage);
      if (p && p.catch) p.catch(() => this.fakeFs(true));
    } catch (e) { this.fakeFs(true); }
  }

  /* iPhone: Fullscreen API нет — переносим сцену в body и растягиваем */
  fakeFs(on) {
    this.fsFake = on;
    if (on) {
      this.slot = document.createComment('artg');
      this.stage.parentNode.insertBefore(this.slot, this.stage);
      this.fsHost = document.createElement('div');
      this.fsHost.className = 'artc-root artg-fs-host';
      document.body.appendChild(this.fsHost);
      this.fsHost.appendChild(this.stage);
      document.body.style.overflow = 'hidden';
    } else if (this.fsHost) {
      this.slot.parentNode.insertBefore(this.stage, this.slot);
      this.slot.parentNode.removeChild(this.slot);
      this.fsHost.parentNode.removeChild(this.fsHost);
      this.fsHost = null;
      document.body.style.overflow = '';
    }
    this.onFsChange();
  }

  onFsChange() {
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    const on = fsEl === this.stage || this.fsFake;
    this.stage.classList.toggle('is-fs', !!on);
    // окна работы и карточки — внутри полноэкранного слоя, иначе они
    // открываются под ним (на iPhone полноэкранный режим — это слой поверх страницы)
    if (this.bridge.onFullscreen) this.bridge.onFullscreen(fsEl === this.stage ? this.stage : (this.fsFake ? this.fsHost : null));
    this.resize();
  }

  /* ---------------- кадр ---------------- */

  resize() {
    const w = this.stage.clientWidth, h = this.stage.clientHeight;
    if (!w || !h) return;
    // узкая сцена (телефон вертикально): редкие кнопки уходят в меню «⋯»
    this.stage.classList.toggle('is-narrow', w < 560);
    // средняя ширина (телефон горизонтально, планшет): кнопки только значками
    this.stage.classList.toggle('is-compact', w < 960);
    if (this.anyPanel && this.stage.querySelector('.artg-top')) this.placePanels();
    this.renderer.setSize(w, h, false);
    if (this.quality) this.quality.resize(w, h);
    this.camera.aspect = w / h;
    // на узком экране шире угол, иначе в кадр не помещается даже одна картина
    this.camera.fov = w / h < 0.9 ? 74 : w / h < 1.3 ? 66 : 60;
    this.camera.updateProjectionMatrix();
  }

  loop(now) {
    if (this.dead) return;
    this.raf = requestAnimationFrame(this.loop);
    const gap = now - this.last;
    const dt = Math.min(0.1, gap / 1000);
    this.last = now;
    // рывок — кадр дольше 50 мс; виноват участок, дольше всех занявший
    // прошлый вызов (его работа и задержала этот кадр)
    const P = this.prof;
    if (this.revealed && gap > 50 && P.on) this.noteHitch(gap, P);
    P.on = false; P.build = P.tex = P.probe = P.render = P.prog = 0;
    // во весь экран сцена видна всегда, что бы ни думал наблюдатель видимости
    const shown = this.visible || this.fsFake || (document.fullscreenElement || document.webkitFullscreenElement) === this.stage;
    if (!shown || document.hidden || this.modalOpen()) return;

    P.on = true;
    const nav = this.nav;
    nav.update(dt);
    const cam = this.camera;
    const moved = Math.hypot(nav.x - this.lastPos.x, nav.z - this.lastPos.z);
    this.lastPos.x = nav.x; this.lastPos.z = nav.z;
    const speed = dt > 0 ? moved / dt : 0;
    // «Живая» камера: в ходьбе голова чуть опускается на каждом шаге и
    // покачивается с ноги на ногу; на месте — едва заметное дыхание.
    // На быстром перелёте по маршруту покачивания нет — это не шаги.
    const walking = !nav.path && speed > 0.3 && speed < 6;
    this.bobAmp += ((walking ? 1 : 0) - this.bobAmp) * Math.min(1, dt * 4);
    if (speed < 6) this.bobPhase += moved / 0.72 * Math.PI;
    const tt = now / 1000;
    const dip = -0.014 * (1 - Math.cos(2 * this.bobPhase)) / 2 * this.bobAmp;
    const sway = 0.007 * Math.sin(this.bobPhase) * this.bobAmp;
    const breath = 0.0035 * Math.sin(tt * 1.5);
    cam.position.set(nav.x + Math.cos(nav.yaw) * sway, EYE + dip + breath, nav.z - Math.sin(nav.yaw) * sway);
    cam.rotation.set(nav.pitch + 0.0012 * Math.sin(tt * 1.5 + 1), nav.yaw, 0.0028 * Math.sin(this.bobPhase) * this.bobAmp);
    this.world.camLight.position.set(nav.x, EYE + 0.6, nav.z);
    if (this.curator) { this.curator.face(cam); this.placeSay(); }

    if (this.tick++ % 6 === 0) {
      this.world.update(nav);
      this.spots.assign(this.world.paintings, cam);
      const tt = performance.now();
      this.tex.update(this.world.paintings, cam);
      P.tex += performance.now() - tt;
      const room = nav.room;
      const sub = subRoomAt(this.plan, nav.x, nav.z);
      let bay = null;
      if (sub) {
        // художник — тот, у чьих работ стоим, на своей стороне острова
        const c = this.plan.corridors[room];
        const a = nav.x < c.cx ? -1 : 1;
        for (const b of sub.bays) {
          if (b.aisle === a && nav.z <= b.z0 + 0.6 && nav.z >= b.z1 - 0.6) { bay = b; break; }
        }
      }
      if (room !== this.room || bay !== this.bay || sub !== this.sub) {
        const changed = room !== this.room;
        this.room = room;
        this.sub = sub;
        this.bay = bay;
        this.updateWhere();
        if (changed && this.bridge.onRoom) this.bridge.onRoom(room);
      }
      if (this.focus && !nav.path) {
        const sp = viewSpot(this.focus);
        if (Math.hypot(sp.x - nav.x, sp.z - nav.z) > 2.5) this.focus = null;   // отошёл сам
      }
      if (!nav.path) this.syncHash();
      if (this.touch) this.placeHints();
      const map = this.stage.querySelector('.artg-map');
      if (!map.hidden && this.tick % 12 === 1) this.drawMap();
    }

    let t1 = performance.now();
    this.tex.flush();
    this.marks.update(dt, !!nav.path);
    P.tex += performance.now() - t1;
    this.props.update(dt, nav, speed, this.sub);
    this.stepNatural(dt);
    this.spots.update(dt);
    this.sound.update(moved, dt, this.room < 0);
    this.atmo.update(cam, this.pr, this.stage.clientHeight);
    t1 = performance.now();
    this.updateVisibility();
    const t2 = performance.now();
    this.updateProbe();
    const t3 = performance.now();
    const progs = (this.renderer.info.programs || []).length;
    this.quality.render();
    P.build += t2 - t1; P.probe += t3 - t2; P.render += performance.now() - t3;
    P.prog += (this.renderer.info.programs || []).length - progs;
    // движение для подстройки чёткости: шаг или поворот камеры
    const turn = Math.abs(nav.yaw - (this.lastYaw || 0)) + Math.abs(nav.pitch - (this.lastPitch || 0));
    this.lastYaw = nav.yaw; this.lastPitch = nav.pitch;
    if (this.revealed) this.quality.frame(dt * 1000, moved > 1e-4 || turn > 1e-4 || !!nav.path);
  }

  /* Строка панели: рывки за 30 с — сколько, худший и причины по частоте */
  hitchLine(now) {
    const h = this.diag.hitches.filter((x) => now - x.t < 30000);
    if (!h.length) return 'рывков за 30 с: 0';
    const by = {};
    h.forEach((x) => { const k = x.cause.replace(/ \+\d+$/, ''); by[k] = (by[k] || 0) + 1; });
    const worst = h.reduce((a, b) => (b.ms > a.ms ? b : a));
    return 'рывков за 30 с: ' + h.length + ' · худший ' + Math.round(worst.ms) + ' мс (' + worst.cause + ')\n  ' +
      Object.keys(by).sort((a, b) => by[b] - by[a]).map((k) => k + ' ' + by[k]).join(' · ');
  }

  noteHitch(ms, P) {
    const parts = { 'сборка зала': P.build, 'картинки': P.tex, 'отражения': P.probe, 'отрисовка': P.render };
    let cause = 'видеочип/браузер', worst = 8;
    for (const k in parts) if (parts[k] > worst) { worst = parts[k]; cause = k; }
    if (P.prog > 0) cause = 'шейдеры +' + P.prog;
    const h = this.diag.hitches;
    h.push({ t: performance.now(), ms, cause });
    if (h.length > 200) h.shift();
  }

  /* Прогрев, пока сцену закрывает загрузчик: первый снимок отражений
     холла (материалы сразу получают карту отражений — иначе первая съёмка
     после показа пересобирала десятки шейдеров посреди ходьбы) и сборка
     всех шейдеров холла и первых залов заранее, параллельно, где браузер
     это умеет (KHR_parallel_shader_compile). Не дольше 4 с. */
  warm() {
    this.warmed = true;
    const t0 = performance.now();
    if (this.bridge.onProgress) this.bridge.onProgress(0.95);
    const R = this.renderer, scene = this.scene;
    const progs = () => (R.info.programs || []).length;
    const p0 = progs();
    const compile = () => (R.compileAsync ? R.compileAsync(scene, this.camera) : Promise.resolve());
    const shown = [], lights = [];
    const restore = () => { shown.forEach((o) => { o.visible = false; }); shown.length = 0; };
    try {
      // залы 1–2 каждого раздела: в них появляются варианты материалов,
      // которых нет в холле (инстансы, цвета вершин, мебель)
      const rooms = new Set();
      this.plan.corridors.forEach((c) => c.rooms.slice(0, 2).forEach((r) => { this.world.ensureRoom(r); rooms.add(r); }));
      this.world.setVisible(true, rooms, null, this.camera);
      const spot = this.world.probeSpot(null);
      const atmoOn = this.atmo.on;
      this.atmo.setEnabled(false);
      this.probe.capture(spot, spot.pos);        // до сборки шейдеров: карта отражений входит в их вариант
      this.atmo.setEnabled(true);                // лучи — тоже шейдер
      // всё скрытое внутри собранных помещений — временно видно (двери,
      // подсветки, объекты по уровню качества)
      scene.traverse((o) => {
        if (o.isRectAreaLight) lights.push(o);
        if (!o.visible && !o.isLight && o.parent && o.parent.visible) { o.visible = true; shown.push(o); }
      });
      // два варианта: с площадными светильниками холла и без них (холл
      // скрыт за стеной — их число в сцене меняется, а с ним и все шейдеры)
      const on = lights.map((l) => l.visible);
      // три цели отрисовки — у каждой свой вариант шейдера: экран; буфер
      // постобработки HD (без тон-маппинга); куб отражений (без тон-маппинга
      // и без дымки). Сборка синхронная, ожидание готовности — общее.
      const q = this.quality;
      const targets = [q.composer ? q.composer.readBuffer : null];
      if (!this.probe.off) targets.push(this.probe.rt);
      const all = () => {
        const prev = R.getRenderTarget(), fog = scene.fog;
        const jobs = targets.map((t) => {
          R.setRenderTarget(t);
          if (t === this.probe.rt) scene.fog = null;
          const j = compile();
          scene.fog = fog;
          return j;
        });
        R.setRenderTarget(prev);
        return Promise.all(jobs);
      };
      const job = all()
        .then(() => { lights.forEach((l) => { l.visible = false; }); return all(); })
        .then(() => { lights.forEach((l, i) => { l.visible = on[i]; }); });
      return Promise.race([job, new Promise((r) => setTimeout(r, 6000))]).catch(() => {}).then(() => {
        restore();
        lights.forEach((l, i) => { l.visible = on[i]; });
        this.atmo.setEnabled(atmoOn);
        this.quality.render();                   // проходы постобработки HD — тоже заранее
        this.updateVisibility();
        this.diag.warm = { ms: Math.round(performance.now() - t0), programs: progs() - p0 };
        if (this.bridge.onProgress) this.bridge.onProgress(1);
      });
    } catch (e) {
      restore();
      return Promise.resolve();
    }
  }

  /* Какие залы рисовать: отсечение по проёмам каждый кадр (десяток
     проекций — дёшево), плюс по одному залу за кадр достраиваем соседей
     по ходу, чтобы не собирать их в момент, когда они покажутся */
  updateVisibility() {
    const nav = this.nav;
    if (this.cull) {
      const v = computeVisible(this.plan, this.camera, nav.x, nav.z);
      this.world.setVisible(v.hall, v.rooms, v.win, this.camera);
    } else {
      if (!this.allRooms) this.allRooms = new Set([].concat(...this.plan.corridors.map((c) => c.rooms)));
      this.world.setVisible(true, this.allRooms);
    }
    // не больше одного шага сборки за кадр: мебель отложенного зала или
    // следующий зал по ходу (без мебели — она следующим шагом)
    const W = this.world;
    if (W.pendingProps.length) {
      const n = W.pendingProps[0];
      const vis = n.group.visible;
      W.roomProps(n, false);
      n.group.visible = vis;
      return;
    }
    const r = this.sub;
    if (r && this.tick % 3 === 0) {
      const rooms = this.plan.corridors[r.sec].rooms;
      for (const d of [1, -1, 2, -2]) {
        const n = rooms[r.idx + d];
        if (n && W.ensureRoom(n, false)) { n.group.visible = false; break; }
      }
    }
  }

  /* Вошли в новое помещение — переснять отражения. Снимаем с открытыми
     соседями (в отражении видны проёмы), через полсекунды после входа,
     когда споты уже разгорелись. */
  updateProbe() {
    if (!this.revealed) return;
    if (this.probeJob) { this.probeFrame(this.probeJob); return; }
    const spot = this.world.probeSpot(this.sub);
    if (spot.key === this.probeKey) return;
    // снимаем, когда свет по датчику уже разгорелся
    if (spot.key !== this.probeWant) { this.probeWant = spot.key; this.probeAt = performance.now() + 1900; return; }
    if (performance.now() < this.probeAt) return;
    const rooms = new Set();
    if (spot.room) {
      const all = spot.room.sectionRef.rooms;
      [spot.room.idx - 1, spot.room.idx, spot.room.idx + 1].forEach((i) => { if (all[i]) rooms.add(all[i]); });
    } else this.plan.corridors.forEach((c) => rooms.add(c.rooms[0]));
    this.probeKey = spot.key;
    if (!this.probe.begin(spot, spot.pos)) return;
    // по грани за кадр: с открытыми соседями (в отражении видны проёмы)
    this.probeJob = { hall: !spot.room || spot.room.idx === 0, rooms };
    this.probeFrame(this.probeJob);
  }

  probeFrame(job) {
    this.world.setVisible(job.hall, job.rooms, null, this.camera);
    const atmoOn = this.atmo.on;
    this.atmo.setEnabled(false);                 // лучи и пыль в отражениях не нужны
    const done = this.probe.step();
    this.atmo.setEnabled(atmoOn);
    if (done) this.probeJob = null;
    this.updateVisibility();
  }

  destroy() {
    this.dead = true;
    cancelAnimationFrame(this.raf);
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('blur', this.onBlur);
    document.removeEventListener('fullscreenchange', this.fsHandler);
    document.removeEventListener('webkitfullscreenchange', this.fsHandler);
    if (this.ro) this.ro.disconnect();
    if (this.io) this.io.disconnect();
    clearTimeout(this.revealT);
    if (this.fsFake) this.fakeFs(false);
    if (this.quality) this.quality.dropComposer();
    if (this.probe) this.probe.dispose();
    if (this.sound) this.sound.dispose();
    if (this.onVis) document.removeEventListener('visibilitychange', this.onVis);
    if (this.renderer) this.renderer.dispose();
  }
}

window.ArtGallery = {
  version: VERSION,
  supported() {
    try {
      const c = document.createElement('canvas');
      return !!c.getContext('webgl2');     // three.js r163+ работает только на WebGL2
    } catch (e) { return false; }
  },
  create(host, bridge) {
    const g = new Gallery(host, bridge);
    if (g.dead) return null;
    this.last = g;               // для отладки из консоли
    return g;
  },
};
