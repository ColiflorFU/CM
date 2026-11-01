# CM Website — Session Documentation

**Última actualización:** 2026-11-01
**Proyecto:** Contreras Martínez Arquitectura Integral
**Repo:** https://github.com/ColiflorFU/CM
**Dominio:** ecmarquitectura.cl
**Versión en `VERSION`:** 2.4.0 (sin commit ni tag todavía)

---

## ESTADO ACTUAL

Sitio estático de 13 páginas (home + 12 en `pages/`). Sin build. El rediseño pedido por el cliente en
`Puntos Web ECM Arquitectura.pdf` está implementado; falta decidir dos detalles menores y commitear.

### Lo que está funcionando ✅

| Sección | Estado | v | Notas |
|---------|--------|---|-------|
| Hero | ✅ | v2.4.0 | Un solo slide. Se eliminó el slide 2 ("Transformamos necesidades…") |
| Quiénes Somos (ex Estudio) | ✅ | v2.4.0 | Texto nuevo del brief (eje cívico, Paseo Bulnes) |
| Servicios | ✅ | v2.4.0 | 8 ítems reescritos, ITO al final, Ley del Mono dentro de Regularización |
| Certificaciones | ✅ | v2.4.0 | Eléctricas, Gas y Sanitarias como subservicios independientes |
| Locales Comerciales | ✅ | v2.4.0 | Servicio nuevo según brief |
| El Método | ✅ | v2.4.0 | Conserva título, texto e imagen. Se quitó la fila de 3 iconos y el cierre suelto |
| Preguntas Frecuentes | ✅ | v2.4.0 | Sección propia (`id="faq"`), separada de Proceso |
| Portfolio landing | ✅ | v2.4.0 | `pages/portfolio.html`, vertical, 3 categorías, 6 proyectos reales |
| Navbar desktop/mobile | ✅ | v2.4.0 | Orden: Home, Servicios, Proceso, Portafolio, Quiénes Somos, FAQ, Contacto |
| Sitemap | ✅ | v2.4.0 | 13 URLs, rutas `/pages/` corregidas |
| FAB WhatsApp | ✅ | v2.4.0 | Círculo negro 44px con ícono, alineado con el de volver arriba, en las 13 páginas |
| FAB volver arriba | ✅ | v2.4.0 | Círculo blanco 44px con flecha; es la base de la pila (el de WhatsApp va arriba) |
| Contact modal | ✅ | v2.3 | Sin cambios en esta tanda |
| form.php | ✅ | v2.3 | SMTP nativo ZNet. No tocar sin OK |
| SEO | ⚠️ | — | Meta/JSON-LD previos intactos; falta reverificar canonical y sitemap en producción |
| Deploy | ⚠️ | — | Push a `main` dispara deploy automático en ZNet. No ejecutado en esta tanda |

### Decisiones tomadas en esta tanda

1. **Portafolio con 3 categorías, no 4.** El PDF pedía también "Obras Menores y Remodelaciones", pero no hay
   proyectos ni fotos en `Recursos/Proyectos/`. Regla del brief: no inventar. Queda comentario en el HTML y se
   agrega cuando existan assets reales.
2. **WhatsApp reutiliza el número del footer** (+56 9 5127 8937), como pedía el brief ("reutilizar el contacto
   ya configurado"). Sin mensaje precargado.
3. **La sección "Procesos" no se borró.** La anotación "BORRAS ESO" de la página 6 del PDF quedó sin resolver;
   se separó FAQ de Proceso sin eliminar contenido.

---

## CAMBIOS v2.4.0 — 2026-11-01

Tanda grande: implementación del brief del cliente + landing de portafolio.

- **Contenido**: El Método quedó solo con título, texto e imagen (se quitaron la fila de iconos y el cierre suelto); menú reordenado; slide 2 eliminado; Estudio → Quiénes Somos con texto nuevo; 8 servicios
  reescritos/ampliados; 3 certificaciones separadas; Ley del Mono absorbida por Regularización de Viviendas;
  Método renombrado a Escuchar/Diseñar/Concretar; FAQ independizada.
- **Portafolio**: nueva `pages/portfolio.html` con Viviendas, Locales Comerciales y Espacios Públicos; 6 cards
  con foto y descripción breve, enlazadas a las páginas de proyecto existentes.
- **Navegación**: el desplegable de portafolio se reemplazó por enlace a la landing, en desktop y mobile.
- **Mobile**: corregidos FABs que tapaban texto, textos de reveal que desaparecían sin JS, overflow y cierres de menú.
- **Sitemap**: URLs corregidas a `/pages/…`, agregadas la landing y las 8 páginas de proyecto que faltaban (13 URLs).
- **FAB WhatsApp**: componente nuevo en CSS + markup en las 13 páginas.

Al cierre de esta documentación, todo esto está **sin commitear** en el working tree
(15 archivos modificados + `pages/portfolio.html` nuevo + 3 `.af` sin trackear), más ajustes manuales menores de Patrick hechos esa misma tarde.

---

## PENDIENTE

### Antes de publicar

1. Revisar en local las 13 páginas (`python -m http.server 8081`) con foco en el FAB de WhatsApp en mobile.
2. Decidir qué hacer con los `.af` sueltos (~17 MB): versionar o agregar a `.gitignore`.
3. Commit + tag `v2.4.0` y push a `main` (recordar: el push deploya a producción).

### Después del deploy

4. Verificar en producción: home, landing de portafolio, sitemap, canonical, y que el formulario siga enviando.
5. Gmail "Send mail as" para `elizabeth@ecmarquitectura.cl` (ver `FLUJO-CORREO.md`).
6. Agregar la categoría "Obras Menores y Remodelaciones" cuando haya proyectos con fotos.
7. Pendientes heredados: plantillas HTML de correo con identidad CM, galería múltiple por proyecto,
   imagen de fondo del menú mobile, lazy-load, testimonios.

---

## SECCIONES PROTEGIDAS

Ver `SECCIONES-PROTEGIDAS.md`. Footer, botón brackets, `form.php`, studio, services, banner CTA,
portfolio grid, process y navbar requieren OK explícito de Patrick.

---

## Referencias visuales

En `/Referencias/`: `D-NAVBAR.png`, `M-NAVBAR.png`, `M-MENU.png`, `D-NUESTRAMIRADA.png`,
`M-NUESTRA MIRANDA.png`, `M-CTA CINVERSEMOS.png`, `M-FOOTER.png`, `BOTONES.png`, `faq.jpg`.

---

## Información de contacto

- **Dominio:** ecmarquitectura.cl
- **Email:** elizabeth@ecmarquitectura.cl
- **Email auto:** contacto@ecmarquitectura.cl (acknowledge + lead routing)
- **Teléfono / WhatsApp:** +56 9 5127 8937
- **Dirección:** Paseo Ahumada 341, Of. 504, Santiago Centro, Chile

---

## Credenciales

- **GitHub:** https://github.com/ColiflorFU/CM
- **ZNet Panel:** https://cp.znet-host.com (credenciales en keychain, NO en el repo)
- **Flujo de correo:** `FLUJO-CORREO.md`
