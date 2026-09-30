/* Общий файл анимаций для всех аватаров: из GLB, которые FBX2glTF сделал из
   анимаций Rocketbox, берём только ключи костей и складываем в один файл.
   Вызывает build-avatars.py.

     node anims-pack.mjs out.glb f_walk=a.glb f_idle=b.glb m_walk=c.glb …

   Скелет (Bip01) у всех моделей одного пола одинаковый, поэтому клипы
   цепляются к любой из них по именам костей. Из исходников берём только
   дорожки поворота и сдвига (масштаб костей не меняется); служебные узлы Bip01_Footsteps и MotionExtractionHelper в
   моделях отсутствуют — их дорожки тоже. */
import { NodeIO, Document } from '@gltf-transform/core';
import { ALL_EXTENSIONS, EXTMeshoptCompression } from '@gltf-transform/extensions';
import { resample, quantize, meshopt } from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptDecoder } from 'meshoptimizer';

const [out, ...pairs] = process.argv.slice(2);
await MeshoptEncoder.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({
  'meshopt.encoder': MeshoptEncoder, 'meshopt.decoder': MeshoptDecoder,
});
const SKIP = /^(Bip01_Footsteps|MotionExtractionHelper)$/;

// Узлы — плоский список по именам, общий для всех клипов: при слиянии целых
// файлов кости повторились бы, а GLTFLoader переименовал бы повторы (_1).
const doc = new Document();
const buf = doc.createBuffer();
const scene = doc.createScene();
const nodes = new Map();
const node = (n) => {
  if (!nodes.has(n)) { const x = doc.createNode(n); scene.addChild(x); nodes.set(n, x); }
  return nodes.get(n);
};
const copy = (acc) => doc.createAccessor().setType(acc.getType()).setArray(acc.getArray().slice()).setBuffer(buf);
for (const pair of pairs) {
  const [name, file] = pair.split('=');
  const src = (await io.read(file)).getRoot().listAnimations()[0];
  if (!src) throw new Error(file + ': нет анимации');
  const anim = doc.createAnimation(name);
  for (const ch of src.listChannels()) {
    const n = ch.getTargetNode(), path = ch.getTargetPath();
    if (!n || SKIP.test(n.getName()) || path === 'scale') continue;
    const s = ch.getSampler();
    const smp = doc.createAnimationSampler().setInput(copy(s.getInput())).setOutput(copy(s.getOutput())).setInterpolation(s.getInterpolation());
    anim.addSampler(smp).addChannel(doc.createAnimationChannel().setTargetNode(node(n.getName())).setTargetPath(path).setSampler(smp));
  }
}
doc.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({ method: EXTMeshoptCompression.EncoderMethod.QUANTIZE });
await doc.transform(
  resample({ tolerance: 0.0005 }),
  quantize({ quantizeRotation: 12 }),
  meshopt({ encoder: MeshoptEncoder, level: 'medium' }),
);
for (const a of doc.getRoot().listAnimations()) {
  const t = Math.max(...a.listSamplers().map((s) => { const i = s.getInput(); return i.getMax([0])[0]; }));
  console.log(a.getName(), a.listChannels().length, 'дорожек,', t.toFixed(2), 'с');
}
await io.write(out, doc);
