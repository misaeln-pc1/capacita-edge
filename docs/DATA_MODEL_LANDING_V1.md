# Data Model Landing v1

## Objetivo

Definir el contrato conceptual de datos para landings HTML estáticas de cursos Capacita.

Este modelo proviene del rescate selectivo de la rama Astro, pero queda expresado como JSON estático y documentación, no como TypeScript ni componentes.

## Estructura raíz

```json
{
  "schemaVersion": 1,
  "landingKey": "excel-presencial",
  "publishedAt": "2026-04-01T00:00:00-03:00",
  "seo": {},
  "identity": {},
  "hero": {},
  "mainForm": {},
  "quickFacts": {},
  "outcomes": {},
  "courseFit": {},
  "schedules": [],
  "infrastructure": {},
  "benefits": {},
  "syllabus": {},
  "paymentOptions": {},
  "testimonials": {},
  "clients": {},
  "faqs": {},
  "location": {},
  "seals": {},
  "schema": {}
}
```

## Campos principales

### `seo`

```json
{
  "title": "Curso de Excel Presencial en Santiago | Capacita.cl",
  "description": "Capacitación práctica presencial en Santiago Centro.",
  "canonical": "https://capacita.cl/curso-de-excel-presencial-en-santiago/"
}
```

### `identity`

```json
{
  "courseTitle": "Curso de Excel Presencial",
  "courseShortName": "Excel Presencial",
  "modality": "Presencial",
  "duration": "16 horas",
  "location": "Santiago Centro",
  "landingCode": "EXCEL_PRESENCIAL_EDGE"
}
```

### `mainForm`

```json
{
  "action": "/api/forms/lead",
  "landingFuente": "excel-presencial",
  "cursoInteresado": "Excel Presencial",
  "tipoModalidad": "Presencial",
  "landingCode": "EXCEL_PRESENCIAL_EDGE",
  "turnstileSiteKey": "PUBLIC_SITEKEY_PLACEHOLDER",
  "startLabel": "Próximo inicio",
  "startText": "Cupos limitados. Solicita el programa aquí.",
  "submitText": "Solicitar información"
}
```

### `schedules`

```json
[
  {
    "slotKey": "pm-lun-mie",
    "slotLabel": "Jornada Tarde",
    "days": "Lunes y Miércoles",
    "time": "19:30 a 22:10 hrs",
    "start": "2026-04-06",
    "startLabel": "Lunes 6 de abril",
    "seats": 8,
    "price": 112000,
    "priceLabel": "$112.000",
    "installmentsLabel": "2 cuotas de $56.000",
    "sortOrder": 1
  }
]
```

## Criterios de modelado

- Usar camelCase en JSON.
- No usar imports.
- No guardar secrets.
- No guardar datos personales reales de leads.
- Imágenes deben ser URLs públicas o placeholders claros.
- Fechas internas deben usar formato ISO cuando sean procesables.
- Textos comerciales pueden quedar en español final si ya están aprobados.

## Relación con bloques

Cada bloque debe poder alimentarse conceptualmente desde una sección del JSON:

| JSON | Bloque |
|---|---|
| `hero` + `mainForm` | `hero-lead-form.html` |
| `quickFacts` | `quick-facts.html` |
| `outcomes` | `outcomes.html` |
| `courseFit` | `course-fit.html` |
| `schedules` | `schedule-selector.html` |
| `infrastructure` | `infrastructure-gallery.html` |
| `benefits` | `benefits-grid.html` |
| `syllabus` | `syllabus-section.html` |
| `paymentOptions` | `payment-options.html` |
| `testimonials` | `testimonials-section.html` |
| `clients` | `clients-wall.html` |
| `faqs` | `faq-section.html` |
| `location` | `location-section.html` |
| `seals` | `quality-seals.html` |

## Backlog

- JSON Schema formal.
- Validador CLI.
- Ensamblador estático.
- Mapeo automático JSON → placeholders.
- Pruebas de consistencia canonical/schema/sitemap.
