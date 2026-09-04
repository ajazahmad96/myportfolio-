/* ==========================================================================
   HERO SCENE (Three.js)
   A quiet particle field, not a demo piece. Renders behind the CSS
   backdrop/glow from hero.css, which stays visible the whole time as a
   fallback if WebGL never initializes.

   Perf choices:
   - Particle count and pixel ratio drop hard on touch devices/small
     viewports.
   - The render loop pauses when the hero scrolls out of view.
   - Reduced-motion renders a single static frame — no camera drift,
     no continuous loop.
   ========================================================================== */

export async function initScene({ prefersReducedMotion, isTouchDevice }) {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  let THREE;
  try {
    THREE = await import('three');
  } catch {
    // Three.js failed to load (offline, blocked CDN, etc.) — the CSS
    // backdrop/glow in hero.css already covers this, so just bail quietly.
    return;
  }

  const isSmallViewport = window.innerWidth < 720;
  const lightMode = isTouchDevice || isSmallViewport;

  const PARTICLE_COUNT = lightMode ? 220 : 700;
  const MAX_DPR = lightMode ? 1 : 2;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
  } catch {
    return; // No WebGL support — CSS fallback stands on its own.
  }

  const hero = document.getElementById('hero');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 12;

  const setSize = () => {
    const { clientWidth: w, clientHeight: h } = hero;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_DPR));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  setSize();

  // ---- Particle field ----
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 22;     // x
    positions[i * 3 + 1] = (Math.random() - 0.5) * 14;  // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 14;  // z
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0x7c5cfc,
    size: lightMode ? 0.05 : 0.045,
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // ---- Mouse-follow target (desktop only; lightMode skips this) ----
  let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
  const onPointerMove = (e) => {
    const rect = hero.getBoundingClientRect();
    targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  };
  if (!lightMode && !prefersReducedMotion) {
    hero.addEventListener('pointermove', onPointerMove, { passive: true });
  }

  // ---- Visibility gating: pause the loop when hero isn't on screen ----
  let isVisible = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !prefersReducedMotion) requestAnimationFrame(animate);
    }).observe(hero);
  }

  let raf = null;
  const animate = () => {
    if (!isVisible) { raf = null; return; }

    currentX += (targetX - currentX) * 0.04;
    currentY += (targetY - currentY) * 0.04;

    points.rotation.y += 0.0006;
    points.rotation.x += 0.0002;
    camera.position.x = currentX * 0.6;
    camera.position.y = -currentY * 0.4;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    raf = requestAnimationFrame(animate);
  };

  // Fade the canvas in once the first frame is actually on screen.
  renderer.render(scene, camera);
  requestAnimationFrame(() => canvas.classList.add('is-ready'));

  if (prefersReducedMotion) {
    // Static frame only — no loop, no camera drift.
  } else {
    animate();
  }

  window.addEventListener('resize', () => {
    setSize();
    if (prefersReducedMotion) renderer.render(scene, camera);
  });
}
