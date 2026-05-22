const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateCursor() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top  = followerY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .stack-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    follower.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    follower.classList.remove('hover');
  });
});

const reveals = document.querySelectorAll('.reveal, .section-label, .section-title');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

reveals.forEach(el => observer.observe(el));

const stackItems = document.querySelectorAll('.stack-item');
stackItems.forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.07}s`;
});

document.addEventListener('mousemove', (e) => {
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;

  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');
  const orb3 = document.querySelector('.orb-3');

  if (orb1) orb1.style.transform = `translate(${dx * 20}px, ${dy * 15}px)`;
  if (orb2) orb2.style.transform = `translate(${-dx * 15}px, ${-dy * 10}px)`;
  if (orb3) orb3.style.transform = `translate(calc(-50% + ${dx * 10}px), calc(-50% + ${dy * 10}px))`;
});

document.querySelectorAll('.projeto-img').forEach(img => {
  img.addEventListener('error', () => {
    img.style.display = 'none';
    const placeholder = img.nextElementSibling;
    if (placeholder && placeholder.classList.contains('media-placeholder')) {
      placeholder.style.display = 'flex';
    }
  });
});

const btnProjetos = document.getElementById('btnProjetos');
const secaoProjetos = document.getElementById('projetos');

btnProjetos.addEventListener('click', () => {
  secaoProjetos.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
});
