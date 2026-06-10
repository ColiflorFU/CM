# SECCIONES PROTEGIDAS — CM Website

> **Archivo canónico** de secciones y assets que NO deben modificarse sin autorización explícita de Patrick Zapata Cornejo ("Coli").
> Creado: 2026-06-02
> Aplica a: todo el repo `github.com/ColiflorFU/CM`

---

## Regla de oro

**No se modifica NADA de lo listado abajo sin:**
1. Aprobación verbal o escrita de Patrick en sesión activa
2. Entrada nueva en `REGISTRO-CAMBIOS.md` con la razón del cambio
3. Commit y tag con bump de versión (ver `VERSION` + flujo en `REGISTRO-CAMBIOS.md`)

**Si retomás el proyecto con OpenCode u otra IA:** Pasale este archivo primero. Es la fuente de verdad.

---

## Secciones protegidas (HTML/CSS)

| # | Sección / archivo | Razón | Backup |
|---|-------------------|-------|--------|
| 1 | **Footer** (`.site-footer` + 5 HTMLs) | Ya estaba bien, rediseño aplicado via openspec | Memoria: "CM: backup footer completo" |
| 2 | **Botón brackets** (`.cta-btn` con 4 L-shapes) | Diseño propio, esquinas con `::before`/`::after` | Memoria: "CM: backup botón principal con brackets" |
| 3 | **`form.php`** | Funcional, lógica de envío (mail() a gmail) | — |
| 4 | **Studio section** ("Conoce el estudio") | Diseño cerrado | — |
| 5 | **Services section** ("Servicios") | Diseño cerrado | — |
| 6 | **Banner CTA** ("Consulta de proyecto") | Diseño cerrado | — |
| 7 | **Portfolio grid** | Diseño cerrado, faltan fotos reales (placeholder) | — |
| 8 | **Process section** ("Nuestro proceso", accordion) | Diseño cerrado (4 pasos con `<details>`/`<summary>`) | — |
| 9 | **Navbar** (desktop + mobile + hamburger dropdown) | Decisión 2026-06-02: lo dejamos con OpenCode, revisar solo en revisiones finales | — |

## Assets protegidos

| Tipo | Ubicación | Razón |
|------|-----------|-------|
| Logos | `Recursos/Logos/` (`LOGO WEB DESK.svg`, `LOGO WEB MOBILE.svg`, `LogoFooter.svg`, `favicon.png`) | Marca del estudio |
| Iconos de servicios | `Recursos/iconos/icono-01.svg` a `icono-03.svg` | Diseño cerrado |
| Imagen de marca | `Recursos/Miscelaneos/ELIZABETH.png`, `elizabeth-hero.png` | Foto de la arquitecta |
| Favicon | `Recursos/favicon.png`, `Recursos/Logos/favicon.png` | Marca |

## Documentación de respaldo (también protegida)

- `REGISTRO-CAMBIOS.md` — historial de versiones
- `VERSION` — número de versión actual
- `SESSION-CONTEXT.md` — estado de la sesión y decisiones
- `openspec/` — toda la metodología SDD (proposals, designs, tasks, archive)
- `.git/` — todo el historial de git
- `Tareas Elizabeth Contreras.gdoc` — brief original del cliente

---

## Zonas de trabajo LIBRE (no protegidas)

Estas SÍ se pueden modificar y son candidatas naturales para mejoras:

- `<head>` de cualquier HTML — meta description, Open Graph, Twitter Cards, canonical, JSON-LD (SEO/estructura, no visible)
- Contenido textual visible (con revisión de Patrick)
- Imágenes placeholder del portfolio (reemplazo por fotos reales)
- `Recursos/Proyectos/` (vacío, listo para contenido)
- Páginas de proyecto (replicar cambios cross-page)

---

## Excepciones temporales (vigentes a 2026-06-02)

- **Mobile** tiene problemas conocidos pero se ve bien — no es prioridad.
- **Navbar #9** está protegido SOLO hasta revisiones finales; después puede reabrirse para iteración.

---

## Cómo invocar la regla

Si una IA o asistente propone cambios en zonas protegidas, Patrick responde:

> "Revisa `SECCIONES-PROTEGIDAS.md` antes de tocar eso. Necesito OK explícito."

Y la IA/assistant debe:
1. Listar qué cambios propone
2. Marcar cuáles caen en zona protegida
3. Pedir OK uno por uno
4. NO ejecutar hasta confirmación
