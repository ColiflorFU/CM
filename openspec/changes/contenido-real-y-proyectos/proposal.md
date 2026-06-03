# Proposal: Contenido real y proyectos

## Intent

Misma imagen placeholder (`Proyecto01.png`) en todos los proyectos, textos demo en inglés, sección decorativa sin función, bugs CSS que rompen navegación mobile en subpáginas. El sitio necesita contenido real para proyectar un estudio profesional.

## Scope

### In Scope
- 6 hot fixes: CSS stray `}` L3151, `--font-sans`, menú mobile ausente en 5 subpáginas, footer inglés, social links `#!`, copyright 2025/2026
- Reemplazar TODAS las imágenes y textos placeholder (project-template.html, quote Le Corbusier, "Foto pendiente")
- Agregar 3+ proyectos → total 6+ con contenido real
- Expandir FAQ de 5 a 8-10 preguntas
- Reemplazar o eliminar `gallery-break-section` (fotos desparramadas)

### Out of Scope
- PHPMailer/SMTP (pendiente accesos Hostinger)
- Navbar/footer como componentes reutilizables
- og-image.jpg
- Rediseño de equipo-elizabeth-contreras.html

## Capabilities

### New Capabilities
- `responsive-navigation`: Menú mobile overlay en subpáginas de proyecto y elizabeth.html

### Modified Capabilities
- `project-page`: Imágenes reales, textos reales, 3+ proyectos nuevos
- `faq-section`: Expandir a 8-10 preguntas
- `site-footer`: Footer unificado en español + social links reales
- `gallery-break`: Reemplazar o eliminar sección decorativa

## Approach

**Fase 1 — Hot fixes**: CSS bugfixes, mobile menu en subpáginas, footer/español y social links. **Fase 2 — Contenido**: Imágenes y textos reales + proyectos nuevos. **Fase 3 — QA**: Revisión cross-page, 0 placeholders.

## Affected Areas

| Area | Impact | Desc |
|------|--------|------|
| `styles.css` | Modified | Stray `}`, `--font-sans`, CSS duplicado |
| `proyecto-casa-campo.html` | Modified | Menú mobile + footer español + imágenes reales |
| `proyecto-residencia.html` | Modified | Ídem |
| `proyecto-torre.html` | Modified | Ídem |
| `project-template.html` | Removed | Template demo — no publicar |
| `index.html` | Modified | FAQ expandido, gallery-break reemplazado |
| `elizabeth.html` | Modified | Menú mobile + quote corregido |
| `Recursos/Proyectos/` | New | Assets de proyectos reales |

## Risks

| Risk | L | Mitigation |
|------|---|------------|
| Cliente no entrega fotos a tiempo | High | Usar renders/planos como placeholder temporal |
| CSS fixes rompen layout | Low | Git diff + review visual en cada página |

## Rollback Plan

`git checkout` por archivo individual. Hot fixes se revierten separadamente. project-template.html se elimina (git lo recupera).

## Dependencies

- Fotos reales de proyectos (desde la clienta)
- Textos reales para proyectos nuevos

## Success Criteria

- [ ] 0 imágenes placeholder en el sitio
- [ ] 6+ proyectos con fotos y textos reales
- [ ] Menú mobile funcional en todas las páginas
- [ ] Footer y redes consistentes en español
- [ ] FAQ con 8-10 preguntas
- [ ] Sin reglas CSS rotas (validado en 3+ páginas)
