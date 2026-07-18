# Flujo de correo corporativo

Flujo operacional del email de EC Marquitectura: formulario de contacto → respuesta automática + lead interno → respuesta personal de Elizabeth.

## Direcciones y responsabilidades

| Dirección | Rol | Propietaria |
|-----------|-----|-------------|
| `contacto@ecmarquitectura.cl` | Buzón de automatización: envía acknowledge, recibe leads | Elizabeth |
| `elizabeth@ecmarquitectura.cl` | Buzón profesional personal. Elizabeth lo usa como UI principal vía Gmail | Elizabeth |

**No hay buzones adicionales.** No existen aliases ni forwarders configurados.

## Flujo de mensajes

```
Visitante envía formulario
         │
         ├─► Trigger A: Auto-respuesta (contacto@ → visitante)
         │   Asunto: "Recibimos tu mensaje - Contreras Martinez"
         │   Contenido: agradecimiento + indicación de plazo de respuesta
         │   Reply-To: elizabeth@ecmarquitectura.cl (el visitante responde a Elizabeth)
         │
         └─► Trigger B: Lead interno (contacto@ → Elizabeth)
              Asunto: "Nuevo lead - {nombre} - {tipo de proyecto}"
              Contenido: datos del formulario (nombre, email, teléfono, mensaje)
              Reply-To: correo del visitante (Elizabeth responde directamente al visitante)
                    │
                    ▼
              Elizabeth recibe en Gmail (inbox elizabeth@)
              Responde desde Gmail → From: elizabeth@ecmarquitectura.cl
              Visitante recibe respuesta personal y corporativa
```

### Categorización en Gmail

Elizabeth aplica un filtro/label en Gmail para identificar leads del formulario web (ej: label "Lead Web" basado en asunto o remitente `contacto@`).

## Estado actual vs pendiente

| Componente | Estado |
|------------|--------|
| `form.php` con SMTP nativo (ZNet) | ✅ Completado |
| Auto-respuesta (Trigger A) | ✅ Funciona — texto del plazo por aprobar |
| Lead interno (Trigger B) | ✅ Funciona |
| `smtp-config.php` fuera de `public_html` | ✅ Completado |
| Cuenta `contacto@ecmarquitectura.cl` (ZNet) | ✅ Verificar en hosting |
| Cuenta `elizabeth@ecmarquitectura.cl` (ZNet) | ✅ Creada |
| Gmail — "Send mail as" para `elizabeth@` via ZNet SMTP | 🔲 Pendiente |
| Gmail — Filtro/label para leads web | 🔲 Pendiente |
| Texto auto-respuesta — aprobar plazo de respuesta | 🔲 Pendiente |

## Configuración pendiente

### Gmail: "Send mail as" (elizabeth@ via ZNet SMTP)

Elizabeth configura en Gmail → Configuración → Cuentas → "Enviar correo como":

1. Nombre: `Elizabeth Contreras`
2. Email: `elizabeth@ecmarquitectura.cl`
3. SMTP Server: datos de ZNet (puerto 587, TLS)
4. Credenciales: mismas de la cuenta ZNet `elizabeth@ecmarquitectura.cl`
5. Verificar vía email de confirmación

Esto permite que Elizabeth responda desde Gmail y el "From" sea `elizabeth@ecmarquitectura.cl`.

### Gmail: Filtro de leads web

Crear filtro en Gmail:
- Condición: remitente es `contacto@ecmarquitectura.cl`
- Acción: aplicar label "Lead Web", archivar (no entrar a inbox principal)

### Texto auto-respuesta — aprobación requerida

El texto actual dice:

> *"Recibimos tu consulta y te responderemos pronto."*

**Pendiente de aprobación:** definir si se agrega un plazo específico (ej: "en 24 horas hábiles", "en los próximos 2 días"). No hardcodear sin OK de Elizabeth.

## Seguridad

| Regla | Detalle |
|-------|---------|
| `smtp-config.php` | Vive fuera de `public_html`, en directorio padre. Nunca en Git |
| `.gitignore` | Excluye `smtp-config.php`, `.env`, `.env.local` |
| `smtp-config.example.php` | Template sin credenciales, seguro para repo |
| No secretos en docs | Ningún password, token, o dirección personal aparece en documentación |

**Ruta SSH/ZNet:**
```
/home/sites/42a/f/f4da23c179/smtp-config.php   ← fuera de public_html
/home/sites/42a/f/f4da23c179/public_html/       ← sitio web
```

## Checklist de implementación

### Completado
- [x] `form.php` reescrito con SMTP nativo (sin dependencias externas)
- [x] Lead interno: envía a Elizabeth con Reply-To visitante
- [x] Auto-respuesta: envía al visitante con Reply-To Elizabeth
- [x] `smtp-config.php` fuera de `public_html`
- [x] `.gitignore` excluye configuración sensible
- [x] Cuenta `elizabeth@ecmarquitectura.cl` creada en ZNet

### Pendiente
- [ ] Verificar que `contacto@ecmarquitectura.cl` exista en ZNet (o crearla)
- [ ] Configurar Gmail "Send mail as" para `elizabeth@ecmarquitectura.cl`
- [ ] Crear filtro/label "Lead Web" en Gmail
- [ ] Aprobar texto de auto-respuesta (¿agregar plazo específico?)
- [ ] Probar flujo completo en hosting: formulario → ambos emails → respuesta Elizabeth
- [ ] Verificar que emails no caigan en spam (SPF/DKIM en ZNet)
