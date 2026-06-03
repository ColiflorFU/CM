# Tasks: Contenido real y proyectos

## Review Workload

| Field | Value |
|-------|-------|
| Est. changed lines | 800–1,200 |
| 400-line risk | High |
| Chained PRs? | Yes (5 units) |
| Delivery strategy | ask-always |
| Chain strategy | stacked-to-main |

```
Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High
```

### Work Units

| # | Scope | Push? | Deps |
|---|-------|-------|------|
| 1 | CSS hotfixes + footer + social | ✅ done | main → none |
| 2 | Mobile overlay + cleanup | ✅ done | after unit 1 |
| 3 | FAQ, gallery-break, placeholders | per unit | none (no client) |
| 4 | Real projects (images + new pages) | per unit | **needs client photos** |
| 5 | Cross-page QA | per unit | after all units |

## Phase 1: Hot Fixes

- [x] 1.1 Remove stray `}` at L3150 in `styles.css`
- [x] 1.2 Add `--font-sans: 'DM Sans', sans-serif` to `:root` in `styles.css`
- [x] 1.3 Unify footer (ESCRÍBENOS / Redes / Información) + real social links in `proyecto-casa-campo.html`
- [x] 1.4 Same footer + links in `proyecto-residencia.html`
- [x] 1.5 Same footer + links in `proyecto-torre.html`
- [x] 1.6 Spanish footer + real social links in `elizabeth.html`
- [x] 1.7 Delete `project-template.html`

## Phase 2: Mobile Overlay + Cleanup

- [x] 2.1 Add `.mobile-menu-overlay` HTML + `.close-toggle` to `proyecto-casa-campo.html`
- [x] 2.2 Same overlay to `proyecto-residencia.html`
- [x] 2.3 Same overlay to `proyecto-torre.html`
- [x] 2.4 Same overlay + `desktop-dropdown-toggle` to `elizabeth.html`
- [x] 2.5 Remove `gallery-break-section` from `index.html`
- [x] 2.6 Remove `.gallery-break-*` CSS rules from `styles.css`

## Phase 3: Template Cleanup + Content (no client needed)

- [x] 3.1 Delete unused CSS Set 2 (`.proj-row`, `.proj-img-col`, `.proj-text-*`, etc.) from `styles.css`
- [x] 3.2 Clean duplicate `.proj-intro` + merge `.proj-body` declarations in `styles.css`
- [x] 3.3 Spanish nav labels (Previous→Anterior, Next→Siguiente) in all 3 project pages
- [ ] 3.4 Expand FAQ from 5 to 8–10 `<details>` in `index.html` (plazos, visita, Ley del Mono, small projects, regularización)
- [ ] 3.5 Sync FAQPage JSON-LD in `index.html` (`<head>`) with new Q&A
- [ ] 3.6 Replace "Foto pendiente" + ©2025→2026 in `equipo-elizabeth-contreras.html`
- [ ] 3.7 Replace generic quote on `elizabeth.html` L117 with real content

## Phase 4: Real Projects (requires client)

- [x] 4.1 Created `proyecto-ito-mapocho.html` with banner image, tag eyebrow, structure ready
- [ ] 4.2 Replace `Proyecto01.png` in portfolio cards (`index.html` L368–378)
- [ ] 4.3 Update metadata (tipo, año, ubicación, superficie) on all 3 existing project pages
- [ ] 4.4 Create 3+ new project HTMLs (regularización, remodelación, comercial) based on existing layout
- [ ] 4.5 Wire prev/next nav across all project pages
- [ ] 4.6 Add new projects to desktop dropdown + mobile overlay on `index.html`

## Phase 5: Cross-page QA

- [ ] 5.1 Verify 0 placeholders (Proyecto01.png, "Foto pendiente") on any page
- [ ] 5.2 Verify footer: Spanish labels + real social links + ©2026 on every page
- [ ] 5.3 Test mobile menu at 375px on every subpage
- [ ] 5.4 Check no broken links / 404s across all pages
- [ ] 5.5 Verify gallery-break has 0 traces in HTML + CSS

### Cola (pendiente para después de producción)
- PHPMailer/SMTP — cuando la clienta dé accesos a Hostinger
- Navbar y footer como componentes reutilizables — CSS de proyecto inconsistente (márgenes, navbar) contra index.html. Parchear página por página no vale la pena, hay que hacer componentes primero.
- og-image.jpg — no existe, referenciado en OG tags de todas las páginas
- equipo-elizabeth-contreras.html — rediseño pendiente (usa Bootstrap, distinto al resto del sitio)
