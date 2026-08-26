/* EventStream – Main JavaScript */

document.addEventListener('DOMContentLoaded', () => {
  // Header scroll effect
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu toggle
  const toggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen);
      // Simple icon swap via text if needed
      toggle.innerHTML = isOpen
        ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>`;
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>`;
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 72;
        const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Intersection Observer for fade-up animations
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(el => observer.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  // Contact form handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const msg = document.getElementById('form-message');
      const name = document.getElementById('name')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const eventType = document.getElementById('event-type')?.value;
      const message = document.getElementById('message')?.value.trim();

      // Basic validation
      if (!name || !email || !eventType) {
        if (msg) {
          msg.className = 'form-message error';
          msg.textContent = 'Please fill in all required fields (Name, Email, and Event Type).';
        }
        return;
      }

      // Simple email check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        if (msg) {
          msg.className = 'form-message error';
          msg.textContent = 'Please enter a valid email address.';
        }
        return;
      }

      // Simulate successful submission
      if (msg) {
        msg.className = 'form-message success';
        msg.textContent = 'Thank you! We’ve received your message and will respond with a tailored proposal within 1 business day.';
      }
      contactForm.reset();

      // Optional: scroll message into view
      msg?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  // Active nav link highlighting based on current page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Package card hover enhancement (subtle)
  document.querySelectorAll('.package-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.zIndex = '2';
    });
    card.addEventListener('mouseleave', () => {
      card.style.zIndex = '';
    });
  });
});
