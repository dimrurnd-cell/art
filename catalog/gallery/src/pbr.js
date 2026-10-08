/* Физически корректные материалы помещения из фактур gallery-assets/
   (их делает gallery/tools/gen-textures.py): цвет, рельеф и ORM-карта —
   затенение впадин, шероховатость и металличность в одной картинке.
   На компьютере — набор hi (2048 px у пола и стен), на телефоне — lo.

   Картинки грузятся асинхронно: материал создаётся сразу, фактура
   появляется, когда пришла, — сцена не ждёт загрузки. */
import * as THREE from 'three';

/* Бережный режим памяти (Android, мало ОЗУ): фактуры уменьшаются при
   загрузке до max px — вместо ~95 МБ видеопамяти около 24 МБ */
export const PBR_OPTS = { max: 0, lo: false };   // lo — лёгкие фактуры (слабый видеочип)

export class PBR {
  constructor(renderer, bridge, small) {
    this.bridge = bridge;
    this.tier = small || PBR_OPTS.lo ? 'lo' : 'hi';
    this.aniso = Math.min(small ? 4 : 16, renderer.capabilities.getMaxAnisotropy());
    this.loader = new THREE.TextureLoader();
    this.loader.setCrossOrigin('anonymous');
    this.cache = {};
    this.clones = {};                        // копии ещё не пришедших фактур — оживут вместе с ними
    this.pending = 0;
    this.onLoad = null;
    this.mats = [];                          // материалы набора — чтобы снять с них не пришедшую фактуру
  }

  tex(name, kind) {
    const key = name + '_' + kind;
    if (this.cache[key]) return this.cache[key];
    this.pending++;
    const done = () => { this.pending--; if (this.onLoad) this.onLoad(this.pending); };
    const loaded = () => {
      (this.clones[key] || []).forEach((c) => { c.needsUpdate = true; });
      delete this.clones[key];
      done();
    };
    const url = this.bridge.url('gallery-assets/' + this.tier + '/' + key + '.webp');
    let t;
    // Сбой сети («экономия трафика», плохая связь): ещё одна попытка, потом —
    // снять карту с материалов. Незагруженная карта читается как нули: карта
    // затенения (orm) = полная тень, цвет = чёрный — стены становились чёрными.
    let tries = 0;
    const failed = () => {
      if (++tries < 2) { setTimeout(start, 1500); return; }
      this.strip(key);
      done();
    };
    const start = () => {
      if (PBR_OPTS.max && typeof createImageBitmap === 'function') {
        fetch(url, { mode: 'cors', credentials: 'omit' })
          .then((r) => { if (!r.ok) throw new Error(r.status); return r.blob(); })
          .then((b) => createImageBitmap(b, { imageOrientation: 'flipY', premultiplyAlpha: 'none', colorSpaceConversion: 'none',
            resizeWidth: PBR_OPTS.max, resizeHeight: PBR_OPTS.max, resizeQuality: 'high' }))
          .then((bmp) => { t.image = bmp; t.needsUpdate = true; loaded(); }, failed);
      } else {
        this.loader.load(url, (img) => { t.image = img.image; t.needsUpdate = true; loaded(); }, undefined, failed);
      }
    };
    t = new THREE.Texture();
    if (PBR_OPTS.max && typeof createImageBitmap === 'function') t.flipY = false;   // переворот сделан при декодировании
    start();
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.anisotropy = this.aniso;
    t.colorSpace = kind === 'color' ? THREE.SRGBColorSpace : THREE.NoColorSpace;
    this.cache[key] = t;
    return t;
  }

  /* Фактура так и не пришла — убрать её из материалов, чтобы не рисовать чёрным */
  strip(key) {
    const t = this.cache[key];
    for (const m of this.mats) {
      let hit = false;
      for (const slot of ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'aoMap']) {
        if (m[slot] === t) { m[slot] = null; hit = true; }
      }
      if (!hit) continue;
      if (!m.roughnessMap) m.roughness = m.userData.roughness != null ? m.userData.roughness : 0.85;
      if (!m.metalnessMap) m.metalness = m.userData.metalness != null ? m.userData.metalness : 0;
      m.needsUpdate = true;
    }
    if (window.console) console.warn('[artgallery] фактура не загрузилась:', key);
  }

  /* Копия фактуры со своим повтором (холст картины). Копия, снятая до
     загрузки, сразу помечена к загрузке в видеокарту, а картинки ещё нет:
     three.js ругался бы на каждом кадре. Такая копия ждёт своей фактуры. */
  clone(name, kind) {
    const t = this.tex(name, kind);
    const v = t.source.version;
    const c = t.clone();
    if (!t.image) {
      c.version = 0;
      const key = name + '_' + kind;
      (this.clones[key] = this.clones[key] || []).push(c);
    } else {
      // фактура уже в видеокарте: клон не должен заставлять грузить её заново
      c.source.version = v;
    }
    return c;
  }

  /* Материал из набора: color — есть ли своя карта цвета */
  material(name, opts = {}) {
    const orm = this.tex(name, 'orm');
    const m = new THREE.MeshStandardMaterial(Object.assign({
      normalMap: this.tex(name, 'normal'),
      roughnessMap: orm,
      metalnessMap: orm,
      aoMap: orm,
      roughness: 1,
      metalness: 1,
    }, opts));
    if (opts.color === undefined) m.map = this.tex(name, 'color');
    this.mats.push(m);
    return m;
  }
}
