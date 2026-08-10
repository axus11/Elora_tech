// ======================================================
// ELORA TECH — ABOUT PAGE
// about.js
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    // ==================================================
    // AOS INITIALIZATION
    // ==================================================

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: "ease-out-cubic"
        });
    }


    // ==================================================
    // PAGE LOAD
    // ==================================================

    window.addEventListener("load", () => {
        document.body.classList.add("page-loaded");
    });


    // ==================================================
    // MOBILE NAVIGATION
    // ==================================================

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        const menuIcon = menuBtn.querySelector("i");

        function closeMenu() {

            navLinks.classList.remove("mobile-active");
            menuBtn.classList.remove("active");

            if (menuIcon) {
                menuIcon.classList.remove("fa-xmark");
                menuIcon.classList.add("fa-bars");
            }

        }


        function toggleMenu() {

            const isOpen =
                navLinks.classList.toggle("mobile-active");

            menuBtn.classList.toggle("active", isOpen);

            if (menuIcon) {

                menuIcon.classList.toggle(
                    "fa-bars",
                    !isOpen
                );

                menuIcon.classList.toggle(
                    "fa-xmark",
                    isOpen
                );

            }

        }


        menuBtn.addEventListener("click", (event) => {

            event.stopPropagation();

            toggleMenu();

        });


        // Keyboard accessibility

        menuBtn.addEventListener("keydown", (event) => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                toggleMenu();

            }

        });


        // Close after clicking navigation link

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                closeMenu();

            });

        });


        // Close when clicking outside

        document.addEventListener("click", (event) => {

            if (
                !navLinks.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {

                closeMenu();

            }

        });

    }


    // ==================================================
    // STICKY NAVBAR
    // ==================================================

    const header = document.querySelector("header");

    function updateNavbar() {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    updateNavbar();


    // ==================================================
    // CURSOR GLOW
    // ==================================================

    const isTouchDevice =
        window.matchMedia("(hover: none)").matches;

    if (!isTouchDevice) {

        const cursorGlow =
            document.createElement("div");

        cursorGlow.className =
            "cursor-glow";

        Object.assign(
            cursorGlow.style,
            {
                position: "fixed",
                width: "25px",
                height: "25px",
                borderRadius: "50%",
                pointerEvents: "none",
                zIndex: "99999",
                background: "rgba(0,198,255,.45)",
                filter: "blur(14px)",
                transform: "translate(-50%, -50%)",
                transition: "opacity .3s ease",
                opacity: "0"
            }
        );

        document.body.appendChild(cursorGlow);


        let glowX = 0;
        let glowY = 0;
        let mouseX = 0;
        let mouseY = 0;


        window.addEventListener("mousemove", (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursorGlow.style.opacity = "1";

        });


        function animateCursor() {

            glowX +=
                (mouseX - glowX) * 0.15;

            glowY +=
                (mouseY - glowY) * 0.15;

            cursorGlow.style.left =
                `${glowX}px`;

            cursorGlow.style.top =
                `${glowY}px`;

            requestAnimationFrame(
                animateCursor
            );

        }

        animateCursor();

    }


    // ==================================================
    // HERO PARALLAX
    // ==================================================

    const hero =
        document.querySelector(".page-hero");

    const globe =
        document.querySelector("#globe");

    if (hero) {

        window.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth <= 900)
                    return;

                const x =
                    (event.clientX -
                        window.innerWidth / 2) / 40;

                const y =
                    (event.clientY -
                        window.innerHeight / 2) / 40;


                hero.style.setProperty(
                    "--mouse-x",
                    `${x}px`
                );

                hero.style.setProperty(
                    "--mouse-y",
                    `${y}px`
                );


                if (globe) {

                    globe.style.transform =
                        `translate(
                            ${x * -0.5}px,
                            ${y * -0.5}px
                        )`;

                }

            }
        );

    }


    // ==================================================
    // SMOOTH SCROLL
    // ==================================================

    document
        .querySelectorAll("a[href^='#']")
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        });


    // ==================================================
    // SCROLL REVEAL
    // ==================================================

    const revealElements =
        document.querySelectorAll(
            `
            .about-story,
            .mission,
            .timeline,
            .core-values,
            .cta,
            .glass-card,
            .timeline-item,
            .value,
            .image-card
            `
        );


    if (
        revealElements.length &&
        "IntersectionObserver" in window
    ) {

        revealElements.forEach(element => {

            element.style.opacity = "0";

            element.style.transform =
                "translateY(35px)";

            element.style.transition =
                "opacity .8s ease, transform .8s ease";

        });


        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting)
                            return;


                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";


                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    }


    // ==================================================
    // MISSION CARD 3D EFFECT
    // ==================================================

    const missionCards =
        document.querySelectorAll(
            ".glass-card"
        );


    missionCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth <= 900)
                    return;


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                const rotateX =
                    ((y / rect.height) - 0.5) *
                    -8;

                const rotateY =
                    ((x / rect.width) - 0.5) *
                    8;


                card.style.transform =
                    `
                    translateY(-10px)
                    perspective(800px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    `
                    translateY(0)
                    perspective(800px)
                    rotateX(0)
                    rotateY(0)
                    `;

            }
        );

    });


    // ==================================================
    // CORE VALUES 3D EFFECT
    // ==================================================

    const values =
        document.querySelectorAll(".value");


    values.forEach(value => {

        value.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth <= 900)
                    return;


                const rect =
                    value.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                const rotateX =
                    ((y / rect.height) - 0.5) *
                    -6;

                const rotateY =
                    ((x / rect.width) - 0.5) *
                    6;


                value.style.transform =
                    `
                    translateY(-8px)
                    perspective(600px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    `;

            }
        );


        value.addEventListener(
            "mouseleave",
            () => {

                value.style.transform =
                    `
                    translateY(0)
                    perspective(600px)
                    rotateX(0)
                    rotateY(0)
                    `;

            }
        );

    });


    // ==================================================
    // TIMELINE ANIMATION
    // ==================================================

    const timelineItems =
        document.querySelectorAll(
            ".timeline-item"
        );


    if (
        timelineItems.length &&
        "IntersectionObserver" in window
    ) {

        const timelineObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting)
                            return;


                        entry.target.classList.add(
                            "timeline-visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.2
                }
            );


        timelineItems.forEach(item => {

            timelineObserver.observe(item);

        });

    }


    // ==================================================
    // TIMELINE CIRCLE EFFECT
    // ==================================================

    const timelineCircles =
        document.querySelectorAll(".circle");


    timelineCircles.forEach(circle => {

        circle.addEventListener(
            "mouseenter",
            () => {

                circle.style.transform =
                    "scale(1.35)";

                circle.style.boxShadow =
                    `
                    0 0 20px #00c6ff,
                    0 0 50px #00c6ff
                    `;

            }
        );


        circle.addEventListener(
            "mouseleave",
            () => {

                circle.style.transform =
                    "scale(1)";

                circle.style.boxShadow =
                    "0 0 30px #00c6ff";

            }
        );

    });


    // ==================================================
    // FLOATING GLOBE CARD
    // ==================================================

    const globeCard =
        document.querySelector(".image-card");


    if (globeCard) {

        let floatAngle = 0;


        function floatGlobe() {

            floatAngle += 0.02;


            const y =
                Math.sin(floatAngle) * 8;


            globeCard.style.setProperty(
                "--float-y",
                `${y}px`
            );


            requestAnimationFrame(
                floatGlobe
            );

        }


        floatGlobe();

    }


    // ==================================================
    // GLOBE CARD 3D EFFECT
    // ==================================================

    if (globeCard) {

        globeCard.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth <= 900)
                    return;


                const rect =
                    globeCard.getBoundingClientRect();


                const x =
                    (event.clientX -
                        rect.left) /
                        rect.width -
                    0.5;


                const y =
                    (event.clientY -
                        rect.top) /
                        rect.height -
                    0.5;


                globeCard.style.transform =
                    `
                    translateY(
                        var(--float-y, 0px)
                    )
                    perspective(900px)
                    rotateX(${y * -8}deg)
                    rotateY(${x * 8}deg)
                    `;

            }
        );


        globeCard.addEventListener(
            "mouseleave",
            () => {

                globeCard.style.transform =
                    `
                    translateY(
                        var(--float-y, 0px)
                    )
                    perspective(900px)
                    rotateX(0)
                    rotateY(0)
                    `;

            }
        );

    }


    // ==================================================
    // BUTTON RIPPLE
    // ==================================================

    const buttons =
        document.querySelectorAll(
            ".primary-btn, .join-btn"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function (event) {

                const ripple =
                    document.createElement("span");


                Object.assign(
                    ripple.style,
                    {
                        position: "absolute",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background:
                            "rgba(255,255,255,.5)",
                        transform:
                            "translate(-50%, -50%)",
                        pointerEvents: "none"
                    }
                );


                const rect =
                    button.getBoundingClientRect();


                ripple.style.left =
                    `${event.clientX - rect.left}px`;

                ripple.style.top =
                    `${event.clientY - rect.top}px`;


                button.style.position =
                    "relative";

                button.style.overflow =
                    "hidden";


                button.appendChild(
                    ripple
                );


                ripple.animate(
                    [
                        {
                            transform:
                                "translate(-50%, -50%) scale(1)",
                            opacity: 0.7
                        },
                        {
                            transform:
                                "translate(-50%, -50%) scale(25)",
                            opacity: 0
                        }
                    ],
                    {
                        duration: 600,
                        easing: "ease-out"
                    }
                );


                setTimeout(() => {

                    ripple.remove();

                }, 650);

            }
        );

    });


    // ==================================================
    // RESPONSIVE RESET
    // ==================================================

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 900) {

                if (navLinks) {

                    navLinks.classList.remove(
                        "mobile-active"
                    );

                }


                if (menuBtn) {

                    menuBtn.classList.remove(
                        "active"
                    );


                    const icon =
                        menuBtn.querySelector("i");


                    if (icon) {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }

            }

        }
    );


    // ==================================================
    // CONSOLE EASTER EGG
    // ==================================================

    console.log(`
███████╗██╗      ██████╗ ██████╗ █████╗
██╔════╝██║     ██╔═══██╗██╔══██╗██╔══██╗
█████╗  ██║     ██║   ██║██████╔╝███████║
██╔══╝  ██║     ██║   ██║██╔══██╗██╔══██║
███████╗███████╗╚██████╔╝██║  ██║██║  ██║
╚══════╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝

ELORA Tech
Logical Architecture for Global Solutions

ABOUT PAGE INITIALIZED 🚀
`);

});