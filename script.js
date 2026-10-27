/* ═══════════════════════════════════════════════════════════════════
Gejje's Marvella — Business Profiles | script.js
═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ── Ripple Effect ───────────────────────────────────────────── */
  $$('.link-card').forEach(el => {
    el.addEventListener('pointerdown', e => {
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top  = (e.clientY - rect.top - size / 2) + 'px';
      el.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  /* ── Skeleton Loader & Scroll Reveal ────────────────────────── */
  const skeleton = $('#skeleton');
  const app = $('#app');

  function reveal() {
    if (skeleton) {
      skeleton.style.opacity = '0';
      skeleton.style.transition = 'opacity .3s ease';
      setTimeout(() => { skeleton.remove(); }, 320);
    }
    if (app) app.hidden = false;

    const cards = $$('.link-card');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const i = cards.indexOf(entry.target);
            entry.target.style.transitionDelay = Math.min((i % 8) * 60, 480) + 'ms';
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
      cards.forEach(el => io.observe(el));
    } else {
      cards.forEach(el => el.classList.add('visible'));
    }
  }

  window.addEventListener('load', () => setTimeout(reveal, 600));

  /* ── Footer Year ─────────────────────────────────────────────── */
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
})();