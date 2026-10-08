/* GrassSTATory v23.0.0 premium garment renderer.
   Image-based material renderer using approved garment silhouettes + lighting maps.
   Exposes the legacy GrassKit3D.KitRenderer API so the proven app logic remains unchanged. */
(function(){
  const VIEWS=['front','side','back'];
  const ASSETS={
    front:'kit-front-lighting.png',
    side:'kit-side-lighting.png',
    back:'kit-back-lighting.png'
  };
  const REF={
    home:{front:'kit-front-reference.png',side:'kit-side-reference.png',back:'kit-back-reference.png'},
    away:{front:'away-front-reference.png',side:'away-side-reference.png',back:'away-back-reference.png'}
  };
  const cache=new Map();
  function image(src){
    if(cache.has(src)) return cache.get(src);
    const im=new Image(); im.decoding='async'; im.src=src; cache.set(src,im); return im;
  }
  function ready(im){return im.complete&&im.naturalWidth>0}
  function wait(im,cb){if(ready(im)) cb(); else {im.addEventListener('load',cb,{once:true}); im.addEventListener('error',cb,{once:true});}}
  function hex(h){h=String(h||'#123456').replace('#',''); if(h.length===3)h=h.split('').map(x=>x+x).join(''); return [parseInt(h.slice(0,2),16)||0,parseInt(h.slice(2,4),16)||0,parseInt(h.slice(4,6),16)||0]}
  function rgba(c,a=1){const [r,g,b]=hex(c);return `rgba(${r},${g},${b},${a})`}
  function roundedRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);}
  class KitRenderer{
    constructor(canvas,opts={}){
      this.canvas=canvas; this.ctx=canvas.getContext('2d'); this.config=opts.config||{}; this.badgeSvg=opts.badgeSvg||''; this.name=opts.name||'PLAYER'; this.number=opts.number||'10'; this.view=0; this.type='home'; this.dragX=null; this.scale=1;
      this.pixelRatio=Math.min(window.devicePixelRatio||1,2); this.resize(); this.bind(); this.preload();
    }
    preload(){Object.values(ASSETS).forEach(src=>wait(image(src),()=>this.draw())); Object.values(REF).flatMap(o=>Object.values(o)).forEach(src=>wait(image(src),()=>this.draw()));}
    resize(){const r=this.canvas.getBoundingClientRect(); const w=Math.max(320,Math.round(r.width||720)), h=Math.max(420,Math.round(r.height||820)); this.canvas.width=Math.round(w*this.pixelRatio);this.canvas.height=Math.round(h*this.pixelRatio);this.ctx.setTransform(this.pixelRatio,0,0,this.pixelRatio,0,0);this.w=w;this.h=h;this.draw();}
    bind(){
      const c=this.canvas;
      c.addEventListener('pointerdown',e=>{this.dragX=e.clientX;c.setPointerCapture?.(e.pointerId)});
      c.addEventListener('pointerup',e=>{if(this.dragX==null)return;const dx=e.clientX-this.dragX;if(Math.abs(dx)>28){this.view=(this.view+(dx<0?1:-1)+3)%3;this.draw()}this.dragX=null});
      c.addEventListener('wheel',e=>{e.preventDefault();this.scale=Math.max(.78,Math.min(1.18,this.scale+(e.deltaY<0?.04:-.04)));this.draw()},{passive:false});
      window.addEventListener('resize',()=>this.resize(),{passive:true});
    }
    setConfig(cfg={}){this.config={...this.config,...cfg};this.type=(cfg.type||cfg.mode||this.type)==='away'?'away':this.type;this.draw()}
    setBadgeSvg(svg){this.badgeSvg=svg||'';this.draw()}
    setBack(name,number){this.name=name||this.name;this.number=number||this.number;this.draw()}
    setView(v){this.view=Math.max(0,Math.min(2,Number(v)||0));this.draw()}
    reset(){this.view=0;this.scale=1;this.draw()}
    makePattern(ctx,x,y,w,h){
      const cfg=this.config||{},p=cfg.primary||'#0b3156',s=cfg.secondary||'#f5f3ec',a=cfg.accent||'#d8b85b',pat=cfg.pattern||'plain';
      ctx.fillStyle=p;ctx.fillRect(x,y,w,h);
      ctx.save();ctx.translate(x,y);
      ctx.fillStyle=s;
      if(pat==='stripes'){const sw=w/7;for(let i=1;i<7;i+=2)ctx.fillRect(i*sw,0,sw,h)}
      else if(pat==='hoops'){const sh=h/8;for(let i=1;i<8;i+=2)ctx.fillRect(0,i*sh,w,sh)}
      else if(pat==='halves')ctx.fillRect(w/2,0,w/2,h);
      else if(pat==='sash'){ctx.beginPath();ctx.moveTo(-w*.15,h*.12);ctx.lineTo(w*.08,0);ctx.lineTo(w*1.15,h*.88);ctx.lineTo(w*.92,h);ctx.closePath();ctx.fill()}
      else if(pat==='chevron'){ctx.beginPath();ctx.moveTo(0,h*.26);ctx.lineTo(w*.5,h*.53);ctx.lineTo(w,h*.26);ctx.lineTo(w,h*.39);ctx.lineTo(w*.5,h*.66);ctx.lineTo(0,h*.39);ctx.closePath();ctx.fill()}
      else if(pat==='geometric'){const d=w/5;ctx.globalAlpha=.92;for(let yy=-d;yy<h+d;yy+=d){for(let xx=-d;xx<w+d;xx+=d){ctx.beginPath();ctx.moveTo(xx,yy);ctx.lineTo(xx+d,yy);ctx.lineTo(xx,yy+d);ctx.closePath();ctx.fill()}}ctx.globalAlpha=1}
      // restrained accent trim gives the garment a tailored, premium edge
      ctx.fillStyle=a;ctx.globalAlpha=.92;ctx.fillRect(0,h*.94,w,h*.018);ctx.restore();
    }
    draw(){
      const ctx=this.ctx;if(!ctx||!this.w)return; const W=this.w,H=this.h;ctx.clearRect(0,0,W,H);
      // stadium-stage vignette, intentionally bright enough to inspect fabric
      const g=ctx.createRadialGradient(W*.5,H*.34,10,W*.5,H*.40,W*.72);g.addColorStop(0,'rgba(255,255,255,.16)');g.addColorStop(.42,'rgba(10,55,70,.16)');g.addColorStop(1,'rgba(1,8,12,.0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
      const view=VIEWS[this.view], light=image(ASSETS[view]);
      if(!ready(light)){ctx.fillStyle='rgba(255,255,255,.7)';ctx.font='700 16px system-ui';ctx.textAlign='center';ctx.fillText('Loading kit preview…',W/2,H/2);wait(light,()=>this.draw());return}
      const iw=light.naturalWidth,ih=light.naturalHeight,ar=iw/ih;let dh=H*.73*this.scale,dw=dh*ar;if(dw>W*.82*this.scale){dw=W*.82*this.scale;dh=dw/ar}const dx=(W-dw)/2,dy=(H-dh)/2+8;
      const temp=document.createElement('canvas');temp.width=Math.max(1,Math.round(dw*this.pixelRatio));temp.height=Math.max(1,Math.round(dh*this.pixelRatio));const t=temp.getContext('2d');t.scale(this.pixelRatio,this.pixelRatio);const tw=dw,th=dh;
      const cfg=this.config||{};
      const signedHome=(cfg.pattern||'stripes')==='stripes' && String(cfg.primary||'').toLowerCase()==='#092d55' && String(cfg.secondary||'').toLowerCase()==='#f4f2ec';
      const signedAway=(cfg.pattern||'geometric')==='geometric' && String(cfg.primary||'').toLowerCase()==='#d9b657';
      const ref=image(REF[this.type][view]);
      if((this.type==='home'&&signedHome)||(this.type==='away'&&signedAway)){
        if(ready(ref)) t.drawImage(ref,0,0,tw,th); else wait(ref,()=>this.draw());
      }else{
        // Custom material mode: exact garment silhouette plus photographic fold/seam lighting.
        t.drawImage(light,0,0,tw,th);t.globalCompositeOperation='source-in';this.makePattern(t,0,0,tw,th);
        t.globalCompositeOperation='multiply';t.globalAlpha=.48;t.drawImage(light,0,0,tw,th);t.globalAlpha=1;
        t.globalCompositeOperation='screen';t.globalAlpha=.10;t.drawImage(light,0,0,tw,th);t.globalAlpha=1;
        t.globalCompositeOperation='source-over';
      }
      // collar and sleeve trim details track the known garment silhouette
      const accent=this.config.accent||'#d8b85b';t.strokeStyle=accent;t.lineWidth=Math.max(2,tw*.012);t.globalAlpha=.9;
      if(view==='front'){t.beginPath();t.arc(tw*.50,th*.095,tw*.105,0.12*Math.PI,.88*Math.PI);t.stroke()}
      else if(view==='back'){t.beginPath();t.arc(tw*.50,th*.088,tw*.10,.12*Math.PI,.88*Math.PI);t.stroke()}
      t.globalAlpha=1;
      // back identity, kept sharp over the fabric render
      if(view==='back'){t.textAlign='center';t.fillStyle='rgba(255,255,255,.94)';t.shadowColor='rgba(0,0,0,.65)';t.shadowBlur=8;t.font=`800 ${Math.round(tw*.075)}px system-ui`;t.fillText(String(this.name||'PLAYER').toUpperCase(),tw*.5,th*.29);t.font=`900 ${Math.round(tw*.26)}px system-ui`;t.fillText(String(this.number||'10'),tw*.5,th*.62);t.shadowBlur=0}
      ctx.save();ctx.shadowColor='rgba(0,0,0,.58)';ctx.shadowBlur=30;ctx.shadowOffsetY=18;ctx.drawImage(temp,dx,dy,dw,dh);ctx.restore();
      // badge asynchronously drawn onto the front/side only
      if(this.badgeSvg&&view!=='back'){const bi=new Image();bi.onload=()=>{ctx.save();const bw=dw*(view==='front'?.13:.10),bh=bw*1.2,bx=view==='front'?dx+dw*.58:dx+dw*.54,by=dy+dh*.25;ctx.shadowColor='rgba(0,0,0,.3)';ctx.shadowBlur=6;ctx.drawImage(bi,bx,by,bw,bh);ctx.restore()};bi.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(this.badgeSvg)}
      // view indicator
      ctx.fillStyle='rgba(4,18,25,.72)';roundedRect(ctx,W/2-58,H-50,116,32,16);ctx.fill();ctx.fillStyle='#f7e3a2';ctx.font='800 12px system-ui';ctx.textAlign='center';ctx.fillText(view==='side'?'3/4 VIEW':view.toUpperCase(),W/2,H-29);
    }
  }
  window.GrassKit3D={KitRenderer};
})();
