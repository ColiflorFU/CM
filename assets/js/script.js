document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const whatsappLink = document.createElement("a");
    whatsappLink.className = "whatsapp-fab";
    whatsappLink.href = "https://wa.me/56951278937";
    whatsappLink.target = "_blank";
    whatsappLink.rel = "noopener noreferrer";
    whatsappLink.innerHTML = '<svg class="whatsapp-fab__icon" aria-hidden="true" viewBox="0 0 24 24" focusable="false"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.08 0C5.55 0 .24 5.31.24 11.84c0 2.09.55 4.13 1.59 5.93L.14 23.86l6.23-1.64a11.83 11.83 0 0 0 5.7 1.46h.01c6.52 0 11.83-5.31 11.83-11.84 0-3.16-1.23-6.13-3.41-8.34Zm-8.42 18.2h-.01a9.83 9.83 0 0 1-5.01-1.37l-.36-.21-3.7.97.99-3.61-.23-.37a9.83 9.83 0 0 1-1.5-5.27C2.26 6.42 6.67 2 12.08 2c2.62 0 5.08 1.02 6.93 2.87a9.75 9.75 0 0 1 2.87 6.95c0 5.41-4.4 9.83-9.8 9.88Zm5.39-7.37c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.09 4.5.71.31 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/></svg><span class="whatsapp-fab__label">WhatsApp</span>';
    whatsappLink.setAttribute("aria-label", "Contactar por WhatsApp");
    if (!document.querySelector(".whatsapp-fab")) {
        document.body.appendChild(whatsappLink);
    }

    document.querySelectorAll(".scroll-top-fab").forEach((action) => {
        action.addEventListener("click", (event) => {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
            });
        });
    });

    const syncFloatingActions = () => {
        const hidden = body.classList.contains("menu-open") || body.classList.contains("modal-open");
        document.querySelectorAll(".whatsapp-fab, .scroll-top-fab").forEach((action) => {
            action.setAttribute("aria-hidden", String(hidden));
            if (hidden) {
                if (action.dataset.restoreTabindex === undefined) {
                    action.dataset.restoreTabindex = action.getAttribute("tabindex") || "";
                }
                action.setAttribute("tabindex", "-1");
            } else if (action.dataset.restoreTabindex !== undefined) {
                action.setAttribute("tabindex", action.dataset.restoreTabindex);
                delete action.dataset.restoreTabindex;
            } else {
                action.removeAttribute("tabindex");
            }
        });
    };

    // ── Custom cursor ──
    const cursor = document.querySelector(".cursor-dot") || (() => {
        const dot = document.createElement("div");
        dot.className = "cursor-dot";
        dot.setAttribute("aria-hidden", "true");
        document.body.appendChild(dot);
        return dot;
    })();
    if (cursor && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        document.addEventListener("mousemove", (e) => {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
        });
        // Agrandar sobre interactivos
        document.addEventListener("mouseover", (e) => {
            if (e.target.closest("a, button, input, textarea, summary, [role=\"button\"], details summary")) {
                cursor.classList.add("hover");
            }
        });
        document.addEventListener("mouseout", (e) => {
            if (e.target.closest("a, button, input, textarea, summary, [role=\"button\"], details summary")) {
                cursor.classList.remove("hover");
            }
        });
    }

    // ── Contact Modal ──
    const contactModal = document.getElementById("contactModal");
    if (contactModal) {
        const openBtns = document.querySelectorAll("[data-open-contact], .open-contact-modal");
        const closeBtns = contactModal.querySelectorAll("[data-close-contact]");
        let openingTrigger = null;

        const isUsableTrigger = (trigger) => trigger?.isConnected
            && !trigger.disabled
            && trigger.getAttribute("aria-disabled") !== "true"
            && trigger.offsetParent !== null
            && getComputedStyle(trigger).visibility !== "hidden"
            && !trigger.closest("[inert]");

        const restoreFocus = () => {
            const trigger = openingTrigger;
            if (!trigger) return;

            const restoreWhenReady = () => {
                if (trigger.closest(".mobile-menu-overlay") && !isUsableTrigger(trigger)) {
                    openMobileMenu();
                }

                requestAnimationFrame(() => {
                    const target = isUsableTrigger(trigger) ? trigger : Array.from(openBtns).find(isUsableTrigger);
                    target?.focus({ preventScroll: true });
                    openingTrigger = null;
                });
            };

            const waitUntilHidden = () => {
                if (getComputedStyle(contactModal).visibility !== "hidden") {
                    requestAnimationFrame(waitUntilHidden);
                    return;
                }
                restoreWhenReady();
            };

            requestAnimationFrame(waitUntilHidden);
        };

        const getModalFocusable = () => Array.from(contactModal.querySelectorAll(
            "button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex=\"-1\"])"
        )).filter((element) => element.offsetParent !== null);

        const focusModalWhenReady = () => {
            if (contactModal.getAttribute("aria-hidden") !== "false") return;
            const field = contactModal.querySelector("input[name=name], input[name=email]");
            if (!field) return;

            const isVisible = getComputedStyle(contactModal).visibility === "visible";
            if (!isVisible || field.offsetParent === null) {
                requestAnimationFrame(focusModalWhenReady);
                return;
            }

            field.focus({ preventScroll: true });
        };

        function openContactModal(e) {
            if (e) e.preventDefault();
            openingTrigger = e?.currentTarget || document.activeElement;
            contactModal.setAttribute("aria-hidden", "false");
            document.body.classList.add("modal-open");
            syncFloatingActions();
            // Close mobile menu if open
            const mobileOverlay = document.querySelector(".mobile-menu-overlay");
            if (mobileOverlay && mobileOverlay.getAttribute("aria-hidden") === "false") {
                closeMobileMenu();
            }
            requestAnimationFrame(focusModalWhenReady);
        }

        function closeContactModal() {
            contactModal.setAttribute("aria-hidden", "true");
            document.body.classList.remove("modal-open");
            syncFloatingActions();
            restoreFocus();
        }

        openBtns.forEach(btn => btn.addEventListener("click", openContactModal));
        closeBtns.forEach(btn => btn.addEventListener("click", closeContactModal));

        contactModal.addEventListener("click", (e) => {
            if (e.target === contactModal) closeContactModal();
        });

        document.addEventListener("keydown", (e) => {
            if (contactModal.getAttribute("aria-hidden") !== "false") return;

            if (e.key === "Escape") {
                e.preventDefault();
                closeContactModal();
                return;
            }

            if (e.key === "Tab") {
                const focusable = getModalFocusable();
                if (!focusable.length) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        });

        // Auto-open if URL hash is #contact
        if (window.location.hash === "#contact") {
            setTimeout(openContactModal, 100);
        }
    }

    // ── Agenda Modal (non-intrusive, once per session) ──
    const agendaModal = document.getElementById("agendaModal");
    if (agendaModal) {
        const AGENDA_KEY = "agendaModalSeen";

        function setAgendaModalState(visible) {
            agendaModal.setAttribute("aria-hidden", String(!visible));
            if (visible) {
                agendaModal.setAttribute("aria-modal", "true");
            } else {
                agendaModal.removeAttribute("aria-modal");
            }
            // Make aria-modal="true" truthful: non-modal siblings are inert while shown
            Array.from(document.body.children).forEach((child) => {
                if (child === agendaModal || (contactModal && child === contactModal)) return;
                if (child.tagName === "SCRIPT") return;
                if (visible) child.setAttribute("inert", "");
                else child.removeAttribute("inert");
            });
        }

        function closeAgendaModal() {
            sessionStorage.setItem(AGENDA_KEY, "1");
            setAgendaModalState(false);
            const focusTarget = agendaPrevFocusEl;
            agendaPrevFocusEl = null;
            if (focusTarget && typeof focusTarget.focus === "function" && focusTarget.isConnected) {
                focusTarget.focus();
            }
        }

        agendaModal.addEventListener("click", (e) => {
            if (e.target.closest("[data-close-agenda]") || e.target === agendaModal) {
                closeAgendaModal();
            }
        });

        const ctaLink = agendaModal.querySelector(".agenda-cta");
        if (ctaLink) {
            ctaLink.addEventListener("click", () => {
                closeAgendaModal();
            });
        }

        // Mobile: close immediately on touch-scroll, never block site scroll
        let agendaTouchStartY = 0;
        document.addEventListener("touchstart", (e) => {
            if (agendaModal.getAttribute("aria-hidden") === "false") {
                agendaTouchStartY = e.touches[0].clientY;
            }
        }, { passive: true });

        document.addEventListener("touchmove", (e) => {
            if (agendaModal.getAttribute("aria-hidden") === "false") {
                const deltaY = e.touches[0].clientY - agendaTouchStartY;
                if (Math.abs(deltaY) > 8) {
                    closeAgendaModal();
                }
            }
        }, { passive: true });

        // Show once per session only, after a brief delay so it never interrupts first render
        if (sessionStorage.getItem(AGENDA_KEY) !== "1") {
            agendaTimer = setTimeout(() => {
                agendaTimer = null;
                if (sessionStorage.getItem(AGENDA_KEY) === "1") return;
                // Never stack over the contact modal; yield to a #contact landing
                if (contactModal && (contactModal.getAttribute("aria-hidden") === "false" || window.location.hash === "#contact")) return;
                const activeEl = document.activeElement;
                agendaPrevFocusEl = (activeEl && activeEl !== document.body && activeEl !== document.documentElement && typeof activeEl.focus === "function") ? activeEl : null;
                setAgendaModalState(true);
                const cta = agendaModal.querySelector(".agenda-cta");
                (cta || agendaModal.querySelector("button"))?.focus();
            }, 1800);
        }
    }

    // Escape closes only the top-most visible modal (agenda and contact never coexist)
    document.addEventListener("keydown", (e) => {
        if (e.key !== "Escape") return;
        if (contactModal && contactModal.getAttribute("aria-hidden") === "false") {
            closeContactModal();
        } else if (agendaModal && agendaModal.getAttribute("aria-hidden") === "false") {
            closeAgendaModal();
        }
    });

    // ── Resto del código ──
    const menuToggle = document.querySelector(".menu-toggle");
    const closeToggle = document.querySelector(".close-toggle");
    const mobileOverlay = document.querySelector(".mobile-menu-overlay");
    mobileOverlay?.setAttribute("inert", "");
    const mobileMenuLinks = document.querySelector(".mobile-menu-links");

    // Mobile menu
    function openMobileMenu() {
        body.classList.add("menu-open");
        syncFloatingActions();
        menuToggle.setAttribute("aria-expanded", "true");
        mobileOverlay?.removeAttribute("inert");
        mobileOverlay?.setAttribute("aria-hidden", "false");
        document.documentElement.style.overflow = "hidden";
    }

    function closeMobileMenu() {
        body.classList.remove("menu-open");
        syncFloatingActions();
        menuToggle.setAttribute("aria-expanded", "false");
        mobileOverlay?.setAttribute("aria-hidden", "true");
        mobileOverlay?.setAttribute("inert", "");
        document.documentElement.style.overflow = "";
    }

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            if (window.innerWidth <= 760) {
                // Mobile: toggle overlay
                if (body.classList.contains("menu-open")) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }
            }
        });
    }

    if (closeToggle) {
        closeToggle.addEventListener("click", closeMobileMenu);
    }

    if (mobileMenuLinks) {
        mobileMenuLinks.addEventListener("click", (event) => {
            if (event.target.closest("a")) {
                closeMobileMenu();
            }
        });
    }

    document.addEventListener("click", (event) => {
        const clickedMenu = event.target.closest(".site-nav") || event.target.closest(".menu-toggle") || event.target.closest(".mobile-menu-overlay");
        if (!clickedMenu && body.classList.contains("menu-open")) {
            closeMobileMenu();
        }
    });

    const revealTargets = document.querySelectorAll(
        "section .eyebrow, section h1, section h2, .media-block, .studio-copy, .service-row, .philosophy-card, .banner-cta-panel, .portfolio-card, .process-accordion details, .contact-form-block, .faq-block, .faq-list details, .form-field, .conversemos-section, .cta-hablemos-section, .gallery-break-section, .conversemos-heading, .cta-hablemos-content"
    );

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches
        && revealTargets.length
        && "IntersectionObserver" in window) {
        document.documentElement.classList.add("has-reveal");
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

            const btn = form.querySelector("button[type=submit]");
            const originalText = btn.innerHTML;
            btn.disabled = true;
            btn.textContent = "Enviando...";

            try {
                const res = await fetch(form.action, {
                    method: "POST",
                    body: new FormData(form),
                });
                const rawResponse = await res.text();
                const data = JSON.parse(rawResponse.replace(/^\uFEFF/, ""));

                if (res.ok && data.success) {
                    feedback.textContent = data.message || "Mensaje enviado con éxito. Te contactaremos pronto.";
                    feedback.classList.add("is-success");
                    form.reset();
                } else {
                    throw new Error(data.error || "Error al enviar el formulario.");
                }
            } catch (error) {
                feedback.textContent = error.message || "Hubo un error al enviar. Intenta nuevamente o escríbenos a elizabeth@ecmarquitectura.cl.";
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
        if (track && slides.length && btns.length) {
            let current = 0;
            let animating = true; /* Locked during page load */
            let interval;
            let isMobile = window.matchMedia('(max-width: 760px)').matches;
            const mm = window.matchMedia('(max-width: 760px)');
            mm.addEventListener('change', (e) => { isMobile = e.matches; });

            /* ── ARIA helpers ── */
            function syncAria(idx) {
                btns.forEach((b, i) => {
                    b.setAttribute('aria-selected', String(i === idx));
                    b.setAttribute('tabindex', i === idx ? '0' : '-1');
                    b.classList.toggle('hero__slider--active', i === idx);
                });
                slides.forEach((s, i) => {
                    s.setAttribute('aria-hidden', String(i !== idx));
                });
            }

            function announceSlide(idx) {
                if (!srStatus) return;
                const label = slides[idx].querySelector('.hero__label');
                srStatus.textContent = '';
                requestAnimationFrame(() => {
                    srStatus.textContent = label ? label.textContent.trim() : `Slide ${idx + 1} de ${slides.length}`;
                });
            }

            /* Initialize initial ARIA state */
            syncAria(0);

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

            /* ── Text split: wrap h1 lines (skip hero__subtitle) ── */
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
                    syncAria(index);
                    announceSlide(index);
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
                track.style.transform = `translateX(-${index * 100}%)`;

                /* Sync ARIA immediately on transition start */
                syncAria(index);
                announceSlide(index);

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

            /* ── Arrow-key navigation (WAI-ARIA tabs pattern) ── */
            slider.addEventListener('keydown', (e) => {
                if (!e.target.classList.contains('hero__slider-btn')) return;
                let idx = -1;
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    idx = (current + 1) % slides.length;
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    idx = (current - 1 + slides.length) % slides.length;
                } else if (e.key === 'Home') {
                    idx = 0;
                } else if (e.key === 'End') {
                    idx = slides.length - 1;
                }
                if (idx >= 0 && idx !== current) {
                    e.preventDefault();
                    clearInterval(interval);
                    btns[idx].focus();
                    goTo(idx);
                    interval = setInterval(autoAdvance, 6000);
                }
            });

            function autoAdvance() {
                goTo((current + 1) % slides.length);
            }

            /* ── Scroll-linked hero motion ── */
            let scrollTicking = false;
            const leftCol = slider.querySelector('.hero__left');

            function handleScroll() {
                if (isMobile) { scrollTicking = false; return; }
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

    /* ── Portfolio Carousel ── */
    const portfolioTrack = document.getElementById('portfolioTrack');
    if (portfolioTrack) {
        const cards = portfolioTrack.querySelectorAll('.portfolio-card');
        const prevBtn = document.getElementById('portfolioPrev');
        const nextBtn = document.getElementById('portfolioNext');

        if (cards.length > 1 && prevBtn && nextBtn) {
            let current = 0;
            let perView = 1;
            let max = 0;

            function calcLayout() {
                perView = window.innerWidth < 768 ? 1 : 3;
                portfolioTrack.style.setProperty('--per-view', perView);
                max = Math.max(0, cards.length - perView);
                if (current > max) current = max;
                refresh();
            }

            function refresh() {
                const offset = -(current * (100 / perView));
                portfolioTrack.style.transform = `translateX(${offset}%)`;
                prevBtn.disabled = current === 0;
                nextBtn.disabled = current >= max;
            }

            prevBtn.addEventListener('click', () => {
                if (current > 0) { current--; refresh(); }
            });

            nextBtn.addEventListener('click', () => {
                if (current < max) { current++; refresh(); }
            });

            /* Keyboard */
            const section = portfolioTrack.closest('.portfolio-section');
            if (section) {
                section.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') { prevBtn.click(); e.preventDefault(); }
                    if (e.key === 'ArrowRight') { nextBtn.click(); e.preventDefault(); }
                });
            }

            /* Resize */
            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(calcLayout, 200);
            });

            calcLayout();
        }
    }

    /* Acordeones: apertura y cierre con altura animada */
    const motionReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
    const DURATION = 260;

    document.querySelectorAll(".faq-list details, .process-accordion details").forEach((details) => {
        const summary = details.querySelector("summary");
        if (!summary || details.dataset.accordionReady) return;
        details.dataset.accordionReady = "true";

        let running = null;

        summary.addEventListener("click", (event) => {
            if (motionReduced.matches) return;
            event.preventDefault();

            if (running) {
                running.cancel();
                running = null;
            }

            const start = details.offsetHeight;
            const opening = !details.open;

            if (opening) {
                details.open = true;
                details.style.overflow = "hidden";
                const end = details.offsetHeight;
                details.style.height = start + "px";
                void details.offsetHeight;

                running = details.animate(
                    [{ height: start + "px" }, { height: end + "px" }],
                    { duration: DURATION, easing: EASE }
                );
                details.querySelectorAll("p").forEach((p) => {
                    p.animate([{ opacity: 0 }, { opacity: 1 }], { duration: DURATION, easing: "ease" });
                });
                running.onfinish = () => {
                    details.style.overflow = "";
                    details.style.height = "";
                    running = null;
                };
            } else {
                details.open = false;
                const end = details.offsetHeight;
                details.open = true;
                details.style.overflow = "hidden";
                details.style.height = start + "px";
                void details.offsetHeight;

                running = details.animate(
                    [{ height: start + "px" }, { height: end + "px" }],
                    { duration: DURATION, easing: EASE }
                );
                details.querySelectorAll("p").forEach((p) => {
                    p.animate([{ opacity: 1 }, { opacity: 0 }], { duration: DURATION * 0.6, easing: "ease" });
                });
                running.onfinish = () => {
                    details.open = false;
                    details.style.overflow = "";
                    details.style.height = "";
                    running = null;
                };
            }
        });
    });


    /* Dropdown de categorias del portafolio: hover con retardo + teclado */
    const navDropdown = document.querySelector("[data-nav-dropdown]");
    if (navDropdown) {
        const trigger = navDropdown.querySelector(".nav-dropdown__trigger");
        const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        let closeTimer = null;

        const openDropdown = () => {
            window.clearTimeout(closeTimer);
            navDropdown.classList.add("is-open");
            trigger.setAttribute("aria-expanded", "true");
        };

        const closeDropdown = () => {
            window.clearTimeout(closeTimer);
            navDropdown.classList.remove("is-open");
            trigger.setAttribute("aria-expanded", "false");
        };

        const scheduleClose = () => {
            window.clearTimeout(closeTimer);
            closeTimer = window.setTimeout(closeDropdown, 180);
        };

        if (canHover) {
            navDropdown.addEventListener("mouseenter", openDropdown);
            navDropdown.addEventListener("mouseleave", scheduleClose);
        }

        navDropdown.addEventListener("focusin", openDropdown);
        navDropdown.addEventListener("focusout", (event) => {
            if (!navDropdown.contains(event.relatedTarget)) scheduleClose();
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") closeDropdown();
        });
    }

});
