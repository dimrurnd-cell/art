/* Сборка одного аватара для онлайн-режима: GLB из FBX2glTF + текстуры →
   лёгкий GLB для браузера. Вызывает build-avatars.py, руками не нужен.

     node avatar-pack.mjs raw.glb body.webp head.webp hair.webp|- out.glb

   Материалы Rocketbox: *_body, *_head, *_opacity (волосы, ресницы — с
   прозрачностью; у части мужских образов их нет — тогда вместо hair.webp «-»). Карты нормалей и бликов выбрасываем (на расстоянии зала
   не видны, а весят вдвое больше цвета), волосы — альфа-маска. Геометрия —
   сварка, квантование, meshopt. */
import { readFileSync } from 'node:fs';
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS, EXTMeshoptCompression } from '@gltf-transform/extensions';
import { dedup, prune, weld, quantize, reorder, meshopt } from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptDecoder } from 'meshoptimizer';

const [raw, bodyP, headP, hairP, out] = process.argv.slice(2);
await MeshoptEncoder.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({
  'meshopt.encoder': MeshoptEncoder, 'meshopt.decoder': MeshoptDecoder,
});
const doc = await io.read(raw);
const root = doc.getRoot();

const tex = (p, name) => doc.createTexture(name).setImage(readFileSync(p)).setMimeType('image/webp');
const body = tex(bodyP, 'body'), head = tex(headP, 'head'), hair = hairP === '-' ? null : tex(hairP, 'hair');

for (const m of root.listMaterials()) {
  const n = m.getName().toLowerCase();
  m.setNormalTexture(null).setMetallicRoughnessTexture(null).setEmissiveTexture(null).setOcclusionTexture(null);
  m.setMetallicFactor(0).setRoughnessFactor(0.78).setBaseColorFactor([1, 1, 1, 1]);
  if (n.includes('opacity')) {
    if (!hair) throw new Error('в модели есть материал ' + m.getName() + ', а текстуры волос нет');
    m.setBaseColorTexture(hair).setAlphaMode('MASK').setAlphaCutoff(0.42).setDoubleSided(true);
  } else if (n.includes('head')) {
    m.setBaseColorTexture(head).setAlphaMode('OPAQUE');
  } else {
    m.setBaseColorTexture(body).setAlphaMode('OPAQUE');
  }
}
// цвета вершин FBX2glTF пишет белыми — лишние 16 байт на вершину
for (const mesh of root.listMeshes()) for (const p of mesh.listPrimitives()) {
  const c = p.getAttribute('COLOR_0');
  if (c) { p.setAttribute('COLOR_0', null); c.dispose(); }
}
for (const a of root.listAnimations()) a.dispose();

doc.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({ method: EXTMeshoptCompression.EncoderMethod.QUANTIZE });
await doc.transform(
  prune(), dedup(), weld(),
  reorder({ encoder: MeshoptEncoder }),
  quantize({ quantizePosition: 14, quantizeNormal: 10, quantizeTexcoord: 12, quantizeWeight: 8 }),
  meshopt({ encoder: MeshoptEncoder, level: 'medium' }),
  prune(),
);
await io.write(out, doc);
