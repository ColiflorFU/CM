# CM Website — Session Documentation

**Última actualización:** 2026-08-13
**Proyecto:** Contreras Martínez Arquitectura Integral
**Repo:** https://github.com/ColiflorFU/CM
**Dominio:** ecmarquitectura.cl
**Versión actual:** v2.3.7

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
| form.php | ✅ | v1.2 | Envía lead + auto-respuesta via SMTP nativo (ZNet). Ver `FLUJO-CORREO.md` |
| Flujo email completo | ✅ | — | `contacto@` → acknowledge + lead → Elizabeth en Gmail → responde como `elizabeth@`. Ver `FLUJO-CORREO.md` |
| elizabeth.html | ✅ | v1.0 | Landing page con bio, timeline, specialties |
| SEO básico | ✅ | v2.0 | OG, Twitter Cards, canonical, JSON-LD LocalBusiness + FAQPage |
| Dominio canónico | ✅ | v2.3.3 | `ecmarquitectura.cl` en todos los meta tags |

### Lo que necesita trabajo ⚠️

| Sección | Estado | Prioridad | Notas |
|---------|--------|-----------|-------|
| Navbar Desktop | ⚠️ | Media | Funciona pero no verificada contra referencia visual final |
| Navbar Mobile | ⚠️ | Media | Abre/cierra pero no se parece al mockup |
| Hosting / Deploy | 🔲 | Alta | Dominio y hosting listos, falta migrar |
| form.php SMTP (Gmail config) | 🔲 | Alta | Configurar "Send mail as" en Gmail para elizabeth@. Ver `FLUJO-CORREO.md` |
| SSL / HTTPS | 🔲 | Alta | Configurar certificado tras apuntar dominio |

---

## CAMBIOS REALIZADOS (resumen hasta v2.3.7)

### v2.3.6 → v2.3.7 (13-08-2026) — Última tanda contenido
- "Nuestra Mirada" → "Nuestro Método": tarjetas Escuchar y Empatizar / Proyectar con Funcionalidad / Buenas Prácticas Constructivas
- Sección Proceso → "Metodología de proyecto": nueva bajada, paso 01 "Concepto y expresión"
- CTA banner → texto largo único con `.banner-cta-text`
- Imagen OfWayne reemplazada (1382×1710), `object-fit: contain` en página de proyecto

### v2.3.5 → v2.3.6 (13-08-2026) — Tanda final clienta
- Texto del estudio reemplazado por copy definitivo (Paseo Bulnes / origen)
- "Especialidades Técnicas": Cálculo estructural, certificaciones eléctricas, sanitarias y gas (servicio + FAQ + JSON-LD)
- Primera imagen "Conoce el estudio" → `Recursos/estudio01.jpeg`
- Página interna `pages/gmail-config.html` (noindex) — guía Gmail "Send mail as"

### v2.3.4 → v2.3.5 (29-07-2026)
- Dirección → Paseo Bulnes 209, Oficina 62, Santiago Centro (12 páginas + JSON-LD)
- Cursor dot eliminado, cursor tradicional restaurado
- Galería de proyectos con altura uniforme (360px, cover)

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

### Deploy a producción (17-07-2026)

**Workflow exacto:** Work local → commit/push `main` → ZNet cPanel Git Version Control → Deploy automático.

1. ✅ Dominio `ecmarquitectura.cl` — DNS configurados por ZNet
2. ✅ Archivos subidos vía File Manager a `public_html`
3. ✅ index.php placeholder eliminado
4. ✅ SSL/HTTPS activo automáticamente
5. ✅ Deploy automático — Git Version Control en ZNet cPanel configurado (branch: main)
6. ✅ form.php reescrito con encoding UTF-8 limpio (mojibake eliminado)
7. ✅ Correo `elizabeth@ecmarquitectura.cl` creado en ZNet
8. ✅ **form.php SMTP** — reescrito con SMTP nativo (ZNet), sin dependencias. Ver `FLUJO-CORREO.md`
9. **Gmail "Send mail as"** — configurar para `elizabeth@ecmarquitectura.cl` vía ZNet SMTP (`mail.ecmarquitectura.cl:587/TLS`). Marcar como default. Ver `FLUJO-CORREO.md`
10. **Gmail filtro** — label "Lead Web" para emails de `contacto@ecmarquitectura.cl`, archivar del inbox principal
11. **Verificar SEO** — canonical, sitemap, robots.txt accesibles en producción

### Mejoras post-deploy
7. **Navbar** — verificación visual final contra referencias
8. **Templates email branding** — plantillas HTML para auto-respuesta y lead interno con identidad visual CM
9. **Múltiples fotos por proyecto** — galería interna
10. **Img fondo menú mobile** — agregar imagen de fondo
11. **Performance** — lazy-load completo, compresión de imágenes
12. **Feedback/clientes** — sección de testimonios o reviews (pendiente definir enfoque)

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
- **Email auto:** contacto@ecmarquitectura.cl (buzón de automatización: acknowledge + lead routing)
- **Flujo correo completo:** Ver `FLUJO-CORREO.md`
- **Teléfono:** +56 9 5127 8937
- **Dirección:** Paseo Bulnes 209, Oficina 62, Santiago Centro, Chile

---

## Credenciales

- **GitHub:** https://github.com/ColiflorFU/CM
- **ZNet Panel:** https://cp.znet-host.com (credenciales en keychain, NO en repo)