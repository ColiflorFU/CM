# CM - Contreras Martínez | Arquitectura

> Sitio web estático para estudio de arquitectura.
> Creado originalmente con OpenAI Codex, migrado a opencode.

---

## Estructura del proyecto

```
CM/
├── index.html                          # Página principal (landing page)
├── styles.css                          # Estilos globales (~1539 líneas)
├── script.js                           # JS interactivo (navbar, scroll reveal, stats, form)
├── project-template.html               # Plantilla de detalle de proyecto (artículo)
├── proyecto-residencia.html            # Proyecto: Residencia Los Álamos
├── proyecto-casa-campo.html            # Proyecto: Casa de Campo
├── proyecto-torre.html                 # Proyecto: Torre Central
├── equipo-elizabeth-contreras.html     # Página de la fundadora
├── faq-test.html                       # Página FAQ completa
├── clients-section-backup.html         # Backup sección clientes (MVP)
├── form_backup.html                    # Backup formulario
├── team-section-cards-backup.html      # Backup sección equipo
├── Recursos/
│   ├── favicon.png
│   ├── HeroSection/
│   │   ├── Fondo.jpg
│   │   └── Proyecto01.png
│   ├── Logos/
│   │   ├── LOGO WEB DESK.svg
│   │   ├── LOGO WEB MOBILE.svg
│   │   ├── LogoFooter.svg
│   │   └── favicon.png
│   └── Miscelaneos/
│       ├── CTA.jpg
│       ├── ELIZABETH.png
│       └── fondoplanos.png
├── .gitignore
└── REGISTRO-CAMBIOS.md                 # ← Este archivo
```

---

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| **HTML5** | Estructura del sitio |
| **CSS3 + Variables** | Estilos y paleta de colores |
| **Bootstrap 5.3** | Layout, carrusel, navbar, accordion, formularios |
| **Google Fonts** | Tipografía: Montserrat (300, 400, 500, 700, 800) |
| **Vanilla JS** | Interacciones: navbar shrink, menú móvil, scroll reveal, contadores, formulario |
| **SEO** | Schema JSON-LD (FAQPage) en index.html |

---

## Identidad visual

### Paleta de colores

| Variable | Hex | Uso |
|---|---|---|
| `--color-orange-action` | `#FAA218` | Acento principal (CTAs, hover, detalles) |
| `--color-blue-atlantic` | `#14203B` | Navbar, fondos oscuros, títulos |
| `--color-grey-slate` | `#3C465C` | Texto body |
| `--color-black-editorial` | `#2E2D2C` | Títulos secundarios |
| `--color-grey-steel` | `#626B7C` | Texto secundario |
| `--color-concrete` | `#8B919D` | Texto terciario / placeholder |
| `--color-grey-fog` | `#B2B5BE` | Bordes suaves |
| `--color-white-editorial` | `#EAEAE9` | Fondos de secciones alternas |

### Tipografía

- **Familia**: Montserrat (sans-serif)
- **Jerarquía**:
  - H1/H2: `48px`, color `--color-blue-atlantic`
  - H3-H6: color `--color-black-editorial`, `letter-spacing: -0.02em`
  - Body: `0.95rem`, `line-height: 1.85`
  - Sub-headings: `0.78rem`, `letter-spacing: 2px`, uppercase

### Componentes visuales clave

- **Botones**: `btn-outline-accent` — borde `#FAA218`, sin border-radius, hover con relleno naranja
- **Navbar**: transparente al inicio, `navbar-shrink` con `backdrop-filter: blur(10px)` al scrollear
- **Menú móvil**: fullscreen overlay con animación slide, hamburguesa → X
- **Hero**: carrusel con indicadores circulares, overlay azul al 68% de opacidad
- **Service cards**: tarjetas blancas con hover que levanta 5px y borde naranja
- **CTA break**: sección con imagen de fondo + overlay blanco + filtro gris
- **Reveal animations**: opacidad 0 → 1 con translateY vía IntersectionObserver
- **Footer**: fondo `--color-blue-atlantic` con logo SVG, dirección, contacto y newsletter

---

## Cambios realizados

| Fecha | Descripción |
|---|---|
| _(fecha)_ | Inicio del registro — Proyecto migrado desde OpenAI Codex a opencode |

---

## Próximas decisiones / Tareas pendientes

- [ ] **Contenido de proyectos**: agregar textos, descripciones, memorias y datos reales proporcionados por el cliente
- [ ] **Reemplazar imágenes**: cambiar imágenes placeholder (HeroSection, proyectos, CTA, equipo) por las definitivas del cliente
- [ ] **Equilibrar diseño visual**: agregar imágenes, íconos o elementos gráficos — el sitio se ve muy plano actualmente
- [ ] **Mejorar sección de contacto**: revisar diseño, funcionalidad (email real, integración) y UX del formulario
- [ ] **Separar FAQ**: mover las preguntas frecuentes a una sección/página independiente (actualmente están mezcladas con contacto)
- [ ] **Buscar referencias de hero landing**: investigar diseños de hero para inspirar la renovación visual del header

---

## Cómo correr el proyecto

Es un sitio 100% estático. Abrir `index.html` en el navegador o servir con:

```bash
# Con Python
python -m http.server 8000

# Con Node
npx serve .
```

---

_Última actualización: 27-05-2026_
