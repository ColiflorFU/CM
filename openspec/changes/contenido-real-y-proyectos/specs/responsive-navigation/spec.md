# Responsive Navigation Specification

## Purpose

The site previously rendered a mobile menu overlay only on index.html. Project pages (proyecto-casa-campo, proyecto-residencia, proyecto-torre) and elizabeth.html had the hamburger button but no overlay — tapping it in mobile viewports did nothing. This spec ensures consistent responsive navigation across all site pages.

## Requirements

### Requirement: Mobile overlay present on all pages

Every page with a hamburger button MUST include a working mobile overlay with menu links, close button, and consistent styling.

#### Scenario: Open overlay from project page

- GIVEN the user is on proyecto-casa-campo.html at 375px viewport width
- WHEN the user taps the hamburger button (.menu-toggle)
- THEN .mobile-menu-overlay becomes visible (display: flex)
- AND the menu links are tappable and navigate to correct pages

#### Scenario: Close overlay

- GIVEN the mobile overlay is visible on proyecto-residencia.html
- WHEN the user taps the close button (.close-toggle)
- THEN the overlay hides (display: none)

#### Scenario: Overlay on elizabeth.html

- GIVEN the user is on elizabeth.html at 375px viewport width
- WHEN the user taps the hamburger button
- THEN the overlay appears with the same link structure as index.html

### Requirement: Consistent styling

The mobile overlay on every page MUST use `--font-sans` defined in `:root` and match the visual style of index.html's overlay.

#### Scenario: CSS variable resolution

- GIVEN styles.css defines `--font-sans` in `:root`
- WHEN the mobile overlay renders on proyecto-torre.html
- THEN `.mobile-menu-links a` and `.mobile-contact-btn` resolve `--font-sans` correctly
- AND no fallback to unset occurs

### Requirement: All navigation links present

The mobile overlay MUST include links to all main sections: Inicio, Proyectos, Elizabeth, Servicios, Contacto.

#### Scenario: Link coverage check

- GIVEN the mobile overlay is open on any page
- WHEN the user inspects the menu links
- THEN the overlay contains links to index.html, each project page, elizabeth.html, and contacto.html
