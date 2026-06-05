# Block Library v1 — Especificación

## Objetivo

Definir una biblioteca inicial de bloques HTML estáticos para landings de cursos Capacita, reusable sin Astro, sin framework y sin build obligatorio.

## Principios

1. Cada bloque debe funcionar como fragmento HTML autocontenido.
2. No debe usar sintaxis Astro, JSX, TypeScript ni imports.
3. No debe depender de rutas `src/`.
4. No debe publicar nuevas rutas por sí mismo.
5. Formularios deben enviar a `/api/forms/lead`.
6. La secret key de Turnstile nunca debe aparecer en HTML.
7. Los datos dinámicos se documentan como placeholders o JSON sample, no como implementación runtime v1.

## Bloques v1

| Bloque | Archivo sugerido | Rol |
|---|---|---|
| Hero + formulario | `blocks/hero-lead-form.html` | Captura principal de lead y propuesta de valor |
| Ficha rápida | `blocks/quick-facts.html` | Modalidad, duración, valor, sede, condiciones |
| Resultados | `blocks/outcomes.html` | Qué logra el alumno al finalizar |
| Perfil recomendado | `blocks/course-fit.html` | Para quién es/no es el curso |
| Horarios | `blocks/schedule-selector.html` | Jornadas, fechas, cupos y CTA |
| Infraestructura | `blocks/infrastructure-gallery.html` | Sala, equipos, sede y fotos |
| Beneficios | `blocks/benefits-grid.html` | Diferenciales comerciales y materiales |
| Temario | `blocks/syllabus-section.html` | Módulos y contenidos |
| Pagos | `blocks/payment-options.html` | Contado, tarjeta, empresa/SENCE |
| Testimonios | `blocks/testimonials-section.html` | Prueba social de alumnos |
| Clientes | `blocks/clients-wall.html` | Logos o nombres de organizaciones |
| FAQ | `blocks/faq-section.html` | Objeciones frecuentes |
| Ubicación | `blocks/location-section.html` | Dirección, mapa y fotos |
| Sellos | `blocks/quality-seals.html` | Calidad, certificación y respaldo |
| Footer legal | `blocks/legal-footer.html` | Notas legales y contacto mínimo |

## Convención de clases

- Prefijo recomendado: `cp-`.
- Evitar clases acopladas a `v18` en nuevos bloques, salvo cuando se rescate temporalmente un patrón visual probado.
- Usar atributos `data-block`, `data-landing-key` y `data-course-code` cuando ayuden a trazabilidad.

## Contrato mínimo del formulario

El formulario principal debe incluir:

```html
<form id="zoho-native-form" action="/api/forms/lead" method="POST">
  <input type="hidden" name="hp_field" id="hp_field" value="">
</form>
```

Campos visibles mínimos:

- `lead_name`
- `lead_email`
- `lead_phone`
- `lead_notes`

Campos ocultos mínimos:

- UTM: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `utm_id`.
- Click IDs: `gclid`, `gbraid`, `wbraid`, `fbclid`, `msclkid`, `li_fat_id`, `ttclid`.
- Tracking: `client_id`, `session_id`, `lead_event_id`, `landing_url`, `referente`, `dispositivo`, `user_agent`, `page_title`, `user_language`, `timezone`, `tiempo_pagina`.
- Landing: `landing_fuente`, `curso_interesado`, `tipo_modalidad`, `landing_code`.

## Turnstile

Permitido en HTML:

```html
<div class="cf-turnstile" data-sitekey="PUBLIC_SITEKEY_PLACEHOLDER"></div>
```

Prohibido en HTML:

- Secret key.
- Tokens privados.
- Variables `.env` reales.
- Comentarios con claves o valores productivos sensibles.

## Tracking

El JS estático permitido vive en:

`assets/js/tracking-hydration.js`

Debe:

- Hidratar campos si existen.
- No fallar si un campo no existe.
- Calcular `tiempo_pagina` al enviar.
- No depender de Astro.
- No bloquear el submit.

## Backlog post-14

- Motor de ensamblaje desde JSON.
- Reemplazo automático de placeholders.
- Validador de schema JSON.
- Generador de landings por curso.
- Integración visual con tokens CSS globales.
- Test automatizado de formularios contra Worker staging.
