# ESTADO-RECUPERACION — Modal de agenda Calendly (popup no intrusivo)

> Documento de recuperación para retomar sin fricción el trabajo de la sesión interrumpida.
> Creado: 2026-08-28
> Estado del trabajo: **APLICADO Y REVISADO EN CÓDIGO, SIN COMMIT** (working tree only)

---

## Objetivo

Agregar un **popup de agenda Calendly no intrusivo** que aparezca una vez por sesión del navegador, en **todas las páginas públicas HTML** del sitio, para priorizar la reserva de reuniones (https://calendly.com/arquitecturaecm) sin interrumpir la experiencia de los visitantes que llegan desde redes.

El popup es independiente del CTA Calendly ya publicado (commit `b73a850`): ese CTA cambió la jerarquía hero/footer hacia Calendly; este trabajo agrega el popup de captura.

## Quick path (retomá desde acá)

1. Revisar el diff pendiente: `git diff` (16 archivos, +491/−6 líneas).
2. Verificar una página cualquiera: `pages/proyecto-ofwayne.html` y `index.html` tienen el bloque `#agendaModal` idéntico.
3. Probar en navegador (desktop + mobile) y cerrar la verificación manual (ver [Verificación](#verificación)).
4. Publicar: stage **solo los 16 archivos trackeados**, commit convencional, push (ver [Publicar](#publicar)).
5. Si algo falla en producción: rollback con `git restore` (ver [Rollback](#rollback)).

## Reglas UX confirmadas (cerradas, no negociables)

| Regla | Implementación |
|-------|----------------|
| **Dismiss al clicar fuera** | Backdrop `.agenda-modal-backdrop` lleva `data-close-agenda`; el handler cierra si el click cae en el overlay o en un `[data-close-agenda]` (`script.js`). |
| **Dismiss con scroll en móvil** | Listener `touchmove` pasivo: si `|deltaY| > 8px` mientras el modal está abierto, se cierra. Nunca bloquea el scroll del sitio. |
| **Sin cierre forzado/intrusivo** | No existe timer de auto-cierre. El modal se **abre** con delay de 1.8s (para no interrumpir el primer render) pero **solo se cierra por acción del usuario**: click afuera, botón ✕, tecla Escape, scroll móvil, o al tocar el CTA. |
| Muestra 1 vez por sesión | Guard `sessionStorage["agendaModalSeen"]="1"` al cerrar; se respeta en todas las páginas hasta cerrar la pestaña. |
| Accesibilidad | `role="dialog"` + `aria-modal="true"` + `aria-label`; al abrir mueve el foco al CTA/botón; al cerrar restaura el foco al elemento previo guardado en la variable de closure `agendaPrevFocusEl` (no usa `dataset.prevFocus`). |

## Copy del modal (nuevo requerimiento)

En las **13 páginas** el `#agendaModal` usa copy en español neutro (sin voseo):

- `p.eyebrow` = exactamente **"Primera reunión gratis"** (se mantiene).
- `p.agenda-modal-desc` = exactamente **"Elige el día y horario que más te convenga para una primera reunión."**

Ambos son cambios de una sola línea, sin tocar estructura del modal ni CSS.

## Archivos modificados (working tree)

| Archivo | Cambio | Líneas |
|---------|--------|--------|
| `assets/css/styles.css` | Bloque `.agenda-modal-*` (overlay, backdrop, modal, close, cta con brackets reutilizados) insertado antes de `.form-submit` | +143 |
| `assets/js/script.js` | Bloque "Agenda Modal" al inicio del handler `DOMContentLoaded`, antes de "Resto del código" | +98, −6 |
| `index.html` | Markup modal antes de `</body>` | +19 |
| `pages/elizabeth.html` | Ídem (script relativo `../assets/js/script.js`) | +19 |
| `pages/equipo-elizabeth-contreras.html` | Ídem | +19 |
| `pages/gmail-config.html` | Ídem | +19 |
| `pages/proyecto-carlos-hernandez.html` | Ídem | +19 |
| `pages/proyecto-casa-campo.html` | Ídem | +19 |
| `pages/proyecto-diseno-inspeccion.html` | Ídem | +19 |
| `pages/proyecto-estacion-central.html` | Ídem | +19 |
| `pages/proyecto-ito-mapocho.html` | Ídem | +19 |
| `pages/proyecto-la-florida.html` | Ídem | +19 |
| `pages/proyecto-ofwayne.html` | Ídem | +19 |
| `pages/proyecto-residencia.html` | Ídem | +19 |
| `pages/proyecto-torre.html` | Ídem | +19 |
| `.gitignore` | Línea 19: protege el JPG untracked de OfWayne | +3 |

Las 13 páginas HTML llevan el **mismo bloque de 19 líneas** (`#agendaModal`). `pages/form.php` queda SIN modal (no es página pública renderizada).

## Comportamiento de la implementación

1. Al `DOMContentLoaded`, si existe `#agendaModal` y la sesión no lo vio (`sessionStorage !== "1"`), agenda la apertura en **1800 ms**.
2. Al abrir: guarda el `activeElement` previo en la closure `agendaPrevFocusEl`, `aria-hidden="false"`, foco al `.agenda-cta`.
3. Cierre (cualquier vía): setea `sessionStorage` a `"1"`, `aria-hidden="true"`, restaura el foco desde `agendaPrevFocusEl`, luego lo limpia (null).
4. El CTA interior apunta a Calendly con `target="_blank"` / `rel="noopener noreferrer"` y **cierra el modal** al hacer click.
5. Si `#agendaModal` no existe en una página, el bloque JS se omite sin errores (`if (agendaModal)`).

## Verificación

- [x] Revisión de código: reglas UX confirmadas contra `script.js`/`styles.css` (fuente).
- [x] Plantilla idéntica en los 13 HTML (diff +19 c/u, sin diferencias).
- [x] Copy `Primera reunión gratis` presente en el eyebrow de los 13 `#agendaModal` (grep verificado).
- [x] Copy neutro exacto en `p.agenda-modal-desc` de los 13 `#agendaModal` (grep + comparación de bloques).
- [x] No rompe páginas sin modal: guard `if (agendaModal)`.
- [ ] **PENDIENTE — prueba manual en navegador** (desktop y móvil): apertura única por sesión, cierre afuera / ✕ / Escape / scroll móvil.
- [ ] **PENDIENTE — verificación en producción** tras el push.

## Estado Git actual

- Branch: `main`, sincronizado con `origin/main` en `102c20e` (`fix(copy): reemplazar desafío por encargo en proyectos`).
- Sin stashes, sin rebase/merge en curso, HEAD no detached.
- Working tree: **16 archivos modificados (+491, −6)** descritos arriba (`git diff --shortstat`).
- `Recursos/Proyectos/Viviendas/OfWayne/Sin título.jpg` sigue **untracked** pero ahora está **cubierto por `.gitignore` (línea 19)** → `git add -A` / `git add .` ya NO lo stagean (verificado con `git check-ignore`).
- Remotes: `origin` → `github.com/ColiflorFU/CM` (credencial PAT embebida en la URL remota; no copiar la URL completa en logs/docs).
- Sin CI/deploy config detectado (no hay `.github/`, `netlify.toml`, `vercel.json`, `CNAME`) → publicación vía push a `main` y verificación manual en el entorno de despliegue.

## Publicar

```bash
cd "Documents/proyectos-github/CM"

# 1. Staging de los 16 archivos del trabajo (el jpg ya está ignorado por .gitignore)
git add index.html pages assets/css/styles.css assets/js/script.js .gitignore

# 2. Commit convencional (sin Co-Authored-By)
git commit -m "feat(client): modal de agenda Calendly no intrusivo en todas las páginas"

# 3. Push a main
git push origin main

# 4. Verificar en el entorno de despliegue (desktop + móvil)
```

## Rollback

Los cambios están **solo en working tree** (todavía no hay commit): restaure los 16 archivos desde HEAD.

```bash
git restore index.html pages assets/css/styles.css assets/js/script.js
```

Si ya se commiteó y pusheó: `git revert <sha>` (o `git reset --hard <sha-previо>` solo si nadie más ve `main`). El jpg (ignorado por `.gitignore`) no se ve afectado por ninguno de estos pasos.

## Exclusiones preservadas (no tocar / no modificado)

Basado en `docs/SECCIONES-PROTEGIDAS.md` — fuente de verdad:

- **Ninguna sección protegida fue modificada** en este trabajo: footer `.site-footer`, botón brackets `.cta-btn`, `form.php`, studio, services, banner CTA, portfolio grid, process, navbar.
- Logos/favicon/imágenes de marca: sin cambios.
- **No se bumpó versión** (`VERSION` sigue en `2.3.8`); `REGISTRO-CAMBIOS.md` no se actualizó (requiere OK explícito de Patrick).
- `Recursos/Proyectos/Viviendas/OfWayne/Sin título.jpg`: **excluido deliberadamente** de cualquier stage.
- `pages/form.php`: fuera de alcance (sin modal).
- El popup **no** agrega timers de cierre forzoso ni bloquea scroll del sitio (regla de "no intrusivo").

## Siguiente paso

1. Prueba manual en navegador (punto pendiente de [Verificación](#verificación)).
2. A la aprobación de Patrick → pasos de [Publicar](#publicar).
3. Registrar entrada en `REGISTRO-CAMBIOS.md` + bump de `VERSION` como parte del commit (flujo canónico del repo).