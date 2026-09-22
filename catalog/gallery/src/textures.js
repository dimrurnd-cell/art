/* Картинки работ: атлас превью + уровни детализации + бюджет видеопамяти.

   Уровни полотна:
     0 — клетка общего атласа превью (≈90 px). Атлас грузится целиком при
         входе, поэтому у любой работы с первых секунд есть изображение, и
         ниже этого уровня работа не опускается никогда: пустых рам нет;
     1 — 400 px, 2 — 800 px, 3 — 1600 px, по расстоянию до зрителя.

   Вверх переходим сразу, вниз — с запасом по расстоянию (гистерезис), и
   старая картинка висит, пока не пришла новая. Загрузка — fetch +
   createImageBitmap: декодирование идёт вне основного потока и не дёргает
   кадр; после выгрузки в видеопамять растр в памяти страницы закрывается.

   Бюджет видеопамяти: когда крупные картинки занимают больше лимита,
   опускаем до атласа те, что дольше всех не попадали в кадр (а не самые
   дальние: шаг назад к только что виденной работе не должен её грузить
   заново). */
import * as THREE from 'three';

const MB = 1024 * 1024;

export class TextureManager {
  constructor(renderer, bridge, small) {
    this.bridge = bridge;
    this.small = small;
    this.aniso = Math.min(small ? 4 : 12, renderer.capabilities.getMaxAnisotropy());
    this.active = 0;
    this.limit = small ? 4 : 6;
    /* Пороги уровней, м: ближе — 1600, ближе — 800, ближе — 400, дальше — атлас.
       Считаны по экрану: полотно 1.5 м с 10 м занимает ~300 px кадра (при
       плотности 2), с 45 м — ~70 px, как клетка атласа. 1600 нужна только
       вплотную — у работы, к которой подошли. */
    this.near = small ? [0, 7, 32] : [3.2, 10, 45];
    this.budget = (small ? 110 : 300) * MB;
    this.bytes = 0;
    this.fails = 0;
    this.oks = 0;
    this.corsChecked = false;
    this.bitmaps = typeof createImageBitmap === 'function' && typeof fetch === 'function';
    this.atlas = null;              // { json, pages: [THREE.Texture] }
    this.frustum = new THREE.Frustum();
    this.pv = new THREE.Matrix4();
    this.stats = { ticks: 0, blankTicks: 0, blankMax: 0, loads: 0, evictions: 0, downgrades: 0 };
  }

  levelFor(d) {
    const [n3, n2, n1] = this.near;
    if (d < n3) return 3;
    if (d < n2) return 2;
    if (d < n1) return 1;
    return 0;
  }

  url(work, level) {
    const p = level === 3 ? work.full : level === 2 ? work.medium : work.thumb;
    return p ? this.bridge.url(p) : '';
  }

  /* ---------------- атлас ---------------- */

  loadAtlas(paintings, onProgress) {
    const done = (n, total) => { if (onProgress) onProgress(n, total); };
    return fetch(this.bridge.url('atlas.json'), { mode: 'cors', credentials: 'omit' })
      .then((r) => { if (!r.ok) throw new Error('atlas.json: ' + r.status); return r.json(); })
      .then((json) => {
        // paintings — живой список собранных залов: он растёт по мере сборки
        this.plan = paintings;
        this.atlas = { json, pages: [] };
        for (const it of paintings) it.cell = json.items[it.work.thumb] || null;
        let n = 0;
        done(0, json.pages.length);
        return Promise.all(json.pages.map((p, i) => this.fetchImage(this.bridge.url(p)).then((img) => {
          const t = this.makeTexture(img);
          this.atlas.pages[i] = t;
          for (const it of this.plan) {
            if (it.cell && it.cell[0] === i && !it.level && !it.mesh.material.map) this.toAtlas(it);
          }
          done(++n, json.pages.length);
        }).catch(() => { done(++n, json.pages.length); })));
      })
      .catch(() => { this.atlas = null; done(1, 1); });   // атласа нет — работаем без него
  }

  /* Работы только что собранного зала: сразу их клетки атласа */
  attach(items) {
    if (!this.atlas) return;
    for (const it of items) {
      it.cell = this.atlas.json.items[it.work.thumb] || null;
      if (!it.mesh.material.map) this.toAtlas(it);
    }
  }

  /* Работа показывает свою клетку атласа (одна текстура на всю страницу
     атласа, у каждой работы — только свой сдвиг координат) */
  toAtlas(it) {
    const page = this.atlas && it.cell && this.atlas.pages[it.cell[0]];
    if (!page) return false;
    const t = page.clone();          // общий источник: в видеопамяти одна копия
    const S = this.atlas.json.size;
    const [, x, y, w, h] = it.cell;
    // полпикселя внутрь клетки: без этого по краю просвечивает соседняя работа
    this.setUV(t, (x + 0.5) / S, (y + 0.5) / S, (x + w - 0.5) / S, (y + h - 0.5) / S);
    this.swap(it, t, 0, 0);
    return true;
  }

  /* ---------------- загрузка ---------------- */

  fetchImage(src) {
    if (this.bitmaps) {
      return fetch(src, { mode: 'cors', credentials: 'omit' })
        .then((r) => { if (!r.ok) throw new Error(r.status); return r.blob(); })
        .then((b) => createImageBitmap(b, { premultiplyAlpha: 'none', colorSpaceConversion: 'none' }))
        .catch((e) => {
          if (/\.webp(\?|$)/.test(src)) return this.fetchImage(src.replace(/\.webp(\?|$)/, '.jpg$1'));
          throw e;
        });
    }
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.decoding = 'async';
      let jpg = false;
      img.onload = () => resolve(img);
      img.onerror = () => {
        if (!jpg && /\.webp(\?|$)/.test(src)) { jpg = true; img.src = src.replace(/\.webp(\?|$)/, '.jpg$1'); return; }
        reject(new Error('image'));
      };
      img.src = src;
    });
  }

  makeTexture(img) {
    const t = new THREE.Texture(img);
    const bitmap = typeof ImageBitmap !== 'undefined' && img instanceof ImageBitmap;
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = this.aniso;
    t.generateMipmaps = true;
    t.minFilter = THREE.LinearMipmapLinearFilter;
    // ImageBitmap WebGL не переворачивает — строки идут сверху вниз
    t.flipY = !bitmap;
    t.userData.topDown = bitmap;
    t.needsUpdate = true;
    const w = img.width, h = img.height;
    t.userData.bytes = Math.round(w * h * 4 * 1.34);
    // после загрузки в GPU растр в памяти страницы не нужен
    t.onUpdate = () => {
      if (bitmap && img.close) img.close();
      t.image = { width: w, height: h };
    };
    return t;
  }

  /* Прямоугольник картинки (в долях, от верхнего левого угла) → на плоскость */
  setUV(t, x0, y0, x1, y1) {
    if (t.userData.topDown) { t.repeat.set(x1 - x0, y0 - y1); t.offset.set(x0, y1); }
    else { t.repeat.set(x1 - x0, y1 - y0); t.offset.set(x0, 1 - y1); }
  }

  swap(it, t, level, bytes) {
    const mat = it.mesh.material;
    const old = mat.map;
    const first = !old;
    mat.map = t;
    mat.color.setHex(0xffffff);
    if (first) mat.needsUpdate = true;
    if (old) old.dispose();          // клон атласа освобождает только себя
    this.bytes += bytes - (it.bytes || 0);
    it.bytes = bytes;
    it.level = level;
  }

  load(it, level) {
    const src = this.url(it.work, level);
    if (!src) { (it.failed = it.failed || {})[level] = true; return; }
    it.loading = level;
    this.active++;
    this.stats.loads++;
    this.fetchImage(src).then((img) => {
      this.active--; it.loading = 0; this.oks++;
      // пока грузилось, зритель ушёл: картинка ниже нужной и ниже текущей — не нужна
      if (level < it.want && level <= it.level) { if (img.close) img.close(); return; }
      const t = this.makeTexture(img);
      this.setUV(t, 0, 0, 1, 1);
      this.swap(it, t, level, t.userData.bytes);
    }, () => {
      this.active--; it.loading = 0;
      (it.failed = it.failed || {})[level] = true;
      this.fails++;
      this.checkCors(src);
    });
  }

  /* ---------------- каждый тик ---------------- */

  update(paintings, camera) {
    this.plan = paintings;
    const now = performance.now();
    camera.updateMatrixWorld();
    this.pv.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    this.frustum.setFromProjectionMatrix(this.pv);

    const want = [];
    let blank = 0;
    for (const it of paintings) {
      if (it.dist == null) continue;
      const inView = it.mesh.visible && this.frustum.intersectsObject(it.mesh);
      if (inView) {
        it.seen = now;
        if (!it.mesh.material.map && it.dist < 60 && !this.hopeless(it)) blank++;
      }
      let lv = this.levelFor(it.dist);
      // зал за стеной сейчас не виден — крупнее 400 px ему не нужно
      if (it.group && !it.group.visible) lv = Math.min(lv, 1);
      if (lv < it.level) {
        lv = Math.min(it.level, this.levelFor(it.dist / 1.45));
        // до атласа опускаемся, только если он есть; иначе держим 400 px
        if (lv === 0 && !it.cell && it.dist < 125) lv = 1;
      }
      while (lv > 0 && it.failed && it.failed[lv]) lv--;
      it.want = lv;
      if (lv === 0 && it.level > 0 && it.cell && this.atlas) {
        if (this.toAtlas(it)) this.stats.downgrades++;
      } else if (lv !== it.level && it.loading !== lv && !(lv === 0 && !it.cell)) {
        // очки: ближе и по курсу — раньше; апгрейды раньше даунгрейдов
        // спуск с 1600 освобождает много памяти — его не откладываем
        it.score = it.dist * (inView ? 0.6 : 1.5) + (lv < it.level ? (it.level === 3 ? 0 : 60) : 0);
        want.push(it);
      }
    }
    this.stats.ticks++;
    if (blank) this.stats.blankTicks++;
    this.stats.blankMax = Math.max(this.stats.blankMax, blank);

    this.enforceBudget(now);
    if (!want.length) return;
    want.sort((a, b) => a.score - b.score);
    for (const it of want) {
      if (this.active >= this.limit) break;
      if (it.loading) continue;
      // крупную картинку не начинаем, если бюджет уже исчерпан
      if (it.want > it.level && this.bytes > this.budget * 0.92 && it.want > 1) continue;
      this.load(it, it.want);
    }
  }

  /* Работа, у которой нет ни атласа, ни одного доступного уровня */
  hopeless(it) {
    return !it.cell && it.failed && it.failed[1] && it.failed[2] && it.failed[3];
  }

  enforceBudget(now) {
    if (this.bytes <= this.budget || !this.atlas) return;
    const loaded = [];
    for (const it of this.plan || []) if (it.level > 0 && it.cell) loaded.push(it);
    loaded.sort((a, b) => (a.seen || 0) - (b.seen || 0));
    for (const it of loaded) {
      if (this.bytes <= this.budget * 0.85) break;
      if (now - (it.seen || 0) < 500) break;      // всё остальное сейчас в кадре
      if (this.toAtlas(it)) this.stats.evictions++;
    }
  }

  resetStats() {
    this.stats = { ticks: 0, blankTicks: 0, blankMax: 0, loads: 0, evictions: 0, downgrades: 0 };
  }

  report() {
    const lv = [0, 0, 0, 0];
    let blank = 0;
    for (const it of this.plan || []) { lv[it.level]++; if (!it.mesh.material.map) blank++; }
    return Object.assign({
      gpuMB: +(this.bytes / MB).toFixed(1),
      budgetMB: this.budget / MB,
      byLevel: lv,
      noImage: blank,
      atlasPages: this.atlas ? this.atlas.pages.filter(Boolean).length : 0,
      // атлас живёт в памяти постоянно и в бюджет крупных картинок не входит
      atlasMB: this.atlas ? +(this.atlas.pages.filter(Boolean).length * this.atlas.json.size ** 2 * 4 * 1.34 / MB).toFixed(1) : 0,
    }, this.stats);
  }

  /* Каталог на чужом домене без CORS: браузер отдаёт картинку в <img>,
     но запрещает брать её в WebGL. Тогда 3D-зал невозможен — просим
     виджет вернуться к CSS-залу. Картинки, которых просто нет на
     сервере (404), к этому не относятся. */
  checkCors(src) {
    if (this.corsChecked || this.oks > 0 || this.fails < 3) return;
    this.corsChecked = true;
    const probe = new Image();
    probe.onload = () => { if (this.oks === 0 && this.bridge.fallback) this.bridge.fallback('cors'); };
    probe.src = src.replace(/\.webp(\?|$)/, '.jpg$1');
  }
}
