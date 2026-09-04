/* ==========================================================================
   NAVBAR BEHAVIOR
   ========================================================================== */

export function initNav() {
  const nav = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const mobile = document.getElementById('navMobile');
  if (!nav) return;

  // ---- Scrolled state: switch on the blurred background after a small
  // threshold so it doesn't flicker right at the top of the page.
  const SCROLL_THRESHOLD = 24;
  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---- Mobile menu toggle ----
  if (toggle && mobile) {
    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      mobile.classList.remove('is-open');
    };
    const openMenu = () => {
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      mobile.classList.add('is-open');
    };

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });

    // Close on link click, and on Escape for keyboard users.
    mobile.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // ---- Active section indication ----
  // Highlights the nav link for whichever section is currently most
  // visible, using IntersectionObserver rather than scroll-position math.
  const sections = ['about', 'work', 'skills', 'services', 'contact']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const links = nav.querySelectorAll('.nav__link');
  const setActive = (id) => {
    links.forEach((link) => {
      const match = link.getAttribute('href') === `#${id}`;
      link.toggleAttribute('aria-current', match);
      if (match) link.setAttribute('aria-current', 'true');
    });
  };

  if (sections.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => observer.observe(s));
  }
}

