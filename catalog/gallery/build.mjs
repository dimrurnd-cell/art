// Сборка WebGL-галереи в один файл без внешних зависимостей:
// three.js входит в бандл, поэтому ни CDN, ни import-map странице не нужны.
//   cd catalog/gallery && npm install && npm run build
import { build } from 'esbuild';

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
console.log('gallery.js собран');
