/* Отражения в полу: полированный микроцемент.

   Зонд окружения (probe.js) даёт полу размытое отражение помещения,
   снятое один раз при входе в зал. Этого мало для «дорогого» пола: картина
   должна отражаться точно под собой и двигаться вместе со зрителем.

   Здесь — плоское зеркало: зал рисуется второй раз камерой, отражённой
   относительно пола (y = 0), в отдельную текстуру вдвое меньшего
   разрешения, с мипмапами. Шейдер пола берёт из неё цвет по экранной
   координате точки, чуть смещённой рельефом, с размытием (уровень
   мипмапа) — так полированный бетон и выглядит: отражение мягкое, у
   дальнего края пола сильнее (Френель), под ногами почти не видно.

   Цена — второй проход сцены. Поэтому только HD на компьютере (там его
   включает quality.js), в половинном разрешении, без пересчёта теней;
   пол сам в свою текстуру не рисуется. Если HD не успевает, качество
   само переходит на SD — и отражения выключаются вместе с ним. */
import * as THREE from 'three';

const VERT_PARS = 'uniform mat4 mirrorMatrix;\nvarying vec4 vMirrorUv;\n';
const VERT = `
vec4 mrWorld = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
  mrWorld = instanceMatrix * mrWorld;
#endif
vMirrorUv = mirrorMatrix * modelMatrix * mrWorld;
`;
const FRAG_PARS = 'uniform sampler2D tMirror;\nuniform float mirrorOn;\nuniform float mirrorLod;\nvarying vec4 vMirrorUv;\n';
const FRAG = `
if ( mirrorOn > 0.0 ) {
  // рельеф пола чуть искажает отражение — как у настоящего бетона
  vec2 mrUv = vMirrorUv.xy / vMirrorUv.w + normal.xy * 0.018;
  vec3 mrCol = textureLod( tMirror, mrUv, mirrorLod ).rgb;
  float mrCos = clamp( dot( normal, normalize( vViewPosition ) ), 0.0, 1.0 );
  float mrFres = 0.04 + 0.96 * pow( 1.0 - mrCos, 5.0 );
  // матовые места пола (карта шероховатости) отражают слабее
  float mrGloss = 1.0 - smoothstep( 0.35, 0.95, material.roughness );
  // смешиваем, а не прибавляем: зонд окружения уже дал полу размытое
  // отражение — здесь часть его заменяется чётким, яркость пола та же
  float mrK = mirrorOn * mrGloss * mix( 0.14, 0.5, mrFres );
  outgoingLight = mix( outgoingLight, mrCol, mrK );
}
`;

export class FloorMirror {
  constructor(renderer, scene) {
    this.renderer = renderer;
    this.scene = scene;
    this.on = false;
    this.meshes = [];                          // меши пола: во время прохода зеркала скрыты
    this.rt = new THREE.WebGLRenderTarget(2, 2, {
      type: THREE.HalfFloatType,
      generateMipmaps: true,
      minFilter: THREE.LinearMipmapLinearFilter,
      magFilter: THREE.LinearFilter,
    });
    this.cam = new THREE.PerspectiveCamera();
    this.u = {
      tMirror: { value: this.rt.texture },
      mirrorMatrix: { value: new THREE.Matrix4() },
      mirrorOn: { value: 0 },
      mirrorLod: { value: 1.6 },
    };
    this._v = {
      camPos: new THREE.Vector3(), view: new THREE.Vector3(), look: new THREE.Vector3(),
      target: new THREE.Vector3(), rot: new THREE.Matrix4(), plane: new THREE.Plane(),
      clip: new THREE.Vector4(), q: new THREE.Vector4(),
    };
  }

  /* Материал пола получает отражение; доработки шейдера, сделанные раньше
     (зонд окружения), сохраняются */
  patch(mat) {
    const u = this.u;
    const own = mat.onBeforeCompile, ownKey = mat.customProgramCacheKey.call(mat);
    mat.onBeforeCompile = (sh, r) => {
      own.call(mat, sh, r);
      Object.assign(sh.uniforms, u);
      sh.vertexShader = VERT_PARS + sh.vertexShader
        .replace('#include <project_vertex>', '#include <project_vertex>\n' + VERT);
      sh.fragmentShader = FRAG_PARS + sh.fragmentShader
        .replace('#include <opaque_fragment>', FRAG + '#include <opaque_fragment>');
    };
    mat.customProgramCacheKey = () => 'artg-mirror' + ownKey;
    mat.needsUpdate = true;
  }

  addMesh(m) { this.meshes.push(m); }

  setEnabled(on) {
    this.on = !!on;
    this.u.mirrorOn.value = 0;                 // включится с первым готовым кадром отражения
  }

  /* Размер текстуры — половина кадра */
  setSize(w, h) {
    const rw = Math.max(2, Math.round(w / 2)), rh = Math.max(2, Math.round(h / 2));
    if (this.rt.width !== rw || this.rt.height !== rh) this.rt.setSize(rw, rh);
  }

  /* Кадр отражения — перед основной отрисовкой. Математика — как у
     Reflector из примеров three.js: отражённая камера и косая плоскость
     отсечения (всё, что ниже пола, в отражение не попадает). */
  update(camera) {
    if (!this.on) { this.u.mirrorOn.value = 0; return; }
    const v = this._v, cam = this.cam, R = this.renderer;
    camera.updateMatrixWorld();                // иначе отражение отстаёт на кадр от движения
    v.camPos.setFromMatrixPosition(camera.matrixWorld);
    if (v.camPos.y <= 0.01) { this.u.mirrorOn.value = 0; return; }
    const N = _up;
    // отражённая позиция камеры и точка, куда она смотрит
    v.view.copy(v.camPos).negate().reflect(N).negate();
    v.rot.extractRotation(camera.matrixWorld);
    v.look.set(0, 0, -1).applyMatrix4(v.rot).add(v.camPos);
    v.target.copy(v.look).negate().reflect(N).negate();
    cam.position.copy(v.view);
    cam.up.set(0, 1, 0).applyMatrix4(v.rot).reflect(N);
    cam.lookAt(v.target);
    cam.near = camera.near; cam.far = camera.far;
    cam.updateMatrixWorld();
    cam.projectionMatrix.copy(camera.projectionMatrix);
    const tm = this.u.mirrorMatrix.value;
    tm.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
    tm.multiply(cam.projectionMatrix).multiply(cam.matrixWorldInverse);
    // косое отсечение по плоскости пола
    v.plane.setFromNormalAndCoplanarPoint(N, _zero).applyMatrix4(cam.matrixWorldInverse);
    const c = v.clip.set(v.plane.normal.x, v.plane.normal.y, v.plane.normal.z, v.plane.constant);
    const p = cam.projectionMatrix.elements, q = v.q;
    q.x = (Math.sign(c.x) + p[8]) / p[0];
    q.y = (Math.sign(c.y) + p[9]) / p[5];
    q.z = -1;
    q.w = (1 + p[10]) / p[14];
    c.multiplyScalar(2 / c.dot(q));
    p[2] = c.x; p[6] = c.y; p[10] = c.z + 1 - 0.003; p[14] = c.w;

    const vis = this.meshes.map((m) => m.visible);
    this.meshes.forEach((m) => { m.visible = false; });
    const prevRT = R.getRenderTarget(), prevShadow = R.shadowMap.autoUpdate;
    R.shadowMap.autoUpdate = false;            // тени уже посчитаны для основного кадра
    R.setRenderTarget(this.rt);
    R.state.buffers.depth.setMask(true);
    R.clear();
    this.u.mirrorOn.value = 0;
    R.render(this.scene, cam);
    R.setRenderTarget(prevRT);
    R.shadowMap.autoUpdate = prevShadow;
    this.meshes.forEach((m, i) => { m.visible = vis[i]; });
    this.u.mirrorOn.value = 1;
  }

  /* Снимки куба отражений и прочие вспомогательные отрисовки — без зеркала:
     его текстура относится к основной камере */
  suspend(fn) {
    const was = this.u.mirrorOn.value;
    this.u.mirrorOn.value = 0;
    try { return fn(); } finally { this.u.mirrorOn.value = was; }
  }

  dispose() { this.rt.dispose(); }
}

const _up = new THREE.Vector3(0, 1, 0);
const _zero = new THREE.Vector3();
