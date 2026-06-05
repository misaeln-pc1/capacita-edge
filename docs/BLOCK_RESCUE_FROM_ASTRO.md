# Rescate selectivo desde rama Astro

## Rama fuente

`feat/cloudflare-lead-proxy` se usa solo como referencia conceptual. No se debe mergear ni copiar su runtime.

GitHub reportó que `main` y `feat/cloudflare-lead-proxy` no tienen ancestro común al intentar comparar ambas referencias. Por eso el rescate debe ser manual, selectivo y reescrito como HTML estático.

## Archivos revisados en la rama antigua

- `src/templates/CourseLandingTemplate.astro`
- `src/components/sections/HeroLeadForm.astro`
- `src/components/forms/MainZohoLeadForm.astro`
- `src/components/scripts/TrackingHydrationScript.astro`
- `src/data/excel-presencial.ts`
- `src/data/excel-presencial-config.ts`
- `src/types/course.ts`

## Patrones rescatables

### 1. Orden de bloques de landing

La plantilla antigua define una composición reusable:

1. Hero con formulario principal.
2. Ficha rápida.
3. Resultados esperados.
4. Perfil recomendado.
5. Selector de horarios.
6. Infraestructura.
7. Beneficios.
8. Temario.
9. Opciones de pago.
10. Testimonios.
11. Clientes.
12. Preguntas frecuentes.
13. Ubicación.
14. Sellos de calidad.
15. Footer legal.
16. Script de tracking.

Este orden sí se rescata como criterio editorial y técnico.

### 2. Formulario principal

Se rescata el enfoque de formulario compacto con:

- Campos visibles: nombre, email, WhatsApp, dudas.
- Campos ocultos para UTM, click IDs, landing, curso, dispositivo, fecha y tiempo en página.
- Honeypot `hp_field`.
- Turnstile con sitekey pública.
- Acción obligatoria: `/api/forms/lead`.

No se rescata dependencia Zoho Forms directa ni lógica Astro.

### 3. Tracking de atribución

Se rescata la hidratación estática de:

- `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `utm_id`.
- `gclid`, `gbraid`, `wbraid`, `fbclid`, `msclkid`, `li_fat_id`, `ttclid`.
- `client_id`, `session_id`, `lead_event_id`.
- `landing_url`, `referente`, `dispositivo`, `user_agent`, `page_title`, `user_language`, `timezone`, `tiempo_pagina`.

No se rescata la dependencia obligatoria a servicios externos de geolocalización. Eso queda como backlog por privacidad, performance y resiliencia.

### 4. Modelo de datos

Se rescata el modelo conceptual de landing:

- `seo`
- `hero`
- `mainForm`
- `quickFacts`
- `outcomes`
- `courseFit`
- `schedules`
- `infrastructure`
- `benefits`
- `syllabus`
- `paymentOptions`
- `testimonials`
- `clients`
- `faqs`
- `location`
- `seals`
- `schema`

Se convierte de TypeScript/Astro a JSON estático documentado.

## Elementos NO rescatados

- `package.json` de Astro.
- `astro.config.mjs`.
- Imports de assets desde `src/`.
- Componentes `.astro`.
- Debug banners.
- Hydration Astro.
- Nuevas rutas públicas.
- Deploy.
- Cambios en Cloudflare, Workers o Functions productivas.

## Riesgos controlados

- La rama antigua contiene patrones útiles, pero su arquitectura no es compatible con el objetivo HTML estático.
- Copiar componentes directamente introduciría sintaxis Astro y dependencia de build.
- Copiar datos con imports de imágenes rompería el enfoque estático; por eso se reemplaza por URLs o placeholders explícitos.

## Decisión

Aprobado rescate conceptual, no rescate literal. La biblioteca v1 debe ser HTML estático, documentada, reusable y sin runtime de framework.
