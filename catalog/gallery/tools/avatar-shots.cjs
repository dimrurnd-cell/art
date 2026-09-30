/* Портреты образов для онлайн-режима по готовым GLB из build-avatars.py:
   f0.webp … m7.webp — по пояс, 160×200, для окна выбора образа;
   f0-face.webp … — лицо, 96×96, для круглых значков в списках.
   Фон прозрачный.

     node tools/avatar-shots.cjs ../static/artcatalog/avatars [sheet.png]

   Запускать из папки gallery (нужны three, esbuild, playwright-core из
   её node_modules и установленный Chromium). Второй аргумент — вдобавок
   контактный лист всех образов в полный рост на шаге, для проверки глазами. */
const path = require('path');
const fs = require('fs');
const esbuild = require('esbuild');
const { chromium } = require('playwright-core');

const dir = path.resolve(process.argv[2] || '../static/artcatalog/avatars');
const sheet = process.argv[3];
const W = 160, H = 200, K = 2;

const entry = `
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
const L = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
const r = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
r.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(r.domElement);
const light = (sc) => {
  sc.add(new THREE.HemisphereLight(0xffffff, 0x8a8070, 2.0));
  const d = new THREE.DirectionalLight(0xfff4e8, 1.8); d.position.set(1.2, 2.2, 2.5); sc.add(d);
};
let anims;
window.shot = async (name, full, t, face) => {
  anims = anims || await L.loadAsync('http://av.local/anims.glb');
  const g = await L.loadAsync('http://av.local/' + name + '.glb');
  const sc = new THREE.Scene(); light(sc); sc.add(g.scene);
  const clip = anims.animations.find((a) => a.name === name[0] + (full ? '_walk' : '_idle'));
  const mix = new THREE.AnimationMixer(g.scene); mix.clipAction(clip).play(); mix.setTime(t);
  g.scene.updateMatrixWorld(true);
  // верх макушки (с причёской) — по вершинам в позе клипа
  let top = 0;
  const v = new THREE.Vector3();
  g.scene.traverse((o) => {
    if (!o.isSkinnedMesh) return;
    const n = o.geometry.attributes.position.count;
    for (let i = 0; i < n; i++) top = Math.max(top, o.getVertexPosition(i, v).applyMatrix4(o.matrixWorld).y);
  });
  const w = full ? 220 : face ? 192 : ${W * K}, h = full ? 440 : face ? 192 : ${H * K};
  r.setSize(w, h, false); r.domElement.style.width = w + 'px';
  const cam = new THREE.PerspectiveCamera(full ? 28 : 22, w / h, 0.1, 50);
  if (full) { cam.position.set(0, 1.0, 4.3); cam.lookAt(0, 0.88, 0); }
  else if (face) { cam.position.set(0, top - 0.17, 1.25); cam.lookAt(0, top - 0.2, 0); }
  else { cam.position.set(0, top - 0.17, 2.55); cam.lookAt(0, top - 0.4, 0); }
  r.setClearColor(0x000000, full ? 0.06 : 0); r.render(sc, cam);
  return r.domElement.toDataURL(full ? 'image/png' : 'image/webp', 0.86);
};
`;

(async () => {
  const js = (await esbuild.build({
    stdin: { contents: entry, resolveDir: path.join(__dirname, '..') },
    bundle: true, format: 'iife', write: false,
  })).outputFiles[0].text;
  const b = await chromium.launch({
    executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium',
    args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
  });
  const p = await b.newPage();
  p.on('pageerror', (e) => { console.error(e.message); process.exit(1); });
  await p.route('http://av.local/**', (rt) => {
    const f = path.join(dir, path.basename(new URL(rt.request().url()).pathname));
    rt.fulfill({ body: fs.readFileSync(f), contentType: 'model/gltf-binary', headers: { 'Access-Control-Allow-Origin': '*' } });
  });
  await p.setContent('<body style="margin:0"></body>');
  await p.addScriptTag({ content: js });
  const names = [];
  for (const s of 'fm') for (let i = 0; i < 8; i++) names.push(s + i);
  const tiles = [];
  // уменьшение вдвое — через canvas браузера, без лишних зависимостей
  const shrink = (u, w, h) => p.evaluate(([u, w, h]) => new Promise((ok) => {
    const im = new Image(); im.onload = () => {
      const c = document.createElement('canvas'); c.width = w; c.height = h;
      const x = c.getContext('2d'); x.imageSmoothingQuality = 'high'; x.drawImage(im, 0, 0, w, h);
      ok(c.toDataURL('image/webp', 0.86));
    }; im.src = u;
  }), [u, w, h]);
  const save = (f, u) => fs.writeFileSync(path.join(dir, f), Buffer.from(u.split(',')[1], 'base64'));
  for (const n of names) {
    save(n + '.webp', await shrink(await p.evaluate(([n]) => window.shot(n, false, 1.0), [n]), W, H));
    save(n + '-face.webp', await shrink(await p.evaluate(([n]) => window.shot(n, false, 1.0, true), [n]), 96, 96));
    if (sheet) tiles.push(await p.evaluate(([n, t]) => window.shot(n, true, t), [n, 0.15 + (names.indexOf(n) % 4) * 0.25]));
    console.log(n, fs.statSync(path.join(dir, n + '.webp')).size, '+', fs.statSync(path.join(dir, n + '-face.webp')).size, 'байт');
  }
  if (sheet) {
    await p.setContent('<body style="margin:0;background:#eeebe4;display:grid;grid-template-columns:repeat(8,220px)">' +
      tiles.map((u, i) => `<div style="position:relative"><img src="${u}"><b style="position:absolute;left:6px;top:4px;font:14px sans-serif">${names[i]}</b></div>`).join('') + '</body>');
    await p.setViewportSize({ width: 1760, height: 880 });
    await p.screenshot({ path: sheet });
  }
  await b.close();
})();
