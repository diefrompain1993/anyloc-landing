const content = {
  presence: {heading:'Знайте, кто<br> уже на месте.',description:'Входы, выходы и время на объекте. Смотрите присутствие по сотрудникам и подрядчикам, проверяйте историю за нужный период.',points:['Отметки через NFC','Присутствие сейчас и за период','Учёт отработанного времени'],html:`<div class="app-heading"><h4>Присутствие</h4><span>Сегодня · Все объекты</span></div><div class="stat-row"><div class="stat"><strong>24</strong><span>На объектах</span></div><div class="stat"><strong>08</strong><span>Объектов</span></div><div class="stat"><strong>06</strong><span>Подрядчиков</span></div></div><table class="demo-table"><thead><tr><th>Сотрудник</th><th>Объект</th><th>Вход</th><th>Статус</th></tr></thead><tbody><tr><td>Алексей К.</td><td>БЦ «Север»</td><td>08:58</td><td><span class="status">На объекте</span></td></tr><tr><td>Мария В.</td><td>ЖК «Парк»</td><td>09:02</td><td><span class="status">На объекте</span></td></tr><tr><td>Дмитрий С.</td><td>БЦ «Север»</td><td>08:45</td><td><span class="status neutral">Вышел · 12:10</span></td></tr></tbody></table>`},
  reports:{heading:'Результат.<br> Со всеми деталями.',description:'Фото, комментарии и история работ привязаны к объекту. Откройте отчёт и посмотрите, что было сделано — без поиска по перепискам.',points:['Фото и файлы в отчёте','Журналы по объектам','История событий и выгрузка'],html:`<div class="app-heading"><h4>Журнал объекта</h4><span>БЦ «Север»</span></div><div class="stat-row"><div class="stat"><strong>12</strong><span>Отчётов за неделю</span></div><div class="stat"><strong>04</strong><span>Сотрудника</span></div><div class="stat"><strong>03</strong><span>NFC-метки</span></div></div><article class="report-card"><div><h5>Осмотр оборудования</h5><p>Алексей К. · Техническое помещение</p><small>3 фотографии · Комментарий</small></div><span>Сегодня, 10:24</span></article><article class="report-card"><div><h5>Плановое обслуживание</h5><p>Дмитрий С. · Входная группа</p><small>2 фотографии · Файл</small></div><span>Вчера, 16:45</span></article>`},
  tasks:{heading:'От задачи<br> до готовой работы.',description:'Назначайте задачи и следите за статусами. Команда видит, что нужно сделать, а руководитель — как продвигаются работы на объектах.',points:['Задачи с ответственными','Контроль статусов выполнения','Отдельный учёт монтажных работ'],html:`<div class="app-heading"><h4>Задачи на объектах</h4><span>Текущая неделя</span></div><div class="stat-row"><div class="stat"><strong>18</strong><span>Выполнено</span></div><div class="stat"><strong>05</strong><span>В работе</span></div><div class="stat"><strong>03</strong><span>Запланировано</span></div></div><div class="task-line"><span class="task-check">✓</span><div><h5>Проверить систему доступа</h5><p>БЦ «Север» · Алексей К.</p></div><span class="status">Готово</span></div><div class="task-line"><span class="task-check"></span><div><h5>Монтаж оборудования</h5><p>ЖК «Парк» · Дмитрий С.</p></div><span class="status neutral">В работе</span></div><div class="task-line"><span class="task-check"></span><div><h5>Плановый осмотр</h5><p>БЦ «Север» · Мария В.</p></div><span class="status neutral">В плане</span></div>`}
};
const tabs=[...document.querySelectorAll('[data-tab]')];
function setTab(key){const data=content[key];document.querySelector('#demo-heading').innerHTML=data.heading;document.querySelector('#demo-description').textContent=data.description;document.querySelector('#demo-points').innerHTML=data.points.map(x=>`<li>${x}</li>`).join('');document.querySelector('#app-content').innerHTML=data.html;document.querySelector('#demo-panel').setAttribute('aria-labelledby',`tab-${key}`);tabs.forEach(tab=>{const active=tab.dataset.tab===key;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>setTab(tab.dataset.tab));tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(i+1)%tabs.length;else if(event.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();setTab(tabs[next].dataset.tab);tabs[next].focus();});});setTab('presence');

const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const intro=document.querySelector('.intro');
const introPin=document.querySelector('.intro-pin');
const brand=document.querySelector('.intro-brand');
const scrollHint=document.querySelector('.intro-scroll');
const reveal=document.querySelector('.intro-reveal');
const environment=document.querySelector('.intro-environment');
const atmosphere=document.querySelector('.intro-atmosphere');
const groundShadow=document.querySelector('.intro-ground-shadow');
let scrollDriver=null,sceneFrame=()=>false,animationFrame=0,previousTime=0,scrollClock=0;
function requestFrame(){if(!animationFrame&&!document.hidden){previousTime=performance.now();animationFrame=requestAnimationFrame(animate);}}
function animate(time){
  animationFrame=0;
  const delta=Math.min((time-previousTime)/1000||1/60,.05);previousTime=time;
  scrollClock+=delta*1000;scrollDriver?.raf(scrollClock);updateScroll();
  const moving=sceneFrame(delta);
  if((moving||scrollDriver?.isScrolling==='smooth')&&!document.hidden)animationFrame=requestAnimationFrame(animate);
}
let progress=0,introTop=0,introRange=1;
const clamp=value=>Math.max(0,Math.min(1,value));
const smooth=(from,to,value)=>{const t=clamp((value-from)/(to-from));return t*t*(3-2*t);};
const cinematic=(from,to,value)=>{const t=clamp((value-from)/(to-from));return t*t*t*(10+t*(-15+6*t));};
function measureScroll(){introTop=window.scrollY+intro.getBoundingClientRect().top;introRange=Math.max(1,intro.offsetHeight-introPin.offsetHeight);updateScroll();}
function updateScroll(){progress=clamp((window.scrollY-introTop)/introRange);document.querySelector('.header').classList.toggle('is-past-intro',window.scrollY>intro.offsetHeight-100);}
window.addEventListener('scroll',updateScroll,{passive:true});window.addEventListener('resize',measureScroll);new ResizeObserver(measureScroll).observe(intro);measureScroll();
window.addEventListener('scroll',requestFrame,{passive:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(animationFrame);animationFrame=0;}else requestFrame();});
async function initSmoothScroll(){
  const {default:Lenis}=await import('./assets/lenis.module.js');
  const desktop=matchMedia('(min-width: 701px) and (pointer: fine)');
  function configure(){
    scrollDriver?.destroy();scrollDriver=null;
    if(desktop.matches&&!reduced.matches){
      scrollDriver=new Lenis({autoRaf:false,lerp:.065,smoothWheel:true,syncTouch:false,wheelMultiplier:.85,anchors:false});
      scrollDriver.on('virtual-scroll',requestFrame);
      scrollDriver.on('scroll',updateScroll);
    }
    requestFrame();
  }
  document.addEventListener('click',event=>{
    const link=event.target.closest?.('a[href^="#"]');
    if(!scrollDriver||!link||event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    const hash=link.getAttribute('href');
    const target=hash==='#'?document.querySelector('#top'):document.getElementById(decodeURIComponent(hash.slice(1)));
    if(!target)return;
    event.preventDefault();history.pushState(null,'',hash);
    scrollDriver.scrollTo(target,{offset:target===intro?0:-50,lerp:0,duration:1.8,easing:t=>1-Math.pow(1-t,4),onStart:requestFrame,onComplete:()=>{
      if(link.classList.contains('skip')){target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}
    }});
  });
  desktop.addEventListener('change',configure);reduced.addEventListener('change',configure);configure();
}
initSmoothScroll().catch(error=>console.warn('Smooth scrolling unavailable',error));
function presentScene(value){
  const fade=smooth(.015,.21,value);
  brand.style.opacity=String(reduced.matches?1:1-fade);
  brand.style.transform=`translate(-50%,-50%) translateY(${-fade*24}px)`;
  scrollHint.style.opacity=String(reduced.matches?0:1-smooth(.01,.14,value));
  scrollHint.style.visibility=reduced.matches||value>.14?'hidden':'visible';
  reveal.style.opacity=String(reduced.matches?1:smooth(.77,.92,value));
  reveal.style.transform=`translateY(${(1-smooth(.77,.92,value))*18}px)`;
  environment.style.transform=`scale(${1.055-.055*smooth(0,1,value)})`;
  atmosphere.style.opacity=String(.24*(1-smooth(0,.8,value)));
  document.querySelector('.intro-progress i').style.transform=`scaleX(${value})`;
  introPin.dataset.sceneProgress=value.toFixed(4);
}
presentScene(reduced.matches?1:progress);

async function initModel(){
  const THREE=await import('./assets/three.module.js');
  const canvas=document.querySelector('#plate'),stage=document.querySelector('#object-stage');
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.16;
  const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(35,1,.1,100);camera.position.set(0,0,5);
  scene.add(new THREE.HemisphereLight(0xe5effa,0x66615b,1.65));
  const key=new THREE.DirectionalLight(0xfff5e7,2.6);key.position.set(-4,6,5);scene.add(key);
  const fill=new THREE.DirectionalLight(0xc2d9f6,.9);fill.position.set(5,2,3);scene.add(fill);
  const rim=new THREE.DirectionalLight(0xe1ecfa,3.8);rim.position.set(1,5,-4);scene.add(rim);
  const group=new THREE.Group();scene.add(group);
  function roundedPath(w,h,r){const s=new THREE.Shape();s.moveTo(-w/2+r,-h/2);s.lineTo(w/2-r,-h/2);s.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);s.lineTo(w/2,h/2-r);s.quadraticCurveTo(w/2,h/2,w/2-r,h/2);s.lineTo(-w/2+r,h/2);s.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r);s.lineTo(-w/2,-h/2+r);s.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2);return s;}
  const shape=roundedPath(3.35,3.35,.24);
  for(const x of [-1.43,1.43])for(const y of [-1.43,1.43]){const hole=new THREE.Path();hole.absarc(x,y,.075,0,Math.PI*2,true);shape.holes.push(hole);}
  const geo=new THREE.ExtrudeGeometry(shape,{depth:.065,bevelEnabled:true,bevelSegments:5,steps:1,bevelSize:.016,bevelThickness:.016,curveSegments:48});geo.translate(0,0,-.0325);
  // Three registered maps describe a fine powder-coated surface: pigment, roughness, and relief.
  // ExtrudeGeometry uses world-space cap UVs, so one texture spans the whole plate rather than tiling below a pixel.
  let seed=1977;const random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};
  const textureSize=1024,gridSize=513,noise=Float32Array.from({length:gridSize*gridSize},random);
  function surfaceMap(kind){
    const surface=document.createElement('canvas');surface.width=surface.height=textureSize;
    const context=surface.getContext('2d'),pixels=context.createImageData(textureSize,textureSize);
    for(let y=0;y<textureSize;y++)for(let x=0;x<textureSize;x++){
      const gx=x/2,gy=y/2,ix=Math.floor(gx),iy=Math.floor(gy),tx=gx-ix,ty=gy-iy;
      const a=noise[iy*gridSize+ix]*(1-tx)+noise[iy*gridSize+ix+1]*tx;
      const b=noise[(iy+1)*gridSize+ix]*(1-tx)+noise[(iy+1)*gridSize+ix+1]*tx;
      const grain=a*(1-ty)+b*ty,fine=random()-.5;
      const v=kind==='color'?227+grain*16+fine*8:kind==='roughness'?182+grain*54+fine*12:85+grain*85+fine*20;
      const i=(y*textureSize+x)*4;pixels.data[i]=pixels.data[i+1]=pixels.data[i+2]=v;pixels.data[i+3]=255;
    }
    context.putImageData(pixels,0,0);
    const map=new THREE.CanvasTexture(surface);map.wrapS=map.wrapT=THREE.RepeatWrapping;
    map.repeat.set(1/3.35,1/3.35);map.offset.set(.5,.5);map.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),8);
    if(kind==='color')map.colorSpace=THREE.SRGBColorSpace;
    return map;
  }
  const faceMaterial=new THREE.MeshPhysicalMaterial({color:0x474c53,map:surfaceMap('color'),roughness:.6,roughnessMap:surfaceMap('roughness'),metalness:.25,clearcoat:.12,clearcoatRoughness:.48,bumpMap:surfaceMap('bump'),bumpScale:.004,envMapIntensity:.9});
  const edgeMaterial=new THREE.MeshPhysicalMaterial({color:0x282d34,roughness:.3,metalness:.45,clearcoat:.35,clearcoatRoughness:.25});
  const body=new THREE.Mesh(geo,[faceMaterial,edgeMaterial]);group.add(body);
  // Front artwork follows the photographed physical plate in normalized coordinates.
  // Raised white paths stay crisp in perspective and receive the same lighting as the body.
  const ink=new THREE.MeshStandardMaterial({color:0xf4f5f5,roughness:.62,metalness:.02});
  const inkZ=.054,inkRadius=.011;
  const point=(x,y)=>new THREE.Vector3((x-.5)*3.35,(.5-y)*3.35,inkZ);
  function raisedLine(draw){
    const path=new THREE.CurvePath();let cursor;
    const pen={move(x,y){cursor=point(x,y);},line(x,y){const next=point(x,y);path.add(new THREE.LineCurve3(cursor,next));cursor=next;},curve(cx,cy,x,y){const next=point(x,y);path.add(new THREE.QuadraticBezierCurve3(cursor,point(cx,cy),next));cursor=next;}};
    draw(pen);const mesh=new THREE.Mesh(new THREE.TubeGeometry(path,Math.max(96,path.curves.length*80),inkRadius,8,false),ink);group.add(mesh);
    const cap=new THREE.SphereGeometry(inkRadius,12,8);
    for(const end of [path.getPoint(0),path.getPoint(1)]){const bead=new THREE.Mesh(cap,ink);bead.position.copy(end);group.add(bead);}
  }
  function phoneOutline(left,right,top,radius){raisedLine(p=>{p.move(left,1);p.line(left,top+radius);p.curve(left,top,left+radius,top);p.line(right-radius,top);p.curve(right,top,right,top+radius);p.line(right,1);});}
  phoneOutline(.163,.837,.035,.083);
  phoneOutline(.180,.820,.053,.070);
  raisedLine(p=>{p.move(.163,.381);p.curve(.137,.381,.137,.413);p.line(.137,.548);p.curve(.137,.580,.163,.580);});
  raisedLine(p=>{p.move(.837,.225);p.curve(.861,.225,.861,.251);p.line(.861,.300);p.curve(.861,.326,.837,.326);});
  for(const [x,y,sx,sy] of [[.261,.112,1,1],[.743,.112,-1,1],[.261,.593,1,-1],[.743,.593,-1,-1]]){
    raisedLine(p=>{p.move(x,y+.059*sy);p.line(x,y+.010*sy);p.curve(x,y,x+.010*sx,y);p.line(x+.059*sx,y);});
  }
  await document.fonts.load('500 138px Manrope').catch(()=>{});
  const lettering=document.createElement('canvas');lettering.width=lettering.height=2048;
  const letteringContext=lettering.getContext('2d');letteringContext.scale(2,2);letteringContext.fillStyle='#ffffff';letteringContext.textAlign='center';
  letteringContext.font='500 138px Manrope, Arial, sans-serif';letteringContext.fillText('Anyloc',512,793);
  letteringContext.font='500 83px Manrope, Arial, sans-serif';letteringContext.fillText('Anyloc',512,951);
  const front=new THREE.CanvasTexture(lettering);front.colorSpace=THREE.SRGBColorSpace;front.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),8);
  const decal=new THREE.Mesh(new THREE.PlaneGeometry(3.35,3.35),new THREE.MeshStandardMaterial({map:front,transparent:true,depthWrite:false,roughness:.62,metalness:.02,bumpMap:front,bumpScale:.003}));decal.position.z=.055;group.add(decal);
  const tagRadius=.590,tagY=.490;
  const tag=new THREE.Mesh(new THREE.CylinderGeometry(tagRadius,tagRadius,.025,128),new THREE.MeshPhysicalMaterial({color:0xe8ebed,roughness:.46,metalness:.03,clearcoat:.22,clearcoatRoughness:.3}));tag.rotation.x=Math.PI/2;tag.position.set(0,tagY,.066);group.add(tag);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(tagRadius+.007,.006,16,128),new THREE.MeshStandardMaterial({color:0x62666a,metalness:.2,roughness:.5}));ring.position.set(0,tagY,.066);group.add(ring);

  let current=reduced.matches?1:progress,visible=true,dirty=true;
  const baseHalfSize=(3.35+.032)/2;
  function applyCamera(value){
    const width=stage.clientWidth,height=stage.clientHeight;
    const zoom=cinematic(0,.84,value);
    // Frame against both dimensions so all four mounting holes remain visible on wide monitors.
    const nearSide=width>700?Math.min(width*.93,height*.97):Math.max(width,height)*.93;
    const farSide=Math.min(width*.70,height*.57);
    const projectedSide=nearSide+(farSide-nearSide)*zoom;
    const distance=(baseHalfSize*height)/(Math.tan(camera.fov*Math.PI/360)*projectedSide);
    camera.position.z=distance;
    const turn=cinematic(.07,.84,value);
    group.rotation.set(Math.PI*(1-turn)+.09*turn,-.015-.20*turn,-.035*turn);
    group.position.y=.06*turn;
    // Expose a sliver of the setting even in portrait close-ups where the plate extends beyond the viewport.
    const margin=3*(1-smooth(0,.28,value));
    canvas.style.clipPath=`inset(0 ${margin}% round ${12*(1-zoom)}px)`;
    canvas.dataset.facing=turn<.5?'back':'front';
    canvas.dataset.cameraDistance=distance.toFixed(3);
    canvas.dataset.projectedSide=projectedSide.toFixed(1);
    groundShadow.style.width=`${projectedSide*.88}px`;
    groundShadow.style.height=`${projectedSide*.13}px`;
    groundShadow.style.opacity=String(.25*cinematic(.35,.82,value));
    presentScene(value);
  }
  function resize(){const width=stage.clientWidth,height=stage.clientHeight;renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();dirty=true;requestFrame();}
  sceneFrame=delta=>{
    if(!visible)return false;
    const target=reduced.matches?1:progress;
    if(!dirty&&current===target)return false;
    current=reduced.matches?1:current+(target-current)*(1-Math.exp(-delta/.16));
    if(Math.abs(target-current)<.00001)current=target;
    applyCamera(current);renderer.render(scene,camera);dirty=false;
    return current!==target;
  };
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(stage);resize();
  const visibility=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible){current=reduced.matches?1:progress;dirty=true;requestFrame();}},{rootMargin:'150px'});visibility.observe(intro);
  reduced.addEventListener('change',()=>{measureScroll();dirty=true;requestFrame();});
  const environmentTexture=new THREE.TextureLoader();
  environmentTexture.load('assets/atrium.jpg',tex=>{tex.mapping=THREE.EquirectangularReflectionMapping;tex.colorSpace=THREE.SRGBColorSpace;const pmrem=new THREE.PMREMGenerator(renderer);scene.environment=pmrem.fromEquirectangular(tex).texture;scene.environmentIntensity=.85;tex.dispose();pmrem.dispose();dirty=true;requestFrame();});
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();document.documentElement.classList.add('no-webgl');visible=false;presentScene(0);});
  requestFrame();
}
initModel().catch(error=>{console.warn('3D preview unavailable',error);document.documentElement.classList.add('no-webgl');presentScene(0);});
