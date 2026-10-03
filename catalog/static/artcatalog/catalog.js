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

  /* Версия берётся из адреса самого скрипта (хеш коммита в CDN-ссылке) —
     помогает убедиться, какая сборка сейчас отдаётся страницей. */
  var SRC = (document.currentScript && document.currentScript.src) || '';
  var VERSION = ((SRC.match(/art@([0-9a-f]{7,40})/) || [])[1] || 'local').slice(0, 7);

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

  var ICON_TOUR =
    '<svg class="artc-tour__play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<path d="M8 5.2v13.6a1 1 0 001.53.85l10.6-6.8a1 1 0 000-1.7L9.53 4.35A1 1 0 008 5.2z"/></svg>' +
    '<svg class="artc-tour__stop" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<rect x="6" y="5" width="4.4" height="14" rx="1.2"/>' +
      '<rect x="13.6" y="5" width="4.4" height="14" rx="1.2"/></svg>';

  var ICON_FIND =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6"/></svg>';

  var ICON_FS =
    '<svg class="artc-fs__enter" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M8 3H5a2 2 0 00-2 2v3M16 3h3a2 2 0 012 2v3M8 21H5a2 2 0 01-2-2v-3M16 21h3a2 2 0 002-2v-3"/></svg>' +
    '<svg class="artc-fs__exit" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M3 8h3a2 2 0 002-2V3M21 8h-3a2 2 0 01-2-2V3M3 16h3a2 2 0 012 2v3M21 16h-3a2 2 0 00-2 2v3"/></svg>';

  var ICON_MUSIC =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
      'stroke-linejoin="round" aria-hidden="true"><path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/>' +
      '<circle cx="17" cy="16" r="3"/></svg>';

  // простой режим: плоский кадр; 3D: куб в перспективе
  var ICON_SIMPLE =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/></svg>';

  var ICON_3D =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/></svg>';

  var BLANK = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="4" height="3"%3E%3C/svg%3E';

  // Короткое имя для кнопок навигации: фамилия либо два первых слова.
  // У галерей отличается не первое слово, а то, что в кавычках
  // («Галерея «Меценат»» → «Меценат»), иначе все кнопки выйдут одинаковыми.
  function shortName(name) {
    var full = String(name);
    var quoted = full.match(/[«"']([^»"']{2,})[»"']/);
    var parts = (quoted ? quoted[1] : full).replace(/[«»"]/g, '').split(/\s+/);
    var s = parts[0] || '';
    if (s.length < 5 && parts[1]) s += ' ' + parts[1];
    return s.length > 16 ? s.slice(0, 15) + '…' : s;
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* Палец вместо мыши. По этому признаку показываем боковые стрелки обзора:
     мышью зал осматривают движением курсора, а пальцу нужны кнопки. */
  function isTouch() {
    return !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches) ||
           ('ontouchstart' in window && !window.matchMedia('(pointer: fine)').matches);
  }

  /* Телефон или планшет — считаем по самому экрану, а не по ширине окна.
     При развороте ширина становится «настольной» (844 у обычного телефона),
     и проверка по innerWidth перестаёт срабатывать ровно там, где беречь
     память нужнее всего: в горизонтальном полноэкранном режиме. */
  var handheld = null;
  function isHandheld() {
    if (handheld === null) {
      var side = Math.min(screen.width || 9999, screen.height || 9999);
      handheld = isTouch() && side <= 900;
    }
    return handheld;
  }

  /* ---------------- фокус-ловушка для модальных окон ---------------- */

  // пользуются ли клавиатурой: только тогда при открытии окна фокус (с
  // рамкой) ставится на крестик — после касания или мыши рамка выглядит сбоем
  var KBD = false;
  document.addEventListener('keydown', function (e) { if (e.key === 'Tab') KBD = true; }, true);
  document.addEventListener('pointerdown', function () { KBD = false; }, true);

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
    this.ticketUrl = root.getAttribute('data-ticket-url') || '#';
    // data-curator: адрес куратора на сервере (…/api/artcatalog/curator/); без него — готовые ответы
    this.curatorUrl = (root.getAttribute('data-curator') || '').replace(/\/?$/, '/').replace(/^\/$/, '');
    this.curatorName = root.getAttribute('data-curator-name') || '';
    // data-live: адрес службы онлайн-режима (…/api/artcatalog/live/); без него режима нет
    this.liveUrl = (root.getAttribute('data-live') || '').replace(/\/?$/, '/').replace(/^\/$/, '');
    // data-privacy: страница «Политика обработки персональных данных» — ссылка у согласия в онлайн-режиме
    var priv = root.getAttribute('data-privacy') || '';
    this.privacyUrl = /^https?:\/\//i.test(priv) ? priv : '';
    // data-hall: "webgl" | "css" | "" (сам решит по устройству)
    this.hallMode = root.getAttribute('data-hall') || '';
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
    var linked = function (file) {
      for (var i = 0; i < links.length; i++) {
        if ((links[i].getAttribute('href') || '').indexOf(file) !== -1) return true;
      }
      return false;
    };

    // сборка «всё в одном» уже содержит и стили зала, и шрифт
    if (linked('catalog-standalone.css')) return;

    ['catalog.css', 'hall.css'].forEach(function (file) {
      if (linked(file)) return;
      var l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = self.base + file;
      (document.head || document.documentElement).appendChild(l);
    });
  };

  Widget.prototype.init = function () {
    var self = this;
    this.root.setAttribute('data-artcatalog-version', VERSION);
    if (window.console && console.info) console.info('[artcatalog] версия ' + VERSION);
    this.ensureStyles();

    // Если данные уже подключены отдельным <script> (artists.js), берём их
    // оттуда: так каталог работает и на сервере без CORS-заголовков —
    // обычный скрипт браузер грузит с любого домена без разрешения.
    if (window.ARTCATALOG_DATA) {
      this.setData(window.ARTCATALOG_DATA);
      this.render();
      return;
    }

    fetch(this.base + 'artists.json', { credentials: 'same-origin' })
      .then(function (r) {
        if (!r.ok) throw new Error('artists.json: HTTP ' + r.status);
        return r.json();
      })
      .then(function (data) {
        self.setData(data);
        self.render();
      })
      .catch(function (err) {
        console.error('[artcatalog]', err);
        self.root.innerHTML = '<p style="text-align:center;color:#a00;padding:30px 10px;">' +
          'Не удалось загрузить каталог художников. Обновите страницу.</p>';
      });
  };

  /* ---------------- разметка ---------------- */

  /* Данные каталога. Художники могут быть разложены по разделам («Арт-салон»,
     «Галереи») — тогда зал строится по одному разделу за раз: 123 художника в
     одном коридоре — это два километра пути, ходить по такому невозможно.
     Раздел указывается полем section у художника; названия и порядок разделов
     можно задать списком sections. Старый формат (просто список artists)
     продолжает работать — получится один безымянный раздел. */
  /* Фамилия — первое слово имени; у галерей отличается то, что в кавычках */
  function sortKey(name) {
    var full = String(name || '');
    var quoted = full.match(/[«"']([^»"']{2,})[»"']/);
    return (quoted ? quoted[1] : full).replace(/[«»"]/g, '').trim();
  }

  function firstLetter(name) {
    var ch = sortKey(name).charAt(0).toUpperCase();
    return /[А-ЯЁA-Z0-9]/.test(ch) ? (ch === 'Ё' ? 'Е' : ch) : '#';
  }

  Widget.prototype.setData = function (data) {
    var list = (data.artists || []).slice().sort(function (a, b) {
      return (a.order || 0) - (b.order || 0);
    });
    this.artists = list;

    var titles = {}, order = [];
    (data.sections || []).forEach(function (sec) {
      if (!sec || !sec.id) return;
      titles[sec.id] = sec.title || sec.id;
      order.push(sec.id);
    });
    list.forEach(function (a) {
      var id = a.section || '';
      if (order.indexOf(id) === -1) order.push(id);
    });

    var byId = {};
    this.sections = order.map(function (id) {
      var sec = { id: id, title: titles[id] || id, list: [] };
      byId[id] = sec;
      return sec;
    });
    list.forEach(function (a, i) {
      var sec = byId[a.section || ''] || this.sections[0];
      a.secIndex = this.sections.indexOf(sec);
      a.secPos = sec.list.length;
      sec.list.push(i);
    }, this);

    // разделы без художников ни к чему
    this.sections = this.sections.filter(function (sec) { return sec.list.length; });
    this.section = 0;
  };

  /* Художники текущего раздела — их видит и зал, и карусель */
  Widget.prototype.current = function () {
    var sec = this.sections[this.section];
    var self = this;
    return (sec ? sec.list : []).map(function (i) { return self.artists[i]; });
  };

  /* Сквозные номера художников раздела, прошедших поиск и выбранную букву.
     Пустой отбор — это все, а не никто. */
  Widget.prototype.picked = function () {
    var sec = this.sections[this.section];
    if (!sec) return [];
    var self = this;
    var q = (this.query || '').trim().toLowerCase();
    var letter = this.letter || '';
    return sec.list.filter(function (i) {
      var a = self.artists[i];
      if (letter && firstLetter(a.name) !== letter) return false;
      if (!q) return true;
      return (a.name + ' ' + (a.city || '')).toLowerCase().indexOf(q) !== -1;
    });
  };

  /* Буквы, которые вообще есть у художников раздела */
  Widget.prototype.letters = function () {
    var sec = this.sections[this.section];
    if (!sec) return [];
    var self = this, seen = {}, out = [];
    sec.list.forEach(function (i) {
      var L = firstLetter(self.artists[i].name);
      if (!seen[L]) { seen[L] = 1; out.push(L); }
    });
    return out.sort(function (a, b) {
      if (a === '#') return 1;
      if (b === '#') return -1;
      var ra = /[А-ЯЁ]/.test(a), rb = /[А-ЯЁ]/.test(b);
      if (ra !== rb) return ra ? -1 : 1;          // сперва кириллица
      return a < b ? -1 : a > b ? 1 : 0;
    });
  };

  /* Закреплённая сверху шапка сайта (на Tilda — своя, position: fixed):
     её нижний край в окне, 0 — шапки нет или она сейчас спрятана */
  function fixedHeaderBottom(except) {
    if (!document.elementsFromPoint) return 0;
    var w = window.innerWidth, best = 0, xs = [w / 2, 12, w - 12];
    for (var i = 0; i < xs.length; i++) {
      var els = document.elementsFromPoint(xs[i], 2);
      for (var j = 0; j < els.length; j++) {
        var e = els[j];
        if (except.contains(e) || e === document.body || e === document.documentElement) continue;
        for (var a = e; a && a !== document.body; a = a.parentElement) {
          var pos = getComputedStyle(a).position;
          if (pos !== 'fixed' && pos !== 'sticky') continue;
          var r = a.getBoundingClientRect();
          if (r.top <= 1 && r.bottom > 0 && r.bottom < window.innerHeight * 0.4 && r.width > w * 0.5) best = Math.max(best, r.bottom);
          break;
        }
      }
    }
    return best;
  }

  /* Каталог — первый блок страницы под закреплённой шапкой сайта: без
     этого шапка накрывала логотип и заголовок каталога. Отступ сверху
     растёт ровно на ту часть шапки, что наезжает на каталог. Шапка,
     спрятанная на время прокрутки, — помним её прежнюю высоту. */
  Widget.prototype.clearFixedHeader = function () {
    var wrap = this.wrap;
    if (!wrap) return;
    var h = fixedHeaderBottom(this.root);
    if (h > 0) this.headerH = h;
    wrap.style.paddingTop = '';
    var hh = this.headerH || 0;
    if (!hh) return;
    var top = wrap.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop || 0);
    var over = hh - top;
    if (over > 0) wrap.style.paddingTop = (parseFloat(getComputedStyle(wrap).paddingTop) + over) + 'px';
  };

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
      (this.sections.length > 1
        ? '<div class="artc-sections" role="tablist" aria-label="Раздел выставки">' +
            this.sections.map(function (sec, i) {
              return '<button type="button" class="artc-sections__btn' +
                (i === 0 ? ' is-active' : '') + '" data-section="' + i + '" role="tab" ' +
                'aria-selected="' + (i === 0) + '">' + esc(sec.title) +
                '<i>' + sec.list.length + '</i></button>';
            }).join('') +
          '</div>'
        : '') +
      '<div class="artc-view artc-view--hall is-active"></div>' +
      '<div class="artc-view artc-view--grid">' +
        '<div class="artc-filter">' +
          '<div class="artc-search">' + ICON_FIND +
            '<input type="search" class="artc-search__input" placeholder="Поиск по фамилии или городу" ' +
              'aria-label="Поиск по фамилии или городу" autocomplete="off">' +
            '<button type="button" class="artc-search__clear" aria-label="Очистить" hidden>&#10005;</button>' +
          '</div>' +
          '<div class="artc-abc" role="group" aria-label="Указатель по первой букве"></div>' +
          '<p class="artc-filter__count" aria-live="polite"></p>' +
        '</div>' +
        '<p class="artc-empty" hidden>Никого не нашлось. Проверьте написание или сбросьте фильтр.</p>' +
        '<div class="artc-carousel" role="region" aria-roledescription="карусель" aria-label="Художники выставки" tabindex="0">' +
          '<button type="button" class="artc-arrow artc-arrow--prev" aria-label="Предыдущий художник">' + ARROW_L + '</button>' +
          '<div class="artc-carousel__viewport"><div class="artc-carousel__track"></div></div>' +
          '<button type="button" class="artc-arrow artc-arrow--next" aria-label="Следующий художник">' + ARROW_R + '</button>' +
          '<div class="artc-dots" role="tablist" aria-label="Перейти к художнику"></div>' +
        '</div>' +
      '</div>';
    r.appendChild(wrap);
    this.wrap = wrap;

    var self = this;
    this.buildCarousel();

    var track = wrap.querySelector('.artc-carousel__track');
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

    // онлайн-режим: кнопка под переключателем и подключение, если посетитель уже был онлайн
    this.liveInit();
    this.liveHead();

    // поиск и указатель по буквам
    var search = wrap.querySelector('.artc-search__input');
    var clear = wrap.querySelector('.artc-search__clear');
    search.addEventListener('input', function () {
      self.query = this.value;
      clear.hidden = !this.value;
      self.buildCarousel();
    });
    clear.addEventListener('click', function () {
      search.value = ''; self.query = ''; clear.hidden = true;
      self.buildCarousel();
      search.focus();
    });
    wrap.querySelector('.artc-filter .artc-abc').addEventListener('click', function (e) {
      var b = e.target.closest('[data-letter]');
      if (!b) return;
      var L = b.getAttribute('data-letter');
      self.letter = (self.letter === L) ? '' : L;    // повторное нажатие снимает
      self.buildCarousel();
    });

    // переключатель разделов («Арт-салон» / «Галереи»)
    var secBox = wrap.querySelector('.artc-sections');
    if (secBox) {
      secBox.addEventListener('click', function (e) {
        var b = e.target.closest('[data-section]');
        if (b) self.switchSection(+b.getAttribute('data-section'));
      });
    }

    this.clearFixedHeader();
    // шапка сайта может появиться позже каталога — перемерить после загрузки
    window.addEventListener('load', function () { self.clearFixedHeader(); });
    setTimeout(function () { self.clearFixedHeader(); }, 1500);

    var resizeT = null;
    window.addEventListener('resize', function () {
      self.clearFixedHeader();
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
    if (this.gl || this.glHost) return;         // WebGL-сцена следит за размером сама
    var h = this.hall;
    if (!h || !h.stage || !document.body.contains(h.stage)) return;
    this.wallPlace(true);                        // расстояние камеры — по размеру сцены
  };

  /* Карточки карусели — по текущему разделу. data-artist хранит сквозной
     номер художника: по нему открывается карточка, и он не зависит от
     того, какой раздел показан сейчас. */
  Widget.prototype.buildCarousel = function () {
    var self = this;
    var track = this.wrap.querySelector('.artc-carousel__track');
    var dots = this.wrap.querySelector('.artc-dots');
    track.innerHTML = '';
    dots.innerHTML = '';

    /* Карточки выкладываются страницами-плитками: страница занимает всю
       ширину, внутри — сетка. Так все карточки одного размера, а листание
       идёт разворотами, а не по одной. */
    var picked = this.picked();
    var per = this.perView();
    var pages = Math.ceil(picked.length / per) || 1;
    var page = null;
    picked.forEach(function (gi, i) {
      if (i % per === 0) {
        page = el('div', 'artc-page');
        track.appendChild(page);
      }
      var a = self.artists[gi];
      var card = el('div', 'artc-card');
      card.innerHTML =
        '<button type="button" class="artc-card__inner" data-artist="' + gi + '">' +
          '<span class="artc-card__cover">' + pictureHTML(self.url(a.works[0].thumb), 'Работа: ' + (a.works[0].title || a.name), i >= per) + '</span>' +
          '<span class="artc-card__meta">' +
            '<span class="artc-card__ava">' + pictureHTML(self.url(a.avatar), a.name, i >= per) + '</span>' +
            '<span class="artc-card__text"><span class="artc-card__name">' + esc(a.name) + '</span>' +
            '<span class="artc-card__city">' + esc(a.city) + '</span></span>' +
          '</span>' +
        '</button>';
      page.appendChild(card);
    });
    // последняя страница может быть неполной — добиваем пустыми местами,
    // иначе одинокая карточка растягивается на всю ширину
    if (page && picked.length % per) {
      for (var k = picked.length % per; k < per; k++) page.appendChild(el('div', 'artc-card is-empty'));
    }
    // точки — по числу страниц
    if (pages > 1 && pages <= 24) {
      for (var pi = 0; pi < pages; pi++) {
        (function (pn) {
          var dot = el('button', 'artc-dot');
          dot.type = 'button';
          dot.setAttribute('aria-label', 'Страница ' + (pn + 1));
          dot.addEventListener('click', function () { self.goTo(pn); });
          dots.appendChild(dot);
        })(pi);
      }
    }

    this.buildAbc();
    var total = (this.sections[this.section] || { list: [] }).list.length;
    var count = this.wrap.querySelector('.artc-filter__count');
    var filtered = this.query || this.letter;
    count.textContent = filtered ? (picked.length + ' из ' + total) : (total + ' всего');
    this.wrap.querySelector('.artc-empty').hidden = !!picked.length;
    this.wrap.querySelector('.artc-carousel').hidden = !picked.length;
    this.index = 0;
    if (picked.length) this.goTo(0, true);
  };

  /* Указатель по первой букве фамилии */
  Widget.prototype.buildAbc = function () {
    // именно в каталоге: такой же указатель есть и в панели поиска зала
    var box = this.wrap.querySelector('.artc-filter .artc-abc');
    var self = this;
    var html = '';
    this.letters().forEach(function (L) {
      html += '<button type="button" data-letter="' + L + '"' +
        (self.letter === L ? ' class="is-active" aria-pressed="true"' : ' aria-pressed="false"') +
        '>' + (L === '#' ? '…' : L) + '</button>';
    });
    box.innerHTML = html;
    box.hidden = this.letters().length < 2;
  };

  Widget.prototype.switchSection = function (i, quiet) {
    // В WebGL-галерее все разделы — залы одного здания: вкладка ведёт зрителя
    // в нужный зал, а не пересобирает сцену
    if (this.gl && i === this.section && this.sections[i]) {
      if (!quiet) this.gl.goToRoom(i);
      return;
    }
    if (i === this.section || !this.sections[i]) return;
    this.section = i;
    var btns = this.wrap.querySelectorAll('[data-section]');
    for (var b = 0; b < btns.length; b++) {
      var on = +btns[b].getAttribute('data-section') === i;
      btns[b].classList.toggle('is-active', on);
      btns[b].setAttribute('aria-selected', on);
    }
    this.index = 0;
    this.query = '';
    this.letter = '';
    var input = this.wrap.querySelector('.artc-search__input');
    if (input) { input.value = ''; this.wrap.querySelector('.artc-search__clear').hidden = true; }
    this.buildCarousel();
    if (this.gl || this.glHost) {
      if (this.gl && !quiet && !this.glQuiet) this.gl.goToRoom(i);
      return;
    }
    this.buildHall();          // коридор всегда показывает один раздел
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
    if (this.live) this.liveWhere();
  };

  /* ---------------- карусель ---------------- */

  Widget.prototype.perView = function () {
    var v = getComputedStyle(this.wrap).getPropertyValue('--artc-per-view');
    return Math.max(1, parseInt(v, 10) || 1);
  };

  // i — номер страницы-плитки, а не отдельной карточки
  Widget.prototype.goTo = function (i, instant) {
    var n = Math.ceil(this.picked().length / this.perView());
    if (!n) return;
    this.index = ((i % n) + n) % n; // зацикливание
    var track = this.wrap.querySelector('.artc-carousel__track');
    if (instant) track.style.transition = 'none';
    track.style.transform = 'translateX(' + (-this.index * 100) + '%)';
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

  /* ---------------- WebGL-галерея ----------------

     Холл-развилка и по залу на раздел, настоящий 3D (three.js). Код сцены
     лежит отдельно в gallery.js (~140 КБ в gzip) и грузится, только когда
     зритель нажал «Войти в галерею», — остальной странице он не мешает.
     Если WebGL нет, скрипт не загрузился или картинки нельзя взять в WebGL
     (чужой домен без CORS), остаётся прежний CSS-зал. Выбор можно
     закрепить атрибутом data-hall="webgl" | "css", а для проверки —
     параметром адреса ?hall=css. */
  var MODE_KEY = 'artc-hall';

  /* Какой режим выбрал сам зритель: 'css' — простой, иначе авто */
  function userMode() {
    try { return localStorage.getItem(MODE_KEY) || ''; } catch (e) { return ''; }
  }

  Widget.prototype.useGL = function () {
    if (this.glOff) return false;
    var urlMode = (location.search.match(/[?&]hall=(css|webgl)\b/) || [])[1];
    if (!urlMode && userMode() === 'css') return false;
    return this.canGL(urlMode || this.hallMode);
  };

  /* Может ли браузер показать 3D-галерею (без учёта выбора зрителя) */
  Widget.prototype.canGL = function (m) {
    if (this.glBroken) return false;
    if (m === 'css') return false;
    if (m !== 'webgl' && navigator.deviceMemory && navigator.deviceMemory < 2) return false;
    // вариант для сервера без CORS (данные из artists.js): картинки с чужого
    // домена браузер в WebGL не отдаст — сразу CSS-зал
    if (m !== 'webgl' && window.ARTCATALOG_DATA && /^(https?:)?\/\//.test(this.base) &&
        this.base.indexOf(location.origin) !== 0) return false;
    if (window.ArtGallery) return window.ArtGallery.supported();
    try {
      return !!document.createElement('canvas').getContext('webgl2');   // three.js требует WebGL2
    } catch (e) { return false; }
  };

  /* Зритель переключил режим: 'css' — простой зал, 'webgl' — 3D-галерея.
     Выбор запоминается в браузере. */
  Widget.prototype.setHallMode = function (m) {
    try { localStorage.setItem(MODE_KEY, m === 'css' ? 'css' : 'webgl'); } catch (e) { /* приватный режим */ }
    var g = this.gl;
    this.gl = null;
    this.glHost = null;
    this.glStarted = null;
    this.glLoad = null;
    this.glOff = m === 'css';
    if (g) g.destroy();
    if (this.hall && this.hall.offKey) this.hall.offKey();
    this.stopTour();
    if (this.music && this.music.on && m !== 'css') this.toggleMusic(false);   // у 3D-галереи своя
    this.hall = null;
    this.buildHall();
  };

  /* Загрузчик 3D-галереи вместо заставки: песочные часы пересыпаются по
     мере загрузки, рядом проценты и сколько примерно осталось. Грузить
     начинаем, когда блок подошёл к экрану (или сразу, если пришли по ссылке
     на работу или зал). */
  /* Нет ускорения графики (программная отрисовка: удалённый рабочий стол,
     виртуальная машина, старый драйвер)? Проверка — до скачивания 3D-движка
     (1,1 МБ), чтобы такой компьютер сразу получил простой зал. Тот же признак
     ещё раз проверяет сама галерея. */
  function softGPU() {
    if (softGPU.v != null) return softGPU.v;
    var v = false;
    try {
      var c = document.createElement('canvas');
      var gl = c.getContext('webgl2') || c.getContext('webgl');
      if (gl) {
        var di = gl.getExtension('WEBGL_debug_renderer_info');
        var name = String(gl.getParameter(di ? di.UNMASKED_RENDERER_WEBGL : gl.RENDERER) || '');
        v = /swiftshader|llvmpipe|softpipe|software|basic render|mesa offscreen/i.test(name);
        var lose = gl.getExtension('WEBGL_lose_context');
        if (lose) lose.loseContext();
      }
    } catch (e) { /* не узнали — считаем, что ускорение есть */ }
    return (softGPU.v = v);
  }

  Widget.prototype.buildGL = function (host) {
    if (this.glHost === host) return;            // уже построена или строится
    var forced = this.force3d || /[?&#]artforce\b/.test(location.search + location.hash);
    try { forced = forced || !!sessionStorage.getItem('artg-force3d'); } catch (e) { /* приватный режим */ }
    if (!forced && softGPU()) { this.glFallback('slow'); return; }
    var self = this;
    this.glHost = host;
    var id = 'artc-hg' + Math.random().toString(36).slice(2, 8);
    host.innerHTML =
      '<div class="artc-glwrap">' +
        '<div class="artc-glroot"></div>' +
        '<div class="artc-glload" role="status" aria-live="polite">' +
          '<svg class="artc-glload__glass" viewBox="0 0 60 90" aria-hidden="true">' +
            '<defs>' +
              '<clipPath id="' + id + 't"><path d="M13 9h34c0 18-13 26-15 36h-4C26 35 13 27 13 9z"/></clipPath>' +
              '<clipPath id="' + id + 'b"><path d="M28 45h4c2 10 15 18 15 36H13c0-18 13-26 15-36z"/></clipPath>' +
            '</defs>' +
            '<rect class="artc-glload__sand" clip-path="url(#' + id + 't)" x="0" y="9" width="60" height="36"/>' +
            '<rect class="artc-glload__sand" clip-path="url(#' + id + 'b)" x="0" y="81" width="60" height="0"/>' +
            '<line class="artc-glload__stream" x1="30" y1="44" x2="30" y2="81"/>' +
            '<path class="artc-glload__frame" d="M11 7h38c0 20-15 28-16 38 1 10 16 18 16 38H11c0-20 15-28 16-38C26 35 11 27 11 7z"/>' +
            '<rect class="artc-glload__cap" x="6" y="2" width="48" height="5" rx="2"/>' +
            '<rect class="artc-glload__cap" x="6" y="83" width="48" height="5" rx="2"/>' +
          '</svg>' +
          '<h3>Виртуальная галерея</h3>' +
          '<p class="artc-glload__txt">Готовим холл выставки</p>' +
          '<div class="artc-glload__num"><b>0</b>%</div>' +
          '<div class="artc-glload__bar"><i></i></div>' +
          '<p class="artc-glload__eta">&nbsp;</p>' +
          '<button type="button" class="artc-glload__css">' + ICON_SIMPLE + 'Простой режим</button>' +
          '<small>Плоский зал без 3D — если устройство слабое или загрузка идёт долго</small>' +
        '</div>' +
      '</div>';
    this.glRoot = host.querySelector('.artc-glroot');
    this.glLoad = host.querySelector('.artc-glload');
    this.glP = 0;
    this.glHist = [];
    this.glLeft = 0;
    host.querySelector('.artc-glload__css').addEventListener('click', function () { self.setHallMode('css'); });

    var start = function () {
      if (self.glStarted === host) return;
      self.glStarted = host;
      self.glT0 = Date.now();
      self.glProgress(0.01);
      self.loadGL(function (ok) {
        if (self.glHost !== host) return;            // зритель успел переключиться
        if (!ok) { self.glFallback('script'); return; }
        self.startGL();
      }, function (f) { if (self.glHost === host) self.glProgress(0.02 + f * 0.13); });
    };
    // Пришли по ссылке на работу или зал (#artc-work=… / #artc-room=…) —
    // сразу грузим и прокручиваем страницу к галерее
    if (/^#artc-(work|room)=/.test(location.hash)) {
      start();
      try { host.scrollIntoView({ block: 'center' }); } catch (e) { host.scrollIntoView(); }
    } else if (window.IntersectionObserver) {
      var io = new IntersectionObserver(function (es) {
        for (var k = 0; k < es.length; k++) if (es[k].isIntersecting) { io.disconnect(); start(); return; }
      }, { rootMargin: '300px 0px' });
      io.observe(host);
    } else start();
  };

  /* Ход загрузки 0…1: песок, проценты, оставшееся время */
  Widget.prototype.glProgress = function (p) {
    var L = this.glLoad;
    if (!L) return;
    p = Math.max(this.glP || 0, Math.min(1, p));
    this.glP = p;
    L.querySelector('.artc-glload__num b').textContent = Math.round(p * 100);
    L.querySelector('.artc-glload__bar i').style.width = (p * 100) + '%';
    var sand = L.querySelectorAll('.artc-glload__sand');
    sand[0].setAttribute('y', 9 + 36 * p); sand[0].setAttribute('height', 36 * (1 - p));
    sand[1].setAttribute('y', 81 - 36 * p); sand[1].setAttribute('height', 36 * p);
    L.querySelector('.artc-glload__txt').textContent =
      p < 0.15 ? 'Загружаем 3D-движок' : p < 0.97 ? 'Развешиваем картины и ставим свет' : 'Открываем двери';
    var now = Date.now();
    // оставшееся время — по темпу последних секунд, со сглаживанием, чтобы
    // цифра не прыгала, когда картинки идут то быстрее, то медленнее
    var hist = this.glHist = this.glHist || [];
    hist.push([now, p]);
    while (hist.length > 2 && now - hist[1][0] > 4000) hist.shift();
    if (now - (this.glEtaT || 0) < 700 && p < 1) return;     // не дёргать цифру каждый кадр
    this.glEtaT = now;
    var eta = L.querySelector('.artc-glload__eta');
    if (p >= 0.97) { eta.textContent = 'Почти готово'; return; }
    var h0 = hist[0], dt = (now - h0[0]) / 1000, dp = p - h0[1];
    if (dt < 1 || dp <= 0) { if (!this.glLeft) eta.textContent = 'Считаем время…'; return; }
    var left = (1 - p) * dt / dp;
    // резкий рост прогноза (пауза, пока собирается сцена) сглаживаем сильнее
    if (this.glLeft) left = Math.min(left, this.glLeft * 1.4);
    this.glLeft = this.glLeft ? this.glLeft * 0.6 + left * 0.4 : left;
    var n = Math.max(1, Math.round(this.glLeft));
    eta.textContent = 'Осталось около ' + (n < 60 ? n + ' с' : Math.round(n / 60) + ' мин');
  };

  /* Сцена готова: загрузчик плавно уходит */
  Widget.prototype.glReady = function () {
    var L = this.glLoad;
    if (!L) return;
    this.glProgress(1);
    L.classList.add('is-done');
    this.glLoad = null;
    setTimeout(function () { if (L.parentNode) L.parentNode.removeChild(L); }, 600);
    var stage = this.glRoot && this.glRoot.querySelector('.artg-stage');
    if (stage && this.wrap.contains(document.activeElement) === false) { /* фокус не отнимаем у страницы */ }
  };

  /* gallery.js грузится запросом, чтобы видеть ход загрузки; если сервер
     не разрешил запрос (нет CORS) — обычным тегом script */
  Widget.prototype.loadGL = function (cb, onProgress) {
    var self = this;
    if (window.ArtGallery) { if (cb) cb(true); return; }
    (this.glWait = this.glWait || []).push(cb);
    if (onProgress) (this.glProg = this.glProg || []).push(onProgress);
    if (this.glScript) return;
    this.glScript = true;
    var url = this.base + 'gallery.js' + (VERSION !== 'local' ? '?v=' + VERSION : '');
    var done = function (ok) { var w = self.glWait; self.glWait = []; self.glProg = []; w.forEach(function (f) { if (f) f(ok); }); };
    var viaTag = function () {
      var sc = document.createElement('script');
      sc.src = url;
      sc.async = true;
      sc.onload = function () { done(!!window.ArtGallery); };
      sc.onerror = function () { done(false); };
      document.head.appendChild(sc);
    };
    var x;
    try { x = new XMLHttpRequest(); x.open('GET', url, true); } catch (e) { viaTag(); return; }
    x.onprogress = function (e) {
      // сжатый gallery.js — около 300 КБ; если размер не сообщили, считаем от него
      var total = e.lengthComputable && e.total ? e.total : 300000;
      var f = Math.min(0.97, e.loaded / total);
      (self.glProg || []).forEach(function (g) { g(f); });
    };
    x.onload = function () {
      if (x.status !== 200 || !x.responseText) { viaTag(); return; }
      (self.glProg || []).forEach(function (g) { g(1); });
      var sc = document.createElement('script');
      sc.text = x.responseText + '\n//# sourceURL=' + url;
      document.head.appendChild(sc);
      done(!!window.ArtGallery);
    };
    x.onerror = viaTag;
    x.send();
  };

  Widget.prototype.startGL = function () {
    var self = this;
    var root = this.glRoot;
    if (!root || this.gl) return;
    this.gl = window.ArtGallery.create(root, {
      artists: this.artists,
      sections: this.sections,
      url: this.url,
      ticketUrl: this.ticketUrl,
      objects: OBJECTS,
      openWork: function (gi, wi) { self.viewWork(gi, wi); },
      openArtist: function (gi) {
        self.fromHall = true;
        self.lbFromHall = false;
        self.openArtist(gi);
      },
      section: function () { return self.section || 0; },
      onRoom: function (i) {
        if (i >= 0 && i !== self.section) self.switchSection(i, true);
      },
      onFullscreen: function (fsEl) {
        var target = fsEl || document.body;
        [self.artistModal, self.lightbox, self.formModal].forEach(function (m) {
          if (m && m.parentNode !== target) target.appendChild(m);
        });
        if (fsEl && self.live && self.gl && self.gl.stage) self.liveAutoOpen(self.gl.stage);
      },
      onProgress: function (f) { self.glProgress(0.15 + f * 0.85); },
      onReady: function () { self.glReady(); },
      simple: function () { self.setHallMode('css'); },
      curator: function (host) { self.openCurator(host); },
      onMove: function (sec, room, x, z, yaw) { if (self.live) self.liveMove(sec, room, x, z, yaw); },
      live: !!this.liveUrl,
      force3d: !!this.force3d,
      livePick: function (id) { self.livePick(id); },
      fallback: function (reason) { self.glFallback(reason); }
    });
    // null: WebGL нет — или уже откатились в простой зал из-за медленной графики (glSlow)
    if (!this.gl) { if (!this.glSlow) this.glFallback('webgl'); return; }
    if (this.live && this.gl.stage) { this.liveMount(this.gl.stage); this.livePeersSync(); this.liveWhere(true); }
    if (/^#artc-(work|room)=/.test(location.hash)) {
      var stage = root.querySelector('.artg-stage');
      if (stage) stage.focus({ preventScroll: true });
    }
  };

  /* Вернуться к CSS-залу: WebGL недоступен, скрипт не загрузился и т. п.
     (выбор зрителя — setHallMode) */
  Widget.prototype.glFallback = function (reason) {
    if (reason === 'user') { this.setHallMode('css'); return; }
    if (reason === 'slow') {
      // нет ускорения графики (удалённый рабочий стол, виртуальная машина,
      // старый драйвер): 3D грузилось бы минутами — простой зал; кнопка
      // «3D-галерея» вверху всё равно включит 3D (force3d)
      var gs = this.gl;
      this.gl = null;
      this.glHost = null;
      this.glOff = true;
      this.glSlow = true;
      if (gs) gs.destroy();
      this.buildHall();
      var self = this;
      setTimeout(function () {
        self.showHint('На этом устройстве 3D-галерея работала бы медленно — открыт простой зал. ' +
          'Кнопка <b>«3D-галерея»</b> вверху включит её всё равно.');
        clearTimeout(self.hintT);
        self.hintT = setTimeout(function () { self.hideHint(); }, 12000);
      }, 600);
      return;
    }
    if (window.console && console.warn) console.warn('[artcatalog] 3D-галерея недоступна (' + reason + '), CSS-зал');
    var g = this.gl;
    this.gl = null;
    this.glHost = null;
    this.glOff = true;
    this.glBroken = true;
    if (g) g.destroy();
    this.buildHall();
  };

  /* ---------------- простой зал: стена с работами ----------------

     Простой режим — без WebGL. Весь раздел — одна длинная стена слева от
     зрителя. У каждого художника свой отрезок стены, соседние отрезки стоят
     под небольшим углом друг к другу: излом и есть граница между
     художниками, подписи не нужны. Камера скользит вдоль стены и смотрит
     на неё наискосок: текущая работа крупно в центре, следующие уходят в
     перспективу вправо — по ходу чтения. Тёмного конца коридора больше нет:
     пол и потолок — светлые градиенты фона сцены, а не 3D-плоскости (на
     телефоне это и дешевле). Справа — дневной свет из проёмов
     противоположной стены.

     Картинки — только у ближних отрезков (±W_NEAR), дальше ±W_KEEP они
     выгружаются, дальше ±W_SHOW отрезок не рисуется совсем. */
  var W_ART = 250;      // высота полотна, px мира
  var W_H = 520;        // высота стены от потолка до уровня под полотнами
  var W_FOOT = 120;     // и ещё ниже, до пола: место для таблички с длинным названием
  var W_GAP = 150;      // между работами
  var W_PAD = 120;      // от краёв отрезка до работ
  var W_MIN = 560;      // самый короткий отрезок
  var W_TURN = 12;      // излом стены между художниками, градусы
  var W_VIEW = 36;      // взгляд повёрнут вдоль стены от перпендикуляра
  var W_PERSP = 900;    // перспектива сцены, px
  var W_NEAR = 2;
  var W_KEEP = 5;
  var W_SHOW = 4;
  var W_BLEND = 260;    // у излома взгляд поворачивает плавно, на этом отрезке пути
  var W_TOUR = 4200;    // экскурсия: столько мс у каждой работы
  // куратор у вступительной стены: рост 166 см — в масштабе зала (от глаз до
  // пола W_H/2 + W_FOOT = 1.62 м); стоит перед стеной, лицом к зрителю
  var W_FLOOR = W_H / 2 + W_FOOT;
  var CUR_H = Math.round(W_FLOOR * 1.66 / 1.62);
  var CUR_W = Math.round(CUR_H * 513 / 1200);
  var CUR_U = 250;      // где стоит — вдоль вступительного отрезка
  var CUR_OUT = 70;     // и насколько отошла от стены к зрителю
  var CUR_STOP = 470;   // остановка «у куратора» — первая в разделе
  var DEG = Math.PI / 180;

  function wallImg(src, alt) {
    return '<img src="' + BLANK + '" data-src="' + esc(src.replace(/\.webp$/, '.jpg')) + '" data-webp="' + esc(src) + '" alt="' + esc(alt) + '">';
  }

  Widget.prototype.buildHall = function () {
    var host = this.wrap.querySelector('.artc-view--hall');
    if (!host) return;
    if (this.useGL()) { this.buildGL(host); return; }
    if (this.hall && this.hall.offKey) this.hall.offKey();
    this.stopTour();

    var self = this;
    var touch = isTouch();
    var sec = this.sections.length ? this.sections[this.section] : null;
    var shown = this.current();
    var globals = sec ? sec.list : shown.map(function (a, i) { return i; });
    var next = this.sections[this.section + 1] ? this.section + 1 : (this.sections.length > 1 ? 0 : -1);

    host.innerHTML =
      '<div class="artc-stage artc-hw" tabindex="0" role="application" ' +
           'aria-label="Зал выставки: работы на стене, листайте стрелками, колесом или пальцем">' +
        '<div class="artc-hw__day" aria-hidden="true"></div>' +
        '<div class="artc-hw__scene"><div class="artc-hw__world"></div></div>' +
        '<div class="artc-hw__top">' +
          '<div class="artc-hw__where"><b></b><button type="button" class="artc-hw__who"></button></div>' +
          '<div class="artc-hw__btns">' +
            (this.canGL(this.hallMode) ? '<button type="button" class="artc-mode">' + ICON_3D + '<span>3D-галерея</span></button>' : '') +
            '<button type="button" class="artc-hw__btn artc-hw__music" aria-label="Тихая музыка" aria-pressed="false">' + ICON_MUSIC + '</button>' +
            '<button type="button" class="artc-hw__btn artc-hw__find" aria-label="Найти художника">' + ICON_FIND + '</button>' +
            '<button type="button" class="artc-hw__btn artc-fs">' + ICON_FS +
              '<span class="artc-fs__t artc-fs__t--in">Полный экран</span><span class="artc-fs__t artc-fs__t--out">Свернуть</span></button>' +
          '</div>' +
        '</div>' +
        '<div class="artc-hw__nav">' +
          '<button type="button" class="artc-hw__btn artc-hw__prev" aria-label="Предыдущая работа">' + ARROW_L + '</button>' +
          '<span class="artc-hw__count" aria-live="polite"></span>' +
          '<button type="button" class="artc-hw__btn artc-hw__next" aria-label="Следующая работа">' + ARROW_R + '</button>' +
          '<button type="button" class="artc-hw__btn artc-hw__tour" aria-label="Экскурсия: работы сменяются сами" aria-pressed="false">' + ICON_TOUR + '</button>' +
        '</div>' +
        '<p class="artc-hint">' + ICON_WALK + '<span>' + (touch
          ? 'Листайте пальцем вбок или жмите стрелки внизу'
          : 'Листайте стрелками <b>←</b> <b>→</b> или перетаскивайте стену') + '</span></p>' +
        '<div class="artc-find" hidden>' +
          '<div class="artc-find__head">' +
            '<input type="search" class="artc-find__input" placeholder="Найти художника" ' +
              'aria-label="Поиск художника" autocomplete="off">' +
            '<button type="button" class="artc-find__close" aria-label="Закрыть список">&#10005;</button>' +
          '</div>' +
          '<div class="artc-abc artc-find__abc" role="group" aria-label="Указатель по первой букве"></div>' +
          '<ul class="artc-find__list"></ul>' +
          '<p class="artc-find__empty" hidden>Никого не нашлось</p>' +
        '</div>' +
      '</div>';

    var stage = host.querySelector('.artc-stage');
    if (touch) stage.classList.add('is-touch');
    var world = host.querySelector('.artc-hw__world');

    /* Цепочка отрезков. s — путь вдоль стены от начала раздела, px мира;
       у каждой работы и у каждого художника без работ — своя «остановка». */
    var segs = [], stops = [], rooms = [];
    var x = 0, z = 0, s = 0;
    var addSeg = function (sg) {
      sg.dx = Math.sin(sg.ang * DEG);
      sg.dz = -Math.cos(sg.ang * DEG);
      sg.x0 = x; sg.z0 = z; sg.s0 = s;
      x += sg.dx * sg.L; z += sg.dz * sg.L; s += sg.L;
      sg.i = segs.length;
      segs.push(sg);
    };
    // начало раздела: вводный отрезок с названием — стена не обрывается слева
    var nWorks = shown.reduce(function (n, a) { return n + a.works.length; }, 0);
    addSeg({ intro: true, ang: W_TURN / 2, L: 900, items: [] });
    stops.push({ s: segs[0].s0 + CUR_STOP, seg: segs[0], it: null });
    shown.forEach(function (a, ai) {
      var items = [], u = W_PAD;
      a.works.forEach(function (w, wi) {
        var r = (w.w && w.h) ? w.w / w.h : 1;
        var aw = Math.round(Math.min(W_ART * 1.6, Math.max(W_ART * 0.6, W_ART * r)));
        items.push({ w: w, wi: wi, u: u, aw: aw });
        u += aw + W_GAP;
      });
      var sg = { a: a, gi: globals[ai], ai: ai, ang: ai % 2 ? W_TURN / 2 : -W_TURN / 2,
                 L: Math.max(u - W_GAP + W_PAD, W_MIN), items: items };
      addSeg(sg);
      rooms.push({ name: a.name, city: a.city, avatar: self.url(a.avatar), stop: stops.length });
      if (!items.length) stops.push({ s: sg.s0 + sg.L / 2, seg: sg, it: null });
      items.forEach(function (it) { stops.push({ s: sg.s0 + it.u + it.aw / 2, seg: sg, it: it }); });
    });
    // конец раздела — последний отрезок той же стены
    var end = { end: true, ang: segs.length % 2 ? W_TURN / 2 : -W_TURN / 2, L: 900, items: [] };
    addSeg(end);
    stops.push({ s: end.s0 + end.L / 2, seg: end, it: null });

    // разметка отрезков — сразу вся (дальние скрыты), картинки — по мере подхода
    var frag = document.createDocumentFragment();
    segs.forEach(function (sg) {
      var e = el('div', 'artc-hw__seg' + (sg.ang > 0 ? ' is-shade' : '') + (sg.end || sg.intro ? ' artc-hw__end' : ''));
      e.style.width = sg.L + 'px';
      e.style.height = (W_H + W_FOOT) + 'px';
      var mx = sg.x0 + sg.dx * sg.L / 2, mz = sg.z0 + sg.dz * sg.L / 2;
      // стена слева от зрителя: ось плоскости — вперёд вдоль отрезка, лицо — вправо;
      // верх стены на прежнем месте, нижняя часть (W_FOOT) — ниже
      e.style.transform = 'translate(-50%, -50%) translate3d(' + mx.toFixed(1) + 'px, ' + (W_FOOT / 2) + 'px, ' + mz.toFixed(1) +
        'px) rotateY(' + (90 - sg.ang) + 'deg)';
      var html;
      if (sg.intro) {
        e.className += ' has-guide';
        html = '<div class="artc-hw__fin artc-hw__fin--intro">' +
          '<h3>' + esc(sec ? sec.title : 'Выставка') + '</h3>' +
          '<p>' + shown.length + ' ' + plural(shown.length, 'художник', 'художника', 'художников') + ' · ' +
            nWorks + ' ' + plural(nWorks, 'работа', 'работы', 'работ') + '</p>' +
          '<p class="artc-hw__invite">Идите вдоль стены →</p></div>';
      } else if (sg.end) {
        var total = stops.length - 2;          // без вступительной и этой
        html = '<div class="artc-hw__fin">' +
          pictureHTML(self.base + 'img/logo.webp', 'АРТ Ростов', true) +
          '<h3>Конец раздела' + (sec ? ' «' + esc(sec.title) + '»' : '') + '</h3>' +
          '<p>' + shown.length + ' ' + plural(shown.length, 'художник', 'художника', 'художников') + ' · ' +
            total + ' ' + plural(total, 'остановка', 'остановки', 'остановок') + '</p>' +
          '<p class="artc-hw__invite">Приходите увидеть вживую — 16–25 апреля 2027</p>' +
          '<div>' +
            (next >= 0 && next !== self.section ? '<button type="button" class="artc-hw__go" data-section="' + next + '">' +
              esc(self.sections[next].title) + ' →</button>' : '') +
            '<button type="button" class="artc-hw__go artc-hw__go--light" data-home="1">В начало</button>' +
          '</div></div>';
      } else {
        var a = sg.a;
        var nm = a.name.length > 40 ? 30 : a.name.length > 26 ? 36 : 44;
        html = '<button type="button" class="artc-hw__name" data-artist="' + sg.gi + '" style="font-size:' + nm + 'px">' +
          esc(a.name) + '<small>' + esc(a.city || '') + '</small><i>О художнике →</i></button>';
        var top = W_H / 2 - W_ART / 2 + 20;
        sg.items.forEach(function (it) {
          var title = it.w.title || 'Без названия';
          html += '<span class="artc-hw__spot" style="left:' + (it.u - 60) + 'px;top:' + (top - 70) + 'px;width:' +
              (it.aw + 120) + 'px;height:' + (W_ART + 140) + 'px"></span>' +
            '<button type="button" class="artc-hw__art" data-artist="' + sg.gi + '" data-work="' + it.wi + '" ' +
              'style="left:' + it.u + 'px;top:' + top + 'px;width:' + it.aw + 'px;height:' + W_ART + 'px" ' +
              'aria-label="Открыть работу «' + esc(title) + '» — ' + esc(a.name) + '">' +
              wallImg(self.url(it.w.medium), title + ' — ' + a.name) + '</button>' +
            '<button type="button" class="artc-hw__plq" data-artist="' + sg.gi + '" ' +
              'style="left:' + it.u + 'px;top:' + (top + W_ART + 22) + 'px;max-width:' + Math.max(170, it.aw) + 'px" ' +
              'aria-label="Карточка художника: ' + esc(a.name) + '">' +
              '<b>' + esc(title) + '</b><span>' + esc(a.name) + '</span><i>О художнике →</i></button>';
        });
      }
      e.innerHTML = html;
      e.style.display = 'none';
      sg.el = e;
      frag.appendChild(e);
    });
    world.appendChild(frag);

    // куратор: точка на полу перед вступительной стеной
    var ig = segs[0], an = ig.ang * DEG;
    var guide = el('button', 'artc-hw__guide',
      '<img src="' + esc(this.base + 'curator/figure.webp') + '" alt="" width="' + CUR_W + '" height="' + CUR_H + '" draggable="false">' +
      '<span class="artc-hw__say">' + esc(CUR_HELLO) + '</span>');
    guide.type = 'button';
    guide.setAttribute('aria-label', 'Куратор Татьяна: задать вопрос');
    guide.style.width = CUR_W + 'px';
    guide.style.height = CUR_H + 'px';
    guide.style.display = 'none';
    world.appendChild(guide);
    ig.guide = { el: guide, x: ig.x0 + ig.dx * CUR_U + Math.cos(an) * CUR_OUT, z: ig.z0 + ig.dz * CUR_U + Math.sin(an) * CUR_OUT };

    var modeBtn = host.querySelector('.artc-mode');
    if (modeBtn) {
      modeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        // зритель сам выбрал 3D — проверку видеочипа не повторяем
        self.force3d = true;
        self.glSlow = false;
        try { sessionStorage.setItem('artg-force3d', '1'); } catch (x) { /* приватный режим */ }
        self.setHallMode('webgl');
      });
    }

    this.hall = {
      wall: true, host: host, stage: stage, world: world,
      scene: host.querySelector('.artc-hw__scene'),
      day: host.querySelector('.artc-hw__day'),
      segs: segs, stops: stops, rooms: rooms,
      fsBtn: host.querySelector('.artc-fs'),
      s: 0, ts: 0, cur: -1, segI: -1, raf: 0, last: 0
    };
    var h = this.hall;
    h.s = h.ts = stops.length ? stops[0].s : 0;
    this.bindWall();
    this.wallPlace(true);
    // размер сцены становится известен после раскладки страницы — и может
    // меняться (поворот, панель браузера): расстояние камеры — по нему
    requestAnimationFrame(function () { if (self.hall === h) self.wallPlace(true); });
    if (window.ResizeObserver) {
      h.ro = new ResizeObserver(function () { if (self.hall === h) self.wallPlace(true); });
      h.ro.observe(stage);
    }
  };

  function plural(n, one, few, many) {
    var m = n % 100, k = n % 10;
    if (m > 10 && m < 20) return many;
    return k === 1 ? one : (k > 1 && k < 5 ? few : many);
  }

  /* Отрезок по пути s (с запоминанием последнего — идём обычно по соседним) */
  Widget.prototype.wallSeg = function (s) {
    var segs = this.hall.segs;
    var i = Math.max(0, Math.min(segs.length - 1, this.hall.segI < 0 ? 0 : this.hall.segI));
    while (i > 0 && s < segs[i].s0) i--;
    while (i < segs.length - 1 && s >= segs[i].s0 + segs[i].L) i++;
    return i;
  };

  /* Камера в точке пути s: точка на стене, взгляд наискосок вдоль неё */
  Widget.prototype.wallPlace = function (force) {
    var h = this.hall;
    if (!h || !h.wall || !h.segs.length) return;
    var si = this.wallSeg(h.s);
    var sg = h.segs[si];
    var ds = h.s - sg.s0;
    var px = sg.x0 + sg.dx * ds, pz = sg.z0 + sg.dz * ds;
    // направление стены у излома меняется плавно: на W_BLEND до и после стыка
    var ang = sg.ang, prev = h.segs[si - 1], nxt = h.segs[si + 1];
    var smooth = function (t) { return t * t * (3 - 2 * t); };
    if (prev && ds < W_BLEND) ang = prev.ang + (sg.ang - prev.ang) * smooth(0.5 + 0.5 * ds / W_BLEND);
    else if (nxt && sg.L - ds < W_BLEND) ang = nxt.ang + (sg.ang - nxt.ang) * smooth(0.5 + 0.5 * (sg.L - ds) / W_BLEND);
    var tx = Math.sin(ang * DEG), tz = -Math.cos(ang * DEG);
    var nx = Math.cos(ang * DEG), nz = Math.sin(ang * DEG);            // к зрителю
    var c = Math.cos(W_VIEW * DEG), sn = Math.sin(W_VIEW * DEG);
    var vx = -nx * c + tx * sn, vz = -nz * c + tz * sn;
    // расстояние — по размеру сцены: полотно около половины меньшей стороны
    var W = h.stage.clientWidth || 800, H = h.stage.clientHeight || 600;
    var dist = W_PERSP * W_ART * 1.15 / (0.5 * Math.min(W * 1.1, H * 0.85));
    // у вступительной стены камера дальше — куратор виден в полный рост;
    // к первой работе расстояние плавно становится обычным
    if (h.stops.length > 1) {
      var s0 = h.stops[0].s, s1 = h.stops[1].s;
      var kf = Math.max(0, Math.min(1, (s1 - h.s) / (s1 - s0)));
      dist *= 1 + 0.55 * smooth(kf);
    }
    var cx = px - vx * dist, cz = pz - vz * dist;
    var yaw = Math.atan2(vx, -vz) / DEG;
    h.world.style.transform = 'translateZ(' + W_PERSP + 'px) rotateY(' + yaw.toFixed(3) + 'deg) translate3d(' +
      (-cx).toFixed(1) + 'px, 0, ' + (-cz).toFixed(1) + 'px)';
    var gd = h.segs[0].guide;
    if (gd && gd.el.style.display !== 'none') {
      gd.el.style.transform = 'translate3d(' + (gd.x - CUR_W / 2).toFixed(1) + 'px, ' + (W_FLOOR - CUR_H) + 'px, ' +
        gd.z.toFixed(1) + 'px) rotateY(' + (-yaw).toFixed(3) + 'deg)';
    }
    // свет из проёмов напротив плывёт при ходьбе
    h.day.style.backgroundPosition = '0 0, ' + (-(h.s * 0.18) % 1400).toFixed(0) + 'px 0';

    if (si !== h.segI || force) {
      h.segI = si;
      this.wallLoad(si);
    }
    var cur = this.wallNearest(h.ts);
    if (cur !== h.cur || force) {
      h.cur = cur;
      this.wallHud();
    }
  };

  /* Ближние отрезки — видны и с картинками; дальние скрыты и выгружены */
  Widget.prototype.wallLoad = function (si) {
    var segs = this.hall.segs;
    for (var i = 0; i < segs.length; i++) {
      var d = Math.abs(i - si), e = segs[i].el;
      var show = d <= W_SHOW;
      if ((e.style.display === 'none') === show) e.style.display = show ? '' : 'none';
      if (segs[i].guide) {
        segs[i].guide.el.style.display = show ? '' : 'none';
        if (show) this.guideAnim(segs[i].guide);
      }
      var imgs = e.getElementsByTagName('img');
      for (var k = 0; k < imgs.length; k++) {
        var im = imgs[k], webp = im.getAttribute('data-webp');
        if (!webp) continue;
        if (d <= W_NEAR && im.getAttribute('data-on') !== '1') {
          im.setAttribute('data-on', '1');
          im.onerror = function () {
            var jpg = this.getAttribute('data-src');
            if (jpg && this.src.indexOf(jpg) === -1) this.src = jpg;
          };
          im.src = webp;
        } else if (d > W_KEEP && im.getAttribute('data-on') === '1') {
          im.onerror = null;
          im.removeAttribute('data-on');
          im.src = BLANK;
        }
      }
    }
  };

  /* Движение куратора: анимированный WebP с прозрачностью — обычная
     картинка, играет сама, без скриптов. Грузится, когда фигура впервые
     видна; пока не пришёл (или посетитель просит меньше движения) — фото.
     Низ кадра — пол, стоящая фигура — 90 % высоты кадра. */
  Widget.prototype.guideAnim = function (gd) {
    if (gd.anim || prefersReducedMotion()) return;
    var im = gd.anim = document.createElement('img');
    im.className = 'artc-hw__anim';
    im.alt = '';
    im.setAttribute('draggable', 'false');
    im.onload = function () { gd.el.classList.add('is-anim'); };
    im.src = this.base + 'curator/idle.webp';
    gd.el.insertBefore(im, gd.el.firstChild);
  };

  Widget.prototype.wallNearest = function (s) {
    var st = this.hall.stops, best = 0, bd = Infinity;
    for (var i = 0; i < st.length; i++) {
      var d = Math.abs(st[i].s - s);
      if (d < bd) { bd = d; best = i; }
    }
    return best;
  };

  /* Надписи над сценой: раздел, художник, счётчик работ */
  Widget.prototype.wallHud = function () {
    var h = this.hall, st = h.stops[h.cur];
    if (!st) return;
    var sec = this.sections.length ? this.sections[this.section] : null;
    var who = h.stage.querySelector('.artc-hw__who');
    var b = h.stage.querySelector('.artc-hw__where b');
    var cnt = h.stage.querySelector('.artc-hw__count');
    var nArt = h.rooms.length;
    var narrow = h.stage.clientWidth < 560;
    if (st.seg.intro) {
      b.textContent = (sec ? sec.title : 'Выставка') + (narrow ? '' : ' · ' + nArt + ' ' + plural(nArt, 'художник', 'художника', 'художников'));
      who.textContent = '';
      who.hidden = true;
      cnt.textContent = 'Вход в раздел';
    } else if (st.seg.end) {
      b.textContent = (sec ? sec.title : 'Выставка') + ' · конец раздела';
      who.textContent = '';
      who.hidden = true;
      cnt.textContent = 'Конец раздела';
    } else {
      // на узком экране — одной строкой; имя художника и так крупно на стене
      b.textContent = (sec ? sec.title + ' · ' : '') + (narrow ? '' : 'художник ') + (st.seg.ai + 1) + ' из ' + nArt;
      who.hidden = false;
      who.textContent = st.seg.a.name + ' →';
      who.setAttribute('data-artist', st.seg.gi);
      cnt.textContent = st.it ? 'Работа ' + (st.it.wi + 1) + ' из ' + st.seg.items.length : 'Нет работ';
    }
    h.stage.querySelector('.artc-hw__prev').disabled = h.cur <= 0;
    h.stage.querySelector('.artc-hw__next').disabled = h.cur >= h.stops.length - 1;
    if (this.live) { this.liveMount(h.stage); this.liveWhere(); }
  };

  /* Перейти к остановке i (плавно) */
  Widget.prototype.wallGo = function (i) {
    var h = this.hall;
    if (!h || !h.wall) return;
    i = Math.max(0, Math.min(h.stops.length - 1, i));
    h.ts = h.stops[i].s;
    this.wallRun();
  };

  Widget.prototype.wallStep = function (d) {
    var h = this.hall;
    if (!h || !h.wall) return;
    this.wallGo(this.wallNearest(h.ts) + d);
  };

  /* Движение к цели: экспоненциально, пока не приехали */
  Widget.prototype.wallRun = function () {
    var self = this, h = this.hall;
    if (h.raf) return;
    h.last = 0;
    var tick = function (now) {
      h.raf = 0;
      if (self.hall !== h) return;
      var dt = h.last ? Math.min(0.05, (now - h.last) / 1000) : 0.016;
      h.last = now;
      var k = prefersReducedMotion() ? 1 : 1 - Math.exp(-dt * 5.5);
      h.s += (h.ts - h.s) * k;
      if (Math.abs(h.ts - h.s) < 0.6) h.s = h.ts;
      self.wallPlace();
      if (h.s !== h.ts || h.drag) h.raf = requestAnimationFrame(tick);
    };
    h.raf = requestAnimationFrame(tick);
  };

  Widget.prototype.bindWall = function () {
    var self = this, h = this.hall, stage = h.stage;
    var q = function (sel) { return stage.querySelector(sel); };
    var user = function () { self.stopTour(); self.hideHint(); };

    q('.artc-hw__prev').addEventListener('click', function () { user(); self.wallStep(-1); });
    q('.artc-hw__next').addEventListener('click', function () { user(); self.wallStep(1); });
    q('.artc-hw__tour').addEventListener('click', function () { self.toggleTour(); });
    q('.artc-hw__find').addEventListener('click', function () { user(); self.toggleFind(); });
    q('.artc-hw__music').addEventListener('click', function () { self.toggleMusic(); });
    this.musicShow();
    // музыка была включена в прошлый раз — с первым касанием зала (раньше браузер не даст)
    stage.addEventListener('pointerdown', function () {
      if (self.musicWant() && !(self.music && self.music.on)) self.toggleMusic(true);
    }, { once: true });
    q('.artc-hw__who').addEventListener('click', function () {
      var gi = this.getAttribute('data-artist');
      if (gi != null) { self.fromHall = true; self.lbFromHall = false; self.openArtist(+gi); }
    });
    h.fsBtn.addEventListener('click', function () { self.toggleFullscreen(); });

    var find = q('.artc-find');
    find.querySelector('.artc-find__close').addEventListener('click', function () { self.toggleFind(false); });
    find.querySelector('.artc-find__input').addEventListener('input', function () { self.fillFind(this.value); });
    find.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.stopPropagation(); self.toggleFind(false); }
      e.stopPropagation();
    });

    // Перетаскивание стены: вбок — листать, вертикально — страница листается
    // сама (touch-action: pan-y). Отпустили — к ближайшей работе, с учётом
    // броска: быстрый жест уводит на соседнюю.
    var drag = null;
    stage.addEventListener('pointerdown', function (e) {
      // во весь экран окна работы и карточки лежат внутри сцены — они не стена
      if (e.target.closest('.artc-hw__top, .artc-hw__nav, .artc-find, .artc-cur, .artc-modal, .artc-live, .artc-live-toasts')) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      user();
      try { stage.focus({ preventScroll: true }); } catch (err) { /* старый браузер */ }
      drag = { id: e.pointerId, x: e.clientX, s: h.s, moved: false, t: performance.now(), vx: 0, lx: e.clientX, lt: performance.now() };
    });
    stage.addEventListener('pointermove', function (e) {
      if (!drag || drag.id !== e.pointerId) return;
      var dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) > 6) {
        drag.moved = true;
        h.drag = true;
        try { stage.setPointerCapture(e.pointerId); } catch (err) { /* ok */ }
      }
      if (!drag.moved) return;
      var now = performance.now();
      drag.vx = (e.clientX - drag.lx) / Math.max(1, now - drag.lt);
      drag.lx = e.clientX; drag.lt = now;
      // пиксель экрана — столько пути вдоль стены
      var k = 1.35 * W_ART / Math.max(160, 0.5 * Math.min(stage.clientWidth * 1.1, stage.clientHeight * 0.85));
      var first = h.stops[0].s, last = h.stops[h.stops.length - 1].s;
      h.ts = h.s = Math.max(first - 200, Math.min(last + 200, drag.s - dx * k));
      self.wallRun();
    });
    var up = function (e) {
      if (!drag || drag.id !== e.pointerId) return;
      var d = drag;
      drag = null;
      h.drag = false;
      if (!d.moved) return;
      stage.wallMoved = performance.now();
      var i = self.wallNearest(h.s);
      if (Math.abs(d.vx) > 0.35) {
        var dir = d.vx < 0 ? 1 : -1;
        if ((h.stops[i].s - h.s) * dir <= 0) i += dir;     // бросок — к следующей по ходу
      }
      self.wallGo(i);
    };
    stage.addEventListener('pointerup', up);
    stage.addEventListener('pointercancel', up);

    // нажатия: полотно — работа во весь экран, табличка и имя — карточка
    stage.addEventListener('click', function (e) {
      if (e.target.closest('.artc-modal, .artc-live, .artc-live-toasts')) return;
      if (stage.wallMoved && performance.now() - stage.wallMoved < 350) return;   // это было перетаскивание
      var fin = e.target.closest('.artc-hw__go');
      if (fin) {
        if (fin.getAttribute('data-home')) self.wallGo(0);
        else self.switchSection(+fin.getAttribute('data-section'));
        return;
      }
      if (e.target.closest('.artc-hw__guide')) {
        user();
        self.openCurator(stage);
        return;
      }
      var art = e.target.closest('.artc-hw__art');
      if (art) {
        user();
        self.viewWork(+art.getAttribute('data-artist'), +art.getAttribute('data-work'));
        return;
      }
      var card = e.target.closest('.artc-hw__plq, .artc-hw__name');
      if (card) {
        user();
        self.fromHall = true;
        self.lbFromHall = false;
        self.openArtist(+card.getAttribute('data-artist'));
      }
    });

    // колесо: по горизонтали (тачпад) — всегда, вертикальное — только во
    // весь экран: иначе мышь над залом не могла бы листать страницу
    var acc = 0, accT = 0;
    stage.addEventListener('wheel', function (e) {
      if (e.target.closest('.artc-modal, .artc-live')) return;     // колесо над окном — прокрутка окна
      var fs = stage.classList.contains('is-fs');
      var d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (fs ? e.deltaY : 0);
      if (!d) return;
      e.preventDefault();
      user();
      var now = performance.now();
      if (now - accT > 400) acc = 0;
      accT = now;
      acc += d;
      if (Math.abs(acc) > 70) { self.wallStep(acc > 0 ? 1 : -1); acc = 0; }
    }, { passive: false });

    var onKey = function (e) {
      if (!self.hall || self.hall !== h) return;
      if (document.querySelector('.artc-modal.is-open')) return;
      var inStage = stage.contains(document.activeElement) || document.activeElement === stage;
      if (!inStage || /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) return;
      var k = e.key;
      if (k === 'ArrowRight' || k === 'ArrowDown' || k === 'PageDown') { user(); self.wallStep(1); e.preventDefault(); }
      else if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'PageUp') { user(); self.wallStep(-1); e.preventDefault(); }
      else if (k === 'Home') { user(); self.wallGo(0); e.preventDefault(); }
      else if (k === 'End') { user(); self.wallGo(h.stops.length - 1); e.preventDefault(); }
      else if (k === 'Enter' && e.target === stage) {
        var st = h.stops[h.cur];
        if (st && st.it) self.viewWork(st.seg.gi, st.it.wi);
      }
    };
    document.addEventListener('keydown', onKey);
    h.offKey = function () {
      document.removeEventListener('keydown', onKey);
      if (h.ro) h.ro.disconnect();
      if (h.raf) cancelAnimationFrame(h.raf);
      h.raf = 0;
    };
  };

  /* ---------------- тихая музыка ----------------

     Тот же плейлист, что и в 3D-галерее (gallery/src/audio.js — TRACKS):
     фортепиано, записи в общественном достоянии или CC0, выровнены по
     громкости. Выбор общий с 3D-галереей (localStorage «artg-sound»).
     Громкость — через Web Audio: на iPhone громкость <audio> не меняется. */
  var MUSIC = [
    ['satie-gymnopedie-1', 'Эрик Сати — Гимнопедия № 1', 'Робин Альсиаторе'],
    ['bach-goldberg-aria', 'И. С. Бах — Ария из «Гольдберг-вариаций»', 'Кимико Исидзака'],
    ['chopin-nocturne-op9-2', 'Фредерик Шопен — Ноктюрн op. 9 № 2', 'Фрэнк Леви'],
    ['debussy-clair-de-lune', 'Клод Дебюсси — «Лунный свет»', 'Лауренс Гудхарт'],
    ['beethoven-fur-elise', 'Людвиг ван Бетховен — «К Элизе»', 'Gaodifan'],
    ['chopin-nocturne-op48-1', 'Фредерик Шопен — Ноктюрн op. 48 № 1', 'Люк Фолкнер'],
    ['beethoven-moonlight-1', 'Людвиг ван Бетховен — «Лунная соната», I часть', 'Пол Питман']
  ];
  var MUSIC_KEY = 'artg-sound';
  var MUSIC_VOL = 0.3;

  Widget.prototype.musicWant = function () {
    try { return localStorage.getItem(MUSIC_KEY) === 'on'; } catch (e) { return false; }
  };

  Widget.prototype.musicShow = function () {
    var b = this.hall && this.hall.stage && this.hall.stage.querySelector('.artc-hw__music');
    if (!b) return;
    var on = !!(this.music && this.music.on);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
    b.setAttribute('aria-label', on ? 'Выключить музыку' : 'Включить тихую музыку');
  };

  Widget.prototype.toggleMusic = function (force) {
    var self = this;
    var m = this.music;
    var on = force === undefined ? !(m && m.on) : !!force;
    if (force === undefined) { try { localStorage.setItem(MUSIC_KEY, on ? 'on' : 'off'); } catch (e) { /* приватный режим */ } }
    if (on && !m) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) { /* нет — не страшно */ }
      m = this.music = { ctx: new AC(), ti: Math.floor(Math.random() * MUSIC.length), on: false, fails: 0 };
      m.gain = m.ctx.createGain();
      m.gain.gain.value = 0;
      m.gain.connect(m.ctx.destination);
      m.audio = new Audio();
      m.audio.crossOrigin = 'anonymous';
      m.audio.preload = 'auto';
      m.ctx.createMediaElementSource(m.audio).connect(m.gain);
      var load = function () { m.audio.src = self.url('music/' + MUSIC[m.ti][0] + '.mp3'); };
      m.play = function () { var pr = m.audio.play(); if (pr && pr.catch) pr.catch(function () {}); };
      m.next = function (pause) {
        clearTimeout(m.nextT);
        m.nextT = setTimeout(function () {
          m.ti = (m.ti + 1) % MUSIC.length;
          load();
          if (m.on && !document.hidden) m.play();
        }, pause);
      };
      m.audio.addEventListener('ended', function () { m.fails = 0; m.next(1500); });
      m.audio.addEventListener('error', function () { if (++m.fails < MUSIC.length) m.next(2000); });
      m.audio.addEventListener('playing', function () {
        if (m.on) self.showHint('♪ ' + MUSIC[m.ti][1] + ' · исп. ' + MUSIC[m.ti][2]);
      });
      document.addEventListener('visibilitychange', function () {
        if (!m.on) return;
        if (document.hidden) m.audio.pause(); else m.play();
      });
      load();
    }
    if (!m) return;
    m.on = on;
    clearTimeout(m.pauseT);
    var t = m.ctx.currentTime;
    m.gain.gain.cancelScheduledValues(t);
    m.gain.gain.setTargetAtTime(on ? MUSIC_VOL : 0, t, 0.25);
    if (on) {
      if (m.ctx.state === 'suspended') m.ctx.resume();
      m.play();
    } else {
      m.pauseT = setTimeout(function () { if (!m.on) m.audio.pause(); }, 900);
    }
    this.musicShow();
  };

  Widget.prototype.blurArt = function () {};

  Widget.prototype.hideHint = function () {
    var hint = this.hall && this.hall.stage.querySelector('.artc-hint');
    if (!hint) return;
    hint.style.animation = '';                 // вернуть css-анимацию ухода
    if (!hint.classList.contains('is-hidden')) hint.classList.add('is-hidden');
  };

  /* Ненадолго показать подсказку поверх зала — тем же элементом, что и
     подсказка на входе. Появление задаём инлайном, иначе сработала бы
     анимация входа с её паузой. */
  Widget.prototype.showHint = function (text) {
    var self = this;
    var hint = this.hall && this.hall.stage.querySelector('.artc-hint');
    if (!hint) return;
    hint.querySelector('span').innerHTML = text;
    hint.classList.remove('is-hidden');
    hint.style.animation = 'artc-hint-in .45s ease-out both';
    clearTimeout(this.hintT);
    this.hintT = setTimeout(function () { self.hideHint(); }, 5000);
  };

  Widget.prototype.toggleFind = function (on) {
    var h = this.hall;
    if (!h) return;
    var box = h.stage.querySelector('.artc-find');
    if (!box) return;
    if (on === undefined) on = box.hidden;
    box.hidden = !on;
    h.stage.classList.toggle('is-finding', on);
    if (on) {
      this.stopTour();
      this.findLetter = '';
      this.fillFind('');
      var input = box.querySelector('.artc-find__input');
      input.value = '';
      try { input.focus({ preventScroll: true }); } catch (e) { input.focus(); }
    }
  };

  Widget.prototype.fillFind = function (query) {
    var h = this.hall;
    var box = h.stage.querySelector('.artc-find');
    var list = box.querySelector('.artc-find__list');
    var self = this;
    var q = (query || '').trim().toLowerCase();
    var html = '';
    var found = 0;

    // указатель по первой букве — тем же составом, что и в каталоге
    var abc = box.querySelector('.artc-find__abc');
    var seen = {}, letters = [];
    h.rooms.forEach(function (room) {
      var L = firstLetter(room.name);
      if (!seen[L]) { seen[L] = 1; letters.push(L); }
    });
    letters.sort(function (a, b) {
      if (a === '#') return 1;
      if (b === '#') return -1;
      var ra = /[А-ЯЁ]/.test(a), rb = /[А-ЯЁ]/.test(b);
      if (ra !== rb) return ra ? -1 : 1;
      return a < b ? -1 : a > b ? 1 : 0;
    });
    abc.innerHTML = letters.map(function (L) {
      return '<button type="button" data-letter="' + L + '"' +
        (self.findLetter === L ? ' class="is-active" aria-pressed="true"' : ' aria-pressed="false"') +
        '>' + (L === '#' ? '…' : L) + '</button>';
    }).join('');
    abc.hidden = letters.length < 2;
    if (!abc.bound) {
      abc.bound = true;
      abc.addEventListener('click', function (e) {
        var b = e.target.closest('[data-letter]');
        if (!b) return;
        var L = b.getAttribute('data-letter');
        self.findLetter = (self.findLetter === L) ? '' : L;
        self.fillFind(box.querySelector('.artc-find__input').value);
      });
    }

    h.rooms.forEach(function (room, i) {
      if (self.findLetter && firstLetter(room.name) !== self.findLetter) return;
      var hay = (room.name + ' ' + (room.city || '')).toLowerCase();
      if (q && hay.indexOf(q) === -1) return;
      found++;
      html += '<li><button type="button" data-room="' + i + '">' +
        '<span class="artc-find__ava"><img src="' + esc(room.avatar) + '" alt="" loading="lazy"></span>' +
        '<span class="artc-find__meta"><b>' + esc(room.name) + '</b>' +
        (room.city ? '<span>' + esc(room.city) + '</span>' : '') + '</span></button></li>';
    });
    list.innerHTML = html;
    box.querySelector('.artc-find__empty').hidden = !!found;

    if (!list.bound) {
      list.bound = true;
      list.addEventListener('click', function (e) {
        var b = e.target.closest('[data-room]');
        if (!b) return;
        var room = self.hall.rooms[+b.getAttribute('data-room')];
        self.toggleFind(false);
        // далеко — без долгой прокрутки мимо сотни работ: сразу на место
        var h2 = self.hall, target = h2.stops[room.stop].s;
        if (Math.abs(target - h2.s) > 6000) h2.s = target + (target > h2.s ? -900 : 900);
        self.wallGo(room.stop);
      });
    }
  };

  /* ---------------- автоэкскурсия ---------------- */

  /* Работы сменяются сами, по W_TOUR мс на каждую; любое действие
     посетителя экскурсию прерывает. */
  Widget.prototype.toggleTour = function () {
    if (this.tour) { this.stopTour(); return; }
    var h = this.hall;
    if (!h || !h.wall) return;
    var self = this;
    this.tour = { t: null };
    h.stage.classList.add('is-touring');
    var b = h.stage.querySelector('.artc-hw__tour');
    if (b) b.setAttribute('aria-pressed', 'true');
    this.hideHint();
    var step = function () {
      if (!self.tour || self.hall !== h) return;
      if (h.cur >= h.stops.length - 1) { self.stopTour(); return; }
      self.wallStep(1);
      self.tour.t = setTimeout(step, W_TOUR);
    };
    this.tour.t = setTimeout(step, 600);
  };

  Widget.prototype.stopTour = function () {
    if (!this.tour) return;
    clearTimeout(this.tour.t);
    this.tour = null;
    if (this.hall) {
      this.hall.stage.classList.remove('is-touring');
      var b = this.hall.stage.querySelector('.artc-hw__tour');
      if (b) b.setAttribute('aria-pressed', 'false');
    }
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

  /* Запасной «во весь экран» для браузеров без Fullscreen API (iPhone).

     Зал на это время переезжает прямо в body. Иначе position: fixed ловится
     ближайшим предком с трансформацией — а такой предок почти всегда есть:
     и наша анимация появления раздела, и блоки Tilda с их эффектами
     появления. Для fixed-потомка такой предок становится «экраном», и зал
     разворачивается не на весь экран, а внутрь предка (у нас выходило
     334×0 пикселя). Обёртка .artc-root нужна ради css-переменных: без неё
     зал в body остался бы без фирменных цветов и шрифта. */
  Widget.prototype.fsFallback = function (on) {
    var stage = this.hall.stage;
    this.fsFake = on;

    if (on && !this.fsHost) {
      this.fsSlot = document.createComment('artcatalog-fs');
      stage.parentNode.insertBefore(this.fsSlot, stage);
      this.fsHost = el('div', 'artc-root artc-fs-host');
      document.body.appendChild(this.fsHost);
      this.fsHost.appendChild(stage);
    }

    stage.style.width = on ? '100%' : '';
    stage.style.height = on ? '100%' : '';
    stage.style.maxWidth = on ? 'none' : '';
    stage.style.borderRadius = on ? '0' : '';
    document.body.style.overflow = on ? 'hidden' : '';

    if (!on && this.fsHost) {
      if (this.fsSlot && this.fsSlot.parentNode) {
        this.fsSlot.parentNode.insertBefore(stage, this.fsSlot);
        this.fsSlot.parentNode.removeChild(this.fsSlot);
      } else {
        this.wrap.querySelector('.artc-view--hall').appendChild(stage);
      }
      this.fsSlot = null;
      this.fsHost.parentNode.removeChild(this.fsHost);
      this.fsHost = null;
    }

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
    if (on && this.live) this.liveAutoOpen(stage);

    // зал не пересобираем (выбросило бы из полного экрана): камера сама
    // подстраивает расстояние под новый размер сцены
    setTimeout(function () { self.wallPlace(true); }, 80);
  };

  Widget.prototype.fsBtnLabel = function (on) {
    var b = this.hall && this.hall.fsBtn;
    // у кнопки простого зала видимая подпись («Полный экран» / «Свернуть») — она и есть имя кнопки
    if (b && !b.querySelector('.artc-fs__t')) b.setAttribute('aria-label', on ? 'Выйти из полноэкранного режима' : 'Открыть на весь экран');
  };

  /* ---------------- куратор ----------------

     Фигура куратора стоит в холле 3D-галереи и в начале каждого раздела
     простого зала, над ней облачко с приветствием. Нажатие
     открывает окно вопросов — внутри сцены, чтобы оно работало и во весь
     экран. Ответ приходит текстом в облачке.

     data-curator — адрес приложения на сервере (…/api/artcatalog/curator/):
     там готовые ответы и нейросеть GigaChat. Без него, или если сервер не
     ответил, — готовые ответы из curator/faq.json прямо в браузере. */
  var CUR_HELLO = 'Добро пожаловать на виртуальную выставку! Меня зовут Татьяна. Могу Вам помочь?';
  var CUR_FALLBACK = 'Хороший вопрос! Точно ответят организаторы выставки — напишите на ads@donexpocentre.ru, и Вам подскажут.';
  // общие слова в названиях участников: по ним художника не узнаём
  var CUR_COMMON = ['карти', 'худож', 'галер', 'студи', 'мастер', 'школ', 'творч', 'объед', 'искус',
    'салон', 'центр', 'клуб', 'союз', 'ассоц', 'проект', 'арт', 'art', 'gallery'];

  function curNorm(t) {
    return String(t || '').toLowerCase().replace(/ё/g, 'е').replace(/[^0-9a-zа-я]+/g, ' ').trim();
  }
  // грубая основа слова: «билеты» и «билетов» совпадут
  function curStem(w) { return w.length > 5 ? w.slice(0, Math.max(4, w.length - 2)) : w; }
  function curWords(t) {
    return curNorm(t).split(' ').filter(function (w) { return w.length > 1; }).map(curStem);
  }
  // короткие слова — только точно («вы», «где»), длинные — по основе
  function curSame(a, b) {
    if (a === b) return true;
    if (a.length < 4 || b.length < 4) return false;
    return a.indexOf(b) === 0 || b.indexOf(a) === 0;
  }
  var CUR_SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;

  /* Русский женский голос устройства; мужские (Pavel, Yuri, Dmitry…) — в конец */
  function curFemaleVoice() {
    var vs = (window.speechSynthesis && speechSynthesis.getVoices()) || [];
    var ru = vs.filter(function (v) { return /^ru/i.test(v.lang); });
    if (!ru.length) return null;
    var male = /pavel|yuri|dmitr|maxim|maksim|artem|ivan|nikolai|male|муж|павел|юрий|дмитрий|максим/i;
    var female = /irina|svetlana|milena|ekaterina|katya|alena|alyona|anna|daria|dariya|elena|tatyana|female|женск|алёна|алена|ирина|светлана|милена|google/i;
    var best = null, bs = -1;
    ru.forEach(function (v) {
      var s = (female.test(v.name) ? 2 : 0) - (male.test(v.name) ? 3 : 0) + (/natural|online|neural/i.test(v.name) ? 1 : 0);
      if (s > bs) { bs = s; best = v; }
    });
    return best;
  }
  // список голосов в Chrome приходит не сразу — просим заранее
  if (window.speechSynthesis) { try { speechSynthesis.getVoices(); } catch (e) { /* нет */ } }

  function curHas(words, part) {
    for (var i = 0; i < words.length; i++) if (curSame(words[i], part)) return true;
    return false;
  }
  // фамилия в другом падеже: «Шитовой» — «Шитова», но «Ростове» — не «Ростовцева»
  function curName(w, t) {
    if (w === t) return true;
    var n = Math.min(w.length, t.length);
    if (n < 4 || Math.abs(w.length - t.length) > 2) return false;
    var k = Math.max(4, n - 1);
    return w.slice(0, k) === t.slice(0, k);
  }

  Widget.prototype.curatorData = function (cb) {
    var self = this;
    if (this.curFaq) { cb(this.curFaq); return; }
    (this.curWait = this.curWait || []).push(cb);
    if (this.curWait.length > 1) return;
    var done = function (d) {
      self.curFaq = d && d.items ? d : { items: [] };
      var w = self.curWait;
      self.curWait = [];
      w.forEach(function (f) { f(self.curFaq); });
    };
    fetch(this.base + 'curator/faq.json', { credentials: 'same-origin' })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(done, function () { done(null); });
  };

  /* Готовый ответ: подходит ключ, все слова которого есть в вопросе */
  Widget.prototype.curatorMatch = function (q) {
    var words = curWords(q), best = null, bn = 0;
    ((this.curFaq || {}).items || []).forEach(function (it) {
      var n = 0;
      (it.keys || []).forEach(function (k) {
        var parts = curWords(k);
        if (parts.length && parts.every(function (p) { return curHas(words, p); })) n++;
      });
      if (n > bn) { bn = n; best = it; }
    });
    return best;
  };

  /* Художник, названный в вопросе по имени или фамилии, — его номер или −1 */
  Widget.prototype.curatorArtist = function (q) {
    var words = curNorm(q).split(' ').filter(function (w) { return w.length >= 4; });
    if (!words.length) return -1;
    var best = -1, bs = 0;
    this.artists.forEach(function (a, gi) {
      var s = 0;
      curNorm(a.name).split(' ').forEach(function (t) {
        if (t.length < 4) return;
        for (var c = 0; c < CUR_COMMON.length; c++) if (t.indexOf(CUR_COMMON[c]) === 0) return;
        for (var k = 0; k < words.length; k++) if (curName(words[k], t)) { s++; return; }
      });
      if (s > bs) { bs = s; best = gi; }
    });
    return best;
  };

  Widget.prototype.curatorMode = function () { return this.gl ? '3d' : 'simple'; };

  Widget.prototype.curatorLocal = function (q) {
    var it = this.curatorMatch(q), gi = this.curatorArtist(q);
    // названный художник важнее общих ответов («где работы Шитовой» — не про адрес
    // выставки), кроме ответа о покупке
    if (it && (gi < 0 || it.id === 'buy')) return (this.curatorMode() === 'simple' && it.a_simple) || it.a;
    if (gi >= 0) {
      var a = this.artists[gi], n = (a.works || []).length, sec = this.sections[a.secIndex];
      return a.name + (a.city ? ' (' + a.city + ')' : '') + ' — ' + n + ' ' + plural(n, 'работа', 'работы', 'работ') +
        (sec && this.sections.length > 1 ? ' в разделе «' + sec.title + '»' : '') + '. Проводить Вас к ним?';
    }
    return (this.curFaq || {}).fallback || CUR_FALLBACK;
  };

  /* Ответ: сервер (если задан), иначе или при ошибке — готовые ответы */
  Widget.prototype.curatorAsk = function (q, cb) {
    var self = this, url = this.curatorUrl;
    var local = function () { cb(self.curatorLocal(q)); };
    if (!url || !window.fetch) { setTimeout(local, 500); return; }
    var ctl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 20000);
    fetch(url + 'ask/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: q, history: this.curLog.slice(-2), mode: this.curatorMode() }),
      credentials: 'omit',
      signal: ctl ? ctl.signal : undefined
    }).then(function (r) {
      return r.json().then(function (d) { return { status: r.status, d: d || {} }; });
    }).then(function (res) {
      clearTimeout(timer);
      if (res.d.answer) cb(res.d.answer, res.d.voice ? url + res.d.voice : null);
      else if (res.status === 429 && res.d.error) cb(res.d.error);
      else local();
    }).catch(function () { clearTimeout(timer); local(); });
  };

  Widget.prototype.buildCurator = function () {
    var self = this;
    var p = this.curPanel = el('div', 'artc-cur');
    p.setAttribute('role', 'dialog');
    p.setAttribute('aria-label', 'Вопрос куратору');
    p.innerHTML =
      '<div class="artc-cur__head">' +
        '<img class="artc-cur__face" src="' + esc(this.base + 'curator/face.webp') + '" alt="" width="44" height="44">' +
        '<div class="artc-cur__who"><b>' + esc(this.curatorName || 'Татьяна') + '</b>' +
          '<span>куратор выставки «Арт-Ростов»</span></div>' +
        (window.speechSynthesis ? '<button type="button" class="artc-cur__voice" aria-pressed="false" ' +
          'aria-label="Озвучивать ответы голосом" title="Озвучивать ответы"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h4l5-4v14l-5-4H4z"/><path class="artc-cur__wave" d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/></svg></button>' : '') +
        '<button type="button" class="artc-cur__close" aria-label="Закрыть">' +
          '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
      '</div>' +
      '<div class="artc-cur__log" aria-live="polite"></div>' +
      '<div class="artc-cur__chips"></div>' +
      '<form class="artc-cur__form">' +
        '<input type="text" class="artc-cur__input" maxlength="300" autocomplete="off" enterkeyhint="send" ' +
          'placeholder="Спросите о выставке" aria-label="Ваш вопрос">' +
        (CUR_SR ? '<button type="button" class="artc-cur__mic" aria-pressed="false" ' +
          'aria-label="Сказать вопрос голосом" title="Сказать голосом"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg></button>' : '') +
        '<button type="submit" class="artc-cur__send" aria-label="Спросить">' +
          '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>' +
      '</form>';
    this.curLog = [];
    var log = p.querySelector('.artc-cur__log');
    var input = p.querySelector('.artc-cur__input');

    // окно — часть сцены: жесты и колесо над ним не ходят по залу
    ['pointerdown', 'mousedown', 'touchstart', 'wheel'].forEach(function (ev) {
      p.addEventListener(ev, function (e) { e.stopPropagation(); }, { passive: true });
    });
    p.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') self.closeCurator();
      e.stopPropagation();
    });
    p.querySelector('.artc-cur__close').addEventListener('click', function () { self.closeCurator(); });
    var mic = p.querySelector('.artc-cur__mic');
    if (mic) mic.addEventListener('click', function () { self.curatorListen(); });
    var voice = p.querySelector('.artc-cur__voice');
    if (voice) {
      var on = false;
      try { on = localStorage.getItem('artc-cur-voice') === '1'; } catch (e) { /* приватный режим */ }
      this.curatorVoice(on);
      voice.addEventListener('click', function () { self.curatorVoice(!self.curVoiceOn, true); });
    }
    p.querySelector('.artc-cur__form').addEventListener('submit', function (e) {
      e.preventDefault();
      var q = input.value.replace(/\s+/g, ' ').trim();
      if (q.length < 2 || self.curBusy) return;
      if (self.curRec) self.curRec.stop();
      input.value = '';
      self.curatorAudio();
      self.curatorSay(q);
    });
    p.querySelector('.artc-cur__chips').addEventListener('click', function (e) {
      var b = e.target.closest('[data-q]');
      if (!b || self.curBusy) return;
      b.parentNode.removeChild(b);
      self.curatorAudio();
      self.curatorSay(b.getAttribute('data-q'));
    });
    log.addEventListener('click', function (e) {
      var b = e.target.closest('[data-go]');
      if (b) self.curatorGo(+b.getAttribute('data-go'));
    });

    this.curatorData(function (faq) {
      self.curatorMsg('cur', faq.greeting || 'Здравствуйте! ' + CUR_HELLO, true);
      var chips = p.querySelector('.artc-cur__chips');
      (faq.chips || []).forEach(function (id) {
        (faq.items || []).forEach(function (it) {
          if (it.id !== id || !it.q) return;
          var b = el('button', 'artc-cur__chip', esc(it.q));
          b.type = 'button';
          b.setAttribute('data-q', it.q);
          chips.appendChild(b);
        });
      });
    });
    return p;
  };

  /* Реплика в окне: who — 'cur' (куратор) или 'me' (посетитель) */
  Widget.prototype.curatorMsg = function (who, text, instant, go) {
    var log = this.curPanel.querySelector('.artc-cur__log');
    var m = el('div', 'artc-cur__msg artc-cur__msg--' + who);
    log.appendChild(m);
    var end = function () {
      if (go >= 0) {
        var b = el('button', 'artc-cur__go', 'Перейти к работам →');
        b.type = 'button';
        b.setAttribute('data-go', go);
        m.appendChild(b);
      }
      log.scrollTop = log.scrollHeight;
    };
    if (instant || who === 'me' || prefersReducedMotion()) {
      m.textContent = text;
      end();
      return m;
    }
    // ответ «печатается» — как будто куратор говорит; целиком за 1–2.5 с
    var i = 0, step = Math.max(2, Math.round(text.length / 70));
    var span = document.createElement('span');
    m.appendChild(span);
    m.classList.add('is-talking');
    var self = this;
    var tick = function () {
      if (!m.parentNode) return;
      i = Math.min(text.length, i + step);
      span.textContent = text.slice(0, i);
      log.scrollTop = log.scrollHeight;
      if (i < text.length) self.curType = setTimeout(tick, 30);
      else { m.classList.remove('is-talking'); end(); }
    };
    tick();
    return m;
  };

  /* ---- голос: вопрос надиктовать, ответ услышать ----

     Распознавание — Web Speech API браузера (Chrome, Edge, Яндекс Браузер,
     Safari на iPhone и Mac): звук обрабатывает сервис браузера, на наш сервер
     уходит только текст. Расшифровка появляется в поле по мере речи, отправляет
     посетитель сам (можно поправить). Нет поддержки (Firefox) — кнопки нет.

     Озвучка — синтез речи самого устройства, бесплатно: русский женский
     голос (Google русский, Microsoft Irina/Svetlana, Milena на iPhone).
     Включается кнопкой в заголовке окна и сама — при первом вопросе голосом;
     выбор запоминается. */
  /* Где мы: на iPhone распознавание речи есть только в Safari — Chrome,
     Яндекс Браузер и встроенные браузеры приложений там на движке, которому
     Apple его не даёт */
  function curPlatform() {
    var ua = navigator.userAgent;
    var ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
    return {
      ios: ios,
      iosNotSafari: ios && (!/Safari\//.test(ua) || /CriOS|FxiOS|EdgiOS|YaBrowser|OPiOS|GSA\/|YaMail|Telegram|VKClient|Instagram|FBAN|FBAV/.test(ua)),
      android: /Android/.test(ua)
    };
  }

  /* Нажали на микрофон. Как у других сервисов: сначала системное окно
     «Разрешить доступ к микрофону?» (getUserMedia) — посетителю остаётся
     нажать «Разрешить»; инструкция — только если доступ уже запрещён */
  Widget.prototype.curatorListen = function () {
    var self = this, p = this.curPanel;
    var mic = p.querySelector('.artc-cur__mic');
    if (this.curRec) { this.curRec.stop(); return; }
    if (this.curMicWait) return;
    this.curatorStop();
    this.curatorAudio();
    if (curPlatform().iosNotSafari) { this.curatorMicHelp('ios-app'); return; }
    // первый вопрос голосом — и ответы голосом (разговор); выключить — кнопкой
    if (!this.curVoiceAsked && !this.curVoiceOn && p.querySelector('.artc-cur__voice')) this.curatorVoice(true, true);
    this.curVoiceAsked = true;
    if (this.curMicOk || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { this.curatorListenStart(false); return; }
    this.curMicWait = true;
    mic.classList.add('is-on');
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      stream.getTracks().forEach(function (t) { t.stop(); });
      self.curMicWait = false;
      self.curMicOk = true;
      mic.classList.remove('is-on');
      self.curatorListenStart(true);
    }, function (err) {
      self.curMicWait = false;
      mic.classList.remove('is-on');
      var n = err && err.name;
      self.curatorMicHelp(n === 'NotAllowedError' || n === 'SecurityError' ? 'not-allowed'
        : n === 'NotFoundError' || n === 'NotReadableError' ? 'audio-capture' : 'other');
    });
  };

  /* justAllowed — только что разрешили в системном окне: на iPhone первый
     запуск после окна иногда не проходит (нажатие «устарело») — тогда
     просим нажать на микрофон ещё раз, без инструкций */
  Widget.prototype.curatorListenStart = function (justAllowed) {
    var self = this, p = this.curPanel;
    var input = p.querySelector('.artc-cur__input'), mic = p.querySelector('.artc-cur__mic');
    var rec;
    try { rec = new CUR_SR(); } catch (e) { return; }
    rec.lang = 'ru-RU';
    rec.interimResults = true;
    rec.continuous = false;
    rec.maxAlternatives = 1;
    var ph = input.placeholder, got = false;
    var done = function (note) {
      self.curRec = null;
      mic.classList.remove('is-on');
      mic.setAttribute('aria-pressed', 'false');
      input.placeholder = note || ph;
      if (note) setTimeout(function () { if (input.placeholder === note) input.placeholder = ph; }, 4000);
      if (got && !isTouch()) input.focus();
    };
    rec.onresult = function (e) {
      var t = '';
      for (var i = 0; i < e.results.length; i++) t += e.results[i][0].transcript;
      input.value = t.charAt(0).toUpperCase() + t.slice(1);
      got = true;
    };
    rec.onerror = function (e) {
      rec.onend = null;
      if (e.error === 'no-speech' || e.error === 'aborted') { done(e.error === 'no-speech' ? 'Не расслышала — нажмите и говорите' : ''); return; }
      var denied = e.error === 'not-allowed' || e.error === 'service-not-allowed';
      if (denied && justAllowed) { done('Нажмите на микрофон ещё раз'); return; }
      done('');
      // микрофон разрешён, а распознавание не пускают — на iPhone это выключенная диктовка
      self.curatorMicHelp(denied && self.curMicOk ? (curPlatform().ios ? 'dictation' : 'service') : e.error);
    };
    rec.onend = function () { done(''); };
    this.curRec = rec;
    mic.classList.add('is-on');
    mic.setAttribute('aria-pressed', 'true');
    input.value = '';
    input.placeholder = 'Говорите…';
    try { rec.start(); } catch (e) { done(''); }
  };

  /* Микрофон не дали — объясняем в окне, что сделать, а не одной строкой в поле.
     Встроенные браузеры приложений (почта, мессенджеры) распознавание речи
     не пускают вовсе — там совет открыть страницу в обычном браузере. */
  Widget.prototype.curatorMicHelp = function (err) {
    var pl = curPlatform(), text, copy = false;
    if (err === 'ios-app') {
      text = 'На iPhone говорить со мной голосом можно только в Safari. Откройте эту страницу в Safari — или просто напишите вопрос.';
      copy = true;
    } else if (err === 'not-allowed' && pl.ios) {
      text = 'Микрофон для сайтов выключен. Откройте Настройки → Приложения → Safari → Микрофон и выберите «Спрашивать». ' +
        'Вернитесь сюда и снова нажмите на микрофон. (На iOS 17 и раньше: Настройки → Safari → Микрофон.)';
    } else if (err === 'not-allowed' && pl.android) {
      text = 'Микрофон для этого сайта запрещён. Нажмите на значок слева от адреса сайта → «Разрешения» → «Микрофон» → «Разрешить», ' +
        'затем снова нажмите на микрофон.';
    } else if (err === 'not-allowed') {
      text = 'Микрофон для этого сайта запрещён. Нажмите на значок слева от адреса сайта → «Микрофон» → «Разрешить», ' +
        'обновите страницу и снова нажмите на микрофон.';
    } else if (err === 'dictation') {
      text = 'Чтобы я Вас услышала, на iPhone должна быть включена диктовка: Настройки → Основные → Клавиатура → «Включить диктовку». ' +
        'Потом снова нажмите на микрофон.';
    } else if (err === 'audio-capture') {
      text = 'Не нашла микрофон — возможно, он занят другим приложением. Или просто напишите вопрос, я отвечу.';
    } else {
      text = 'Распознавание речи сейчас недоступно — напишите вопрос, я отвечу.';
    }
    this.curPanel.querySelector('.artc-cur__input').placeholder = 'Спросите о выставке';
    var m = this.curatorMsg('cur', text, true);
    m.classList.add('artc-cur__msg--help');
    if (copy && navigator.clipboard) {
      var b = el('button', 'artc-cur__go', 'Скопировать ссылку на страницу');
      b.type = 'button';
      b.addEventListener('click', function () {
        navigator.clipboard.writeText(location.href).then(function () { b.textContent = 'Ссылка скопирована — вставьте её в Safari'; });
      });
      m.appendChild(b);
    }
  };

  Widget.prototype.curatorVoice = function (on, byUser) {
    this.curVoiceOn = !!on;
    var b = this.curPanel && this.curPanel.querySelector('.artc-cur__voice');
    if (b) {
      b.classList.toggle('is-on', this.curVoiceOn);
      b.setAttribute('aria-pressed', String(this.curVoiceOn));
      b.setAttribute('aria-label', this.curVoiceOn ? 'Не озвучивать ответы' : 'Озвучивать ответы голосом');
    }
    if (!byUser) return;
    try { localStorage.setItem('artc-cur-voice', this.curVoiceOn ? '1' : '0'); } catch (e) { /* приватный режим */ }
    this.curatorStop();
    if (this.curVoiceOn) this.curatorAudio();
    if (!window.speechSynthesis) return;
    // iPhone разрешает говорить только после нажатия: «пустая» фраза сейчас
    // открывает озвучку для ответов, которые придут позже
    if (this.curVoiceOn) {
      var u = new SpeechSynthesisUtterance(' ');
      u.volume = 0;
      speechSynthesis.speak(u);
    }
  };

  /* Живой голос — mp3 от службы куратора (Яндекс SpeechKit, голос Вера).
     Играет через Web Audio: на iPhone звук обычного <audio> мешает потом
     распознаванию речи, а «разблокированный» нажатием AudioContext играет и
     то, что пришло позже. Не пришло за 12 с или ошибка — голос устройства. */
  Widget.prototype.curatorAudio = function () {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try {
      if (!this.curCtx) this.curCtx = new AC();
      if (this.curCtx.state === 'suspended') this.curCtx.resume();
    } catch (e) { return null; }
    return this.curCtx;
  };

  Widget.prototype.curatorStop = function () {
    this.curPlay = (this.curPlay || 0) + 1;          // опоздавший ответ уже не заговорит
    if (this.curSrc) { try { this.curSrc.stop(); } catch (e) { /* уже */ } this.curSrc = null; }
    if (window.speechSynthesis) speechSynthesis.cancel();
  };

  Widget.prototype.curatorSpeak = function (text, voice) {
    if (!this.curVoiceOn || !text) return;
    this.curatorStop();
    var self = this, my = this.curPlay, ctx = voice && window.fetch && this.curatorAudio();
    var fallback = function () { if (self.curPlay === my) { self.curPlay++; self.curatorDeviceVoice(text); } };
    if (!ctx) { this.curatorDeviceVoice(text); return; }
    var timer = setTimeout(fallback, 12000);
    fetch(voice, { credentials: 'omit' }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.arrayBuffer();
    }).then(function (buf) {
      return new Promise(function (ok, bad) { ctx.decodeAudioData(buf, ok, bad); });
    }).then(function (audio) {
      clearTimeout(timer);
      if (self.curPlay !== my) return;
      var src = ctx.createBufferSource();
      src.buffer = audio;
      src.connect(ctx.destination);
      src.start(0);
      self.curSrc = src;
    }).catch(function () { clearTimeout(timer); fallback(); });
  };

  Widget.prototype.curatorDeviceVoice = function (text) {
    if (!window.speechSynthesis) return;
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text.replace(/[«»]/g, ''));
    u.lang = 'ru-RU';
    var v = curFemaleVoice();
    if (v) u.voice = v;
    u.rate = 1;
    u.pitch = 1.05;
    speechSynthesis.speak(u);
  };

  Widget.prototype.curatorSay = function (q) {
    var self = this, p = this.curPanel;
    var log = p.querySelector('.artc-cur__log');
    this.curatorMsg('me', q);
    var dots = el('div', 'artc-cur__msg artc-cur__msg--cur artc-cur__dots', '<i></i><i></i><i></i>');
    dots.setAttribute('aria-label', 'Куратор отвечает');
    log.appendChild(dots);
    log.scrollTop = log.scrollHeight;
    this.curBusy = true;
    p.classList.add('is-busy');
    var t0 = Date.now();
    this.curatorStop();
    this.curatorAsk(q, function (a, voice) {
      // многоточие — хотя бы полсекунды, иначе ответ «выпрыгивает»
      setTimeout(function () {
        if (dots.parentNode) dots.parentNode.removeChild(dots);
        self.curBusy = false;
        p.classList.remove('is-busy');
        self.curLog.push({ q: q, a: a });
        self.curatorMsg('cur', a, false, self.curatorArtist(q));
        self.curatorSpeak(a, voice);
      }, Math.max(0, 600 - (Date.now() - t0)));
    });
  };

  /* Открыть окно внутри host (сцена зала — так оно видно и во весь экран) */
  Widget.prototype.openCurator = function (host) {
    if (!host) return;
    var p = this.curPanel || (this.curPanel = this.buildCurator());
    if (p.parentNode !== host) host.appendChild(p);
    p.hidden = false;
    host.classList.add('has-cur');
    if (this.hall && this.hall.wall) this.stopTour();
    // на телефоне поле само не фокусируем: выскочила бы клавиатура
    if (!isTouch()) {
      var input = p.querySelector('.artc-cur__input');
      setTimeout(function () { try { input.focus({ preventScroll: true }); } catch (e) { input.focus(); } }, 60);
    }
  };

  Widget.prototype.closeCurator = function () {
    var p = this.curPanel;
    if (!p || p.hidden) return;
    p.hidden = true;
    if (this.curRec) this.curRec.stop();
    this.curatorStop();
    var host = p.parentNode;
    if (host) {
      host.classList.remove('has-cur');
      try { host.focus({ preventScroll: true }); } catch (e) { /* старый браузер */ }
    }
  };

  /* ---------------- онлайн-режим ----------------
     Посетитель выбирает образ и имя — другие видят его в списке «Сейчас на
     выставке» (с местом: зал, художник) и могут пригласить к разговору;
     второй принимает приглашение, дальше — переписка тет-а-тет. Всё через
     службу на сервере (server/live), адрес — data-live блока на Tilda. */

  var LIVE_KEY = 'artc-live';
  // образы (outfit 0…7) — как avatars/f0.glb … m7.glb в 3D-зале; c — основной цвет одежды
  var LIVE_OUTFITS = {
    f: [
      { t: 'Деловой костюм', c: '#2B2B2E' }, { t: 'Платье', c: '#4A3024' },
      { t: 'Костюм с юбкой', c: '#7A6250' }, { t: 'Повседневный', c: '#C97A82' },
      { t: 'Блузка и юбка', c: '#4A5680' }, { t: 'Нарядный топ', c: '#5A4A48' },
      { t: 'Свитер и юбка', c: '#C8C8BC' }, { t: 'Летний', c: '#D8D6CC' }
    ],
    m: [
      { t: 'Чёрный костюм', c: '#26262A' }, { t: 'Тёмно-синий костюм', c: '#2C3448' },
      { t: 'Рубашка', c: '#8FA8C4' }, { t: 'Повседневный', c: '#A8302C' },
      { t: 'Клетчатый костюм', c: '#3A3836' }, { t: 'Белая рубашка', c: '#E6E6E2' },
      { t: 'Свитер', c: '#B8A488' }, { t: 'Джемпер', c: '#58585C' }
    ]
  };
  var liveBase = '';
  // смайлики для переписки — обычные символы Юникода: рисует шрифт устройства
  var LIVE_EMOJI = ['🙂', '😊', '😄', '😂', '😉', '😍', '🥰', '😎', '🤔', '😮', '😅', '😢',
    '👍', '👏', '🙏', '👋', '🤝', '❤️', '🔥', '✨', '🎉', '🎨', '🖼️', '🌸', '🌷', '☕', '🍰', '💐'];                // папка catalog.js — там avatars/*.webp
  var ICON_PEOPLE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5"/><circle cx="17" cy="9" r="2.6"/><path d="M15.8 14.2c2.3.1 4 1.7 4.6 4.3"/></svg>';
  var ICON_BACK = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>';
  var ICON_X = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var ICON_SEND = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* Значок образа: лицо в круге; big — портрет по пояс для окна выбора */
  function liveAvatar(sex, outfit, size, big) {
    sex = sex === 'm' ? 'm' : 'f';
    var o = LIVE_OUTFITS[sex][outfit] ? +outfit : 0;
    var s = size || 36;
    return '<img class="artc-live__ava' + (big ? ' artc-live__ava--big' : '') + '" src="' + liveBase + 'avatars/' + sex + o + (big ? '' : '-face') + '.webp" alt=""' +
      ' width="' + s + '" height="' + (big ? Math.round(s * 1.25) : s) + '" decoding="async"' +
      // не загрузилось (экономия трафика, сбой сети) — пустой кружок, а не значок битой картинки
      ' onerror="this.onerror=null;this.removeAttribute(\'src\')">';
  }

  function liveToken() {
    var a = new Uint8Array(24);
    (window.crypto || window.msCrypto).getRandomValues(a);
    var s = '';
    for (var i = 0; i < a.length; i++) s += String.fromCharCode(a[i]);
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  Widget.prototype.liveLoad = function () {
    var d = {};
    try { d = JSON.parse(localStorage.getItem(LIVE_KEY) || '{}') || {}; } catch (e) { /* приватный режим */ }
    if (!d.token) d.token = liveToken();
    return d;
  };

  Widget.prototype.liveSave = function () {
    var L = this.live, d = { token: L.token, name: L.name, sex: L.sex, outfit: L.outfit, off: !!L.off, consent: L.consent || 0 };
    try { localStorage.setItem(LIVE_KEY, JSON.stringify(d)); } catch (e) { /* приватный режим */ }
  };

  /* Запуск: онлайн-режим включён сразу. Первый визит — «Гость NN» в случайном
     образе (имя и образ можно сменить); сам выключил («Офлайн») — так и
     остаётся до «Включить». Общаться — после согласия на обработку данных. */
  Widget.prototype.liveInit = function () {
    if (this.live || !this.liveUrl || !window.WebSocket) return;
    liveBase = this.url('');
    var d = this.liveLoad();
    if (!d.name) {
      d.name = 'Гость ' + (10 + Math.floor(Math.random() * 90));
      d.sex = Math.random() < 0.5 ? 'f' : 'm';
      d.outfit = Math.floor(Math.random() * 8);
    }
    this.live = {
      token: d.token, name: d.name, sex: d.sex === 'm' ? 'm' : 'f', outfit: Math.min(7, Math.max(0, +d.outfit || 0)),
      off: !!d.off, want: !d.off, consent: +d.consent || 0,
      ws: null, up: false, me: null, roster: {}, convs: {}, invites: {},
      view: 'people', cur: null, retry: 0, err: '', pos: null, typingAt: 0
    };
    this.liveSave();
    var self = this;
    if (this.live.want) this.liveConnect();
    document.addEventListener('visibilitychange', function () {
      var L = self.live;
      if (!L) return;
      clearTimeout(L.hideT);
      // вкладку убрали надолго — посетитель ушёл с выставки; вернулся — снова здесь
      if (document.hidden) L.hideT = setTimeout(function () { self.liveDisconnect(true); }, 60000);
      else if (L.want && !L.ws) self.liveConnect();
    });
  };

  Widget.prototype.liveWsUrl = function () {
    var u = this.liveUrl;
    if (!/^https?:\/\//.test(u)) u = location.origin + (u.charAt(0) === '/' ? '' : '/') + u;
    return u.replace(/^http/, 'ws') + 'ws';
  };

  Widget.prototype.liveConnect = function () {
    var L = this.live, self = this;
    if (!L || L.ws) return;
    var ws;
    try { ws = new WebSocket(this.liveWsUrl()); } catch (e) { return; }
    L.ws = ws;
    ws.onopen = function () {
      L.retry = 0;
      ws.send(JSON.stringify({ t: 'hello', token: L.token, name: L.name, avatar: { sex: L.sex, outfit: L.outfit }, consent: !!L.consent, full: false }));
    };
    ws.onmessage = function (e) {
      var d;
      try { d = JSON.parse(e.data); } catch (x) { return; }
      self.liveOn(d);
    };
    ws.onclose = function () {
      if (L.ws !== ws) return;
      L.ws = null;
      L.up = false;
      self.liveShow();
      if (L.want && !L.banned && !document.hidden) {
        // переподключение с нарастающей паузой: 1, 2, 4, 8, 15 с
        var wait = Math.min(15000, 1000 * Math.pow(2, L.retry++));
        clearTimeout(L.retryT);
        L.retryT = setTimeout(function () { if (L.want && !L.ws) self.liveConnect(); }, wait);
      }
    };
    ws.onerror = function () { /* закрытие придёт следом */ };
  };

  Widget.prototype.liveDisconnect = function (keep) {
    var L = this.live;
    if (!L) return;
    clearTimeout(L.retryT);
    if (!keep) L.want = false;
    var ws = L.ws;
    L.ws = null;
    L.up = false;
    if (ws) { try { ws.close(); } catch (e) { /* уже закрыто */ } }
    this.livePeersSync();                 // фигуры других в 3D-зале пропадают
    this.liveShow();
  };

  Widget.prototype.liveSend = function (obj) {
    var L = this.live;
    if (L && L.ws && L.up && L.ws.readyState === 1) {
      try { L.ws.send(JSON.stringify(obj)); return true; } catch (e) { /* закрывается */ }
    }
    return false;
  };

  /* Сообщение от службы */
  Widget.prototype.liveOn = function (d) {
    var L = this.live, self = this;
    switch (d.t) {
      case 'welcome':
        L.up = true;
        L.err = '';
        L.me = d.me;
        L.roster = {};
        (d.roster || []).forEach(function (p) { L.roster[p.id] = p; });
        L.convs = {};
        (d.convs || []).forEach(function (c) { self.liveConvSet(c); });
        if (L.view === 'join') L.view = 'people';
        L.full = false;                     // служба после hello считает, что 3D нет
        this.livePeersSync();
        this.liveWhere(true);
        break;
      case 'join':
        L.roster[d.id] = d;
        this.livePeersSync();
        break;
      case 'leave':
        delete L.roster[d.id];
        if (this.gl && this.gl.peers) this.gl.peers.drop(d.id);
        this.liveEachConv(function (c) { if (c.with.id === d.id) c.online = false; });
        break;
      case 'place':
        if (L.roster[d.id]) { L.roster[d.id].where = d.where; L.roster[d.id].sec = d.sec; L.roster[d.id].room = d.room; }
        this.livePeersSync();
        break;
      case 'moves':
        // движения других — в 3D-зал, в реальном времени (список и кнопки не трогаем)
        if (this.gl && this.gl.peers) this.gl.peers.move(d.m, d.ts);
        return;
      case 'invite':
        L.invites[d.conv] = d;
        this.liveToast(d);
        this.liveBeep();
        break;
      case 'conv':
        this.liveConvSet(d.conv);
        var c = L.convs[d.conv.conv];
        if (d.conv.state === 'accepted' && c.mine && c.justAccepted !== false && L.view !== 'conv') {
          // собеседник принял наше приглашение — сразу в разговор
          c.justAccepted = false;
          this.liveOpenConv(c.conv);
        }
        if (c.mine && (d.conv.state === 'declined' || d.conv.state === 'expired')) {
          this.liveNote(d.conv.with.name + (d.conv.state === 'declined' ? ' сейчас не может поговорить' : ' не ответил(а) на приглашение'));
        }
        if (d.conv.state !== 'pending') { delete L.invites[d.conv.conv]; this.liveToastDrop(d.conv.conv); }
        break;
      case 'msg':
        var cv = L.convs[d.conv];
        if (!cv) break;
        if (d.n != null) cv.msgs = cv.msgs.filter(function (m) { return m.n !== d.n; });   // своё — вместо черновика
        if (!cv.msgs.some(function (m) { return m.id === d.m.id; })) cv.msgs.push(d.m);
        cv.typing = 0;
        if (d.m.from !== (L.me && L.me.id)) {
          var reading = L.view === 'conv' && L.cur === d.conv && this.livePanelOpen();
          if (reading) this.liveSend({ t: 'read', conv: d.conv });
          else { cv.unread = (cv.unread || 0) + 1; this.liveMsgToast(cv, d.m); this.liveBeep(); }
        }
        break;
      case 'del':
        if (L.convs[d.conv]) L.convs[d.conv].msgs = L.convs[d.conv].msgs.filter(function (m) { return m.id !== d.id; });
        break;
      case 'typing':
        if (L.convs[d.conv]) { L.convs[d.conv].typing = Date.now(); setTimeout(function () { self.liveRender(); }, 3200); }
        break;
      case 'reported':
        this.liveNote('Жалоба отправлена модератору. Спасибо!');
        break;
      case 'error':
        if (d.code === 'consent') { L.consent = 0; this.liveSave(); this.liveAskConsent(); break; }
        if (d.code === 'banned') { L.banned = true; L.want = false; this.liveSave(); }
        if (d.code === 'name' || d.code === 'token' || d.code === 'banned') {
          L.err = d.text;
          L.view = 'join';
          if (d.code !== 'banned') { L.want = false; this.liveDisconnect(); }
          this.livePanel(true);
        } else if (d.n != null) {
          // сообщение не ушло — черновик помечаем
          this.liveEachConv(function (c) { c.msgs.forEach(function (m) { if (m.n === d.n) m.failed = d.text; }); });
        } else {
          this.liveNote(d.text || 'Не получилось');
        }
        break;
    }
    this.liveShow();
  };

  Widget.prototype.liveEachConv = function (fn) {
    var cs = this.live.convs;
    for (var k in cs) if (Object.prototype.hasOwnProperty.call(cs, k)) fn(cs[k]);
  };

  Widget.prototype.liveConvSet = function (c) {
    var L = this.live, old = L.convs[c.conv];
    c.msgs = c.msgs || (old ? old.msgs : []);
    if (old && old.justAccepted === false) c.justAccepted = false;
    if (old && old.mine && old.state === 'pending' && c.state === 'accepted') c.justAccepted = true;
    L.convs[c.conv] = c;
  };

  /* Где посетитель: 3D (зал, координаты), простой зал (у чьих работ), каталог */
  Widget.prototype.liveWhere = function (force) {
    var L = this.live;
    if (!L || !L.up) return;
    var hallOn = this.wrap && this.wrap.querySelector('.artc-view--hall.is-active');
    var p;
    if (hallOn && this.gl && L.pos3d) p = L.pos3d;
    else if (hallOn && this.hall && this.hall.stops) {
      var st = this.hall.stops[this.hall.cur];
      p = { where: 'simple', sec: this.section || 0, room: st && st.seg && st.seg.gi != null ? st.seg.gi : -1, x: 0, z: 0, yaw: 0 };
    } else p = { where: 'catalog', sec: this.section || 0, room: -1, x: 0, z: 0, yaw: 0 };
    // позиции других 15 раз/с нужны только 3D-залу
    var full = !!(hallOn && this.gl && this.gl.peers);
    if (L.full !== full) { L.full = full; this.liveSend({ t: 'mode', full: full }); }
    var o = L.pos;
    if (!force && o && o.where === p.where && o.sec === p.sec && o.room === p.room &&
        Math.abs(o.x - p.x) < 0.05 && Math.abs(o.z - p.z) < 0.05 && Math.abs(o.yaw - p.yaw) < 0.03) return;
    L.pos = { where: p.where, sec: p.sec, room: p.room, x: p.x, z: p.z, yaw: p.yaw };
    this.liveSend({ t: 'pos', where: p.where, sec: p.sec, room: p.room, x: p.x, z: p.z, yaw: p.yaw });
  };

  /* Из 3D-галереи, не чаще 10 раз в секунду */
  Widget.prototype.liveMove = function (sec, room, x, z, yaw) {
    var L = this.live;
    if (!L) return;
    L.pos3d = { where: '3d', sec: sec, room: room, x: Math.round(x * 100) / 100, z: Math.round(z * 100) / 100, yaw: Math.round(yaw * 1000) / 1000 };
    var t = Date.now(), self = this;
    clearTimeout(L.moveT);
    if (t - (L.moveAt || 0) < 66) {
      // чаще 15 раз/с не шлём, но последнюю точку (остановку) — обязательно
      L.moveT = setTimeout(function () { L.moveAt = Date.now(); self.liveWhere(); }, 66 - (t - (L.moveAt || 0)));
      return;
    }
    L.moveAt = t;
    this.liveWhere();
  };

  /* Кто сейчас в 3D — фигурами в 3D-зале (кроме себя) */
  Widget.prototype.livePeersSync = function () {
    var L = this.live, P = this.gl && this.gl.peers;
    if (!L || !P) return;
    P.me = L.me ? L.me.id : null;
    var list = [];
    if (L.up) for (var k in L.roster) if (Object.prototype.hasOwnProperty.call(L.roster, k) && L.roster[k].where === '3d') list.push(L.roster[k]);
    P.set(list);
  };

  /* Нажали на фигуру в 3D: окно со списком, этот посетитель — отмечен */
  Widget.prototype.livePick = function (id) {
    var L = this.live;
    if (!L || !L.up) return;
    L.view = 'people';
    L.focus = id;
    this.livePanel(true);
    var row = this.livePanelEl && this.livePanelEl.querySelector('[data-pid="' + id + '"]');
    if (row) {
      row.scrollIntoView({ block: 'nearest' });
      row.classList.add('is-focus');
      setTimeout(function () { row.classList.remove('is-focus'); }, 1800);
    }
  };

  Widget.prototype.livePlace = function (p) {
    if (!p) return '';
    var sec = this.sections[p.sec];
    var st = sec ? sec.title : '';
    if (p.where === '3d') {
      if (p.sec < 0) return '3D-зал, холл';
      return (st || '3D-зал') + (p.room >= 0 ? ', зал ' + (p.room + 1) : '');
    }
    if (p.where === 'simple') {
      var a = this.artists[p.room];
      return a ? 'у работ: ' + a.name : (st || 'в зале');
    }
    if (p.where === 'catalog') return 'смотрит каталог';
    return 'на выставке';
  };

  /* ---------- кнопки «Онлайн» ---------- */

  /* Кнопка в сцене зала (простого и 3D) — под кнопками справа */
  /* Окно закрыл сам посетитель — до конца визита оно само не открывается */
  Widget.prototype.liveShut = function () {
    this.live.shut = true;
    try { sessionStorage.setItem('artc-live-shut', '1'); } catch (e) { /* приватный режим */ }
    this.livePanel(false);
  };

  /* Компьютер: вошёл в зал во весь экран («Войти в 3D-зал» или «Полный
     экран») — окно «Сейчас на выставке» открывается само, справа внизу: видно,
     кто рядом, и как сменить имя и образ. Пока зал на странице — не мешаем.
     Крестик — закрыть до конца визита. На телефоне — только по кнопке. */
  Widget.prototype.liveAutoOpen = function (host) {
    var L = this.live;
    if (!L || !L.want || L.shut || isTouch() || window.innerWidth <= 900) return;
    try { if (sessionStorage.getItem('artc-live-shut')) { L.shut = true; return; } } catch (e) { /* приватный режим */ }
    if (!host.classList.contains('is-fs') || this.livePanelOpen() || this.liveHostNow() !== host) return;
    this.livePanel(true, host);
  };

  Widget.prototype.liveMount = function (host) {
    if (!this.live || !host) return;
    if (host.querySelector('.artc-live-pill')) { this.liveAutoOpen(host); return; }
    var self = this;
    var b = el('button', 'artc-live-pill');
    b.type = 'button';
    b.innerHTML = ICON_PEOPLE + '<span class="artc-live-pill__t"></span><i class="artc-live-pill__n" hidden></i>';
    ['pointerdown', 'mousedown', 'touchstart'].forEach(function (ev) {
      b.addEventListener(ev, function (e) { e.stopPropagation(); }, { passive: true });
    });
    b.addEventListener('click', function (e) { e.stopPropagation(); self.liveToggle(self.liveHostNow()); });
    host.appendChild(b);
    host.classList.add('has-live');
    this.liveShow();
    this.liveAutoOpen(host);
  };

  Widget.prototype.liveHead = function () {
    if (!this.live || !this.wrap) return;
    var views = this.wrap.querySelector('.artc-views');
    if (!views || this.wrap.querySelector('.artc-live-pill--head')) return;
    var self = this;
    var b = el('button', 'artc-live-pill artc-live-pill--head');
    b.type = 'button';
    b.innerHTML = ICON_PEOPLE + '<span class="artc-live-pill__t"></span><i class="artc-live-pill__n" hidden></i>';
    b.addEventListener('click', function () { self.liveToggle(self.liveHostNow()); });
    views.parentNode.insertBefore(b, views.nextSibling);
  };

  /* Куда класть окно: в сцену зала, если зал на экране (так его видно и во весь
     экран), иначе — поверх страницы */
  Widget.prototype.liveHostNow = function () {
    var hallOn = this.wrap && this.wrap.querySelector('.artc-view--hall.is-active');
    var st = null;
    if (hallOn) st = (this.gl && this.gl.stage) || (this.hall && this.hall.stage) || null;
    // телефон: сцена на странице невысокая (~400 px) — окно на весь экран поверх
    // страницы; во весь экран сцена сама занимает экран — тогда в ней
    if (st && window.innerWidth <= 560 && !st.classList.contains('is-fs')) return null;
    return st;
  };

  Widget.prototype.liveCount = function () {
    var n = 0, r = this.live.roster;
    for (var k in r) if (Object.prototype.hasOwnProperty.call(r, k)) n++;
    return n;
  };

  Widget.prototype.liveUnread = function () {
    var n = 0;
    this.liveEachConv(function (c) { n += c.unread || 0; });
    for (var k in this.live.invites) if (Object.prototype.hasOwnProperty.call(this.live.invites, k)) n++;
    return n;
  };

  /* Подписи кнопок, счётчик непрочитанного, содержимое окна */
  Widget.prototype.liveShow = function () {
    var L = this.live;
    if (!L) return;
    var label = L.up ? 'На выставке: ' + (this.liveCount() + 1) : (L.want ? 'Подключаемся…' : 'Офлайн');
    var unread = L.up ? this.liveUnread() : 0;
    var pills = document.querySelectorAll('.artc-live-pill');
    for (var i = 0; i < pills.length; i++) {
      pills[i].querySelector('.artc-live-pill__t').textContent = label;
      var n = pills[i].querySelector('.artc-live-pill__n');
      n.hidden = !unread;
      n.textContent = unread > 9 ? '9+' : String(unread);
      pills[i].classList.toggle('is-on', !!L.up);
      pills[i].setAttribute('aria-label', label + (unread ? ', новых: ' + unread : ''));
    }
    this.liveRender();
  };

  /* ---------- окно ---------- */

  Widget.prototype.livePanelOpen = function () {
    return !!(this.livePanelEl && !this.livePanelEl.hidden);
  };

  Widget.prototype.liveToggle = function (host) {
    if (this.livePanelOpen() && this.livePanelEl.parentNode === (host || document.body)) this.liveShut();
    else this.livePanel(true, host);
  };

  Widget.prototype.livePanel = function (on, host) {
    var self = this, L = this.live;
    var p = this.livePanelEl;
    if (!p) {
      p = this.livePanelEl = el('div', 'artc-live');
      p.setAttribute('role', 'dialog');
      p.setAttribute('aria-label', 'Онлайн-режим');
      p.hidden = true;
      // окно — часть сцены: жесты и колесо над ним не ходят по залу
      ['pointerdown', 'mousedown', 'touchstart', 'wheel'].forEach(function (ev) {
        p.addEventListener(ev, function (e) { e.stopPropagation(); }, { passive: true });
      });
      p.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') self.liveShut();
        e.stopPropagation();
      });
      p.addEventListener('click', function (e) { self.liveClick(e); });
      p.addEventListener('mousedown', function (e) {
        if (e.target.closest('[data-emo],[data-live="emo"]')) e.preventDefault();
      });
      p.addEventListener('submit', function (e) { e.preventDefault(); self.liveSubmit(e.target); });
      p.addEventListener('input', function (e) {
        if (e.target.classList.contains('artc-live__input') && L.cur && Date.now() - L.typingAt > 2000) {
          L.typingAt = Date.now();
          self.liveSend({ t: 'typing', conv: L.cur });
        }
      });
      // телефон: клавиатура — окно ужимаем до видимой над ней части экрана
      var vv = window.visualViewport;
      if (vv && isTouch()) {
        var fit = function () { self.liveFit(); };
        vv.addEventListener('resize', fit);
        vv.addEventListener('scroll', fit);
        p.addEventListener('focusin', function (e) {
          if (e.target.tagName === 'INPUT') { fit(); setTimeout(fit, 300); }
        });
      }
    }
    if (!on) {
      if (!p.hidden) {
        p.hidden = true;
        this.liveFit();
        L.needConsent = false;
        var tb = document.querySelectorAll('.artc-live-toasts');
        for (var i = 0; i < tb.length; i++) tb[i].hidden = false;
        if (p.parentNode && p.parentNode.classList) p.parentNode.classList.remove('has-live-open');
      }
      return;
    }
    var target = host || this.liveHostNow() || document.body;
    if (p.parentNode !== target) target.appendChild(p);
    p.classList.toggle('artc-live--page', target === document.body);
    if (target.classList) target.classList.add('has-live-open');
    if (L.view === 'join' && !L.needConsent) L.view = 'people';
    p.hidden = false;
    this.liveRender(true);
    this.liveFit();
    if (this.hall && this.hall.wall) this.stopTour();
  };

  /* Экранная клавиатура телефона закрывает низ окна: браузер уменьшает только
     видимую часть экрана (visualViewport), раскладка остаётся прежней. Пока
     клавиатура открыта — окно ровно над ней, лента прокручена к последнему
     сообщению; закрылась — снова по CSS. */
  Widget.prototype.liveFit = function () {
    var p = this.livePanelEl, vv = window.visualViewport;
    if (!p || !vv) return;
    var st = p.style;
    var kb = p.hidden ? 0 : window.innerHeight - vv.height - vv.offsetTop;
    var on = kb > 80;
    var log = p.querySelector('.artc-live__log');
    var atBottom = !log || log.scrollHeight - log.scrollTop - log.clientHeight < 60;
    p.classList.toggle('is-kb', on);
    // анимация появления — только при открытии, не после клавиатуры
    if (on) p.classList.add('is-still');
    else if (p.hidden) p.classList.remove('is-still');
    if (!on) { st.top = st.bottom = st.height = st.maxHeight = ''; }
    else if (p.classList.contains('artc-live--page')) {
      // окно поверх страницы (fixed): вся видимая область над клавиатурой
      st.top = (vv.offsetTop + 8) + 'px';
      st.height = (vv.height - 16) + 'px';
      st.bottom = 'auto';
      st.maxHeight = 'none';
    } else if (p.parentNode && p.parentNode.getBoundingClientRect) {
      // окно в сцене зала (во весь экран): низ — над клавиатурой
      var r = p.parentNode.getBoundingClientRect();
      var top = Math.max(6, vv.offsetTop - r.top + 6);
      var bottom = Math.max(6, r.bottom - (vv.offsetTop + vv.height) + 6);
      st.top = top + 'px';
      st.bottom = bottom + 'px';
      st.height = 'auto';
      st.maxHeight = 'none';
    }
    if (log && atBottom) log.scrollTop = log.scrollHeight;
    // окно входа: поле имени и кнопка «Войти» — в видимой части, а не под прокруткой
    var ae = document.activeElement, body = on && ae && p.contains(ae) && ae.closest('.artc-live__body');
    if (body) {
      var go = body.querySelector('.artc-live__go'), br = body.getBoundingClientRect();
      var want = go ? go.getBoundingClientRect().bottom : ae.getBoundingClientRect().bottom;
      var d = want + 10 - br.bottom;
      if (d > 0) body.scrollTop += Math.min(d, ae.getBoundingClientRect().top - br.top - 8);
    }
  };

  Widget.prototype.liveRender = function (focus) {
    var p = this.livePanelEl, L = this.live;
    if (!p || p.hidden) return;
    var html;
    if (L.view === 'join') html = this.liveJoinHTML();
    else if (!L.want) html = this.liveOffHTML();
    else if (!L.up) html = this.liveHeadHTML('Онлайн-режим', '') + '<div class="artc-live__body"><p class="artc-live__wait">Подключаемся к выставке…</p></div>';
    else if (L.view === 'conv' && L.convs[L.cur]) html = this.liveConvHTML(L.convs[L.cur]);
    else html = this.livePeopleHTML();
    // поле ввода не пересобираем, если в нём пишут: сохраняем текст и курсор
    var inp = p.querySelector('.artc-live__input'), keep = null;
    // черновик сообщения переживает перерисовку, даже если поле без фокуса (нажали смайлик)
    if (inp && p.getAttribute('data-conv') === String(L.cur)) {
      keep = { v: inp.value, s: inp.selectionStart, f: document.activeElement === inp };
    }
    var logEl = p.querySelector('.artc-live__log');
    var atBottom = !logEl || logEl.scrollHeight - logEl.scrollTop - logEl.clientHeight < 40;
    p.innerHTML = html;
    p.setAttribute('data-conv', L.view === 'conv' ? String(L.cur) : '');
    var ni = p.querySelector('.artc-live__input');
    if (ni && keep && L.view === 'conv') {
      ni.value = keep.v;
      if (keep.f) try { ni.focus({ preventScroll: true }); ni.setSelectionRange(keep.s, keep.s); } catch (e) { /* нет выделения */ }
    } else if (ni && focus && !isTouch()) {
      setTimeout(function () { try { ni.focus({ preventScroll: true }); } catch (e) { ni.focus(); } }, 50);
    }
    var nl = p.querySelector('.artc-live__log');
    if (nl && (atBottom || focus)) nl.scrollTop = nl.scrollHeight;
    // пока просим согласие — всплывающие приглашения не закрывают галочку
    // (приглашение остаётся в списке с кнопкой «Принять»)
    var tb = document.querySelectorAll('.artc-live-toasts');
    for (var i = 0; i < tb.length; i++) tb[i].hidden = !!(L.needConsent && L.view === 'join');
  };

  Widget.prototype.liveHeadHTML = function (title, sub, back) {
    return '<div class="artc-live__head">' +
      (back ? '<button type="button" class="artc-live__icon" data-live="back" aria-label="К списку">' + ICON_BACK + '</button>' : '') +
      '<div class="artc-live__title"><b>' + esc(title) + '</b>' + (sub ? '<span>' + sub + '</span>' : '') + '</div>' +
      '<button type="button" class="artc-live__icon" data-live="close" aria-label="Закрыть">' + ICON_X + '</button>' +
    '</div>';
  };

  Widget.prototype.liveJoinHTML = function () {
    var L = this.live;
    var outfits = LIVE_OUTFITS[L.sex].map(function (o, i) {
      return '<button type="button" class="artc-live__look' + (i === L.outfit ? ' is-on' : '') + '" data-outfit="' + i + '" aria-pressed="' + (i === L.outfit) + '" title="' + o.t + '">' +
        liveAvatar(L.sex, i, 64, true) + '<span>' + o.t + '</span></button>';
    }).join('');
    var ck = L.ck != null ? L.ck : !!L.consent;
    var priv = this.privacyUrl
      ? ' в соответствии с <a href="' + esc(this.privacyUrl) + '" target="_blank" rel="noopener">Политикой обработки персональных данных</a>'
      : '';
    // согласие — отдельной галочкой, не отмеченной заранее (152-ФЗ, ст. 9); если
    // его просят ради действия — наверху формы, чтобы не искать под прокруткой
    var consent = '<label class="artc-live__consent' + (L.needConsent ? ' is-need' : '') + '">' +
        '<input type="checkbox" name="consent"' + (ck ? ' checked' : '') + '>' +
        '<span>Я даю согласие на обработку моих персональных данных' + priv + '</span></label>' +
      (L.needConsent ? '<p class="artc-live__err" role="alert">Чтобы приглашать к разговору и переписываться, отметьте согласие и нажмите «Сохранить»</p>' : '');
    return this.liveHeadHTML('Имя и образ', 'как вас видят другие посетители', true) +
      '<form class="artc-live__body artc-live__join" data-form="join">' +
        (L.needConsent ? consent + '<button type="submit" class="artc-live__go artc-live__go--top">Сохранить</button>' : '') +
        '<p class="artc-live__lead">Выберите образ и имя — так вас увидят другие посетители выставки и смогут пригласить к разговору.</p>' +
        '<div class="artc-live__sex" role="radiogroup" aria-label="Образ">' +
          '<button type="button" data-sex="f" role="radio" aria-checked="' + (L.sex === 'f') + '"' + (L.sex === 'f' ? ' class="is-on"' : '') + '>Женщина</button>' +
          '<button type="button" data-sex="m" role="radio" aria-checked="' + (L.sex === 'm') + '"' + (L.sex === 'm' ? ' class="is-on"' : '') + '>Мужчина</button>' +
        '</div>' +
        '<div class="artc-live__looks">' + outfits + '</div>' +
        '<label class="artc-live__label" for="artc-live-name">Ваше имя</label>' +
        '<input id="artc-live-name" class="artc-live__name" name="name" maxlength="24" autocomplete="given-name" placeholder="Например, Анна" value="' + esc(L.name) + '" required>' +
        '<p class="artc-live__hint">Имя видят все посетители выставки — можно указать псевдоним.</p>' +
        (L.err ? '<p class="artc-live__err" role="alert">' + esc(L.err) + '</p>' : '') +
        (L.needConsent ? '' : consent) +
        '<button type="submit" class="artc-live__go"' + (L.banned ? ' disabled' : '') + '>Сохранить</button>' +
      '</form>';
  };

  /* Офлайн: посетитель сам выключил онлайн-режим */
  Widget.prototype.liveOffHTML = function () {
    var L = this.live;
    return this.liveHeadHTML('Онлайн-режим выключен', '') +
      '<div class="artc-live__body">' +
        '<p class="artc-live__lead">Сейчас вы в офлайн-режиме: другие посетители вас не видят, и вы не видите их.</p>' +
        '<div class="artc-live__me">' + liveAvatar(L.sex, L.outfit, 32) + '<span>Вы — <b>' + esc(L.name) + '</b></span>' +
          '<button type="button" class="artc-live__link" data-live="edit">Изменить</button></div>' +
        (L.banned ? '<p class="artc-live__err">Доступ к онлайн-режиму закрыт модератором</p>'
                  : '<button type="button" class="artc-live__go" data-live="on">Включить онлайн-режим</button>') +
      '</div>';
  };

  Widget.prototype.livePeopleHTML = function () {
    var L = this.live, self = this;
    var people = [];
    for (var k in L.roster) if (Object.prototype.hasOwnProperty.call(L.roster, k)) people.push(L.roster[k]);
    // «Гость 5» — раньше «Гость 49»: числа в именах сравниваем как числа
    people.sort(function (a, b) { return a.name.localeCompare(b.name, 'ru', { numeric: true }); });
    var convWith = {};
    this.liveEachConv(function (c) { if (c.state === 'pending' || c.state === 'accepted') convWith[c.with.id] = c; });
    // приглашение нам — в строке пригласившего «Принять», а не «Пригласить»
    for (var ic in L.invites) {
      var inv = L.invites[ic];
      if (Object.prototype.hasOwnProperty.call(L.invites, ic) && inv.from && !convWith[inv.from.id]) convWith[inv.from.id] = { conv: inv.conv, state: 'pending', mine: false };
    }
    var rows = people.map(function (p) {
      var c = convWith[p.id], act;
      if (c && c.state === 'accepted') act = '<button type="button" class="artc-live__act" data-open="' + c.conv + '">Открыть разговор</button>';
      else if (c && c.mine) act = '<span class="artc-live__state">Ждём ответа…</span>';
      else if (c) act = '<button type="button" class="artc-live__act" data-accept="' + c.conv + '">Принять приглашение</button>';
      else act = '<button type="button" class="artc-live__act" data-invite="' + esc(p.id) + '">Пригласить</button>';
      return '<li data-pid="' + esc(p.id) + '">' + liveAvatar(p.sex, p.outfit) +
        '<div class="artc-live__who"><b>' + esc(p.name) + '</b><span>' + esc(self.livePlace(p)) + '</span></div>' + act + '</li>';
    }).join('');
    // разговоры: и с теми, кто уже ушёл, — переписка остаётся
    var convs = [];
    this.liveEachConv(function (c) { if (c.state === 'accepted' || c.state === 'closed') convs.push(c); });
    convs.sort(function (a, b) {
      var ta = a.msgs.length ? a.msgs[a.msgs.length - 1].ts : 0, tb = b.msgs.length ? b.msgs[b.msgs.length - 1].ts : 0;
      return tb - ta;
    });
    var convRows = convs.map(function (c) {
      var last = c.msgs.length ? c.msgs[c.msgs.length - 1] : null;
      return '<li class="artc-live__conv" data-open="' + c.conv + '" tabindex="0" role="button">' + liveAvatar(c.with.sex, c.with.outfit) +
        '<div class="artc-live__who"><b>' + esc(c.with.name) + '</b><span>' +
          esc(last ? (last.from === L.me.id ? 'Вы: ' : '') + last.text : (c.state === 'closed' ? 'Разговор завершён' : 'Напишите первым')) + '</span></div>' +
        (c.unread ? '<i class="artc-live__badge">' + c.unread + '</i>' : '') + '</li>';
    }).join('');
    var me = L.me;
    return this.liveHeadHTML('Сейчас на выставке', people.length + 1 + ' ' + plural(people.length + 1, 'человек', 'человека', 'человек')) +
      '<div class="artc-live__body">' +
        '<div class="artc-live__me">' + liveAvatar(me.sex, me.outfit, 32) + '<span>Вы — <b>' + esc(me.name) + '</b></span>' +
          '<button type="button" class="artc-live__link" data-live="edit">Изменить</button>' +
          '<button type="button" class="artc-live__link" data-live="off">Офлайн</button></div>' +
        (convRows ? '<p class="artc-live__sec">Разговоры</p><ul class="artc-live__list">' + convRows + '</ul>' : '') +
        '<p class="artc-live__sec">Посетители</p>' +
        (rows ? '<ul class="artc-live__list">' + rows + '</ul>'
              : '<p class="artc-live__empty">Пока вы здесь одни. Когда на выставку зайдёт кто-то ещё, он появится в этом списке — и его можно будет пригласить к разговору.</p>') +
      '</div>';
  };

  Widget.prototype.liveConvHTML = function (c) {
    var L = this.live, me = L.me.id;
    var p = L.roster[c.with.id];
    var sub = p ? esc(this.livePlace(p)) : 'ушёл с выставки';
    var msgs = c.msgs.map(function (m) {
      var mine = m.from === me;
      var t = m.ts ? new Date(m.ts * 1000) : null;
      return '<div class="artc-live__msg' + (mine ? ' is-me' : '') + (m.failed ? ' is-fail' : '') + '">' +
        esc(m.text) +
        '<small>' + (m.failed ? esc(m.failed) : m.pending ? 'отправляется…' : (t ? ('0' + t.getHours()).slice(-2) + ':' + ('0' + t.getMinutes()).slice(-2) : '')) + '</small></div>';
    }).join('');
    var typing = c.typing && Date.now() - c.typing < 3000;
    var closed = c.state !== 'accepted';
    return this.liveHeadHTML(c.with.name, sub, true) +
      '<div class="artc-live__tools">' +
        '<button type="button" class="artc-live__link" data-report="' + esc(c.with.id) + '">Пожаловаться</button>' +
        (c.blocked ? '<span class="artc-live__state">Заблокирован</span>'
                   : '<button type="button" class="artc-live__link" data-block="' + esc(c.with.id) + '">Заблокировать</button>') +
      '</div>' +
      '<div class="artc-live__log" aria-live="polite">' +
        (msgs || '<p class="artc-live__empty">Разговор начался — напишите первое сообщение.</p>') +
        (typing ? '<div class="artc-live__typing">' + esc(c.with.name) + ' пишет…</div>' : '') +
      '</div>' +
      (closed
        ? '<p class="artc-live__closed">Разговор завершён.</p>'
        : (L.emo ? '<div class="artc-live__emo" role="group" aria-label="Смайлики">' +
              LIVE_EMOJI.map(function (e) { return '<button type="button" data-emo="' + e + '">' + e + '</button>'; }).join('') + '</div>' : '') +
          '<form class="artc-live__form" data-form="msg">' +
            '<button type="button" class="artc-live__emo-btn' + (L.emo ? ' is-on' : '') + '" data-live="emo" aria-label="Смайлики" aria-expanded="' + !!L.emo + '">🙂</button>' +
            '<input type="text" class="artc-live__input" maxlength="500" autocomplete="off" enterkeyhint="send" placeholder="Сообщение" aria-label="Сообщение">' +
            '<button type="submit" class="artc-live__send" aria-label="Отправить">' + ICON_SEND + '</button>' +
          '</form>');
  };

  Widget.prototype.liveOpenConv = function (cid) {
    var L = this.live, c = L.convs[cid];
    if (!c) return;
    L.view = 'conv';
    L.cur = cid;
    if (c.unread) { c.unread = 0; this.liveSend({ t: 'read', conv: cid }); }
    this.liveToastDrop(cid, true);
    if (!this.livePanelOpen()) this.livePanel(true);
    else this.liveRender(true);
    this.liveShow();
  };

  Widget.prototype.liveClick = function (e) {
    var L = this.live, self = this;
    var t = e.target.closest('[data-live],[data-sex],[data-outfit],[data-invite],[data-open],[data-accept],[data-report],[data-block],[data-emo]');
    if (!t) return;
    this.liveAudio();
    var a = t.getAttribute('data-live');
    if (a === 'close') { this.liveShut(); return; }
    if (a === 'back') { L.view = 'people'; L.cur = null; L.needConsent = false; L.ck = null; L.err = ''; this.liveRender(); return; }
    if (a === 'emo') { L.emo = !L.emo; this.liveRender(); return; }
    if (t.hasAttribute('data-emo')) { this.liveEmoji(t.getAttribute('data-emo')); return; }
    if (a === 'edit') { L.view = 'join'; L.err = ''; this.liveRender(true); return; }
    if (a === 'off') {                     // «Офлайн»: другие вас не видят, вы — их
      L.off = true;
      this.liveDisconnect();
      L.view = 'people';
      this.liveSave();
      this.liveRender();
      return;
    }
    if (a === 'on') {
      L.off = false;
      L.want = true;
      L.banned = false;
      L.view = 'people';
      this.liveSave();
      this.liveConnect();
      this.liveShow();
      return;
    }
    if (t.hasAttribute('data-sex')) {
      L.sex = t.getAttribute('data-sex');
      this.liveKeepName();
      this.liveRender();
      return;
    }
    if (t.hasAttribute('data-outfit')) {
      L.outfit = +t.getAttribute('data-outfit');
      this.liveKeepName();
      this.liveRender();
      return;
    }
    if (t.hasAttribute('data-invite')) {
      if (this.liveAskConsent()) return;
      if (this.liveSend({ t: 'invite', to: t.getAttribute('data-invite') })) {
        t.disabled = true;
        t.textContent = 'Приглашаем…';
      }
      return;
    }
    if (t.hasAttribute('data-accept')) { this.liveAnswer(+t.getAttribute('data-accept'), true); return; }
    if (t.hasAttribute('data-open')) { this.liveOpenConv(+t.getAttribute('data-open')); return; }
    if (t.hasAttribute('data-report')) {
      var text = window.prompt('Что случилось? Модератор посмотрит переписку.', '');
      if (text === null) return;
      this.liveSend({ t: 'report', id: t.getAttribute('data-report'), conv: L.cur, text: text });
      return;
    }
    if (t.hasAttribute('data-block')) {
      if (!window.confirm('Заблокировать собеседника? Разговор закончится, и он больше не сможет приглашать вас.')) return;
      this.liveSend({ t: 'block', id: t.getAttribute('data-block') });
      self.liveEachConv(function (c) { if (c.with.id === t.getAttribute('data-block')) c.blocked = true; });
      this.liveRender();
    }
  };

  /* Смайлик — в поле сообщения, туда, где стоял курсор */
  Widget.prototype.liveEmoji = function (e) {
    var inp = this.livePanelEl && this.livePanelEl.querySelector('.artc-live__input');
    if (!inp) return;
    var v = inp.value, a = inp.selectionStart == null ? v.length : inp.selectionStart;
    var b = inp.selectionEnd == null ? a : inp.selectionEnd;
    if ((v.slice(0, a) + e + v.slice(b)).length > 500) return;
    inp.value = v.slice(0, a) + e + v.slice(b);
    var pos = a + e.length;
    try { inp.setSelectionRange(pos, pos); } catch (x) { /* нет выделения */ }
    // на компьютере курсор остаётся в поле; на телефоне клавиатуру не открываем — панель видна
    if (!isTouch()) try { inp.focus({ preventScroll: true }); } catch (x) { inp.focus(); }
  };

  /* Имя из поля — чтобы выбор образа его не стирал */
  Widget.prototype.liveKeepName = function () {
    var inp = this.livePanelEl && this.livePanelEl.querySelector('.artc-live__name');
    if (inp) this.live.name = inp.value;
    var ck = this.livePanelEl && this.livePanelEl.querySelector('.artc-live__consent input');
    if (ck) this.live.ck = ck.checked;
  };

  /* Общаться (пригласить, принять, написать) — только с согласием на
     обработку персональных данных: нет его — окно «Имя и образ» с галочкой */
  Widget.prototype.liveAskConsent = function () {
    var L = this.live;
    if (L.consent) return false;
    L.needConsent = true;
    L.view = 'join';
    L.err = '';
    this.livePanel(true);
    return true;
  };

  Widget.prototype.liveSubmit = function (form) {
    var L = this.live;
    if (form.getAttribute('data-form') === 'join') {
      var name = form.querySelector('.artc-live__name').value.replace(/\s+/g, ' ').trim();
      var ck = form.querySelector('.artc-live__consent input');
      L.ck = ck ? ck.checked : false;
      if (name.length < 2) { L.name = name; L.err = 'Имя — хотя бы две буквы'; this.liveRender(); return; }
      if (L.needConsent && !L.ck) { L.name = name; this.liveRender(); return; }
      L.consent = L.ck ? (L.consent || Date.now()) : 0;    // сняли галочку — согласие отозвано
      L.needConsent = false;
      L.ck = null;
      L.name = name;
      L.err = '';
      L.banned = false;
      L.want = !L.off;                      // в офлайне правка имени не включает онлайн
      this.liveSave();
      this.liveAudio();
      if (L.ws && L.up) this.liveSend({ t: 'hello', token: L.token, name: L.name, avatar: { sex: L.sex, outfit: L.outfit }, consent: !!L.consent, full: false });
      else if (L.want) this.liveConnect();
      L.view = 'people';
      this.liveShow();
      return;
    }
    if (form.getAttribute('data-form') === 'msg') {
      if (this.liveAskConsent()) return;
      var inp = form.querySelector('.artc-live__input');
      var text = inp.value.trim();
      var c = L.convs[L.cur];
      if (!text || !c) return;
      var n = Date.now() % 1e9;
      if (!this.liveSend({ t: 'msg', conv: c.conv, text: text, n: n })) {
        this.liveNote('Нет связи — сообщение не отправлено');
        return;
      }
      c.msgs.push({ n: n, from: L.me.id, text: text, pending: true });
      inp.value = '';
      L.emo = false;
      this.liveRender();
    }
  };

  Widget.prototype.liveAnswer = function (cid, accept) {
    var L = this.live;
    if (accept && this.liveAskConsent()) return;
    this.liveSend({ t: 'answer', conv: cid, accept: !!accept });
    delete L.invites[cid];
    this.liveToastDrop(cid);
    if (accept) {
      var inv = L.convs[cid];
      if (!inv) {
        // разговора ещё нет в списке — служба пришлёт его; откроем, когда придёт
        var self = this, tries = 0;
        var wait = setInterval(function () {
          if (L.convs[cid] && L.convs[cid].state === 'accepted') { clearInterval(wait); self.liveOpenConv(cid); }
          else if (++tries > 30) clearInterval(wait);
        }, 100);
      } else this.liveOpenConv(cid);
    }
    this.liveShow();
  };

  /* ---------- уведомления ---------- */

  Widget.prototype.liveToastBox = function () {
    var host = this.liveHostNow() || document.body;
    var box = host.querySelector(':scope > .artc-live-toasts');
    if (!box) {
      box = el('div', 'artc-live-toasts' + (host === document.body ? ' artc-live-toasts--page' : ''));
      ['pointerdown', 'mousedown', 'touchstart', 'wheel'].forEach(function (ev) {
        box.addEventListener(ev, function (e) { e.stopPropagation(); }, { passive: true });
      });
      host.appendChild(box);
    }
    return box;
  };

  Widget.prototype.liveToast = function (inv) {
    var self = this;
    var box = this.liveToastBox();
    var t = el('div', 'artc-live-toast');
    t.setAttribute('data-toast', inv.conv);
    t.setAttribute('role', 'alert');
    t.innerHTML = liveAvatar(inv.from.sex, inv.from.outfit, 40) +
      '<div class="artc-live-toast__t"><b>' + esc(inv.from.name) + '</b> приглашает вас поговорить</div>' +
      '<div class="artc-live-toast__btns"><button type="button" class="artc-live-toast__yes">Принять</button>' +
      '<button type="button" class="artc-live-toast__no">Отклонить</button></div>';
    t.querySelector('.artc-live-toast__yes').addEventListener('click', function () { self.liveAudio(); self.liveAnswer(inv.conv, true); });
    t.querySelector('.artc-live-toast__no').addEventListener('click', function () { self.liveAnswer(inv.conv, false); });
    box.appendChild(t);
    setTimeout(function () {
      if (self.live.invites[inv.conv]) { delete self.live.invites[inv.conv]; self.liveShow(); }
      self.liveToastDrop(inv.conv);
    }, 60000);
  };

  Widget.prototype.liveMsgToast = function (c, m) {
    var self = this;
    var box = this.liveToastBox();
    var old = box.querySelector('[data-mtoast="' + c.conv + '"]');
    if (old) old.parentNode.removeChild(old);
    var t = el('button', 'artc-live-toast artc-live-toast--msg');
    t.type = 'button';
    t.setAttribute('data-mtoast', c.conv);
    t.innerHTML = liveAvatar(c.with.sex, c.with.outfit, 32) +
      '<div class="artc-live-toast__t"><b>' + esc(c.with.name) + '</b><span>' + esc(m.text.length > 80 ? m.text.slice(0, 79) + '…' : m.text) + '</span></div>';
    t.addEventListener('click', function () { self.liveOpenConv(c.conv); });
    box.appendChild(t);
    setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 7000);
  };

  Widget.prototype.liveToastDrop = function (cid, msgToo) {
    var ts = document.querySelectorAll('[data-toast="' + cid + '"]' + (msgToo ? ',[data-mtoast="' + cid + '"]' : ''));
    for (var i = 0; i < ts.length; i++) ts[i].parentNode.removeChild(ts[i]);
  };

  Widget.prototype.liveNote = function (text) {
    var box = this.liveToastBox();
    var t = el('div', 'artc-live-toast artc-live-toast--note', esc(text));
    box.appendChild(t);
    setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 4000);
  };

  /* Короткий мягкий сигнал; звук возможен после первого касания страницы */
  Widget.prototype.liveAudio = function () {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    try {
      if (!this.liveAC) this.liveAC = new AC();
      if (this.liveAC.state === 'suspended') this.liveAC.resume();
    } catch (e) { /* без звука */ }
  };

  Widget.prototype.liveBeep = function () {
    var ac = this.liveAC;
    if (!ac || ac.state !== 'running') return;
    try {
      var t = ac.currentTime;
      [660, 880].forEach(function (f, i) {
        var o = ac.createOscillator(), g = ac.createGain();
        o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t + i * 0.12);
        g.gain.exponentialRampToValueAtTime(0.06, t + i * 0.12 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.12 + 0.18);
        o.connect(g).connect(ac.destination);
        o.start(t + i * 0.12);
        o.stop(t + i * 0.12 + 0.2);
      });
    } catch (e) { /* без звука */ }
  };

  /* «Перейти к работам»: в 3D — подойти к первой работе, в простом зале —
     к художнику на стене (в его разделе) */
  Widget.prototype.curatorGo = function (gi) {
    this.closeCurator();
    if (this.gl) { this.gl.goToArtist(gi); return; }
    var si = -1;
    this.sections.forEach(function (sec, i) { if (sec.list.indexOf(gi) >= 0) si = i; });
    if (si < 0) return;
    if (si !== this.section) this.switchSection(si);
    var h = this.hall, sec = this.sections[this.section];
    if (!h || !h.wall || !sec) return;
    var room = h.rooms[sec.list.indexOf(gi)];
    if (!room) return;
    var target = h.stops[room.stop].s;
    if (Math.abs(target - h.s) > 6000) h.s = target + (target > h.s ? -900 : 900);
    this.wallGo(room.stop);
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
      m.tabIndex = -1;
      document.body.appendChild(m);
      trapFocus(m);
      // «призрачный» клик: на сенсорном экране окно открывается по касанию,
      // а следом браузер шлёт клик в ту же точку — он не должен нажать кнопку
      // только что открытого окна («Хочу купить», крестик, фон)
      m.addEventListener('click', function (e) {
        if (Date.now() - (m.openedAt || 0) < 400) { e.stopPropagation(); e.preventDefault(); }
      }, true);
      m.addEventListener('click', function (e) { if (e.target === m) self.closeModal(m); });
    });

    document.addEventListener('keydown', function (e) {
      if (self.tpEsc) return;
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
      m.openedAt = Date.now();
    }
    if (!document.body.hasAttribute('data-artc-lock')) {
      document.body.setAttribute('data-artc-lock', document.body.style.overflow || '');
      document.body.style.overflow = 'hidden';
    }
    var c = m.querySelector('.artc-modal__close');
    if (c && KBD) c.focus();
    else { try { m.focus({ preventScroll: true }); } catch (e) { m.focus(); } }
  };

  Widget.prototype.closeModal = function (m) {
    m.classList.remove('is-open');
    // работу или карточку открывали из зала — возвращаем зрителя в коридор
    if ((m === this.lightbox || m === this.artistModal) && this.fromHall &&
        !document.querySelector('.artc-modal.is-open')) {
      this.fromHall = null;
      if (this.gl) {
        this.gl.onReturn();          // WebGL-зал: отступаем на шаг от полотна
      } else {
        this.blurArt();
        // на телефоне про колесо мыши писать незачем
        this.showHint(isTouch()
          ? 'Вы снова в зале — листайте пальцем вбок, чтобы идти дальше'
          : 'Вы снова в зале — дальше стрелками <b>←</b> <b>→</b> или перетаскивайте стену');
      }
    }
    var anyOpen = document.querySelector('.artc-modal.is-open');
    if (!anyOpen) {
      document.body.style.overflow = document.body.getAttribute('data-artc-lock') || '';
      document.body.removeAttribute('data-artc-lock');
      if (this.lastFocus) { try { this.lastFocus.focus(); } catch (e) {} }
      this.lastFocus = null;
    }
  };

  /* ---------------- карточка художника ---------------- */

  Widget.prototype.pickArtist = function (i) {
    var n = this.artists.length;
    this.artistIdx = ((i % n) + n) % n;
    // если художник из другого раздела (переход из зала) — переключим раздел
    var target = this.artists[this.artistIdx];
    if (target && target.secIndex !== this.section && this.sections.length > 1) {
      this.switchSection(target.secIndex, true);   // зритель в 3D-зале остаётся на месте
    }
  };

  // щелчок по картине в зале: только сама работа крупно, без карточки
  // художника под ней; закрыли — снова в зале
  Widget.prototype.viewWork = function (gi, wi) {
    this.fromHall = true;
    this.lbFromHall = true;
    if (this.artistModal.classList.contains('is-open')) this.artistModal.classList.remove('is-open');
    this.pickArtist(gi);
    this.openWork(wi);
  };

  Widget.prototype.openArtist = function (i) {
    this.pickArtist(i);
    var a = this.artists[this.artistIdx];
    var self = this;

    // В каталоге публикуются только соцсети и сайты: личные телефоны и почта
    // художников не показываются никогда. Данные готовят инструменты в tools/,
    // которые их вычищают, но artists.json правят и руками — поэтому ссылки
    // на mailto:/tel: (и прочие схемы) отсекаются и здесь, при выводе.
    var linksHTML = (a.links || []).filter(function (l) {
      return l && /^https?:\/\//i.test(String(l.url || ''));
    }).map(function (l) {
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
      // лайтбокс поверх карточки: возвращаться он должен в карточку, а не в зал
      if (b) { self.lbFromHall = false; self.openWork(+b.getAttribute('data-work')); }
    });
    dlg.querySelector('.artc-buy').addEventListener('click', function () { self.openForm(a, null); });
    dlg.querySelectorAll('[data-nav]').forEach(function (b) {
      b.addEventListener('click', function () {
        // сосед берётся внутри раздела: «Галереи» и «Арт-салон» не смешиваем
        var cur = self.artists[self.artistIdx];
        var sec = self.sections[cur.secIndex] || self.sections[0];
        var pos = (cur.secPos + (+b.getAttribute('data-nav')) + sec.list.length) % sec.list.length;
        self.openArtist(sec.list[pos]);
      });
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
        '<button type="button" class="artc-arrow artc-arrow--prev" aria-label="Предыдущая работа">' + ARROW_L + '</button>' +
        // крестик — у угла самой работы, а не в углу экрана
        '<div class="artc-lightbox__frame">' +
          '<picture>' +
            '<source srcset="' + esc(this.url(w.full)) + '" type="image/webp">' +
            '<img class="artc-lightbox__img" src="' + esc(this.url(w.full).replace(/\.webp$/, '.jpg')) + '" ' +
              'alt="' + esc((w.title || 'Работа') + ' — ' + a.name) + '">' +
          '</picture>' +
          '<button type="button" class="artc-modal__close" aria-label="Закрыть">&#10005;</button>' +
        '</div>' +
        '<button type="button" class="artc-arrow artc-arrow--next" aria-label="Следующая работа">' + ARROW_R + '</button>' +
        '<p class="artc-lightbox__caption">' + caption + '</p>' +
        '<div class="artc-lightbox__actions">' +
          '<button type="button" class="artc-buy">Хочу купить картину</button>' +
          (this.lbFromHall
            ? '<button type="button" class="artc-back artc-about">Об авторе</button>' +
              '<button type="button" class="artc-back artc-tohall">' + ARROW_L + 'Вернуться в зал</button>'
            : '') +
        '</div>' +
      '</div>';

    var lb = this.lightbox;
    lb.querySelector('.artc-modal__close').addEventListener('click', function () { self.closeModal(lb); });
    lb.querySelector('.artc-arrow--prev').addEventListener('click', function () { self.openWork(self.workIdx - 1); });
    lb.querySelector('.artc-arrow--next').addEventListener('click', function () { self.openWork(self.workIdx + 1); });
    lb.querySelector('.artc-buy').addEventListener('click', function () { self.openForm(a, w); });
    var about = lb.querySelector('.artc-about');
    // карточка открывается вместо работы; её крестик тоже ведёт в зал
    if (about) about.addEventListener('click', function () {
      self.openArtist(self.artistIdx);
      self.closeModal(lb);
    });
    var back = lb.querySelector('.artc-tohall');
    if (back) back.addEventListener('click', function () { self.closeModal(lb); });
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
  Widget.prototype.openTildaPopup = function (artist, work, retried) {
    var self = this;

    // Попап Tilda живёт в общем DOM страницы, а во весь экран его не видно:
    // браузер показывает только развёрнутый элемент, а на iPhone зал лежит
    // слоем поверх всей страницы. Поэтому сначала сворачиваем — и 3D-галерею,
    // и простой зал, — затем открываем форму (повтор один: не зациклиться).
    var fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    var glFake = this.gl && this.gl.fsFake;
    if ((fsEl || this.fsFake || glFake) && !retried) {
      if (fsEl) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      else if (glFake) this.gl.toggleFullscreen();
      else this.fsFallback(false);
      setTimeout(function () { self.openTildaPopup(artist, work, true); }, 350);
      return;
    }

    // Попап Tilda появляется не сразу (около секунды): кнопка это показывает
    var busy = document.querySelectorAll('.artc-modal.is-open .artc-buy');
    var restore = function () {
      for (var i = 0; i < busy.length; i++) {
        if (busy[i].getAttribute('data-label')) busy[i].textContent = busy[i].getAttribute('data-label');
        busy[i].removeAttribute('aria-busy');
      }
    };
    for (var bi = 0; bi < busy.length; bi++) {
      if (!busy[bi].getAttribute('data-label')) busy[bi].setAttribute('data-label', busy[bi].textContent);
      busy[bi].textContent = 'Открываем форму…';
      busy[bi].setAttribute('aria-busy', 'true');
    }
    var waited = 0;
    var poll = setInterval(function () {
      waited += 150;
      var shown = document.querySelector('.t-popup_show');
      if (shown) self.tildaClose(shown);
      if (shown || waited > 4000) { clearInterval(poll); restore(); }
    }, 150);

    var fill = function (name, value) {
      var inputs = document.querySelectorAll(
        'form input[name="' + name + '"], .t-form input[name="' + name + '"]'
      );
      for (var i = 0; i < inputs.length; i++) inputs[i].value = value;
    };
    // Что именно хочет купить человек — в скрытых полях формы Tilda.
    // Ссылка на изображение помогает менеджеру опознать работу, даже если
    // название пустое или у художника несколько похожих вещей.
    fill('artist', artist.name);
    fill('work', work ? (work.title || 'без названия') : 'не выбрана (заявка из карточки художника)');
    fill('workurl', work ? this.url(work.full) : '');

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

  /* Свой крестик на попапе Tilda. Крестик Tilda белый и стоит в углу
     экрана поверх затемнения; на телефоне форма занимает весь экран, фон у
     неё белый — и белый крестик на белом не виден: окно «не закрыть».
     Наш — тёмный круг, всегда поверх; закрывает попап штатно (щелчок по
     крестику Tilda), а если Tilda не отозвалась — Esc, затем вручную. */
  Widget.prototype.tildaClose = function (pop) {
    var self = this;
    if (!document.getElementById('artc-tpclose-css')) {
      var st = document.createElement('style');
      st.id = 'artc-tpclose-css';
      st.textContent =
        '.artc-tpclose{position:fixed;top:12px;top:max(12px,env(safe-area-inset-top));right:12px;z-index:2147483000;' +
        'width:44px;height:44px;border-radius:50%;border:2px solid rgba(255,247,228,.6);background:rgba(33,29,23,.9);' +
        'color:#fff;font:22px/1 Arial,sans-serif;display:flex;align-items:center;justify-content:center;cursor:pointer;' +
        'box-shadow:0 4px 14px rgba(0,0,0,.35);padding:0;-webkit-tap-highlight-color:transparent}' +
        '.artc-tpclose:hover{background:#E0736A}' +
        '.t-popup.artc-tp .t-popup__close{visibility:hidden}';
      document.head.appendChild(st);
    }
    if (pop.querySelector('.artc-tpclose')) return;
    pop.classList.add('artc-tp');
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'artc-tpclose';
    b.setAttribute('aria-label', 'Закрыть');
    b.innerHTML = '&#10005;';
    pop.appendChild(b);
    var open = function () { return pop.classList.contains('t-popup_show'); };
    b.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var own = pop.querySelector('.t-popup__close');
      if (own) own.click();
      setTimeout(function () {
        if (!open()) return;
        // Esc — для Tilda; наши окна (работа под попапом) его пропускают
        self.tpEsc = true;
        try { document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27, which: 27, bubbles: true })); }
        finally { self.tpEsc = false; }
        setTimeout(function () {
          if (!open()) return;
          pop.classList.remove('t-popup_show');
          pop.style.display = 'none';
          var rec = pop.parentNode;
          if (rec && rec.style) rec.style.display = '';
          document.body.classList.remove('t-body_popupshowed');
          document.documentElement.classList.remove('t-body_popupshowed');
          if (location.hash.indexOf('#popup:') === 0 && history.replaceState) {
            history.replaceState(null, '', location.pathname + location.search);
          }
        }, 300);
      }, 300);
    });
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
      work: work ? (work.title || 'без названия') : 'не выбрана (заявка из карточки художника)',
      work_url: work ? this.url(work.full) : '',
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
