// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when a link is clicked
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Announcement bar dismiss
  var announcementBar = document.querySelector('.announcement-bar');
  var closeBtn = document.querySelector('.announcement-close');
  var announcementItems = document.querySelectorAll('.announcement-item');

  if (closeBtn && announcementBar) {
    closeBtn.addEventListener('click', function () {
      clearInterval(announcementInterval);
      announcementBar.style.display = 'none';
      // Sticky header's offset is driven by this CSS variable — setting it
      // to 0 makes the header stick right to the top once the bar is gone.
      document.documentElement.style.setProperty('--announcement-h', '0px');
    });
  }

  // Rotate announcement messages every 4 seconds
  var currentIndex = 0;
  var announcementInterval;

  if (announcementItems.length > 1) {
    announcementInterval = setInterval(function () {
      announcementItems[currentIndex].classList.remove('is-active');
      currentIndex = (currentIndex + 1) % announcementItems.length;
      announcementItems[currentIndex].classList.add('is-active');
    }, 4000);
  }
});