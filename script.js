/*!
* Minimal script for Navbar interactions
*/
window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Mobile navigation behavior
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const navbarResponsive = document.body.querySelector('#navbarResponsive');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );

    const closeMobileMenu = function () {
        if (!navbarResponsive || !navbarResponsive.classList.contains('show')) {
            return;
        }

        const collapse = bootstrap.Collapse.getOrCreateInstance(navbarResponsive, {
            toggle: false
        });
        collapse.hide();
    };

    if (navbarResponsive && mainNav) {
        navbarResponsive.addEventListener('show.bs.collapse', () => {
            document.body.classList.add('mobile-menu-open');
            mainNav.classList.add('mobile-menu-open');
        });

        navbarResponsive.addEventListener('hidden.bs.collapse', () => {
            document.body.classList.remove('mobile-menu-open');
            mainNav.classList.remove('mobile-menu-open');
        });

        navbarResponsive.addEventListener('click', (event) => {
            if (event.target === navbarResponsive) {
                closeMobileMenu();
            }
        });

        document.addEventListener('click', (event) => {
            const isMobileTogglerVisible = navbarToggler && window.getComputedStyle(navbarToggler).display !== 'none';
            if (!isMobileTogglerVisible || !navbarResponsive.classList.contains('show')) {
                return;
            }

            const clickedMenuLink = event.target.closest('#navbarResponsive .nav-link');
            const clickedToggler = navbarToggler.contains(event.target);

            if (!clickedMenuLink && !clickedToggler) {
                closeMobileMenu();
            }
        });
    }

    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (navbarToggler && window.getComputedStyle(navbarToggler).display !== 'none') {
                closeMobileMenu();
            }
        });
    });

    // Subtle scroll reveal animations
    const revealSelectors = [
        '.page-section .sub-heading',
        '.page-section h2',
        '.service-item',
        '.team-card',
        '.profile-card',
        '.timeline-item',
        '.cta-break-content',
        '.related-project-card',
        '.project-lead-cta'
    ];
    const revealElements = document.querySelectorAll(revealSelectors.join(','));

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && revealElements.length) {
        let serviceCardIndex = 0;
        revealElements.forEach((element, index) => {
            if (!element.hasAttribute('data-reveal')) {
                const isCard = element.matches('.service-item, .team-card, .profile-card, .timeline-item, .related-project-card');
                element.setAttribute('data-reveal', isCard ? 'card' : 'title');
                if (element.matches('.service-item')) {
                    const delay = serviceCardIndex === 5 ? 0.48 : serviceCardIndex * 0.08;
                    element.style.setProperty('--reveal-delay', `${delay}s`);
                    serviceCardIndex += 1;
                } else {
                    element.style.setProperty('--reveal-delay', `${Math.min(index % 3, 2) * 0.08}s`);
                }
            }
        });

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.16,
            rootMargin: '0px 0px -8% 0px'
        });

        revealElements.forEach((element) => revealObserver.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add('is-visible'));
    }

    // Stats counter and progress bars
    const statsPanel = document.querySelector('.stats-panel');
    if (statsPanel) {
        const progressBars = statsPanel.querySelectorAll('[data-progress]');
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const animateStats = function () {
            progressBars.forEach((bar) => {
                bar.style.width = `${bar.dataset.progress}%`;
            });
        };

        if (prefersReducedMotion) {
            animateStats();
        } else {
            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateStats();
                        statsObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.35
            });
            statsObserver.observe(statsPanel);
        }
    }

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Simulating email sending
            const name = document.getElementById('name').value;
            alert(`Gracias ${name}, hemos recibido tu mensaje. Te contactaremos en las próximas horas.`);

            // Reset form
            contactForm.reset();
        });
    }

});

