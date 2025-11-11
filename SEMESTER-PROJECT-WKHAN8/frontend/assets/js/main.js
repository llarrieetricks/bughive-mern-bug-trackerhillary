/* ============================================
   MAIN.JS - Site-wide Navigation & Functionality
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  // ============================================
  // HAMBURGER MENU TOGGLE (Mobile Navigation)
  // ============================================
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      // Update aria-expanded for accessibility
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
    });

    // Close menu when a link is clicked
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
      item.addEventListener('click', function () {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ============================================
  // ACTIVE PAGE HIGHLIGHTING
  // ============================================
  function highlightActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  highlightActivePage();

  // ============================================
  // SMOOTH SCROLLING
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // ============================================
  // ACCESSIBILITY: KEYBOARD NAVIGATION
  // ============================================
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (hamburger) {
          hamburger.setAttribute('aria-expanded', 'false');
          hamburger.focus();
        }
      }
    }
  });
});

// ============================================
// UTILITY FUNCTION: Scroll to Top
// ============================================
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
