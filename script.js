/* =========================
   KHAN TECH PREMIUM JS
========================== */

document.addEventListener("DOMContentLoaded", () => {
  const whatsappNumber = "923274829841"; // 03274829841 => international format

  const preloader = document.getElementById("preloader");
  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const scrollProgress = document.getElementById("scrollProgress");
  const backToTop = document.getElementById("backToTop");
  const contactForm = document.getElementById("contactForm");

  const cursorDot = document.querySelector(".cursor-dot");
  const cursorOutline = document.querySelector(".cursor-outline");

  /* =========================
     PRELOADER
  ========================== */
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("hide");
    }, 700);
  });

  /* =========================
     CUSTOM CURSOR
  ========================== */
  let mouseX = 0;
  let mouseY = 0;
  let outlineX = 0;
  let outlineY = 0;

  if (window.innerWidth > 992 && cursorDot && cursorOutline) {
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function animateCursor() {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;

      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const interactiveElements = document.querySelectorAll("a, button, input, textarea, select");

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorOutline.style.width = "56px";
        cursorOutline.style.height = "56px";
        cursorOutline.style.borderColor = "rgba(124, 92, 255, 0.8)";
      });

      el.addEventListener("mouseleave", () => {
        cursorOutline.style.width = "34px";
        cursorOutline.style.height = "34px";
        cursorOutline.style.borderColor = "rgba(255,255,255,0.45)";
      });
    });
  } else {
    if (cursorDot) cursorDot.style.display = "none";
    if (cursorOutline) cursorOutline.style.display = "none";
  }

  /* =========================
     MOBILE MENU
  ========================== */
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navMenu.classList.toggle("show");
      document.body.classList.toggle("menu-open");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navMenu.classList.remove("show");
        document.body.classList.remove("menu-open");
      });
    });
  }

  /* =========================
     SCROLL EFFECTS
  ========================== */
  function handleScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    // Header sticky effect
    if (scrollTop > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Scroll progress
    if (scrollProgress) {
      scrollProgress.style.width = `${scrollPercent}%`;
    }

    // Back to top
    if (scrollTop > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }

    // Active nav links on scroll
    let currentSection = "";
    const sections = document.querySelectorAll("section[id]");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;

      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  /* =========================
     BACK TO TOP
  ========================== */
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* =========================
     REVEAL ON SCROLL
  ========================== */
  const revealElements = document.querySelectorAll(`
    .service-card,
    .why-card,
    .portfolio-card,
    .process-card,
    .testimonial-card,
    .contact-card,
    .contact-form,
    .cta-box,
    .footer-col,
    .hero-stat
  `);

  revealElements.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("show");
          }, index * 80);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealElements.forEach((el) => observer.observe(el));

  /* =========================
     HERO 3D PARALLAX
  ========================== */
  const heroCard = document.querySelector(".main-card");

  if (heroCard && window.innerWidth > 992) {
    heroCard.addEventListener("mousemove", (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 8;
      const rotateX = ((centerY - y) / centerY) * 8;

      heroCard.style.transform = `rotateY(${rotateY - 8}deg) rotateX(${rotateX}deg) translateY(-6px)`;
    });

    heroCard.addEventListener("mouseleave", () => {
      heroCard.style.transform = "rotateY(-10deg) rotateX(8deg)";
    });
  }

  /* =========================
     MAKE ALL CTA BUTTONS OPEN WHATSAPP
  ========================== */
  const ctaButtons = document.querySelectorAll(`
    a.btn,
    .service-link
  `);

  ctaButtons.forEach((btn) => {
    const text = btn.textContent.toLowerCase().trim();

    // Sab buttons ko WhatsApp pe bhejna (except "View Work" portfolio ke liye rehne de)
    if (!text.includes("view work")) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        const message = encodeURIComponent(
          `Assalamualaikum Khan Tech,\n\nI want to discuss a project.\nButton Clicked: ${btn.textContent.trim()}\n\nPlease guide me.`
        );

        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
      });
    }
  });

  /* =========================
     CONTACT INFO LINKS TO WHATSAPP
  ========================== */
  const phoneLink = document.querySelector('a[href^="tel:"]');
  if (phoneLink) {
    phoneLink.addEventListener("click", (e) => {
      e.preventDefault();
      const message = encodeURIComponent("Assalamualaikum Khan Tech, I want to discuss a project.");
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
    });
  }

  /* =========================
     CONTACT FORM -> WHATSAPP SUBMIT
  ========================== */
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const service = document.getElementById("service").value.trim();
      const budget = document.getElementById("budget").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !service || !budget || !message) {
        alert("Jani please sab fields fill karo pehle ❤️");
        return;
      }

      const whatsappMessage = encodeURIComponent(
`Assalamualaikum Khan Tech,

New Project Inquiry Received 🚀

👤 Name: ${name}
📧 Email: ${email}
🛠 Service: ${service}
💰 Budget: ${budget}
📝 Project Details: ${message}

Please reply back.`
      );

      window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank");

      contactForm.reset();
    });
  }

  /* =========================
     NEWSLETTER -> WHATSAPP
  ========================== */
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput.value.trim();

      if (!email) {
        alert("Please enter your email first.");
        return;
      }

      const message = encodeURIComponent(
        `Assalamualaikum Khan Tech,\n\nNewsletter Subscription Request:\nEmail: ${email}`
      );

      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
      newsletterForm.reset();
    });
  }

  /* =========================
     SMOOTH SECTION LINK OFFSET
  ========================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId.length > 1) {
        const targetEl = document.querySelector(targetId);

        if (targetEl) {
          e.preventDefault();
          const offsetTop = targetEl.offsetTop - 100;

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }
    });
  });
});