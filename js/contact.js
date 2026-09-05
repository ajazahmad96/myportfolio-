/* ==========================================================================
   CONTACT FORM
   Submits directly to Formspree in the background — no email app needs to
   open, and the visitor sees a real success/error state on the page.
   Replace FORM_ENDPOINT if you ever switch Formspree forms or providers.
   ========================================================================== */

const FORM_ENDPOINT = 'https://formspree.io/f/xwlkqzrp';

export function initContact() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const submitBtn = form?.querySelector('.form__submit');
  if (!form || !status) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      status.textContent = 'Please fill in all fields with a valid email.';
      status.dataset.state = 'error';
      form.reportValidity();
      return;
    }

    if (submitBtn) submitBtn.disabled = true;
    status.textContent = 'Sending…';
    status.dataset.state = 'ok';

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });

      if (response.ok) {
        status.textContent = "Thanks — I'll get back to you soon.";
        status.dataset.state = 'ok';
        form.reset();
      } else {
        status.textContent = 'Something went wrong. Please try again or email me directly.';
        status.dataset.state = 'error';
      }
    } catch {
      status.textContent = 'Network error — please check your connection and try again.';
      status.dataset.state = 'error';
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}
