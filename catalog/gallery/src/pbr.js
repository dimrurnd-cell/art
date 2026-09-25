/* Физически корректные материалы помещения из фактур gallery-assets/
   (их делает gallery/tools/gen-textures.py): цвет, рельеф и ORM-карта —
   затенение впадин, шероховатость и металличность в одной картинке.
   На компьютере — набор hi (2048 px у пола и стен), на телефоне — lo.

   Картинки грузятся асинхронно: материал создаётся сразу, фактура
   появляется, когда пришла, — сцена не ждёт загрузки. */
import * as THREE from 'three';

/* Бережный режим памяти (Android, мало ОЗУ): фактуры уменьшаются при
   загрузке до max px — вместо ~95 МБ видеопамяти около 24 МБ */
export const PBR_OPTS = { max: 0 };

export class PBR {
  constructor(renderer, bridge, small) {
    this.bridge = bridge;
    this.tier = small ? 'lo' : 'hi';
    this.aniso = Math.min(small ? 4 : 16, renderer.capabilities.getMaxAnisotropy());
    this.loader = new THREE.TextureLoader();
    this.loader.setCrossOrigin('anonymous');
    this.cache = {};
    this.pending = 0;
    this.onLoad = null;
  }

  tex(name, kind) {
    const key = name + '_' + kind;
    if (this.cache[key]) return this.cache[key];
    this.pending++;
    const done = () => { this.pending--; if (this.onLoad) this.onLoad(this.pending); };
    const url = this.bridge.url('gallery-assets/' + this.tier + '/' + key + '.webp');
    let t;
    if (PBR_OPTS.max && typeof createImageBitmap === 'function') {
      t = new THREE.Texture();
      t.flipY = false;                         // переворот сделан при декодировании (как у TextureLoader)
      fetch(url, { mode: 'cors', credentials: 'omit' })
        .then((r) => { if (!r.ok) throw new Error(r.status); return r.blob(); })
        .then((b) => createImageBitmap(b, { imageOrientation: 'flipY', premultiplyAlpha: 'none', colorSpaceConversion: 'none',
          resizeWidth: PBR_OPTS.max, resizeHeight: PBR_OPTS.max, resizeQuality: 'high' }))
        .then((bmp) => { t.image = bmp; t.needsUpdate = true; done(); }, done);
    } else t = this.loader.load(url, done, undefined, done);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.anisotropy = this.aniso;
    t.colorSpace = kind === 'color' ? THREE.SRGBColorSpace : THREE.NoColorSpace;
    this.cache[key] = t;
    return t;
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
    return m;
  }
}
