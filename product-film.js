(() => {
  const root=document.querySelector('.hero-scroll'),stage=root.querySelector('.product-film');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const rigs=[...root.querySelectorAll('.bar-rig')],sprites=[...root.querySelectorAll('.ingredient-sprite')];
  const step=document.querySelector('.film-step-copy');
  const chapter=document.querySelector('#hero-chapter');
  const timelineBar=document.querySelector('.hero-timeline b');
  const pause=document.querySelector('.hero-pause');
  const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
  let progress=0,frame=0,paused=false,timeline=null;
  const stages=['01 / MEET YOUR BITE','02 / UNWRAP THE GOOD','03 / NOTHING TO HIDE','04 / ALL TOGETHER'];
  const copy=[['',''],['Big flavor.<br>Under wraps.','Keep scrolling. The good stuff is just getting started.'],['Every little thing.<br>Doing its thing.','A little crunch. A little richness. A whole lot of BITE.'],['All the good.<br>Back together.','Your next big BITE is ready.']];
  let chapterIndex=-1;
  const heading=root.querySelector('h1'),intro=root.querySelector('.hero-subcopy'),cta=root.querySelector('.hero-primary');
  function layoutCopy(){
    const hero=root.querySelector('.hero'),box=hero.getBoundingClientRect();
    const mobile=innerWidth<=760,gap=mobile?16:24;
    const copyTop=heading.getBoundingClientRect().bottom-box.top+gap;
    intro.style.top=step.style.top=`${copyTop}px`;
    const content=chapterIndex>0&&!reduced.matches?step:intro;
    const buttonTop=copyTop+content.offsetHeight+gap;
    cta.style.top=`${buttonTop}px`;
    if(mobile){
      const productTop=buttonTop+cta.offsetHeight+20;
      stage.style.top=`${productTop}px`;
      stage.style.height=`${Math.max(70,box.height-productTop-95)}px`;
    }else{stage.style.removeProperty('top');stage.style.removeProperty('height');}
  }
  function updateCopy(p){const i=p<.12?0:p<.41?1:p<.81?2:3;if(i!==chapterIndex){chapterIndex=i;chapter.textContent=stages[i];step.innerHTML=copy[i][0]+(copy[i][1]?'<p>'+copy[i][1]+'</p>':'');}timelineBar.style.transform=`scaleX(${p})`;}
  function buildTimeline(){if(!window.gsap||reduced.matches)return;timeline=gsap.timeline({paused:true,onUpdate:layoutCopy,defaults:{ease:'sine.inOut'}});
    // Small staging changes become a pronounced product reveal during the middle beat.
    timeline.to('.hero h1',{yPercent:-12,scale:.83,transformOrigin:'left top',duration:.23},.08)
      .to('.hero-subcopy',{autoAlpha:0,y:-18,duration:.13},.1)
      .fromTo(step,{autoAlpha:0,y:15},{autoAlpha:1,y:0,duration:.17},.17)
      .to('.film-camera',{rotationY:-7,rotationX:3,duration:.3},.14)
      .to('.film-camera',{rotationY:6,rotationX:-3,duration:.3},.49)
      .to('.film-camera',{rotationY:0,rotationX:0,duration:.16},.84)
      .to('.film-ground-shadow',{scaleX:1.18,opacity:.5,duration:.4},.18)
      .to('.film-ground-shadow',{scaleX:1,opacity:1,duration:.2},.8);
    rigs.forEach((rig,i)=>{const core=rig.querySelector('.bar-core'),seal=rig.querySelector('.wrapper-seal'),sleeve=rig.querySelector('.wrapper-sleeve');const offset=i*.025;const dir=i-1;
      timeline.set(core,{autoAlpha:0},0).set(core,{autoAlpha:1},.15+offset).set(core,{autoAlpha:0},.98+offset*.1).to(rig,{xPercent:dir*24,yPercent:[-3,-9,-13][i],rotation:[-20,3,17][i],scale:1.04,duration:.34},.1+offset)
        // Fade the complete wrapper together; never expose detached foil pieces.
        .to([seal,sleeve],{autoAlpha:0,duration:.12},.15+offset)
        .fromTo(core,{scale:.94},{scale:1,rotation:0,duration:.28},.19+offset)
        .to(rig,{yPercent:[-8,-2,2][i],rotation:[-13,-4,11][i],duration:.25},.48)
        .to(rig,{xPercent:dir*6,yPercent:[4,-1,-5][i],rotation:[-12,2,13][i],scale:1,duration:.2},.8)
        .to([seal,sleeve],{autoAlpha:1,duration:.09},.84+offset);
    });
    sprites.forEach((sprite,i)=>{const side=i%2?1:-1;timeline.fromTo(sprite,{scale:.55,autoAlpha:0,xPercent:-side*15,yPercent:24,rotation:side*18},{scale:1,autoAlpha:1,xPercent:side*15,yPercent:-25,rotation:-side*15,duration:.28},.17+i*.012)
      .to(sprite,{xPercent:side*38,yPercent:i%3?10:-50,rotation:side*29,scale:1.08,duration:.31},.46)
      .to(sprite,{xPercent:-side*65,yPercent:i<4?75:-100,rotation:0,scale:.45,autoAlpha:0,duration:.17},.79+i*.008);
    });
    timeline.to({}, {duration:.001},1);timeline.progress(progress).pause();
  }
  function update(){frame=0;if(paused||reduced.matches)return;const travel=root.offsetHeight-innerHeight;const p=travel>0?clamp(-root.getBoundingClientRect().top/travel):0;progress=p;updateCopy(p);if(timeline){gsap.to(timeline,{progress:p,duration:.5,ease:'power2.out',overwrite:true});}}
  function schedule(){if(!frame)frame=requestAnimationFrame(update)}
  pause.addEventListener('click',()=>{paused=!paused;pause.setAttribute('aria-pressed',String(paused));pause.textContent=paused?'Resume motion':'Pause motion';if(paused&&timeline)gsap.killTweensOf(timeline);else schedule()});
  buildTimeline();updateCopy(0);layoutCopy();document.fonts.ready.then(layoutCopy);window.addEventListener('resize',layoutCopy);schedule();window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);window.addEventListener('pageshow',schedule);
  reduced.addEventListener('change',()=>{if(timeline){gsap.killTweensOf(timeline);timeline.progress(0).kill();timeline=null}if(!reduced.matches)buildTimeline();paused=false;pause.setAttribute('aria-pressed','false');pause.textContent='Pause motion';updateCopy(0);schedule()});
  // Keep every image available for reverse scroll and avoid a decoding pause mid-reveal.
  stage.querySelectorAll('img').forEach(im=>{if(im.decode)im.decode().catch(()=>{});});
  const controls=document.createElement('div');controls.className='film-controls';controls.innerHTML='<button type="button" aria-label="Previous ingredient">← Previous</button><button type="button" aria-label="Next ingredient">Next →</button>';document.querySelector('.ingredient-detail').append(controls);let manualIndex=0;
  controls.querySelectorAll('button').forEach((b,i)=>b.onclick=()=>{const section=document.querySelector('.ingredient-scroll');if(reduced.matches||!window.ScrollTrigger){manualIndex=(manualIndex+(i?1:-1)+6)%6;storyUpdate((manualIndex+.1)/6*.83);return}const travel=section.offsetHeight-innerHeight;const p=clamp((scrollY-section.offsetTop)/travel);const k=Math.floor(Math.min(.999,p/.83)*6);const next=clamp(k+(i?1:-1),0,5);scrollTo({top:section.offsetTop+(next+.15)/6*.83*travel,behavior:'smooth'})});
  storyUpdate(0);document.fonts.ready.then(()=>window.ScrollTrigger?.refresh());
})();




