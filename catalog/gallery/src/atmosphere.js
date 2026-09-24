/* Воздух зала: лучи спотов и пыль в них.

   Лучи — едва заметные конусы от светильника к картине с мягкими краями
   (прозрачность падает к кромке конуса и к низу): так выглядит свет в
   реальном помещении, где в воздухе всегда немного пыли. Сила луча
   следует за своим спотом — разгорается и гаснет вместе с ним.

   Пыль — облако пылинок вокруг зрителя (облако «переезжает» вместе с ним,
   пылинки заворачиваются на другую сторону). Пылинки медленно дрейфуют и
   почти не видны, пока не окажутся в луче: шейдер проверяет, попадает ли
   пылинка в конус какого-нибудь спота, и тогда она вспыхивает. */
import * as THREE from 'three';

const MAX = 16;              // лучей и спотов в шейдере пыли — по числу спотов на компьютере

const BEAM_VERT = `
varying float vAlong; varying float vEdge;
void main(){
  vAlong = uv.y;                                           // 1 — у светильника, 0 — у картины
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vec3 n = normalize(mat3(modelMatrix) * normal);
  vec3 v = normalize(cameraPosition - wp.xyz);
  vEdge = abs(dot(n, v));                                  // 1 — середина конуса к зрителю, 0 — кромка
  gl_Position = projectionMatrix * viewMatrix * wp;
}`;
const BEAM_FRAG = `
uniform float strength; varying float vAlong; varying float vEdge;
void main(){
  float a = strength * pow(vEdge, 2.2) * smoothstep(0.0, 0.35, vAlong) * (0.35 + 0.65 * vAlong);
  gl_FragColor = vec4(vec3(1.0, 0.95, 0.86) * a, 1.0);
}`;

const DUST_VERT = `
uniform vec3 center; uniform float box; uniform float time; uniform float px;
uniform vec3 spotPos[${MAX}]; uniform vec3 spotDir[${MAX}]; uniform float spotOn[${MAX}];
attribute float seed;
varying float vLit;
void main(){
  // дрейф: медленный подъём и покачивание, у каждой пылинки своё
  vec3 p = position + vec3(sin(time * 0.11 + seed * 6.3) * 0.25, time * (0.012 + seed * 0.01), cos(time * 0.09 + seed * 4.1) * 0.25);
  p.xz = mod(p.xz - center.xz + box * 0.5, box) - box * 0.5 + center.xz;   // облако следует за зрителем
  p.y = mod(p.y, 4.6) + 0.1;                                                // и заворачивается под потолком
  float lit = 0.0;
  for (int i = 0; i < ${MAX}; i++) {
    vec3 d = p - spotPos[i];
    float l = length(d);
    float c = dot(d / max(l, 1e-3), spotDir[i]);
    lit += spotOn[i] * smoothstep(0.93, 0.975, c) * smoothstep(7.0, 1.0, l);
  }
  vLit = min(lit, 1.0);
  vec4 mv = viewMatrix * vec4(p, 1.0);
  gl_PointSize = px * (0.6 + seed) / -mv.z;
  gl_Position = projectionMatrix * mv;
}`;
const DUST_FRAG = `
varying float vLit;
void main(){
  vec2 c = gl_PointCoord - 0.5;
  float a = smoothstep(0.5, 0.0, length(c));
  gl_FragColor = vec4(vec3(1.0, 0.96, 0.88) * a * (0.04 + vLit * 0.9), 1.0);
}`;

export class Atmosphere {
  constructor(scene, spots, small) {
    this.spots = spots;
    // лучи: по конусу на спот
    this.beams = spots.pool.map(() => {
      const g = new THREE.CylinderGeometry(0.03, 1, 1, 24, 1, true);
      g.translate(0, -0.5, 0);                               // вершина в начале координат, конус вниз по −Y
      const m = new THREE.Mesh(g, new THREE.ShaderMaterial({
        vertexShader: BEAM_VERT, fragmentShader: BEAM_FRAG,
        uniforms: { strength: { value: 0 } },
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
      }));
      m.frustumCulled = false;
      m.renderOrder = 5;
      m.userData.noAO = true;                                  // в проход затенения GTAO не попадает
      scene.add(m);
      return m;
    });

    // пыль
    const N = small ? 500 : 1800;
    const BOX = 12;
    const pos = new Float32Array(N * 3), seed = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * BOX;
      pos[i * 3 + 1] = 0.2 + Math.random() * 4.4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * BOX;
      seed[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('seed', new THREE.BufferAttribute(seed, 1));
    this.dustU = {
      center: { value: new THREE.Vector3() }, box: { value: BOX }, time: { value: 0 }, px: { value: 18 },
      spotPos: { value: Array.from({ length: MAX }, () => new THREE.Vector3()) },
      spotDir: { value: Array.from({ length: MAX }, () => new THREE.Vector3(0, -1, 0)) },
      spotOn: { value: new Array(MAX).fill(0) },
    };
    this.dust = new THREE.Points(g, new THREE.ShaderMaterial({
      vertexShader: DUST_VERT, fragmentShader: DUST_FRAG, uniforms: this.dustU,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    }));
    this.dust.frustumCulled = false;
    this.dust.renderOrder = 6;
    scene.add(this.dust);
    this.on = true;
    this.v = new THREE.Vector3();
  }

  setEnabled(on) {
    this.on = on;
    this.dust.visible = on;
    this.beams.forEach((b) => { b.visible = on; });
  }

  update(cam, pixelRatio, height) {
    if (!this.on) return;
    const u = this.dustU;
    u.time.value = (performance.now() / 1000) % 10000;
    u.center.value.set(cam.position.x, 2.4, cam.position.z);
    u.px.value = 0.012 * height * pixelRatio;            // пылинка около сантиметра — не в фокусе, как в кадре
    this.spots.pool.forEach((s, i) => {
      const beam = this.beams[i];
      const on = s.it ? s.cur * this.spots.dim : 0;
      if (i < MAX) {
        u.spotOn.value[i] = on;
        u.spotPos.value[i].copy(s.l.position);
        u.spotDir.value[i].copy(s.l.target.position).sub(s.l.position).normalize();
      }
      beam.visible = on > 0.01;
      if (!beam.visible) return;
      // конус от светильника к точке прицела; радиус — по углу спота
      const from = s.l.position, to = s.l.target.position;
      const len = from.distanceTo(to) * 1.05;
      const r = Math.tan(s.l.angle * 0.8) * len;
      beam.position.copy(from);
      beam.scale.set(r, len, r);
      this.v.copy(to).sub(from).normalize();
      beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), this.v);
      beam.material.uniforms.strength.value = on * 0.07;
    });
  }
}
