document.addEventListener("DOMContentLoaded", () => {
  // ==================== MODE SWITCHING FUNCTIONALITY ====================
  
  let currentMode = sessionStorage.getItem("portfolioMode") || null;
  
  const landingSection = document.querySelector(".landing-section");
  const modeIndicator = document.getElementById("mode-indicator");
  const currentModeText = document.getElementById("current-mode-text");
  const switchModeBtn = document.getElementById("switch-mode-btn");
  const modeSwitcher = document.getElementById("mode-switcher");
  const navMenu = document.getElementById("nav-menu");
  
  const softwareDevContent = document.getElementById("software-dev-content");
  const cybersecurityContent = document.getElementById("cybersecurity-content");
  
  // Navigation items for each mode
  const navigationItems = {
    "software-dev": [
      { href: "#about", label: "About" },
      { href: "#education", label: "Education" },
      { href: "#skills", label: "Skills" },
      { href: "#projects", label: "Projects" },
      { href: "#experience", label: "Experience" },
      { href: "#contact", label: "Contact" }
    ],
    "cybersecurity": [
      { href: "#cybersecurity", label: "Overview" },
      { href: "#cybersecurity", label: "Projects" },
      { href: "#cybersecurity", label: "Skills" },
      { href: "#cybersecurity", label: "Certifications" },
      { href: "#contact", label: "Contact" }
    ]
  };
  
  // Initialize mode if previously selected
  if (currentMode) {
    activateMode(currentMode, false);
  }
  
  // Career Path Cards Click Handlers
  const careerCards = document.querySelectorAll(".career-card");
  
  careerCards.forEach(card => {
    card.addEventListener("click", function() {
      const path = this.getAttribute("data-path");
      activateMode(path, true);
    });
    
    card.addEventListener("keydown", function(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const path = this.getAttribute("data-path");
        activateMode(path, true);
      }
    });
    
    // Add focus styles for accessibility
    card.addEventListener("focus", function() {
      this.style.outline = "3px solid var(--primary)";
      this.style.outlineOffset = "4px";
    });
    
    card.addEventListener("blur", function() {
      this.style.outline = "none";
    });
  });
  
  // Switch Mode Button Handler
  if (switchModeBtn) {
    switchModeBtn.addEventListener("click", () => {
      const newMode = currentMode === "software-dev" ? "cybersecurity" : "software-dev";
      activateMode(newMode, true);
    });
  }
  
  // Mode Switcher Buttons in Header
  const modeBtns = document.querySelectorAll(".mode-btn");
  modeBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      const mode = this.getAttribute("data-mode");
      activateMode(mode, true);
    });
  });
  
  // Logo Click Handler - Return to Landing
  const logoLink = document.querySelector(".logo-link");
  if (logoLink) {
    logoLink.addEventListener("click", function(e) {
      e.preventDefault();
      returnToLanding();
    });
  }
  
  // Main Mode Activation Function
  function activateMode(mode, animate = true) {
    currentMode = mode;
    sessionStorage.setItem("portfolioMode", mode);
    
    // Hide landing section
    if (landingSection) {
      if (animate) {
        landingSection.style.transition = "opacity 0.5s ease";
        landingSection.style.opacity = "0";
        setTimeout(() => {
          landingSection.classList.remove("active");
          landingSection.style.display = "none";
        }, 500);
      } else {
        landingSection.classList.remove("active");
        landingSection.style.display = "none";
      }
    }
    
    // Show mode indicator and switcher
    if (modeIndicator) {
      modeIndicator.style.display = "block";
    }
    if (modeSwitcher) {
      modeSwitcher.style.display = "flex";
    }
    
    // Update mode indicator text
    if (currentModeText) {
      currentModeText.textContent = mode === "software-dev" ? "Software Developer" : "Cybersecurity Analyst";
    }
    
    // Update mode switcher buttons
    modeBtns.forEach(btn => {
      if (btn.getAttribute("data-mode") === mode) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
    
    // Update navigation
    updateNavigation(mode);
    
    // Switch content with animation
    switchContent(mode, animate);
  }
  
  // Content Switching Function
  function switchContent(mode, animate = true) {
    const mainContent = document.getElementById('main-content');
    
    // Remove existing mode classes
    document.body.classList.remove('mode-software');
    document.body.classList.remove('mode-cybersecurity');

    // Add new mode class based on selection
    if (mode === 'software-dev') {
        document.body.classList.add('mode-software');
    } else {
        document.body.classList.add('mode-cybersecurity');
    }

    if (mainContent) {
        // Ensure display block is set explicitly, overriding CSS display: none if needed
        mainContent.style.display = 'block';
        
        if (animate) {
            mainContent.style.opacity = '0';
            setTimeout(() => {
                mainContent.style.opacity = '1';
            }, 50);
        } else {
            mainContent.style.opacity = '1';
        }
    }
  }

  // Update Navigation Menu
  function updateNavigation(mode) {
    if (!navMenu) return;
    
    navMenu.innerHTML = "";
    // Shared structure means navigation paths are mostly the same, just labels might change
    // But since the sections are shared (#projects, #skills), we can use a standard set
    // or customize labels if needed.
    const items = mode === 'software-dev' ? [
        { href: "#about", label: "About" },
        { href: "#skills", label: "Skills" },
        { href: "#projects", label: "Projects" },
        { href: "#experience", label: "Experience" },
        { href: "#contact", label: "Contact" }
    ] : [
        { href: "#about", label: "About" },
        { href: "#skills", label: "Cyber Skills" },
        { href: "#projects", label: "Security Projects" },
        // Certifications are inside Skills now, or we can link adjacent
        { href: "#contact", label: "Contact" }
    ];
    
    items.forEach(item => {
      const li = document.createElement("li");
      const a = document.createElement("a");

      a.href = item.href;
      a.className = "nav-link";
      a.textContent = item.label;
      
      // Add click handler for smooth scrolling
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = item.href.substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          const offset = 160; // Account for fixed header + mode indicator
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });
        }
        
        // Close mobile menu if open
        const navbar = document.getElementById("navbar");
        if (navbar && navbar.classList.contains("active")) {
          navbar.classList.remove("active");
        }
      });
      
      li.appendChild(a);
      navMenu.appendChild(li);
    });
  }
  
  // Return to Landing Function
  function returnToLanding() {
    currentMode = null;
    sessionStorage.removeItem("portfolioMode");
    
    // Hide all content
    if (softwareDevContent) {
      softwareDevContent.style.display = "none";
    }
    if (cybersecurityContent) {
      cybersecurityContent.style.display = "none";
    }
    
    // Hide mode indicator and switcher
    if (modeIndicator) {
      modeIndicator.style.display = "none";
    }
    if (modeSwitcher) {
      modeSwitcher.style.display = "none";
    }
    
    // Show landing section
    if (landingSection) {
      landingSection.style.display = "flex";
      landingSection.classList.add("active");
      landingSection.style.opacity = "0";
      setTimeout(() => {
        landingSection.style.opacity = "1";
      }, 50);
    }
    
    // Clear navigation
    if (navMenu) {
      navMenu.innerHTML = "";
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  
  // ==================== EXISTING FUNCTIONALITY ====================
  
  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear()
  const header = document.getElementById("header")
  const scrollThreshold = 50

  function handleScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  }

  window.addEventListener("scroll", handleScroll)
  handleScroll() // Initial check

  // Mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle")
  const navbar = document.getElementById("navbar")

  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active")
  })

  // Close mobile menu when clicking a nav link
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navbar.classList.remove("active")
    })
  })

  // Theme toggle
  const themeToggle = document.getElementById("theme-toggle")
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")

  // Check for saved theme preference or use the system preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches)) {
    document.body.classList.add("dark-theme")
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme")
    const theme = document.body.classList.contains("dark-theme") ? "dark" : "light"
    localStorage.setItem("theme", theme)
  })

  // Back to top button
  const backToTopButton = document.getElementById("back-to-top")

  function toggleBackToTopButton() {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("visible")
    } else {
      backToTopButton.classList.remove("visible")
    }
  }

  window.addEventListener("scroll", toggleBackToTopButton)
  toggleBackToTopButton() // Initial check

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Skills slider functionality
  const sliderContainers = document.querySelectorAll(".skills-slider-container")

  sliderContainers.forEach((container) => {
    const track = container.querySelector(".skills-track")
    const prevBtn = container.querySelector(".prev-arrow")
    const nextBtn = container.querySelector(".next-arrow")
    const cards = track.querySelectorAll(".skill-card")

    let currentIndex = 0
    let cardWidth = 0
    let cardsPerView = 4

    function updateSliderLayout() {
      if (window.innerWidth < 576) {
        cardsPerView = 1
      } else if (window.innerWidth < 768) {
        cardsPerView = 2
      } else if (window.innerWidth < 992) {
        cardsPerView = 3
      } else {
        cardsPerView = 4
      }

      // Reset position
      currentIndex = 0
      updateSliderPosition()
    }

    function updateSliderPosition() {
      const card = cards[0]
      cardWidth = card.offsetWidth + Number.parseInt(getComputedStyle(card).marginRight)

      const maxIndex = Math.max(0, cards.length - cardsPerView)
      currentIndex = Math.min(currentIndex, maxIndex)

      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`

      // Update button states
      prevBtn.disabled = currentIndex === 0
      nextBtn.disabled = currentIndex >= maxIndex

      prevBtn.style.opacity = prevBtn.disabled ? "0.5" : "1"
      nextBtn.style.opacity = nextBtn.disabled ? "0.5" : "1"
    }

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--
        updateSliderPosition()
      }
    })

    nextBtn.addEventListener("click", () => {
      if (currentIndex < cards.length - cardsPerView) {
        currentIndex++
        updateSliderPosition()
      }
    })

    // Initialize slider
    window.addEventListener("resize", updateSliderLayout)
    updateSliderLayout()
  })

  // Contact form handling with EmailJS
  const contactForm = document.getElementById("contact-form");
  const formSuccess = document.getElementById("form-success");

  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      // Update button state
      const submitBtn = contactForm.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;
      
      // Get form data
      const userName = document.getElementById("name").value;
      const userEmail = document.getElementById("email").value;
      const userMessage = document.getElementById("message").value;
      
      // Prepare template parameters to send you the message
      const templateParams = {
        to_email: "banjadesachin2060@gmail.com", // Your email
        from_name: userName,
        from_email: userEmail,
        message: userMessage,
        reply_to: userEmail
      };
      
      // Send the message to your email
      emailjs.send(
        'service_938122z',
        'template_njvjenl', // Your notification template ID
        templateParams
      )
      .then(function() {
        console.log('SUCCESS! Email sent to your inbox');
        // Show success message
        contactForm.style.display = "none";
        formSuccess.style.display = "block";
        formSuccess.textContent = "Thank you for your message! I'll get back to you soon.";
        formSuccess.style.backgroundColor = "rgba(13, 110, 253, 0.1)";
        formSuccess.style.color = "#0d6efd";
        
        // Reset form
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          formSuccess.style.display = "none";
          contactForm.style.display = "block";
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 5000);
      })
      .catch(function(error) {
        console.error('FAILED...', error);
        // Show detailed error message
        formSuccess.style.display = "block";
        formSuccess.textContent = "Failed to send message. Please try again or contact me directly.";
        formSuccess.style.backgroundColor = "rgba(220, 53, 69, 0.1)";
        formSuccess.style.color = "#dc3545";
        
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        setTimeout(() => {
          formSuccess.style.display = "none";
        }, 5000);
      });
    });
  }
})