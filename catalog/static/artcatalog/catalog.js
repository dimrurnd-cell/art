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

  var ICON_FS =
    '<svg class="artc-fs__enter" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M8 3H5a2 2 0 00-2 2v3M16 3h3a2 2 0 012 2v3M8 21H5a2 2 0 01-2-2v-3M16 21h3a2 2 0 002-2v-3"/></svg>' +
    '<svg class="artc-fs__exit" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M3 8h3a2 2 0 002-2V3M21 8h-3a2 2 0 01-2-2V3M3 16h3a2 2 0 012 2v3M21 16h-3a2 2 0 00-2 2v3"/></svg>';

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
        '<span class="artc-head__sub">Все грани искусства</span>' +
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
      resizeT = setTimeout(function () { self.refreshHall(); }, 260);
    });

    ['fullscreenchange', 'webkitfullscreenchange'].forEach(function (ev) {
      document.addEventListener(ev, function () { self.onFsChange(); });
    });

    this.buildModals();
    this.goTo(0, true);
    this.buildHall();
  };

  /* Перестраиваем зал только если сменился breakpoint (изменились размеры
     сцены в CSS). В полноэкранном режиме размеры те же, а пересоздание
     разметки выбросило бы страницу из полного экрана. */
  Widget.prototype.refreshHall = function () {
    var h = this.hall;
    if (!h || !h.stage || !document.body.contains(h.stage)) return;

    // в полноэкранном режиме не пересобираем зал ни при каких условиях:
    // разворот часто меняет ширину окна (а с ней и breakpoint), и замена
    // разметки тут же выбросила бы страницу из полного экрана
    if ((document.fullscreenElement || document.webkitFullscreenElement) || this.fsFake) {
      h.hitsPlaced = false;
      this.placeHits();
      return;
    }

    var cs = getComputedStyle(h.stage);
    var num = function (name, fallback) {
      var v = parseFloat(cs.getPropertyValue(name));
      return isNaN(v) ? fallback : v;
    };
    var same = num('--step', h.step) === h.step &&
               num('--hw', h.hw) === h.hw &&
               num('--hh', h.hh) === h.hh &&
               num('--art-h', h.artH) === h.artH;
    if (same) {
      h.hitsPlaced = false;
      this.placeHits();
      return;
    }
    this.buildHall(true);
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
    if (view === 'hall') this.refreshHall();
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

  /* Арт-объекты зала: рисованные силуэты, стоящие на полу у стен.
     Их немного — они задают масштаб и «обжитость», не отвлекая от работ. */
  var OBJECTS = [
    // ваза с цветами на низкой тумбе
    { w: 150, h: 250, svg:
      '<svg viewBox="0 0 150 250" xmlns="http://www.w3.org/2000/svg">' +
      '<g fill="none" stroke="#2E5B4C" stroke-width="3" stroke-linecap="round">' +
      '<path d="M75 118V64M75 96C62 90 55 78 56 66M75 92c12-6 19-17 18-30"/></g>' +
      '<g fill="#E4736F"><circle cx="75" cy="52" r="13"/><circle cx="53" cy="60" r="10"/>' +
      '<circle cx="96" cy="56" r="11"/></g>' +
      '<g fill="#F0B450"><circle cx="75" cy="52" r="5"/><circle cx="53" cy="60" r="4"/>' +
      '<circle cx="96" cy="56" r="4"/></g>' +
      '<path d="M58 118h34l7 46c1 12-7 22-24 22s-25-10-24-22z" fill="#3E7D95"/>' +
      '<path d="M58 118h34l-2 12H60z" fill="#34677B"/>' +
      '<rect x="44" y="186" width="62" height="10" rx="3" fill="#8B7448"/>' +
      '<rect x="50" y="196" width="50" height="46" fill="#A88F5E"/>' +
      '<rect x="44" y="240" width="62" height="8" rx="2" fill="#6E5A36"/></svg>' },
    // античный бюст на колонне — отсылка к фирменному стилю выставки
    { w: 132, h: 300, svg:
      '<svg viewBox="0 0 132 300" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M66 24c17 0 27 13 27 30 0 14-5 22-5 30 0 6 4 9 9 12 9 5 15 12 17 22H18' +
      'c2-10 8-17 17-22 5-3 9-6 9-12 0-8-5-16-5-30 0-17 10-30 27-30z" fill="#EFE9DC"/>' +
      '<path d="M66 24c17 0 27 13 27 30 0 14-5 22-5 30 0 6 4 9 9 12 9 5 15 12 17 22H66z"' +
      ' fill="#DED5C2"/>' +
      '<rect x="26" y="118" width="80" height="10" rx="3" fill="#CFC5B0"/>' +
      '<rect x="36" y="128" width="60" height="128" fill="#E3DAC7"/>' +
      '<path d="M36 128h12v128H36zM60 128h12v128H60zM84 128h12v128H84z" fill="#D2C7B0"/>' +
      '<rect x="26" y="256" width="80" height="12" rx="3" fill="#CFC5B0"/>' +
      '<rect x="20" y="268" width="92" height="24" rx="4" fill="#BFB49B"/></svg>' },
    // напольная ваза-амфора
    { w: 120, h: 230, svg:
      '<svg viewBox="0 0 120 230" xmlns="http://www.w3.org/2000/svg">' +
      '<g fill="none" stroke="#2E5B4C" stroke-width="3" stroke-linecap="round">' +
      '<path d="M60 92V40M60 70C48 64 42 52 44 40M60 66c12-6 18-18 16-30"/></g>' +
      '<g fill="#F0B450"><circle cx="60" cy="28" r="11"/><circle cx="42" cy="36" r="8"/>' +
      '<circle cx="78" cy="32" r="9"/></g>' +
      '<path d="M48 92h24c14 10 22 26 22 46 0 34-15 62-34 62s-34-28-34-62c0-20 8-36 22-46z"' +
      ' fill="#E4736F"/>' +
      '<path d="M60 92h12c14 10 22 26 22 46 0 34-15 62-34 62z" fill="#D55A56"/>' +
      '<rect x="44" y="86" width="32" height="9" rx="3" fill="#C9504C"/></svg>' }
  ];

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
            '<button type="button" class="artc-pad artc-pad--fwd" aria-label="Пройти вперёд">' +
              '<span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" ' +
              'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
              '<path d="M12 19V5M5 12l7-7 7 7"/></svg></span></button>' +
            '<button type="button" class="artc-pad artc-pad--back" aria-label="Вернуться назад">' +
              '<span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" ' +
              'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
              '<path d="M12 5v14M19 12l-7 7-7-7"/></svg></span></button>' +
          '</div></div>' +
        '</div>' +
        '<button type="button" class="artc-hit artc-hit--back" data-label="Назад"></button>' +
        '<button type="button" class="artc-hit artc-hit--fwd" data-label="Вперёд"></button>' +
        '<button type="button" class="artc-fs" aria-label="Открыть на весь экран">' + ICON_FS + '</button>' +
        '<div class="artc-dust" aria-hidden="true"></div>' +
        '<div class="artc-vignette" aria-hidden="true"></div>' +
        '<div class="artc-curtain" aria-hidden="true"></div>' +
        '<p class="artc-hint">' + ICON_WALK + '<span>' + (window.innerWidth < 700
          ? 'Проведите пальцем, чтобы пройти по залу'
          : 'Идите по залу: перетаскивайте, крутите колесо или жмите <b>W</b>/<b>S</b>') + '</span></p>' +
        '<div class="artc-hud">' +
          '<div class="artc-hud__row"><span class="artc-progress"><i></i></span></div>' +
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
    var SEG_HINT = Math.round(STEP * 4.6);
    var viewDist = window.innerWidth < 700 ? Math.round(VIEW_DIST * 0.62) : VIEW_DIST;
    var START = Math.round(STEP * 1.1);

    // ритм пилястр вдоль обеих стен (шаг совпадает с шагом полотен)
    var pil = '';
    for (var pi = 0; pi * STEP * 2 < SEG_HINT; pi++) {
      pil += '<i class="artc-pilaster" style="left:' + (pi * STEP * 2 - 21) + 'px"></i>';
    }
    host.querySelector('.artc-wall--l').innerHTML = pil;
    host.querySelector('.artc-wall--r').innerHTML = pil;

    var world = host.querySelector('.artc-world');
    var self = this;
    var arts = [];
    var rooms = [];
    var decor = [];
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
        // полотно развёрнуто внутрь зала, поэтому его дальний угол уходит
        // к стене на aw/2 * cos(угол) — отступаем ровно на эту глубину плюс запас,
        // иначе широкие работы врезаются в стену
        var sink = Math.round(aw / 2 * Math.cos(WALL_TURN * Math.PI / 180));
        var x = (HW - sink - 26) * (left ? -1 : 1);
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

      // между залами — по одному арт-объекту у стены, стороны чередуются
      if (ai < self.artists.length - 1) {
        var obj = OBJECTS[ai % OBJECTS.length];
        var side = ai % 2 === 0 ? 1 : -1;
        var ox = (HW - 132) * side;
        var oz = z + Math.round(GAP * 0.5);
        var scale = HH / 315 * 1.3;                  // объекты в масштабе зала
        var oh = Math.round(obj.h * scale);
        var ow = Math.round(obj.w * scale);

        var o = el('div', 'artc-object', obj.svg);
        o.style.setProperty('--ow', ow + 'px');
        o.style.setProperty('--ox', ox + 'px');
        o.style.setProperty('--oy', (HH - oh / 2) + 'px');
        o.style.setProperty('--oz', oz + 'px');
        o.style.transform = 'translate(-50%, -50%) translate3d(' + ox + 'px, ' +
          (HH - oh / 2) + 'px, ' + oz + 'px)';
        o.setAttribute('data-z', oz);
        world.appendChild(o);
        decor.push(o);

        var sh = el('div', 'artc-object-shadow');
        sh.style.setProperty('--sw', Math.round(ow * 1.15) + 'px');
        sh.style.transform = 'translate(-50%, -50%) translate3d(' + ox + 'px, ' +
          (HH - 2) + 'px, ' + oz + 'px) rotateX(90deg)';
        sh.setAttribute('data-z', oz);
        world.appendChild(sh);
        decor.push(sh);
      }
    });

    var len = Math.abs(z) + START;
    var SEG = SEG_HINT;   // длина «движущегося» куска зала (кратно шагу — стык незаметен)
    stage.style.setProperty('--len', len + 'px');
    stage.style.setProperty('--seg', SEG + 'px');

    // пылинки в лучах света
    if (!prefersReducedMotion()) {
      var dust = host.querySelector('.artc-dust');
      var html = '';
      for (var i = 0; i < 10; i++) {
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
      arts: arts, decor: decor, rooms: rooms, roomBtns: roomsBox.children,
      padF: host.querySelector('.artc-pad--fwd'), padB: host.querySelector('.artc-pad--back'),
      hitF: host.querySelector('.artc-hit--fwd'), hitB: host.querySelector('.artc-hit--back'),
      fsBtn: host.querySelector('.artc-fs'),
      step: STEP, len: len, seg: SEG, hw: HW, hh: HH, artH: ARTH,
      floor: host.querySelector('.artc-floor'), ceil: host.querySelector('.artc-ceil'),
      wallL: host.querySelector('.artc-wall--l'), wallR: host.querySelector('.artc-wall--r'),
      segZ: null,
      maxZ: Math.max(0, len - Math.round(STEP * 0.9)),
      camZ: 0, targetZ: 0, bob: 0, yaw: 0, pitch: 0,
      progress: 0, moving: false, hitsPlaced: false, t0: Date.now(),
      probeN: 0, probeT: 0, lite: false
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

    // шаг делается нажатием по широкой зоне, а стрелка на полу — её рисунок
    var bindHit = function (hit, dir, cls) {
      hit.addEventListener('click', function (e) { e.stopPropagation(); self.walkBy(h.step * dir); });
      hit.addEventListener('pointerenter', function () { stage.classList.add(cls); });
      hit.addEventListener('pointerleave', function () { stage.classList.remove(cls); });
    };
    bindHit(h.hitF, 1, 'hl-fwd');
    bindHit(h.hitB, -1, 'hl-back');

    h.fsBtn.addEventListener('click', function (e) { e.stopPropagation(); self.toggleFullscreen(); });

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
      if (e.target.closest('.artc-hud, .artc-rooms, .artc-pad, .artc-hit, .artc-fs')) return;
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

      // первые полторы секунды считаем кадры: на слабых устройствах
      // переводим зал в облегчённый режим, чтобы ходьба оставалась плавной
      if (!hall.lite && hall.probeN < 1e6) {
        if (!hall.probeT) hall.probeT = now;
        hall.probeN++;
        if (now - hall.probeT > 1500) {
          var fps = hall.probeN / (now - hall.probeT) * 1000;
          hall.probeN = 1e6;
          if (fps < 34) {
            hall.lite = true;
            hall.stage.classList.add('is-lite');
          }
        }
      }
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

      // когда камера стоит, сцену не трогаем совсем: лишняя запись
      // в transform заставляет браузер пересобирать весь зал каждый кадр
      var frameKey = bobY.toFixed(1) + '|' + hall.camZ.toFixed(1);
      if (frameKey === hall.frameKey) return;
      hall.frameKey = frameKey;

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

    // указатели лежат на полу и едут вместе с камерой
    var base3d = 'translate(-50%, -50%) translate3d(0px, ' + (h.hh - 3) + 'px, ';
    h.padF.style.transform = base3d + (-h.camZ - 700) + 'px) rotateX(90deg)';
    h.padB.style.transform = base3d + (-h.camZ - 320) + 'px) rotateX(90deg)';
    h.padF.classList.toggle('is-off', h.targetZ >= h.maxZ - 1);
    h.padB.classList.toggle('is-off', h.targetZ <= -199);
    h.hitF.classList.toggle('is-off', h.targetZ >= h.maxZ - 1);
    h.hitB.classList.toggle('is-off', h.targetZ <= -199);
    if (!h.hitsPlaced) this.placeHits();

    // арт-объекты рисуем только рядом с камерой
    for (var d = 0; d < h.decor.length; d++) {
      var o = h.decor[d];
      var odz = +o.getAttribute('data-z') + h.camZ;
      var oNear = odz > -3400 && odz < 700;
      if (oNear !== o.shown) {
        o.shown = oNear;
        o.style.visibility = oNear ? '' : 'hidden';
      }
    }
  };

  /* Зоны нажатия ставим по фактическому положению нарисованных стрелок:
     они всегда на одном расстоянии от камеры, поэтому на экране не смещаются
     и пересчитывать их нужно только при изменении размеров сцены. */
  Widget.prototype.placeHits = function () {
    var h = this.hall;
    if (!h) return;
    var st = h.stage.getBoundingClientRect();
    if (!st.width || !st.height) return;

    var put = function (hit, pad, padY, minH) {
      var r = pad.getBoundingClientRect();
      if (!r.width) return false;
      var cx = r.left + r.width / 2 - st.left;
      var cy = r.top + r.height / 2 - st.top;
      var w = Math.max(r.width * 1.4, st.width * 0.54);
      var hgt = Math.max(r.height * 2.6, minH);
      hit.style.left = Math.round(cx - w / 2) + 'px';
      hit.style.top = Math.round(cy - hgt / 2 + padY) + 'px';
      hit.style.width = Math.round(w) + 'px';
      hit.style.height = Math.round(hgt) + 'px';
      return true;
    };

    var okF = put(h.hitF, h.padF, -6, Math.max(72, st.height * 0.15));
    var okB = put(h.hitB, h.padB, 4, Math.max(84, st.height * 0.18));
    h.hitsPlaced = okF && okB;
  };

  Widget.prototype.toggleFullscreen = function () {
    var stage = this.hall && this.hall.stage;
    if (!stage) return;
    var self = this;
    var fsEl = document.fullscreenElement || document.webkitFullscreenElement;

    if (fsEl) {                                   // выходим из настоящего полноэкранного
      (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      // событие fullscreenchange приходит не во всех браузерах — сверяемся сами
      setTimeout(function () { self.onFsChange(); }, 400);
      return;
    }
    if (this.fsFake) {                            // выходим из запасного режима
      this.fsFallback(false);
      return;
    }

    var req = stage.requestFullscreen || stage.webkitRequestFullscreen;
    var fallback = function () { if (!self.fsFake) self.fsFallback(true); };
    if (!req) { fallback(); return; }             // iOS Safari: Fullscreen API нет
    try {
      var pr = req.call(stage);
      if (pr && pr.catch) pr.catch(fallback);     // запрет политикой страницы
    } catch (e) { fallback(); }
    // некоторые браузеры «принимают» запрос, но экран не разворачивают —
    // проверяем результат и в этом случае разворачиваем зал сами
    setTimeout(function () {
      var real = document.fullscreenElement || document.webkitFullscreenElement;
      if (!real && !self.fsFake) fallback();
    }, 450);
  };

  /* Запасной «во весь экран» для браузеров без Fullscreen API (iPhone) */
  Widget.prototype.fsFallback = function (on) {
    var stage = this.hall.stage;
    this.fsFake = on;
    stage.style.position = on ? 'fixed' : '';
    stage.style.inset = on ? '0' : '';
    stage.style.zIndex = on ? '99980' : '';
    stage.style.height = on ? '100%' : '';
    stage.style.maxWidth = on ? 'none' : '';
    stage.style.borderRadius = on ? '0' : '';
    document.body.style.overflow = on ? 'hidden' : '';
    this.onFsChange();
  };

  /* Смена полноэкранного режима: пересобираем геометрию под новый размер
     и переносим модальные окна внутрь развёрнутого элемента — иначе
     в полноэкранном режиме они просто не видны. */
  Widget.prototype.onFsChange = function () {
    var self = this;
    var stage = this.hall && this.hall.stage;
    if (!stage) return;
    var fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    var on = !!fsEl || !!this.fsFake;
    stage.classList.toggle('is-fs', on);
    stage.setAttribute('aria-label', on
      ? 'Виртуальный зал во весь экран'
      : 'Виртуальный зал выставки: перемещение стрелками, полотна открываются нажатием');
    this.fsBtnLabel(on);

    var host = fsEl || document.body;
    [this.artistModal, this.lightbox, this.formModal].forEach(function (m) {
      if (m && m.parentNode !== host) host.appendChild(m);
    });

    // зал не пересобираем: размеры зала заданы в единицах сцены и от размера
    // окна не зависят, а пересоздание разметки выбросило бы нас из полного экрана
    // Зал построен под размеры того breakpoint, в котором его собирали.
    // На время показа фиксируем их инлайн: разворот может изменить ширину
    // окна, и иначе ритм пола и пилястр разъехался бы с полотнами.
    var h = this.hall;
    ['--step', '--hw', '--hh', '--art-h'].forEach(function (name, i) {
      var val = [h.step, h.hw, h.hh, h.artH][i];
      if (on) stage.style.setProperty(name, val + 'px');
      else stage.style.removeProperty(name);
    });

    h.hitsPlaced = false;
    setTimeout(function () {
      self.placeHits();
      if (!on) self.refreshHall();   // размеры окна за время показа могли смениться
    }, 80);
  };

  Widget.prototype.fsBtnLabel = function (on) {
    var b = this.hall && this.hall.fsBtn;
    if (b) b.setAttribute('aria-label', on ? 'Выйти из полноэкранного режима' : 'Открыть на весь экран');
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
      if (e.key === 'Escape' && !document.querySelector('.artc-modal.is-open') && self.fsFake) {
        self.fsFallback(false);
        return;
      }
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
    var self = this;

    // Попап Tilda живёт в общем DOM страницы, а в полноэкранном режиме
    // браузер показывает только развёрнутый элемент — форма осталась бы
    // невидимой. Поэтому сначала сворачиваем зал, затем открываем форму.
    var fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    if (fsEl || this.fsFake) {
      this.toggleFullscreen();
      setTimeout(function () { self.openTildaPopup(artist, work); }, 320);
      return;
    }

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
