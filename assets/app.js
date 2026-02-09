// ---- Page transition fade ----
const pageFade = document.getElementById('pageFade');
document.querySelectorAll('a[href$=".html"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    pageFade?.classList.add('on');
    setTimeout(()=> window.location.href = a.getAttribute('href'), 220);
  });
});
window.addEventListener('pageshow', ()=> pageFade?.classList.remove('on'));

// ---- Reveal on scroll ----
const revealIO = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('show');
  });
},{ threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el=> revealIO.observe(el));

// ---- Magnetic buttons ----
document.querySelectorAll('.magnet').forEach(btn=>{
  btn.addEventListener('mousemove', (e)=>{
    const r = btn.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width/2);
    const y = e.clientY - (r.top + r.height/2);
    btn.style.transform = `translate(${x*0.10}px, ${y*0.18}px)`;
  });
  btn.addEventListener('mouseleave', ()=> btn.style.transform = `translate(0,0)`);
});

// ---- Optional tilt card ----
const tilt = document.getElementById('tiltCard');
if(tilt){
  tilt.style.transition = "transform .2s ease";
  tilt.addEventListener('mousemove', (e)=>{
    const r = tilt.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width/2)) / r.width;
    const dy = (e.clientY - (r.top + r.height/2)) / r.height;
    tilt.style.transform = `rotateX(${(-dy*6)}deg) rotateY(${(dx*8)}deg)`;
  });
  tilt.addEventListener('mouseleave', ()=> tilt.style.transform = `rotateX(0) rotateY(0)`);
}

// ---- Counters ----
function animateCounter(el){
  const target = parseFloat(el.dataset.target);
  const isDecimal = String(target).includes('.');
  const duration = 1100;
  const start = performance.now();
  function tick(now){
    const p = Math.min((now-start)/duration, 1);
    const eased = 1 - Math.pow(1-p, 3);
    const val = target * eased;
    el.textContent = isDecimal ? val.toFixed(1) : Math.floor(val);
    if(p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const counterIO = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting && !entry.target.dataset.done){
      entry.target.dataset.done = "1";
      animateCounter(entry.target);
    }
  });
},{ threshold: 0.6 });
document.querySelectorAll('.counter').forEach(c=> counterIO.observe(c));

// ---- Parallax-ish hero image ----
const par = document.querySelector('[data-parallax]');
window.addEventListener('scroll', ()=>{
  if(!par) return;
  const y = window.scrollY * 0.10;
  par.style.transform = `translateY(${y}px) scale(1.06)`;
},{ passive:true });

// ---- Gallery lightbox ----
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
document.querySelectorAll('[data-lightbox]').forEach(img=>{
  img.addEventListener('click', ()=>{
    if(!lb || !lbImg) return;
    lbImg.src = img.getAttribute('data-full') || img.getAttribute('src');
    lb.classList.add('on');
    document.body.style.overflow = 'hidden';
  });
});
document.getElementById('lbClose')?.addEventListener('click', ()=>{
  lb?.classList.remove('on');
  document.body.style.overflow = '';
});
lb?.addEventListener('click', (e)=>{
  if(e.target === lb){
    lb.classList.remove('on');
    document.body.style.overflow = '';
  }
});

// ---- Year ----
document.getElementById('year')?.append(new Date().getFullYear());
