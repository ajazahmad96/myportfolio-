/* ==========================================================================
   MAGNETIC BUTTONS
   Applied to primary CTAs only (.btn--primary, .nav__cta) — not every
   button on the page, per the brief's "where appropriate."
   ========================================================================== */

const STRENGTH = 0.3;
const MAX_OFFSET = 10; // px

export function initMagnetic({ prefersReducedMotion, isTouchDevice }) {
  if (prefersReducedMotion || isTouchDevice) return;

  const targets = document.querySelectorAll('.btn--primary, .nav__cta');

  targets.forEach((el) => {
    el.style.transition = `transform var(--duration-fast) var(--ease-out)`;

    el.addEventListener('pointermove', (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      const x = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, relX * STRENGTH));
      const y = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, relY * STRENGTH));
      el.style.transform = `translate(${x}px, ${y}px)`;
    });

    el.addEventListener('pointerleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });
}
