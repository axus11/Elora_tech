/* =========================================
   ELORA TECH — PROJECTS JAVASCRIPT
   Futuristic Research Interface
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       NAVBAR SCROLL EFFECT
    ========================================= */

    const header = document.querySelector("header");

    if (header) {
        window.addEventListener("scroll", () => {

            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        });
    }


    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelector(".nav-links");

    if (navbar && navLinks) {

        let menuButton = document.querySelector(".menu-btn");

        /* Create mobile button if it doesn't exist */

        if (!menuButton) {

            menuButton = document.createElement("div");

            menuButton.className = "menu-btn";

            menuButton.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            menuButton.setAttribute(
                "role",
                "button"
            );

            menuButton.setAttribute(
                "tabindex",
                "0"
            );

            menuButton.innerHTML =
                '<i class="fas fa-bars"></i>';

            navbar.appendChild(menuButton);
        }


        const icon = menuButton.querySelector("i");


        function toggleMenu() {

            navLinks.classList.toggle("mobile-active");

            menuButton.classList.toggle("active");


            if (
                navLinks.classList.contains(
                    "mobile-active"
                )
            ) {

                if (icon) {
                    icon.className =
                        "fas fa-times";
                }

            } else {

                if (icon) {
                    icon.className =
                        "fas fa-bars";
                }

            }
        }


        menuButton.addEventListener(
            "click",
            toggleMenu
        );


        menuButton.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    toggleMenu();
                }

            }
        );


        /* Close menu when link is clicked */

        navLinks
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        navLinks.classList.remove(
                            "mobile-active"
                        );

                        menuButton.classList.remove(
                            "active"
                        );

                        if (icon) {
                            icon.className =
                                "fas fa-bars";
                        }

                    }
                );

            });


        /* Close menu when clicking outside */

        document.addEventListener(
            "click",
            (event) => {

                if (
                    !navbar.contains(event.target) &&
                    navLinks.classList.contains(
                        "mobile-active"
                    )
                ) {

                    navLinks.classList.remove(
                        "mobile-active"
                    );

                    menuButton.classList.remove(
                        "active"
                    );

                    if (icon) {
                        icon.className =
                            "fas fa-bars";
                    }

                }

            }
        );

    }


    /* =========================================
       HERO "EXPLORE SYSTEMS" BUTTON
    ========================================= */

    const heroButton =
        document.querySelector(
            ".hero-text button"
        );

    const projectsSection =
        document.querySelector(
            ".projects"
        );


    if (
        heroButton &&
        projectsSection
    ) {

        heroButton.addEventListener(
            "click",
            () => {

                projectsSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    }


    /* =========================================
       PROJECT CARD REVEAL
    ========================================= */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    if (projectCards.length) {

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );


        projectCards.forEach(
            (card, index) => {

                card.style.transitionDelay =
                    `${index * 100}ms`;

                observer.observe(card);

            }
        );

    }


    /* =========================================
       PROJECT CARD MOUSE LIGHT
    ========================================= */

    projectCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                card.style.setProperty(
                    "--mouse-x",
                    `${x}px`
                );

                card.style.setProperty(
                    "--mouse-y",
                    `${y}px`
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.setProperty(
                    "--mouse-x",
                    "50%"
                );

                card.style.setProperty(
                    "--mouse-y",
                    "50%"
                );

            }
        );

    });


    /* =========================================
       HOLOGRAM INTERACTION
    ========================================= */

    const hologram =
        document.querySelector(
            ".hologram-box"
        );


    if (hologram) {

        hologram.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    hologram.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                const rotateY =
                    ((x / rect.width) - 0.5) *
                    15;

                const rotateX =
                    ((y / rect.height) - 0.5) *
                    -15;


                hologram.style.transform =
                    `perspective(800px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     scale(1.03)`;

            }
        );


        hologram.addEventListener(
            "mouseleave",
            () => {

                hologram.style.transform =
                    "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";

            }
        );

    }


    /* =========================================
       PROGRESS BAR ANIMATION
    ========================================= */

    const progressBars =
        document.querySelectorAll(
            ".progress div span"
        );


    if (progressBars.length) {

        progressBars.forEach(
            bar => {

                const targetWidth =
                    bar.style.width;

                bar.dataset.width =
                    targetWidth;

                bar.style.width = "0%";

            }
        );


        const progressSection =
            document.querySelector(
                ".research"
            );


        if (progressSection) {

            const progressObserver =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    progressBars.forEach(
                                        (bar, index) => {

                                            setTimeout(
                                                () => {

                                                    bar.style.width =
                                                        bar.dataset.width;

                                                },
                                                index * 250
                                            );

                                        }
                                    );


                                    progressObserver.unobserve(
                                        progressSection
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.25
                    }
                );


            progressObserver.observe(
                progressSection
            );

        }

    }


    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const revealElements =
        document.querySelectorAll(
            ".projects h2, .research h2, .cta h2, .cta p, .cta a, .project-card, .progress"
        );


    if (revealElements.length) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "reveal-visible"
                                );

                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.1
                }
            );


        revealElements.forEach(
            element => {

                element.classList.add(
                    "reveal-hidden"
                );

                revealObserver.observe(
                    element
                );

            }
        );

    }


    /* =========================================
       PARTICLE INTERACTION
    ========================================= */

    const particles =
        document.querySelectorAll(
            ".particles span"
        );


    particles.forEach(
        (particle, index) => {

            particle.style.animationDelay =
                `${index * 1.2}s`;

            particle.style.left =
                `${10 + Math.random() * 80}%`;

            particle.style.top =
                `${20 + Math.random() * 70}%`;

        }
    );


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    document
        .querySelectorAll(".nav-links a")
        .forEach(link => {

            const linkPage =
                link
                    .getAttribute("href")
                    ?.split("/")
                    .pop()
                    .toLowerCase();


            if (
                linkPage === currentPage
            ) {

                link.classList.add(
                    "active"
                );

            }

        });


    /* =========================================
       CURSOR GLOW
    ========================================= */

    const cursorGlow =
        document.createElement("div");

    cursorGlow.className =
        "cursor-glow";

    document.body.appendChild(
        cursorGlow
    );


    document.addEventListener(
        "mousemove",
        event => {

            cursorGlow.style.left =
                `${event.clientX}px`;

            cursorGlow.style.top =
                `${event.clientY}px`;

        }
    );


    /* =========================================
       REDUCED MOTION SUPPORT
    ========================================= */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (reducedMotion) {

        document
            .querySelectorAll("*")
            .forEach(element => {

                element.style.animation =
                    "none";

                element.style.transition =
                    "none";

            });

    }

});