# Form Flow Architecture

## Objetivo del flujo

Documentar la arquitectura segura y recomendada para envío de formularios de captación de leads en HTML_ESTATICO.

## Flujo seguro recomendado

```
Landing HTML (formulario con Turnstile)
         ↓
Envío POST a: /api/forms/lead
         ↓
Cloudflare Pages Function (functions/api/forms/lead.js)
         ├─ 1. Validar honeypot (hp_field vacío)
         ├─ 2. Validar token Turnstile presente
         ├─ 3. Validar servidor Turnstile (POST a challenges.cloudflare.com)
         ├─ 4. Si Turnstile OK, normalizar URLs
         ├─ 5. Establecer zf_referrer_name y zf_redirect_url
         ├─ 6. Remover campos internos (Turnstile, honeypot)
         └─ 7. Relay FormData a ZOHO_LEAD_FORM_URL
         ↓
Zoho Forms (recibe formulario validado)
         ↓
Redirect final: landing_url?lead=ok#registro
```

## Función actual: functions/api/forms/lead.js

### Ubicación
- Ruta: `functions/api/forms/lead.js`
- Método: POST
- Entrada: FormData multipart/form-data
- Salida: 303 Redirect (éxito) o JSON error (fallo)

### Validaciones que ejecuta

1. **Honeypot check**: Si `hp_field` tiene valor, retorna 403
2. **Turnstile token**: Si `cf-turnstile-response` está ausente, retorna 400
3. **Turnstile verification**: POST a `https://challenges.cloudflare.com/turnstile/v0/siteverify` con:
   - `secret`: desde `context.env.TURNSTILE_SECRET`
   - `response`: token del formulario
   - `remoteip`: desde `CF-Connecting-IP`
4. **URL normalization**: convierte `Website` y `Website1` a URLs válidas o fallback `https://capacita.cl`
5. **URL injection**: establece `zf_referrer_name` y `zf_redirect_url` para Zoho

### Errores posibles

| Status | Error | Causa |
|--------|-------|-------|
| 403 | honeypot_filled | Bot detectado por honeypot |
| 400 | missing_turnstile_token | Token de Turnstile faltante |
| 403 | turnstile_failed | Verificación Turnstile rechazada |
| 502 | zoho_submit_failed | Zoho rechazó el formulario |

## Variables de entorno requeridas

### TURNSTILE_SECRET
- **Ámbito**: Pages Function runtime
- **Visibilidad**: ⚠️ NUNCA exponer en frontend
- **Uso**: Validación server-side en `functions/api/forms/lead.js`
- **Configuración**: Cloudflare Pages Variables (production y preview)

### ZOHO_LEAD_FORM_URL
- **Ámbito**: Pages Function runtime
- **Ejemplo**: `https://forms.zohopublic.com/capacita736/form/.../htmlRecords/submit`
- **Uso**: Destination URL para relay de formularios
- **Configuración**: Cloudflare Pages Variables (production y preview)

## Configuración en formulario HTML

### Sitekey pública de Turnstile
```html
<div class="cf-turnstile"
     data-sitekey="0x4AAAAAACyxbmmxJx_EtyEr"
     data-response-field-name="cf-turnstile-response"></div>
```
- **Visibilidad**: Pública, seguro exponerla en frontend
- **No cambiar**: Solo Cloudflare puede generar sitekeys validadas

### Honeypot (campo de trampa)
```html
<input type="text" name="hp_field" id="hp_field" tabindex="-1" autocomplete="off">
```
- Oculto a usuarios humanos (atributos de accesibilidad)
- Visible a bots simples
- Si se rellena, se rechaza el formulario

### Form action
```html
<form action="/api/forms/lead" method="POST">
```
- **Ruta**: `/api/forms/lead`
- **Método**: POST
- **Encoding**: multipart/form-data

## Flujo alternativo NO RECOMENDADO: Envío directo a Zoho

Algunas landings envían directamente a `https://forms.zohopublic.com/...` sin pasar por `/api/forms/lead`.

### Riesgos de envío directo a Zoho
- ❌ No valida Turnstile server-side
- ❌ El token Turnstile solo se verifica en cliente (fácil de bypasear)
- ❌ El honeypot se valida solo en cliente (fácil de bypasear)
- ❌ Sin normalización de URLs
- ❌ Sin control de runtime
- ❌ Más spameable

### Landings con envío directo a Zoho
- `landing-excel12-presencial.html`
- `landing-excel12-elearning.html`

**Recomendación**: Migrar estas landings a usar `/api/forms/lead`.

## Diferencias entre landings actuales

### Landings empresariales (SEGURAS)
| Propiedad | landing-empresas | landing-empresas-excel |
|-----------|------------------|----------------------|
| Action | `/api/forms/lead` | `/api/forms/lead` |
| Validación server-side | ✅ Sí | ✅ Sí |
| Turnstile | ✅ Real | ✅ Real |
| Honeypot | ✅ Sí | ✅ Sí |
| Riesgo | 🟢 Bajo | 🟢 Bajo |

### Landings de Excel (NO ESTÁNDAR)
| Propiedad | landing-excel12-presencial | landing-excel12-elearning |
|-----------|---------------------------|-------------------------|
| Action | Zoho directo | Zoho directo |
| Validación server-side | ❌ No | ❌ No |
| Turnstile | ❌ No | ❌ No |
| Honeypot | ❌ No | ❌ No |
| Riesgo | 🔴 Alto | 🔴 Alto |

### Landing Power BI (ROTA)
| Propiedad | landing-powerbi12-elearning |
|-----------|----------------------------|
| Action | REEMPLAZAR_ACTION_ZOHO_O_WORKER |
| Validación server-side | ❌ Placeholders |
| Turnstile | REEMPLAZAR_SITEKEY_TURNSTILE |
| Honeypot | Sí, pero placeholders |
| Riesgo | 🔴 Rota |

## Recomendación

**Estandarizar todas las landings a usar `/api/forms/lead` con Turnstile real y honeypot.**

Ventajas:
- Validación server-side consistente
- Protección anti-bot efectiva
- Normalización de datos
- Auditoría centralizada
- Mantenimiento simplificado
