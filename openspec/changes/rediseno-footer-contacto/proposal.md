# Proposal: Rediseño Footer y Sección de Contacto

## Intent

Eliminar duplicación del footer en 5 HTMLs y migrar al nuevo estándar editorial/arquitectónico (fondo claro, cuadrícula visible, 5 columnas con CTA spanned 2, corner-bracket CTA). Actualizar visualmente la sección de contacto manteniendo estructura, validación y handler Formspree.

## Scope

### In Scope
- Footer redesign: grid background, 5-column layout (CTA spans 2), corner-bracket button, scroll-to-top FAB
- Footer applied identically across 5 HTML files (index + 3 projects + template)
- Contact section visual refresh (form + FAQ) in index.html
- CSS utility class for architectural grid pattern

### Out of Scope
- Grid pattern in other sections (deferred)
- Adding form/FAQ to project pages
- Form validation logic or Formspree handler changes
- FAQ accordion functionality changes

## Capabilities

### New Capabilities
- `site-footer`: Footer global con grid background, 5-column layout (CTA spans 2), corner-bracket CTA button y scroll-to-top FAB

### Modified Capabilities
None

## Approach

1. **CSS**: Rewrite `.site-footer` block. Grid pattern via `background-image` composite as reusable class. Corner brackets via `::before`/`::after` pseudo-elements offset outside border.
2. **HTML**: 5-column grid — CTA spans first 2 columns (2fr) | Social (1fr) | Address (1fr) | Disclaimer (1fr). Same block applied to all 5 files.
3. **Contacto**: Visual refresh on `contact-faq-section` — increased spacing, refined typography, same 2-col grid and accordion.
4. **No build step**: Direct CSS + HTML edits.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `styles.css` | Modified | Footer + contacto CSS rewrite |
| `index.html` | Modified | Footer rebuild + contacto visual update |
| `proyecto-torre.html` | Modified | Footer rebuild |
| `proyecto-residencia.html` | Modified | Footer rebuild |
| `proyecto-casa-campo.html` | Modified | Footer rebuild |
| `project-template.html` | Modified | Footer rebuild |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Manual duplication diff drift across 5 files | Med | Apply exact same block; use template as source of truth |
| Corner-bracket pseudo-element compat | Low | Test Chrome/Firefox/Safari |
| Grid pattern paint perf | Low | Single composite background, 32px tiles |

## Rollback Plan

`git checkout -- styles.css index.html proyecto-torre.html proyecto-residencia.html proyecto-casa-campo.html project-template.html`

## Dependencies

None — vanilla CSS/HTML, no build step.

## Success Criteria

- [ ] Footer matches spec: white #f8f8f8 bg, visible grid lines, 5-column layout (CTA spans 2), corner-bracket "DROP US A LINE" button at ~270×52px
- [ ] Scroll-to-top FAB visible: 44px circle, black bg, white chevron, fixed bottom-right
- [ ] Contacto visual: cleaner spacing, same form + FAQ structure, no validation regressions
- [ ] All 5 footers identical in structure and styling
