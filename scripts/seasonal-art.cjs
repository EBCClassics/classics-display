/* Record the shared Canvas paths as SVG so calendar previews and player fallbacks agree. */
const fs=require('node:fs'),path=require('node:path');
const art=require('../dist/seasonal-drawing.js');
const num=n=>Number(n.toFixed(4));
class SVGContext {
 constructor(){this.output=[];this.stack=[];this.state={fillStyle:'#000',strokeStyle:'#000',lineWidth:1,lineCap:'butt',lineJoin:'miter',transform:[],font:'52px Nimbus Roman',textAlign:'center'};this.path='';}
 get font(){return this.state.font;} set font(v){this.state.font=v;}
 get textAlign(){return this.state.textAlign;} set textAlign(v){this.state.textAlign=v;}
 fillText(text,x,y){const safe=text.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));this.output.push(`<text x="${num(x)}" y="${num(y)}" text-anchor="middle" fill="${this.fillStyle}" font-family="Georgia,serif" font-size="52">${safe}</text>`);}
 get fillStyle(){return this.state.fillStyle;} set fillStyle(v){this.state.fillStyle=v;}
 get strokeStyle(){return this.state.strokeStyle;} set strokeStyle(v){this.state.strokeStyle=v;}
 get lineWidth(){return this.state.lineWidth;} set lineWidth(v){this.state.lineWidth=v;}
 get lineCap(){return this.state.lineCap;} set lineCap(v){this.state.lineCap=v;}
 get lineJoin(){return this.state.lineJoin;} set lineJoin(v){this.state.lineJoin=v;}
 save(){this.stack.push({...this.state,transform:[...this.state.transform]});}
 restore(){this.state=this.stack.pop();}
 translate(x,y){this.state.transform.push(`translate(${num(x)} ${num(y)})`);}
 rotate(a){this.state.transform.push(`rotate(${num(a*180/Math.PI)})`);}
 scale(x,y){this.state.transform.push(`scale(${num(x)} ${num(y)})`);}
 beginPath(){this.path='';}
 moveTo(x,y){this.path+=`M${num(x)} ${num(y)}`;}
 lineTo(x,y){this.path+=`L${num(x)} ${num(y)}`;}
 bezierCurveTo(...p){this.path+='C'+p.map(num).join(' ');}
 quadraticCurveTo(...p){this.path+='Q'+p.map(num).join(' ');}
 closePath(){this.path+='Z';}
 arc(x,y,r,a,b){this.ellipse(x,y,r,r,0,a,b);}
 ellipse(x,y,rx,ry,rotation,a,b){
  const steps=Math.ceil(Math.abs(b-a)/(Math.PI/2)),delta=(b-a)/steps;
  const point=t=>[x+Math.cos(rotation)*rx*Math.cos(t)-Math.sin(rotation)*ry*Math.sin(t),y+Math.sin(rotation)*rx*Math.cos(t)+Math.cos(rotation)*ry*Math.sin(t)];
  const tangent=t=>[-Math.cos(rotation)*rx*Math.sin(t)-Math.sin(rotation)*ry*Math.cos(t),-Math.sin(rotation)*rx*Math.sin(t)+Math.cos(rotation)*ry*Math.cos(t)];
  const start=point(a);if(this.path)this.lineTo(...start);else this.moveTo(...start);
  for(let i=0;i<steps;i++){
   const t=a+i*delta,u=t+delta,k=4/3*Math.tan(delta/4),p=point(t),q=point(u),d=tangent(t),e=tangent(u);
   this.bezierCurveTo(p[0]+k*d[0],p[1]+k*d[1],q[0]-k*e[0],q[1]-k*e[1],...q);
  }
 }
 fill(){this.emit(`fill="${this.fillStyle}"`);}
 stroke(){this.emit(`fill="none" stroke="${this.strokeStyle}" stroke-width="${num(this.lineWidth)}" stroke-linecap="${this.lineCap}" stroke-linejoin="${this.lineJoin}"`);}
 emit(style){this.output.push(`<path d="${this.path}" transform="${this.state.transform.join(' ')}" ${style}/>`);}
}
module.exports=SVGContext;
if(require.main===module){
for(const name of Object.keys(art.treatments)){
 const ctx=new SVGContext();art.draw(name,ctx,0);
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${art.width} ${art.height}" preserveAspectRatio="none"><title>Original ${name.replaceAll('-',' ')} treatment</title>${ctx.output.join('')}</svg>\n`;
 fs.writeFileSync(path.join(__dirname,'../dist/assets/seasons',name+'.svg'),svg);
}
for(const event of require('../dist/content.json').events.filter(e=>e.designName)){
 const ctx=new SVGContext(),type=event.borderImage.split('/').pop().replace('.svg','');
 art.draw(type,ctx,0,{label:event.designName,named:true});
 fs.writeFileSync(path.join(__dirname,'../dist/assets/seasons',event.id+'-named.svg'),`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${art.width} ${art.height}" preserveAspectRatio="none"><title>${event.designName}</title>${ctx.output.join('')}</svg>\n`);
}
console.log(`Generated ${Object.keys(art.treatments).length} matching seasonal SVG treatments.`);

}
