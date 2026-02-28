/* =============================================
  FOOTER — assets/js/footer.js

  Edit this file to change footer content across ALL pages.
  Just edit the values below — the footer rebuilds automatically.
============================================= */

/* ── ORGANIZATION DETAILS — Edit these ──────────────── */
const orgName      = "Tumaini Foundation";
const orgTagline   = "Transforming lives and communities across Kenya through compassion, education, and opportunity.";
const regNumber    = "NGO/2012/045KE";      /* Your registration number */
const phone        = "+254 700 123 456";
const email        = "info@tumainifoundation.org";
const poBox        = "P.O. Box 1234 – 00100, Nairobi, Kenya";
const physicalAddr = "Westlands Business Park, Nairobi";
const year         = new Date().getFullYear(); /* Auto-updates each year */

/* ── QUICK LINKS — matches the nav pages ─────────────── */
const quickLinks = [
  { label: "About Us",       href: "about.html" },
  { label: "Our Programs",   href: "programs.html" },
  { label: "Our Team",       href: "team.html" },
  { label: "Gallery",        href: "gallery.html" },
  { label: "Contact Us",     href: "contact.html" },
  { label: "Donate",         href: "donate.html" },
];

/* ── PROGRAMS LIST ──────────────────────────────────── */
const programs = [
  "Scholarship Program",
  "Community Development",
  "Food & Nutrition",
  "Skills & Livelihood",
  "Healthcare Access",
  "Environmental Action",
];

/* ── SOCIAL MEDIA LINKS — Replace # with real URLs ───── */
const socials = [
  { icon: "📘", label: "Facebook",  href: "#" },
  { icon: "🐦", label: "Twitter",   href: "#" },
  { icon: "📸", label: "Instagram", href: "#" },
  { icon: "▶️",  label: "YouTube",   href: "#" },
];

/* ── BUILD & INJECT FOOTER ──────────────────────────── */
function getFooterPath(path) {
  /* Works from both root and /pages/ directory */
  const isInPages = window.location.pathname.includes('/pages/');
  return isInPages ? path : 'pages/' + path;
}

function renderFooter() {
  const quickLinksHTML = quickLinks
    .map(l => `<li><a href="${getFooterPath(l.href)}">${l.label}</a></li>`)
    .join('');

  const programsHTML = programs
    .map(p => `<li><a href="${getFooterPath('programs.html')}">${p}</a></li>`)
    .join('');

  const socialsHTML = socials
    .map(s => `<a href="${s.href}" title="${s.label}" style="font-size:1.4rem; margin-right:12px;">${s.icon}</a>`)
    .join('');

  const footerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">

          <!-- Column 1: Brand & description -->
          <div class="footer-brand">
            <div class="nav-logo-text" style="color:white; font-size:1.3rem;">
              ${orgName}
              <span style="color:rgba(255,255,255,0.4);">Empowering Kenya</span>
            </div>
            <p>${orgTagline}</p>
            <p style="margin-top:8px; font-size:0.8rem; color:rgba(255,255,255,0.35);">
              Reg. No: ${regNumber}
            </p>
            <!-- Social Media Icons -->
            <div style="margin-top:20px;">
              ${socialsHTML}
            </div>
          </div>

          <!-- Column 2: Quick Links -->
          <div>
            <h4>Quick Links</h4>
            <ul class="footer-links">${quickLinksHTML}</ul>
          </div>

          <!-- Column 3: Programs -->
          <div>
            <h4>Our Programs</h4>
            <ul class="footer-links">${programsHTML}</ul>
          </div>

          <!-- Column 4: Contact Info -->
          <div>
            <h4>Get In Touch</h4>
            <div class="footer-contact-item">
              <span>📍</span>
              <div>${physicalAddr}<br/>${poBox}</div>
            </div>
            <div class="footer-contact-item">
              <span>📞</span>
              <div><a href="tel:${phone.replace(/\s/g,'')}" style="color:inherit;">${phone}</a></div>
            </div>
            <div class="footer-contact-item">
              <span>✉️</span>
              <div><a href="mailto:${email}" style="color:inherit;">${email}</a></div>
            </div>
          </div>

        </div><!-- end footer-grid -->

        <!-- Bottom bar -->
        <div class="footer-bottom">
          © ${year} ${orgName}. All rights reserved.
          &nbsp;|&nbsp;
          <a href="${getFooterPath('contact.html')}" style="color:inherit;">Privacy Policy</a>
          &nbsp;|&nbsp;
          Nairobi, Kenya 🇰🇪
        </div>
      </div>
    </footer>
  `;

  const placeholder = document.getElementById('footer-placeholder');
  if (placeholder) placeholder.innerHTML = footerHTML;
}

renderFooter();
