
## Flujo de trabajo multi-máquina

Para mantener el proyecto sincronizado entre varias máquinas:

### Configuración inicial (UNA SOLA VEZ por máquina)

`ash
git clone https://github.com/ColiflorFU/CM.git
git config --global credential.helper osxkeychain
# Al hacer pull/push, pegar el token cuando lo pida
# Queda guardado en el llavero de macOS
`

### Flujo diario

`ash
git pull                          # Traer cambios de la otra máquina
# ... trabajar, modificar archivos ...
git add .
git commit -m "v1.X — descripción del cambio"
git tag v1.X                      # ⬅️ IMPORTANTE: subir versión
git push                          # Subir código
git push origin v1.X              # ⬅️ Subir el tag
`

### Cómo versionar

1. El archivo **VERSION** en la raíz tiene el número actual (ej: 1.0)
2. **REGISTRO-CAMBIOS.md** tiene el historial con fechas y descripciones
3. Antes de cada push, aumentá el número:

   | Cambio | Ejemplo |
   |---|---|
   | Cambio chico (bugfix, texto) | 1.0 → 1.1 |
   | Cambio mediano (sección nueva) | 1.2 → 1.3 |
   | Rediseño grande | 2.0 |

4. Editás **VERSION**, ponés el nuevo número
5. Agregás una línea en **REGISTRO-CAMBIOS.md** en la tabla de cambios
6. Hacés commit + tag con ese mismo número

> ⚠️ **Regla de oro**: Siempre git pull antes de empezar. Si hay conflictos, resolverlos antes de commitear.

---

_Última actualización: 12-07-2026_

## v2.0 — 2026-07-12

MVP listo para producción: encoding UTF-8 limpio en todos los HTML.

| Fecha | Descripción |
|---|---|
| 12-07-2026 | **v2.0 — MVP**: Fix encoding mojibake en 8 páginas (`â€"` → `—` em dash, `â"€` → `─` box drawing). Corregidos meta tags (description, OG, Twitter Cards), JSON-LD, alt text, y comments HTML. Todos los 13 HTMLs ahora tienen UTF-8 limpio. |

## v1.9 — 2026-06-12

Grilla de contacto proporcional como CTA del home.

| Fecha | Descripción |
|---|---|
| 12-06-2026 | **v1.9**: Grilla de contacto (`banner-grid-lines--contact`) refactorizada a valores proporcionales con `clamp()`, igual que el CTA del home (v1.8). Eliminados valores fijos `48px`/`80px`. Container `.contacto-form-col` y panel `.banner-cta-panel--contact` también migrados a `clamp()`. Eliminados overrides mobile redundantes. |

## v1.8 — 2026-06-10

Fixes mobile: parallax, hero height, banner grid lines, CTA panel proporcional.

| Fecha | Descripción |
|---|---|
| 10-06-2026 | **v1.8**: Refactor `.banner-cta-panel` mobile — de valores fijos a custom properties proporcionales para que escale con el viewport. Fix parallax hero scroll desactivado en mobile. Reorganización root: styles.css → `assets/css/`, script.js → `assets/js/`, páginas → `pages/`, docs → `docs/`. |

## v1.7 — 2026-06-10

Fix hero slide altura mobile.

| Fecha | Descripción |
|---|---|
| 10-06-2026 | **v1.7**: Hero slides ahora mantienen misma altura en mobile — evita salto visual al transicionar entre slides. |

## v1.6 — 2026-06-10

Fix banner grid lines mobile.

| Fecha | Descripción |
|---|---|
| 10-06-2026 | **v1.6**: Banner grid lines arregladas en mobile — las líneas del grid desktop usaban `calc()` basado en 5 columnas que se rompía en mobile. Background image centrada explícitamente en mobile. |

## v1.5 — 2026-06-04

Navbar unificado + mobile menu.

| Fecha | Descripción |
|---|---|
| 04-06-2026 | **v1.5**: Navbar nuevo unificado en las 12 páginas: Home, Estudio, Servicios, Portafolio (dropdown), Proceso, Contacto. Dropdown centrado bajo Portafolio. Mobile menu con hamburguesa y acordeón Portafolio. Overlay mobile cambiado de oscuro a blanco. Acordeón portfolio ya no cierra el menú al clickear. Form fix, CSS limpio, ícono X en SVG. ~857 inserciones, ~472 eliminaciones en 17 archivos. |

## v1.4 — 2026-06-04

FAQ centrado, carrusel portfolio, hero cinemático y cursor dot.

| Fecha | Descripción |
|---|---|
| 04-06-2026 | **v1.4**: FAQ centrada — quitada imagen lateral y card flotante, layout centrado con card max-width 720px, bg blanco (#fff). FAQ imagen + card centrados juntos, max-width 1100px. Carrusel portfolio con navegación ←/→, 6 proyectos reales, 3 por vista desktop, 1 mobile. Hero slider con transición cinemática, parallax scroll y zoom de entrada. Cursor personalizado (dot negro) que agranda en interactivos. Custom cursor y reveal animations en script.js. Oculto hamburger en desktop. |

## v1.3 — 2026-06-02

SEO cross-page + rediseño sección FAQ.

| Fecha | Descripción |
|---|---|
| 02-06-2026 | **v1.3 SEO**: Open Graph + Twitter Cards + canonical en 8 HTMLs. JSON-LD LocalBusiness en todas las páginas. FAQPage schema replicado. Meta descriptions únicas por página. Encoding mojibake arreglado en index.html. Alt text mejorados en hero slides. sitemap.xml y robots.txt creados. |
| 02-06-2026 | **v1.3 FAQ**: Rediseño sección FAQ en `index.html` con layout split-screen (imagen + tarjeta blanca superpuesta, inspirado en minimalarc.liquid-themes.com "Our Services"). Estilo overlap: imagen 70% izquierda (placeholder negro), tarjeta 48% derecha con offset vertical 18%. Estilo accordion nuestro mantenido. h2 pegado al primer item, sin separador en primer/último item. `.process-section` y `.faq-section` ahora con fondo `#fff` para contraste con footer. |

## v1.2 — 2026-06-02

Hotfix: márgenes mobile en páginas de proyecto.

| Fecha | Descripción |
|---|---|
| 02-06-2026 | **v1.2**: Fix márgenes mobile en `.proj-intro` y `.proj-body` de páginas proyecto. El breakpoint 760px pisaba el padding lateral a 0, dejando el contenido pegado al borde. Restaurado padding 24px lateral + bottom padding 80px en `.proj-body`. |

## v1.1 — 2026-06-02

Contenido real: plantilla de proyecto, hotfixes, footer unificado, cleanup.

| Fecha | Descripción |
|---|---|
| 02-06-2026 | **v1.1**: Plantilla `proyecto-ito-mapocho.html` con banner y tag `.eyebrow`. Hotfixes CSS (stray `}`, `--font-sans`, dead code eliminado). Footer unificado con redes reales y español. Mobile overlay responsive (hamburguesa + close-toggle). Nav flechas "Anterior"/"Siguiente". Gallery-break section eliminada. Backups movidos a `_backups/`. Formulario con PHPMailer + `composer.json`. `.env.example` creado. robots.txt + sitemap.xml SEO. |

## v1.0 — 2026-05-30

Versionado inicial del proyecto. Se adopta sistema de versionado (v{major}.{minor}).

| Fecha | Descripción |
|---|---|
| 30-05-2026 | **v1.0**: Versionado inicial — creación de VERSION, tag git, REGISTRO-CAMBIOS.md unificado |
