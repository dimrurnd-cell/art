/* Таблицы площадного света (LTC) — отдельным файлом gallery-assets/ltc.bin,
   а не внутри gallery.js. В three.js они лежат текстом (RectAreaLightTexturesLib,
   ≈250 КБ кода — треть сжатого gallery.js), а нужны только светильникам холла
   в SD и HD; «Эконом» обходится без них. Файл — те же таблицы 64×64 в
   половинной точности (как у three.js для видеочипов без float-фильтрации),
   ≈64 КБ; собирает его build.mjs. */
import * as THREE from 'three';

let job = null;

export function loadLTC(url) {
  if (job) return job;
  job = fetch(url, { mode: 'cors', credentials: 'omit' })
    .then((r) => { if (!r.ok) throw new Error('ltc.bin: ' + r.status); return r.arrayBuffer(); })
    .then((buf) => {
      const n = 64 * 64 * 4;
      const all = new Uint16Array(buf);
      if (all.length !== n * 2) throw new Error('ltc.bin: неверный размер');
      const tex = (data) => {
        const t = new THREE.DataTexture(data, 64, 64, THREE.RGBAFormat, THREE.HalfFloatType, THREE.UVMapping,
          THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping, THREE.LinearFilter, THREE.NearestFilter, 1);
        t.needsUpdate = true;
        return t;
      };
      const t1 = tex(all.slice(0, n)), t2 = tex(all.slice(n));
      // и для видеочипов с float-фильтрацией: в WebGL2 половинная точность
      // фильтруется везде, разницы на глаз нет
      THREE.UniformsLib.LTC_FLOAT_1 = THREE.UniformsLib.LTC_HALF_1 = t1;
      THREE.UniformsLib.LTC_FLOAT_2 = THREE.UniformsLib.LTC_HALF_2 = t2;
      return true;
    });
  job.catch(() => { job = null; });     // сбой сети — можно попробовать снова
  return job;
}
