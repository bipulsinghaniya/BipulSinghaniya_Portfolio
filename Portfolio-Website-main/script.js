/* ============================================================
   PORTFOLIO — SCRIPT.JS  (v2 — Creative Overhaul)
   Page loader, typing effect, 3D tilt, particles, cursor glow,
   staggered animations, smooth scrolling, nav, form
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- ELEMENTS ---------- */
  const navbar      = document.getElementById('navbar');
  const navToggle   = document.getElementById('nav-toggle');
  const navMenu     = document.getElementById('nav-menu');
  const navLinks    = document.querySelectorAll('.nav-link');
  const backToTop   = document.getElementById('back-to-top');
  const sections    = document.querySelectorAll('.section, .hero');
  const reveals     = document.querySelectorAll('.reveal');
  const contactForm = document.getElementById('contact-form');
  const cursorGlow  = document.getElementById('cursor-glow');
  const pageLoader  = document.getElementById('page-loader');

  /* ==========================================================
     PAGE LOADER
     ========================================================== */
  window.addEventListener('load', () => {
    setTimeout(() => {
      pageLoader.classList.add('hidden');
    }, 500);
  });

  /* ==========================================================
     CURSOR GLOW (desktop only)
     ========================================================== */
  if (window.innerWidth > 992 && cursorGlow) {
    cursorGlow.style.display = 'block';
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });
  }

  /* ==========================================================
     TYPING EFFECT
     ========================================================== */
  const typedElement = document.getElementById('typed-text');
  const typedStrings = [
    'Computer Science Student 💻',
    'Aspiring Software Engineer 🚀',
    'Full-Stack Web Developer 🌐',
    'Open Source Enthusiast ❤️',
    'Problem Solver & Thinker 🧠',
  ];
  let stringIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 60;
  const deleteSpeed = 35;
  const pauseTime = 1800;

  function typeWriter() {
    const current = typedStrings[stringIndex];

    if (!isDeleting) {
      typedElement.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeWriter, pauseTime);
        return;
      }
    } else {
      typedElement.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        stringIndex = (stringIndex + 1) % typedStrings.length;
      }
    }

    setTimeout(typeWriter, isDeleting ? deleteSpeed : typeSpeed);
  }

  // Start typing after loader
  setTimeout(typeWriter, 450);

  /* ==========================================================
     HERO PARTICLES
     ========================================================== */
  const particleContainer = document.getElementById('hero-particles');
  if (particleContainer) {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      const size = Math.random() * 6 + 2;
      p.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${Math.random() > 0.5
          ? 'rgba(79,70,229,' + (Math.random()*.25+.05) + ')'
          : 'rgba(6,182,212,' + (Math.random()*.2+.05) + ')'};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particleFloat ${Math.random()*12+8}s ease-in-out infinite ${Math.random()*5}s;
        pointer-events: none;
      `;
      particleContainer.appendChild(p);
    }
  }

  // Add keyframe for particles dynamically
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes particleFloat {
      0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
      25% { transform: translate(${rand(-40,40)}px, ${rand(-60,20)}px) scale(1.3); opacity: 1; }
      50% { transform: translate(${rand(-30,30)}px, ${rand(-40,40)}px) scale(0.7); opacity: 0.4; }
      75% { transform: translate(${rand(-50,50)}px, ${rand(-20,60)}px) scale(1.1); opacity: 0.8; }
    }
  `;
  document.head.appendChild(styleSheet);

  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /* ==========================================================
     3D TILT EFFECT
     ========================================================== */
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale3d(1,1,1)';
      card.style.transition = 'transform .5s cubic-bezier(.34,1.56,.64,1)';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });

  /* ==========================================================
     NAVBAR
     ========================================================== */
  const handleNavScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    backToTop.classList.toggle('show', window.scrollY > 600);
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  /* Hamburger toggle */
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  /* Close on link click */
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });

  /* ==========================================================
     ACTIVE NAV LINK HIGHLIGHTING
     ========================================================== */
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { root: null, rootMargin: '-30% 0px -70% 0px', threshold: 0 });

  sections.forEach(section => sectionObserver.observe(section));

  /* ==========================================================
     SCROLL-REVEAL ANIMATION
     ========================================================== */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

  reveals.forEach(el => revealObserver.observe(el));

  /* ==========================================================
     STAGGERED CARD ANIMATIONS
     ========================================================== */
  const staggerElements = (parentSelector, childSelector) => {
    document.querySelectorAll(parentSelector).forEach(parent => {
      const children = parent.querySelectorAll(childSelector);
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            children.forEach((child, i) => {
              child.style.opacity = '0';
              child.style.transform = 'translateY(40px) scale(0.95)';
              child.style.transition = `opacity .6s cubic-bezier(.4,0,.2,1) ${i * 0.12}s, transform .6s cubic-bezier(.34,1.56,.64,1) ${i * 0.12}s`;
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  child.style.opacity = '1';
                  child.style.transform = 'translateY(0) scale(1)';
                });
              });
            });
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      obs.observe(parent);
    });
  };

  staggerElements('.projects-grid', '.project-card');
  staggerElements('.cert-scroll', '.cert-card');
  staggerElements('.about-highlights', '.highlight-card');
  staggerElements('.skills-categories', '.skill-category');
  staggerElements('.achievements-timeline', '.timeline-item');
  staggerElements('.education-timeline', '.edu-card');

  /* ==========================================================
     BACK TO TOP
     ========================================================== */
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ==========================================================
     CONTACT FORM (Powered by FormSubmit)
     ========================================================== */
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    fetch("https://formsubmit.co/ajax/8f811e0b60089714a69dced2eadace27", {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        _subject: "New Contact Form Message from Portfolio"
      })
    })
    .then(response => response.json())
    .then(data => {
      showToast('<i class="fa-solid fa-circle-check"></i> Message sent successfully!');
      contactForm.reset();
    })
    .catch(error => {
      console.error(error);
      showToast('<i class="fa-solid fa-triangle-exclamation"></i> Error sending message. Please try again.');
    })
    .finally(() => {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    });
  });

  /* ==========================================================
     TOAST
     ========================================================== */
  function showToast(html) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = html;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => toast.classList.add('show'));
    });
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

  /* ==========================================================
     SMOOTH SCROLL
     ========================================================== */
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  /* ---------- INITIAL STATE ---------- */
  handleNavScroll();
});
