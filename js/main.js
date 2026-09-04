/* ==========================================================================
   MAIN ENTRY POINT
   Each section's behavior lives in its own module (added in later phases):
     js/nav.js        — sticky nav, active-link tracking, mobile menu
     js/hero.js        — entrance sequence
     js/scene.js       — Three.js background (Phase 6)
     js/reveal.js      — scroll-triggered section reveals
     js/cursor.js       — custom cursor (desktop only)
     js/projects.js    — project showcase interactions
     js/contact.js      — form handling
   main.js only wires them together — it should stay thin.
   ========================================================================== */

// Shared reduced-motion flag, read once and passed to any module that
// drives non-essential animation (Three.js scene, cursor, reveals).
export const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

// Shared "is this a touch/coarse-pointer device" flag — used to decide
// whether to run the custom cursor and the heavier WebGL interaction.
export const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

import { initNav } from './nav.js';
import { initHero } from './hero.js';
import { initProjects } from './projects.js';
import { initContact } from './contact.js';
import { initScene } from './scene.js';
import { initReveal } from './reveal.js';
import { initCursor } from './cursor.js';
import { initMagnetic } from './magnetic.js';

document.addEventListener('DOMContentLoaded', () => {
  const motionFlags = { prefersReducedMotion, isTouchDevice };

  initNav();
  initHero(motionFlags);
  initProjects();
  initContact();
  initReveal(motionFlags);
  initCursor(motionFlags);
  initMagnetic(motionFlags);

  const footerYear = document.getElementById('footerYear');
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  // Three.js scene loads last and independently — a slow or failed CDN
  // fetch never blocks the rest of the page from being interactive.
  initScene(motionFlags);
});
