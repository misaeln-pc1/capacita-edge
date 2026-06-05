# HTML_ESTATICO Landing Variables

## Variables ocultas comunes

Las landings existentes usan campos ocultos para tracking, funnel y CRM.

### Campos UTM y tracking
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

### Campos landing / referrer
- `landing_code` / `landing_code` (código de landing)
- `Website` / `landing_url` (URL de la landing)
- `Website1` / `referente` (referrer / fuente)
- `SingleLine19` / `dispositivo` (dispositivo detectado)
- `SingleLine20` / `user_agent` (user agent)
- `SingleLine21` / `page_title` (título de página)
- `SingleLine22` / `user_language` (idioma del navegador)

### Campos analíticos avanzados
- `SingleLine26` / `ciudad_user`
- `SingleLine27` / `pais_user`
- `SingleLine28` / `timezone`
- `SingleLine29` / `tiempo_pagina`
- `DateTime_date`
- `DateTime_hours`
- `DateTime_minutes`
- `DateTime_meridiem`

### Campos de integración Zoho
- `zf_referrer_name`
- `zf_redirect_url`
- `zc_gad`

### Campos de captura de formulario
- `SingleLine` (nombre)
- `Email`
- `PhoneNumber_countrycode`
- `MultiLine` (mensaje)
- `hp_field` (honeypot)
- `cf-turnstile-response` (Turnstile token)

## Observaciones

- En las landings `landing-empresas.html` y `landing-empresas-excel.html` el form action es `/api/forms/lead`.
- En `landing-powerbi12-elearning.html` hay un placeholder `REEMPLAZAR_ACTION_ZOHO_O_WORKER`.
- En `landing-excel12-presencial.html` y `landing-excel12-elearning.html` se usa Zoho directo a `forms.zohopublic.com`.
- Los valores de UTM se inyectan desde JavaScript a través de URLSearchParams.

## Recomendación de estructura futura

- Normalizar `landing_code` y `landing_url` en todos los templates.
- Centralizar los hidden fields en un bloque reutilizable.
- Documentar la correspondencia exacta de cada `SingleLineXX` con campos de Zoho.
