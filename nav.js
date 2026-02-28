/* =============================================
  NAVIGATION — assets/js/nav.js

  This file creates the navigation bar and injects
  it into every page that has <div id="nav-placeholder"></div>

  TO ADD A NEW PAGE TO THE MENU:
  1. Create your .html file inside the /pages/ folder
  2. Add a new { label, href } object to the navLinks array below
  3. That's it! It will appear on every page automatically.

  TO CHANGE THE LOGO:
  - Replace the img src with your logo file path
  - If no image, the text fallback will show instead
============================================= */

const navLinks = [
  /* Each object = one menu item */
  /* label: text shown | href: page to link to */
  /* NOTE: paths work from /pages/ folder for sub-pages */
  { label: "Home",      href: getPath("index.html") },
  { label: "About Us",  href: getPath("about.html") },
  { label: "Programs",  href: getPath("programs.html") },
  { label: "Our Team",  href: getPath("team.html") },
  { label: "Gallery",   href: getPath("gallery.html") },
  { label: "Contact",   href: getPath("contact.html") },

{ label: "Donate",      href: getPath("donate.html") },


];


/*
  getPath() figures out the correct relative path
  based on whether we are in the root or /pages/ folder.
  You don't need to edit this function.
*/
function getPath(path) {
  const isInPages = window.location.pathname.includes('/pages/');
  if (isInPages) {
    /* If we're inside /pages/, go one level up for root files */
    return path.startsWith('pages/') ? path.replace('pages/', '') : '../' + path;
  }
  return path;
}

/* Highlight the current page link */
function setActiveLink(links) {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const linkPage = link.href.split('/').pop();
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
}

/* Build and insert the nav HTML */
function renderNav() {
  const linksHTML = navLinks
    .map(link => `
      <li>
        <a href="${link.href}"
           ${link.label === "Donate" ? 'class="nav-donate-btn"' : ''}>
          ${link.label}
        </a>
      </li>`)
    .join('');

  const navHTML = `
    <nav class="navbar">
      <!-- LOGO — replace img src with your logo file -->
      <a href="${getPath('index.html')}" class="nav-logo">
        <img
          src="${getPath('assets/images/logo.png')}"
          alt="Organization Logo"
          onerror="this.style.display='none'"
        />
        <!-- Text fallback shown if image fails to load -->
        <div class="nav-logo-text">
          Tulinde Wakongwe
          <span>Empowering Kenya</span>
        </div>
      </a>

      <!-- Desktop links -->
      <ul class="nav-links" id="navLinks">
        ${linksHTML}
        <!-- Donate button — always last in menu -->
        <li><a href="${getPath('pages/donate.html')}" class="nav-donate-btn">Donate</a></li>
      </ul>

      <!-- Mobile hamburger button -->
      <button class="nav-toggle" id="navToggle" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
    </nav>
  `;

  /* Insert into the placeholder div */
  const placeholder = document.getElementById('nav-placeholder');
  if (placeholder) placeholder.innerHTML = navHTML;

  /* Set active state on current page link */
  const allLinks = document.querySelectorAll('.nav-links a:not(.nav-donate-btn)');
  setActiveLink(allLinks);

  /* Mobile toggle — opens/closes menu */
  const toggle = document.getElementById('navToggle');
  const navLinksEl = document.getElementById('navLinks');
  if (toggle && navLinksEl) {
    toggle.addEventListener('click', () => {
      navLinksEl.classList.toggle('open');
    });
  }
}

/* Run when page loads */
renderNav();
