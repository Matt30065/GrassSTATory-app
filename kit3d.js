/* GrassSTATory v23.3.0 garment renderer.
   Uses clean real-garment silhouette masks with live club colours/patterns.
   No baked-in club graphics or reference-shirt artwork. */
(function(){
  const VIEWS=['front','side','back'];
  const MASKS={front:'kit-mask-front.png',side:'kit-mask-side.png',back:'kit-mask-back.png'};
  const cache={};
  function loadImage(src){if(cache[src])return cache[src];cache[src]=new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src=src});return cache[src]}
  function hex(c,f='#0b3156'){return /^#[0-9a-f]{6}$/i.test(c||'')?c:f}
  function roundedRect(ctx,x,y,w,h,r){const q=Math.min(r,w/2,h/2);ctx.beginPath();ctx.moveTo(x+q,y);ctx.arcTo(x+w,y,x+w,y+h,q);ctx.arcTo(x+w,y+h,x,y+h,q);ctx.arcTo(x,y+h,x,y,q);ctx.arcTo(x,y,x+w,y,q);ctx.closePath()}
  function drawPattern(ctx,cfg,w,h){const p=hex(cfg.primary),s=hex(cfg.secondary,'#f5f3ec'),pat=cfg.pattern||'plain';ctx.fillStyle=p;ctx.fillRect(0,0,w,h);ctx.fillStyle=s;
    if(pat==='stripes'){const sw=w/7;for(let i=1;i<7;i+=2)ctx.fillRect(i*sw,0,sw,h)}
    else if(pat==='hoops'){const sh=h/7;for(let i=1;i<7;i+=2)ctx.fillRect(0,i*sh,w,sh)}
    else if(pat==='halves')ctx.fillRect(w/2,0,w/2,h)
    else if(pat==='sash'){ctx.beginPath();ctx.moveTo(-w*.12,h*.05);ctx.lineTo(w*.14,0);ctx.lineTo(w*1.12,h*.94);ctx.lineTo(w*.86,h);ctx.closePath();ctx.fill()}
    else if(pat==='chevron'){ctx.beginPath();ctx.moveTo(0,h*.2);ctx.lineTo(w*.5,h*.5);ctx.lineTo(w,h*.2);ctx.lineTo(w,h*.36);ctx.lineTo(w*.5,h*.66);ctx.lineTo(0,h*.36);ctx.closePath();ctx.fill()}
    else if(pat==='geometric'){const n=4,cw=w/n,ch=h/n;ctx.globalAlpha=.82;for(let y=0;y<n;y++)for(let x=0;x<n;x++){if((x+y)%2){ctx.beginPath();ctx.moveTo(x*cw,y*ch);ctx.lineTo((x+1)*cw,y*ch);ctx.lineTo(x*cw,(y+1)*ch);ctx.closePath();ctx.fill()}}ctx.globalAlpha=1}
  }
  function addLighting(ctx,w,h){
    const gx=ctx.createLinearGradient(0,0,w,0);gx.addColorStop(0,'rgba(0,0,0,.42)');gx.addColorStop(.16,'rgba(255,255,255,.10)');gx.addColorStop(.47,'rgba(255,255,255,.04)');gx.addColorStop(.78,'rgba(0,0,0,.12)');gx.addColorStop(1,'rgba(0,0,0,.44)');ctx.globalCompositeOperation='multiply';ctx.fillStyle=gx;ctx.fillRect(0,0,w,h);
    const gy=ctx.createLinearGradient(0,0,0,h);gy.addColorStop(0,'rgba(255,255,255,.16)');gy.addColorStop(.25,'rgba(255,255,255,.02)');gy.addColorStop(.75,'rgba(0,0,0,.06)');gy.addColorStop(1,'rgba(0,0,0,.26)');ctx.globalCompositeOperation='source-over';ctx.fillStyle=gy;ctx.fillRect(0,0,w,h);
    // soft fold highlights / shadows
    ctx.lineCap='round';for(const [x1,y1,c,a] of [[.36,.34,'255,255,255',.10],[.6,.28,'255,255,255',.08],[.29,.62,'0,0,0',.09],[.69,.58,'0,0,0',.08]]){const g=ctx.createLinearGradient(w*x1,0,w*x1+w*.08,0);g.addColorStop(0,`rgba(${c},0)`);g.addColorStop(.5,`rgba(${c},${a})`);g.addColorStop(1,`rgba(${c},0)`);ctx.fillStyle=g;ctx.fillRect(w*x1,h*y1,w*.11,h*.48)}
    // fabric micro texture
    ctx.globalAlpha=.055;ctx.fillStyle='#fff';for(let y=0;y<h;y+=6){ctx.fillRect(0,y,w,1)}ctx.globalAlpha=1;
  }
  function cutNeck(ctx,w,h,cfg,view){ctx.save();ctx.globalCompositeOperation='destination-out';ctx.fillStyle='#000';ctx.beginPath();if(view==='side'){ctx.ellipse(w*.50,h*.11,w*.09,h*.045,0,0,Math.PI*2)}else if((cfg.collar||'crew')==='v'){ctx.moveTo(w*.43,h*.085);ctx.lineTo(w*.5,h*.18);ctx.lineTo(w*.57,h*.085);ctx.quadraticCurveTo(w*.5,h*.13,w*.43,h*.085)}else{ctx.ellipse(w*.5,h*.105,w*.105,h*.055,0,0,Math.PI*2)}ctx.fill();ctx.restore();
    ctx.save();ctx.strokeStyle=hex(cfg.accent,'#d8b85b');ctx.lineWidth=Math.max(5,w*.012);ctx.beginPath();if(view==='side'){ctx.arc(w*.5,h*.11,w*.09,Math.PI*.05,Math.PI*.95)}else if((cfg.collar||'crew')==='v'){ctx.moveTo(w*.43,h*.085);ctx.lineTo(w*.5,h*.18);ctx.lineTo(w*.57,h*.085)}else{ctx.arc(w*.5,h*.105,w*.105,Math.PI*.08,Math.PI*.92)}ctx.stroke();ctx.restore()}
  function addBadge(ctx,w,h,badgeSvg,view){if(!badgeSvg||view==='back')return;const img=new Image();img.onload=()=>{};img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(badgeSvg);const x=view==='side'?w*.55:w*.67,y=h*.25,bw=w*.09,bh=h*.12;return {img,x,y,bw,bh}}
  function addBackIdentity(ctx,w,h,name,number){ctx.save();ctx.textAlign='center';ctx.fillStyle='rgba(255,255,255,.96)';ctx.strokeStyle='rgba(0,0,0,.42)';ctx.lineJoin='round';ctx.lineWidth=Math.max(4,w*.008);ctx.font=`800 ${Math.round(w*.055)}px Arial`;ctx.strokeText(String(name||'PLAYER').toUpperCase(),w*.5,h*.27);ctx.fillText(String(name||'PLAYER').toUpperCase(),w*.5,h*.27);ctx.font=`900 ${Math.round(w*.23)}px Arial`;ctx.strokeText(String(number||'10'),w*.5,h*.58);ctx.fillText(String(number||'10'),w*.5,h*.58);ctx.restore()}
  class KitRenderer{
    constructor(canvas,o={}){this.canvas=canvas;this.ctx=canvas.getContext('2d');this.config=o.config||{};this.badgeSvg=o.badgeSvg||'';this.name=o.name||'PLAYER';this.number=o.number||'10';this.view=0;this.scale=1;this.dragX=null;this.resize();this.bind()}
    resize(){const r=this.canvas.getBoundingClientRect();this.w=Math.max(320,Math.round(r.width||620));this.h=Math.max(420,Math.round(r.height||590));const d=Math.min(devicePixelRatio||1,2);this.canvas.width=this.w*d;this.canvas.height=this.h*d;this.ctx.setTransform(d,0,0,d,0,0);this.draw()}
    bind(){this.canvas.addEventListener('pointerdown',e=>{this.dragX=e.clientX;this.canvas.setPointerCapture?.(e.pointerId)});this.canvas.addEventListener('pointerup',e=>{if(this.dragX==null)return;const dx=e.clientX-this.dragX;if(Math.abs(dx)>25){this.view=(this.view+(dx<0?1:-1)+3)%3;this.draw()}this.dragX=null});this.canvas.addEventListener('wheel',e=>{e.preventDefault();this.scale=Math.max(.8,Math.min(1.18,this.scale+(e.deltaY<0?.04:-.04)));this.draw()},{passive:false});addEventListener('resize',()=>this.resize(),{passive:true})}
    setConfig(c={}){this.config={...this.config,...c};this.draw()} setBadgeSvg(s){this.badgeSvg=s||'';this.draw()} setBack(n,no){this.name=n||this.name;this.number=no||this.number;this.draw()} setView(v){this.view=Math.max(0,Math.min(2,Number(v)||0));this.draw()} reset(){this.view=0;this.scale=1;this.draw()}
    async draw(){const view=VIEWS[this.view],ctx=this.ctx,W=this.w,H=this.h;if(!ctx)return;ctx.clearRect(0,0,W,H);let mask;try{mask=await loadImage(MASKS[view])}catch{return};const sw=mask.naturalWidth,sh=mask.naturalHeight;const off=document.createElement('canvas');off.width=sw;off.height=sh;const o=off.getContext('2d');drawPattern(o,this.config,sw,sh);addLighting(o,sw,sh);o.globalCompositeOperation='destination-in';o.drawImage(mask,0,0,sw,sh);o.globalCompositeOperation='source-over';cutNeck(o,sw,sh,this.config,view);if(view==='back')addBackIdentity(o,sw,sh,this.name,this.number);const badge=addBadge(o,sw,sh,this.badgeSvg,view);if(badge){try{await new Promise((resolve,reject)=>{badge.img.onload=resolve;badge.img.onerror=reject});o.drawImage(badge.img,badge.x,badge.y,badge.bw,badge.bh)}catch{}}
      const ar=sw/sh;let dh=H*.88*this.scale,dw=dh*ar;if(dw>W*.91*this.scale){dw=W*.91*this.scale;dh=dw/ar}ctx.save();ctx.shadowColor='rgba(0,0,0,.5)';ctx.shadowBlur=30;ctx.shadowOffsetY=18;ctx.drawImage(off,(W-dw)/2,(H-dh)/2+10,dw,dh);ctx.restore();
    }
  }
  window.GrassKit3D={KitRenderer};
})();
