/* Shared vector artwork for the display and its static SVG fallbacks. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.SeasonalDrawing=factory();})(typeof window!=='undefined'?window:globalThis,function(){
'use strict';
const height = 216, width = 1920;
const rainbow = ['#FF4868','#FFAA57','#F6E96C','#60D59A','#63B9F4','#B68AF2'];
const flowers = [[.04,.62,.29],[.16,.38,.22],[.29,.52,.24],[.46,.3,.2],[.64,.44,.23],[.81,.4,.22],[.95,.65,.32]];

function strands(ctx, phase) {
 const spacing = height * .13;
 ctx.lineCap = 'round'; ctx.lineJoin = 'round';
 rainbow.forEach((colour, index) => {
  ctx.beginPath();
  for (let step = 0; step <= 120; step++) {
   const x = width * (-.08 + step / 120 * 1.16), ratio = x / width;
   const lift = height * .13 * Math.pow(Math.abs(ratio - .5) * 2, 3);
   const wave = Math.sin(ratio * 6.2 + phase + index * .1) * height * .05;
   const y = height * .2 + index * spacing - lift + wave;
   if (!step) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  }
  ctx.strokeStyle = colour; ctx.lineWidth = spacing * .72; ctx.stroke();
 });
}

function poppy(ctx, x, y, radius, angle, seed) {
 ctx.save(); ctx.translate(x,y); ctx.rotate(angle);
 ['#F33D5D','#D92651','#FF5B70','#E12D53'].forEach((colour, petal) => {
  ctx.save(); ctx.rotate(petal * Math.PI / 2 + seed * .13);
  ctx.beginPath(); ctx.moveTo(0,radius * .13);
  ctx.bezierCurveTo(-radius*.78,radius*.12,-radius*.94,-radius*.85,-radius*.13,-radius*.91);
  ctx.bezierCurveTo(radius*.53,-radius*1.02,radius*.72,-radius*.12,0,radius*.13);
  ctx.fillStyle = colour; ctx.fill(); ctx.restore();
 });
 ctx.beginPath(); ctx.ellipse(0,radius*.03,radius*.23,radius*.2,.25,0,Math.PI*2);
 ctx.fillStyle='#101522'; ctx.fill();
 ctx.beginPath(); ctx.arc(-radius*.04,-radius*.025,radius*.065,0,Math.PI*2);
 ctx.fillStyle='#F4C5A1'; ctx.fill(); ctx.restore();
}

function meadow(ctx, phase) {
 flowers.forEach(([position,rise,scale],index) => {
  const baseX = width * position, flowerX = baseX + Math.sin(phase*.8+index*.82)*height*.055;
  const flowerY = height * (1-rise), radius = height * scale;
  ctx.beginPath(); ctx.moveTo(baseX-height*.08,height*1.12);
  ctx.bezierCurveTo(baseX-height*.09,height*.8,flowerX+height*.08,flowerY+height*.15,flowerX,flowerY);
  ctx.strokeStyle = index%2?'#88BB9A':'#619E83'; ctx.lineWidth = height*.025; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(baseX,height*.87);
  ctx.quadraticCurveTo(baseX-height*.34,height*.64,baseX-height*.26,height*.88);
  ctx.quadraticCurveTo(baseX-height*.15,height*.94,baseX,height*.87);
  ctx.fillStyle=index%2?'#4C8B74':'#75AC89'; ctx.fill();
  poppy(ctx,flowerX,flowerY,radius,Math.sin(phase*.8+index)*.08+index*.15,index);
 });
}

// All motifs are flat vector shapes. Movement changes their curves and angles.
function path(ctx, colour, points, line=0) {
 ctx.beginPath(); points(ctx);
 if(line){ctx.strokeStyle=colour;ctx.lineWidth=line;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke();}
 else {ctx.fillStyle=colour;ctx.fill();}
}
function dot(ctx,x,y,r,colour){path(ctx,colour,c=>c.arc(x,y,r,0,Math.PI*2));}
function flowing(ctx, phase, colours, weight=15, base=120, spread=24) {
 colours.forEach((colour,i)=>path(ctx,colour,c=>{
  for(let n=0;n<=100;n++){
   const x=n*width/100, y=base+i*spread+Math.sin(n/100*6.2+phase+i*.22)*17-Math.pow(Math.abs(n/100-.5)*2,3)*22;
   if(n)c.lineTo(x,y);else c.moveTo(x,y);
  }
 },weight));
}
function leaf(ctx,x,y,size,angle,colour){
 ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.scale(size,size);
 path(ctx,colour,c=>{c.moveTo(0,0);c.bezierCurveTo(-.55,-.25,-.6,-.85,0,-1);c.bezierCurveTo(.6,-.85,.55,-.25,0,0);});ctx.restore();
}
function branch(ctx,x,y,length,angle,phase,colour){
 ctx.save();ctx.translate(x,y);ctx.rotate(angle+Math.sin(phase)*.035);
 path(ctx,colour,c=>{c.moveTo(0,0);c.quadraticCurveTo(length*.4,-75,length,-30);},4);
 for(let i=1;i<=7;i++){
  const t=i/8, px=length*t,py=-110*t+80*t*t;
  leaf(ctx,px,py,34,-.7,colour);leaf(ctx,px+12,py+8,31,2.3,colour);
 }
 ctx.restore();
}
function star(ctx,x,y,r,colour,angle=0){
 ctx.save();ctx.translate(x,y);ctx.rotate(angle);
 path(ctx,colour,c=>{for(let i=0;i<8;i++){const a=i*Math.PI/4,rr=i%2?r*.25:r;const xx=Math.cos(a)*rr,yy=Math.sin(a)*rr;if(i)c.lineTo(xx,yy);else c.moveTo(xx,yy);}c.closePath();});ctx.restore();
}
function heart(ctx,x,y,r,angle,colour){
 ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.scale(r,r);
 path(ctx,colour,c=>{c.moveTo(0,.75);c.bezierCurveTo(-1.5,-.1,-.75,-1.2,0,-.5);c.bezierCurveTo(.75,-1.2,1.5,-.1,0,.75);});ctx.restore();
}
function awareness(ctx,x,y,phase){
 ctx.save();ctx.translate(x,y);ctx.rotate(Math.sin(phase)*.06);
 path(ctx,'#71D5A3',c=>{c.moveTo(-36,28);c.bezierCurveTo(-84,-22,-49,-77,0,-77);c.bezierCurveTo(60,-77,69,-15,27,30);c.lineTo(-28,104);c.lineTo(-64,84);c.lineTo(18,-19);c.bezierCurveTo(44,-53,-16,-71,-31,-31);c.bezierCurveTo(-36,-11,-11,17,47,83);c.lineTo(14,106);c.closePath();});
 path(ctx,'#2C8F70',c=>{c.moveTo(-36,28);c.lineTo(-10,-8);c.lineTo(47,83);c.lineTo(14,106);c.closePath();});ctx.restore();
}
function wellbeing(ctx,phase){
 flowing(ctx,phase,['#286D60','#46B28B','#B0E8B9'],13,151,19);
 awareness(ctx,160,94,phase);awareness(ctx,1755,94,phase+.6);
 branch(ctx,420,204,310,-.03,phase,'#71D5A3');branch(ctx,1490,204,-310,.03,-phase,'#90DCC0');
}
function fireworks(ctx,phase){
 const colours=['#F4D36C','#FF5B98','#87CEED'];
 [190,945,1730].forEach((x,k)=>{
  const pulse=(Math.sin(phase*.7+k*1.6)+1)/2,r=62+22*pulse,cy=105+k%2*12;
  for(let n=0;n<18;n++){
   const a=n*Math.PI/9+k*.23,start=r*.5,end=r;
   path(ctx,colours[(n+k)%3],c=>{c.moveTo(x+Math.cos(a)*start,cy+Math.sin(a)*start);c.lineTo(x+Math.cos(a)*end,cy+Math.sin(a)*end);},4+n%3);
  }
 });
 [410,620,1190,1430].forEach((x,i)=>star(ctx,x,143+Math.sin(phase+i)*13,12,colours[i%3],phase*.1));
 flowing(ctx,phase,['#A44272','#DBAA52'],4,199,13);
}
function festive(ctx,phase,options={}){
 flowing(ctx,phase,['#CDAB58','#EFE0A2'],7,176,21);
 branch(ctx,-35,192,530,-.14,phase,'#4CA280');branch(ctx,1950,192,-530,.14,-phase,'#70C097');
 [360,680,1240,1560].forEach((x,i)=>{
  const sway=Math.sin(phase+i)*11,y=119+i%2*29;
  path(ctx,'#D8C27D',c=>{c.moveTo(x,53);c.quadraticCurveTo(x+sway,75,x+sway,y);},2.5);
  dot(ctx,x+sway,y+19,24,i%2?'#F5CF74':'#F05273');
  star(ctx,x+sway,y+19,11,'#101522',.2);
 });
 [80,960,1835].filter(x=>!options.named||x!==960).forEach((x,i)=>star(ctx,x,48+Math.sin(phase+i)*7,17,'#F4DC8C',phase*.12));
}
function rosette(ctx,x,y,r,phase,i){
 ctx.save();ctx.translate(x,y);ctx.rotate(Math.sin(phase+i)*.08+i*.25);
 for(let n=0;n<6;n++){const a=n*Math.PI/3;dot(ctx,Math.cos(a)*r*.52,Math.sin(a)*r*.52,r*.45,i%2?'#FF9CAB':'#EBBDEA');}
 dot(ctx,0,0,r*.27,'#F2D477');ctx.restore();
}
function spring(ctx,phase,eggs=false,named=false){
 flowing(ctx,phase,['#5B9E8A','#93D8B1'],10,186,20);
 [85,510,960,1430,1830].filter(x=>!named||x!==960).forEach((x,i)=>{
  const y=82+(i%2)*38,sway=Math.sin(phase+i)*9;
  path(ctx,'#88BD99',c=>{c.moveTo(x-16,216);c.quadraticCurveTo(x+20,154,x+sway,y);},4);
  rosette(ctx,x+sway,y,34+i%2*9,phase,i);
 });
 if(eggs)[285,740,1190,1650].forEach((x,i)=>{
  ctx.save();ctx.translate(x+Math.sin(phase+i)*4,178);ctx.rotate(Math.sin(phase+i)*.04);
  path(ctx,['#C4AEF0','#F6D386','#F59AAF','#90D6D0'][i],c=>{c.moveTo(0,-39);c.bezierCurveTo(31,-39,47,38,0,38);c.bezierCurveTo(-47,38,-31,-39,0,-39);});
  path(ctx,'#101522',c=>{c.moveTo(-24,6);c.quadraticCurveTo(0,-9,24,6);},5);ctx.restore();
 });
}
function roman(ctx,phase,options={}){
 flowing(ctx,phase,['#8E693F','#D8B56D','#F2D99D'],8,164,21);
 branch(ctx,40,185,550,-.12,phase,'#D6B570');branch(ctx,1880,185,-550,.12,-phase,'#E9CC8B');
 (options.named?[]:[700,960,1220]).forEach((x,i)=>star(ctx,x,92+Math.sin(phase+i)*8,15-i%2*3,'#E7C77F',Math.PI/4));
}
function book(ctx,x,y,r,phase,i){
 ctx.save();ctx.translate(x,y);ctx.rotate(Math.sin(phase+i)*.035+(i-1)*.07);ctx.scale(r,r);
 path(ctx,i%2?'#C0B5E4':'#F1DBAF',c=>{c.moveTo(0,-.32);c.bezierCurveTo(-.5,-.75,-1,-.6,-1,-.6);c.lineTo(-1,.45);c.bezierCurveTo(-.5,.2,-.15,.35,0,.6);c.bezierCurveTo(.15,.35,.5,.2,1,.45);c.lineTo(1,-.6);c.bezierCurveTo(.5,-.75,.15,-.5,0,-.32);c.closePath();});
 path(ctx,'#101522',c=>{c.moveTo(0,-.3);c.lineTo(0,.55);},.035);
 [-.22,.04,.29].forEach(y=>path(ctx,'#101522',c=>{c.moveTo(-.8,y);c.quadraticCurveTo(-.45,y-.12,-.18,y+.06);c.moveTo(.18,y+.06);c.quadraticCurveTo(.45,y-.12,.8,y);},.025));ctx.restore();
}
function books(ctx,phase){
 flowing(ctx,phase,['#AA89C8','#E1BE9C','#E962A3'],10,177,16);
 [195,960,1725].forEach((x,i)=>book(ctx,x,132,100+i%2*14,phase,i));
}
function heritage(ctx,phase){
 ['#DAA54B','#9B415B','#70A889','#E6C77D','#A975BF'].forEach((colour,i)=>path(ctx,colour,c=>{
  for(let n=0;n<=120;n++){const x=width*n/120,y=119+Math.sin(n/120*9.4+phase*.45+i*.92)*43+i*9;if(n)c.lineTo(x,y);else c.moveTo(x,y);}
 },20));
}
function women(ctx,phase){
 flowing(ctx,phase,['#AC83DA','#EF83B7','#F8B5C7'],14,147,25);
 [155,1765].forEach((x,i)=>{
  ctx.save();ctx.translate(x,83);ctx.rotate(Math.sin(phase+i)*.05);
  path(ctx,i?'#F6A3C7':'#C19BEA',c=>{c.arc(0,0,43,0,Math.PI*2);},10);
  path(ctx,i?'#F6A3C7':'#C19BEA',c=>{c.moveTo(0,43);c.lineTo(0,116);c.moveTo(-27,85);c.lineTo(27,85);},10);ctx.restore();
 });
}
function infinity(ctx,x,y,size,phase,colour){
 ctx.save();ctx.translate(x,y);ctx.rotate(Math.sin(phase)*.035);ctx.scale(size,size);
 path(ctx,colour,c=>{c.moveTo(0,0);c.bezierCurveTo(-.7,-1,-1.3,-.7,-1.3,0);c.bezierCurveTo(-1.3,.7,-.7,1,0,0);c.bezierCurveTo(.7,-1,1.3,-.7,1.3,0);c.bezierCurveTo(1.3,.7,.7,1,0,0);},.15);ctx.restore();
}
function inclusion(ctx,phase){
 flowing(ctx,phase,['#437E98','#80D5CE','#AD9CE5'],12,164,23);
 [220,960,1700].forEach((x,i)=>infinity(ctx,x,99+i%2*15,73,phase+i,['#91DFD8','#DAC373','#C4AFE8'][i]));
}
function kindness(ctx,phase){
 flowing(ctx,phase,['#BE547E','#ECA0A5','#E6C581'],10,164,23);
 [115,425,790,1130,1490,1810].forEach((x,i)=>heart(ctx,x,90+i%2*39+Math.sin(phase+i)*7,33+i%3*8,Math.sin(phase+i)*.09,['#F57CA5','#F2C38C','#E99BA8'][i%3]));
}
function globe(ctx,x,y,phase){
 ctx.save();ctx.translate(x,y);ctx.rotate(Math.sin(phase)*.04);
 dot(ctx,0,0,73,'#6CBBC7');
 path(ctx,'#8DCF9B',c=>{c.moveTo(-39,-54);c.lineTo(-8,-66);c.lineTo(17,-39);c.lineTo(7,-8);c.lineTo(-23,-12);c.lineTo(-30,17);c.lineTo(-53,6);c.lineTo(-63,-24);c.closePath();});
 path(ctx,'#92D6A2',c=>{c.moveTo(29,6);c.lineTo(61,18);c.lineTo(44,49);c.lineTo(11,64);c.lineTo(-6,37);c.lineTo(6,19);c.closePath();});ctx.restore();
}
function earth(ctx,phase){
 flowing(ctx,phase,['#3C806C','#75BCA0','#88C9D1'],12,160,24);
 globe(ctx,170,108,phase);globe(ctx,1750,108,phase+.7);
 branch(ctx,530,211,340,-.13,phase,'#81C69B');branch(ctx,1390,211,-340,.13,-phase,'#AED7A1');
}
function dove(ctx,x,y,phase,i){
 ctx.save();ctx.translate(x,y);ctx.rotate(Math.sin(phase+i)*.05);ctx.scale(i%2?-1:1,1);
 path(ctx,'#DFE8D7',c=>{c.moveTo(-66,18);c.bezierCurveTo(-31,29,-4,10,10,-8);c.bezierCurveTo(-3,-43,-30,-57,-56,-66);c.bezierCurveTo(-46,-30,-27,-11,-8,-3);c.bezierCurveTo(20,-36,46,-47,76,-37);c.bezierCurveTo(53,-7,35,4,19,8);c.bezierCurveTo(16,22,-2,31,-26,27);c.lineTo(-55,47);c.lineTo(-48,22);c.closePath();});
 dot(ctx,17,-2,3,'#101522');ctx.restore();
}
function peace(ctx,phase){
 flowing(ctx,phase,['#709B80','#B7CC9F'],7,180,23);
 branch(ctx,0,210,500,-.16,phase,'#9DBB91');branch(ctx,1920,210,-500,.16,-phase,'#C0CF9E');
 [700,1220].forEach((x,i)=>dove(ctx,x,111+Math.sin(phase+i)*9,phase,i));
}
function water(ctx,phase,options={}){
 ['#2F709A','#409CB9','#61C2C8','#B0E2D8'].forEach((colour,i)=>path(ctx,colour,c=>{
  for(let n=0;n<=160;n++){const x=width*n/160,y=(options.named?115:105)+i*27+Math.sin(n/160*Math.PI*6-phase+i*.25)*24;if(n)c.lineTo(x,y);else c.moveTo(x,y);}
 },16));
}
function flame(ctx,x,y,size,phase,i){
 ctx.save();ctx.translate(x,y);ctx.rotate(Math.sin(phase+i)*.05);ctx.scale(size,size);
 path(ctx,i%2?'#F19551':'#E66965',c=>{c.moveTo(0,-1);c.bezierCurveTo(.05,-.3,.9,-.2,.72,.4);c.bezierCurveTo(.6,1,-.6,1,-.72,.4);c.bezierCurveTo(-.86,-.08,-.38,-.38,-.35,-.65);c.bezierCurveTo(-.08,-.35,-.02,-.25,0,-1);});
 path(ctx,'#F4D476',c=>{c.moveTo(.03,-.26);c.bezierCurveTo(.06,.08,.5,.22,.35,.57);c.bezierCurveTo(.18,.86,-.33,.8,-.36,.44);c.bezierCurveTo(-.4,.18,-.12,.06,.03,-.26);});ctx.restore();
}
function fire(ctx,phase){
 flowing(ctx,phase,['#B34D69','#E39D61'],10,192,16);
 [105,390,675,960,1245,1530,1815].forEach((x,i)=>flame(ctx,x,145+i%2*12,58+i%3*9,phase,i));
}
function mask(ctx,x,y,angle,smile,colour){
 ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.scale(83,83);
 path(ctx,colour,c=>{c.moveTo(-.72,-.65);c.quadraticCurveTo(0,-.3,.72,-.65);c.lineTo(.64,.35);c.quadraticCurveTo(0,1.05,-.64,.35);c.closePath();});
 path(ctx,'#101522',c=>{c.moveTo(-.49,-.19);c.quadraticCurveTo(-.3,-.36,-.12,-.16);c.quadraticCurveTo(-.28,-.06,-.49,-.19);c.moveTo(.49,-.19);c.quadraticCurveTo(.3,-.36,.12,-.16);c.quadraticCurveTo(.28,-.06,.49,-.19);});
 path(ctx,'#101522',c=>{c.moveTo(-.28,.3);c.quadraticCurveTo(0,smile?.62:.07,.28,.3);},.065);ctx.restore();
}
function theatre(ctx,phase){
 flowing(ctx,phase,['#835C9B','#CA75AE','#F3B3CD'],17,150,25);
 mask(ctx,180,112,-.14+Math.sin(phase)*.05,true,'#E9A1CC');mask(ctx,1740,112,.14+Math.sin(phase+.4)*.05,false,'#B598DA');
}
const treatments={
 'pride-border':strands,'poppy-flowing':meadow,'wellbeing-border':wellbeing,
 'firework-border':fireworks,'festive-border':festive,'spring-border':(ctx,p,opts)=>spring(ctx,p,false,opts.named),
 'easter-border':(ctx,p)=>spring(ctx,p,true),'roman-border':roman,'book-border':books,
 'heritage-border':heritage,'women-border':women,'inclusion-border':inclusion,
 'kindness-border':kindness,'earth-border':earth,'peace-border':peace,
 'water-border':water,'fire-border':fire,'theatre-border':theatre
};
const labelColours={'roman-border':'#E9CC8B','women-border':'#C19BEA','spring-border':'#FF9CAB','fire-border':'#F4D476','water-border':'#B0E2D8','theatre-border':'#F3B3CD','festive-border':'#F4DC8C'};
return {width,height,treatments,draw(type,ctx,phase=0,options={}){if(!Object.prototype.hasOwnProperty.call(treatments,type))throw Error('Unknown seasonal treatment: '+type);treatments[type](ctx,phase,options);
 if(options.label){ctx.save();ctx.font='52px "Nimbus Roman", Georgia, serif';ctx.textAlign='center';ctx.fillStyle=labelColours[type]||'#F1F3F5';ctx.fillText(options.label.toUpperCase(),width/2,76);ctx.restore();}
}};
});
