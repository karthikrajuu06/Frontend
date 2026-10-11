
/* =========================================
   KARTHEEK ATMAKURU - PORTFOLIO JAVASCRIPT
   Vanilla JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENT SELECTORS
    ========================================= */

    const siteHeader = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");
    const backToTop = document.querySelector(".back-to-top");
    const contactForm = document.querySelector(".contact-form");
    const footerYear = document.querySelector("#current-year");


    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen = menuToggle.classList.toggle("active");

            navMenu.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        // Close mobile menu when a link is clicked
        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");
                navMenu.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

            });

        });


        // Close menu when clicking outside
        document.addEventListener("click", (event) => {

            const clickedInsideMenu =
                navMenu.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedToggle &&
                navMenu.classList.contains("active")
            ) {

                menuToggle.classList.remove("active");
                navMenu.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");
            }

        });

    }


    /* =========================================
       STICKY NAVBAR ON SCROLL
    ========================================= */

    function handleNavbarScroll() {

        if (!siteHeader) {
            return;
        }

        if (window.scrollY > 40) {

            siteHeader.classList.add("scrolled");

        } else {

            siteHeader.classList.remove("scrolled");

        }

    }

    window.addEventListener("scroll", handleNavbarScroll);

    handleNavbarScroll();


    /* =========================================
       ACTIVE NAVIGATION LINK
    ========================================= */

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop = section.offsetTop - 130;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection = section.getAttribute("id");

            }

        });


        navLinks.forEach((link) => {

            link.classList.remove("active");

            const target = link.getAttribute("href");

            if (target === `#${currentSection}`) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", updateActiveNav);

    updateActiveNav();


    /* =========================================
       SCROLL REVEAL ANIMATION
    ========================================= */

    const revealElements = document.querySelectorAll(
        ".section, .project-card, .skill-category, .timeline-item, .education-card, .developer-card, .contact-content"
    );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

    });


    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });


    /* =========================================
       STAGGER PROJECT CARD ANIMATION
    ========================================= */

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card, index) => {

        card.style.transitionDelay = `${index * 80}ms`;

    });


    /* =========================================
       SKILL CARD MICRO INTERACTION
    ========================================= */

    const skillCards = document.querySelectorAll(".skill-card");

    skillCards.forEach((card) => {

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateY(-3px) scale(1.02)";

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /* =========================================
       PROJECT IMAGE TILT EFFECT
       Lightweight mouse interaction
    ========================================= */

    const projectCardsForTilt =
        document.querySelectorAll(".project-card");


    projectCardsForTilt.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            // Disable effect on small screens
            if (window.innerWidth <= 800) {
                return;
            }

            const rect = card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -2;

            const rotateY =
                ((x - centerX) / centerX) * 2;

            card.style.transform =
                `translateY(-8px) perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /* =========================================
       BACK TO TOP BUTTON
    ========================================= */

    function handleBackToTop() {

        if (!backToTop) {
            return;
        }

        if (window.scrollY > 600) {

            backToTop.style.opacity = "1";
            backToTop.style.visibility = "visible";

        } else {

            backToTop.style.opacity = "0";
            backToTop.style.visibility = "hidden";

        }

    }

    window.addEventListener("scroll", handleBackToTop);

    handleBackToTop();


    if (backToTop) {

        backToTop.addEventListener("click", (event) => {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =========================================
       HERO TYPING EFFECT
    ========================================= */

    const heroRole = document.querySelector(".hero-role");


    if (heroRole) {

        const roles = [
            "Java Full Stack Developer",
            "Software Developer Fresher",
            "Java Developer"
        ];

        let roleIndex = 0;
        let characterIndex = 0;
        let deleting = false;


        function typeRole() {

            const currentRole = roles[roleIndex];

            if (!deleting) {

                heroRole.textContent =
                    currentRole.substring(0, characterIndex + 1);

                characterIndex++;


                if (characterIndex === currentRole.length) {

                    deleting = true;

                    setTimeout(typeRole, 1800);

                    return;

                }

            } else {

                heroRole.textContent =
                    currentRole.substring(0, characterIndex - 1);

                characterIndex--;


                if (characterIndex === 0) {

                    deleting = false;

                    roleIndex =
                        (roleIndex + 1) % roles.length;

                }

            }


            const typingSpeed =
                deleting ? 45 : 85;

            setTimeout(typeRole, typingSpeed);

        }


        // Respect reduced motion preference
        const prefersReducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        if (!prefersReducedMotion) {

            typeRole();

        }

    }


    /* =========================================
       CONTACT FORM VALIDATION
    ========================================= */

    if (contactForm) {

        contactForm.addEventListener("submit", (event) => {

            event.preventDefault();


            const nameInput =
                contactForm.querySelector("#name");

            const emailInput =
                contactForm.querySelector("#email");

            const messageInput =
                contactForm.querySelector("#message");


            const name =
                nameInput ? nameInput.value.trim() : "";

            const email =
                emailInput ? emailInput.value.trim() : "";

            const message =
                messageInput ? messageInput.value.trim() : "";


            // Basic validation
            if (name === "") {

                showFormMessage(
                    "Please enter your name.",
                    "error"
                );

                nameInput.focus();

                return;

            }


            if (email === "") {

                showFormMessage(
                    "Please enter your email address.",
                    "error"
                );

                emailInput.focus();

                return;

            }


            if (!isValidEmail(email)) {

                showFormMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                emailInput.focus();

                return;

            }


            if (message === "") {

                showFormMessage(
                    "Please enter your message.",
                    "error"
                );

                messageInput.focus();

                return;

            }


            // At this stage the form is only validated.
            // It is not connected to a backend yet.

            showFormMessage(
                "Thanks! Your message is ready to be connected to an email service.",
                "success"
            );


            contactForm.reset();

        });

    }


    /* =========================================
       EMAIL VALIDATION
    ========================================= */

    function isValidEmail(email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);

    }


    /* =========================================
       FORM MESSAGE
    ========================================= */

    function showFormMessage(message, type) {

        let messageElement =
            contactForm.querySelector(".form-message");


        if (!messageElement) {

            messageElement =
                document.createElement("p");

            messageElement.className =
                "form-message";

            contactForm.appendChild(messageElement);

        }


        messageElement.textContent = message;

        messageElement.className =
            `form-message ${type}`;


        // Remove message automatically
        setTimeout(() => {

            if (messageElement) {

                messageElement.remove();

            }

        }, 5000);

    }


    /* =========================================
       CURRENT YEAR
    ========================================= */

    if (footerYear) {

        footerYear.textContent =
            new Date().getFullYear();

    }


    /* =========================================
       SMOOTH SCROLL FOR ANCHOR LINKS
    ========================================= */

    const anchorLinks =
        document.querySelectorAll('a[href^="#"]');


    anchorLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =========================================
       KEYBOARD ACCESSIBILITY
    ========================================= */

    document.addEventListener("keydown", (event) => {

        // Close mobile menu with Escape
        if (event.key === "Escape") {

            if (
                menuToggle &&
                navMenu &&
                navMenu.classList.contains("active")
            ) {

                menuToggle.classList.remove("active");
                navMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    });


    /* =========================================
       TERMINAL CURSOR FALLBACK
    ========================================= */

    const terminalCursor =
        document.querySelector(".terminal-cursor");


    if (terminalCursor) {

        terminalCursor.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /* =========================================
       LAZY LOAD PROJECT IMAGES
    ========================================= */

    const projectImages =
        document.querySelectorAll(".project-image img");


    projectImages.forEach((image) => {

        image.setAttribute("loading", "lazy");

    });


    /* =========================================
       PAGE LOADED
    ========================================= */

    document.body.classList.add("page-loaded");


});
