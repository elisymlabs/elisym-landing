import { useRef, useEffect } from "react";

const SHADER_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:100%;height:100%;overflow:hidden;background:#0a0a0a}
  canvas{display:block;width:100vw;height:100vh}
</style>
</head>
<body>
<canvas id="canvas"></canvas>
<script>
(function(){
  var canvas=document.getElementById('canvas');
  var ctx=canvas.getContext('2d');
  var prefersReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var dpr=Math.min(window.devicePixelRatio||1,2);
  var W=0,H=0,running=true;
  var IMPULSE_RATE=0.7,SPRING_TENSION=1.0,IMPULSE_STRENGTH=1.0;
  var COLS=40,ROWS=25,DAMPING=0.978,RETURN_FORCE=0.003,SPRING_K_BASE=0.12;
  var nodeCount=COLS*ROWS;
  var posX=new Float32Array(nodeCount),posY=new Float32Array(nodeCount);
  var velX=new Float32Array(nodeCount),velY=new Float32Array(nodeCount);
  var restX=new Float32Array(nodeCount),restY=new Float32Array(nodeCount);
  var springs=[],flashes=[],lastTime=0,timeSinceImpulse=0,impulseInterval=1.0/IMPULSE_RATE;
  var spacingX=0,spacingY=0,marginX=0,marginY=0,screenFlash=0;

  function idx(c,r){return r*COLS+c}

  function buildGrid(){
    marginX=W*0.06;marginY=H*0.06;
    spacingX=(W-marginX*2)/(COLS-1);spacingY=(H-marginY*2)/(ROWS-1);
    for(var r=0;r<ROWS;r++)for(var c=0;c<COLS;c++){
      var i=idx(c,r),x=marginX+c*spacingX,y=marginY+r*spacingY;
      restX[i]=x;restY[i]=y;posX[i]=x;posY[i]=y;velX[i]=0;velY[i]=0;
    }
    springs=[];
    for(var r=0;r<ROWS;r++)for(var c=0;c<COLS;c++){
      var i=idx(c,r);
      if(c<COLS-1)springs.push(i,idx(c+1,r),spacingX);
      if(r<ROWS-1)springs.push(i,idx(c,r+1),spacingY);
    }
  }

  function resize(){
    dpr=Math.min(window.devicePixelRatio||1,2);W=window.innerWidth;H=window.innerHeight;
    canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr);
    canvas.style.width=W+'px';canvas.style.height=H+'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);buildGrid();
  }

  var mouseDown=false;
  var isMobile='ontouchstart' in window||navigator.maxTouchPoints>0;
  canvas.addEventListener('mousedown',function(e){mouseDown=true;injectMouseImpulse(e.clientX,e.clientY)});
  canvas.addEventListener('mousemove',function(e){if(mouseDown)injectMouseImpulse(e.clientX,e.clientY)});
  canvas.addEventListener('mouseup',function(){mouseDown=false});
  if(!isMobile){
    canvas.addEventListener('touchstart',function(e){e.preventDefault();mouseDown=true;injectMouseImpulse(e.touches[0].clientX,e.touches[0].clientY)},{passive:false});
    canvas.addEventListener('touchmove',function(e){e.preventDefault();if(mouseDown)injectMouseImpulse(e.touches[0].clientX,e.touches[0].clientY)},{passive:false});
    canvas.addEventListener('touchend',function(){mouseDown=false});
  }

  function injectMouseImpulse(mx,my){
    var strength=18*IMPULSE_STRENGTH,radius=4;
    for(var r=0;r<ROWS;r++)for(var c=0;c<COLS;c++){
      var i=idx(c,r),dx=restX[i]-mx,dy=restY[i]-my;
      var dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<radius*Math.max(spacingX,spacingY)&&dist>0.1){
        var falloff=1-dist/(radius*Math.max(spacingX,spacingY));falloff*=falloff;
        velX[i]+=(dx/dist)*strength*falloff;velY[i]+=(dy/dist)*strength*falloff;
      }
    }
    flashes.push({x:mx,y:my,life:1.0,ring:1.0});screenFlash=0.03;
  }

  window.addEventListener('resize',resize);resize();

  function injectSingleImpulse(edge,strength){
    var regionSize=4+Math.floor(Math.random()*6),startNode,flashX,flashY;
    if(edge===0){startNode=Math.floor(Math.random()*Math.max(1,COLS-regionSize));flashX=marginX+(startNode+regionSize*0.5)*spacingX;flashY=marginY;for(var c=startNode;c<startNode+regionSize&&c<COLS;c++){var i=idx(c,0);var falloff=1-Math.abs(c-startNode-regionSize*0.5)/(regionSize*0.5);velY[i]+=strength*falloff*falloff}}
    else if(edge===1){startNode=Math.floor(Math.random()*Math.max(1,ROWS-regionSize));flashX=marginX+(COLS-1)*spacingX;flashY=marginY+(startNode+regionSize*0.5)*spacingY;for(var r=startNode;r<startNode+regionSize&&r<ROWS;r++){var i=idx(COLS-1,r);var falloff=1-Math.abs(r-startNode-regionSize*0.5)/(regionSize*0.5);velX[i]-=strength*falloff*falloff}}
    else if(edge===2){startNode=Math.floor(Math.random()*Math.max(1,COLS-regionSize));flashX=marginX+(startNode+regionSize*0.5)*spacingX;flashY=marginY+(ROWS-1)*spacingY;for(var c=startNode;c<startNode+regionSize&&c<COLS;c++){var i=idx(c,ROWS-1);var falloff=1-Math.abs(c-startNode-regionSize*0.5)/(regionSize*0.5);velY[i]-=strength*falloff*falloff}}
    else{startNode=Math.floor(Math.random()*Math.max(1,ROWS-regionSize));flashX=marginX;flashY=marginY+(startNode+regionSize*0.5)*spacingY;for(var r=startNode;r<startNode+regionSize&&r<ROWS;r++){var i=idx(0,r);var falloff=1-Math.abs(r-startNode-regionSize*0.5)/(regionSize*0.5);velX[i]+=strength*falloff*falloff}}
    flashes.push({x:flashX,y:flashY,life:1.0,ring:1.0});
  }

  function injectImpulse(){
    var baseStrength=(22+Math.random()*14)*IMPULSE_STRENGTH;
    injectSingleImpulse(Math.floor(Math.random()*4),baseStrength);
    screenFlash=0.04;
  }

  function simulate(dt){
    if(prefersReduced)return;
    var springK=SPRING_K_BASE*SPRING_TENSION,springCount=springs.length/3;
    for(var s=0;s<springCount;s++){
      var s3=s*3,a=springs[s3],b=springs[s3+1],restLen=springs[s3+2];
      var dx=posX[b]-posX[a],dy=posY[b]-posY[a],dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<0.001)continue;
      var force=springK*(dist-restLen)/dist,fx=dx*force,fy=dy*force;
      velX[a]+=fx;velY[a]+=fy;velX[b]-=fx;velY[b]-=fy;
    }
    for(var i=0;i<nodeCount;i++){
      velX[i]+=(restX[i]-posX[i])*RETURN_FORCE;velY[i]+=(restY[i]-posY[i])*RETURN_FORCE;
      velX[i]*=DAMPING;velY[i]*=DAMPING;posX[i]+=velX[i];posY[i]+=velY[i];
    }
  }

  function tensionColor(tension){
    var t=tension<0?0:(tension>1?1:tension);var r,g,b,a;
    if(t<0.1){var f=t/0.1;r=40+f*20;g=14+f*8;b=5+f*3;a=0.25+f*0.1}
    else if(t<0.3){var f=(t-0.1)/0.2;r=60+f*120;g=22+f*38;b=8+f*8;a=0.35+f*0.2}
    else if(t<0.55){var f=(t-0.3)/0.25;r=180+f*50;g=60+f*60;b=16+f*14;a=0.55+f*0.2}
    else if(t<0.8){var f=(t-0.55)/0.25;r=230+f*25;g=120+f*100;b=30+f*90;a=0.75+f*0.15}
    else{var f=(t-0.8)/0.2;r=255;g=220+f*35;b=120+f*120;a=0.9+f*0.1}
    return{r:Math.round(r),g:Math.round(g),b:Math.round(b),a:a};
  }

  function render(now){
    if(!running)return;
    var time=now*0.001,dt=lastTime===0?0.016:(time-lastTime);
    if(dt>0.1)dt=0.016;lastTime=time;
    timeSinceImpulse+=dt;impulseInterval=1.8/IMPULSE_RATE;
    if(timeSinceImpulse>=impulseInterval){injectImpulse();timeSinceImpulse-=impulseInterval;timeSinceImpulse-=Math.random()*impulseInterval*0.3}
    simulate(dt);

    ctx.globalCompositeOperation='source-over';
    ctx.fillStyle='rgba(10, 8, 6, 0.35)';ctx.fillRect(0,0,W,H);
    if(screenFlash>0.001){ctx.fillStyle='rgba(220, 100, 25, '+screenFlash.toFixed(4)+')';ctx.fillRect(0,0,W,H);screenFlash*=0.88}

    var avgSpacing=(spacingX+spacingY)*0.5,tensionScale=1.0/(avgSpacing*0.35);
    var breathe=0.85+0.15*Math.sin(time*0.8);
    ctx.globalCompositeOperation='lighter';ctx.lineCap='round';
    var springCount=springs.length/3;

    for(var s=0;s<springCount;s++){
      var s3=s*3,a=springs[s3],b=springs[s3+1],restLen=springs[s3+2];
      var ax=posX[a],ay=posY[a],bx=posX[b],by=posY[b];
      var dx=bx-ax,dy=by-ay,dist=Math.sqrt(dx*dx+dy*dy);
      var tension=Math.abs(dist-restLen)*tensionScale;var col=tensionColor(tension);
      var baseGlowAlpha=(0.04+tension*0.18)*breathe;
      if(baseGlowAlpha>0.005){ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(bx,by);ctx.strokeStyle='rgba('+col.r+','+col.g+','+col.b+','+baseGlowAlpha.toFixed(4)+')';ctx.lineWidth=3.5+tension*8;ctx.stroke()}
    }
    for(var s=0;s<springCount;s++){
      var s3=s*3,a=springs[s3],b=springs[s3+1],restLen=springs[s3+2];
      var ax=posX[a],ay=posY[a],bx=posX[b],by=posY[b];
      var dx=bx-ax,dy=by-ay,dist=Math.sqrt(dx*dx+dy*dy);
      var tension=Math.abs(dist-restLen)*tensionScale;var col=tensionColor(tension);
      var coreAlpha=(0.12+tension*0.6)*breathe;if(coreAlpha>1)coreAlpha=1;
      ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(bx,by);ctx.strokeStyle='rgba('+col.r+','+col.g+','+col.b+','+coreAlpha.toFixed(4)+')';ctx.lineWidth=0.6+tension*1.6;ctx.stroke();
    }

    var velocityThreshold=3.0;
    for(var i=0;i<nodeCount;i++){
      var vx=velX[i],vy=velY[i],speed=Math.sqrt(vx*vx+vy*vy),brightness=speed*0.2;
      if(brightness<0.02)continue;if(brightness>1)brightness=1;
      var nr,ng,nb;
      if(brightness<0.25){var nf=brightness/0.25;nr=15+nf*10;ng=30+nf*170;nb=70+nf*185}
      else if(brightness<0.6){var nf=(brightness-0.25)/0.35;nr=25+nf*210;ng=200+nf*20;nb=255}
      else{var nf=(brightness-0.6)/0.4;nr=235+nf*20;ng=220+nf*35;nb=255}
      var nodeAlpha=0.12+brightness*0.75,nodeRadius=0.8+brightness*2.0;
      if(speed>velocityThreshold){
        var bloomIntensity=(speed-velocityThreshold)/15.0;if(bloomIntensity>1)bloomIntensity=1;
        var haloRadius=4+bloomIntensity*12,haloAlpha=bloomIntensity*0.35;
        var haloR=Math.round(220+bloomIntensity*35),haloG=Math.round(80+bloomIntensity*60),haloB=Math.round(15+bloomIntensity*40);
        ctx.beginPath();ctx.arc(posX[i],posY[i],haloRadius,0,Math.PI*2);ctx.fillStyle='rgba('+haloR+','+haloG+','+haloB+','+haloAlpha.toFixed(3)+')';ctx.fill();
        var coreBloomRadius=2+bloomIntensity*4,coreBloomAlpha=bloomIntensity*0.6;
        ctx.beginPath();ctx.arc(posX[i],posY[i],coreBloomRadius,0,Math.PI*2);ctx.fillStyle='rgba(255, 220, 170, '+coreBloomAlpha.toFixed(3)+')';ctx.fill();
      }
      ctx.beginPath();ctx.arc(posX[i],posY[i],nodeRadius,0,Math.PI*2);ctx.fillStyle='rgba('+Math.round(nr)+','+Math.round(ng)+','+Math.round(nb)+','+nodeAlpha.toFixed(3)+')';ctx.fill();
    }

    for(var fi=flashes.length-1;fi>=0;fi--){
      var flash=flashes[fi];flash.life-=dt*2.0;if(flash.ring!==undefined)flash.ring-=dt*1.8;
      if(flash.life<=0){flashes.splice(fi,1);continue}
      var fl=flash.life,flashRadius=(1-fl)*100+20,flashAlpha=fl*fl*0.8;
      var grad=ctx.createRadialGradient(flash.x,flash.y,0,flash.x,flash.y,flashRadius);
      grad.addColorStop(0,'rgba(255, 210, 150, '+flashAlpha.toFixed(3)+')');
      grad.addColorStop(0.2,'rgba(240, 120, 30, '+(flashAlpha*0.6).toFixed(3)+')');
      grad.addColorStop(0.5,'rgba(180, 70, 10, '+(flashAlpha*0.25).toFixed(3)+')');
      grad.addColorStop(1,'rgba(120, 40, 5, 0)');
      ctx.beginPath();ctx.arc(flash.x,flash.y,flashRadius,0,Math.PI*2);ctx.fillStyle=grad;ctx.fill();
      if(flash.ring!==undefined&&flash.ring>0){
        var ringProgress=1-flash.ring,ringRadius=15+ringProgress*120,ringAlpha=flash.ring*flash.ring*0.5;
        ctx.beginPath();ctx.arc(flash.x,flash.y,ringRadius,0,Math.PI*2);ctx.strokeStyle='rgba(240, 130, 40, '+ringAlpha.toFixed(3)+')';ctx.lineWidth=2.0*flash.ring;ctx.stroke();
      }
    }

    ctx.globalCompositeOperation='source-over';
    var vcx=W*0.5,vcy=H*0.5,maxDim=Math.max(W,H);
    var vignette=ctx.createRadialGradient(vcx,vcy,maxDim*0.25,vcx,vcy,maxDim*0.72);
    vignette.addColorStop(0,'rgba(10, 8, 6, 0)');vignette.addColorStop(1,'rgba(10, 8, 6, 0.6)');
    ctx.fillStyle=vignette;ctx.fillRect(0,0,W,H);
    requestAnimationFrame(render);
  }

  ctx.fillStyle='#08080e';ctx.fillRect(0,0,W,H);
  injectImpulse();requestAnimationFrame(render);

  document.addEventListener('visibilitychange',function(){
    if(document.hidden){running=false}else{running=true;lastTime=0;requestAnimationFrame(render)}
  });
})();
<\/script>
</body>
</html>`;

export function ShaderBackground() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = SHADER_HTML;
    }
  }, []);

  return (
    <iframe
      ref={iframeRef}
      className="fixed inset-0 w-full h-full border-none pointer-events-none sm:pointer-events-auto"
      style={{ filter: "brightness(1.1)", zIndex: 0 }}
      title="background shader"
    />
  );
}
