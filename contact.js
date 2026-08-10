/* =========================================================
   ELORA TECH — CONTACT PAGE JAVASCRIPT
   RESPONSIVE NAVIGATION + FORM + ANIMATIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");
    const navbar = document.querySelector(".navbar");

    function closeMobileMenu() {

        if (!menuBtn || !navLinks) return;

        navLinks.classList.remove("mobile-active");
        menuBtn.classList.remove("active");

        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open navigation menu");

        const icon = menuBtn.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    }


    function openMobileMenu() {

        if (!menuBtn || !navLinks) return;

        navLinks.classList.add("mobile-active");
        menuBtn.classList.add("active");

        menuBtn.setAttribute("aria-expanded", "true");
        menuBtn.setAttribute("aria-label", "Close navigation menu");

        const icon = menuBtn.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        }
    }


    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", (event) => {

            event.stopPropagation();

            if (navLinks.classList.contains("mobile-active")) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }

        });


        /* Close after clicking a navigation link */

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                closeMobileMenu();

            });

        });


        /* Close when clicking outside */

        document.addEventListener("click", (event) => {

            if (
                navLinks.classList.contains("mobile-active") &&
                !navLinks.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {

                closeMobileMenu();

            }

        });


        /* Keyboard support */

        menuBtn.addEventListener("keydown", (event) => {

            if (event.key === "Enter" || event.key === " ") {

                event.preventDefault();

                if (navLinks.classList.contains("mobile-active")) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }

            }

        });

    }


    /* =====================================================
       CLOSE MENU ON RESIZE
    ===================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {

            closeMobileMenu();

        }

    });


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }

    window.addEventListener("scroll", updateNavbar);

    updateNavbar();


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const form = document.querySelector(".contact-form form");

    if (form) {

        form.addEventListener("submit", (event) => {

            event.preventDefault();

            const button = form.querySelector("button");

            if (!button) return;

            const originalContent = button.innerHTML;

            button.disabled = true;

            button.innerHTML =
                '<i class="fas fa-spinner fa-spin"></i> Sending...';


            setTimeout(() => {

                button.innerHTML =
                    '<i class="fas fa-check"></i> Message Sent';

                button.style.background =
                    "linear-gradient(135deg,#22c55e,#4ade80)";

                form.reset();


                setTimeout(() => {

                    button.innerHTML = originalContent;

                    button.style.background = "";

                    button.disabled = false;

                }, 2500);

            }, 1200);

        });

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".info-card, .contact-form, .network, .faq-card, .cta"
    );


    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "reveal-visible"
                        );

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        revealElements.forEach(element => {

            element.classList.add("reveal");

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("reveal-visible");

        });

    }

});