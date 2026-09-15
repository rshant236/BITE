(() => {
  const video=document.querySelector('#hero-video');
  const hero=document.querySelector('.hero-scroll');
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  let progress=0,paused=false,target=0,raf=0;
  const toggle=document.createElement('button');toggle.className='hero-pause';toggle.textContent='Pause motion';toggle.setAttribute('aria-pressed','false');document.querySelector('.hero').append(toggle);
  function seek(){raf=0;if(paused||motion.matches||!Number.isFinite(video.duration)||video.seeking)return;target=progress*Math.max(0,video.duration-.08);if(Math.abs(video.currentTime-target)>.045){try{video.currentTime=target}catch{}}}
  function schedule(){if(!raf)raf=requestAnimationFrame(seek)}
  video.addEventListener('seeked',schedule);video.addEventListener('loadedmetadata',schedule);video.addEventListener('loadeddata',schedule);
  toggle.onclick=()=>{paused=!paused;toggle.textContent=paused?'Resume motion':'Pause motion';toggle.setAttribute('aria-pressed',String(paused));if(!paused)schedule()};
  if(!motion.matches&&window.ScrollTrigger){ScrollTrigger.create({trigger:hero,start:'top top',end:'bottom bottom',onUpdate:s=>{progress=s.progress;document.querySelector('.hero-timeline b').style.transform=`scaleX(${progress})`;document.querySelector('#hero-chapter').textContent=progress<.33?'01 / BIG ON FLAVOR':progress<.68?'02 / NOTHING BORING':'03 / ALL THE GOOD STUFF';schedule()}});gsap.to('.hero-product',{y:-35,rotation:-4,scrollTrigger:{trigger:hero,start:'top top',end:'bottom bottom',scrub:.7}})}
  function syncHero(){if(motion.matches)return;const travel=hero.offsetHeight-innerHeight;progress=travel>0?Math.max(0,Math.min(1,-hero.getBoundingClientRect().top/travel)):0;document.querySelector('.hero-timeline b').style.transform=`scaleX(${progress})`;document.querySelector('#hero-chapter').textContent=progress<.33?'01 / BIG ON FLAVOR':progress<.68?'02 / NOTHING BORING':'03 / ALL THE GOOD STUFF';schedule();}window.addEventListener('scroll',syncHero,{passive:true});window.addEventListener('resize',syncHero);window.addEventListener('pageshow',syncHero);video.addEventListener('loadedmetadata',syncHero);syncHero();if(motion.matches)video.preload='none';
  const controls=document.createElement('div');controls.className='film-controls';controls.innerHTML='<button type="button" aria-label="Previous ingredient">← Previous</button><button type="button" aria-label="Next ingredient">Next →</button>';document.querySelector('.ingredient-detail').append(controls);
  let manualIndex=0;
  controls.querySelectorAll('button').forEach((b,i)=>b.onclick=()=>{const section=document.querySelector('.ingredient-scroll');if(motion.matches||!window.ScrollTrigger){manualIndex=(manualIndex+(i?1:-1)+6)%6;storyUpdate((manualIndex+.1)/6*.83);return}const travel=section.offsetHeight-innerHeight;const p=Math.max(0,Math.min(1,(scrollY-section.offsetTop)/travel));const k=Math.floor(Math.min(.999,p/.83)*6);const next=Math.max(0,Math.min(5,k+(i?1:-1)));scrollTo({top:section.offsetTop+(next+.15)/6*.83*travel,behavior:'smooth'})});
  storyUpdate(0);window.addEventListener('pageshow',()=>window.ScrollTrigger?.refresh());
})();
