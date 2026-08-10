/* =========================================================
   ELORA TECH
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   AOS
========================================================= */

if (typeof AOS !== "undefined") {

    AOS.init({
        duration: 900,
        once: true,
        offset: 80,
        easing: "ease-out-cubic"
    });

}


/* =========================================================
   LOADER
========================================================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (!loader) return;

    setTimeout(() => {

        loader.style.opacity = "0";
        loader.style.visibility = "hidden";

        setTimeout(() => {
            loader.remove();
        }, 900);

    }, 2000);

});


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuBtn =
    document.querySelector(".menu-btn");

const navLinks =
    document.querySelector(".nav-links");

const menuIcon =
    menuBtn?.querySelector("i");


if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        const active =
            navLinks.classList.toggle("mobile-active");

        if (menuIcon) {

            menuIcon.className =
                active
                    ? "fa-solid fa-xmark"
                    : "fa-solid fa-bars";

        }

    });


    /* Close menu after clicking */

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove(
                "mobile-active"
            );

            if (menuIcon) {

                menuIcon.className =
                    "fa-solid fa-bars";

            }

        });

    });

}


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar =
    document.querySelector(".navbar");


const updateNavbar = () => {

    if (!navbar) return;

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

};


window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
);

updateNavbar();


/* =========================================================
   COUNTERS
========================================================= */

const counters =
    document.querySelectorAll(
        ".stat h2[data-target]"
    );


const counterObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting)
                    return;

                const counter =
                    entry.target;

                const target =
                    Number(
                        counter.dataset.target
                    );

                let current = 0;

                const duration = 1600;

                const start =
                    performance.now();


                const animate = now => {

                    const progress =
                        Math.min(
                            (now - start) /
                            duration,
                            1
                        );

                    const eased =
                        1 -
                        Math.pow(
                            1 - progress,
                            3
                        );

                    current =
                        Math.floor(
                            eased * target
                        );

                    counter.textContent =
                        current + "+";

                    if (progress < 1) {

                        requestAnimationFrame(
                            animate
                        );

                    } else {

                        counter.textContent =
                            target + "+";

                    }

                };

                requestAnimationFrame(
                    animate
                );

                counterObserver.unobserve(
                    counter
                );

            });

        },
        {
            threshold: .5
        }
    );


counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* =========================================================
   HERO MOUSE PARALLAX
========================================================= */

const hero =
    document.querySelector(".hero");

const globe =
    document.querySelector(".globe-wrapper");


if (
    hero &&
    globe &&
    window.matchMedia(
        "(pointer:fine)"
    ).matches
) {

    window.addEventListener(
        "mousemove",
        event => {

            const x =
                (window.innerWidth / 2 -
                    event.clientX) / 80;

            const y =
                (window.innerHeight / 2 -
                    event.clientY) / 80;


            globe.style.transform =
                `translate(${x}px, ${y}px)`;

        },
        { passive: true }
    );

}


/* =========================================================
   CURSOR GLOW
========================================================= */

const desktop =
    window.matchMedia(
        "(pointer:fine)"
    ).matches;


if (desktop) {

    const glow =
        document.createElement("div");

    glow.style.position = "fixed";
    glow.style.width = "25px";
    glow.style.height = "25px";
    glow.style.borderRadius = "50%";
    glow.style.pointerEvents = "none";
    glow.style.zIndex = "99999";
    glow.style.background =
        "rgba(0,198,255,.35)";
    glow.style.filter =
        "blur(15px)";
    glow.style.transform =
        "translate(-50%,-50%)";

    document.body.appendChild(glow);


    window.addEventListener(
        "mousemove",
        event => {

            glow.style.left =
                event.clientX + "px";

            glow.style.top =
                event.clientY + "px";

        },
        { passive: true }
    );

}


/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            event => {

                const href =
                    anchor.getAttribute(
                        "href"
                    );

                if (
                    !href ||
                    href === "#"
                ) return;

                const target =
                    document.querySelector(
                        href
                    );

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =========================================================
   BACK TO TOP
========================================================= */

const backTop =
    document.querySelector(
        ".back-to-top"
    );


if (backTop) {

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 600) {

                backTop.classList.add(
                    "show"
                );

            } else {

                backTop.classList.remove(
                    "show"
                );

            }

        },
        { passive: true }
    );

}


/* =========================================================
   PARTICLES
========================================================= */

if (
    typeof particlesJS !== "undefined" &&
    document.getElementById(
        "particles-js"
    )
) {

    const mobile =
        window.innerWidth <= 768;


    particlesJS(
        "particles-js",
        {

            particles: {

                number: {

                    value:
                        mobile ? 35 : 85,

                    density: {

                        enable: true,

                        value_area:
                            mobile
                                ? 1100
                                : 900

                    }

                },


                color: {

                    value: [
                        "#00c6ff",
                        "#38bdf8",
                        "#ffffff"
                    ]

                },


                shape: {

                    type: "circle"

                },


                opacity: {

                    value:
                        mobile ? .25 : .4,

                    random: true

                },


                size: {

                    value:
                        mobile ? 2 : 3,

                    random: true

                },


                line_linked: {

                    enable:
                        !mobile,

                    distance: 150,

                    color: "#00c6ff",

                    opacity: .2,

                    width: 1

                },


                move: {

                    enable: true,

                    speed:
                        mobile ? .7 : 1.4,

                    direction: "none",

                    random: true,

                    straight: false,

                    out_mode: "out"

                }

            },


            interactivity: {

                detect_on: "canvas",

                events: {

                    onhover: {

                        enable:
                            !mobile,

                        mode: "grab"

                    },

                    onclick: {

                        enable: !mobile,

                        mode: "push"

                    },

                    resize: true

                },


                modes: {

                    grab: {

                        distance: 180,

                        line_linked: {

                            opacity: .5

                        }

                    },


                    push: {

                        particles_nb: 3

                    }

                }

            },


            retina_detect: true

        }
    );

}


/* =========================================================
   SERVICE / CARD HOVER
========================================================= */

const cards =
    document.querySelectorAll(
        ".service-card, .card"
    );


if (desktop) {

    cards.forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.style.transform =
                    "translateY(-10px)";

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

}


/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log(`

███████╗██╗      ██████╗ ██████╗  █████╗
██╔════╝██║     ██╔═══██╗██╔══██╗██╔══██╗
█████╗  ██║     ██║   ██║██████╔╝███████║
██╔══╝  ██║     ██║   ██║██╔══██╗██╔══██║
███████╗███████╗╚██████╔╝██║  ██║██║  ██║
╚══════╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝

ELORA Tech
Logical Architecture for Global Solutions

🌍 Global Intelligence System Online

`);