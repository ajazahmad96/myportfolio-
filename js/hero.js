/* ==========================================================================
   HERO BEHAVIOR
   The entrance sequence itself is pure CSS (see css/hero.css). This module
   only adds the subtle pointer-follow glow — a cheap stand-in for the
   Three.js depth/parallax effect that Phase 6 will bring in behind it.
   ========================================================================== */

export function initHero({ prefersReducedMotion, isTouchDevice }) {
  const hero = document.getElementById('hero');
  const glow = hero?.querySelector('.hero__glow');
  if (!hero || !glow || prefersReducedMotion || isTouchDevice) return;

  let targetX = 50, targetY = 20;
  let currentX = 50, currentY = 20;
  let raf = null;

  const onMove = (e) => {
    const rect = hero.getBoundingClientRect();
    targetX = ((e.clientX - rect.left) / rect.width) * 100;
    targetY = ((e.clientY - rect.top) / rect.height) * 100;
    if (!raf) raf = requestAnimationFrame(tick);
  };

  // Ease toward the pointer position rather than snapping to it — keeps
  // the motion feeling weighted instead of nervous.
  const tick = () => {
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;
    glow.style.background = `radial-gradient(ellipse 45% 40% at ${currentX}% ${currentY}%, var(--color-accent-glow) 0%, transparent 70%)`;

    if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = null;
    }
  };

  hero.addEventListener('pointermove', onMove, { passive: true });
}
