/* ==========================================================================
   CONTACT FORM
   No backend is configured yet, so this does NOT pretend to send email
   silently. On submit it opens the visitor's own email client with the
   message pre-filled via a mailto: link — genuinely functional, honestly
   labeled, no fake "Message sent!" success state.

   To connect a real backend later (Formspree, EmailJS, a serverless
   function, etc.), replace the body of handleSubmit with a fetch() call
   to that service and update the status message accordingly.
   ========================================================================== */

const CONTACT_EMAIL = 'your-email@example.com'; // TODO: replace with your real address

export function initContact() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.elements.namedItem('name');
    const email = form.elements.namedItem('email');
    const message = form.elements.namedItem('message');

    if (!form.checkValidity()) {
      status.textContent = 'Please fill in all fields with a valid email.';
      status.dataset.state = 'error';
      form.reportValidity();
      return;
    }

    const subject = encodeURIComponent(`Project inquiry from ${name.value}`);
    const body = encodeURIComponent(`${message.value}\n\n— ${name.value} (${email.value})`);
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    status.textContent = 'Opening your email app to send this…';
    status.dataset.state = 'ok';
    window.location.href = mailto;
  });
}
