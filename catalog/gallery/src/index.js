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
import { CSS } from './ui-css.js';

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
            '<button type="button" class="artg-btn" data-a="hall">Холл</button>' +
            '<button type="button" class="artg-btn" data-a="map">План</button>' +
            '<button type="button" class="artg-btn" data-a="list">Художники</button>' +
            '<button type="button" class="artg-btn artg-btn--icon" data-a="share" aria-label="Поделиться ссылкой на это место">' +
              '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">' +
              '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg></button>' +
            '<button type="button" class="artg-btn artg-btn--icon" data-a="q" aria-label="Качество изображения" aria-expanded="false">' +
              '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">' +
              '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/></svg></button>' +
            '<button type="button" class="artg-btn artg-btn--icon" data-a="fs" aria-label="Во весь экран">' +
              '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">' +
              '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg></button>' +
          '</div>' +
        '</div>' +
        '<div class="artg-panel" hidden>' +
          '<input type="search" class="artg-panel__q" placeholder="Фамилия или город" aria-label="Поиск художника">' +
          '<div class="artg-panel__list"></div>' +
        '</div>' +
        '<div class="artg-map" hidden>' +
          '<canvas class="artg-map__plan" width="600" height="300"></canvas>' +
          '<div class="artg-map__list"></div>' +
        '</div>' +
        '<div class="artg-qpanel" hidden role="radiogroup" aria-label="Качество изображения">' +
          '<p>Качество изображения</p>' +
          ['auto', 'high', 'medium', 'low'].map((m) => '<button type="button" role="radio" data-q="' + m + '">' + NAMES[m] + '</button>').join('') +
          '<small></small>' +
        '</div>' +
        '<div class="artg-hint"></div>' +
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

    this.plan = buildLayout(bridge.artists, bridge.sections);
    const tb = performance.now();
    this.world = new World(renderer, this.plan, bridge);
    this.buildMs = Math.round(performance.now() - tb);
    this.scene = this.world.scene;
    this.camera = new THREE.PerspectiveCamera(62, 1, 0.05, 140);
    this.camera.rotation.order = 'YXZ';
    this.nav = new Nav(this.plan);
    this.tex = new TextureManager(renderer, bridge, this.small);
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
      if (this.revealed) return;
      this.revealed = true;
      this.tex.resetStats();
      this.applyHash();
      this.stage.querySelector('.artg-fade').classList.remove('is-on');
    };
    this.revealT = setTimeout(reveal, 5000);
    this.tex.loadAtlas(this.world.paintings, (n, total) => {
      bar.firstChild.style.width = (total ? n / total * 100 : 100) + '%';
      if (n >= total) {
        clearTimeout(this.revealT);
        // дать кадру отрисоваться с атласом, потом снять завесу
        setTimeout(reveal, 120);
        setTimeout(() => bar.classList.add('is-done'), 300);
      }
    });

    this.bindUi();
    this.bindInput();
    this.resize();
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(this.stage);
    this.io = new IntersectionObserver((es) => { this.visible = es[0].isIntersecting; });
    this.io.observe(this.stage);
    this.fsHandler = () => this.onFsChange();
    document.addEventListener('fullscreenchange', this.fsHandler);
    document.addEventListener('webkitfullscreenchange', this.fsHandler);
    this.canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      this.dead = true;
      if (bridge.fallback) bridge.fallback('context');
    });

    this.last = performance.now();
    this.loop = this.loop.bind(this);
    this.raf = requestAnimationFrame(this.loop);
    this.updateWhere();
    this.hint(this.touch
      ? 'Ведите пальцем, чтобы осмотреться. Коснитесь пола — дойдёте туда, коснитесь картины — подойдёте к ней'
      : 'Перетаскивайте мышью, чтобы осмотреться. W/S или стрелки — идти, щелчок по полу или картине — подойти');
  }

  /* ---------------- интерфейс ---------------- */

  bindUi() {
    const st = this.stage;
    st.querySelector('[data-a="hall"]').addEventListener('click', () => this.goHall());
    st.querySelector('[data-a="list"]').addEventListener('click', () => { this.toggleMap(false); this.togglePanel(); });
    st.querySelector('[data-a="map"]').addEventListener('click', () => { this.togglePanel(false); this.toggleMap(); });
    st.querySelector('[data-a="share"]').addEventListener('click', () => this.share());
    st.querySelector('.artg-map__list').addEventListener('click', (e) => {
      const b = e.target.closest('[data-room]');
      if (!b) return;
      const [si, ri] = b.getAttribute('data-room').split('.').map(Number);
      this.toggleMap(false);
      if (si < 0) this.goHall(); else this.goToSubRoom(si, ri);
    });
    st.querySelector('.artg-map__plan').addEventListener('click', (e) => this.mapClick(e));
    st.querySelector('[data-a="fs"]').addEventListener('click', () => this.toggleFullscreen());
    st.querySelector('[data-a="q"]').addEventListener('click', () => {
      const p = st.querySelector('.artg-qpanel');
      p.hidden = !p.hidden;
      st.querySelector('[data-a="q"]').setAttribute('aria-expanded', String(!p.hidden));
      this.fillQuality();
    });
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
      const on = (e) => { e.preventDefault(); e.stopPropagation(); this.nav.hold = dir; b.setPointerCapture && b.setPointerCapture(e.pointerId); };
      const off = () => { if (this.nav.hold === dir) this.nav.hold = 0; };
      b.addEventListener('pointerdown', on);
      ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((ev) => b.addEventListener(ev, off));
    });
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
      ? 'Сейчас: ' + NAMES[q.level].toLowerCase() + '. Снижается само, если кадры не успевают'
      : 'Выбрано вручную';
  }

  togglePanel(on) {
    const p = this.stage.querySelector('.artg-panel');
    const show = on == null ? p.hidden : on;
    p.hidden = !show;
    if (show) {
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

  hint(text) {
    const h = this.stage.querySelector('.artg-hint');
    h.textContent = text;
    h.classList.add('is-on');
    clearTimeout(this.hintT);
    this.hintT = setTimeout(() => h.classList.remove('is-on'), 6000);
  }

  updateWhere() {
    const b = this.stage.querySelector('.artg-where b');
    const s = this.stage.querySelector('.artg-where span');
    if (this.room < 0) { b.textContent = 'Холл'; s.textContent = 'выберите зал'; return; }
    const c = this.plan.corridors[this.room];
    const r = this.sub;
    b.textContent = (c.title || 'Экспозиция') + (r ? ' · зал ' + (r.idx + 1) + ' из ' + c.rooms.length : '');
    s.textContent = this.bay ? this.bridge.artists[this.bay.gi].name : '';
  }

  /* ---------------- план ---------------- */

  toggleMap(on) {
    const p = this.stage.querySelector('.artg-map');
    const show = on == null ? p.hidden : on;
    p.hidden = !show;
    if (show) { this.fillMap(); this.drawMap(); }
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
      if (e.target.closest('.artg-top, .artg-panel, .artg-move')) return;
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
    const up = (e) => {
      if (!down || down.id !== e.pointerId) return;
      const click = !down.moved && performance.now() - down.t < 700;
      down = null;
      if (click && e.type === 'pointerup') this.clickAt(e);
    };
    st.addEventListener('pointerup', up);
    st.addEventListener('pointercancel', up);

    st.addEventListener('wheel', (e) => {
      if (e.ctrlKey) return;
      e.preventDefault();
      nav.cancel();
      nav.wheel = Math.max(-14, Math.min(14, nav.wheel - e.deltaY * 0.012));
    }, { passive: false });

    const typing = (e) => e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName);
    this.onKeyDown = (e) => {
      if (typing(e) || this.modalOpen()) return;
      if (!st.contains(document.activeElement) && document.activeElement !== st) return;
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
    this.stage.style.cursor = u && (u.art || u.plaque || u.action) ? 'pointer' : (u && u.floor ? 'crosshair' : '');
  }

  clickAt(e) {
    const h = this.pick(e);
    if (!h) return;
    const u = h.object.userData;
    if (u.art) {
      if (this.focus === u.art && !this.nav.path) this.bridge.openWork(u.art.gi, u.art.wi);
      else this.focusArt(u.art, () => {
        if (this.touch) return;
        this.hint('Щёлкните по картине ещё раз, чтобы открыть её во весь экран');
      });
    } else if (u.plaque) {
      this.focusArt(u.plaque, () => this.bridge.openArtist(u.plaque.gi));
    } else if (u.action) {
      const a = u.action;
      if (a.type === 'enter') this.goToRoom(a.room);
      else if (a.type === 'hall') this.goHall();
      else if (a.type === 'url') window.open(a.href, '_blank', 'noopener');
    } else if (u.floor) {
      this.focus = null;
      const p = this.nav.clampToPlan(h.point.x, h.point.z);
      if (p) this.nav.goTo(p.x, p.z, null);
    }
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
    if (this.bridge.onFullscreen) this.bridge.onFullscreen(fsEl === this.stage ? this.stage : null);
    this.resize();
  }

  /* ---------------- кадр ---------------- */

  resize() {
    const w = this.stage.clientWidth, h = this.stage.clientHeight;
    if (!w || !h) return;
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
    const dt = Math.min(0.1, (now - this.last) / 1000);
    this.last = now;
    if (!this.visible || document.hidden || this.modalOpen()) return;

    const nav = this.nav;
    nav.update(dt);
    const cam = this.camera;
    cam.position.set(nav.x, EYE, nav.z);
    cam.rotation.set(nav.pitch, nav.yaw, 0);
    this.world.camLight.position.set(nav.x, EYE + 0.6, nav.z);

    if (this.tick++ % 6 === 0) {
      this.world.update(nav);
      this.tex.update(this.world.paintings, cam);
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
      const map = this.stage.querySelector('.artg-map');
      if (!map.hidden && this.tick % 12 === 1) this.drawMap();
    }

    this.updateVisibility();
    this.quality.render();
    if (this.revealed) this.quality.frame(dt * 1000);
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
    const r = this.sub;
    if (r && this.tick % 3 === 0) {
      const rooms = this.plan.corridors[r.sec].rooms;
      for (const d of [1, -1, 2, -2]) {
        const n = rooms[r.idx + d];
        if (n && this.world.ensureRoom(n)) { n.group.visible = false; break; }
      }
    }
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
