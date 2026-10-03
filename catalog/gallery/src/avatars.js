/* Реалистичные аватары посетителей (онлайн-режим, этап 3): модели Microsoft
   Rocketbox (MIT) со скелетом и анимацией «стоит» / «идёт».

   Модели лежат рядом с gallery.js: avatars/f0.glb … m7.glb (номер — образ,
   outfit) и общий avatars/anims.glb; собирает их tools/build-avatars.py.
   Модель грузится, только когда посетитель в этом образе оказался рядом;
   до тех пор он — простая фигура из peers.js.

   Каждый аватар — копия модели со своим скелетом (геометрия и текстуры
   общие) и свой AnimationMixer: «стоит» и «идёт» играют вместе, вес
   переходит по скорости, а темп шага подгоняется под скорость — ноги не
   скользят. */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js';

// скорость, с которой идёт клип «идёт» при timeScale = 1 (по опорной ступне), м/с
const CLIP_SPEED = { f: 1.45, m: 1.2 };

export class Avatars {
  constructor(url) {
    this.url = url;
    this.loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
    this.models = new Map();        // 'f3' → {state, gltf, h}
    this.anims = null;              // {state, clips}
  }

  /* Модель образа, если уже загружена; иначе начинает загрузку и даёт null */
  get(sex, outfit) {
    if (!this.clips()) return null;
    const key = sex + outfit;
    let m = this.models.get(key);
    if (!m) {
      m = { state: 'load' };
      this.models.set(key, m);
      this.loader.load(this.url('avatars/' + key + '.glb'), (g) => {
        m.gltf = g;
        const box = new THREE.Box3().setFromObject(g.scene);
        m.h = box.max.y;
        g.scene.traverse((o) => {
          if (!o.isMesh) return;
          o.castShadow = o.receiveShadow = false;
          // волосы с альфа-маской: в проходе нормалей GTAO маска не работает — дала бы тёмные пластины
          if (o.material.alphaTest > 0) o.userData.noAO = true;
        });
        m.state = 'ok';
      }, undefined, () => { m.state = 'fail'; });
    }
    return m.state === 'ok' ? m : null;
  }

  clips() {
    if (!this.anims) {
      const a = this.anims = { state: 'load' };
      this.loader.load(this.url('avatars/anims.glb'), (g) => {
        a.clips = {};
        for (const c of g.animations) a.clips[c.name] = c;
        a.state = 'ok';
      }, undefined, () => { a.state = 'fail'; });
    }
    return this.anims.state === 'ok' ? this.anims.clips : null;
  }

  /* Новый аватар: {root, meshes, h, update(dt, speed)} или null, если модель ещё грузится */
  make(sex, outfit) {
    const m = this.get(sex, outfit);
    if (!m) return null;
    const root = cloneSkinned(m.gltf.scene);
    const meshes = [];
    root.traverse((o) => { if (o.isMesh) meshes.push(o); });
    const clips = this.anims.clips;
    const mixer = new THREE.AnimationMixer(root);
    const idle = mixer.clipAction(clips[sex + '_idle']);
    const walk = mixer.clipAction(clips[sex + '_walk']);
    idle.play(); walk.play();
    // разные посетители не должны дышать и шагать в унисон
    idle.time = Math.random() * idle.getClip().duration;
    walk.time = Math.random() * walk.getClip().duration;
    let w = 0;
    return {
      root, meshes, h: m.h, mixer,
      update(dt, speed) {
        // вес шага: плавно, чтобы остановка не была рывком
        const want = Math.min(1, Math.max(0, (speed - 0.12) / 0.5));
        w += (want - w) * Math.min(1, dt * 6);
        walk.setEffectiveWeight(w);
        idle.setEffectiveWeight(1 - w);
        walk.setEffectiveTimeScale(Math.max(0.55, Math.min(1.6, speed / CLIP_SPEED[sex])));
        mixer.update(dt);
      },
      dispose() { mixer.stopAllAction(); mixer.uncacheRoot(root); },
    };
  }

  dispose() {
    for (const m of this.models.values()) {
      if (!m.gltf) continue;
      m.gltf.scene.traverse((o) => {
        if (!o.isMesh) return;
        o.geometry.dispose();
        if (o.material.map) o.material.map.dispose();
        o.material.dispose();
      });
    }
    this.models.clear();
  }
}
