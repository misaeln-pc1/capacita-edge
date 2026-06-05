# Landings Backlog

## Objetivo

Mantener una lista de landings planeadas, en desarrollo y referencias de contenido para el sistema HTML_ESTATICO.

## Landings existentes

- `landing-empresas.html`
- `landing-empresas-excel.html`
- `landing-excel12-elearning.html`
- `landing-excel12-presencial.html`
- `landing-powerbi12-elearning.html`

## Posibles landings futuras

- `landing-powerbi12-presencial.html`
- `landing-analytics-empresas.html`
- `landing-office-365.html`
- `landing-business-intelligence.html`

## Observaciones actuales

- Las landings empresariales con `landing-empresas*` usan el Forms worker proxy.
- Los cursos de “Excel 12” y “Power BI 12” apuntan a flujos Zoho directos.
- Requieren un bloque estándar de hero, formulario, syllabus y FAQ.

## Checklist de creación de una nueva landing

- [ ] Definir `landing_code` y `landing_url`
- [ ] Incluir `<link rel="canonical">`
- [ ] Agregar GTM y PageSense
- [ ] Agregar formulario con campos ocultos de UTM, dispositivo y user agent
- [ ] Confirmar action del formulario (Zoho directo o `/api/forms/lead`)
- [ ] Documentar bloque en `BLOCK_LIBRARY.md`
- [ ] Revisar compatibilidad con Worker y sitemap
