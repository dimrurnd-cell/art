/* ============================================================
   Арт-Ростов — онлайн-каталог художников (виджет для Snippet)
   Vanilla JS, без внешних зависимостей.

   Контейнер: <div id="artrostov-catalog"
                   data-base="/static/artcatalog/"
                   data-endpoint="/api/artcatalog/lead/"
                   data-policy="/ru/privacy/"
                   data-demo="">
   data-base        — путь к статике виджета (там лежит artists.json);
                      может быть абсолютным URL (CDN)
   data-endpoint    — URL приёма заявок (Django-приложение artcatalog)
   data-policy      — ссылка на политику обработки персональных данных
   data-demo        — "1" = не отправлять на сервер (локальный просмотр)
   data-tilda-popup — режим Tilda: имя попапа с формой Tilda, например
                      "popup:artbuy". Кнопка «Хочу купить» подставляет
                      художника/работу в скрытые поля формы (input
                      name="artist" / name="work") и открывает попап;
                      собственная форма виджета и data-endpoint при этом
                      не используются — заявку отправляет Tilda.
   ============================================================ */
(function () {
  'use strict';

  var ROOT_ID = 'artrostov-catalog';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  /* ---------------- утилиты ---------------- */

  function el(tag, cls, html) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // <picture> c webp + jpg/png-фолбэком
  function pictureHTML(webpUrl, alt, lazy) {
    var fallback = webpUrl.replace(/\.webp$/, webpUrl.indexOf('logo') !== -1 ? '.png' : '.jpg');
    return '<picture>' +
      '<source srcset="' + esc(webpUrl) + '" type="image/webp">' +
      '<img src="' + esc(fallback) + '" alt="' + esc(alt) + '"' +
      (lazy ? ' loading="lazy"' : '') + '>' +
      '</picture>';
  }

  function getCookie(name) {
    var m = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return m ? decodeURIComponent(m[2]) : '';
  }

  var ARROW_L = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>';
  var ARROW_R = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
  var ARROW_UP = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg>';
  var ARROW_DOWN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M18 13l-6 6-6-6"/></svg>';
  var ICON_HALL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21V6l9-3 9 3v15"/><path d="M9 21v-6h6v6"/><path d="M3 21h18"/></svg>';
  var ICON_GRID = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>';
  var ICON_WALK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="13" cy="4" r="2"/><path d="M9 21l2-5 3-2-1-5-3 1-2 3"/><path d="M14 14l2 3 1 4"/></svg>';

  var BLANK = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="4" height="3"%3E%3C/svg%3E';

  // короткое имя для кнопок навигации: фамилия либо два первых слова
  function shortName(name) {
    var parts = String(name).replace(/[«»"]/g, '').split(/\s+/);
    var s = parts[0] || '';
    if (s.length < 5 && parts[1]) s += ' ' + parts[1];
    return s.length > 16 ? s.slice(0, 15) + '…' : s;
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ---------------- фокус-ловушка для модальных окон ---------------- */

  function trapFocus(modal) {
    function handler(e) {
      if (e.key !== 'Tab') return;
      var focusables = modal.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      var first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    }
    modal.addEventListener('keydown', handler);
  }

  /* ================= основной виджет ================= */

  function Widget(root) {
    this.root = root;
    this.base = (root.getAttribute('data-base') || '/static/artcatalog/').replace(/\/?$/, '/');
    this.endpoint = root.getAttribute('data-endpoint') || '/api/artcatalog/lead/';
    this.policy = root.getAttribute('data-policy') || '#';
    this.demo = root.getAttribute('data-demo') === '1';
    this.tildaPopup = (root.getAttribute('data-tilda-popup') || '').replace(/^#/, '');
    var base = this.base;
    // пути в artists.json могут быть относительными (к data-base) или абсолютными
    this.url = function (p) { return /^(https?:)?\/\//.test(p) ? p : base + p; };
    this.artists = [];
    this.index = 0;          // позиция карусели
    this.artistIdx = -1;     // открытый художник
    this.workIdx = -1;       // открытая работа в лайтбоксе
    this.lastFocus = null;
    this.init();
  }

  /* Стили обычно подключены в <head> (на Tilda — отдельным блоком).
     Если их там нет, подключаем сами: виджет должен работать
     и когда вставлен только код блока с контейнером. */
  Widget.prototype.ensureStyles = function () {
    var self = this;
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    ['catalog.css', 'hall.css'].forEach(function (file) {
      for (var i = 0; i < links.length; i++) {
        if ((links[i].getAttribute('href') || '').indexOf(file) !== -1) return;
      }
      var l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = self.base + file;
      (document.head || document.documentElement).appendChild(l);
    });
  };

  Widget.prototype.init = function () {
    var self = this;
    this.ensureStyles();
    fetch(this.base + 'artists.json', { credentials: 'same-origin' })
      .then(function (r) {
        if (!r.ok) throw new Error('artists.json: HTTP ' + r.status);
        return r.json();
      })
      .then(function (data) {
        self.artists = (data.artists || []).slice().sort(function (a, b) {
          return (a.order || 0) - (b.order || 0);
        });
        self.render();
      })
      .catch(function (err) {
        console.error('[artcatalog]', err);
        self.root.innerHTML = '<p style="text-align:center;color:#a00;padding:30px 10px;">' +
          'Не удалось загрузить каталог художников. Обновите страницу.</p>';
      });
  };

  /* ---------------- разметка ---------------- */

  Widget.prototype.render = function () {
    var r = this.root;
    r.innerHTML = '';
    var wrap = el('div', 'artc-root');
    wrap.innerHTML =
      '<span class="artc-blob artc-blob--1"></span>' +
      '<span class="artc-blob artc-blob--2"></span>' +
      '<span class="artc-blob artc-blob--3"></span>' +
      '<span class="artc-blob artc-blob--4"></span>' +
      '<span class="artc-drop artc-drop--1"></span>' +
      '<span class="artc-drop artc-drop--2"></span>' +
      '<span class="artc-drop artc-drop--3"></span>' +
      '<span class="artc-drop artc-drop--4"></span>' +
      '<header class="artc-head">' +
        '<div class="artc-head__logo">' + pictureHTML(this.base + 'img/logo.webp', 'АРТ Ростов', false) + '</div>' +
        '<h2 class="artc-head__title">Каталог художников</h2>' +
        '<span class="artc-head__sub">Все грани искусства!</span>' +
      '</header>' +
      '<div class="artc-views" role="tablist" aria-label="Способ просмотра">' +
        '<button type="button" class="artc-views__btn is-active" data-view="hall" role="tab" aria-selected="true">' +
          ICON_HALL + 'Виртуальный зал</button>' +
        '<button type="button" class="artc-views__btn" data-view="grid" role="tab" aria-selected="false">' +
          ICON_GRID + 'Каталог</button>' +
      '</div>' +
      '<div class="artc-view artc-view--hall is-active"></div>' +
      '<div class="artc-view artc-view--grid">' +
        '<div class="artc-carousel" role="region" aria-roledescription="карусель" aria-label="Художники выставки" tabindex="0">' +
          '<button type="button" class="artc-arrow artc-arrow--prev" aria-label="Предыдущий художник">' + ARROW_L + '</button>' +
          '<div class="artc-carousel__viewport"><div class="artc-carousel__track"></div></div>' +
          '<button type="button" class="artc-arrow artc-arrow--next" aria-label="Следующий художник">' + ARROW_R + '</button>' +
          '<div class="artc-dots" role="tablist" aria-label="Перейти к художнику"></div>' +
        '</div>' +
      '</div>';
    r.appendChild(wrap);
    this.wrap = wrap;

    var track = wrap.querySelector('.artc-carousel__track');
    var dots = wrap.querySelector('.artc-dots');
    var self = this;

    this.artists.forEach(function (a, i) {
      var card = el('div', 'artc-card');
      card.innerHTML =
        '<button type="button" class="artc-card__inner" data-artist="' + i + '">' +
          '<span class="artc-card__cover">' + pictureHTML(self.url(a.works[0].thumb), 'Работа: ' + (a.works[0].title || a.name), i >= 3) + '</span>' +
          '<span class="artc-card__meta">' +
            '<span class="artc-card__ava">' + pictureHTML(self.url(a.avatar), a.name, i >= 3) + '</span>' +
            '<span><span class="artc-card__name">' + esc(a.name) + '</span>' +
            '<span class="artc-card__city">' + esc(a.city) + '</span></span>' +
          '</span>' +
        '</button>';
      track.appendChild(card);

      var dot = el('button', 'artc-dot');
      dot.type = 'button';
      dot.setAttribute('aria-label', a.name);
      dot.addEventListener('click', function () { self.goTo(i); });
      dots.appendChild(dot);
    });

    track.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-artist]');
      if (btn) self.openArtist(+btn.getAttribute('data-artist'));
    });

    wrap.querySelector('.artc-arrow--prev').addEventListener('click', function () { self.goTo(self.index - 1); });
    wrap.querySelector('.artc-arrow--next').addEventListener('click', function () { self.goTo(self.index + 1); });

    var carousel = wrap.querySelector('.artc-carousel');
    carousel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { self.goTo(self.index - 1); e.preventDefault(); }
      if (e.key === 'ArrowRight') { self.goTo(self.index + 1); e.preventDefault(); }
    });

    this.bindSwipe(wrap.querySelector('.artc-carousel__viewport'));

    // переключатель «зал / каталог»
    wrap.querySelector('.artc-views').addEventListener('click', function (e) {
      var b = e.target.closest('[data-view]');
      if (b) self.switchView(b.getAttribute('data-view'));
    });

    var resizeT = null;
    window.addEventListener('resize', function () {
      self.goTo(self.index, true);
      clearTimeout(resizeT);
      resizeT = setTimeout(function () { self.buildHall(true); }, 260);
    });

    this.buildModals();
    this.goTo(0, true);
    this.buildHall();
  };

  Widget.prototype.switchView = function (view) {
    var wrap = this.wrap;
    var btns = wrap.querySelectorAll('.artc-views__btn');
    for (var i = 0; i < btns.length; i++) {
      var on = btns[i].getAttribute('data-view') === view;
      btns[i].classList.toggle('is-active', on);
      btns[i].setAttribute('aria-selected', on ? 'true' : 'false');
    }
    wrap.querySelector('.artc-view--hall').classList.toggle('is-active', view === 'hall');
    wrap.querySelector('.artc-view--grid').classList.toggle('is-active', view !== 'hall');
    if (view === 'hall') this.buildHall(true);
    else this.goTo(this.index, true);
  };

  /* ---------------- карусель ---------------- */

  Widget.prototype.perView = function () {
    var v = getComputedStyle(this.wrap).getPropertyValue('--artc-per-view');
    return Math.max(1, parseInt(v, 10) || 1);
  };

  Widget.prototype.goTo = function (i, instant) {
    var n = this.artists.length;
    if (!n) return;
    this.index = ((i % n) + n) % n; // зацикливание
    var track = this.wrap.querySelector('.artc-carousel__track');
    // не оставлять пустоту справа, когда видны последние карточки
    var maxStart = Math.max(0, n - this.perView());
    var offset = Math.min(this.index, maxStart);
    if (instant) track.style.transition = 'none';
    track.style.transform = 'translateX(' + (-offset * 100 / this.perView()) + '%)';
    if (instant) { void track.offsetWidth; track.style.transition = ''; }

    var dots = this.wrap.querySelectorAll('.artc-dot');
    for (var d = 0; d < dots.length; d++) dots[d].classList.toggle('is-active', d === this.index);
  };

  Widget.prototype.bindSwipe = function (zone) {
    var self = this, x0 = null, y0 = null;
    zone.addEventListener('pointerdown', function (e) { x0 = e.clientX; y0 = e.clientY; });
    zone.addEventListener('pointerup', function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0, dy = e.clientY - y0;
      x0 = y0 = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        self.goTo(self.index + (dx < 0 ? 1 : -1));
      }
    });
    zone.addEventListener('pointercancel', function () { x0 = y0 = null; });
  };

  /* ==================== виртуальный зал ==================== */

  /* Геометрия: камера смотрит вдоль оси Z в глубину (−Z).
     Мир сдвигается на +camZ, то есть «идти вперёд» = увеличивать camZ.
     Работы висят на боковых стенах, слегка развёрнутые внутрь зала,
     чтобы читались и в движении, и издалека.                       */

  var WALL_TURN = 62;   // разворот полотна относительно стены, градусы
  var VIEW_DIST = 620;  // с какого расстояния камера смотрит на комнату

  Widget.prototype.buildHall = function (rebuild) {
    var host = this.wrap.querySelector('.artc-view--hall');
    if (!host) return;
    if (this.hall && this.hall.offKey) this.hall.offKey();
    var keep = rebuild && this.hall ? this.hall.progress : 0;

    host.innerHTML =
      '<div class="artc-stage" tabindex="0" role="application" ' +
           'aria-label="Виртуальный зал выставки: перемещение стрелками, полотна открываются нажатием">' +
        '<div class="artc-scene">' +
          '<div class="artc-camera"><div class="artc-world">' +
            '<div class="artc-floor"></div><div class="artc-ceil"></div>' +
            '<div class="artc-wall artc-wall--l"></div><div class="artc-wall artc-wall--r"></div>' +
            '<div class="artc-end">' + pictureHTML(this.base + 'img/logo.webp', 'АРТ Ростов', false) +
              '<span>Все грани искусства</span></div>' +
          '</div></div>' +
        '</div>' +
        '<div class="artc-dust" aria-hidden="true"></div>' +
        '<div class="artc-vignette" aria-hidden="true"></div>' +
        '<div class="artc-curtain" aria-hidden="true"></div>' +
        '<p class="artc-hint">' + ICON_WALK + '<span>' + (window.innerWidth < 700
          ? 'Проведите пальцем, чтобы пройти по залу'
          : 'Идите по залу: перетаскивайте, крутите колесо или жмите <b>W</b>/<b>S</b>') + '</span></p>' +
        '<div class="artc-hud">' +
          '<div class="artc-hud__row">' +
            '<button type="button" class="artc-walk artc-walk--back" aria-label="Шаг назад">' + ARROW_DOWN + '</button>' +
            '<span class="artc-progress"><i></i></span>' +
            '<button type="button" class="artc-walk artc-walk--fwd" aria-label="Шаг вперёд">' + ARROW_UP + '</button>' +
          '</div>' +
          '<div class="artc-rooms"></div>' +
        '</div>' +
      '</div>';

    var stage = host.querySelector('.artc-stage');
    var cs = getComputedStyle(stage);
    var px = function (name, fallback) {
      var v = parseFloat(cs.getPropertyValue(name));
      return isNaN(v) ? fallback : v;
    };

    var STEP = px('--step', 780);
    var HW = px('--hw', 470);
    var HH = px('--hh', 330);
    var ARTH = px('--art-h', 268);
    var GAP = Math.round(STEP * 1.35);
    var viewDist = window.innerWidth < 700 ? Math.round(VIEW_DIST * 0.62) : VIEW_DIST;
    var START = Math.round(STEP * 1.1);

    var world = host.querySelector('.artc-world');
    var self = this;
    var arts = [];
    var rooms = [];
    var z = -START;

    this.artists.forEach(function (a, ai) {
      var slots = Math.ceil(a.works.length / 2);
      var roomStart = z;
      var roomEntry = z + Math.round(GAP * 0.42);

      a.works.forEach(function (w, wi) {
        var left = wi % 2 === 0;
        var slot = Math.floor(wi / 2);
        var artZ = roomStart - slot * STEP;
        // ширина полотна — по реальным пропорциям работы
        var ratio = (w.w && w.h) ? w.w / w.h : 1;
        var aw = Math.round(Math.min(ARTH * 1.55, Math.max(ARTH * 0.62, ARTH * ratio)));
        var x = (HW - 62) * (left ? -1 : 1);
        var turn = left ? WALL_TURN : -WALL_TURN;

        var b = el('button', 'artc-art');
        b.type = 'button';
        b.style.setProperty('--aw', aw + 'px');
        b.style.setProperty('--d', (200 + wi * 90 + ai * 40) + 'ms');
        b.style.transform = 'translate(-50%, -50%) translate3d(' + x + 'px, -20px, ' + artZ + 'px) rotateY(' + turn + 'deg)';
        b.setAttribute('data-artist', ai);
        b.setAttribute('data-z', artZ);
        b.setAttribute('aria-label', 'Открыть карточку художника: ' + a.name +
          (w.title ? ', работа «' + w.title + '»' : ''));
        b.innerHTML =
          '<span class="artc-art__spot"></span>' +
          '<span class="artc-art__frame">' +
            '<img src="' + BLANK + '" data-src="' + esc(self.url(w.medium).replace(/\.webp$/, '.jpg')) + '" ' +
              'data-webp="' + esc(self.url(w.medium)) + '" alt="' +
              esc((w.title || 'Работа') + ' — ' + a.name) + '">' +
          '</span>' +
          '<span class="artc-art__plaque">' +
            '<span class="artc-art__ava">' + pictureHTML(self.url(a.avatar), a.name, true) + '</span>' +
            '<span class="artc-art__meta">' +
              '<span class="artc-art__title">' + esc(w.title || 'Без названия') + '</span>' +
              '<span class="artc-art__author">' + esc(a.name) + '</span>' +
            '</span>' +
          '</span>';
        world.appendChild(b);
        arts.push(b);
      });

      // имя художника — на левой стене, город — на правой
      var sign = el('div', 'artc-sign');
      sign.innerHTML = esc(a.name.split(' ').slice(0, 2).join(' '));
      sign.style.transform = 'translate(-50%, -50%) translate3d(' + (-HW + 4) + 'px, ' +
        (-HH + 96) + 'px, ' + roomEntry + 'px) rotateY(90deg)';
      world.appendChild(sign);

      var sign2 = el('div', 'artc-sign');
      sign2.innerHTML = '<small>' + esc(a.city) + '</small>';
      sign2.style.transform = 'translate(-50%, -50%) translate3d(' + (HW - 4) + 'px, ' +
        (-HH + 104) + 'px, ' + roomEntry + 'px) rotateY(-90deg)';
      world.appendChild(sign2);

      rooms.push({ name: a.name, z: -roomStart - viewDist });
      z = roomStart - (slots - 1) * STEP - GAP;
    });

    var len = Math.abs(z) + START;
    var SEG = Math.round(STEP * 4.2);   // длина «движущегося» куска зала (кратно шагу — стык незаметен)
    stage.style.setProperty('--len', len + 'px');
    stage.style.setProperty('--seg', SEG + 'px');

    // пылинки в лучах света
    if (!prefersReducedMotion()) {
      var dust = host.querySelector('.artc-dust');
      var html = '';
      for (var i = 0; i < 18; i++) {
        html += '<i style="left:' + (Math.random() * 100).toFixed(1) + '%;top:' +
          (30 + Math.random() * 70).toFixed(1) + '%;animation-duration:' +
          (9 + Math.random() * 11).toFixed(1) + 's;animation-delay:-' +
          (Math.random() * 12).toFixed(1) + 's"></i>';
      }
      dust.innerHTML = html;
    }

    // кнопки перехода по «залам» художников
    var roomsBox = host.querySelector('.artc-rooms');
    rooms.forEach(function (room, i) {
      var b = el('button', 'artc-rooms__btn');
      b.type = 'button';
      b.textContent = shortName(room.name);
      b.title = room.name;
      b.addEventListener('click', function () { self.walkTo(room.z); });
      roomsBox.appendChild(b);
    });

    this.hall = {
      host: host, stage: stage, world: world,
      camera: host.querySelector('.artc-camera'),
      arts: arts, rooms: rooms, roomBtns: roomsBox.children,
      step: STEP, len: len, seg: SEG, hw: HW, hh: HH,
      floor: host.querySelector('.artc-floor'), ceil: host.querySelector('.artc-ceil'),
      wallL: host.querySelector('.artc-wall--l'), wallR: host.querySelector('.artc-wall--r'),
      segZ: null,
      maxZ: Math.max(0, len - Math.round(STEP * 0.9)),
      camZ: 0, targetZ: 0, bob: 0, yaw: 0, pitch: 0,
      progress: 0, moving: false, t0: Date.now()
    };

    // «влёт» в зал при первом открытии
    var startAt = rooms.length ? rooms[0].z : 0;
    if (rebuild) {
      this.hall.camZ = this.hall.targetZ = keep * this.hall.maxZ;
    } else {
      this.hall.camZ = startAt - 900;
      this.hall.targetZ = startAt;
    }

    this.bindHall();
    this.hallLoop();
  };

  Widget.prototype.bindHall = function () {
    var h = this.hall, self = this;
    var stage = h.stage;

    stage.querySelector('.artc-walk--fwd').addEventListener('click', function () { self.walkBy(h.step); });
    stage.querySelector('.artc-walk--back').addEventListener('click', function () { self.walkBy(-h.step); });

    stage.addEventListener('wheel', function (e) {
      if (Math.abs(e.deltaY) < 2) return;
      e.preventDefault();
      self.walkBy(e.deltaY * 1.6);
    }, { passive: false });

    stage.addEventListener('keydown', function (e) {
      var k = e.key;
      if (k === 'ArrowUp' || k === 'ArrowRight') { self.walkBy(h.step); e.preventDefault(); }
      if (k === 'ArrowDown' || k === 'ArrowLeft') { self.walkBy(-h.step); e.preventDefault(); }
    });

    stage.addEventListener('pointerenter', function () { h.hover = true; });
    stage.addEventListener('pointerleave', function () { h.hover = false; });

    // W/S — пока курсор над залом; стрелки не трогаем, ими листают страницу
    var onKey = function (e) {
      if (!h.hover || !h.host.classList.contains('is-active')) return;
      if (document.querySelector('.artc-modal.is-open')) return;
      var t = (e.target.tagName || '').toLowerCase();
      if (t === 'input' || t === 'textarea' || t === 'select') return;
      var k = e.key.toLowerCase();
      if (k === 'w' || k === 'ц') { self.walkBy(h.step); e.preventDefault(); }
      if (k === 's' || k === 'ы') { self.walkBy(-h.step); e.preventDefault(); }
    };
    document.addEventListener('keydown', onKey);
    h.offKey = function () { document.removeEventListener('keydown', onKey); };

    // перетаскивание / свайп: тянем «на себя» — идём вперёд
    var drag = null;
    stage.addEventListener('pointerdown', function (e) {
      if (e.target.closest('.artc-hud, .artc-rooms')) return;
      drag = {
        x: e.clientX, y: e.clientY, z: h.targetZ, moved: 0, id: e.pointerId,
        art: e.target.closest('.artc-art')
      };
      stage.classList.add('is-grabbing');
      // после первого касания зал слушает стрелки, не дёргая прокрутку страницы
      try { stage.focus({ preventScroll: true }); } catch (err) { stage.focus(); }
      if (stage.setPointerCapture) { try { stage.setPointerCapture(e.pointerId); } catch (err2) {} }
    });
    stage.addEventListener('pointermove', function (e) {
      if (!drag) {
        self.hallParallax(e);
        return;
      }
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      drag.moved = Math.max(drag.moved, Math.abs(dx), Math.abs(dy));
      var d = Math.abs(dy) > Math.abs(dx) ? dy : -dx;
      self.walkTo(drag.z + d * 2.4, true);
    });
    var endDrag = function (open) {
      if (drag && stage.releasePointerCapture) { try { stage.releasePointerCapture(drag.id); } catch (err) {} }
      // короткое нажатие по полотну (без протяжки) — открываем карточку.
      // Именно pointerup, а не click: при захвате указателя click приходит
      // на саму сцену, и полотно в нём уже не определить.
      if (open && drag && drag.art && drag.moved <= 8) self.openArt(drag.art);
      drag = null;
      stage.classList.remove('is-grabbing');
    };
    stage.addEventListener('pointerup', function () { endDrag(true); });
    stage.addEventListener('pointercancel', function () { endDrag(false); });
    stage.addEventListener('pointerleave', function () {
      h.yaw = 0; h.pitch = 0;
      h.camera.style.transform = '';
    });

    // клавиатура: Enter/Space на полотне (у таких click.detail === 0)
    stage.addEventListener('click', function (e) {
      var art = e.target.closest('.artc-art');
      if (art && e.detail === 0) self.openArt(art);
    });
  };

  /* подходим к полотну и открываем карточку его автора */
  Widget.prototype.openArt = function (art) {
    this.walkTo(-parseFloat(art.getAttribute('data-z')) - VIEW_DIST * 0.8);
    this.openArtist(+art.getAttribute('data-artist'));
  };

  Widget.prototype.hallParallax = function (e) {
    var h = this.hall;
    if (!h || prefersReducedMotion() || window.innerWidth < 720) return;
    var r = h.stage.getBoundingClientRect();
    h.yaw = ((e.clientX - r.left) / r.width - 0.5) * -7;
    h.pitch = ((e.clientY - r.top) / r.height - 0.5) * 3.2;
    h.camera.style.transform = 'rotateY(' + h.yaw.toFixed(2) + 'deg) rotateX(' + h.pitch.toFixed(2) + 'deg)';
  };

  Widget.prototype.walkBy = function (dz) { this.walkTo(this.hall.targetZ + dz); };

  Widget.prototype.walkTo = function (z, silent) {
    var h = this.hall;
    if (!h) return;
    h.targetZ = Math.max(-200, Math.min(h.maxZ, z));
    h.moving = true;
    this.hideHint();
  };

  Widget.prototype.hideHint = function () {
    var hint = this.hall && this.hall.stage.querySelector('.artc-hint');
    if (hint && !hint.classList.contains('is-hidden')) hint.classList.add('is-hidden');
  };

  Widget.prototype.hallLoop = function () {
    var self = this;
    var h = this.hall;
    if (h.raf) cancelAnimationFrame(h.raf);

    var frame = function () {
      var hall = self.hall;
      if (!hall || !document.body.contains(hall.stage)) return;
      hall.raf = requestAnimationFrame(frame);

      // зал скрыт (открыт «Каталог») — не тратим кадры
      if (!hall.host.classList.contains('is-active')) return;

      // шаг сглаживания не зависит от частоты кадров
      var now = (window.performance && performance.now) ? performance.now() : Date.now();
      var dt = Math.min(4, Math.max(0.2, (now - (hall.last || now)) / 16.67));
      hall.last = now;

      var d = hall.targetZ - hall.camZ;
      if (Math.abs(d) > 0.4) {
        hall.camZ += d * (1 - Math.pow(1 - 0.085, dt));
        hall.moving = true;
      } else if (hall.moving) {
        hall.camZ = hall.targetZ;
        hall.moving = false;
      }

      // покачивание шага
      var speed = Math.min(1, Math.abs(d) / 400);
      hall.bob += speed * 0.12 * dt;
      var bobY = prefersReducedMotion() ? 0 : Math.sin(hall.bob) * 5.5 * speed;

      hall.world.style.transform = 'translate3d(0,' + bobY.toFixed(2) + 'px,' + hall.camZ.toFixed(2) + 'px)';

      self.hallUpdate();
      return;
    };
    h.raf = requestAnimationFrame(frame);
  };

  /* подгрузка полотен по мере приближения + состояние HUD */
  Widget.prototype.hallUpdate = function () {
    var h = this.hall;
    var p = h.maxZ ? Math.max(0, Math.min(1, h.camZ / h.maxZ)) : 0;
    if (Math.abs(p - h.progress) > 0.002) {
      h.progress = p;
      var bar = h.stage.querySelector('.artc-progress i');
      if (bar) bar.style.width = (p * 100).toFixed(1) + '%';
    }

    // пол, потолок и стены — короткий сегмент, едущий за камерой:
    // рисовать зал целиком (тысячи пикселей в глубину) слишком дорого
    var anchor = -Math.round((h.camZ + h.seg * 0.16) / h.step) * h.step;
    if (anchor !== h.segZ) {
      h.segZ = anchor;
      var base = 'translate(-50%, -50%) translate3d(';
      h.floor.style.transform = base + '0px, ' + h.hh + 'px, ' + anchor + 'px) rotateX(90deg)';
      h.ceil.style.transform = base + '0px, ' + (-h.hh) + 'px, ' + anchor + 'px) rotateX(-90deg)';
      h.wallL.style.transform = base + (-h.hw) + 'px, 0px, ' + anchor + 'px) rotateY(90deg)';
      h.wallR.style.transform = base + h.hw + 'px, 0px, ' + anchor + 'px) rotateY(-90deg)';
    }

    // полотна: подгружаем и показываем только те, что рядом с камерой
    for (var i = 0; i < h.arts.length; i++) {
      var art = h.arts[i];
      var dz = +art.getAttribute('data-z') + h.camZ;
      var near = dz > -3000 && dz < 900;
      if (near !== art.shown) {
        art.shown = near;
        art.style.visibility = near ? '' : 'hidden';
      }
      if (art.loaded || !near) continue;
      var img = art.querySelector('img[data-webp]');
      if (!img) { art.loaded = true; continue; }
      img.onerror = function () { this.onerror = null; this.src = this.getAttribute('data-src'); };
      img.src = img.getAttribute('data-webp') || img.getAttribute('data-src');
      art.loaded = true;
    }

    // подсветка текущего «зала» художника
    var near = 0, best = 1e9;
    for (var r = 0; r < h.rooms.length; r++) {
      var dist = Math.abs(h.rooms[r].z - h.camZ);
      if (dist < best) { best = dist; near = r; }
    }
    if (near !== h.nearRoom) {
      h.nearRoom = near;
      for (var b = 0; b < h.roomBtns.length; b++) {
        h.roomBtns[b].classList.toggle('is-current', b === near);
      }
    }

    var fwd = h.stage.querySelector('.artc-walk--fwd');
    var back = h.stage.querySelector('.artc-walk--back');
    if (fwd) fwd.disabled = h.targetZ >= h.maxZ - 1;
    if (back) back.disabled = h.targetZ <= -199;
  };

  /* ---------------- модальные окна: каркас ---------------- */

  Widget.prototype.buildModals = function () {
    var self = this;

    this.artistModal = el('div', 'artc-modal artc-root');
    this.artistModal.setAttribute('role', 'dialog');
    this.artistModal.setAttribute('aria-modal', 'true');
    this.artistModal.style.background = 'rgba(28,22,12,.6)';

    this.lightbox = el('div', 'artc-modal artc-lightbox artc-root');
    this.lightbox.setAttribute('role', 'dialog');
    this.lightbox.setAttribute('aria-modal', 'true');
    this.lightbox.setAttribute('aria-label', 'Просмотр работы');

    this.formModal = el('div', 'artc-modal artc-form-modal artc-root');
    this.formModal.setAttribute('role', 'dialog');
    this.formModal.setAttribute('aria-modal', 'true');
    this.formModal.setAttribute('aria-label', 'Заявка на покупку');

    // .artc-root у модалок используется только ради css-переменных — фон и отступы сбрасываем
    [this.artistModal, this.lightbox, this.formModal].forEach(function (m) {
      m.style.padding = '';
      m.style.borderRadius = '0';
      m.style.overflow = 'auto';
      document.body.appendChild(m);
      trapFocus(m);
      m.addEventListener('click', function (e) { if (e.target === m) self.closeModal(m); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (self.formModal.classList.contains('is-open')) self.closeModal(self.formModal);
        else if (self.lightbox.classList.contains('is-open')) self.closeModal(self.lightbox);
        else if (self.artistModal.classList.contains('is-open')) self.closeModal(self.artistModal);
      }
      if (self.lightbox.classList.contains('is-open') && !self.formModal.classList.contains('is-open')) {
        if (e.key === 'ArrowLeft') self.openWork(self.workIdx - 1);
        if (e.key === 'ArrowRight') self.openWork(self.workIdx + 1);
      } else if (self.artistModal.classList.contains('is-open') && !self.formModal.classList.contains('is-open')) {
        if (e.key === 'ArrowLeft') self.openArtist(self.artistIdx - 1);
        if (e.key === 'ArrowRight') self.openArtist(self.artistIdx + 1);
      }
    });
  };

  Widget.prototype.openModal = function (m) {
    if (!m.classList.contains('is-open')) {
      this.lastFocus = this.lastFocus || document.activeElement;
      m.classList.add('is-open');
    }
    if (!document.body.hasAttribute('data-artc-lock')) {
      document.body.setAttribute('data-artc-lock', document.body.style.overflow || '');
      document.body.style.overflow = 'hidden';
    }
    var c = m.querySelector('.artc-modal__close');
    if (c) c.focus();
  };

  Widget.prototype.closeModal = function (m) {
    m.classList.remove('is-open');
    var anyOpen = document.querySelector('.artc-modal.is-open');
    if (!anyOpen) {
      document.body.style.overflow = document.body.getAttribute('data-artc-lock') || '';
      document.body.removeAttribute('data-artc-lock');
      if (this.lastFocus) { try { this.lastFocus.focus(); } catch (e) {} }
      this.lastFocus = null;
    }
  };

  /* ---------------- карточка художника ---------------- */

  Widget.prototype.openArtist = function (i) {
    var n = this.artists.length;
    this.artistIdx = ((i % n) + n) % n;
    var a = this.artists[this.artistIdx];
    var self = this;

    var linksHTML = (a.links || []).map(function (l) {
      return '<li><a href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer">' + esc(l.label) + '</a></li>';
    }).join('');

    var worksHTML = a.works.map(function (w, wi) {
      return '<button type="button" class="artc-work" data-work="' + wi + '" ' +
        'aria-label="Открыть работу' + (w.title ? ': ' + esc(w.title) : '') + '">' +
        pictureHTML(self.url(w.medium), (w.title || 'Работа') + ' — ' + a.name, true) +
        (w.title ? '<span class="artc-work__title">' + esc(w.title) + '</span>' : '') +
        '</button>';
    }).join('');

    this.artistModal.innerHTML =
      '<div class="artc-modal__dialog">' +
        '<button type="button" class="artc-modal__close" aria-label="Закрыть">&#10005;</button>' +
        '<div class="artc-artist">' +
          '<div class="artc-artist__head">' +
            '<div class="artc-artist__ava">' + pictureHTML(this.url(a.avatar), a.name, false) + '</div>' +
            '<div><h3 class="artc-artist__name">' + esc(a.name) + '</h3>' +
            '<span class="artc-artist__city">' + esc(a.city) + '</span></div>' +
          '</div>' +
          '<p class="artc-artist__bio is-clamped">' + esc(a.bio) + '</p>' +
          '<button type="button" class="artc-more">Читать полностью</button>' +
          (linksHTML ? '<ul class="artc-links">' + linksHTML + '</ul>' : '') +
          '<div class="artc-works">' + worksHTML + '</div>' +
          '<div class="artc-artist__foot">' +
            '<button type="button" class="artc-buy">Хочу купить картину</button>' +
            '<div class="artc-artist__nav">' +
              '<button type="button" class="artc-arrow" data-nav="-1" aria-label="Предыдущий художник">' + ARROW_L + '</button>' +
              '<button type="button" class="artc-arrow" data-nav="1" aria-label="Следующий художник">' + ARROW_R + '</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    var dlg = this.artistModal;
    dlg.querySelector('.artc-modal__close').addEventListener('click', function () { self.closeModal(dlg); });

    var bio = dlg.querySelector('.artc-artist__bio');
    var more = dlg.querySelector('.artc-more');
    // кнопка «Читать полностью» нужна только если текст реально обрезан
    requestAnimationFrame(function () {
      if (bio.scrollHeight <= bio.clientHeight + 4) more.style.display = 'none';
    });
    more.addEventListener('click', function () {
      var clamped = bio.classList.toggle('is-clamped');
      more.textContent = clamped ? 'Читать полностью' : 'Свернуть';
    });

    dlg.querySelector('.artc-works').addEventListener('click', function (e) {
      var b = e.target.closest('[data-work]');
      if (b) self.openWork(+b.getAttribute('data-work'));
    });
    dlg.querySelector('.artc-buy').addEventListener('click', function () { self.openForm(a, null); });
    dlg.querySelectorAll('[data-nav]').forEach(function (b) {
      b.addEventListener('click', function () { self.openArtist(self.artistIdx + (+b.getAttribute('data-nav'))); });
    });

    this.openModal(dlg);
    dlg.scrollTop = 0;
  };

  /* ---------------- лайтбокс ---------------- */

  Widget.prototype.openWork = function (wi) {
    var a = this.artists[this.artistIdx];
    var n = a.works.length;
    this.workIdx = ((wi % n) + n) % n;
    var w = a.works[this.workIdx];
    var self = this;
    var caption = (w.title ? '«' + esc(w.title) + '» — ' : '') + esc(a.name) +
      ' &middot; ' + (this.workIdx + 1) + ' / ' + n;

    this.lightbox.innerHTML =
      '<div class="artc-lightbox__stage">' +
        '<button type="button" class="artc-modal__close" aria-label="Закрыть">&#10005;</button>' +
        '<button type="button" class="artc-arrow artc-arrow--prev" aria-label="Предыдущая работа">' + ARROW_L + '</button>' +
        '<picture>' +
          '<source srcset="' + esc(this.url(w.full)) + '" type="image/webp">' +
          '<img class="artc-lightbox__img" src="' + esc(this.url(w.full).replace(/\.webp$/, '.jpg')) + '" ' +
            'alt="' + esc((w.title || 'Работа') + ' — ' + a.name) + '">' +
        '</picture>' +
        '<button type="button" class="artc-arrow artc-arrow--next" aria-label="Следующая работа">' + ARROW_R + '</button>' +
        '<p class="artc-lightbox__caption">' + caption + '</p>' +
        '<button type="button" class="artc-buy">Хочу купить картину</button>' +
      '</div>';

    var lb = this.lightbox;
    lb.querySelector('.artc-modal__close').addEventListener('click', function () { self.closeModal(lb); });
    lb.querySelector('.artc-arrow--prev').addEventListener('click', function () { self.openWork(self.workIdx - 1); });
    lb.querySelector('.artc-arrow--next').addEventListener('click', function () { self.openWork(self.workIdx + 1); });
    lb.querySelector('.artc-buy').addEventListener('click', function () { self.openForm(a, w); });
    this.bindSwipeLightbox(lb.querySelector('.artc-lightbox__stage'));
    this.openModal(lb);
  };

  Widget.prototype.bindSwipeLightbox = function (zone) {
    var self = this, x0 = null;
    zone.addEventListener('pointerdown', function (e) { x0 = e.clientX; });
    zone.addEventListener('pointerup', function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 45) self.openWork(self.workIdx + (dx < 0 ? 1 : -1));
    });
  };

  /* ---------------- форма «Хочу купить» ---------------- */

  Widget.prototype.openForm = function (artist, work) {
    var self = this;

    // режим Tilda: заявку принимает попап-форма Tilda, а не наша модалка
    if (this.tildaPopup) {
      this.openTildaPopup(artist, work);
      return;
    }

    var what = work && work.title ? 'работу «' + esc(work.title) + '» художника' : 'работу художника';

    this.formModal.classList.remove('is-sent');
    this.formModal.innerHTML =
      '<div class="artc-modal__dialog">' +
        '<button type="button" class="artc-modal__close" aria-label="Закрыть">&#10005;</button>' +
        '<form class="artc-form" novalidate>' +
          '<h3 class="artc-form__title">Хочу купить картину</h3>' +
          '<p class="artc-form__hint">Вы хотите приобрести ' + what + ' <strong>' + esc(artist.name) + '</strong>. ' +
            'Оставьте контакты — организаторы выставки свяжутся с вами.</p>' +
          '<div class="artc-field">' +
            '<label for="artc-phone">Номер телефона *</label>' +
            '<input id="artc-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+7 (___) ___-__-__" required>' +
            '<span class="artc-field__err">Укажите телефон в формате +7 (XXX) XXX-XX-XX</span>' +
          '</div>' +
          '<div class="artc-field">' +
            '<label for="artc-email">Email *</label>' +
            '<input id="artc-email" name="email" type="email" autocomplete="email" placeholder="you@example.ru" required>' +
            '<span class="artc-field__err">Укажите корректный email</span>' +
          '</div>' +
          '<div class="artc-hp" aria-hidden="true">' +
            '<label>Не заполняйте это поле<input type="text" name="website" tabindex="-1" autocomplete="off"></label>' +
          '</div>' +
          '<label class="artc-consent">' +
            '<input type="checkbox" name="consent" required>' +
            '<span>Я соглашаюсь на <a href="' + esc(this.policy) + '" target="_blank" rel="noopener">обработку персональных данных</a></span>' +
          '</label>' +
          '<button type="submit" class="artc-buy">Отправить заявку</button>' +
          '<p class="artc-form__status" role="alert"></p>' +
        '</form>' +
        '<div class="artc-form__ok">' +
          '<div class="artc-form__ok-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>' +
          '<h3>Спасибо!</h3><p>Заявка отправлена. Мы свяжемся с вами в ближайшее время.</p>' +
        '</div>' +
      '</div>';

    var fm = this.formModal;
    fm.querySelector('.artc-modal__close').addEventListener('click', function () { self.closeModal(fm); });

    var phone = fm.querySelector('#artc-phone');
    phone.addEventListener('input', function () { phone.value = self.maskPhone(phone.value); });

    var form = fm.querySelector('form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      self.submitLead(form, artist, work);
    });

    // csrf-cookie выставляется GET-запросом к эндпоинту
    if (!this.demo) {
      fetch(this.endpoint, { credentials: 'same-origin' }).catch(function () {});
    }

    this.openModal(fm);
    phone.focus();
  };

  /* Tilda: подставить контекст в скрытые поля всех форм на странице
     (попап-форма Tilda присутствует в DOM ещё до открытия) и открыть попап */
  Widget.prototype.openTildaPopup = function (artist, work) {
    var fill = function (name, value) {
      var inputs = document.querySelectorAll(
        'form input[name="' + name + '"], .t-form input[name="' + name + '"]'
      );
      for (var i = 0; i < inputs.length; i++) inputs[i].value = value;
    };
    fill('artist', artist.name);
    fill('work', work ? (work.title || 'без названия') : '');

    // Tilda открывает попапы по клику на ссылку #popup:имя (обработчик делегированный)
    var a = document.createElement('a');
    a.href = '#' + this.tildaPopup;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.parentNode.removeChild(a);
    // запасной путь, если делегированный обработчик не сработал
    if (window.location.hash !== '#' + this.tildaPopup) {
      window.location.hash = this.tildaPopup;
    }
  };

  Widget.prototype.maskPhone = function (v) {
    var d = v.replace(/\D/g, '');
    if (d.charAt(0) === '8') d = '7' + d.slice(1);
    if (d.charAt(0) !== '7') d = '7' + d;
    d = d.slice(0, 11);
    var out = '+7';
    if (d.length > 1) out += ' (' + d.slice(1, 4);
    if (d.length >= 4) out += ') ' + d.slice(4, 7);
    if (d.length >= 7) out += '-' + d.slice(7, 9);
    if (d.length >= 9) out += '-' + d.slice(9, 11);
    return out;
  };

  Widget.prototype.submitLead = function (form, artist, work) {
    var self = this;
    var phone = form.querySelector('#artc-phone');
    var email = form.querySelector('#artc-email');
    var consent = form.querySelector('[name="consent"]');
    var status = form.querySelector('.artc-form__status');
    var ok = true;

    function mark(input, bad) {
      input.classList.toggle('is-invalid', bad);
      input.closest('.artc-field').classList.toggle('has-error', bad);
      if (bad) ok = false;
    }
    mark(phone, phone.value.replace(/\D/g, '').length !== 11);
    mark(email, !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim()));
    if (!consent.checked) { consent.focus(); ok = false; }
    if (!ok) return;

    var payload = {
      phone: phone.value.trim(),
      email: email.value.trim(),
      artist: artist.name,
      artist_id: artist.id,
      work: work ? (work.title || work.full) : '',
      page: location.href,
      website: form.querySelector('[name="website"]').value // honeypot
    };

    var btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<span class="artc-spin"></span>Отправляем…';
    status.classList.remove('is-error');

    var done = function () {
      self.formModal.classList.add('is-sent');
      setTimeout(function () {
        if (self.formModal.classList.contains('is-open')) self.closeModal(self.formModal);
      }, 4000);
    };
    var fail = function (msg) {
      btn.disabled = false;
      btn.textContent = 'Отправить заявку';
      status.textContent = msg || 'Не удалось отправить заявку. Попробуйте ещё раз или позвоните организаторам.';
      status.classList.add('is-error');
    };

    if (this.demo) {
      console.info('[artcatalog] demo lead:', payload);
      setTimeout(done, 700);
      return;
    }

    fetch(this.endpoint, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken')
      },
      body: JSON.stringify(payload)
    }).then(function (r) {
      if (r.ok) return r.json().then(done);
      if (r.status === 429) return fail('Слишком много заявок подряд. Пожалуйста, попробуйте позже.');
      return r.json().then(function (j) { fail(j.error); }, function () { fail(); });
    }).catch(function () { fail(); });
  };

  ready(function () {
    var root = document.getElementById(ROOT_ID);
    if (root) new Widget(root);
  });
})();
