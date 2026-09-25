/* Качество картинки: два уровня и подстройка разрешения.

   HD — постобработка: объёмное затенение (GTAO), свечение ярких ламп,
        тон-маппинг кадра, мультисэмплинг; тени от рам; плотность до 2;
   SD — без постобработки, со сглаживанием самого холста; мягкие тени у
        стыков и под рамами остаются (они дешёвые и дают объём — без них
        зал плоский и серый); на телефоне — без лучей спотов и света от
        экрана: это полупрозрачные площади поверх всего кадра, дорогие
        для мобильного видеочипа. Плотность до 2 на телефоне, 1.5 — на
        компьютере.

   Разрешение подстраивается само под частоту кадров (цель — 30 кадров/с
   на телефоне, 45 на компьютере): ступенями по 0.25 плотности вниз, если
   не успеваем, и вверх, если запас большой; ступень, на которой уже не
   успели, второй раз не берётся. Когда зритель стоит и смотрит (камера
   неподвижна полсекунды), кадр рисуется в полной чёткости — движения нет,
   и частота кадров не важна; с первым шагом возвращается рабочая плотность.

   «Авто» стартует с HD на компьютере и SD на телефоне; если HD не
   успевает и на пониженной плотности — переходит на SD. Запрет на
   ступень, где не успели, снимается через 20 секунд. Выбор зрителя
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

export const LEVELS = ['sd', 'hd'];
export const NAMES = { auto: 'Авто', hd: 'HD', sd: 'SD' };
const KEY = 'artg-quality';
const OLD = { high: 'hd', medium: 'sd', low: 'sd' };   // сохранённый выбор прежних версий
const WINDOW = 60;            // кадров в замере
const STILL = 30;             // кадров без движения — и рисуем в полной чёткости

export class Quality {
  constructor(g) {
    this.g = g;
    let saved = '';
    try { saved = localStorage.getItem(KEY) || ''; } catch (e) { /* приватный режим */ }
    saved = OLD[saved] || saved;
    this.mode = NAMES[saved] ? saved : 'auto';
    this.level = null;
    this.frames = [];
    this.skip = 0;
    this.still = 0;
    this.rest = false;
    this.onChange = null;
    // цель по времени кадра: телефон — 30 кадров/с, компьютер — 45
    this.budget = g.small ? 33 : 22;
    this.set(this.mode === 'auto' ? this.autoLevel() : this.mode);
  }

  autoLevel() { return this.g.small ? 'sd' : 'hd'; }

  choose(mode) {
    this.mode = mode;
    try { localStorage.setItem(KEY, mode); } catch (e) { /* приватный режим */ }
    this.set(mode === 'auto' ? this.autoLevel() : mode);
  }

  set(level) {
    const g = this.g;
    const hd = level === 'hd';
    this.level = level;
    this.frames.length = 0;
    this.skip = 30;                             // первые кадры после смены не считаем
    this.rest = false;
    this.still = 0;
    const dpr = window.devicePixelRatio || 1;
    g.maxPR = Math.min(dpr, hd || g.small ? 2 : 1.5);
    g.minPR = Math.min(g.maxPR, g.small ? 1 : 0.75);
    this.ceil = g.maxPR;
    // телефон начинает с 1.5: полная плотность 2 редкому видеочипу по силам
    this.work = g.small ? Math.min(g.maxPR, 1.5) : g.maxPR;
    this.nextPR = null;
    this.applyPR(this.work);
    if (hd) this.makeComposer(); else this.dropComposer();
    g.world.setDetail(level);
    if (g.spots) g.spots.setShadows(hd);
    const light = hd || !g.small;
    if (g.atmo) g.atmo.setEnabled(light);
    if (g.world && g.world.invTM) g.world.invTM.value = hd ? 1 : 0;
    // свет от экрана в холле — площадной источник
    if (g.props && g.props.screenLight) g.props.screenLight.visible = light;
    g.tex.setQuality(level);
    if (this.onChange) this.onChange();
  }

  applyPR(pr) {
    const g = this.g;
    if (g.pr === pr && g.renderer.getPixelRatio() === pr) return;
    g.pr = pr;
    g.renderer.setPixelRatio(pr);
    g.resize();
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

  /* Смена плотности из замера кадра — только перед отрисовкой. Замер идёт
     после неё, а смена размера холста его стирает: до следующего кадра на
     экране оставался пустой холст, сквозь него — светлый фон сцены
     (белая вспышка при остановке и начале ходьбы, во весь экран заметнее). */
  deferPR(pr) { this.nextPR = pr; }

  render() {
    const g = this.g;
    if (this.nextPR != null) { this.applyPR(this.nextPR); this.nextPR = null; }
    if (this.composer) {
      if (this.film) this.film.uniforms.time.value = (performance.now() / 1000) % 100;
      this.composer.render();
    }
    else g.renderer.render(g.scene, g.camera);
  }

  /* Замер кадра; moving — камера сдвинулась или повернулась */
  frame(ms, moving) {
    const g = this.g;
    if (!moving) {
      // стоим: полная чёткость (кроме HD — там перестройка буферов
      // постобработки на каждой остановке дороже, чем выигрыш)
      if (++this.still === STILL && this.level === 'sd' && g.pr < g.maxPR) {
        this.rest = true;
        this.deferPR(g.maxPR);
      }
      if (this.rest) return;
    } else {
      this.still = 0;
      if (this.rest) {
        this.rest = false;
        this.deferPR(this.work);
        this.frames.length = 0;
        this.skip = 10;
        return;
      }
    }
    if (this.skip > 0) { this.skip--; return; }
    this.frames.push(ms);
    if (this.frames.length < WINDOW) return;
    // медиана, а не среднее: разовая задержка (сборка зала) не должна
    // опускать качество
    const f = this.frames.slice().sort((a, b) => a - b);
    const med = f[f.length >> 1];
    this.frames.length = 0;
    if (med > this.budget * 1.08) {
      if (this.work > g.minPR) {
        this.ceil = Math.min(this.ceil, this.work - 0.25);   // на этой ступени не успели
        this.ceilAt = performance.now();
        this.work = Math.max(g.minPR, this.work - 0.25);
        this.deferPR(this.work);
      } else if (this.mode === 'auto' && this.level === 'hd') {
        this.set('sd');
      }
    } else if (med < this.budget * 0.62) {
      // запрет ступени — на 20 с: медленным мог быть разовый отрезок (загрузка, сборка залов)
      if (performance.now() - (this.ceilAt || 0) > 20000) this.ceil = g.maxPR;
      if (this.work + 0.25 > this.ceil) return;
      this.work += 0.25;
      this.deferPR(this.work);
      this.skip = 20;
    }
  }
}
