/* Уровни качества картинки и автоматический выбор по частоте кадров.

   high   — объёмное затенение (GTAO) в постобработке, сглаживание
            мультисэмплингом в буфере постобработки, плотность пикселей до 2;
   medium — без постобработки, сглаживание самого холста, плотность до 1.5;
   low    — плотность 1 (при нехватке — до 0.75), без мягких теней у стыков,
            крупные картинки подгружаются ближе.

   «Авто» стартует с high на компьютере и medium на телефоне и опускается
   на ступень, если средний кадр дольше ~22 мс (меньше 45 кадров в
   секунду) две секунды подряд. Вверх само не поднимается — иначе качество
   «дышало» бы туда-обратно; вверх — только вручную. Выбор зрителя
   запоминается в браузере. */
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GTAOPass } from 'three/examples/jsm/postprocessing/GTAOPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

export const LEVELS = ['low', 'medium', 'high'];
export const NAMES = { auto: 'Авто', high: 'Высокое', medium: 'Среднее', low: 'Низкое' };
const KEY = 'artg-quality';
const SLOW = 22;              // мс на кадр, после которых опускаемся
const WINDOW = 120;           // кадров в замере

export class Quality {
  constructor(g) {
    this.g = g;
    let saved = '';
    try { saved = localStorage.getItem(KEY) || ''; } catch (e) { /* приватный режим */ }
    this.mode = NAMES[saved] ? saved : 'auto';
    this.level = null;
    this.frames = [];
    this.skip = 0;
    this.onChange = null;
    this.set(this.mode === 'auto' ? (g.small ? 'medium' : 'high') : this.mode);
  }

  choose(mode) {
    this.mode = mode;
    try { localStorage.setItem(KEY, mode); } catch (e) { /* приватный режим */ }
    this.set(mode === 'auto' ? (this.g.small ? 'medium' : 'high') : mode);
  }

  set(level) {
    const g = this.g;
    this.level = level;
    this.frames.length = 0;
    this.skip = 30;                             // первые кадры после смены не считаем
    const dpr = window.devicePixelRatio || 1;
    g.maxPR = Math.min(dpr, level === 'high' ? 2 : level === 'medium' ? 1.5 : 1);
    g.pr = g.maxPR;
    g.renderer.setPixelRatio(g.pr);
    if (level === 'high') this.makeComposer(); else this.dropComposer();
    g.world.setDetail(level);
    if (g.spots) g.spots.setShadows(level === 'high');
    g.tex.setQuality(level);
    g.resize();
    if (this.onChange) this.onChange();
  }

  makeComposer() {
    const g = this.g;
    if (this.composer) return;
    const size = g.renderer.getDrawingBufferSize(new THREE.Vector2());
    const rt = new THREE.WebGLRenderTarget(size.x, size.y, { type: THREE.HalfFloatType, samples: 4 });
    const c = new EffectComposer(g.renderer, rt);
    c.addPass(new RenderPass(g.scene, g.camera));
    const ao = new GTAOPass(g.scene, g.camera, size.x, size.y);
    // мягко и близко: тени в стыках, у рам и под островом, а не грязь по стенам
    ao.updateGtaoMaterial({ radius: 0.45, distanceExponent: 1.5, thickness: 1, scale: 1, samples: 12 });
    ao.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 6, rings: 2, samples: 12 });
    ao.blendIntensity = 0.55;
    c.addPass(ao);
    c.addPass(new OutputPass());
    this.composer = c;
    this.ao = ao;
  }

  dropComposer() {
    if (!this.composer) return;
    this.composer.passes.forEach((p) => p.dispose && p.dispose());
    this.composer.dispose();
    this.composer = null;
    this.ao = null;
  }

  resize(w, h) {
    if (!this.composer) return;
    this.composer.setPixelRatio(this.g.pr);
    this.composer.setSize(w, h);
  }

  render() {
    const g = this.g;
    if (this.composer) this.composer.render();
    else g.renderer.render(g.scene, g.camera);
  }

  /* Замер кадра: при «Авто» — ступенью ниже, если не успеваем; в конце
     лестницы — плотность пикселей до 0.75 */
  frame(ms) {
    if (this.skip > 0) { this.skip--; return; }
    this.frames.push(ms);
    if (this.frames.length < WINDOW) return;
    const avg = this.frames.reduce((a, b) => a + b, 0) / this.frames.length;
    this.frames.length = 0;
    if (avg <= SLOW) return;
    const i = LEVELS.indexOf(this.level);
    if (this.mode === 'auto' && i > 0) { this.set(LEVELS[i - 1]); return; }
    const g = this.g;
    if (g.pr > 0.75) {
      g.pr = Math.max(0.75, g.pr - 0.25);
      g.renderer.setPixelRatio(g.pr);
      g.resize();
    }
  }
}
