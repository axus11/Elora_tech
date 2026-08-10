// =====================================
// ELORA TECH SERVICES
// service.js
// =====================================


// =====================================
// PAGE READY
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    // =================================
    // MOBILE NAVIGATION
    // =================================

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");
    const menuIcon = menuBtn
        ? menuBtn.querySelector("i")
        : null;

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", (e) => {

            e.stopPropagation();

            navLinks.classList.toggle("active");

            menuBtn.classList.toggle("active");

            // Change hamburger icon
            if (menuIcon) {

                if (navLinks.classList.contains("active")) {

                    menuIcon.classList.remove("fa-bars");
                    menuIcon.classList.add("fa-xmark");

                } else {

                    menuIcon.classList.remove("fa-xmark");
                    menuIcon.classList.add("fa-bars");

                }

            }

        });


        // Close menu when clicking a link

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                menuBtn.classList.remove("active");

                if (menuIcon) {

                    menuIcon.classList.remove("fa-xmark");
                    menuIcon.classList.add("fa-bars");

                }

            });

        });


        // Close menu when clicking outside

        document.addEventListener("click", (e) => {

            if (
                !navLinks.contains(e.target) &&
                !menuBtn.contains(e.target)
            ) {

                navLinks.classList.remove("active");

                menuBtn.classList.remove("active");

                if (menuIcon) {

                    menuIcon.classList.remove("fa-xmark");
                    menuIcon.classList.add("fa-bars");

                }

            }

        });


        // Keyboard accessibility

        menuBtn.addEventListener("keydown", (e) => {

            if (e.key === "Enter" || e.key === " ") {

                e.preventDefault();

                menuBtn.click();

            }

        });

    }


    // =================================
    // STICKY / SCROLL NAVBAR
    // =================================

    const header = document.querySelector("header");
    const navbar = document.querySelector(".navbar");

    const updateNavbar = () => {

        if (!header || !navbar) return;

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

            navbar.style.background =
                "rgba(2, 6, 23, .92)";

            navbar.style.boxShadow =
                "0 15px 40px rgba(0, 0, 0, .45)";

        } else {

            header.classList.remove("scrolled");

            navbar.style.background =
                "rgba(255, 255, 255, .06)";

            navbar.style.boxShadow =
                "none";

        }

    };

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    updateNavbar();


    // =================================
    // SMOOTH SCROLL
    // =================================

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener("click", function (e) {

                const targetID =
                    this.getAttribute("href");

                if (
                    !targetID ||
                    targetID === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetID);

                if (target) {

                    e.preventDefault();

                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }

            });

        });


    // =================================
    // CURSOR GLOW
    // =================================

    const isTouchDevice =
        window.matchMedia("(hover: none)").matches;

    if (!isTouchDevice) {

        const glow =
            document.createElement("div");

        glow.className =
            "cursor-glow";

        Object.assign(
            glow.style,
            {

                position: "fixed",

                width: "22px",

                height: "22px",

                borderRadius: "50%",

                pointerEvents: "none",

                zIndex: "99999",

                background:
                    "rgba(0, 198, 255, .5)",

                filter:
                    "blur(14px)",

                transform:
                    "translate(-50%, -50%)",

                left: "0px",

                top: "0px",

                opacity: "0",

                transition:
                    "opacity .2s ease"

            }
        );

        document.body.appendChild(glow);


        window.addEventListener(
            "mousemove",
            (e) => {

                glow.style.left =
                    `${e.clientX}px`;

                glow.style.top =
                    `${e.clientY}px`;

                glow.style.opacity = "1";

            }
        );


        document.addEventListener(
            "mouseleave",
            () => {

                glow.style.opacity = "0";

            }
        );

    }


    // =================================
    // SERVICE CARD EFFECT
    // =================================

    const cards =
        document.querySelectorAll(
            ".service-card"
        );

    cards.forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                if (
                    window.matchMedia(
                        "(hover: hover)"
                    ).matches
                ) {

                    card.style.transform =
                        "translateY(-15px) scale(1.02)";

                }

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });


    // =================================
    // SERVICE CARD MOUSE LIGHT
    // =================================

    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            (e) => {

                if (
                    !window.matchMedia(
                        "(hover: hover)"
                    ).matches
                ) {
                    return;
                }

                const rect =
                    card.getBoundingClientRect();

                const x =
                    e.clientX - rect.left;

                const y =
                    e.clientY - rect.top;

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

    });


    // =================================
    // HOLOGRAM PARALLAX
    // =================================

    const hologram =
        document.querySelector(".hologram");

    if (hologram) {

        let mouseX = 0;
        let mouseY = 0;

        let currentX = 0;
        let currentY = 0;


        window.addEventListener(
            "mousemove",
            (e) => {

                if (
                    window.matchMedia(
                        "(hover: none)"
                    ).matches
                ) {
                    return;
                }

                mouseX =
                    (window.innerWidth / 2 -
                        e.clientX) / 35;

                mouseY =
                    (window.innerHeight / 2 -
                        e.clientY) / 35;

            }
        );


        const animateHologram = () => {

            currentX +=
                (mouseX - currentX) * 0.06;

            currentY +=
                (mouseY - currentY) * 0.06;


            hologram.style.transform =
                `translate3d(${currentX}px, ${currentY}px, 0)`;


            requestAnimationFrame(
                animateHologram
            );

        };


        animateHologram();

    }


    // =================================
    // REVEAL SERVICE CARDS
    // =================================

    if (
        "IntersectionObserver" in window
    ) {

        const revealItems =
            document.querySelectorAll(
                ".service-card, .steps div"
            );


        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

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

                    });

                },
                {
                    threshold: 0.15
                }
            );


        revealItems.forEach(item => {

            item.classList.add(
                "reveal"
            );

            revealObserver.observe(item);

        });

    }


    // =================================
    // PROCESS STEP HOVER
    // =================================

    const steps =
        document.querySelectorAll(
            ".steps div"
        );

    steps.forEach(step => {

        step.addEventListener(
            "mouseenter",
            () => {

                step.style.transform =
                    "translateY(-10px) scale(1.05)";

                step.style.boxShadow =
                    "0 0 60px rgba(0, 198, 255, .45)";

            }
        );


        step.addEventListener(
            "mouseleave",
            () => {

                step.style.transform = "";

                step.style.boxShadow =
                    "0 0 40px rgba(0, 198, 255, .2)";

            }
        );

    });


    // =================================
    // AI PARTICLE INTERACTION
    // =================================

    const particles =
        document.querySelectorAll(
            ".ai-particles span"
        );


    particles.forEach(particle => {

        particle.addEventListener(
            "mouseenter",
            () => {

                particle.style.transform =
                    "scale(2)";

                particle.style.boxShadow =
                    "0 0 30px #00c6ff, 0 0 60px #00c6ff";

            }
        );

    });


    // =================================
    // HERO BUTTON
    // =================================

    const heroBtn =
        document.querySelector(
            ".hero-btn"
        );

    if (heroBtn) {

        heroBtn.addEventListener(
            "click",
            (e) => {

                const services =
                    document.querySelector(
                        ".services"
                    );

                if (services) {

                    e.preventDefault();

                    services.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }


    // =================================
    // CTA BUTTON
    // =================================

    const ctaBtn =
        document.querySelector(
            ".cta a"
        );

    if (ctaBtn) {

        ctaBtn.addEventListener(
            "click",
            (e) => {

                const href =
                    ctaBtn.getAttribute("href");

                if (
                    !href ||
                    href === "#"
                ) {

                    e.preventDefault();

                    window.location.href =
                        "join.html";

                }

            }
        );

    }


    // =================================
    // REDUCE MOTION SUPPORT
    // =================================

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    if (reducedMotion.matches) {

        document.documentElement.style
            .scrollBehavior = "auto";

    }


    // =================================
    // CONSOLE MESSAGE
    // =================================

    console.log(`

███████╗██╗      ██████╗ ██████╗  █████╗
██╔════╝██║     ██╔═══██╗██╔══██╗██╔══██╗
█████╗  ██║     ██║   ██║██████╔╝███████║
██╔══╝  ██║     ██║   ██║██╔══██╗██╔══██║
███████╗███████╗╚██████╔╝██║  ██║██║  ██║
╚══════╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝

ELORA Tech
Logical Architecture for Global Solutions

Services System Online.
`);

});s