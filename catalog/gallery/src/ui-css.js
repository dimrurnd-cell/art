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
.artg-where span{font-size:14px;color:#6f6f6b;max-width:min(48vw,520px);line-height:1.3;
  display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden}
.artg-actions{display:flex;gap:8px;pointer-events:auto;flex-shrink:0}
.artg-btn--icon{width:42px;height:42px;padding:0;justify-content:center}
.artg-btn{appearance:none;border:0;border-radius:999px;background:rgba(255,255,255,.9);color:#2a2a2a;
  font:500 14px/1 "Inter","Helvetica Neue",Arial,sans-serif;padding:10px 15px;cursor:pointer;box-shadow:0 1px 0 rgba(0,0,0,.06),0 4px 14px rgba(0,0,0,.08);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
.artg-btn:hover{background:#fff}
.artg-btn:focus-visible{outline:2px solid #2a2a2a;outline-offset:2px}
.artg-btn--icon{padding:8px 10px;display:flex;align-items:center}
.artg-btn{display:inline-flex;align-items:center;gap:7px}
.artg-btn svg{flex-shrink:0}
.artg-where b{white-space:nowrap}
/* имя художника в заголовке — ссылка на его карточку */
.artg-where span.is-link{pointer-events:auto;cursor:pointer;text-decoration:underline;text-decoration-color:rgba(42,42,42,.3);text-underline-offset:3px}
.artg-where span.is-link:hover{color:#2a2a2a;text-decoration-color:#2a2a2a}
/* низкий экран (телефон горизонтально): сцена не выше экрана */
@media (max-height:520px){.artg-stage{height:calc(100vh - 24px);height:calc(100svh - 24px);min-height:260px}
  .artg-stage .artg-map__plan{width:auto;height:96px;align-self:center}}
.artg-stage.is-narrow .artg-hint{font-size:13px;padding:8px 12px;max-width:calc(100% - 28px)}
/* меню: колонка по правому краю под кнопкой — круглая иконка и подпись */
.artg-menu-btn .artg-ico-close{display:none}
.artg-stage.is-menu .artg-menu-btn{background:#2a2a2a;color:#fff}
.artg-stage.is-menu .artg-menu-btn .artg-ico-menu{display:none}
.artg-stage.is-menu .artg-menu-btn .artg-ico-close{display:block}
.artg-menu{position:absolute;right:14px;top:62px;z-index:3;display:flex;flex-direction:column;align-items:flex-end;gap:8px;
  max-height:calc(100% - 76px);overflow-y:auto;overscroll-behavior:contain;touch-action:pan-y;padding:2px 2px 4px;margin:-2px -2px 0;
  scrollbar-width:none;pointer-events:auto}
.artg-menu::-webkit-scrollbar{display:none}
.artg-menu[hidden]{display:none}
.artg-mi{appearance:none;border:0;background:none;padding:0;margin:0;display:flex;align-items:center;gap:10px;cursor:pointer;flex-shrink:0;color:#2a2a2a;font:500 14px/1.2 "Inter","Helvetica Neue",Arial,sans-serif;
  animation:artg-mi-in .22s cubic-bezier(.2,.8,.2,1) both}
.artg-mi__t{background:rgba(255,255,255,.94);padding:8px 12px;border-radius:999px;white-space:nowrap;
  box-shadow:0 1px 0 rgba(0,0,0,.05),0 4px 14px rgba(0,0,0,.08)}
.artg-mi__i{width:42px;height:42px;flex-shrink:0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;
  background:rgba(255,255,255,.94);box-shadow:0 1px 0 rgba(0,0,0,.06),0 4px 14px rgba(0,0,0,.1)}
.artg-mi:hover .artg-mi__i,.artg-mi:hover .artg-mi__t{background:#fff}
.artg-mi:focus-visible{outline:none}
.artg-mi:focus-visible .artg-mi__i{outline:2px solid #2a2a2a;outline-offset:2px}
.artg-mi.is-on .artg-mi__i{background:#2a2a2a;color:#fff}
.artg-mi .artg-snd-on{display:none}
.artg-mi.is-on .artg-snd-on{display:block}
.artg-mi.is-on .artg-snd-off{display:none}
.artg-mi:nth-child(2){animation-delay:.02s}.artg-mi:nth-child(3){animation-delay:.04s}.artg-mi:nth-child(4){animation-delay:.06s}
.artg-mi:nth-child(5){animation-delay:.08s}.artg-mi:nth-child(6){animation-delay:.1s}.artg-mi:nth-child(7){animation-delay:.12s}
.artg-mi:nth-child(8){animation-delay:.14s}.artg-mi:nth-child(9){animation-delay:.16s}
@keyframes artg-mi-in{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.artg-mi{animation:none}}
/* низкая сцена (телефон горизонтально): пункты мельче; не влезли — колонка прокручивается */
@media (max-height:520px){.artg-mi__i{width:36px;height:36px}.artg-mi__t{padding:6px 10px;font-size:13px}.artg-menu{gap:6px}}
/* не во весь экран на телефоне: вертикальное движение пальца листает
   страницу, горизонтальное — поворачивает взгляд; во весь экран палец
   снова целиком у зала */
.artg-stage.is-touch:not(.is-fs){touch-action:pan-y}
.artg-joy,.artg-move,.artg-step{touch-action:none}
/* пока открыта панель — джойстик и кнопки шага не лезут поверх неё */
.artg-stage.has-panel .artg-move,.artg-stage.has-panel .artg-joy{visibility:hidden}
/* подсказка на сенсорном экране — над джойстиком, а не на нём */
.artg-stage.is-touch .artg-hint{bottom:148px}
/* экскурсия ведёт сама — джойстик и шаги не нужны (любое касание её и так
   остановит); карточка экскурсии — внизу */
.artg-stage.is-touring .artg-move,.artg-stage.is-touring .artg-joy{visibility:hidden}
.artg-stage.is-touch.is-touring .artg-tour{bottom:max(16px,env(safe-area-inset-bottom))}
/* узкая сцена: текст экскурсии — строкой сверху, кнопки — под ним */
.artg-stage.is-narrow .artg-tour{flex-wrap:wrap;padding:12px 12px 12px 14px;gap:10px}
.artg-stage.is-narrow .artg-tour__txt{flex:1 1 100%}
.artg-stage.is-narrow .artg-tour__btns{flex:1 1 100%;justify-content:space-between}
.artg-stage.is-narrow .artg-tour__txt b{white-space:normal;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.artg-stage.is-touring [data-a="tour"]{background:#2a2a2a;color:#fff}
.artg-tour{position:absolute;left:50%;bottom:84px;transform:translateX(-50%);width:min(560px,calc(100% - 28px));box-sizing:border-box;
  display:flex;align-items:center;gap:12px;padding:12px 12px 12px 18px;background:rgba(255,255,255,.96);border-radius:14px;
  box-shadow:0 10px 40px rgba(0,0,0,.14)}
.artg-tour[hidden]{display:none}
.artg-tour__txt{flex:1;min-width:0;line-height:1.3}
.artg-tour__txt b{display:block;font-weight:500;font-size:15px;color:#2a2a2a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.artg-tour__txt span{font-size:12px;color:#8c8c88}
.artg-tour__btns{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end}
.artg-tour__btns button{border:0;background:#f0efec;color:#2a2a2a;min-width:38px;height:38px;border-radius:999px;font-size:18px;cursor:pointer;padding:0 12px}
.artg-tour__btns button:hover{background:#e4e3df}
.artg-tour__btns .artg-tour__stop,.artg-tour__btns .artg-tour__wide{font-size:14px}
.artg-tour__btns .artg-tour__stop{background:#2a2a2a;color:#fff}
.artg-joy{display:none;position:absolute;left:18px;bottom:18px;width:112px;height:112px;border-radius:50%;
  background:rgba(255,255,255,.55);box-shadow:inset 0 0 0 1px rgba(0,0,0,.08),0 4px 14px rgba(0,0,0,.08);touch-action:none}
.artg-joy i{position:absolute;left:50%;top:50%;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;background:#fff;
  box-shadow:0 2px 10px rgba(0,0,0,.18);transition:transform .12s}
.artg-joy.is-on i{transition:none;background:#2a2a2a}
.artg-stage.is-touch .artg-joy{display:block}
.artg-stage.is-touch .artg-move{left:auto;right:18px;transform:none}
.artg-panel{position:absolute;right:14px;top:60px;width:min(340px,calc(100% - 28px));max-height:calc(100% - 140px);
  display:flex;flex-direction:column;background:rgba(255,255,255,.97);border-radius:14px;
  box-shadow:0 10px 40px rgba(0,0,0,.14);overflow:hidden}
.artg-panel[hidden]{display:none}
.artg-panel__q{margin:8px 12px 12px;padding:10px 12px;border:1px solid #dcdbd7;border-radius:10px;font-size:16px;background:#fafaf9}
.artg-stage button{touch-action:manipulation}
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
.artg-qpanel{position:absolute;right:14px;top:60px;width:230px;padding:10px;background:rgba(255,255,255,.97);border-radius:14px;
  box-shadow:0 10px 40px rgba(0,0,0,.14);display:flex;flex-direction:column;gap:2px}
.artg-qpanel[hidden]{display:none}
.artg-phead{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:10px 10px 2px 16px;flex-shrink:0}
.artg-qpanel .artg-phead{padding:2px 0 4px 8px}
.artg-phead b{font:500 12px/1.2 "Inter","Helvetica Neue",Arial,sans-serif;text-transform:uppercase;letter-spacing:.08em;color:#8c8c88}
.artg-close{appearance:none;border:0;width:36px;height:36px;flex-shrink:0;border-radius:50%;background:#f0efec;color:#2a2a2a;
  display:flex;align-items:center;justify-content:center;cursor:pointer}
.artg-close:hover{background:#e4e3df}
.artg-close:focus-visible{outline:2px solid #2a2a2a;outline-offset:2px}
.artg-qpanel button{border:0;background:none;text-align:left;padding:8px 10px;border-radius:8px;font-size:14px;color:#2a2a2a;cursor:pointer}
.artg-qpanel button:hover,.artg-qpanel button:focus-visible{background:#f0efec;outline:none}
.artg-qpanel button.is-on{background:#2a2a2a;color:#fff}
.artg-qpanel small{margin:6px 8px 2px;font-size:12px;line-height:1.35;color:#8c8c88}
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
/* во весь экран на телефоне — не под «чёлкой» и не под полоской «домой» */
.artg-stage.is-fs .artg-top{top:max(12px,env(safe-area-inset-top));left:max(14px,env(safe-area-inset-left));right:max(14px,env(safe-area-inset-right))}
.artg-stage.is-fs .artg-move{bottom:max(16px,env(safe-area-inset-bottom))}
.artg-stage.is-fs .artg-joy{bottom:max(18px,env(safe-area-inset-bottom));left:max(18px,env(safe-area-inset-left))}
.artg-stage.is-fs.is-touch .artg-move{right:max(18px,env(safe-area-inset-right))}
@media (max-width:600px){
  .artg-stage{height:clamp(440px,74vh,640px);border-radius:16px}
  .artg-tour{bottom:140px}
  .artg-tour__txt b{white-space:normal;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
}
/* облачко над головой куратора в холле; ставится по экранным координатам головы */
.artg-say{position:absolute;left:0;top:0;max-width:270px;padding:10px 14px;border:0;margin:0;border-radius:16px;background:#fff;color:#2a2a2a;
  font:400 15px/1.3 "Inter","Helvetica Neue",Arial,sans-serif;text-align:left;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,.16);
  opacity:0;visibility:hidden;pointer-events:none;transition:opacity .35s ease,visibility .35s,background-color .2s,color .2s;will-change:transform}
.artg-say.is-on{opacity:1;visibility:visible;pointer-events:auto}
.artg-say::after{content:"";position:absolute;left:14px;top:100%;border:9px solid transparent;border-top-color:#fff;border-bottom:0;border-left-width:3px;transition:border-color .2s}
.artg-say:hover{background:#2a2a2a;color:#fff}
.artg-say:hover::after{border-top-color:#2a2a2a}
.artg-stage.is-narrow .artg-say{font-size:13px;max-width:210px;padding:8px 12px}
`;
