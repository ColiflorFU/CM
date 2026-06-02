# CM Website — Session Documentation

**Última actualización:** 2026-06-02
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
| Navbar Desktop | ❌ | No se ve, no funciona — fue modificado y roto |
| Navbar Mobile | ⚠️ | Abre/cierra pero no se parece a la referencia |
| Philosophy cards | ⚠️ | Borde izquierdaaccent agregado, falta verificar con referencia |

---

## CAMBIOS REALIZADOS ESTA SESIÓN

### 1. Navbar
- **Antes:** Links: Estudio, Servicios, Portfolio, Proceso, Contacto
- **Ahora:** Links: ARQUITECTURA, DISEÑO, EL ESTUDIO (→elizabeth.html), CONSTRUCCIÓN, REGULARIZACIÓN
- **Problema:** El navbar desktop está broken — no se ve, el agente lo修改ó mal

### 2. Landing elizabeth.html
- Creada desde cero con contenido del backup
- Incluye: bio, quote, tags ("12+ años", "2014 Arquitecta titulada", etc.)
- Timeline: 2025, 2024, 2015
- Specialty cards: Arquitectura y Diseño, Regularización, Renovación
- Philosophy quote sobre tecnología

### 3. Nueva sección "CONVERSEMOS"
- Heading grande uppercase + líneas decorativas horizontales
- Subtext: "Cuéntanos sobre tu proyecto, consulta o presupuesto..."
- Ubicación: entre philosophy y banner-cta

### 4. Nueva sección "CTA HABLEMOS" (comentada)
- Sección con quote de Elizabeth y botón "CONOCER AL ESTUDIO"
-Fue comentada porque se movrá a proyectos y founder pages
- **Ubicación en index.html:** líneas 364-383 (comentadas)

### 5. Galería break
- Grid 2x2 con 4 imágenes
- Hover scale en cada imagen
- Agregada antes de contacto

### 6. Portfolio grid
- **Cambio:** Se sacó la grilla y los backgrounds de color
- Ahora es flex con wrap
- Las fotos reales se subirán pronto

### 7. Form.php
- Handler PHP con mail()
- Honeypot spam protection
- Sanitización lineal (validate → sanitize)
- Envía a: elizabethyelizabeth@gmail.com

### 8. Fondos grises
- Cambiados a #f7f7f7 en: philosophy, services, process, conversemos

### 9. Traducciones
- "Featured work" → "Trabajos destacados"
- "DROP US A LINE" → "ESCRÍBENOS"
- "Social" → "Redes"
- "Find Us" → "Escríbenos"
- "Info" → "Información"

### 10. Philosophy cards
- Borde izquierdo naranja accent (antes era borde inferior)
- El acento está en la tarjeta, no en el h3

---

## REFERENCIAS

### Archivos de referencia en `/Referencias`
- `D-NABVAR.png` — Navbar desktop (ACTUALMENTE NO COINCIDE)
- `M-NAVBAR.png` — Navbar mobile hamburger
- `M-MENU.png` — Menu mobile fullscreen overlay
- `D-NUESTRAMIRADA.png` — Cards filosofía desktop
- `M-NUESTRA MIRANDA.png` — Cards filosofía mobile
- `M-CTA CINVERSEMOS.png` — Sección conversemos
- `M-FOOTER.png` — Footer (IGNORADO, ya estaba bien)
- `BOTONES.png` — Botón brackets (IGNORADO, backup en memoria)

---

## SECCIONES PROTEGIDAS (NO MODIFICAR SIN PERMISIÓN)

1. **Footer** — Ya estaba bien, backup guardado en memoria
2. **Botón brackets** — Diseño propio, backup guardado en memoria
3. **form.php** — Funcional, no tocar lógica

---

## PENDIENTE DE ARREGLAR

### CRÍTICO
1. **Navbar desktop** — No se ve, no funciona. Necesita revisión urgente contra D-NAVBAR.png

### IMPORTANTE
2. **Navbar mobile** — Funciona pero no se parece a M-MENU.png
3. **Philosophy cards** — Verificar que coincidan con D-NUESTRAMIRADA.png

### PARA PRÓXIMA SESIÓN
4. Subir fotos reales al portfolio (reemplazar placeholder Proyecto01.png)
5. Descomentar sección CTA HABLEMOS y llevarla a elizabeth.html y proyecto-*.html
6. Verificar form.php en Hostinger (una vezalojado)
7. Agregar links reales de Instagram/LinkedIn si ya están definidos

---

## BACKUPS GUARDADOS EN MEMORIA

- **Botón brackets:** buscar en memoria "CM: backup botón principal con brackets"
- **Footer:** buscar en memoria "CM: backup footer completo"

---

## Líneas de CSS clave

- `.site-header` → línea 65 (navbar fixed con blur)
- `.site-nav` → línea 85 (links horizontales, gap 28px)
- `.menu-toggle` → línea 113 (hamburger, display:none desktop)
- `.mobile-menu-overlay` → línea 2731 (fullscreen overlay mobile)
- `.philosophy-card` → línea 879 (cards con borde izquierdo)

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