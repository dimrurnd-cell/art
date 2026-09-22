/* Стили интерфейса поверх 3D-сцены. Встраиваются в страницу самим
   gallery.js, чтобы не требовать ещё одного <link> на Tilda. */
export const CSS = `
.artg-stage{position:relative;z-index:1;max-width:1160px;margin:0 auto;height:clamp(480px,80vh,760px);
  border-radius:22px;overflow:hidden;background:#221c15;touch-action:none;user-select:none;-webkit-user-select:none;
  outline:none;box-shadow:0 18px 50px rgba(40,30,15,.28);font-family:"Helvetica Neue",Arial,sans-serif}
.artg-stage:focus-visible{box-shadow:0 0 0 3px #e4736f,0 18px 50px rgba(40,30,15,.28)}
.artg-canvas{display:block;width:100%;height:100%}
.artg-top{position:absolute;left:14px;right:14px;top:12px;display:flex;justify-content:space-between;
  align-items:flex-start;gap:10px;pointer-events:none}
.artg-where{pointer-events:none;color:#fbf5e4;text-shadow:0 1px 6px rgba(0,0,0,.6);line-height:1.2;min-width:0}
.artg-where b{display:block;font:22px "Parangon",Georgia,serif;font-weight:normal}
.artg-where span{display:block;font-size:13px;opacity:.85;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:48vw}
.artg-actions{display:flex;gap:8px;pointer-events:auto;flex-shrink:0}
.artg-btn{appearance:none;border:0;border-radius:999px;background:rgba(251,245,228,.92);color:#211d17;
  font:600 14px/1 "Helvetica Neue",Arial,sans-serif;padding:10px 14px;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.25)}
.artg-btn:hover{background:#fff}
.artg-btn:focus-visible{outline:3px solid #e4736f;outline-offset:2px}
.artg-btn--icon{padding:8px 10px;display:flex;align-items:center}
.artg-panel{position:absolute;right:14px;top:60px;width:min(340px,calc(100% - 28px));max-height:calc(100% - 140px);
  display:flex;flex-direction:column;background:rgba(251,245,228,.97);border-radius:16px;
  box-shadow:0 10px 40px rgba(0,0,0,.35);overflow:hidden}
.artg-panel[hidden]{display:none}
.artg-panel__q{margin:12px;padding:10px 12px;border:1px solid #d6c69f;border-radius:10px;font-size:15px;background:#fff}
.artg-panel__list{overflow:auto;padding:0 6px 10px}
.artg-panel__list button{display:block;width:100%;text-align:left;border:0;background:none;padding:8px 10px;
  border-radius:8px;font-size:14px;color:#211d17;cursor:pointer}
.artg-panel__list button:hover,.artg-panel__list button:focus-visible{background:#efe3c3;outline:none}
.artg-panel__list i{display:block;font-style:normal;font-size:12px;color:#6e6350}
.artg-panel__sec{margin:10px 10px 4px;font:12px/1 "Helvetica Neue",Arial,sans-serif;text-transform:uppercase;letter-spacing:.08em;color:#b3544f}
.artg-panel__none{padding:10px;color:#6e6350}
.artg-hint{position:absolute;left:50%;bottom:86px;transform:translate(-50%,10px);max-width:min(560px,86%);
  padding:10px 16px;border-radius:12px;background:rgba(33,29,23,.78);color:#fbf5e4;font-size:14px;line-height:1.35;
  text-align:center;opacity:0;transition:opacity .35s,transform .35s;pointer-events:none}
.artg-hint.is-on{opacity:1;transform:translate(-50%,0)}
.artg-move{position:absolute;left:50%;bottom:16px;transform:translateX(-50%);display:flex;gap:10px}
.artg-step{appearance:none;border:0;width:52px;height:52px;border-radius:50%;background:rgba(251,245,228,.9);
  color:#211d17;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 2px 12px rgba(0,0,0,.3);
  touch-action:none}
.artg-step:active{background:#e4736f;color:#fff}
.artg-fade{position:absolute;inset:0;background:#221c15;opacity:0;pointer-events:none;transition:opacity .3s}
.artg-fade.is-on{opacity:1}
.artg-stage.is-fs{max-width:none;height:100%;border-radius:0}
.artg-fs-host{position:fixed;inset:0;z-index:2147483000;background:#221c15;padding:0!important}
.artg-fs-host .artg-stage{height:100%;width:100%;max-width:none;border-radius:0}
.artg-poster{position:relative;max-width:1160px;margin:0 auto;height:clamp(480px,80vh,760px);border-radius:22px;overflow:hidden;
  background:radial-gradient(ellipse at 50% 38%,#4a3c2b 0%,#221c15 70%);display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:18px;color:#fbf5e4;text-align:center;padding:24px;box-sizing:border-box}
.artg-poster h3{margin:0;font:clamp(28px,5vw,46px)/1.1 "Parangon",Georgia,serif;font-weight:normal}
.artg-poster p{margin:0;max-width:520px;font-size:15px;line-height:1.45;opacity:.85}
.artg-poster .artg-btn{font-size:17px;padding:15px 26px;background:#e4736f;color:#fff}
.artg-poster .artg-btn:hover{background:#d65f5b}
.artg-poster small{opacity:.6;font-size:12px}
@media (max-width:600px){
  .artg-stage,.artg-poster{height:clamp(440px,74vh,640px);border-radius:16px}
  .artg-btn{padding:9px 11px;font-size:13px}
  .artg-where b{font-size:18px}
}
`;
