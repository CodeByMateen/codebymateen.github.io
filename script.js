// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up");
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(".project-card, .stat-item, .contact-item")
  .forEach((el) => {
    observer.observe(el);
  });

// Counter animation for stats
const animateCounters = () => {
  const counters = document.querySelectorAll(".stat-item h3");

  counters.forEach((counter) => {
    const target = parseInt(counter.textContent.replace("+", ""));
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.floor(current) + "+";
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + "+";
      }
    };

    // Start animation when element is visible
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCounter();
          counterObserver.unobserve(entry.target);
        }
      });
    });

    counterObserver.observe(counter);
  });
};

// Initialize counter animation
animateCounters();

// Contact form handling
const contactForm = document.querySelector(".contact-form form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
    const message = contactForm.querySelector("textarea").value;

    // Basic validation
    if (!name || !email || !subject || !message) {
      showNotification("Please fill in all fields", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showNotification("Please enter a valid email address", "error");
      return;
    }

    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    setTimeout(() => {
      showNotification(
        "Message sent successfully! I'll get back to you soon.",
        "success"
      );
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;

  // Set background color based on type
  switch (type) {
    case "success":
      notification.style.background =
        "linear-gradient(135deg, #28a745, #20c997)";
      break;
    case "error":
      notification.style.background =
        "linear-gradient(135deg, #dc3545, #fd7e14)";
      break;
    default:
      notification.style.background =
        "linear-gradient(135deg, #3b82f6, #06b6d4)";
  }

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}

// Pause animations on hover for sliders
const pauseOnHover = (selector) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      element.style.animationPlayState = "paused";
    });
    element.addEventListener("mouseleave", () => {
      element.style.animationPlayState = "running";
    });
  });
};

// Apply pause on hover to skills slider only (keep clients and reviews moving)
pauseOnHover(".skills-track");

// Add click handlers for project links
document.querySelectorAll(".project-links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const linkText = link.textContent;

    if (linkText === "Live Demo") {
      showNotification("Demo link will be available soon!", "info");
    } else if (linkText === "GitHub") {
      showNotification(
        "GitHub repository will be shared upon request!",
        "info"
      );
    }
  });
});

// Add hover effects to cards
const addHoverEffects = () => {
  const cards = document.querySelectorAll(
    ".project-card, .stat-item, .contact-item, .skill-item, .client-item, .review-item"
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)";
      card.style.boxShadow = "0 20px 40px rgba(0,0,0,0.2)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
      card.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
    });
  });
};

// Initialize hover effects
addHoverEffects();

// Typing animation for hero section
const typeWriter = (element, text, speed = 100) => {
  let i = 0;
  element.textContent = "";

  const type = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  };

  type();
};

// Initialize typing animation when page loads
window.addEventListener("load", () => {
  const heroSubtitle = document.querySelector(".hero-subtitle");
  if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    typeWriter(heroSubtitle, originalText, 50);
  }
});

// Add scroll indicator
const createScrollIndicator = () => {
  const indicator = document.createElement("div");
  indicator.className = "scroll-indicator";
  indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
        z-index: 9999;
        transition: width 0.3s ease;
    `;

  document.body.appendChild(indicator);

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset;
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / documentHeight) * 100;
    indicator.style.width = scrollPercent + "%";
  });
};

// Initialize scroll indicator
createScrollIndicator();

// Add subtle parallax effect to hero section (reduced to prevent overlapping)
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.2}px)`;
  }
});

// Add loading animation
window.addEventListener("load", () => {
  // Remove loading class from body if it exists
  document.body.classList.remove("loading");

  // Add entrance animations
  const elements = document.querySelectorAll(".hero-content, .hero-image");
  elements.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";

    setTimeout(() => {
      element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, index * 200);
  });
});

// Add active navigation highlighting
const highlightActiveNav = () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
};

// Initialize active navigation highlighting
highlightActiveNav();

// Add CSS for active navigation
const style = document.createElement("style");
style.textContent = `
    .nav-link.active {
        color: #3b82f6;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Dynamic copyright year
const updateCopyright = () => {
  const currentYear = new Date().getFullYear();
  const copyrightElement = document.querySelector(".footer-text p");
  if (copyrightElement) {
    copyrightElement.textContent = `© ${currentYear} Mateen Shahzad. All rights reserved.`;
  }
};

// Update copyright when page loads
updateCopyright();

console.log("Portfolio website loaded successfully! 🚀");
