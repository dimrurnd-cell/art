// Сборка WebGL-галереи в один файл без внешних зависимостей:
// three.js входит в бандл, поэтому ни CDN, ни import-map странице не нужны.
//   cd catalog/gallery && npm install && npm run build
import { build } from 'esbuild';
import { writeFileSync } from 'fs';
import { RectAreaLightTexturesLib } from 'three/examples/jsm/lights/RectAreaLightTexturesLib.js';

// таблицы площадного света — отдельным файлом (см. src/ltc.js)
RectAreaLightTexturesLib.init();
const h1 = RectAreaLightTexturesLib.LTC_HALF_1.image.data, h2 = RectAreaLightTexturesLib.LTC_HALF_2.image.data;
const ltc = new Uint16Array(h1.length + h2.length);
ltc.set(h1, 0); ltc.set(h2, h1.length);
writeFileSync('../static/artcatalog/gallery-assets/ltc.bin', Buffer.from(ltc.buffer));

await build({
  entryPoints: ['src/index.js'],
  bundle: true,
  minify: true,
  format: 'iife',
  target: ['es2019'],
  legalComments: 'none',
  banner: { js: '/* Арт-Ростов — WebGL-галерея. Сборка: catalog/gallery (npm run build). three.js © three.js authors, MIT */' },
  outfile: '../static/artcatalog/gallery.js',
});
console.log('gallery.js и gallery-assets/ltc.bin собраны');
