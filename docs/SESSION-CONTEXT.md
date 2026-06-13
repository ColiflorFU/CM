# CM Website — Session Documentation

**Última actualización:** 2026-06-12
**Proyecto:** Contreras Martínez Arquitectura Integral
**Repo:** https://github.com/ColiflorFU/CM

---

## ESTADO ACTUAL

### Lo que está funcionando ✅

| Sección | Estado | Notas |
|---------|--------|-------|
| Hero slider | ✅ | Funciona con 2 slides, navegación con números 01/02 |
| Studio section | ✅ | Grid con imagen Elizabeth, texto, badge CM |
| Services section | ✅ | 6 servicios en lista con números |
| Philosophy (Nuestra mirada) | ✅ | 3 cards: Escucha, Técnica, Identidad |
| Conversemos section | ✅ | Sección decorativa con heading + líneas |
| Portfolio grid | ✅ | Sin grilla, flex wrap, fotos reales soon |
| Process section | ✅ | Accordion con 4 pasos |
| Contact FAQ | ✅ | Form + FAQ integrados |
| Footer | ✅ | 5 columnas con CTA, Redes, Dirección, Info |
| form.php | ✅ | Envía a elizabethyelizabeth@gmail.com via mail() |
| elizabeth.html | ✅ | Landing page completa con bio, timeline, specialties |

### Lo que NO está funcionando ❌

| Sección | Estado | Notas |
|---------|--------|-------|
| Navbar Desktop | ⚠️ | Estructura HTML corregida, falta verificar visual contra referencia (usar /coli) |
| Navbar Mobile | ⚠️ | Abre/cierra pero no se parece a la referencia |
| Philosophy cards | ⚠️ | Borde izquierdo accent agregado, falta verificar con referencia |
| Hero en desktop | ⚠️ | Se rompió durante sesión anterior, podría estar funcionando ahora |

---

## CAMBIOS REALIZADOS ESTA SESIÓN

### 1. Navbar — Fix estructura (2026-06-02)
- **Antes:** Hamburger a la izquierda, logo centro, links derecha (roto, no se veía)
- **Ahora:** 🍔 Hamburger izquierda → Logo → Links derecha (ARQUITECTURA, DISEÑO, CONSTRUCCIÓN, REGULARIZACIÓN) → Botón **CONTACTO** destacado
- Dropdown con proyectos (Casa en el campo, Residencia urbana, Torre moderna, El estudio) debajo del hamburger
- `.desktop-dropdown-toggle` ahora visible en desktop (antes tenía conflicto `display: none` vs `display: flex`)
- Dropdown volvió a `position: absolute` (estaba en `position: fixed` cubriendo todo el viewport)
- **Pendiente:** No hay animación de cierre del hamburger ni toggle del dropdown funcionando — el JS está en script.js pero necesita revisión

### 2. Hero
- Estructura HTML y CSS intactas
- Se rompió durante cambios del navbar (dropdown fixed empujaba contenido)
- Con el fix del dropdown debería estar funcionando

### 3. Nuevo skill: Coli (revisor de UI)
- Creado `C:\Users\krack\.config\opencode\skills\coli\SKILL.md`
- Comando: `/coli revisar [elemento] contra [referencia]`
- **Regla crítica:** Coli NUNCA lee imágenes en el contexto del orchestrator — delega a un sub-agente con contexto fresco
- Esto evita el error `context window exceeds limit (2013)` de MiniMax
- Registrado en `.atl/skill-registry.md` y Engram

---

## ERROR CONOCIDO — MiniMax context limit

### Error: `context window exceeds limit (2013)`
- **Causa raíz:** La API Anthropic-compatible de MiniMax interpreta `max_tokens=2048` (default) como el límite TOTAL del contexto
- **2013 ≈ 2048** menos overhead
- **Disparador:** Leer imágenes de referencia (PNG) consume muchos tokens y llena el contexto rápido
- **Solución:** Usar `/coli` que delega la lectura de imágenes a un sub-agente con contexto fresco
- **Referencia:** https://github.com/agentscope-ai/QwenPaw/issues/1273

### Síntomas de que está por pasar
- Respuestas se vuelven lentas o cortadas
- El modelo empieza a "olvidar" instrucciones anteriores
- Error directo: `invalid params, context window exceeds limit (2013)`

---

## REFERENCIAS

### Archivos de referencia en `/Referencias`
- `D-NAVBAR.png` — Navbar desktop (NO COINCIDE, pendiente revisión con /coli)
- `M-NAVBAR.png` — Navbar mobile hamburger
- `M-MENU.png` — Menu mobile fullscreen overlay
- `D-NUESTRAMIRADA.png` — Cards filosofía desktop
- `M-NUESTRA MIRANDA.png` — Cards filosofía mobile
- `M-CTA CINVERSEMOS.png` — Sección conversemos
- `M-FOOTER.png` — Footer (IGNORADO, ya estaba bien)
- `BOTONES.png` — Botón brackets (IGNORADO, backup en memoria)

---

## SECCIONES PROTEGIDAS (NO MODIFICAR SIN PERMISIÓN)

> ⚠️ **Importante (2026-06-02):** Esta lista NO está formalizada en un archivo dedicado (`AGENTS.md` o similar). El enforcement es por convención. Se recomienda crear un doc canónico aparte antes de la siguiente sesión para evitar drift.

Regla: cualquier cambio a estas secciones requiere OK explícito de Patrick (verbal o por escrito en sesión).

| # | Sección / archivo | Razón | Backup |
|---|-------------------|-------|--------|
| 1 | **Footer** (`.site-footer` + 5 HTMLs) | Ya estaba bien, rediseño aplicado via openspec | Memoria: "CM: backup footer completo" |
| 2 | **Botón brackets** (`.cta-btn` con 4 L) | Diseño propio, esquinas con `::before`/`::after` | Memoria: "CM: backup botón principal con brackets" |
| 3 | **`form.php`** | Funcional, lógica de envío | — |
| 4 | **Studio section** ("Conoce el estudio") | Diseño cerrado | — |
| 5 | **Services section** ("Servicios") | Diseño cerrado | — |
| 6 | **Banner CTA** ("Consulta de proyecto") | Diseño cerrado | — |
| 7 | **Portfolio grid** | Diseño cerrado, faltan fotos reales | — |
| 8 | **Process section** ("Nuestro proceso") | Diseño cerrado (accordion 4 pasos) | — |
| 9 | **Navbar** (desktop + mobile) | Decisión 2026-06-02: lo dejamos con OpenCode, revisar en revisiones finales | — |

> **Nota:** Mobile tiene problemas pero se ve bien — no es prioridad ahora.

---

## COMO USAR COLI

```
/coli revisar navbar contra D-NAVBAR.png
/coli revisar hero contra referencia
/coli comparar philosophy cards con D-NUESTRAMIRADA.png
```

Coli siempre:
1. Lee la referencia PNG en un sub-agente separado
2. Lee el código HTML/CSS relevante
3. Produce un reporte estructurado: coincidencias, diferencias, prioridad, recomendaciones
4. Devuelve SOLO texto — nunca arrastra imágenes al contexto principal

---

## PENDIENTE

### PAUSADO — REVISIONES FINALES (decisión Patrick 2026-06-02)
1. **Navbar desktop** — Resuelto con OpenCode. Revisión visual final contra `D-NAVBAR.png` en `/coli`
2. **Navbar mobile** — Resuelto con OpenCode. Revisión visual final contra `M-MENU.png` en `/coli`
3. **Hamburger dropdown** — Resuelto con OpenCode. Verificar animación de cierre y toggle del dropdown en revisión final

### IMPORTANTE — VERIFICACIÓN VISUAL
4. **Philosophy cards** — Verificar contra `D-NUESTRAMIRADA.png` usando `/coli`
5. **Hero desktop** — Verificar que funcione después del fix del dropdown

### MEJORAS PENDIENTES — FAQ (nuevo 2026-06-02)
6. **FAQ — contenido** — Auditar y mejorar redacción de las preguntas existentes (revisar tono, claridad, completitud, agregar las que falten relevantes al estudio)
7. **FAQ — JSON-LD** — Replicar el bloque FAQPage schema en `elizabeth.html`, `proyecto-*.html`, `project-template.html` y `equipo-elizabeth-contreras.html`
8. **FAQ — accesibilidad** — Verificar que el accordion use ARIA correcto (`aria-expanded`, `aria-controls`, `<button>` en vez de `<summary>` si es custom), y que sea navegable por teclado
9. **FAQ — encoding** — El JSON-LD de `index.html` tiene mojibake UTF-8 (se ve "Mart��nez" en algunos strings). Revisar y limpiar.

### MEJORAS PENDIENTES — SEO (nuevo 2026-06-02)
10. **Encoding UTF-8 global** — Resolver mojibake en `index.html` y demás HTMLs ("Mart��nez", "��QuǸ", "tǸcnica", etc.). Probable causa: el archivo se guardó como UTF-8 pero la declaración `<meta charset>` no se respetó al servir, o se aplicó encoding dos veces. Verificar BOM y charset.
11. **Open Graph** — Agregar `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name` en TODAS las páginas (index + 3 proyectos + template + elizabeth + contacto + equipo)
12. **Twitter Cards** — Agregar `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` en todas las páginas
13. **Canonical link** — Agregar `<link rel="canonical">` en cada página apuntando a la URL final (definir dominio primero: `contrerasmartinez.cl`?)
14. **JSON-LD Organization + LocalBusiness** — Agregar schema de organización/negocio local en TODAS las páginas con datos consistentes (nombre, dirección, teléfono, email, horario)
15. **Alt text imágenes** — Auditar todas las imágenes: mejorar "Proyecto 1" / "Proyecto 2" del hero slider con descripciones reales, confirmar que los íconos SVG decorativos tengan `alt=""` (ya está correcto)
16. **Sitemap y robots.txt** — Crear `sitemap.xml` y `robots.txt` antes de subir a Hostinger
17. **Performance / Core Web Vitals** — Lazy-load ya está en algunos íconos. Auditar: ¿todas las imágenes? ¿preload de fuentes? ¿compresión de Recursos/Miscelaneos/?
18. **Meta description por página** — Cada HTML debe tener su propia meta description única (no duplicada)

### COMPLETADO (desde última sesión)
- ✅ `SECCIONES-PROTEGIDAS.md` creado como archivo canónico
- ✅ Sitemap + robots.txt existentes y funcionales
- ✅ Fotos reales en portfolio (6 proyectos)
- ✅ Links reales de Instagram/LinkedIn en footer
- ✅ Tags v1.3 → v1.8 creados y pusheados
- ✅ VERSION bump a 1.8
- ✅ REGISTRO-CAMBIOS.md actualizado hasta v1.8

### NUEVOS PENDIENTES (agregados 2026-06-10)
23. ~~**Grillas en contacto**~~ ✅ Resuelto v1.9 — refactorizado a valores proporcionales con `clamp()` como el CTA del home
24. **Múltiples fotos por proyecto** — Agregar más de 1 foto por proyecto (galería interna en cada `proyecto-*.html`)
25. **Img fondo menú mobile** — Agregar imagen de fondo al menú mobile overlay

### PARA PRÓXIMA SESIÓN
19. ~~Subir fotos reales al portfolio~~ ✅ Hecho
20. Descomentar sección CTA HABLEMOS y llevarla a `elizabeth.html` y `proyecto-*.html`
21. Verificar `form.php` en Hostinger (una vez alojado)
22. ~~Agregar links reales de Instagram/LinkedIn~~ ✅ Hecho

---

## BACKUPS GUARDADOS EN MEMORIA

- **Botón brackets:** buscar en memoria "CM: backup botón principal con brackets"
- **Footer:** buscar en memoria "CM: backup footer completo"

---

## Líneas de CSS clave

- `.site-header` → línea 65 (navbar fixed con blur)
- `.site-nav` → línea 82 (flex, margin-left:auto para empujar a derecha)
- `.nav-contact-btn` → línea 116 (botón CONTACTO destacado)
- `.desktop-dropdown-toggle` → línea 99 (hamburger, display:flex)
- `.desktop-dropdown` → línea 207 (dropdown absolute, left:36px)
- `.menu-toggle` → línea 126 (hamburger shared styles)
- `.mobile-menu-overlay` → línea 2792 (fullscreen overlay mobile)
- `.hero-slider` → línea 270 (slider container)
- `.hero__track` → línea 291 (slider track)
- `.hero__slide` → línea 304 (slide grid 2 columnas)
- `.philosophy-card` → ~línea 879 (cards con borde izquierdo)

---

## Información de contacto (para form.php)

- **Email destino actual:** elizabethyelizabeth@gmail.com
- **Email destino futuro:** elizabethcm@contrerasmartinez.cl (pendiente confirmación dominio)
- **Teléfono:** +56 9 5127 8937
- **Dirección:** Paseo Ahumada 341, Of. 504, Santiago Centro, Chile

---

## Login credentials (para referencia futura)

- **GitHub:** https://github.com/ColiflorFU/CM
- **Hostinger:** (por confirmar si hay cuenta)