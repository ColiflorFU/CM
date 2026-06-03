# Site Footer Specification

## Purpose

Footer content was inconsistent across the site: project pages displayed English copy ("DROP US A LINE", "Social") while index and contacto used Spanish. Social media links pointed to `#!` on most subpages. This spec unifies the footer in Spanish with real social links and consistent copyright.

## Requirements

### Requirement: Footer in Spanish on all pages

Every page MUST display the footer in Spanish. No English labels SHALL appear on any page.

#### Scenario: Project page footer is Spanish

- GIVEN the user scrolls to the footer of proyecto-casa-campo.html
- WHEN inspecting footer headings
- THEN headings read "ESCRÍBENOS", "Redes", "Información"
- AND no heading reads "DROP US A LINE", "Social", or "Find Us"

#### Scenario: All pages consistent

- GIVEN the user visits every site page (index, contacto, elizabeth, all project pages)
- WHEN checking the footer on each
- THEN every page displays the Spanish version with identical structure

### Requirement: Real social media links

Every page MUST link to real social media profiles. No `#!` placeholder links SHALL appear.

#### Scenario: Instagram link

- GIVEN the user clicks the Instagram icon in proyecto-torre.html footer
- WHEN the link resolves
- THEN it points to instagram.com/contrerasmartinez

#### Scenario: LinkedIn link

- GIVEN the user clicks the LinkedIn icon in any footer
- WHEN the link resolves
- THEN it points to linkedin.com/company/contrerasmartinez

### Requirement: Copyright 2026

The footer copyright MUST read "© 2026" on every page. No page SHALL display "© 2025".

#### Scenario: Copyright consistency

- GIVEN the user inspects the footer on every site page
- WHEN reading the copyright line
- THEN all pages display "© 2026"
- AND no page displays "2025"

### Requirement: Consistent footer structure

All pages SHOULD share the same footer HTML structure (contact CTA, social links, info columns, copyright) to facilitate future component extraction.

#### Scenario: Structural parity

- GIVEN the user compares footer DOM of index.html and proyecto-residencia.html
- WHEN inspecting column layout and link classes
- THEN both footers have matching column order, link classes, and icon references
