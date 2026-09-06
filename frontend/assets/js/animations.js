// Site-wide GSAP animations: hero/page-hero entrance, scroll-reveal for
// repeating content blocks, and animated number counters.
//
// Design choice: instead of adding a special "reveal" class to every element
// in every HTML file, this script targets classes that ALREADY exist across
// the site (.service-item, .testimonial, .blog-card, etc). That means new
// pages automatically get these animations for free, as long as they reuse
// the same component classes.

document.addEventListener('DOMContentLoaded', function () {
  if (typeof gsap === 'undefined') return; // GSAP didn't load (e.g. offline) — page still works

  // Respect users who've asked their OS/browser to reduce motion.
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  var hasScrollTrigger = typeof ScrollTrigger !== 'undefined';
  if (hasScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  // ---------------------------------------------------------------
  // 1. Homepage hero — animates immediately on load (it's above the
  //    fold, so a scroll-triggered animation would never be seen).
  // ---------------------------------------------------------------
  var heroCopy = document.querySelector('.hero-copy');
  if (heroCopy) {
    var heroTl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.7 } });
    heroTl.from(heroCopy.querySelectorAll('h1, .hero-sub, .hero-actions'), {
      y: 24,
      opacity: 0,
      stagger: 0.12,
    });
    var heroProof = document.querySelector('.hero-proof');
    if (heroProof) {
      heroTl.from(heroProof, { y: 24, opacity: 0 }, '-=0.5');
    }
  }

  // ---------------------------------------------------------------
  // 2. Inner-page hero (About, Services, Contact, etc.) — same idea,
  //    for every page that isn't the homepage.
  // ---------------------------------------------------------------
  var pageHero = document.querySelector('.page-hero');
  if (pageHero) {
    gsap.from(pageHero.querySelectorAll('h1, .page-hero-sub, .btn'), {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
    });
  }

  if (!hasScrollTrigger) return; // Everything below needs ScrollTrigger

  // ---------------------------------------------------------------
  // 3. Scroll reveal for repeating cards/items across the site.
  //    Each element fades and slides up the moment it's ~88% up the
  //    viewport (i.e. just before it would be fully visible).
  // ---------------------------------------------------------------
  var revealSelectors = [
    '.service-item',
    '.service-block',
    '.testimonial',
    '.blog-card',
    '.value-block',
    '.process-step',
    '.faq-item',
  ];

  revealSelectors.forEach(function (selector) {
    gsap.utils.toArray(selector).forEach(function (item) {
      gsap.from(item, {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 88%',
        },
      });
    });
  });

  // ---------------------------------------------------------------
  // 4. Scroll reveal for whole sections that aren't repeating cards.
  // ---------------------------------------------------------------
  var sectionSelectors = [
    '.clients-section',
    '.cta-inner',
    '.map-grid',
    '.story-grid',
    '.contact-grid',
  ];

  sectionSelectors.forEach(function (selector) {
    var el = document.querySelector(selector);
    if (!el) return;
    gsap.from(el, {
      y: 24,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      },
    });
  });

  // ---------------------------------------------------------------
  // 5. Animated number counters — works on ANY ".stat-number" element,
  //    whatever its text is (e.g. "3.1×", "100%"), by reading the
  //    number and any suffix straight out of its text content.
  // ---------------------------------------------------------------
  document.querySelectorAll('.stat-number').forEach(function (el) {
    var text = el.textContent.trim();
    var match = text.match(/^([\d.]+)(.*)$/);
    if (!match) return;

    var targetValue = parseFloat(match[1]);
    var suffix = match[2];
    var decimalPlaces = (match[1].split('.')[1] || '').length;
    var counterState = { value: 0 };

    el.textContent = (0).toFixed(decimalPlaces) + suffix; // start visibly at 0

    gsap.to(counterState, {
      value: targetValue,
      duration: 1.6,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        once: true, // count up once, don't re-trigger on scrolling back up
      },
      onUpdate: function () {
        el.textContent = counterState.value.toFixed(decimalPlaces) + suffix;
      },
    });
  });
});