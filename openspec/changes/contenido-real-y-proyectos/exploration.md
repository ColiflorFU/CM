# Exploración: Contenido real y proyectos

> **Cambio**: `contenido-real-y-proyectos`
> **Fecha**: 02/06/2026
> **Artefacto**: Exploración completa del sitio Contreras Martínez

---

## 1. Resumen de imágenes

### 1.1 Por página

#### index.html

| Ruta | Estado | Notas |
|------|--------|-------|
| `Recursos/Logos/LOGO WEB DESK.svg` | ✅ Real | Logo del estudio |
| `Recursos/Miscelaneos/hero.jpeg` | ⚠️ Placeholder | Usada en AMBOS slides del hero con distinto alt text — misma imagen |
| `Recursos/Miscelaneos/materiales.png` | ✅ Real | Textura materiales |
| `Recursos/Miscelaneos/elizabeth-hero.png` | ✅ Real | Foto de Elizabeth (también en OG:image de elizabeth.html) |
| `Recursos/Miscelaneos/trabajando.jpg` | ✅ Real | Foto de arquitecta trabajando |
| `Recursos/Miscelaneos/fondoazul.png` | ✅ Real | Fondo decorativo |
| `Recursos/Miscelaneos/CTA.jpg` | ✅ Real | Imagen CTA |
| `Recursos/Miscelaneos/fondoplanos.png` | ✅ Real | Fondo planos |
| `Recursos/Miscelaneos/mesa.png` | ✅ Real | Mesa de trabajo (usada en banner-cta y gallery-break) |
| `Recursos/Miscelaneos/fondofirma.png` | ✅ Real | Fondo firma |
| `Recursos/Miscelaneos/ArchImage-BG.png` | ✅ Real | Textura hero background |
| `Recursos/iconos/icono-01.svg` | ✅ Real | Icono "Cálido y Humano" |
| `Recursos/iconos/icono-02.svg` | ✅ Real | Icono "Equilibrio y Expresión" |
| `Recursos/iconos/icono-03.svg` | ✅ Real | Icono "Crecimiento y Dirección" |
| `Recursos/favicon.png` | ✅ Real | Favicon |
| `Recursos/HeroSection/Proyecto01.png` | ❌ Placeholder | Usada **4 veces** en index: 3 portfolio cards + gallery-break. Es la MISMA imagen para 3 proyectos distintos. |

#### contacto.html

| Ruta | Estado | Notas |
|------|--------|-------|
| `Recursos/Logos/LOGO WEB DESK.svg` | ✅ Real | Logo |
| `Recursos/favicon.png` | ✅ Real | Favicon |

#### elizabeth.html

| Ruta | Estado | Notas |
|------|--------|-------|
| `Recursos/Logos/LOGO WEB DESK.svg` | ✅ Real | Logo |
| `Recursos/Miscelaneos/ELIZABETH.png` | ✅ Real | Foto de Elizabeth |
| `Recursos/favicon.png` | ✅ Real | Favicon |

#### equipo-elizabeth-contreras.html

| Ruta | Estado | Notas |
|------|--------|-------|
| `Recursos/Logos/LOGO WEB MOBILE.svg` | ✅ Real | Logo mobile |
| `Recursos/Logos/LOGO WEB DESK.svg` | ✅ Real | Logo desktop |
| `Recursos/Logos/LogoFooter.svg` | ✅ Real | Logo footer |
| `Recursos/favicon.png` | ✅ Real | Favicon |
| `.team-photo-placeholder` `> "Foto pendiente"` | ❌ Placeholder | Hero image: solo texto "Foto pendiente", sin imagen real |
| `.profile-image-placeholder` `> "Imagen pendiente"` | ❌ Placeholder | Perfil: solo texto "Imagen pendiente", sin imagen real |

#### proyecto-casa-campo.html, proyecto-residencia.html, proyecto-torre.html, project-template.html

| Ruta | Estado | Notas |
|------|--------|-------|
| `Recursos/Logos/LOGO WEB DESK.svg` | ✅ Real | Logo |
| `Recursos/HeroSection/Proyecto01.png` | ❌ Placeholder | **TODOS** los proyectos usan la misma imagen genérica |
| `Recursos/favicon.png` | ✅ Real | Favicon |

### 1.2 Assets existentes en `Recursos/`

| Directorio | Contenido | Observaciones |
|------------|-----------|---------------|
| `HeroSection/` | `Fondo.jpg`, `Proyecto01.png`, `sketch.svg` | Solo 1 imagen de proyecto real |
| `Proyectos/` | **(vacío)** | Sin assets de proyectos reales |
| `iconos/` | `icono-01.svg`, `icono-02.svg`, `icono-03.svg` | 3 iconos, todos en uso |
| `Logos/` | `LOGO WEB DESK.svg`, `LOGO WEB MOBILE.svg`, `LogoFooter.svg`, `favicon.png` | Completos |
| `Miscelaneos/` | `hero.jpeg`, `elizabeth-hero.png`, `ELIZABETH.png`, `trabajando.jpg`, `materiales.png`, `materiales.webp`, `CTA.jpg`, `fondoazul.png`, `fondoplanos.png`, `mesa.png`, `fondofirma.png`, `fondofirmamobile.png`, `ArchImage-BG.png`, `slider1.jpeg` | 14 archivos misceláneos. `fondoazul.af` es un archivo de Affinity Designer (no usado en web) |

### 1.3 Problemas críticos de imágenes

1. **`Recursos/HeroSection/Proyecto01.png`** se usa 8+ veces representando 4 proyectos distintos.
2. **equipo-elizabeth-contreras.html** tiene 2 placeholders textuales ("Foto pendiente", "Imagen pendiente") sin imágenes reales.
3. **Hero slider**: ambos slides usan exactamente la misma imagen `hero.jpeg`. El segundo slide describe "otra forma de habitar" pero muestra la misma foto.
4. **`Recursos/Proyectos/`** está vacío — no hay assets para nuevos proyectos.

---

## 2. Resumen de textos

### index.html

| Sección | Estado | Notas |
|---------|--------|-------|
| Hero slide 1 | ✅ Real | Copy real, describe el estudio |
| Hero slide 2 | ⚠️ Placeholder | "Segundo proyecto, otra forma de habitar" — genérico, sin proyecto específico |
| Studio section | ✅ Real | Texto real sobre la historia del estudio |
| Philosophy | ✅ Real | Valores reales |
| Services | ✅ Real | 6 servicios con descripciones reales |
| Process | ✅ Real | 4 pasos del proceso, bien descritos |
| Portfolio | ✅ Real | Títulos de proyectos reales |
| FAQ (5 preguntas) | ✅ Real | Preguntas y respuestas reales, completas |
| `cta-hablemos-section` | ⚠️ Comentado / Quote dudoso | Sección completa comentada en HTML. La quote "El fin de toda actividad plástica es la construcción." es de **Le Corbusier**, no de Elizabeth Contreras. |
| Footer | ✅ Real | Información de contacto real |

### contacto.html

| Sección | Estado | Notas |
|---------|--------|-------|
| Hero | ✅ Real | Copy real y completa |
| Formulario | ✅ Real | Campos completos, validación, action a `form.php` |
| Footer | ✅ Real | Contacto real |

### elizabeth.html

| Sección | Estado | Notas |
|---------|--------|-------|
| Hero/Founder | ✅ Real | Bio real de Elizabeth |
| Trayectoria | ✅ Real | Texto bien escrito |
| Especialidades | ✅ Real | 3 áreas descritas |
| Timeline | ✅ Real | Hitos reales 2015-2025 |
| CTA sidebar | ✅ Real | "¿Quieres trabajar con nosotros?" |
| Quote en founder | ⚠️ Dudoso | "El fin de toda actividad plástica es la construcción." atribuido a Elizabeth — es de Le Corbusier |

### equipo-elizabeth-contreras.html

| Sección | Estado | Notas |
|---------|--------|-------|
| Hero | ✅ Real | Texto real |
| Perfil profesional | ✅ Real | Buena descripción |
| Especialidades | ✅ Real | 3 cards con contenido |
| Trayectoria | ✅ Real | Línea de tiempo con descripciones |
| Footer copyright | ⚠️ Inconsistente | "Copyright © 2025" vs "© 2026" en el resto del sitio |

### proyecto-casa-campo.html, proyecto-residencia.html, proyecto-torre.html

| Sección | Estado | Notas |
|---------|--------|-------|
| Título y label | ✅ Real | Cada uno con tipo real (Vacacional/Residencial/Corporativo) |
| Descripción | ✅ Real | Texto específico por proyecto |
| "El desafío" | ✅ Real | Descripción técnica específica |
| Quote | ⚠️ Genérico | Las 3 citas son genéricas atribuibles a cualquier proyecto de arquitectura |
| Meta (tipo/ubicación/año/superficie) | ✅ Real | Datos específicos |
| Navegación prev/next | ✅ Real | Conexión entre proyectos |

### project-template.html

| Sección | Estado | Notas |
|---------|--------|-------|
| Todo | ❌ Placeholder | "Brooklyn Residence", "Photography" como label, descripción en INGLÉS, meta con "Partner: LiquidThemes", "Role: Architect", "Date: June 2022", "Deliverables: Concept Design" — es una plantilla de demostración, no contenido real |

### Footer — inconsistencia de idioma

| Página | Estado | Notas |
|--------|--------|-------|
| index.html | 🇪🇸 Español | "ESCRÍBENOS", "Redes", "Escríbenos", "Información" |
| contacto.html | 🇪🇸 Español | Correcto |
| elizabeth.html | 🇪🇸 Español | Correcto |
| proyecto-casa-campo.html | 🇬🇧 Inglés | "DROP US A LINE", "Social", "Find Us", "Info" |
| proyecto-residencia.html | 🇬🇧 Inglés | Ídem |
| proyecto-torre.html | 🇬🇧 Inglés | Ídem |
| project-template.html | 🇬🇧 Inglés | Ídem |

### Enlaces de redes sociales

| Página | Instagram | LinkedIn | Estado |
|--------|-----------|----------|--------|
| index.html | `instagram.com/contrerasmartinez` | `linkedin.com/company/contrerasmartinez` | ✅ Real |
| contacto.html | Ídem | Ídem | ✅ Real |
| elizabeth.html | `#!` | `#!` | ❌ Rotos |
| proyecto-casa-campo.html | `#!` | `#!` | ❌ Rotos |
| proyecto-residencia.html | `#!` | `#!` | ❌ Rotos |
| proyecto-torre.html | `#!` | `#!` | ❌ Rotos |
| project-template.html | `#!` | `#!` | ❌ Rotos |
| equipo-elizabeth-contreras.html | Botones "F", "T", "I" con `#!` | | ❌ Rotos |

---

## 3. Sección problemática: "fotos desparramadas"

### Ubicación

**index.html**, líneas 466-481 — sección `gallery-break-section`:

```html
<section class="gallery-break-section" aria-label="Proyectos">
    <div class="gallery-break-grid">
        <div class="gallery-break-item gallery-break-item-wide">
            <div class="media-block" style="background-image:url('Recursos/HeroSection/Proyecto01.png')"></div>
        </div>
        <div class="gallery-break-item">
            <div class="media-block" style="background-image:url('Recursos/Miscelaneos/materiales.png')"></div>
        </div>
        <div class="gallery-break-item">
            <div class="media-block" style="background-image:url('Recursos/Miscelaneos/fondoplanos.png')"></div>
        </div>
        <div class="gallery-break-item gallery-break-item-wide">
            <div class="media-block" style="background-image:url('Recursos/Miscelaneos/mesa.png')"></div>
        </div>
    </div>
</section>
```

### Diagnóstico

- Es una grilla decorativa de 4 imágenes sin títulos, descripciones, enlaces ni contexto
- La primera imagen (`Proyecto01.png`) es el mismo placeholder genérico de los portfolios
- No tiene función clara: no es portfolio, no es galería, no es proyecto
- El `aria-label="Proyectos"` es engañoso porque no son proyectos, son imágenes sueltas
- Visualmente rompe el flujo de lectura entre el CTA de proceso y el FAQ

### Sugerencia

Reemplazar por una sección de **proyectos destacados reales** (con fotos reales y enlaces a las fichas de proyecto), o eliminar la sección si no aporta valor.

### Otras secciones con fotos desordenadas

**`_backups/team-section-cards-backup.html`**: Contiene una sección de equipo con 3 cards donde:
- Elizabeth tiene "Foto pendiente"
- 2 colaboradores tienen "Nombre Apellido", "Foto pendiente", descripciones placeholder
- No está incluida en index.html actual — quedó como backup

**`_backups/clients-section-backup.html`**: Sección de clientes con SVGs genéricos (ESTRUCTURA, ORBITAL, MODULAR, APEX) — logos placeholder sin clientes reales.

---

## 4. Estado del FAQ

### En index.html (líneas 483-512)

Actualmente **5 preguntas**, todas con respuestas reales y completas:

| # | Pregunta | Respuesta | Estado |
|---|----------|-----------|--------|
| 1 | ¿Qué servicios ofrece el estudio? | Enumera los 6 servicios | ✅ Completa |
| 2 | ¿Trabajan con proyectos residenciales y comerciales? | Sí, con ejemplos | ✅ Completa |
| 3 | ¿Cuánto cuesta contratar un arquitecto? | Cotización personalizada | ✅ Completa |
| 4 | ¿En qué zonas trabajan? | Santiago + regiones vía remota | ✅ Completa |
| 5 | ¿Cómo inicio un proyecto con ustedes? | Formulario/correo/WhatsApp → reunión | ✅ Completa |

### En JSON-LD structured data

Las mismas 5 preguntas están replicadas en `application/ld+json` (FAQPage schema) — correcto y bien formulado.

### ¿Qué falta?

El contenido existente NO está "vacío" — las preguntas y respuestas son completas. Si el usuario considera que está "muy vacía", probablemente quiere:

- **Más preguntas** sugeridas: plazos de entrega, cómo funciona la Ley del Mono, costo de regularización, proyectos chicos vs. grandes, visita a terreno, etc.
- **Mejor formato visual**: actualmente los detalles `<details>` se abren/cierran con toggle. Podrían beneficiarse de iconos, mejores animaciones, o un diseño más rico.

### Preguntas candidatas para expandir

| Pregunta sugerida | Por qué |
|-------------------|---------|
| ¿Cuánto tiempo toma un proyecto completo? | Pregunta frecuente no cubierta |
| ¿Hacen visita a terreno? | Relevante para clientes |
| ¿Qué es la Ley del Mono y cómo me beneficia? | Ya la mencionan en servicios, ampliar en FAQ |
| ¿Trabajan con proyectos chicos (una pieza, un baño)? | Clientes frecuentes preguntan |
| ¿Cómo es el proceso de regularización paso a paso? | Desmitificar el proceso |

---

## 5. Estado de proyectos

### Proyectos existentes (3)

| Proyecto | Archivo | Tipo | Ubicación | Superficie | Año | Imagen |
|----------|---------|------|-----------|------------|-----|--------|
| Casa de Campo | `proyecto-casa-campo.html` | Vacacional | Villarrica | 250 m² | 2024 | ❌ Placeholder |
| Residencia Los Álamos | `proyecto-residencia.html` | Residencial | Santiago | 320 m² | 2025 | ❌ Placeholder |
| Torre Central | `proyecto-torre.html` | Corporativo | Santiago | 4.200 m² | 2025 | ❌ Placeholder |

### Template (no debe publicarse)

| Proyecto | Archivo | Estado |
|----------|---------|--------|
| Brooklyn Residence | `project-template.html` | ❌ Placeholder completo — NO debe ir a producción |

### ¿Qué falta para llegar a 6+ proyectos?

Se necesitan **mínimo 3 proyectos más** con contenido real. Ideas basadas en los servicios que ofrece el estudio:

| # | Tipo sugerido | Ejemplo | Por qué funciona |
|---|---------------|---------|------------------|
| 4 | Regularización | "Regularización Pasaje Los Olivos" | Muestra expertise en el servicio que más preguntas genera |
| 5 | Remodelación / Interior | "Remodelación Departamento Providencia" | Elizabeth tiene formación en Arquitectura Interior |
| 6 | Comercial / Local | "Local Comercial Barrio Italia" | Diversifica el portfolio |
| 7 (bonus) | Ampliación | "Ampliación Casa Familiar Ñuñoa" | Demanda común en Santiago |

### Problemas de los proyectos actuales

1. **Todas las imágenes son el mismo placeholder** (`Proyecto01.png`)
2. **`Recursos/Proyectos/` está vacío** — no hay fotos de proyectos reales
3. **Los textos son genéricos** — bien escritos pero sin fotos reales que los respalden
4. **El template (`project-template.html`) está en inglés con datos falsos** — hay que asegurarse de NO publicarlo
5. **Los footers de proyecto están en inglés** — inconsistentes con el resto del sitio

---

## 6. CSS / Layout Issues

### Críticos

| # | Problema | Impacto | Archivo/Línea |
|---|----------|---------|---------------|
| 1 | **Llave de cierre extra** (stray `}`) en CSS | Invalida la sintaxis del CSS. Las reglas posteriores (`.related-tag`, media queries) pueden no aplicarse correctamente | `styles.css:3151` |
| 2 | **Variable `--font-sans` usada pero no definida** | En mobile menu, `.mobile-menu-links a` y `.mobile-contact-btn` usan `var(--font-sans)` que no existe en `:root`. Caen a valor inicial (no definido) | `styles.css:3284, 3303` |
| 3 | **Sin menú mobile en subpáginas** | `elizabeth.html`, `proyecto-*.html`, `project-template.html` tienen el botón hamburguesa (`.menu-toggle`) pero **no tienen el overlay mobile** (`.mobile-menu-overlay`, `.close-toggle`, `.mobile-menu-links`). En mobile, el botón no abre nada. | `elizabeth.html`, `proyecto-casa-campo.html`, `proyecto-residencia.html`, `proyecto-torre.html`, `project-template.html` |
| 4 | **CSS duplicado masivo** | Las clases `.proj-*` (body, meta, nav, title, etc.) están definidas **dos veces** en el CSS: una en la sección "Project Page" (line 2620-2868) y otra versión similar en la sección `.proj-row` (line 2870-3150). Esto duplica ~300 líneas y puede causar conflictos de cascada. | `styles.css` |
| 5 | **equipo-elizabeth-contreras.html sin CSS propio** | Usa clases como `.team-hero`, `.team-photo-placeholder`, `.profile-image-placeholder`, `.profile-card`, `.bg-dark-1`, `.bg-dark-2`, `.bg-brand-blue`, `.btn-outline-accent`, `.text-accent` que NO existen en `styles.css`. Solo tiene Bootstrap CDN. Las secciones de foto e imagen se ven como texto simple. | `equipo-elizabeth-contreras.html` + `styles.css` |

### Moderados

| # | Problema | Impacto |
|---|----------|---------|
| 6 | **Footer inconsistente entre secciones del sitio** | 3 páginas en español, 4 en inglés — da imagen poco profesional |
| 7 | **Redes sociales con `#!` en subpáginas** | Los links de Instagram/LinkedIn están rotos en todas las páginas excepto index y contacto |
| 8 | **Copyright inconsistente**: 2025 vs 2026 | `equipo-elizabeth-contreras.html` dice 2025, el resto 2026 |
| 9 | **JSON-LD email inconsistente** | Structured data usa `elizabethyelizabeth@gmail.com`, visible en footer usa `elizabeth@contrerasmartinez.cl` |
| 10 | **Form action `form.php` + JS Formspree** | El HTML tiene `action="form.php"` pero el JS usa Formspree. Si JS falla y el form hace submit tradicional, `form.php` existe y procesa el envío — es un buen fallback, pero no está linkeado consistentemente. En mobile si JS falla debería funcionar. No es bug pero es confuso. |

### Menores

| # | Problema |
|---|----------|
| 11 | `cta-hablemos-section` comentada en HTML (líneas 443-464) — código muerto |
| 12 | `_backups/` con 3 archivos HTML que no se usan |
| 13 | Quote de Le Corbusier atribuida a Elizabeth en 2 lugares (index.html comentado + elizabeth.html) |
| 14 | `fondoazul.af` es un archivo de Affinity Designer no usado, dentro de `Recursos/Miscelaneos/` (no afecta al sitio) |

---

## 7. Recomendación general

### Prioridad 1: Imágenes de proyectos reales

El problema más grave es que **cada proyecto usa la misma imagen placeholder**. Hasta que no haya fotos reales, el sitio parece una maqueta. Esto requiere coordinación con Elizabeth para obtener:
- Mínimo 3-4 fotos por proyecto existente (Casa de Campo, Residencia Los Álamos, Torre Central)
- Fotos para los 3+ proyectos nuevos
- Foto profesional de Elizabeth para reemplazar "Foto pendiente"

### Prioridad 2: Unificar navegación y footer

Hay **3 estilos de navegación distintos** y **2 idiomas de footer**. Antes de agregar proyectos nuevos, estandarizar:
- Footer en español en todas las páginas
- Navegación consistente (con o sin dropdown, según se decida)
- Redes sociales con links reales en todas las páginas

### Prioridad 3: Resolver el CSS

- Eliminar la llave extra (línea 3151)
- Definir `--font-sans` en `:root`
- Limpiar las definiciones duplicadas de `.proj-*`
- Decidir qué hacer con `equipo-elizabeth-contreras.html`: integrarlo al diseño principal con CSS en `styles.css`, o eliminarlo si `elizabeth.html` ya cubre ese contenido

### Prioridad 4: Contenido

- Reemplazar el segundo slide del hero con un proyecto real o eliminarlo
- Decidir si la `gallery-break-section` se transforma en galería de proyectos o se elimina
- Expandir FAQ a 8-10 preguntas
- Crear 3+ proyectos nuevos usando el template de proyecto existente como base

### Prioridad 5: Producción

- `project-template.html` NO debe estar en producción (sitemap no lo incluye, bien)
- El `form.php` está bien escrito (rate limiting, honeypot, PHPMailer con fallback a mail()) — es production-ready
- Verificar que `composer install` esté corriendo en Hostinger para PHPMailer

---

## Ready for Proposal

✅ Sí — hay suficiente información para arrancar un proposal.

Recomiendo arrancar por **Prioridad 2 (unificar navegación y footer)** + **Prioridad 3 (CSS fixes)** como tareas rápidas que dan consistencia inmediata, y luego atacar **Prioridad 1 (imágenes)** que requiere coordinación externa con Elizabeth.

### Lo que el usuario debería saber antes de empezar

1. **Necesita conseguir fotos reales de proyectos con Elizabeth.** Sin eso, el sitio siempre va a parecer un template.
2. **`equipo-elizabeth-contreras.html` es una versión Bootstrap duplicada de `elizabeth.html`** — conviene decidir cuál mantener.
3. **El cambio requiere imágenes** — si no hay fotos nuevas para 3+ proyectos, evaluar si usar renders, planos, o fotos de proyectos anteriores.
4. **El project-template.html no es un proyecto real** — es una plantilla demo que no debe publicarse, pero se puede usar como base para los proyectos nuevos.
