# CM Website — Session Documentation

**Última actualización:** 2026-07-17
**Proyecto:** Contreras Martínez Arquitectura Integral
**Repo:** https://github.com/ColiflorFU/CM
**Dominio:** ecmarquitectura.cl
**Versión actual:** v2.3.4

---

## ESTADO ACTUAL

### Lo que está funcionando ✅

| Sección | Estado | Versión | Notas |
|---------|--------|---------|-------|
| Hero slider | ✅ | v2.2.4 | 2 slides con imágenes reales, copy final, transiciones cinemáticas |
| Studio section | ✅ | v1.0 | Grid con imagen Elizabeth, texto, badge CM |
| Services section | ✅ | v1.0 | 6 servicios en lista con números |
| Philosophy (Nuestra mirada) | ✅ | v1.4 | 3 cards con iconos SVG reales |
| Portfolio grid | ✅ | v1.4 | Carrusel con 6 proyectos reales, navegación ←/→ |
| Banner CTA | ✅ | v1.8 | Valores proporcionales con `clamp()` |
| Process section | ✅ | v1.0 | Accordion con 4 pasos |
| FAQ section | ✅ | v2.3 | CSS Grid, card superpuesta, accordion limpio |
| Contact modal | ✅ | v2.1 | Popup con 5 campos, reemplaza página standalone |
| Footer | ✅ | v1.5 | 5 columnas con CTA, redes, dirección |
| form.php | ✅ | v1.1 | Envía a elizabethyelizabeth@gmail.com via mail() |
| elizabeth.html | ✅ | v1.0 | Landing page con bio, timeline, specialties |
| SEO básico | ✅ | v2.0 | OG, Twitter Cards, canonical, JSON-LD LocalBusiness + FAQPage |
| Dominio canónico | ✅ | v2.3.3 | `ecmarquitectura.cl` en todos los meta tags |

### Lo que necesita trabajo ⚠️

| Sección | Estado | Prioridad | Notas |
|---------|--------|-----------|-------|
| Navbar Desktop | ⚠️ | Media | Funciona pero no verificada contra referencia visual final |
| Navbar Mobile | ⚠️ | Media | Abre/cierra pero no se parece al mockup |
| Hosting / Deploy | 🔲 | Alta | Dominio y hosting listos, falta migrar |
| form.php en hosting | 🔲 | Alta | Verificar que mail() funcione en Hostinger |
| SSL / HTTPS | 🔲 | Alta | Configurar certificado tras apuntar dominio |

---

## CAMBIOS REALIZADOS (resumen hasta v2.3.4)

### v2.2 → v2.3.4 (17-07-2026) — Otra máquina
- **Hero slider**: imágenes reales (`slider1.jpeg`, `slider2.jpeg`, `hero.jpeg`), copy final, fix `translateX`
- **FAQ section**: rediseño completo con CSS Grid, card superpuesta, accordion limpio
- **Dominio**: canonical y email actualizados a `ecmarquitectura.cl`
- **Limpieza**: eliminado `FICHA MARITEX.af` (24MB), `pages/contacto.html`

### v2.0 → v2.1 (12-07-2026)
- Contacto convertido de página standalone a modal/popup
- Encoding UTF-8 limpio en 13 HTMLs (MVP producción)

### v1.5 → v1.9 (04-06 al 12-06-2026)
- Navbar unificado + mobile menu
- FAQ centrado, carrusel portfolio, hero cinemático, cursor dot
- Grilla contacto proporcional con `clamp()`
- Fixes mobile: parallax, hero, banner grid

---

## PENDIENTE

### Deploy a producción (NUEVO — 17-07-2026)
1. **Apuntar dominio** `ecmarquitectura.cl` al hosting (DNS A record)
2. **Subir archivos** del repo al hosting (FTP o Git deploy)
3. **Verificar form.php** — mail() funciona en Hostinger?
4. **SSL/HTTPS** — certificado activo tras propagación DNS
5. **Verificar SEO** — canonical, sitemap, robots.txt accesibles
6. **Email** — configurar elizabeth@ecmarquitectura.cl

### Mejoras post-deploy
7. **Navbar** — verificación visual final contra referencias
8. **Múltiples fotos por proyecto** — galería interna
9. **Img fondo menú mobile** — agregar imagen de fondo
10. **Performance** — lazy-load completo, compresión de imágenes

### Completado (checklist)
- ✅ Hero slider con imágenes reales
- ✅ FAQ rediseñado con CSS Grid
- ✅ Dominio canónico `ecmarquitectura.cl`
- ✅ Contacto como modal popup
- ✅ Encoding UTF-8 limpio
- ✅ SEO básico (OG, Twitter, JSON-LD)
- ✅ Sitemap + robots.txt
- ✅ Fotos reales en portfolio
- ✅ Links reales Instagram/LinkedIn

---

## SECCIONES PROTEGIDAS (resumen)

Ver `SECCIONES-PROTEGIDAS.md` para la lista completa. No modificar sin OK explícito de Patrick.

---

## Referencias visuales

En `/Referencias/`:
- `D-NAVBAR.png` — Navbar desktop
- `M-NAVBAR.png` — Navbar mobile
- `M-MENU.png` — Menu mobile fullscreen
- `D-NUESTRAMIRADA.png` — Cards filosofía desktop
- `M-NUESTRA MIRANDA.png` — Cards filosofía mobile
- `M-CTA CINVERSEMOS.png` — Sección conversemos
- `M-FOOTER.png` — Footer
- `BOTONES.png` — Botón brackets
- `faq.jpg` — FAQ (referencia)

---

## Información de contacto

- **Dominio:** ecmarquitectura.cl
- **Email:** elizabeth@ecmarquitectura.cl
- **Email form:** elizabethyelizabeth@gmail.com (pendiente migrar)
- **Teléfono:** +56 9 5127 8937
- **Dirección:** Paseo Ahumada 341, Of. 504, Santiago Centro, Chile

---

## Credenciales

- **GitHub:** https://github.com/ColiflorFU/CM
- **Hostinger:** (pendiente verificar acceso)