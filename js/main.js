// Accessible carousel for the hero
(function(){
  'use strict'
  const track = document.getElementById('carousel-track');
  const slides = Array.from(track.querySelectorAll('.slide'));
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const indicators = document.getElementById('indicators');
  let current = 0;

  function buildIndicators(){
    slides.forEach((_,i)=>{
      const btn = document.createElement('button');
      btn.className = 'indicator';
      btn.setAttribute('role','tab');
      btn.setAttribute('aria-selected', i===0 ? 'true' : 'false');
      btn.setAttribute('aria-controls','carousel-track');
      btn.setAttribute('data-index',i);
      btn.title = `Show slide ${i+1}`;
      btn.addEventListener('click', ()=>goTo(i));
      indicators.appendChild(btn);
    })
  }

  function update(){
    slides.forEach((s,i)=>{
      const hidden = i!==current;
      s.setAttribute('aria-hidden', hidden ? 'true' : 'false');
    });
    const dots = Array.from(indicators.children);
    dots.forEach((d,i)=>d.setAttribute('aria-selected', i===current ? 'true' : 'false'));
  }

  function goTo(index){
    current = (index + slides.length) % slides.length;
    update();
  }

  prevBtn.addEventListener('click', ()=>goTo(current-1));
  nextBtn.addEventListener('click', ()=>goTo(current+1));

  // Keyboard support
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowLeft') prevBtn.click();
    if(e.key === 'ArrowRight') nextBtn.click();
  });

  // small autoplay but respect prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!prefersReduced){
    let autoplay = setInterval(()=>goTo(current+1),6000);
    // pause when focus enters carousel
    track.addEventListener('focusin', ()=>clearInterval(autoplay));
  }

  // populate year
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  buildIndicators();
  update();
})();
