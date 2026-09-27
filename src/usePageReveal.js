import { useLayoutEffect } from 'react';

// Reveal small content blocks independently so tall sections remain readable on phones.
const revealTargets = [
  '.hero-title-group', '.hero-desc-bkk', '.hero-btn-row', '.hero-stats-panel-glass',
  'section h2', 'section > .container > div > p',
  '.card-filter-softblue', '.job-card-white', '.jobs-empty', '.btn-see-all-jobs-orange',
  '.path-card-white', '.cc-card-item', '.mitra-marquee-wrapper', '.mitra-footer-text-block',
  '.testimonial-card-slide14', '.stepper-journey-title', '.journey-step-row',
  '.tracer-bars-card', '.tracer-cta-column', '.agenda-card-featured-orange',
  '.agenda-mini-card-white', '.insight-card-exact', '.insight-arrow-illustration-slot',
  '.rekap-pill-badge-top', '.rekap-box-exact', '.laporan-card-white-exact',
  '.cta-banner-sub-g1', '.cta-btn-group-g1', '.footer-grid-3cols > div',
].join(',');

export function usePageReveal() {
  useLayoutEffect(() => {
    const root = document.querySelector('.bkk-app-root');
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const registered = new Set();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        target.classList.add('reveal-visible');
        observer.unobserve(target);
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -24px 0px' });
    const register = () => {
      root.querySelectorAll(revealTargets).forEach((element) => {
        if (registered.has(element)) return;
        // Avoid a second reveal inside an already animated content card.
        if (element.parentElement.closest('[data-reveal]')) return;
        registered.add(element);
        const siblings = [...element.parentElement.children].filter((node) => node.matches(revealTargets));
        element.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(element) % 4, 3) * 85}ms`);
        element.dataset.reveal = '';
        if (preference.matches) element.classList.add('reveal-visible');
        else observer.observe(element);
      });
    };
    register();
    const changes = new MutationObserver(register);
    changes.observe(root, { childList: true, subtree: true });
    const reduce = () => {
      if (!preference.matches) return;
      observer.disconnect();
      registered.forEach((element) => element.classList.add('reveal-visible'));
    };
    preference.addEventListener('change', reduce);
    // Keyboard navigation must never focus content that remains visually hidden.
    const focus = (event) => {
      const element = event.target.closest('[data-reveal]');
      if (element) { element.classList.add('reveal-visible'); observer.unobserve(element); }
    };
    root.addEventListener('focusin', focus);
    return () => {
      observer.disconnect();
      changes.disconnect();
      preference.removeEventListener('change', reduce);
      root.removeEventListener('focusin', focus);
      registered.forEach((element) => {
        delete element.dataset.reveal;
        element.classList.remove('reveal-visible');
        element.style.removeProperty('--reveal-delay');
      });
    };
  }, []);
}
