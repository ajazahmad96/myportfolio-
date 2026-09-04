/* ==========================================================================
   SCROLL REVEAL
   Applies one consistent entrance to a fixed set of targets as they enter
   the viewport. Runs once per element, then unobserves it — this is a
   one-time reveal, not a scroll-linked animation.
   ========================================================================== */

const TARGETS = [
  '.about__intro',
  '.about__focus-item',
  '.work__header',
  '.project',
  '.skills__group',
  '.services__header',
  '.service',
  '.contact__grid > *',
];

export function initReveal({ prefersReducedMotion }) {
  const elements = TARGETS.flatMap((selector) =>
    Array.from(document.querySelectorAll(selector))
  );
  if (!elements.length) return;

  elements.forEach((el) => el.classList.add('reveal'));

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    // Show everything immediately rather than leaving it hidden forever.
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  // Small stagger within each parent, without a global counter that would
  // delay elements far down the page.
  const groups = new Map();
  elements.forEach((el) => {
    const parent = el.parentElement;
    const index = groups.get(parent) || 0;
    el.style.transitionDelay = `${Math.min(index * 60, 240)}ms`;
    groups.set(parent, index + 1);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

