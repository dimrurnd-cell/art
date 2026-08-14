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
    this.ticketUrl = root.getAttribute('data-ticket-url') || '#';
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

  /* Карточки карусели — по текущему разделу. data-artist хранит сквозной
     номер художника: по нему открывается карточка, и он не зависит от
     того, какой раздел показан сейчас. */
  Widget.prototype.buildCarousel = function () {
    var self = this;
    var track = this.wrap.querySelector('.artc-carousel__track');
    var dots = this.wrap.querySelector('.artc-dots');
    track.innerHTML = '';
    dots.innerHTML = '';

    var picked = this.picked();
    picked.forEach(function (gi, i) {
      var a = self.artists[gi];
      var card = el('div', 'artc-card');
      card.innerHTML =
        '<button type="button" class="artc-card__inner" data-artist="' + gi + '">' +
          '<span class="artc-card__cover">' + pictureHTML(self.url(a.works[0].thumb), 'Работа: ' + (a.works[0].title || a.name), i >= 3) + '</span>' +
          '<span class="artc-card__meta">' +
            '<span class="artc-card__ava">' + pictureHTML(self.url(a.avatar), a.name, i >= 3) + '</span>' +
            '<span><span class="artc-card__name">' + esc(a.name) + '</span>' +
            '<span class="artc-card__city">' + esc(a.city) + '</span></span>' +
          '</span>' +
        '</button>';
      track.appendChild(card);

      // точки — только пока их можно охватить взглядом
      if (picked.length <= 24) {
        var dot = el('button', 'artc-dot');
        dot.type = 'button';
        dot.setAttribute('aria-label', a.name);
        dot.addEventListener('click', function () { self.goTo(i); });
        dots.appendChild(dot);
      }
    });

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

  Widget.prototype.switchSection = function (i) {
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
  };

  /* ---------------- карусель ---------------- */

  Widget.prototype.perView = function () {
    var v = getComputedStyle(this.wrap).getPropertyValue('--artc-per-view');
    return Math.max(1, parseInt(v, 10) || 1);
  };

  Widget.prototype.goTo = function (i, instant) {
    var n = this.picked().length;
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
  var CHIPS_MAX = 10;    // столько фамилий ещё помещается в ряд
  var FOCUS_TURN = 0.3;  // доля разворота полотна, на которую доворачивается камера
  var FOCUS_DIST = 0.44; // дистанция подхода к полотну в долях шага
  var FOCUS_ZOOM = 1.35; // наезд камеры, когда зритель встал перед работой

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
    this.stopTour();
    var keep = rebuild && this.hall ? this.hall.progress : 0;

    host.innerHTML =
      '<div class="artc-stage" tabindex="0" role="application" ' +
           'aria-label="Виртуальный зал выставки: перемещение стрелками, полотна открываются нажатием">' +
        '<div class="artc-scene">' +
          '<div class="artc-camera"><div class="artc-world">' +
            '<div class="artc-floor"></div><div class="artc-ceil"></div>' +
            '<div class="artc-wall artc-wall--l"></div><div class="artc-wall artc-wall--r"></div>' +
            '<div class="artc-end"><div class="artc-end__inner">' +
              pictureHTML(this.base + 'img/logo.webp', 'АРТ Ростов', false) +
              '<span class="artc-end__slogan">Все грани искусства</span>' +
              '<p class="artc-end__invite">Приходите увидеть вживую на выставке<br>' +
                'с 16 по 25 апреля 2027</p>' +
              '<a class="artc-end__ticket" href="' + esc(this.ticketUrl) + '"' +
                (this.ticketUrl === '#' ? ' aria-disabled="true"' : ' target="_blank" rel="noopener"') +
                '>Купить билет</a>' +
            '</div></div>' +
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
          ? 'Проведите пальцем влево или вправо, чтобы пройти по залу'
          : 'Идите по залу: перетаскивайте, крутите колесо или жмите <b>W</b>/<b>S</b>') + '</span></p>' +
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
        '<div class="artc-hud">' +
          '<div class="artc-hud__row">' +
            '<button type="button" class="artc-walk artc-walk--back" aria-label="Шаг назад">' + ARROW_DOWN + '</button>' +
            '<span class="artc-progress"><i></i></span>' +
            '<button type="button" class="artc-walk artc-walk--fwd" aria-label="Шаг вперёд">' + ARROW_UP + '</button>' +
          '</div>' +
          '<div class="artc-rooms"></div>' +
          '<div class="artc-tools">' +
            '<button type="button" class="artc-tour">' + ICON_TOUR +
              '<span class="artc-tour__label">Провести по залу</span></button>' +
          '</div>' +
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
    // точка зрения вынесена вперёд на perspective — от неё считается доворот к работе
    var PERSP = parseFloat(getComputedStyle(host.querySelector('.artc-scene')).perspective) || 1150;
    var GAP = Math.round(STEP * 1.35);
    var SEG_HINT = Math.round(STEP * 5.6);
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
    var pending = [];          // полотна, ещё не вставленные в DOM
    var rooms = [];
    var decor = [];
    var z = -START;

    var shown = this.current();
    var globals = this.sections.length ? this.sections[this.section].list : [];
    shown.forEach(function (a, ai) {
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

        // Полотно и табличка — две разные кнопки: по картине открывается
        // сама работа во весь экран, по табличке — карточка художника.
        var b = el('div', 'artc-art');
        b.style.setProperty('--aw', aw + 'px');
        b.style.setProperty('--d', (200 + wi * 90 + ai * 40) + 'ms');
        b.style.transform = 'translate(-50%, -50%) translate3d(' + x + 'px, -20px, ' + artZ + 'px) rotateY(' + turn + 'deg)';
        b.setAttribute('data-artist', globals[ai]);
        b.setAttribute('data-work', wi);
        b.setAttribute('data-z', artZ);
        b.setAttribute('data-x', x);
        b.setAttribute('data-turn', turn);
        b.innerHTML =
          '<span class="artc-art__spot"></span>' +
          '<button type="button" class="artc-art__frame" aria-label="Рассмотреть работу' +
              (w.title ? ' «' + esc(w.title) + '»' : '') + ' — ' + esc(a.name) + '">' +
            '<img src="' + BLANK + '" data-src="' + esc(self.url(w.medium).replace(/\.webp$/, '.jpg')) + '" ' +
              'data-webp="' + esc(self.url(w.medium)) + '" alt="' +
              esc((w.title || 'Работа') + ' — ' + a.name) + '">' +
          '</button>' +
          '<button type="button" class="artc-art__plaque" aria-label="Открыть карточку художника: ' +
              esc(a.name) + '">' +
            '<span class="artc-art__ava">' +
              // Фото автора грузится вместе с работой, а не сразу: в большом
              // зале табличек сотни, и загодя это мегабайты впустую.
              '<img src="' + BLANK + '" data-src="' + esc(self.url(a.avatar).replace(/\.webp$/, '.jpg')) + '" ' +
                'data-webp="' + esc(self.url(a.avatar)) + '" alt="' + esc(a.name) + '">' +
            '</span>' +
            '<span class="artc-art__meta">' +
              '<span class="artc-art__title">' + esc(w.title || 'Без названия') + '</span>' +
              '<span class="artc-art__author">' + esc(a.name) + '</span>' +
            '</span>' +
          '</button>';
        // Создание элементов — самое дорогое при сотне художников. В DOM
        // кладём порциями: сперва ближние ко входу, остальные в следующих
        // кадрах. Дальние всё равно скрыты отсечением по дистанции.
        pending.push(b);
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

      rooms.push({ name: a.name, city: a.city, avatar: self.url(a.avatar),
                   z: -roomStart - viewDist });
      z = roomStart - (slots - 1) * STEP - GAP;

      // между залами — по одному арт-объекту у стены, стороны чередуются
      if (ai < shown.length - 1) {
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

    // Переход к художнику. Пока их немного — ряд кнопок с фамилиями. Когда
    // счёт идёт на сотню, такой ряд занимает пол-экрана и им невозможно
    // пользоваться, поэтому вместо него одна кнопка со списком и поиском.
    var roomsBox = host.querySelector('.artc-rooms');
    var manyRooms = rooms.length > CHIPS_MAX;
    if (manyRooms) {
      var findBtn = el('button', 'artc-rooms__find');
      findBtn.type = 'button';
      findBtn.innerHTML = ICON_FIND + '<span>Художники</span><i>' + rooms.length + '</i>';
      findBtn.addEventListener('click', function (e) { e.stopPropagation(); self.toggleFind(true); });
      roomsBox.appendChild(findBtn);
      roomsBox.classList.add('artc-rooms--find');
    } else {
      rooms.forEach(function (room, i) {
        var b = el('button', 'artc-rooms__btn');
        b.type = 'button';
        b.textContent = shortName(room.name);
        b.title = room.name;
        b.addEventListener('click', function () { self.walkTo(room.z); });
        roomsBox.appendChild(b);
      });
    }

    this.hall = {
      host: host, stage: stage, world: world,
      camera: host.querySelector('.artc-camera'),
      arts: arts, decor: decor, rooms: rooms,
      roomBtns: manyRooms ? [] : roomsBox.children,
      findBtn: manyRooms ? roomsBox.querySelector('.artc-rooms__find') : null,
      padF: host.querySelector('.artc-pad--fwd'), padB: host.querySelector('.artc-pad--back'),
      hitF: host.querySelector('.artc-hit--fwd'), hitB: host.querySelector('.artc-hit--back'),
      fsBtn: host.querySelector('.artc-fs'),
      step: STEP, len: len, seg: SEG, hw: HW, hh: HH, artH: ARTH, persp: PERSP,
      floor: host.querySelector('.artc-floor'), ceil: host.querySelector('.artc-ceil'),
      wallL: host.querySelector('.artc-wall--l'), wallR: host.querySelector('.artc-wall--r'),
      segZ: null,
      maxZ: Math.max(0, len - Math.round(STEP * 0.62)),
      camZ: 0, targetZ: 0, camX: 0, targetX: 0, aim: 0, targetAim: 0,
      zoom: 1, targetZoom: 1,
      bob: 0, yaw: 0, pitch: 0, focus: null,
      progress: 0, moving: false, hitsPlaced: false, t0: Date.now(),
      probeN: 0, probeMs: 0, probeLast: 0, lite: false
    };

    // «влёт» в зал при первом открытии
    var startAt = rooms.length ? rooms[0].z : 0;
    if (rebuild) {
      this.hall.camZ = this.hall.targetZ = keep * this.hall.maxZ;
    } else {
      this.hall.camZ = startAt - 900;
      this.hall.targetZ = startAt;
    }

    this.flushArts(pending, 60);
    this.bindHall();
    this.hallLoop();
  };

  /* Вставка полотен в сцену порциями, чтобы первый кадр не ждал всех */
  Widget.prototype.flushArts = function (pending, first) {
    var self = this;
    var target = this.hall ? this.hall.world : null;
    if (!target) return;
    var i = 0;
    var put = function (n) {
      var frag = document.createDocumentFragment();
      for (var k = 0; k < n && i < pending.length; k++, i++) frag.appendChild(pending[i]);
      target.appendChild(frag);
    };
    put(first);
    if (i >= pending.length) return;
    var step = function () {
      if (!self.hall || self.hall.world !== target) return;   // зал уже пересобрали
      put(40);
      if (i < pending.length) requestAnimationFrame(step);
      else self.hall.frameKey = '';                           // перерисовать с новыми
    };
    requestAnimationFrame(step);
  };

  Widget.prototype.bindHall = function () {
    var h = this.hall, self = this;
    var stage = h.stage;

    // Шаг делается нажатием по широкой зоне, а стрелка на полу — её рисунок.
    // Зоны большие и на телефоне закрывают половину экрана, поэтому они
    // уступают дорогу: если под пальцем оказалось полотно — открываем его,
    // а если палец вели, а не ткнули, — это был свайп, и шагать не нужно.
    // Нажатие по зоне разбирается в pointerup (см. endDrag), а не в click:
    // сцена забирает указатель себе (setPointerCapture), и мышиный click
    // приходит уже ей, а не зоне — до обработчика зоны он не доходит.
    // Здесь остаётся только клавиатура: у неё click.detail === 0.
    var bindHit = function (hit, dir, cls) {
      hit.addEventListener('click', function (e) {
        e.stopPropagation();
        if (e.detail === 0) self.walkBy(h.step * dir);
      });
      hit.addEventListener('pointerenter', function () { stage.classList.add(cls); });
      hit.addEventListener('pointerleave', function () { stage.classList.remove(cls); });
    };
    bindHit(h.hitF, 1, 'hl-fwd');
    bindHit(h.hitB, -1, 'hl-back');

    var walkF = stage.querySelector('.artc-walk--fwd');
    var walkB = stage.querySelector('.artc-walk--back');
    walkF.addEventListener('click', function (e) { e.stopPropagation(); self.walkBy(h.step); });
    walkB.addEventListener('click', function (e) { e.stopPropagation(); self.walkBy(-h.step); });
    walkF.addEventListener('pointerenter', function () { stage.classList.add('hl-fwd'); });
    walkF.addEventListener('pointerleave', function () { stage.classList.remove('hl-fwd'); });
    walkB.addEventListener('pointerenter', function () { stage.classList.add('hl-back'); });
    walkB.addEventListener('pointerleave', function () { stage.classList.remove('hl-back'); });

    h.fsBtn.addEventListener('click', function (e) { e.stopPropagation(); self.toggleFullscreen(); });

    stage.querySelector('.artc-tour')
      .addEventListener('click', function (e) { e.stopPropagation(); self.toggleTour(); });

    var find = stage.querySelector('.artc-find');
    find.querySelector('.artc-find__close')
      .addEventListener('click', function (e) { e.stopPropagation(); self.toggleFind(false); });
    find.querySelector('.artc-find__input').addEventListener('input', function () {
      self.fillFind(this.value);
    });
    find.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.stopPropagation(); self.toggleFind(false); }
    });


    // экскурсию прерывает любое вмешательство посетителя
    ['wheel', 'pointerdown', 'keydown'].forEach(function (ev) {
      stage.addEventListener(ev, function (e) {
        if (self.tour && e.target.closest && !e.target.closest('.artc-tour')) self.stopTour();
      }, true);
    });

    // события изнутри открытой карточки/лайтбокса/формы сцена не трогает
    var fromModal = function (e) { return !!(e.target.closest && e.target.closest('.artc-modal')); };

    stage.addEventListener('wheel', function (e) {
      if (fromModal(e) || Math.abs(e.deltaY) < 2) return;
      e.preventDefault();
      self.walkBy(e.deltaY * 1.6);
    }, { passive: false });

    stage.addEventListener('keydown', function (e) {
      if (fromModal(e)) return;
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
      if (fromModal(e) || e.target.closest('.artc-hud, .artc-rooms, .artc-find, .artc-pad, .artc-fs, .artc-end__ticket')) return;
      drag = {
        x: e.clientX, y: e.clientY, z: h.targetZ, moved: 0, id: e.pointerId,
        art: e.target.closest('.artc-art'),
        plaque: !!e.target.closest('.artc-art__plaque'),
        hit: e.target.closest('.artc-hit'),
        cx: e.clientX, cy: e.clientY
      };
      stage.classList.add('is-grabbing');
      // после первого касания зал слушает стрелки, не дёргая прокрутку страницы
      try { stage.focus({ preventScroll: true }); } catch (err) { stage.focus(); }
      if (stage.setPointerCapture) { try { stage.setPointerCapture(e.pointerId); } catch (err2) {} }
    });
    stage.addEventListener('pointermove', function (e) {
      if (!drag) {
        if (!fromModal(e)) self.hallParallax(e);
        return;
      }
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      drag.moved = Math.max(drag.moved, Math.abs(dx), Math.abs(dy));
      var d = Math.abs(dy) > Math.abs(dx) ? dy : -dx;
      self.walkTo(drag.z + d * 2.4, true);
    });
    var endDrag = function (open) {
      if (drag && stage.releasePointerCapture) { try { stage.releasePointerCapture(drag.id); } catch (err) {} }
      // Короткое нажатие (без протяжки): по табличке — карточка художника,
      // по самому полотну — работа во весь экран.
      // Именно pointerup, а не click: при захвате указателя click приходит
      // на саму сцену, и полотно в нём уже не определить.
      if (open && drag && drag.moved <= 8) {
        if (drag.art) {
          if (drag.plaque) self.openArtCard(drag.art); else self.openArtWork(drag.art);
        } else if (drag.hit && !drag.hit.classList.contains('is-off')) {
          // под зоной шага может оказаться заметное полотно — тогда открываем его
          var target = self.artUnder(drag.cx, drag.cy);
          if (target) {
            var a2 = target.closest('.artc-art');
            if (target.classList.contains('artc-art__plaque')) self.openArtCard(a2);
            else self.openArtWork(a2);
          } else {
            self.walkBy(h.step * (drag.hit.classList.contains('artc-hit--fwd') ? 1 : -1));
          }
        }
      }
      drag = null;
      stage.classList.remove('is-grabbing');
    };
    stage.addEventListener('pointerup', function () { endDrag(true); });
    stage.addEventListener('pointercancel', function () { endDrag(false); });
    stage.addEventListener('pointerleave', function () {
      h.yaw = 0; h.pitch = 0;
      // именно applyCamera, а не сброс transform: иначе с камеры пропадут
      // доворот к работе и наезд, а цикл их не вернёт (кадр-то не изменился)
      self.applyCamera();
    });

    // клавиатура: Enter/Space на полотне (у таких click.detail === 0)
    stage.addEventListener('click', function (e) {
      if (fromModal(e)) return;
      var art = e.target.closest('.artc-art');
      if (art && e.detail === 0) {
        if (e.target.closest('.artc-art__plaque')) self.openArtCard(art);
        else self.openArtWork(art);
      }
    });
  };

  /* Что за полотно лежит под точкой — сквозь прозрачные зоны шага.

     Уступаем дорогу только тому, во что зритель явно целился: вдоль коридора
     под курсором почти всегда есть далёкие работы в несколько пикселей, и
     если засчитывать и их, то по стрелкам на полу становится не попасть. */
  Widget.prototype.artUnder = function (x, y) {
    if (!document.elementsFromPoint) return null;
    var list = document.elementsFromPoint(x, y);
    for (var i = 0; i < list.length; i++) {
      var el = list[i];
      var c = el.classList;
      if (!c) continue;
      var frame = c.contains('artc-art__frame');
      if (!frame && !c.contains('artc-art__plaque')) continue;
      var r = el.getBoundingClientRect();
      if (frame ? (r.width >= 78 && r.height >= 78) : (r.width >= 90 && r.height >= 22)) return el;
      return null;                       // ближайшее — мелкое, значит целились в пол
    }
    return null;
  };

  /* Нажатие по полотну: подходим к нему и разворачиваем работу во весь экран. */
  Widget.prototype.openArtWork = function (art) {
    var self = this;
    this.focusArt(art);
    clearTimeout(this.openT);
    this.openT = setTimeout(function () {
      self.fromHall = art;                 // чтобы знать, куда возвращаться
      self.lbFromHall = true;              // и показать кнопку «Вернуться в зал»
      // Карточка художника открывается под работой: закрыл работу — читаешь
      // об авторе и видишь остальные его вещи, закрыл карточку — снова зал.
      self.openArtist(+art.getAttribute('data-artist'));
      self.openWork(+art.getAttribute('data-work'));
    }, 620);
  };

  /* Нажатие по табличке под полотном: карточка художника. */
  Widget.prototype.openArtCard = function (art) {
    var self = this;
    this.focusArt(art);
    // даём камере подойти к работе и только потом показываем карточку
    clearTimeout(this.openT);
    this.openT = setTimeout(function () {
      self.fromHall = art;                 // чтобы знать, куда возвращаться
      self.lbFromHall = false;
      self.openArtist(+art.getAttribute('data-artist'));
    }, 760);
  };

  /* Итоговое положение камеры: доворот к полотну, слежение за курсором
     и наезд. scale() приближает картинку целиком, не трогая глубину сцены, —
     так работа, к которой подошли, читается крупно, как вблизи. */
  Widget.prototype.applyCamera = function () {
    var h = this.hall;
    if (!h) return;
    var t = 'scale(' + h.zoom.toFixed(3) + ') ' +
      'rotateY(' + (h.aim + h.yaw).toFixed(2) + 'deg) rotateX(' + h.pitch.toFixed(2) + 'deg)';
    // при обычной ходьбе камера не поворачивается: лишняя запись в transform
    // заставила бы браузер пересобирать всю сцену каждый кадр
    if (t === h.camKey) return;
    h.camKey = t;
    h.camera.style.transform = t;
  };

  /* Лёгкий параллакс за курсором: зал чуть отзывается на движение мыши.
     Углы намеренно маленькие — это оживление картинки, а не управление
     обзором: большой разворот сбивал с толку при ходьбе. */
  Widget.prototype.hallParallax = function (e) {
    var h = this.hall;
    if (!h || prefersReducedMotion() || window.innerWidth < 720) return;
    var r = h.stage.getBoundingClientRect();
    // Взгляд идёт за курсором: увели вправо — смотрим вправо, вниз — вниз.
    // Положительный rotateY поворачивает камеру вправо, положительный
    // rotateX — вверх, отсюда знаки.
    h.yaw = ((e.clientX - r.left) / r.width - 0.5) * 7;
    h.pitch = ((e.clientY - r.top) / r.height - 0.5) * -3.2;
    this.applyCamera();
  };

  /* Встать напротив полотна: подойти, сместиться поперёк зала
     и довернуть камеру, чтобы работа оказалась в центре кадра.

     Геометрия здесь не такая, как кажется. Камера поворачивается вокруг точки
     зрения, а та вынесена вперёд на величину perspective, поэтому до работы от
     неё не `dist`, а `perspective + dist`. Значит доворот на угол A уводит
     работу вбок на tan(A) * (perspective + dist) — и ровно настолько же нужно
     сместиться поперёк зала, чтобы вернуть её в центр. */
  Widget.prototype.focusArt = function (art) {
    var h = this.hall;
    if (!h || !art) return;
    var z = parseFloat(art.getAttribute('data-z'));
    var x = parseFloat(art.getAttribute('data-x'));
    var turn = parseFloat(art.getAttribute('data-turn'));

    var dist = Math.round(h.step * FOCUS_DIST);
    var arm = h.persp + dist;                    // реальное плечо доворота
    var aim = -turn * FOCUS_TURN;                // куда поворачиваем взгляд
    var camZ = -z - dist;
    var camX = -x + Math.tan(aim * Math.PI / 180) * arm;

    // Зал узкий, а плечо длинное: полный разворот увёл бы камеру сквозь стену.
    // Упираемся в стену — уменьшаем доворот ровно настолько, чтобы работа
    // всё равно осталась в центре кадра.
    var limit = h.hw - 140;
    if (camX > limit || camX < -limit) {
      camX = Math.max(-limit, Math.min(limit, camX));
      aim = Math.atan((camX + x) / arm) * 180 / Math.PI;
    }

    h.targetX = camX;
    h.targetAim = aim;
    h.targetZoom = FOCUS_ZOOM;
    this.keepFocus = true;
    this.walkTo(camZ);
    this.keepFocus = false;

    h.focus = art;
    art.classList.add('is-focused');
  };

  /* отойти от работы: камера возвращается на ось коридора */
  Widget.prototype.blurArt = function () {
    var h = this.hall;
    if (!h) return;
    h.targetX = 0;
    h.targetAim = 0;
    h.targetZoom = 1;
    if (h.focus) { h.focus.classList.remove('is-focused'); h.focus = null; }
  };

  Widget.prototype.walkBy = function (dz) { this.walkTo(this.hall.targetZ + dz); };

  Widget.prototype.walkTo = function (z, silent) {
    var h = this.hall;
    if (!h) return;
    h.targetZ = Math.max(-200, Math.min(h.maxZ, z));
    h.moving = true;
    this.hideHint();
    // шаг по залу отменяет подход к работе — кроме самого подхода
    if (!this.keepFocus) this.blurArt();
  };

  Widget.prototype.hideHint = function () {
    var hint = this.hall && this.hall.stage.querySelector('.artc-hint');
    if (!hint) return;
    hint.style.animation = '';                 // вернуть css-анимацию ухода
    if (!hint.classList.contains('is-hidden')) hint.classList.add('is-hidden');
  };

  /* Ненадолго показать подсказку поверх зала — тем же элементом, что и
     подсказка на входе: место для неё уже есть. Появление задаём инлайном,
     иначе сработала бы анимация входа с её девятисотмиллисекундной паузой. */
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

      // Замер скорости: на слабых устройствах переводим зал в облегчённый
      // режим, чтобы ходьба оставалась плавной. Считаем только те кадры, в
      // которых сцена действительно перерисовывается (камера едет) — на
      // стоянке кадры даром не тратятся, и по ним о скорости не судить.
      // Паузы между проходами в замер не попадают.
      if (!hall.probeAfter) hall.probeAfter = now + 700;    // первые кадры — распаковка картинок
      if (!hall.lite && hall.probeN < 1e6 && hall.moving && now > hall.probeAfter) {
        var gap = now - (hall.probeLast || now);
        hall.probeLast = now;
        if (gap > 0 && gap < 140) { hall.probeMs += gap; hall.probeN++; }
        if (hall.probeMs > 1400) {
          var fps = hall.probeN / hall.probeMs * 1000;
          hall.probeN = 1e6;
          if (fps < 34) {
            hall.lite = true;
            hall.stage.classList.add('is-lite');
          }
        }
      }
      var dt = Math.min(4, Math.max(0.2, (now - (hall.last || now)) / 16.67));
      hall.last = now;

      var k = 1 - Math.pow(1 - 0.085, dt);
      var d = hall.targetZ - hall.camZ;
      var dx = hall.targetX - hall.camX;
      var da = hall.targetAim - hall.aim;
      var dzoom = hall.targetZoom - hall.zoom;
      if (Math.abs(d) > 0.4 || Math.abs(dx) > 0.4 ||
          Math.abs(da) > 0.05 || Math.abs(dzoom) > 0.002) {
        hall.camZ += d * k;
        hall.camX += dx * k;
        hall.aim += da * k;
        hall.zoom += dzoom * k;
        hall.moving = true;
      } else if (hall.moving) {
        hall.camZ = hall.targetZ;
        hall.camX = hall.targetX;
        hall.aim = hall.targetAim;
        hall.zoom = hall.targetZoom;
        hall.moving = false;
        // камера встала — сверяем зоны шага с тем, где сейчас нарисованы
        // стрелки: на ходу и во время «влёта» они качаются вместе с камерой.
        // Считаем сразу: кадр без изменений до hallUpdate не доходит.
        hall.hitsPlaced = false;
        self.placeHits();
      }

      // покачивание шага
      var speed = Math.min(1, Math.abs(d) / 400);
      hall.bob += speed * 0.12 * dt;
      var bobY = prefersReducedMotion() ? 0 : Math.sin(hall.bob) * 5.5 * speed;

      // когда камера стоит, сцену не трогаем совсем: лишняя запись
      // в transform заставляет браузер пересобирать весь зал каждый кадр
      var frameKey = bobY.toFixed(1) + '|' + hall.camZ.toFixed(1) + '|' +
                     hall.camX.toFixed(1) + '|' + hall.aim.toFixed(2) + '|' +
                     hall.zoom.toFixed(3);
      if (frameKey === hall.frameKey) return;
      hall.frameKey = frameKey;

      hall.world.style.transform = 'translate3d(' + hall.camX.toFixed(2) + 'px,' +
        bobY.toFixed(2) + 'px,' + hall.camZ.toFixed(2) + 'px)';
      self.applyCamera();
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
      var near = dz > -4200 && dz < 900;
      if (near !== art.shown) {
        art.shown = near;
        art.style.visibility = near ? '' : 'hidden';
      }
      if (art.loaded || !near) continue;
      var imgs = art.querySelectorAll('img[data-webp]');   // полотно и фото автора
      if (!imgs.length) { art.loaded = true; continue; }
      for (var k = 0; k < imgs.length; k++) {
        var img = imgs[k];
        img.onerror = function () { this.onerror = null; this.src = this.getAttribute('data-src'); };
        img.src = img.getAttribute('data-webp') || img.getAttribute('data-src');
      }
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
    h.padF.style.transform = base3d + (-h.camZ - 760) + 'px) rotateX(90deg)';
    h.padB.style.transform = base3d + (-h.camZ - 395) + 'px) rotateX(90deg)';
    h.padF.classList.toggle('is-off', h.targetZ >= h.maxZ - 1);
    h.padB.classList.toggle('is-off', h.targetZ <= -199);
    h.hitF.classList.toggle('is-off', h.targetZ >= h.maxZ - 1);
    h.hitB.classList.toggle('is-off', h.targetZ <= -199);
    if (!h.hitsPlaced) this.placeHits();

    // арт-объекты рисуем только рядом с камерой; у отражений и посетителей
    // своя, более короткая дистанция: они дороже в отрисовке, а вдали
    // всё равно не читаются
    // в облегчённом режиме дистанции ещё короче — там дорог каждый кадр
    var reach = h.lite ? 0.55 : 1;
    for (var d = 0; d < h.decor.length; d++) {
      var o = h.decor[d];
      var odz = +o.getAttribute('data-z') + h.camZ;
      var oNear = odz > -(o.nearDist || 4600) * reach && odz < 700;
      if (oNear !== o.shown) {
        o.shown = oNear;
        o.style.visibility = oNear ? '' : 'hidden';
      }
    }
  };

  /* ------------- поиск художника в длинном зале ------------- */

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
        self.walkTo(self.hall.rooms[+b.getAttribute('data-room')].z);
        self.toggleFind(false);
      });
    }
  };

  /* ---------------- автоэкскурсия ---------------- */

  /* Камера сама обходит зал: подходит к каждой работе, задерживается
     у неё и едет дальше. Любое действие посетителя экскурсию прерывает. */
  Widget.prototype.toggleTour = function () {
    if (this.tour) { this.stopTour(); return; }
    var h = this.hall;
    if (!h || !h.arts.length) return;

    this.tour = { i: -1, t: null };
    h.stage.classList.add('is-touring');
    this.hideHint();
    this.tourStep();
  };

  Widget.prototype.tourStep = function () {
    var self = this;
    var h = this.hall;
    if (!this.tour || !h) return;

    this.tour.i++;
    if (this.tour.i >= h.arts.length) {      // дошли до конца — финальная стена
      this.blurArt();
      this.keepFocus = true;
      this.walkTo(h.maxZ);
      this.keepFocus = false;
      this.tour.t = setTimeout(function () { self.stopTour(); }, 6000);
      return;
    }

    this.focusArt(h.arts[this.tour.i]);
    this.tour.t = setTimeout(function () { self.tourStep(); }, 3800);
  };

  Widget.prototype.stopTour = function () {
    if (!this.tour) return;
    clearTimeout(this.tour.t);
    this.tour = null;
    if (this.hall) this.hall.stage.classList.remove('is-touring');
    this.blurArt();
  };

  /* Зоны нажатия ставим по фактическому положению нарисованных стрелок:
     они всегда на одном расстоянии от камеры, поэтому на экране не смещаются
     и пересчитывать их нужно только при изменении размеров сцены. */
  Widget.prototype.placeHits = function () {
    var h = this.hall;
    if (!h) return;
    var st = h.stage.getBoundingClientRect();
    if (!st.width || !st.height) return;

    // Нижняя граница зон. Мешают только те части панели, по которым правда
    // нажимают: кнопки шага по краям строки и кнопки перехода к художникам.
    // Полоса прогресса — просто индикатор, нажатия она не ловит (см. css).
    var limit = st.height;
    var rooms = h.stage.querySelector('.artc-rooms');
    var row = h.stage.querySelector('.artc-hud__row');
    var below = rooms && rooms.getBoundingClientRect().height ? rooms : row;
    if (below) {
      var br = below.getBoundingClientRect();
      if (br.height) limit = br.top - st.top - 8;
    }

    // По бокам строки — круглые кнопки шага; зона не должна их накрывать
    var side = 0;
    var walk = h.stage.querySelector('.artc-walk');
    if (walk) {
      var wr = walk.getBoundingClientRect();
      if (wr.width) side = wr.width + 26;
    }

    var rF = h.padF.getBoundingClientRect();
    var rB = h.padB.getBoundingClientRect();
    if (!rF.width || !rB.width) return;

    var cyF = rF.top + rF.height / 2 - st.top;   // дальняя стрелка — «вперёд»
    var cyB = rB.top + rB.height / 2 - st.top;   // ближняя стрелка — «назад»
    var w = Math.min(Math.max(rB.width * 1.5, st.width * 0.56), st.width - side * 2 - 16);
    var left = Math.round(st.width / 2 - w / 2);

    // Зоны обязаны идти встык, без наложения: пересекаясь, верхняя
    // перехватывала бы нажатия у нижней — по «назад» было не попасть.
    // И обе целиком помещаются над панелью: иначе нижняя половина «назад»
    // уходила под кнопки залов, и попасть по ней было нечем.
    var bottomB = Math.round(Math.min(limit, cyB + Math.max(60, st.height * 0.1)));
    var split = Math.min(Math.round((cyF + cyB) / 2), bottomB - 52);
    var topF = Math.min(Math.round(cyF - Math.max(64, st.height * 0.11)), split - 52);
    topF = Math.max(0, topF);

    var put = function (hit, top, bottom) {
      hit.style.left = left + 'px';
      hit.style.width = Math.round(w) + 'px';
      hit.style.top = Math.round(top) + 'px';
      hit.style.height = Math.max(44, Math.round(bottom - top)) + 'px';
    };
    put(h.hitF, topF, split - 3);
    put(h.hitB, split + 3, bottomB);
    h.hitsPlaced = true;
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
    // работу или карточку открывали из зала — возвращаем зрителя в коридор
    if ((m === this.lightbox || m === this.artistModal) && this.fromHall &&
        !document.querySelector('.artc-modal.is-open')) {
      this.fromHall = null;
      this.blurArt();
      // на телефоне про колесо мыши писать незачем
      this.showHint(window.innerWidth < 700
        ? 'Вы снова в зале — проведите пальцем, чтобы идти дальше'
        : 'Вы снова в зале — идите дальше: перетаскивайте, крутите колесо ' +
          'или жмите стрелки на полу');
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

  Widget.prototype.openArtist = function (i) {
    var n = this.artists.length;
    this.artistIdx = ((i % n) + n) % n;
    // если художник из другого раздела (переход из зала) — переключим раздел
    var target = this.artists[this.artistIdx];
    if (target && target.secIndex !== this.section && this.sections.length > 1) {
      this.switchSection(target.secIndex);
    }
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
        '<button type="button" class="artc-modal__close" aria-label="Закрыть">&#10005;</button>' +
        '<button type="button" class="artc-arrow artc-arrow--prev" aria-label="Предыдущая работа">' + ARROW_L + '</button>' +
        '<picture>' +
          '<source srcset="' + esc(this.url(w.full)) + '" type="image/webp">' +
          '<img class="artc-lightbox__img" src="' + esc(this.url(w.full).replace(/\.webp$/, '.jpg')) + '" ' +
            'alt="' + esc((w.title || 'Работа') + ' — ' + a.name) + '">' +
        '</picture>' +
        '<button type="button" class="artc-arrow artc-arrow--next" aria-label="Следующая работа">' + ARROW_R + '</button>' +
        '<p class="artc-lightbox__caption">' + caption + '</p>' +
        '<div class="artc-lightbox__actions">' +
          '<button type="button" class="artc-buy">Хочу купить картину</button>' +
          (this.lbFromHall
            ? '<button type="button" class="artc-back">' + ARROW_L + 'Вернуться в зал</button>'
            : '') +
        '</div>' +
      '</div>';

    var lb = this.lightbox;
    lb.querySelector('.artc-modal__close').addEventListener('click', function () { self.closeModal(lb); });
    lb.querySelector('.artc-arrow--prev').addEventListener('click', function () { self.openWork(self.workIdx - 1); });
    lb.querySelector('.artc-arrow--next').addEventListener('click', function () { self.openWork(self.workIdx + 1); });
    lb.querySelector('.artc-buy').addEventListener('click', function () { self.openForm(a, w); });
    var back = lb.querySelector('.artc-back');
    if (back) back.addEventListener('click', function () {
      self.closeModal(lb);
      if (self.artistModal.classList.contains('is-open')) self.closeModal(self.artistModal);
    });
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
