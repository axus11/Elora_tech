/* =========================================================
   ELORA TECH — STAFF PAGE JAVASCRIPT
   MOBILE NAVIGATION + SCROLL + REVEAL + BACK TO TOP
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        const icon = menuBtn.querySelector("i");

        function openMenu() {

            navLinks.classList.add("mobile-active");
            menuBtn.classList.add("active");

            if (icon) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            }

            menuBtn.setAttribute(
                "aria-label",
                "Close navigation menu"
            );
        }

        function closeMenu() {

            navLinks.classList.remove("mobile-active");
            menuBtn.classList.remove("active");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

            menuBtn.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        }

        menuBtn.addEventListener("click", (e) => {

            e.stopPropagation();

            if (
                navLinks.classList.contains("mobile-active")
            ) {
                closeMenu();
            } else {
                openMenu();
            }

        });


        /* Close after clicking a link */

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                closeMenu();
            });

        });


        /* Close when clicking outside */

        document.addEventListener("click", (e) => {

            if (
                navLinks.classList.contains("mobile-active") &&
                !navLinks.contains(e.target) &&
                !menuBtn.contains(e.target)
            ) {
                closeMenu();
            }

        });


        /* Keyboard support */

        menuBtn.addEventListener("keydown", (e) => {

            if (
                e.key === "Enter" ||
                e.key === " "
            ) {

                e.preventDefault();

                menuBtn.click();

            }

        });


        /* ESC closes menu */

        document.addEventListener("keydown", (e) => {

            if (e.key === "Escape") {
                closeMenu();
            }

        });


        /* Close menu when returning to desktop */

        window.addEventListener("resize", () => {

            if (window.innerWidth > 768) {
                closeMenu();
            }

        });

    }


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (!navbar) return;

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    document
        .querySelectorAll(".nav-links a")
        .forEach(link => {

            const linkPage =
                link.getAttribute("href")
                    ?.split("/")
                    .pop()
                    .toLowerCase();

            if (linkPage === currentPage) {
                link.classList.add("active");
            }

        });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".executive-card, " +
        ".team-card, " +
        ".department-grid div, " +
        ".node, " +
        ".skill, " +
        ".award, " +
        ".stat, " +
        ".cta"
    );

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "reveal-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

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


    /* =====================================================
       SKILL BAR ANIMATION
    ===================================================== */

    const progressBars =
        document.querySelectorAll(".progress div");

    if ("IntersectionObserver" in window) {

        const skillObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            const bar =
                                entry.target;

                            const targetWidth =
                                bar.style.width;

                            bar.style.width = "0%";

                            requestAnimationFrame(() => {

                                bar.style.transition =
                                    "width 1.5s ease";

                                bar.style.width =
                                    targetWidth;

                            });

                            observer.unobserve(
                                bar
                            );

                        }

                    });

                },
                {
                    threshold: 0.4
                }
            );

        progressBars.forEach(bar => {
            skillObserver.observe(bar);
        });

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    let backToTop =
        document.querySelector(".back-to-top");

    if (!backToTop) {

        backToTop =
            document.createElement("a");

        backToTop.href = "#";
        backToTop.className = "back-to-top";

        backToTop.innerHTML =
            '<i class="fa-solid fa-arrow-up"></i>';

        document.body.appendChild(backToTop);

    }


    backToTop.style.opacity = "0";
    backToTop.style.pointerEvents = "none";

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backToTop.style.opacity = "1";
            backToTop.style.pointerEvents = "auto";

        } else {

            backToTop.style.opacity = "0";
            backToTop.style.pointerEvents = "none";

        }

    });


    backToTop.addEventListener("click", (e) => {

        e.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =====================================================
       IMAGE FALLBACK
    ===================================================== */

    document
        .querySelectorAll(".executive-card img")
        .forEach(img => {

            img.addEventListener("error", () => {

                img.src =
                    "https://placehold.co/400x400/020617/DAA520?text=ELORA";

            });

        });


    /* =====================================================
       PAGE LOADED
    ===================================================== */

    document.body.classList.add("page-loaded");

});