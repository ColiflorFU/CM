# AGENTS.md — CM / ECM Arquitectura

Guía de retome para cualquier agente (OpenCode, DSH, Claude Code, Codex) que trabaje en este repositorio.
Leer esto **antes** de tocar código. Si algo contradice este archivo, gana el código + `git log`, pero avisá.

## Proyecto

Sitio web de **Contreras Martínez Arquitectura Integral** (Santiago de Chile).
Estático, sin build, deploy por Git en ZNet.

- Repo: https://github.com/ColiflorFU/CM
- Dominio: https://ecmarquitectura.cl
- Cliente: Elizabeth Contreras · stakeholder técnico: Patrick ("Coli")
- Versión actual: ver `VERSION`

## Stack y estructura

- HTML + CSS + JS estático. Sin bundler, sin framework, sin npm.
- `index.html` → home
- `pages/` → 12 páginas internas (portfolio, elizabeth, equipo y 9 proyectos)
- `assets/css/styles.css` → única hoja de estilos
- `assets/js/script.js` → menú, modal de contacto, reveal, slider, FABs
- `form.php` → formulario de contacto con SMTP nativo ZNet (no tocar sin OK)
- `Recursos/` → imágenes, logos, proyectos por categoría
- `Referencias/` → mockups y capturas de referencia visual
- `docs/` → documentación viva (ver tabla al final)
- `openspec/` → propuestas SDD históricas, archivo, no se edita

## Correr local

```
cd F:\personal\cm
python -m http.server 8081
```

Luego `http://127.0.0.1:8081`. El formulario **no** funciona en local: necesita PHP + SMTP de ZNet.

## Reglas duras

1. **`docs/SECCIONES-PROTEGIDAS.md` manda.** Footer, botón brackets, `form.php`, studio, services, banner CTA, portfolio grid, process y navbar son zonas protegidas: no se modifican sin OK explícito de Patrick.
2. **No inventar** proyectos, descripciones, fotos, teléfonos ni correos. Si falta un dato, se deja el espacio preparado y se reporta.
3. **Versionado**: cada tanda de cambios sube `VERSION`, agrega entrada en `docs/REGISTRO-CAMBIOS.md` y se taggea con el mismo número.
4. **Push a `main` = deploy automático a producción** (ZNet cPanel → Git Version Control). Nunca pushear sin confirmación humana.
5. Copy visible en español. Commits en formato conventional (`fix:`, `feat:`, `docs:`, `chore:`).

## Estado actual (2026-11-01 · v2.4.0)

Se implementó la lista de cambios del documento del cliente **"Puntos Web ECM Arquitectura.pdf"**, sección por sección, más una landing de portafolio.

Implementado y verificado:
- Menú en orden: Home → Servicios → Proceso → Portafolio → Quiénes Somos → Preguntas Frecuentes → Contacto.
- Hero con un solo slide (se eliminó el segundo).
- "Estudio" pasó a "Quiénes Somos", con el texto nuevo del brief.
- Servicios reescritos: Arquitectura y Diseño, las 3 Certificaciones separadas, Construcción y Remodelación, Regularización de Viviendas, Locales Comerciales, e ITO al final.
- Ley del Mono ya no es servicio propio: vive dentro de Regularización de Viviendas (20.898).
- Preguntas Frecuentes es sección propia (id `faq`), separada de Proceso.
- Método: se conserva la sección (título, texto e imagen) sin la fila de iconos ni el cierre suelto.
- Landing vertical `pages/portfolio.html` con 3 categorías y 6 proyectos reales.
- Sitemap corregido a rutas `/pages/` y ampliado.
- FABs en las 13 páginas: círculo blanco con flecha (volver arriba) y círculo negro con ícono de WhatsApp
  encima (mismo ancho, 12px de separación). Número del footer: +56 9 5127 8937.
- Portafolio: desplegable de 3 categorías en desktop, con ancla a `portfolio.html#portfolio-…`.
- Acordeones de FAQ y Proceso con altura animada.

Pendiente:
- Categoría "Obras Menores y Remodelaciones" del portafolio: sin assets en el repo, no se creó (comentario en `pages/portfolio.html`).
- Assets `.af` sueltos en `Recursos/Miscelaneos/` (`fondofirma.af`, `fondofirmamobile.af`, `slider2.af`, ~17 MB): decidir si se versionan o se ignoran.
- Gmail "Send mail as" para `elizabeth@` (ver `docs/FLUJO-CORREO.md`).
- Verificar SEO y formulario en producción después del próximo deploy.

## Documentación (`docs/`)

| Archivo | Para qué |
|---|---|
| `SESSION-CONTEXT.md` | Estado completo del sitio y pendientes. Empezar acá. |
| `REGISTRO-CAMBIOS.md` | Historial de versiones, una entrada por tanda. |
| `SECCIONES-PROTEGIDAS.md` | Qué no se puede tocar sin OK. |
| `FLUJO-CORREO.md` | Cómo viaja el correo del formulario (SMTP, Gmail, ZNet). |

## Cómo retomar

1. Leer este archivo y `docs/SESSION-CONTEXT.md`.
2. `git status` y `git log --oneline -10`. Al 01-11 hay 8 commits locales sin pushear: revisá si corresponde pushear
   (el push deploya a producción) y si la credencial es la cuenta dueña del repo, no `Diseno-Propulsow`.
3. Recién ahí proponer cambios. Si el pedido toca zona protegida, listar primero qué se propone y pedir OK.
4. Al cerrar: `VERSION` + entrada en `REGISTRO-CAMBIOS` + actualizar `SESSION-CONTEXT`.
