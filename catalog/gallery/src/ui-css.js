/* Стили интерфейса поверх 3D-сцены. Встраиваются в страницу самим
   gallery.js, чтобы не требовать ещё одного <link> на Tilda. */
export const CSS = `
.artg-stage{position:relative;z-index:1;max-width:1160px;margin:0 auto;height:clamp(480px,80vh,760px);
  border-radius:22px;overflow:hidden;background:#ecebe8;touch-action:none;user-select:none;-webkit-user-select:none;
  outline:none;box-shadow:0 18px 50px rgba(0,0,0,.14);font-family:"Helvetica Neue",Arial,sans-serif}
.artg-stage:focus-visible{box-shadow:0 0 0 2px #2a2a2a,0 18px 50px rgba(0,0,0,.14)}
.artg-canvas{display:block;width:100%;height:100%}
.artg-top{position:absolute;left:14px;right:14px;top:12px;display:flex;justify-content:space-between;
  align-items:flex-start;gap:10px;pointer-events:none}
.artg-where{pointer-events:none;color:#2a2a2a;line-height:1.25;min-width:0}
.artg-where b{display:block;font:500 13px/1.3 "Inter","Helvetica Neue",Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase}
.artg-where span{display:block;font-size:14px;color:#6f6f6b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:48vw}
.artg-actions{display:flex;gap:8px;pointer-events:auto;flex-shrink:0}
.artg-btn{appearance:none;border:0;border-radius:999px;background:rgba(255,255,255,.9);color:#2a2a2a;
  font:500 14px/1 "Inter","Helvetica Neue",Arial,sans-serif;padding:10px 15px;cursor:pointer;box-shadow:0 1px 0 rgba(0,0,0,.06),0 4px 14px rgba(0,0,0,.08);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
.artg-btn:hover{background:#fff}
.artg-btn:focus-visible{outline:2px solid #2a2a2a;outline-offset:2px}
.artg-btn--icon{padding:8px 10px;display:flex;align-items:center}
.artg-panel{position:absolute;right:14px;top:60px;width:min(340px,calc(100% - 28px));max-height:calc(100% - 140px);
  display:flex;flex-direction:column;background:rgba(255,255,255,.97);border-radius:14px;
  box-shadow:0 10px 40px rgba(0,0,0,.14);overflow:hidden}
.artg-panel[hidden]{display:none}
.artg-panel__q{margin:12px;padding:10px 12px;border:1px solid #dcdbd7;border-radius:10px;font-size:15px;background:#fafaf9}
.artg-panel__list{overflow:auto;padding:0 6px 10px}
.artg-panel__list button{display:block;width:100%;text-align:left;border:0;background:none;padding:8px 10px;
  border-radius:8px;font-size:14px;color:#2a2a2a;cursor:pointer}
.artg-panel__list button:hover,.artg-panel__list button:focus-visible{background:#f0efec;outline:none}
.artg-panel__list i{display:block;font-style:normal;font-size:12px;color:#8c8c88}
.artg-panel__sec{margin:10px 10px 4px;font:12px/1 "Helvetica Neue",Arial,sans-serif;text-transform:uppercase;letter-spacing:.08em;color:#8c8c88}
.artg-panel__none{padding:10px;color:#8c8c88}
.artg-map{position:absolute;right:14px;top:60px;width:min(360px,calc(100% - 28px));max-height:calc(100% - 140px);
  display:flex;flex-direction:column;background:rgba(255,255,255,.97);border-radius:14px;box-shadow:0 10px 40px rgba(0,0,0,.14);overflow:hidden}
.artg-map[hidden]{display:none}
.artg-map__plan{width:100%;height:auto;aspect-ratio:2/1;display:block;cursor:pointer;border-bottom:1px solid #ecebe8}
.artg-map__list{overflow:auto;padding:4px 6px 10px}
.artg-map__list button{display:block;width:100%;text-align:left;border:0;background:none;padding:7px 10px;border-radius:8px;
  font-size:14px;color:#2a2a2a;cursor:pointer}
.artg-map__list button:hover,.artg-map__list button:focus-visible{background:#f0efec;outline:none}
.artg-map__list button.is-here{background:#2a2a2a;color:#fff}
.artg-map__list button.is-here i{color:#cfcfcb}
.artg-map__list i{display:block;font-style:normal;font-size:12px;color:#8c8c88;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.artg-hint{position:absolute;left:50%;bottom:86px;transform:translate(-50%,10px);max-width:min(560px,86%);
  padding:10px 16px;border-radius:12px;background:rgba(42,42,42,.82);color:#fff;font-size:14px;line-height:1.35;
  text-align:center;opacity:0;transition:opacity .35s,transform .35s;pointer-events:none}
.artg-hint.is-on{opacity:1;transform:translate(-50%,0)}
.artg-move{position:absolute;left:50%;bottom:16px;transform:translateX(-50%);display:flex;gap:10px}
.artg-step{appearance:none;border:0;width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.9);
  color:#2a2a2a;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.1);
  touch-action:none}
.artg-step:active{background:#2a2a2a;color:#fff}
.artg-load{position:absolute;left:0;right:0;top:0;height:3px;background:rgba(0,0,0,.06);transition:opacity .5s}
.artg-load i{display:block;height:100%;width:0;background:#2a2a2a;transition:width .3s}
.artg-load.is-done{opacity:0}
.artg-fade{position:absolute;inset:0;background:#ecebe8;opacity:0;pointer-events:none;transition:opacity .3s}
.artg-fade.is-on{opacity:1}
.artg-stage.is-fs{max-width:none;height:100%;border-radius:0}
.artg-fs-host{position:fixed;inset:0;z-index:2147483000;background:#ecebe8;padding:0!important}
.artg-fs-host .artg-stage{height:100%;width:100%;max-width:none;border-radius:0}
@media (max-width:600px){
  .artg-stage{height:clamp(440px,74vh,640px);border-radius:16px}
  .artg-btn{padding:9px 10px;font-size:13px}
  .artg-actions{gap:5px}
}
`;
