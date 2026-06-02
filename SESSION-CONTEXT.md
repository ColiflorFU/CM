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

1. **Footer** — Ya estaba bien, backup guardado en memoria
2. **Botón brackets** — Diseño propio, backup guardado en memoria
3. **form.php** — Funcional, no tocar lógica
4. **Studio section ("Conoce el estudio")** — PROTEGIDA
5. **Services section ("Servicios")** — PROTEGIDA
6. **Banner CTA ("Consulta de proyecto")** — PROTEGIDA
7. **Portfolio grid** — PROTEGIDA (fotos reales próximas)
8. **Process section ("Nuestro proceso")** — PROTEGIDA

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

### CRÍTICO
1. **Navbar desktop** — Verificar visual contra D-NAVBAR.png usando `/coli`
2. **Navbar mobile** — Verificar contra M-MENU.png usando `/coli`
3. **Hamburger dropdown** — Falta animación de cierre, el toggle del dropdown no funciona

### IMPORTANTE
4. **Philosophy cards** — Verificar contra D-NUESTRAMIRADA.png usando `/coli`
5. **Hero desktop** — Verificar que funcione después del fix del dropdown

### PARA PRÓXIMA SESIÓN
6. Subir fotos reales al portfolio (reemplazar placeholder Proyecto01.png)
7. Descomentar sección CTA HABLEMOS y llevarla a elizabeth.html y proyecto-*.html
8. Verificar form.php en Hostinger (una vez alojado)
9. Agregar links reales de Instagram/LinkedIn si ya están definidos

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