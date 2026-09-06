// Newsletter signup — this same script runs on every page, since the
// signup form lives in the footer, which appears everywhere.

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('newsletter-form');
  if (!form) return; // Page doesn't have the form for some reason — do nothing

  var statusEl = document.getElementById('newsletter-status');
  var API_BASE = 'https://aidigitalrank.onrender.com';

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var email = form.querySelector('input[name="email"]').value.trim();

    if (!email) {
      statusEl.textContent = 'Please enter an email address.';
      statusEl.className = 'newsletter-status error';
      return;
    }

    statusEl.textContent = 'Subscribing...';
    statusEl.className = 'newsletter-status';

    fetch(API_BASE + '/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (data.success) {
          statusEl.textContent = data.message;
          statusEl.className = 'newsletter-status success';
          form.reset();
        } else {
          statusEl.textContent = data.error || 'Something went wrong.';
          statusEl.className = 'newsletter-status error';
        }
      })
      .catch(function () {
        statusEl.textContent = 'Could not reach the server. Please try again.';
        statusEl.className = 'newsletter-status error';
      });
  });
});