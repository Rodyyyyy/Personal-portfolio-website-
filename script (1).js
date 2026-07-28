document.documentElement.classList.add('js-ready');

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Footer year ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Scroll progress bar ---- */
  const progressBar = document.getElementById('progressBar');
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ---- Mobile nav toggle ---- */
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      navList.classList.toggle('open');
    });
    navList.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => navList.classList.remove('open'));
    });
  }

  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(sec => navObserver.observe(sec));

  /* ---- Reveal on scroll ---- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---- Role rotator typewriter ---- */
  const roles = ['Java', 'Machine Learning', 'Python & Data Science', 'Web Technologies'];
  const rotatorEl = document.getElementById('roleRotator');
  if (rotatorEl) {
    let roleIndex = 0, charIndex = 0, deleting = false;

    function typeLoop() {
      const current = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        rotatorEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(typeLoop, 1400);
          return;
        }
      } else {
        charIndex--;
        rotatorEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(typeLoop, deleting ? 45 : 75);
    }
    typeLoop();
  }

  /* ---- Hero network background ---- */
  const svgNS = 'http://www.w3.org/2000/svg';
  const lineGroup = document.querySelector('.net-lines');
  const nodeGroup = document.querySelector('.net-nodes');
  if (lineGroup && nodeGroup) {
    const points = [];
    const NODE_COUNT = 22;
    for (let i = 0; i < NODE_COUNT; i++) {
      points.push({
        x: Math.random() * 800,
        y: Math.random() * 600,
        r: 2 + Math.random() * 3,
        delay: Math.random() * 6
      });
    }
    // connect nearby points
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 170) {
          const line = document.createElementNS(svgNS, 'line');
          line.setAttribute('x1', points[i].x);
          line.setAttribute('y1', points[i].y);
          line.setAttribute('x2', points[j].x);
          line.setAttribute('y2', points[j].y);
          lineGroup.appendChild(line);
        }
      }
    }
    points.forEach(p => {
      const circle = document.createElementNS(svgNS, 'circle');
      circle.setAttribute('cx', p.x);
      circle.setAttribute('cy', p.y);
      circle.setAttribute('r', p.r);
      circle.style.animationDelay = p.delay + 's';
      nodeGroup.appendChild(circle);
    });
  }
});
