# Reglas de ensamblaje — bloques HTML estáticos

## Alcance

Estas reglas aplican a landings estáticas construidas a partir de fragments HTML ubicados en `blocks/`.

## Reglas obligatorias

1. No usar Astro, JSX, TypeScript ni frameworks.
2. No crear carpeta `src/`.
3. No crear `package.json` ni `astro.config.mjs`.
4. No tocar Cloudflare, Workers, DNS ni Functions productivas.
5. No publicar rutas nuevas sin autorización expresa.
6. No hacer deploy manual desde esta rama.
7. No incluir secrets, tokens, cookies, emails reales de leads, IPs, claves privadas ni Turnstile secret key.

## Orden recomendado de ensamblaje

1. `hero-lead-form.html`
2. `quick-facts.html`
3. `outcomes.html`
4. `course-fit.html`
5. `schedule-selector.html`
6. `infrastructure-gallery.html`
7. `benefits-grid.html`
8. `syllabus-section.html`
9. `payment-options.html`
10. `testimonials-section.html`
11. `clients-wall.html`
12. `faq-section.html`
13. `location-section.html`
14. `quality-seals.html`
15. `legal-footer.html`

## Placeholders

Los bloques pueden usar placeholders explícitos en mayúsculas:

- `{{LANDING_KEY}}`
- `{{COURSE_TITLE}}`
- `{{COURSE_MODALITY}}`
- `{{LANDING_CODE}}`
- `{{PUBLIC_TURNSTILE_SITEKEY}}`
- `{{START_LABEL}}`
- `{{START_TEXT}}`

No deben usarse placeholders ambiguos como `xxx`, `test`, `demo`, `lorem` o valores falsos que puedan quedar publicados.

## Formularios

Todo formulario de lead debe cumplir:

```html
<form id="zoho-native-form" action="/api/forms/lead" method="POST" accept-charset="UTF-8">
```

Honeypot obligatorio:

```html
<div class="cp-hp" aria-hidden="true">
  <label for="hp_field">No llenar</label>
  <input id="hp_field" type="text" name="hp_field" value="" tabindex="-1" autocomplete="off">
</div>
```

## Turnstile

Permitido:

```html
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
<div class="cf-turnstile" data-sitekey="{{PUBLIC_TURNSTILE_SITEKEY}}" data-theme="light"></div>
```

Prohibido:

- Secret key.
- Comentarios con credenciales.
- Variables privadas en HTML.

## Tracking

Cada landing que use formulario debe cargar:

```html
<script src="/assets/js/tracking-hydration.js" defer></script>
```

El script debe ser tolerante a ausencia de campos. Si un bloque no incluye formulario, no debe romper.

## SEO y schema

Una landing final debe mantener consistencia entre:

- `title`
- `meta description`
- canonical
- H1
- schema Course/Product/Event, si aplica
- sitemap
- ruta pública

Esta rama no publica rutas nuevas; solo define bloques y reglas.

## Validación mínima antes de auditoría

Ejecutar:

```bash
git status --short --branch
git diff --stat
```

Confirmar manualmente:

- Solo cambios en `docs/`, `blocks/`, `assets/js/` o `data/landings/`.
- No existe `package.json` nuevo.
- No existe `astro.config.mjs`.
- No existe `src/` nuevo.
- No se tocó Cloudflare.
- No se tocó Worker productivo.
- No se expusieron secrets.
