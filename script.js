document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".site-nav");

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", () => {
            const isOpen = body.classList.toggle("menu-open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            document.documentElement.style.overflow = isOpen ? "hidden" : "";
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
        "section .eyebrow, section h1, section h2, .media-block, .studio-copy, .service-row, .philosophy-card, .banner-cta-panel, .portfolio-card, .process-accordion details, .contact-form-block, .faq-block, .faq-list details, .form-field"
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

    /* ── Hero Cinematic Slider ── */
    const slider = document.querySelector('.hero-slider');
    if (slider) {
        const track = slider.querySelector('.hero__track');
        const slides = slider.querySelectorAll('.hero__slide');
        const btns = slider.querySelectorAll('.hero__slider-btn');
        if (track && slides.length > 1 && btns.length) {
            let current = 0;
            let animating = true; /* Locked during page load */
            let interval;
            let isMobile = window.matchMedia('(max-width: 760px)').matches;
            const mm = window.matchMedia('(max-width: 760px)');
            mm.addEventListener('change', (e) => { isMobile = e.matches; });

            /* ── Texture: page load zoom-out ── */
            const texture = slider.querySelector('.hero__texture');
            if (texture) {
                texture.style.transform = 'scale(1.15)';
                texture.style.transition = 'none';
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        texture.style.transition = 'transform 1.6s cubic-bezier(0.22, 1, 0.36, 1)';
                        texture.style.transform = 'scale(1)';
                    });
                });
            }

            /* ── Text split: wrap h1 lines ── */
            slides.forEach(slide => {
                const h1 = slide.querySelector('h1');
                if (h1 && !h1.dataset.split) {
                    h1.dataset.split = '1';
                    const html = h1.innerHTML;
                    const lines = html.split('<br>');
                    h1.innerHTML = lines.map(line =>
                        `<span class="hero__line"><span class="hero__line-inner">${line.trim()}</span></span>`
                    ).join('');
                }
            });

            /* ── Page load animation ── */
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    slider.classList.add('hero-loaded');
                });
            });

            /* Unlock slider and start auto-advance after page load */
            setTimeout(() => {
                animating = false;
                interval = setInterval(autoAdvance, 6000);
            }, 2200);

            /* ── Slide transition ── */
            function goTo(index) {
                if (index === current || animating) return;
                if (isMobile) {
                    slides.forEach(s => s.classList.remove('active'));
                    slides[index].classList.add('active');
                    btns.forEach(b => b.classList.remove('hero__slider--active'));
                    btns[index].classList.add('hero__slider--active');
                    current = index;
                    return;
                }

                animating = true;
                const prev = slides[current];
                const next = slides[index];

                /* Exit parallax on outgoing image */
                prev.classList.add('is-exiting');

                /* Setup incoming slide: reset, then enter */
                next.classList.remove('active', 'enter-active');
                next.classList.add('enter');
                void next.offsetWidth; /* force reflow */
                next.classList.remove('enter');
                next.classList.add('enter-active');

                /* Move track */
                track.classList.add('animating');
                track.style.transform = `translateX(-${index * 50}%)`;

                /* Update buttons */
                btns.forEach(b => b.classList.remove('hero__slider--active'));
                btns[index].classList.add('hero__slider--active');

                /* Cleanup */
                setTimeout(() => {
                    prev.classList.remove('is-exiting', 'active');
                    next.classList.remove('enter-active');
                    next.classList.add('active');
                    track.classList.remove('animating');
                    animating = false;
                    current = index;
                }, 1600);
            }

            /* ── Button clicks ── */
            btns.forEach((btn) => {
                btn.addEventListener('click', () => {
                    const idx = parseInt(btn.dataset.slide, 10);
                    if (idx === current) return;
                    clearInterval(interval);
                    goTo(idx);
                    interval = setInterval(autoAdvance, 6000);
                });
            });

            function autoAdvance() {
                goTo((current + 1) % slides.length);
            }

            /* ── Scroll-linked hero motion ── */
            let scrollTicking = false;
            const leftCol = slider.querySelector('.hero__left');

            function handleScroll() {
                const st = window.scrollY;
                const vh = window.innerHeight;
                if (st < vh) {
                    const progress = st / vh;
                    if (texture) {
                        texture.style.transition = 'none';
                        texture.style.transform = `translateY(${progress * -30}px)`;
                    }
                    if (leftCol) {
                        leftCol.style.transform = `translateY(${progress * -30}px)`;
                        leftCol.style.opacity = `${1 - progress * 1.2}`;
                    }
                }
                scrollTicking = false;
            }

            window.addEventListener('scroll', () => {
                if (!scrollTicking) {
                    requestAnimationFrame(handleScroll);
                    scrollTicking = true;
                }
            }, { passive: true });

            /* Set initial scroll state */
            handleScroll();
        }
    }
});
