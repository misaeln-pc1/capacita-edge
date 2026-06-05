# Forms and Integrations

## Overview

HTML_ESTATICO usa formularios de captación integrados con Zoho y validación anti-bot Cloudflare Turnstile.

## Form Flow

### 1. Captura en la landing
- El formulario recoge datos del usuario y campos ocultos de seguimiento.
- Los campos visibles típicos son: `Nombre`, `Email`, `Teléfono`, `Mensaje`.
- Los campos ocultos incluyen UTM, referrer, user agent y dispositivo.

### 2. Envío
- En `landing-empresas.html` y `landing-empresas-excel.html` el action es `/api/forms/lead`.
- En otras landings puede enviarse directamente a `forms.zohopublic.com`.

### 3. Validación anti-bot
- El token de Turnstile se genera en frontend y se envía como `cf-turnstile-response`.
- El servidor Pages Function `functions/api/forms/lead.js` verifica el token con:
  - `https://challenges.cloudflare.com/turnstile/v0/siteverify`
  - `secret` desde `context.env.TURNSTILE_SECRET`
  - `response` del formulario
  - `remoteip` desde `CF-Connecting-IP`

### 4. Honeypot
- Se usa un campo oculto `hp_field` para detectar bots.
- Si `hp_field` contiene un valor, la función retorna 403.

## Zoho Relay

- Tras validar Turnstile, el endpoint normaliza URLs:
  - `Website`
  - `Website1`
- Establece campos obligatorios para Zoho:
  - `zf_referrer_name`
  - `zf_redirect_url`
- El formData se reenvía al URL de Zoho desde `context.env.ZOHO_LEAD_FORM_URL`.
- Si Zoho responde con error, la función devuelve 502 con el cuerpo de Zoho.

## Final Redirect

- Cuando el envío es exitoso, el usuario se redirige a la URL normalizada de la landing.
- Se añade `?lead=ok` y `#registro` al fragmento.

## Campos internos y normalización

- El endpoint elimina `cf-turnstile-response` y `hp_field` antes del relay.
- Normaliza `Website` y `Website1` usando `URL` para evitar redirecciones mal formadas.
- Si la URL es inválida, usa `https://capacita.cl` como fallback.

## Recomendaciones

- Mantener las URLs de Zoho y Turnstile como variables de entorno en Pages.
- No exponer `TURNSTILE_SECRET` en el frontend.
- Revisar que todos los campos `SingleLineXX` coincidan con los campos Zoho esperados.
- Documentar el mapeo entre inputs HTML y campos Zoho para cada landing.
