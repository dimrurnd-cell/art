/* Метки на полу: куда можно шагнуть и куда идём.

   Под курсором (на компьютере) — тёмное кольцо с точкой: здесь пол, сюда
   можно перейти щелчком. Там, где стоять нельзя (у стены, в мебели), кольца
   нет. После щелчка или касания пола в точке назначения остаётся кольцо
   цвета акцента: оно мягко пульсирует, пока идём, и гаснет по приходу.

   Пол светлый — поэтому кольцо тёмное, с белой каймой: видно и на полу
   под спотом, и в тени. */
import * as THREE from 'three';

function ringTexture(color) {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  const ring = (r, w, style) => { g.beginPath(); g.arc(128, 128, r, 0, Math.PI * 2); g.lineWidth = w; g.strokeStyle = style; g.stroke(); };
  ring(104, 26, 'rgba(255,255,255,0.75)');           // светлая кайма
  ring(104, 15, color);                               // само кольцо
  g.beginPath(); g.arc(128, 128, 20, 0, Math.PI * 2);
  g.fillStyle = 'rgba(255,255,255,0.8)'; g.fill();
  g.beginPath(); g.arc(128, 128, 13, 0, Math.PI * 2);
  g.fillStyle = color; g.fill();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function mark(color, size) {
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(size, size).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({
      map: ringTexture(color), transparent: true, depthWrite: false, toneMapped: false,
      polygonOffset: true, polygonOffsetFactor: -4,
    }),
  );
  m.position.y = 0.012;
  m.renderOrder = 5;
  m.visible = false;
  m.userData.noAO = true;
  return m;
}

export class FloorMarks {
  constructor(scene) {
    this.cursor = mark('rgba(42,42,42,0.8)', 0.7);
    this.dest = mark('#d4574f', 0.75);
    scene.add(this.cursor, this.dest);
    // подсказки на сенсорном экране: курсора нет — несколько бледных колец
    // на полу вдоль прохода впереди показывают, что пол можно нажать
    const hm = this.cursor.material.clone();
    hm.opacity = 0.62;
    this.hints = [];
    for (let i = 0; i < 6; i++) {
      const m = new THREE.Mesh(this.cursor.geometry, hm);
      m.position.y = 0.012; m.renderOrder = 5; m.visible = false; m.userData.noAO = true;
      scene.add(m);
      this.hints.push(m);
    }
    this.fade = 0;
    this.t = 0;
  }

  /* Курсор над полом: p — точка, где можно стоять, или null */
  hover(p) {
    if (!p) { this.cursor.visible = false; return; }
    this.cursor.position.x = p.x;
    this.cursor.position.z = p.z;
    this.cursor.visible = true;
  }

  /* Подсказки: pts — точки пола [x, z], не больше шести */
  showHints(pts) {
    this.hints.forEach((m, i) => {
      const p = pts[i];
      m.visible = !!p;
      if (p) { m.position.x = p[0]; m.position.z = p[1]; }
    });
  }

  /* Идём сюда */
  target(x, z) {
    this.dest.position.x = x;
    this.dest.position.z = z;
    this.dest.visible = true;
    this.dest.material.opacity = 1;
    this.fade = 1;
    this.cursor.visible = false;
  }

  /* walking — зритель ещё в пути */
  update(dt, walking) {
    if (!this.dest.visible) return;
    this.t += dt;
    if (!walking) this.fade -= dt * 2.5;
    if (this.fade <= 0) { this.dest.visible = false; return; }
    const s = 1 + 0.1 * Math.sin(this.t * 6);
    this.dest.scale.set(s, 1, s);
    this.dest.material.opacity = Math.min(1, this.fade);
  }
}
