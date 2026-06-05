# Tracking and UTM

## Tracking principal

### Google Tag Manager
- `GTM-52J4PSR` está presente en todas las landings.
- Se utiliza `window.dataLayer.push` con:
  - `event: 'page_init'`
  - `product_id` específico por landing
  - `platform: 'html_static'`
  - `deployment_mode: 'edge_worker'`

### Zoho PageSense
- Se carga `https://cdn.pagesense.io/js/capacita736/ed6f668371e945378c1de1b2a26c9a89.js`
- Presente en todas las landings.

### Cloudflare Turnstile
- Cargado en landings con formularios corporativos (`landing-empresas*`, `landing-powerbi...`).
- Token de sitekey se usa en el frontend, la verificación server-side ocurre en `functions/api/forms/lead.js`.

## UTM y campos de attribution

### Campos usados
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `utm_id`
- `gclid`
- `gbraid`
- `wbraid`
- `fbclid`
- `msclkid`
- `li_fat_id`
- `ttclid`

### Flujo de captura
1. El usuario llega con query params en la URL.
2. JavaScript en la landing inyecta valores en inputs hidden.
3. El formulario se envía a Zoho o al endpoint `/api/forms/lead`.
4. El Worker de Forms puede normalizar `Website` y `Website1`.

## Eventos adicionales

- Las landings de Power BI y B2B capturan eventos de formulario bloqueado si Turnstile / honeypot falla.
- El script del formulario envía eventos `lead_form_submit_blocked` según condiciones de validación.

## Recomendaciones

- Confirmar que todos los campos UTM sean consistentes entre landings.
- Documentar los valores esperados para `utm_id`, `gclid`, `fbclid`, `ttclid`, etc.
- Validar que `landing_url` se construye sin parámetros sensibles cuando se reenvía a Zoho.
