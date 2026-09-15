(() => {
  const details = [
    {name:'Dark Chocolate',tag:'THE ORIGINAL OBSESSION',summary:'Deep cocoa, a rich chocolate finish and a satisfying crunch. The BITE for people who always pick the chocolate one.',taste:'Rich · Dark · Crunchy',moment:'Your moment: a little chocolate escape between the big things.',color:'#edba91',asset:'chocolate'},
    {name:'Peanut Butter',tag:'THE SMOOTH OPERATOR',summary:'Roasted peanut character and smooth, nutty richness. A familiar favourite with a big BITE personality.',taste:'Roasted · Nutty · Smooth',moment:'Your moment: the afternoon break you look forward to.',color:'#e8ce7d',asset:'peanut'},
    {name:'Almond Sea Salt',tag:'THE SWEET SPOT',summary:'Warm almond flavour, a proper crunch and a little sea-salt finish. Sweet and savoury, all coming together.',taste:'Nutty · Crunchy · Salty',moment:'Your moment: a desk-side pause or a snack for the long way home.',color:'#e8dec9',asset:'almond'},
    {name:'Berry Cacao',tag:'THE WILD CARD',summary:'Bright berry character meets deep cacao. A bold, fruity twist for days that call for something a little different.',taste:'Fruity · Bright · Cocoa',moment:'Your moment: pack a little colour for your next adventure.',color:'#d6a2aa',asset:'berry'}
  ];
  const dialog = document.querySelector('#flavor-dialog');
  let previousOverflow = '';
  const openFlavor = index => {
    const d = details[index];
    dialog.style.setProperty('--flavor-color', d.color);
    dialog.querySelector('#flavor-title').textContent = d.name;
    dialog.querySelector('#flavor-tagline').textContent = d.tag;
    dialog.querySelector('#flavor-summary').textContent = d.summary;
    dialog.querySelector('#flavor-taste').textContent = d.taste;
    dialog.querySelector('#flavor-moment').textContent = d.moment;
    const img = dialog.querySelector('.flavor-dialog-art img');
    img.src = `assets/branded/wrapper-${d.asset}.webp`;
    img.alt = `BITE ${d.name} protein bar`;
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
  };
  document.querySelectorAll('[data-flavor]').forEach(button => {
    button.setAttribute('aria-label', `Explore ${details[+button.dataset.flavor].name} flavour`);
    button.setAttribute('aria-haspopup', 'dialog');
    button.onclick = () => openFlavor(+button.dataset.flavor);
  });
  dialog.querySelectorAll('.flavor-close,.flavor-done').forEach(button => button.onclick = () => dialog.close());
  dialog.addEventListener('click', e => {
    const r = dialog.getBoundingClientRect();
    if (e.target === dialog && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => { document.body.style.overflow = previousOverflow; });

  const moments = [
    ['MOVE.','07:00 / THE EARLY START','01 / THE GYM','One more rep.<br>One good BITE.',"Your gym bag's best-kept secret.",'gym','chocolate','#bd4b2a','Gym equipment'],
    ['FOCUS.','14:30 / A BETTER BREAK','02 / THE OFFICE','Big ideas.<br>Better breaks.','Close the tabs. Open something good.','office','peanut','#71513e','A workspace'],
    ['ROAM.','17:15 / THE LONG WAY HOME','03 / ON THE MOVE','Next stop.<br>Something good.','A little fuel for wherever you end up.','travel','berry','#854552','A moment on the move'],
    ['RESET.','18:00 / A LITTLE FRESH AIR','04 / THE OUTDOORS','Take the long way.<br>Bring a BITE.','Less screen time. More outside time.','outdoors','almond','#465645','An outdoor landscape']
  ];
  const section = document.querySelector('.lifestyle'), stage = section.querySelector('.life-stage');
  const photo = section.querySelector('.day-photo img'), pack = section.querySelector('.day-product img');
  const tabs = [...section.querySelectorAll('.day-tabs button')];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let active = -1;
  const renderDay = p => {
    const index = Math.min(3, Math.floor(p * 4));
    const local = p * 4 - index;
    if (index !== active) {
      const m = moments[index];
      section.querySelector('.day-word').textContent = m[0];
      section.querySelector('.day-time').textContent = m[1];
      section.querySelector('.life-caption span').textContent = m[2];
      section.querySelector('.life-caption h3').innerHTML = m[3];
      section.querySelector('.life-caption p').textContent = m[4];
      photo.src = `assets/${m[5]}.jpg`; photo.alt = m[8];
      pack.src = `assets/branded/wrapper-${m[6]}.webp`; pack.alt = `BITE ${details.find(d=>d.asset===m[6]).name} protein bar`;
      tabs.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
      if (window.gsap && !motion.matches) {
        gsap.to(stage, {backgroundColor:m[7],duration:.45,overwrite:true});
        gsap.fromTo([photo,pack], {opacity:.3}, {opacity:1,duration:.35,overwrite:true});
        gsap.fromTo(section.querySelector('.life-caption'), {y:20,opacity:.2}, {y:0,opacity:1,duration:.4,overwrite:true});
      } else stage.style.backgroundColor = m[7];
      active = index;
    }
    if (window.gsap && !motion.matches) {
      gsap.set(section.querySelector('.day-product'), {rotation:-5+local*14,yPercent:8-local*16});
      gsap.set(photo, {scale:1.15-local*.1,yPercent:local*-3});
      gsap.set(section.querySelector('.day-word'), {xPercent:local*-9});
    }
  };
  const media = window.gsap?.matchMedia();
  media?.add('(prefers-reduced-motion: no-preference)', () => {
    if (window.ScrollTrigger) ScrollTrigger.create({trigger:section,start:'top top',end:'bottom bottom',onUpdate:s=>renderDay(s.progress),onRefresh:s=>renderDay(s.progress)});
  });
  tabs.forEach((button, i) => button.onclick = () => {
    if (motion.matches || !window.ScrollTrigger) renderDay((i+.05)/4);
    else scrollTo({top:section.offsetTop+(i+.05)/4*(section.offsetHeight-innerHeight),behavior:'smooth'});
  });
  moments.forEach(m => {const image = new Image();image.src=`assets/branded/wrapper-${m[6]}.webp`;});
  renderDay(0);
  document.fonts.ready.then(() => window.ScrollTrigger?.refresh());
})();
