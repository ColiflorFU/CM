
## Flujo de trabajo multi-máquina

Para mantener el proyecto sincronizado entre varias máquinas:

### Configuración inicial (UNA SOLA VEZ por máquina)

`ash
git clone https://github.com/ColiflorFU/CM.git
git config --global credential.helper osxkeychain
# Al hacer pull/push, pegar el token cuando lo pida
# Queda guardado en el llavero de macOS
`

### Flujo diario

`ash
git pull                          # Traer cambios de la otra máquina
# ... trabajar, modificar archivos ...
git add .
git commit -m "v1.X — descripción del cambio"
git tag v1.X                      # ⬅️ IMPORTANTE: subir versión
git push                          # Subir código
git push origin v1.X              # ⬅️ Subir el tag
`

### Cómo versionar

1. El archivo **VERSION** en la raíz tiene el número actual (ej: 1.0)
2. **REGISTRO-CAMBIOS.md** tiene el historial con fechas y descripciones
3. Antes de cada push, aumentá el número:

   | Cambio | Ejemplo |
   |---|---|
   | Cambio chico (bugfix, texto) | 1.0 → 1.1 |
   | Cambio mediano (sección nueva) | 1.2 → 1.3 |
   | Rediseño grande | 2.0 |

4. Editás **VERSION**, ponés el nuevo número
5. Agregás una línea en **REGISTRO-CAMBIOS.md** en la tabla de cambios
6. Hacés commit + tag con ese mismo número

> ⚠️ **Regla de oro**: Siempre git pull antes de empezar. Si hay conflictos, resolverlos antes de commitear.

---

_Última actualización: 02-06-2026_

## v1.2 — 2026-06-02

Hotfix: márgenes mobile en páginas de proyecto.

| Fecha | Descripción |
|---|---|
| 02-06-2026 | **v1.2**: Fix márgenes mobile en `.proj-intro` y `.proj-body` de páginas proyecto. El breakpoint 760px pisaba el padding lateral a 0, dejando el contenido pegado al borde. Restaurado padding 24px lateral + bottom padding 80px en `.proj-body`. |

## v1.1 — 2026-06-02

Contenido real: plantilla de proyecto, hotfixes, footer unificado, cleanup.

| Fecha | Descripción |
|---|---|
| 02-06-2026 | **v1.1**: Plantilla `proyecto-ito-mapocho.html` con banner y tag `.eyebrow`. Hotfixes CSS (stray `}`, `--font-sans`, dead code eliminado). Footer unificado con redes reales y español. Mobile overlay responsive (hamburguesa + close-toggle). Nav flechas "Anterior"/"Siguiente". Gallery-break section eliminada. Backups movidos a `_backups/`. Formulario con PHPMailer + `composer.json`. `.env.example` creado. robots.txt + sitemap.xml SEO. |

## v1.0 — 2026-05-30

Versionado inicial del proyecto. Se adopta sistema de versionado (v{major}.{minor}).

| Fecha | Descripción |
|---|---|
| 30-05-2026 | **v1.0**: Versionado inicial — creación de VERSION, tag git, REGISTRO-CAMBIOS.md unificado |
