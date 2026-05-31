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
        "section .eyebrow, section h1, section h2, .media-block, .studio-copy, .founder-copy, .service-row, .philosophy-card, .banner-cta-panel, .portfolio-card, .process-accordion details, .contact-form-block, .faq-block, .faq-list details, .form-field"
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

    const faqItems = document.querySelectorAll(".faq-list details");
    faqItems.forEach((item) => {
        item.addEventListener("toggle", () => {
            if (!item.open) return;
            faqItems.forEach((otherItem) => {
                if (otherItem !== item) otherItem.open = false;
            });
        });
    });

    const form = document.getElementById("contactForm");
    const feedback = form?.querySelector(".form-feedback");
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            feedback.textContent = "";
            feedback.className = "form-feedback";

            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const message = form.message.value.trim();

            if (!name || !email || !message) {
                feedback.textContent = "Por favor completa todos los campos.";
                feedback.classList.add("is-error");
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                feedback.textContent = "Ingresa un correo electrónico válido.";
                feedback.classList.add("is-error");
                return;
            }

            const btn = form.querySelector(".form-submit");
            const originalText = btn.innerHTML;
            btn.disabled = true;
            btn.textContent = "Enviando...";

            try {
                const res = await fetch("https://formspree.io/f/xdkebogw", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, message }),
                });

                if (res.ok) {
                    feedback.textContent = "Mensaje enviado con éxito. Te contactaremos pronto.";
                    feedback.classList.add("is-success");
                    form.reset();
                } else {
                    throw new Error();
                }
            } catch {
                feedback.textContent = "Hubo un error al enviar. Intenta nuevamente o escríbenos directo a elizabeth@contrerasmartinez.cl.";
                feedback.classList.add("is-error");
            } finally {
                btn.disabled = false;
                btn.innerHTML = originalText;
            }
        });
    }
});
