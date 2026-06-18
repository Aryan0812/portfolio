/* ============================================================
   ARYAN MUKESH JAIN — PORTFOLIO SCRIPTS
   ============================================================ */

'use strict';

/* ── 1. THEME TOGGLE ── */
(function initTheme() {
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

document.addEventListener('DOMContentLoaded', () => {

  /* ── THEME TOGGLE ── */
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  /* ── HAMBURGER MENU ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  function closeMenu() {
    hamburger?.classList.remove('active');
    navLinks?.classList.remove('open');
  }

  hamburger?.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close when a nav link is clicked
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close when clicking outside the nav
  document.addEventListener('click', (e) => {
    if (navLinks?.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)) {
      closeMenu();
    }
  });

  /* ── HEADER SCROLL SHADOW ── */
  const header = document.getElementById('site-header');
  const handleScroll = () => {
    header?.classList.toggle('scrolled', window.scrollY > 20);
    highlightNav();
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ── ACTIVE NAV HIGHLIGHT ── */
  const sections = document.querySelectorAll('section[id]');
  function highlightNav() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 90) current = sec.id;
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  }

  /* ── TYPING ANIMATION ── */
  const phrases = [
    'Full Stack Web Developer',
    'Software Developer',
    'AI Enthusiast',
    'Passionate Coder',
    'Creative Thinker',         
    'Tech Enthusiast',
  ];

  const typedEl = document.getElementById('typed-text');
  if (typedEl) {
    let phraseIdx = 0;
    let charIdx   = 0;
    let deleting  = false;
    let paused    = false;

    function type() {
      if (paused) return;
      const current = phrases[phraseIdx];

      if (!deleting) {
        typedEl.textContent = current.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
          paused = true;
          setTimeout(() => { deleting = true; paused = false; tick(); }, 1800);
          return;
        }
      } else {
        typedEl.textContent = current.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
        }
      }
      tick();
    }

    function tick() {
      const speed = deleting ? 55 : 95;
      setTimeout(type, speed);
    }

    tick();
  }

  /* ── SCROLL REVEAL ── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once revealed, no need to keep observing
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── SKILL TAG ANIMATION ── */
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const tags = entry.target.querySelectorAll('.skill-tag[data-level]');
          tags.forEach((tag, i) => {
            setTimeout(() => {
              const level = tag.getAttribute('data-level') || '70';
              tag.style.setProperty('--skill-width', `${level}%`);
              tag.classList.add('animated');
            }, i * 80);
          });
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('.skill-group').forEach(g => skillObserver.observe(g));

  /* ── SMOOTH SCROLL for internal links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 70;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── STAGGER DELAY for grid children ── */
  document.querySelectorAll('.projects-grid, .contact-grid, .edu-grid, .cert-list').forEach(grid => {
    [...grid.children].forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.08}s`;
    });
  });

});
