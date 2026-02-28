/* =============================================
  MAIN JAVASCRIPT — assets/js/main.js

  Handles:
  1. Scroll-triggered fade-in animations
  2. Number counter animation in Stats section
  3. Gallery lightbox (click to enlarge photos)

  You generally won't need to edit this file.
  It works automatically with the CSS classes.
============================================= */


/* ── 1. SCROLL FADE-IN ANIMATION ─────────────────────
  Any element with class="fade-in" will fade up into view
  when the user scrolls to it.
  Usage: <div class="fade-in"> ... </div>
─────────────────────────────────────────────────────── */
function initFadeIn() {
  const fadeEls = document.querySelectorAll('.fade-in');

  /* IntersectionObserver triggers when element enters viewport */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); /* Only animate once */
        }
      });
    },
    { threshold: 0.15 } /* Triggers when 15% of element is visible */
  );

  fadeEls.forEach(el => observer.observe(el));
}


/* ── 2. NUMBER COUNTER ANIMATION ─────────────────────
  Makes stats count up from 0 to their target number.
  Usage: <span class="stat-number" data-count="500">0</span>
  The data-count attribute sets the final value.
─────────────────────────────────────────────────────── */
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16); /* Update every ~16ms (60fps) */

  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target.toLocaleString(); /* Final number */
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start).toLocaleString();
    }
  }, 16);
}

function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  if (!counters.length) return;

  /* Use IntersectionObserver so counters only run when visible */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-count'), 10);
          animateCounter(entry.target, target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
}


/* ── 3. GALLERY LIGHTBOX ──────────────────────────────
  Click any .gallery-item or .gallery-thumb to view it enlarged.
  Press ESC or click the overlay to close.
─────────────────────────────────────────────────────── */
function initLightbox() {
  /* Create the lightbox overlay (hidden by default) */
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.style.cssText = `
    display: none;
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(0,0,0,0.92);
    align-items: center; justify-content: center;
    cursor: zoom-out;
    padding: 24px;
  `;
  lightbox.innerHTML = `
    <button id="lightbox-close" style="
      position:absolute; top:20px; right:24px;
      background:none; border:none; color:white;
      font-size:2rem; cursor:pointer; line-height:1;
    ">✕</button>
    <img id="lightbox-img" src="" alt="" style="
      max-width:90vw; max-height:88vh;
      object-fit:contain; border-radius:8px;
      box-shadow: 0 24px 80px rgba(0,0,0,0.8);
    " />
    <p id="lightbox-caption" style="
      position:absolute; bottom:24px;
      color:rgba(255,255,255,0.7);
      font-size:0.9rem; text-align:center; width:100%;
    "></p>
  `;
  document.body.appendChild(lightbox);

  /* Find all clickable gallery elements */
  const items = document.querySelectorAll('.gallery-item img, .gallery-thumb');

  items.forEach(item => {
    item.style.cursor = 'zoom-in';
    item.addEventListener('click', () => {
      /* Get image source and caption */
      let src, caption;
      if (item.tagName === 'IMG') {
        /* .gallery-item img */
        src     = item.src;
        caption = item.alt || '';
      } else {
        /* .gallery-thumb — uses background-image */
        const bg = window.getComputedStyle(item).backgroundImage;
        src     = bg.replace(/url\(["']?/, '').replace(/["']?\)/, '');
        caption = item.querySelector('.gallery-thumb-overlay')?.textContent || '';
      }
      document.getElementById('lightbox-img').src     = src;
      document.getElementById('lightbox-caption').textContent = caption;
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden'; /* Prevent background scroll */
    });
  });

  /* Close lightbox on click or ESC */
  function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });
}


/* ── 4. DONATION AMOUNT SELECTOR ─────────────────────
  Highlights the selected donation amount button.
─────────────────────────────────────────────────────── */
function initDonationButtons() {
  const amountBtns = document.querySelectorAll('.amount-btn');
  const customInput = document.getElementById('custom-amount');

  amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      /* Remove active from all, add to clicked */
      amountBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      /* Fill custom input with selected amount if exists */
      if (customInput && !btn.dataset.custom) {
        customInput.value = btn.dataset.amount || btn.textContent.replace(/[^\d]/g,'');
      }
    });
  });
}


/* ── CONTACT FORM BASIC VALIDATION ──────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    /* In a real deployment, send form data to your server or a service
       like Formspree (https://formspree.io) or EmailJS here */

    /* For now, show a simple thank-you message */
    form.innerHTML = `
      <div style="text-align:center; padding:40px 0;">
        <div style="font-size:3rem; margin-bottom:16px;">✅</div>
        <h3 style="font-family:'Playfair Display',serif; margin-bottom:8px;">Message Sent!</h3>
        <p style="color:#4a5e52;">Thank you for reaching out. We'll get back to you within 2 business days.</p>
      </div>
    `;
  });
}


/* ── INITIALIZE ALL FUNCTIONS ON PAGE LOAD ──────────── */
document.addEventListener('DOMContentLoaded', () => {
  initFadeIn();
  initCounters();
  initLightbox();
  initDonationButtons();
  initContactForm();
});
