document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".site-nav");

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", () => {
            const isOpen = body.classList.toggle("menu-open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        nav.addEventListener("click", (event) => {
            if (event.target.closest("a")) {
                body.classList.remove("menu-open");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });

        document.addEventListener("click", (event) => {
            const clickedMenu = nav.contains(event.target) || menuToggle.contains(event.target);
            if (!clickedMenu && body.classList.contains("menu-open")) {
                body.classList.remove("menu-open");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    const revealTargets = document.querySelectorAll(
        "section .eyebrow, section h1, section h2, .media-block, .studio-copy, .founder-copy, .service-row, .philosophy-card, .banner-cta-panel, .portfolio-card, .process-accordion details, .footer-cta-copy, .footer-contact"
    );

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && revealTargets.length) {
        revealTargets.forEach((element, index) => {
            element.setAttribute("data-reveal", "");
            element.style.transitionDelay = `${Math.min(index % 4, 3) * 0.06}s`;
        });

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.14 });

        revealTargets.forEach((element) => revealObserver.observe(element));
    }

    const processItems = document.querySelectorAll(".process-accordion details");
    processItems.forEach((item) => {
        item.addEventListener("toggle", () => {
            if (!item.open) return;
            processItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.open = false;
                }
            });
        });
    });
});
