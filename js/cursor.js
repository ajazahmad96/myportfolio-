/* ==========================================================================
   CUSTOM CURSOR
   Desktop only (guarded by isTouchDevice) and purely decorative — the
   real system cursor is only hidden via a body class this module adds,
   so if the module fails to init for any reason the native cursor is
   simply left alone and nothing breaks.
   ========================================================================== */

export function initCursor({ prefersReducedMotion, isTouchDevice }) {
  if (isTouchDevice) return;

  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);
  document.body.classList.add('has-custom-cursor');

  let ringX = 0, ringY = 0, targetX = 0, targetY = 0;

  const onMove = (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    dot.style.transform = `translate(${targetX}px, ${targetY}px)`;
  };
  window.addEventListener('pointermove', onMove, { passive: true });

  const tick = () => {
    // Ring eases toward the dot; skip the lag entirely under
    // reduced-motion by snapping straight to the target.
    const ease = prefersReducedMotion ? 1 : 0.18;
    ringX += (targetX - ringX) * ease;
    ringY += (targetY - ringY) * ease;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  // Expand over anything interactive.
  const interactiveSelector = 'a, button, input, textarea, [tabindex]';
  document.addEventListener('pointerover', (e) => {
    if (e.target.closest(interactiveSelector)) {
      ring.classList.add('is-hover');
    }
  });
  document.addEventListener('pointerout', (e) => {
    if (e.target.closest(interactiveSelector)) {
      ring.classList.remove('is-hover');
    }
  });

  // Hide entirely when the pointer leaves the window.
  document.addEventListener('pointerleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('pointerenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
}
