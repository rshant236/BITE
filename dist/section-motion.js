(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const deck = document.querySelector('.photo-story');
  const photos = [...deck.querySelectorAll('.story-photo')];
  const cards = photos.map((photo, i) => {
    const card = document.createElement('figure');
    card.className = 'ingredient-card';
    const caption = document.createElement('figcaption');
    caption.innerHTML = `<strong>${ingredients[i][0]}</strong><span>0${i + 1} / 06</span>`;
    photo.before(card);
    card.append(photo, caption);
    return card;
  });
  const note = document.createElement('div');
  note.className = 'deck-note';
  note.innerHTML = '<span>SIX GOOD REASONS.</span><b>SCROLL TO DISCOVER ↓</b>';
  deck.append(note);
  const product = deck.querySelector('.story-product-rebuild');
  const clamp = v => Math.max(0, Math.min(1, v));
  window.renderIngredientDeck = p => {
    // The last part of each chapter turns the card out and lifts the next one in.
    const position = Math.min(5, p / .83 * 6);
    const current = Math.floor(position);
    const turn = motion.matches ? 0 : clamp((position - current - .55) / .45);
    const finish = motion.matches ? (p > .87 ? 1 : 0) : clamp((p - .85) / .1);
    cards.forEach((card, i) => {
      const distance = i - current;
      let x = 0, y = 0, rotation = 0, scale = 1, opacity = 0;
      if (distance === 0) {
        x = -85 * turn; y = -16 * turn; rotation = -24 * turn;
        scale = 1 - .08 * turn; opacity = 1 - clamp((turn - .85) / .15);
      } else if (distance > 0 && distance <= 2) {
        const depth = distance - turn;
        x = 5 * depth; y = 3 * depth; rotation = 5 * depth;
        scale = 1 - .045 * depth; opacity = distance === 1 ? 1 : .7;
      }
      card.style.transform = `translate(${x}%, ${y + finish * 25}%) rotate(${rotation + finish * (i % 2 ? 15 : -15)}deg) scale(${scale * (1 - finish * .3)})`;
      card.style.opacity = opacity * (1 - clamp(finish * 2));
      card.style.visibility = opacity * (1 - clamp(finish * 2)) > .01 ? 'visible' : 'hidden';
      card.style.zIndex = 10 - i;
      card.setAttribute('aria-hidden', String(distance !== 0 || finish > .5));
    });
    product.style.opacity = clamp((finish - .5) * 2);
    product.style.transform = `translateY(${(1 - finish) * 35}px) rotate(-8deg) scale(${.8 + finish * .2})`;
    note.style.opacity = 1 - finish;
  };
  const sync = () => {
    const section = document.querySelector('.ingredient-scroll');
    const travel = section.offsetHeight - innerHeight;
    storyUpdate(motion.matches || travel <= 0 ? 0 : clamp(-section.getBoundingClientRect().top / travel));
  };
  let honestTimeline;
  const media = window.gsap?.matchMedia();
  media?.add('(prefers-reduced-motion: no-preference)', () => {
    if (!window.ScrollTrigger) return;
    honestTimeline = gsap.timeline({scrollTrigger:{trigger:'.problem',start:'top top',end:'bottom bottom',scrub:.6},defaults:{ease:'power2.inOut'}})
      .from('.honest-intro',{xPercent:-12,opacity:.3,duration:.2},0)
      .from('.honest-boring',{xPercent:12,opacity:.3,duration:.2},.03)
      .from('.problem-lines p',{y:22,opacity:0,stagger:.05,duration:.13},.1)
      .to('.honest-boring i',{scaleX:1,duration:.18},.3)
      .fromTo('.honest-unwrapped',{rotation:-12,y:35},{rotation:6,y:-15,duration:.5},0)
      .to('.honest-unwrapped',{autoAlpha:0,scale:.85,duration:.12},.53)
      .fromTo('.honest-wrapped',{autoAlpha:0,rotation:16,scale:.8},{autoAlpha:1,rotation:-12,scale:1,duration:.22},.66)
      .to('.problem h2, .problem-lines',{y:-45,autoAlpha:0,duration:.15},.53)
      .to('.honest-stage',{backgroundColor:'#ef642f',duration:.24},.55)
      .fromTo('.honest-payoff',{y:50,autoAlpha:0},{y:0,autoAlpha:1,duration:.2},.66)
      .to('.honest-footer i',{scaleX:1,duration:1,ease:'none'},0);
    return () => { honestTimeline = null; };
  });
  motion.addEventListener('change', sync);
  window.addEventListener('pageshow', sync);
  sync();
  document.fonts.ready.then(() => { window.ScrollTrigger?.refresh(); if (honestTimeline) honestTimeline.progress(honestTimeline.scrollTrigger.progress); sync(); });
})();

