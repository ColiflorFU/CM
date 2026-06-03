# Gallery Break Section Specification

## Purpose

The gallery-break-section in index.html displayed 4 decorative images (including placeholder Proyecto01.png) with no titles, descriptions, or links. Its aria-label "Proyectos" was misleading — the section served no clear function. This spec removes it or replaces it with purposeful content.

## Requirements

### Requirement: Remove or replace gallery-break

The gallery-break-section in index.html MUST be removed entirely or replaced with a section that serves a clear purpose (featured projects, client highlights, or a meaningful visual break with context).

#### Scenario: Removal path — no traces left

- GIVEN gallery-break-section exists in index.html
- WHEN the section is removed
- THEN no .gallery-break-section, .gallery-break-grid, or .gallery-break-item elements remain
- AND the page layout flows naturally from the preceding section to the FAQ section

#### Scenario: Replacement path — purposeful content

- GIVEN gallery-break-section is replaced
- WHEN the new section renders
- THEN it contains real project images with captions, or client logos with names
- AND the aria-label accurately describes the section content
- AND no placeholder images (Proyecto01.png) appear

### Requirement: No broken layout after change

After removal or replacement, the surrounding page layout MUST remain intact.

#### Scenario: Layout integrity at all breakpoints

- GIVEN gallery-break-section has been removed or replaced
- WHEN the user views index.html at 375px, 768px, and 1440px viewport widths
- THEN no sections overlap and no unexpected whitespace gaps appear

### Requirement: No placeholder leak

If the section is replaced, the new content MUST NOT use Proyecto01.png or any other placeholder image.

#### Scenario: Clean image sources

- GIVEN the new section renders in index.html
- WHEN inspecting all image sources (background-image and img tags)
- THEN no src or background-image references Recursos/HeroSection/Proyecto01.png
