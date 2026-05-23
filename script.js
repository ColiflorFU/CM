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

