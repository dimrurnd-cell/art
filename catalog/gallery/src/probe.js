/* Живые отражения: зонд окружения на помещение.

   Когда зритель входит в новое помещение, кубическая камера из его
   середины снимает само помещение (с картинами, светом, соседними залами
   в проёмах), снимок фильтруется по шероховатости (PMREM) и становится
   картой отражений для пола, рам, металла и глянцевой мебели.

   Обычная карта отражений считает, что окружение бесконечно далеко, и в
   комнате отражения «плывут» при ходьбе. Здесь — коррекция по коробке
   помещения (box projection): отражённый луч доводится до стены комнаты,
   и отражение картины на полу стоит точно под картиной. */
import * as THREE from 'three';

const PATCH_VERT = `
vec4 bpWorld = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
  bpWorld = instanceMatrix * bpWorld;
#endif
vBpWorld = ( modelMatrix * bpWorld ).xyz;
`;

const PATCH_FRAG = `
reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
if ( all( greaterThan( vBpWorld, bpMin - 0.3 ) ) && all( lessThan( vBpWorld, bpMax + 0.3 ) ) ) {
  vec3 bt1 = ( bpMax - vBpWorld ) / reflectVec;
  vec3 bt2 = ( bpMin - vBpWorld ) / reflectVec;
  vec3 btf = max( bt1, bt2 );
  float bt = min( min( btf.x, btf.y ), btf.z );
  reflectVec = normalize( vBpWorld + reflectVec * bt - bpPos );
}
`;

export class Probe {
  constructor(renderer, scene, small) {
    this.renderer = renderer;
    this.scene = scene;
    const size = small ? 128 : 256;
    this.rt = new THREE.WebGLCubeRenderTarget(size, { type: THREE.HalfFloatType });
    this.cam = new THREE.CubeCamera(0.05, 80, this.rt);
    this.pm = new THREE.PMREMGenerator(renderer);
    this.env = null;
    this.mats = [];
    this.u = {
      bpMin: { value: new THREE.Vector3(-1e4, -1e4, -1e4) },
      bpMax: { value: new THREE.Vector3(1e4, 1e4, 1e4) },
      bpPos: { value: new THREE.Vector3() },
    };
  }

  /* Материал получает отражения зонда с коррекцией по коробке помещения */
  patch(mat) {
    const u = this.u;
    mat.onBeforeCompile = (sh) => {
      Object.assign(sh.uniforms, u);
      sh.vertexShader = 'varying vec3 vBpWorld;\n' + sh.vertexShader
        .replace('#include <project_vertex>', '#include <project_vertex>\n' + PATCH_VERT);
      sh.fragmentShader = 'varying vec3 vBpWorld;\nuniform vec3 bpMin;\nuniform vec3 bpMax;\nuniform vec3 bpPos;\n' +
        sh.fragmentShader.replace('#include <envmap_physical_pars_fragment>',
          THREE.ShaderChunk.envmap_physical_pars_fragment
            .replace('reflectVec = inverseTransformDirection( reflectVec, viewMatrix );', PATCH_FRAG));
    };
    mat.customProgramCacheKey = () => 'artg-bp';
    mat.needsUpdate = true;
    this.mats.push(mat);
  }

  /* Снять помещение: box — { min, max } в мировых координатах, pos — точка съёмки */
  capture(box, pos) {
    this.cam.position.copy(pos);
    const fog = this.scene.fog;
    this.scene.fog = null;                       // в снимке дымка не нужна — её добавит кадр
    this.cam.update(this.renderer, this.scene);
    this.scene.fog = fog;
    const env = this.pm.fromCubemap(this.rt.texture);
    if (this.env) this.env.dispose();
    this.env = env;
    this.u.bpMin.value.copy(box.min);
    this.u.bpMax.value.copy(box.max);
    this.u.bpPos.value.copy(pos);
    for (const m of this.mats) {
      const first = !m.envMap;
      m.envMap = env.texture;
      if (first) m.needsUpdate = true;          // дальше размер карты тот же — пересборка шейдера не нужна
    }
  }

  dispose() {
    this.rt.dispose();
    if (this.env) this.env.dispose();
    this.pm.dispose();
  }
}
