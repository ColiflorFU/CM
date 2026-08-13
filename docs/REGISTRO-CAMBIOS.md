
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

_Última actualización: 13-08-2026_

## v2.3.8 — 2026-08-13

Corrección en sección Nuestro Método.

| Fecha | Descripción |
|---|---|
| 13-08-2026 | **v2.3.8**: Paso 01 del acordeón de metodología restaurado a "Diagnóstico" con su texto original (el texto "Concepto y expresión" no correspondía ahí). Agregado párrafo de la clienta ("Defino la arquitectura integral como...") en la sección Nuestro Método, luego del titular, con nueva clase `.philosophy-desc`. |

## v2.3.7 — 2026-08-13

Última tanda de cambios de la clienta (contenido).

| Fecha | Descripción |
|---|---|
| 13-08-2026 | **v2.3.7**: Sección "Nuestra Mirada" redefinida como "Nuestro Método" — tarjetas: Escuchar y Empatizar (Guía la empatía), Proyectar con Funcionalidad (Fundamenta la simpleza), Buenas Prácticas Constructivas (Construye con cuidado). Sección Proceso → "Metodología de proyecto" con nueva bajada y paso 01 "Concepto y expresión" (texto de la clienta). CTA banner adaptado a texto largo único (clase `.banner-cta-text`). Imagen OfWayne reemplazada (1382×1710) y adaptada con `object-fit: contain` en la página del proyecto. |

## v2.3.6 — 2026-08-13

Tanda final de cambios solicitados por la clienta.

| Fecha | Descripción |
|---|---|
| 13-08-2026 | **v2.3.6**: Texto del estudio reemplazado por el copy definitivo de la clienta (Paseo Bulnes / origen). "Especialidades Técnicas" actualizado a "Cálculo estructural, certificaciones eléctricas, sanitarias y gas" (servicio, FAQ y JSON-LD). Primera imagen de "Conoce el estudio" reemplazada por `Recursos/estudio01.jpeg`. Agregada página interna `pages/gmail-config.html` (noindex) con guía paso a paso para configurar Gmail "Send mail as" con el correo corporativo. `.DS_Store` removido del tracking. |

## v2.3.5 — 2026-07-29

Cambios solicitados por la clienta en reunión (no documentados en su momento).

| Fecha | Descripción |
|---|---|
| 29-07-2026 | **v2.3.5**: Dirección actualizada a Paseo Bulnes 209, Oficina 62, Santiago Centro en 12 páginas + JSON-LD. Cursor personalizado (dot) eliminado, restaurado cursor tradicional. Imágenes de galería de proyectos unificadas a misma altura (360px, `background-size: cover`). |

## v2.3.4 — 2026-07-17

FAQ: imagen de referencia actualizada.

| Fecha | Descripción |
|---|---|
| 17-07-2026 | **v2.3.4**: Imagen `faq.jpg` en `Recursos/Miscelaneos/` actualizada con versión de mayor resolución. Agregada imagen de referencia `faq.jpg` en `/Referencias/`. Eliminado archivo `FICHA MARITEX.af` (24MB) de Misceláneos. |

## v2.3.3 — 2026-07-17

Dominio y email canónicos actualizados a ecmarquitectura.cl.

| Fecha | Descripción |
|---|---|
| 17-07-2026 | **v2.3.3**: Canonical URL y email de contacto actualizados de `contrerasmartinez.cl` a `ecmarquitectura.cl` en todos los meta tags (OG, Twitter Cards, canonical), JSON-LD LocalBusiness, y footer. |

## v2.3.2 — 2026-07-17

FAQ: fix rotación del ícono del accordion.

| Fecha | Descripción |
|---|---|
| 17-07-2026 | **v2.3.2**: Corregida rotación del ícono `▾` en el accordion de FAQ — ahora rota correctamente al abrir/cerrar cada item. |

## v2.3.1 — 2026-07-17

FAQ: altura de imagen desktop ajustada.

| Fecha | Descripción |
|---|---|
| 17-07-2026 | **v2.3.1**: Altura de imagen desktop en `.faq-section__media` ajustada para coincidir con la altura de la card de contenido. |

## v2.3 — 2026-07-17

FAQ refactorizado con CSS Grid y card superpuesta.

| Fecha | Descripción |
|---|---|
| 17-07-2026 | **v2.3**: Refactor completo de la sección FAQ. Layout migrado a CSS Grid con imagen a la izquierda y card blanca superpuesta a la derecha. Accordion limpio con `<details>`/`<summary>`. Separadores entre items eliminados en primer/último. Sección `.faq-section` con fondo `#fff`. |

## v2.2.7 — 2026-07-17

FAQ: card se superpone a la imagen, composición tipo mockup.

| Fecha | Descripción |
|---|---|
| 17-07-2026 | **v2.2.7**: Card de FAQ ajustada para superponerse a la imagen con `offset` vertical, composición inspirada en mockup de referencia. |

## v2.2.6 — 2026-07-17

FAQ: imagen con flex grow, sin max-width.

| Fecha | Descripción |
|---|---|
| 17-07-2026 | **v2.2.6**: Imagen de FAQ ajustada con `flex: 1` para llenar el contenedor, eliminado `max-width` que limitaba el tamaño. |

## v2.2.5 — 2026-07-17

FAQ: imagen real reemplaza placeholder.

| Fecha | Descripción |
|---|---|
| 17-07-2026 | **v2.2.5**: Sección FAQ ahora usa `faq.jpg` real en vez de imagen placeholder negra. |

## v2.2.4 — 2026-07-17

Hero slider: imágenes nuevas y textura adaptada.

| Fecha | Descripción |
|---|---|
| 17-07-2026 | **v2.2.4**: Agregadas imágenes `slider1.jpeg` y `slider2.jpeg` al hero. Imagen `hero.jpeg` actualizada a mayor resolución (2.5MB). Textura del hero con `background-size: cover` para adaptarse al contenedor. |

## v2.2.3 — 2026-07-17

Hero slider: copy final de los slides.

| Fecha | Descripción |
|---|---|
| 17-07-2026 | **v2.2.3**: Texto final de los slides del hero — Slide 1: servicios de arquitectura y remodelación. Slide 2: arquitectura residencial y diseño interior. |

## v2.2.2 — 2026-07-17

Hero slider: textos actualizados.

| Fecha | Descripción |
|---|---|
| 17-07-2026 | **v2.2.2**: Textos del hero slider ajustados (mantención + residencial). |

## v2.2.1 — 2026-07-17

Hero slider: fix translateX.

| Fecha | Descripción |
|---|---|
| 17-07-2026 | **v2.2.1**: Fix en `.hero__track` — `translateX` cambiado de `50%` a `100%` para que cada slide ocupe el 100% del viewport y se muestre completo. |

## v2.2 — 2026-07-17

Hero slider: imágenes reales.

| Fecha | Descripción |
|---|---|
| 17-07-2026 | **v2.2**: Hero slider ahora usa `slider1.jpeg` y `slider2.jpeg` en vez de placeholders. |

## v2.1 — 2026-07-12

Contacto simplificado a modal popup — eliminada página standalone.

| Fecha | Descripción |
|---|---|
| 12-07-2026 | **v2.1**: Contacto convertido de página standalone a modal/popup. Formulario limpio con 5 campos (nombre, email, teléfono, tipo proyecto, mensaje). Botones CONTACTO en nav, mobile menu, services, CTA y footer abren modal. Escape/backdrop cierran. Páginas internas (12) redirigen a `index.html#contact`. Eliminada `pages/contacto.html`. Actualizado sitemap. |

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
