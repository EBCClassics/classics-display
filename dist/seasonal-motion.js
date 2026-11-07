/* Original seasonal motion, developed from Philip's selected flowing-strands study. */
(function () {
'use strict';
const pace=1.6, drawing=window.SeasonalDrawing;
if(!drawing)return;
const {width,height}=drawing;

window.SeasonalMotion = {
 create(container) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let canvas, ctx, style='', frame=0, phase=0, last=0, paused=false, designName='';
  function draw() {
   if (!ctx) return;
   ctx.clearRect(0,0,width,height);
   drawing.draw(style,ctx,phase,{label:designName,named:!!designName});
  }
  function stop() { if(frame) cancelAnimationFrame(frame); frame=0; last=0; }
  function tick(now) {
   frame=0;
   if (!style || paused || reduced.matches || document.hidden) return;
   if (!last) last=now;
   const elapsed=now-last;
   // Limit decoration to 30fps and cap elapsed time after a stalled player frame.
   if (elapsed>=1000/30) { phase+=Math.min(elapsed/1000,.1)*pace*.5; last=now; draw(); }
   frame=requestAnimationFrame(tick);
  }
  function run() { stop(); draw(); if(style && !paused && !reduced.matches && !document.hidden) frame=requestAnimationFrame(tick); }
  reduced.addEventListener('change',run);
  document.addEventListener('visibilitychange',run);
  document.fonts?.ready.then(run);
  return {
   set(source, label='') {
    const candidate=source?.split('/').pop().replace(/\.svg$/,'');
    const next=Object.prototype.hasOwnProperty.call(drawing.treatments,candidate)?candidate:'';
    if(next===style && label===designName) return !!ctx && !!next;
    if(next && next===style){designName=label;run();return !!ctx;}
    designName=label;
    stop(); style=next;
    if (!next) {canvas=null;ctx=null;return false;}
    canvas=document.createElement('canvas'); canvas.width=width; canvas.height=height;
    canvas.className='seasonal-motion'; canvas.setAttribute('aria-hidden','true');
    ctx=canvas.getContext('2d');
    if(!ctx) {style='';return false;}
    container.replaceChildren(canvas); run(); return true;
   },
   pause(value) {if(paused!==value){paused=value;run();}}
  };
 }
};
})();
