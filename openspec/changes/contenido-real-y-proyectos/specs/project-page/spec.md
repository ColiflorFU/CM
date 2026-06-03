# Project Page Specification

## Purpose

All project pages previously used the same placeholder image (Proyecto01.png) regardless of the project, making the site appear like a template. This spec ensures each project has unique visual identity, accurate metadata, and real descriptive text.

## Requirements

### Requirement: Unique hero image per project

Every project page MUST display a distinct hero image representing that specific project. No two project pages SHALL share the same hero image.

#### Scenario: Unique hero on existing projects

- GIVEN the user navigates to proyecto-casa-campo.html
- WHEN the page loads
- THEN the hero section background-image is a unique file from Recursos/Proyectos/
- AND the image differs from proyecto-residencia.html and proyecto-torre.html

#### Scenario: Missing image fallback

- GIVEN a project page references an image file that does not exist
- WHEN the page loads
- THEN the browser renders a visually acceptable fallback (CSS background-color or gradient)
- AND no broken image icon is displayed

### Requirement: Real project metadata

Each project page MUST display accurate metadata (tipo, ubicación, año, superficie) specific to that project. No placeholder or demo data SHALL appear.

#### Scenario: Verify metadata accuracy

- GIVEN the user opens any project page
- WHEN inspecting the project metadata section
- THEN each field contains real, project-specific data
- AND no entry reads "Partner: LiquidThemes", "Role: Architect", or similar demo placeholder content

### Requirement: Minimum of 6 projects

The site MUST have at least 6 project pages with real content. The 3 existing projects (casa-campo, residencia, torre) SHALL be updated. Three or more new project pages SHALL be created.

#### Scenario: Existing projects updated

- GIVEN proyecto-casa-campo.html, proyecto-residencia.html, proyecto-torre.html
- WHEN each page is inspected
- THEN each has a unique hero image and real descriptive text

#### Scenario: New projects navigable

- GIVEN a new project page exists (e.g., regularización, remodelación, comercial)
- WHEN the user navigates to it
- THEN it contains a real project title, description, metadata, and hero image
- AND it is reachable via the prev/next navigation at the bottom of adjacent project pages
