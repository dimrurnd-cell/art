/* Арт-Ростов — WebGL-галерея. Точка входа: window.ArtGallery.create(host, bridge).

   bridge — связь с виджетом каталога (catalog.js):
     artists, sections      — данные в том виде, в каком их держит виджет;
     url(path)              — абсолютный адрес файла из artists.json;
     ticketUrl, objects     — ссылка «Купить билет», силуэты арт-объектов;
     openWork(gi, wi)       — открыть работу во весь экран (с карточкой под ней);
     openArtist(gi)         — открыть карточку художника;
     onRoom(i)              — зритель перешёл в зал раздела i (−1 — холл);
     onFullscreen(el|null)  — перенести модальные окна в развёрнутый элемент;
     fallback(reason)       — WebGL-зал невозможен, вернуть CSS-зал. */
import * as THREE from 'three';
import { buildLayout, viewSpot, roomAt, EYE, COR_W, ART_Y } from './layout.js';
import { World } from './world.js';
import { Nav } from './nav.js';
import { TextureManager } from './textures.js';
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
            '<button type="button" class="artg-btn" data-a="list">Художники</button>' +
            '<button type="button" class="artg-btn artg-btn--icon" data-a="fs" aria-label="Во весь экран">' +
              '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">' +
              '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg></button>' +
          '</div>' +
        '</div>' +
        '<div class="artg-panel" hidden>' +
          '<input type="search" class="artg-panel__q" placeholder="Фамилия или город" aria-label="Поиск художника">' +
          '<div class="artg-panel__list"></div>' +
        '</div>' +
        '<div class="artg-hint"></div>' +
        '<div class="artg-move">' +
          '<button type="button" class="artg-step" data-step="1" aria-label="Шаг вперёд">' +
            '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 5l7 9H5z" fill="currentColor"/></svg></button>' +
          '<button type="button" class="artg-step" data-step="-1" aria-label="Шаг назад">' +
            '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 19l7-9H5z" fill="currentColor"/></svg></button>' +
        '</div>' +
        '<div class="artg-fade"></div>' +
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
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    this.maxPR = Math.min(window.devicePixelRatio || 1, this.small ? 2 : 2);
    this.pr = this.maxPR;
    renderer.setPixelRatio(this.pr);

    this.plan = buildLayout(bridge.artists, bridge.sections);
    this.world = new World(renderer, this.plan, bridge);
    this.scene = this.world.scene;
    this.camera = new THREE.PerspectiveCamera(62, 1, 0.05, 140);
    this.camera.rotation.order = 'YXZ';
    this.nav = new Nav(this.plan);
    this.tex = new TextureManager(renderer, bridge, this.small);
    this.ray = new THREE.Raycaster();
    this.ray.far = 45;
    this.focus = null;
    this.room = -1;
    this.bay = null;
    this.visible = true;
    this.frames = [];
    this.tick = 0;

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
    st.querySelector('[data-a="list"]').addEventListener('click', () => this.togglePanel());
    st.querySelector('[data-a="fs"]').addEventListener('click', () => this.toggleFullscreen());
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
    b.textContent = c.title || 'Экспозиция';
    s.textContent = this.bay ? this.bridge.artists[this.bay.gi].name : '';
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
    for (const h of hits) if (h.object.visible) return h;
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
      this.nav.x = c ? c.cx : x;
      this.nav.z = c ? Math.min(z + 4.5, c.zStart - 1) : z;
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
    this.travel(c.cx, c.zStart - 3.2, 0, -0.02);
  }

  goHall() {
    this.focus = null;
    const hall = this.plan.hall;
    const from = this.plan.corridors[this.room];
    this.travel(from ? from.cx : 0, hall.z1 - 5, 0, -0.02);
  }

  goToArtist(gi) {
    for (const it of this.world.paintings) {
      if (it.gi === gi) { this.focusArt(it); return; }
    }
  }

  /* Работу или карточку закрыли — отступаем на шаг, чтобы снова видеть зал */
  onReturn() {
    if (!this.focus) return;
    const it = this.focus;
    this.focus = null;
    const s = viewSpot(it);
    const d = Math.min(1.2, COR_W / 2 - 0.6 - Math.abs(s.x - this.plan.corridors[it.room].cx));
    if (d > 0.2) this.nav.goTo(s.x - it.side * d, s.z, s.yaw, -0.02);
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
    this.camera.aspect = w / h;
    // на узком экране шире угол, иначе в кадр не помещается даже одна картина
    this.camera.fov = w / h < 0.9 ? 74 : w / h < 1.3 ? 66 : 60;
    this.camera.updateProjectionMatrix();
  }

  /* Если кадры не успевают, снижаем плотность пикселей; если запас — поднимаем */
  adapt(dt) {
    this.frames.push(dt);
    if (this.frames.length < 90) return;
    const avg = this.frames.reduce((a, b) => a + b, 0) / this.frames.length;
    this.frames.length = 0;
    let pr = this.pr;
    if (avg > 26 && pr > 0.75) pr = Math.max(0.75, pr - 0.25);
    else if (avg < 14 && pr < this.maxPR) pr = Math.min(this.maxPR, pr + 0.25);
    if (pr !== this.pr) {
      this.pr = pr;
      this.renderer.setPixelRatio(pr);
      this.resize();
    }
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
      this.tex.update(this.world.paintings);
      this.world.faceBillboards(cam.position);
      const room = nav.room;
      let bay = null;
      if (room >= 0) {
        for (const b of this.plan.corridors[room].bays) {
          if (nav.z <= b.z0 + 0.6 && nav.z >= b.z1 - 1.2) { bay = b; break; }
        }
      }
      if (room !== this.room || bay !== this.bay) {
        const changed = room !== this.room;
        this.room = room;
        this.bay = bay;
        this.updateWhere();
        if (changed && this.bridge.onRoom) this.bridge.onRoom(room);
      }
    }

    this.renderer.render(this.scene, cam);
    this.adapt(dt * 1000);
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
    if (this.fsFake) this.fakeFs(false);
    if (this.renderer) this.renderer.dispose();
  }
}

window.ArtGallery = {
  version: VERSION,
  supported() {
    try {
      const c = document.createElement('canvas');
      return !!(c.getContext('webgl2') || c.getContext('webgl'));
    } catch (e) { return false; }
  },
  create(host, bridge) {
    const g = new Gallery(host, bridge);
    if (g.dead) return null;
    this.last = g;               // для отладки из консоли
    return g;
  },
};
