// Contact form handling.
//
// Validates the form, then sends the data to our deployed Express + MongoDB
// backend via fetch(). See server.js's /api/contact route for what happens
// to this data on the other end.

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var statusEl = document.getElementById('form-status');

  // Very small, readable email check — good enough for front-end validation.
  // (Real, airtight email validation always happens again on the backend.)
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function showError(field, show) {
    var group = field.closest('.form-group');
    if (!group) return;
    group.classList.toggle('has-error', show);
  }

  function validateForm() {
    var isValid = true;

    form.querySelectorAll('[required]').forEach(function (field) {
      var value = field.value.trim();
      var fieldValid = value.length > 0;

      if (field.type === 'email' && fieldValid) {
        fieldValid = isValidEmail(value);
      }

      if (field.type === 'tel' && fieldValid) {
        // Simple check: at least 10 digits, ignoring spaces/dashes/plus.
        fieldValid = value.replace(/[^0-9]/g, '').length >= 10;
      }

      showError(field, !fieldValid);
      if (!fieldValid) isValid = false;
    });

    return isValid;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Stop the page from reloading — we're handling this in JS.

    if (!validateForm()) {
      statusEl.textContent = 'Please fix the highlighted fields.';
      statusEl.className = 'form-status error';
      return;
    }

    // FormData reads every named input inside the form into one object-like
    // structure — this is exactly what we send to the backend API.
    var formData = new FormData(form);
    var payload = Object.fromEntries(formData.entries());

    console.log('Sending to backend:', payload);

    statusEl.textContent = 'Sending...';
    statusEl.className = 'form-status';

    fetch('https://aidigitalrank.onrender.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (data.success) {
          statusEl.textContent = data.message;
          statusEl.className = 'form-status success';
          form.reset();
        } else {
          statusEl.textContent = data.error || 'Something went wrong. Please try again.';
          statusEl.className = 'form-status error';
        }
      })
      .catch(function () {
        statusEl.textContent = 'Could not reach the server. Please try again.';
        statusEl.className = 'form-status error';
      });
  });

  // Clear an individual field's error as soon as the person starts fixing it.
  form.querySelectorAll('[required]').forEach(function (field) {
    field.addEventListener('input', function () {
      showError(field, false);
    });
  });
});