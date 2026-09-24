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
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

/* Чистка кадра: не-числа и бесконечности → 0, яркость не выше 64 */
const SANITIZE = {
  uniforms: { tDiffuse: { value: null } },
  vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader: `uniform sampler2D tDiffuse; varying vec2 vUv;
    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      if (any(isnan(c)) || any(isinf(c)) || c.r != c.r || c.g != c.g || c.b != c.b) c = vec4(0.0, 0.0, 0.0, 1.0);
      gl_FragColor = clamp(c, 0.0, 64.0);
    }`,
};

/* Последний штрих кадра, как у камеры: мягкая виньетка и едва заметное
   зерно (движется каждый кадр — картинка «живая», без цифровой гладкости) */
const FilmShader = {
  uniforms: { tDiffuse: { value: null }, time: { value: 0 }, grain: { value: 0.035 }, vignette: { value: 0.28 } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float time; uniform float grain; uniform float vignette; varying vec2 vUv;
    float rnd(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233)) + time * 7.13) * 43758.5453); }
    void main(){
      vec4 c = texture2D(tDiffuse, vUv);
      vec2 d = vUv - 0.5;
      c.rgb *= 1.0 - vignette * smoothstep(0.25, 0.85, dot(d, d) * 2.2);
      float n = rnd(vUv * 1024.0) - 0.5;
      float l = dot(c.rgb, vec3(0.299, 0.587, 0.114));
      c.rgb += n * grain * (1.0 - l * 0.6);          // в тенях зерно заметнее, как у плёнки
      gl_FragColor = c;
    }`,
};

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
    if (g.atmo) g.atmo.setEnabled(level !== 'low');
    if (g.world && g.world.invTM) g.world.invTM.value = level === 'high' ? 1 : 0;
    // свет от экрана в холле — площадной источник, на низком его нет
    if (g.props && g.props.screenLight) g.props.screenLight.visible = level !== 'low';
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
    // блики на металле под спотом бывают ярче предела 16-битного кадра:
    // «бесконечность» в пикселе свечение размазало бы в чёрные прямоугольники
    c.addPass(new ShaderPass(SANITIZE));
    const ao = new GTAOPass(g.scene, g.camera, size.x, size.y);
    // мягко и близко: тени в стыках, у рам и под островом, а не грязь по стенам
    ao.updateGtaoMaterial({ radius: 0.45, distanceExponent: 1.5, thickness: 1, scale: 1, samples: 12 });
    ao.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 6, rings: 2, samples: 12 });
    ao.blendIntensity = 0.55;
    // лучи спотов прозрачны: в проход нормалей GTAO их пускать нельзя
    const hide = ao.overrideVisibility.bind(ao);
    ao.overrideVisibility = () => { hide(); g.scene.traverse((o) => { if (o.userData.noAO) o.visible = false; }); };
    c.addPass(ao);
    c.addPass(new ShaderPass(SANITIZE));
    // свечение: только то, что ярче белого, — линзы спотов, световые линии и панели
    const bloom = new UnrealBloomPass(new THREE.Vector2(size.x, size.y), 0.45, 0.45, 2.2);
    c.addPass(bloom);
    c.addPass(new OutputPass());
    this.film = new ShaderPass(FilmShader);
    c.addPass(this.film);
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
    if (this.composer) {
      if (this.film) this.film.uniforms.time.value = (performance.now() / 1000) % 100;
      this.composer.render();
    }
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
