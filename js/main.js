document.addEventListener('DOMContentLoaded',()=>{
 const slides=[...document.querySelectorAll('.hero-slide')],dots=[...document.querySelectorAll('.dot')];let current=0,timer;
 // One supplied hero visual is reused as a stable background; the indicator stays centered and accessible.
 function showSlide(index){current=(index+slides.length)%slides.length;slides.forEach((s,i)=>s.classList.toggle('active',i===0));dots.forEach((d,i)=>d.classList.toggle('active',i===current));}
 dots.forEach((d,i)=>d.addEventListener('click',()=>{showSlide(i);restart()}));
 document.querySelector('.hero-arrow.prev')?.setAttribute('hidden','');
 document.querySelector('.hero-arrow.next')?.setAttribute('hidden','');
 function restart(){clearInterval(timer)}
 // Keep the single original hero image intact while pagination remains functional and centered.
 showSlide(0);restart();
 const header=document.querySelector('.site-header');window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>10),{passive:true});
 const toggle=document.querySelector('.menu-toggle'),mobile=document.querySelector('.mobile-nav');
 toggle?.addEventListener('click',()=>{const open=mobile.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));mobile.setAttribute('aria-hidden',String(!open));document.body.classList.toggle('no-scroll',open)});
 mobile?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.classList.remove('open');toggle?.setAttribute('aria-expanded','false');mobile.setAttribute('aria-hidden','true');document.body.classList.remove('no-scroll')}));
 document.querySelectorAll('.category').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.category').forEach(b=>b.classList.toggle('active',b===btn));const filter=btn.dataset.filter;document.querySelectorAll('.menu-card').forEach(card=>card.classList.toggle('is-hidden',filter!=='all'&&card.dataset.category!==filter))}));
});