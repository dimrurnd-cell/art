/* Загрузка полотен по уровням детализации.

   Уровни: 0 — грунт (картинки нет), 1 — 400 px, 2 — 800 px, 3 — 1600 px.
   Нужный уровень выбирается по расстоянию до зрителя; вверх переходим
   сразу, вниз — с запасом по расстоянию (гистерезис), и старая
   картинка остаётся на полотне, пока не пришла новая. Поэтому полотно
   никогда не мигает пустотой при ходьбе взад-вперёд.

   После выгрузки в видеопамять ссылку на <img> отпускаем: распакованный
   растр в оперативной памяти больше не нужен. */
import * as THREE from 'three';

export class TextureManager {
  constructor(renderer, bridge, small) {
    this.bridge = bridge;
    this.aniso = Math.min(small ? 4 : 12, renderer.capabilities.getMaxAnisotropy());
    this.small = small;
    this.active = 0;
    this.limit = small ? 4 : 6;
    this.fails = 0;
    this.oks = 0;
    this.corsChecked = false;
    // пороги уровней, м: [ближе — 3, ближе — 2, ближе — 1]
    this.near = small ? [0, 9, 60] : [6.5, 20, 85];
    this.onChange = null;
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

  update(paintings) {
    const want = [];
    for (const it of paintings) {
      if (it.dist == null) continue;
      let lv = this.levelFor(it.dist);
      if (lv < it.level) {
        // вниз — только с запасом по расстоянию; до грунта — лишь далеко в тумане
        lv = Math.min(it.level, this.levelFor(it.dist / 1.45));
        if (lv === 0 && it.dist < 140) lv = 1;
      }
      while (lv > 0 && it.failed && it.failed[lv]) lv--;
      it.want = lv;
      if (lv === 0 && it.level > 0 && it.dist > 140) this.drop(it);
      else if (lv !== it.level && it.loading !== lv) want.push(it);
    }
    if (!want.length) return;
    // ближние и те, что прямо по курсу, — первыми
    want.sort((a, b) => a.dist - b.dist);
    for (const it of want) {
      if (this.active >= this.limit) break;
      if (it.loading) continue;
      this.load(it, it.want);
    }
  }

  drop(it) {
    const mat = it.mesh.material;
    if (mat.map) { mat.map.dispose(); mat.map = null; mat.color.setHex(0xd9d0bd); mat.needsUpdate = true; }
    it.level = 0;
  }

  load(it, level) {
    const src = this.url(it.work, level);
    if (!src) { (it.failed = it.failed || {})[level] = true; return; }
    it.loading = level;
    this.active++;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.decoding = 'async';
    let triedJpg = false;
    const done = () => { this.active--; it.loading = 0; };
    img.onload = () => {
      done();
      this.oks++;
      if (it.level > 0 && level !== it.want && level < it.level) return;   // уже не нужен
      this.apply(it, img, level);
    };
    img.onerror = () => {
      if (!triedJpg && /\.webp(\?|$)/.test(img.src)) {
        triedJpg = true;
        img.src = src.replace(/\.webp(\?|$)/, '.jpg$1');
        return;
      }
      done();
      (it.failed = it.failed || {})[level] = true;
      this.fails++;
      this.checkCors(src);
    };
    img.src = src;
  }

  apply(it, img, level) {
    const t = new THREE.Texture(img);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = this.aniso;
    t.generateMipmaps = true;
    t.minFilter = THREE.LinearMipmapLinearFilter;
    t.needsUpdate = true;
    const w = img.naturalWidth, h = img.naturalHeight;
    // после загрузки в GPU картинка в памяти страницы не нужна
    t.onUpdate = () => { t.image = { width: w, height: h }; };
    const mat = it.mesh.material;
    const old = mat.map;
    const first = !old;
    mat.map = t;
    mat.color.setHex(0xffffff);
    if (first) mat.needsUpdate = true;
    if (old) old.dispose();
    it.level = level;
    if (this.onChange) this.onChange(it);
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
