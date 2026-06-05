# HTML_ESTATICO Project Context

## Propósito

HTML_ESTATICO es un sistema de landings HTML estáticas que se sirven a través de un Worker Cloudflare (`capacita-edge-router`) para el dominio `capacita.cl`.

## Arquitectura principal

- `capacita.cl/*` está interceptado por el Worker `capacita-edge-router`.
- El Worker reescribe y proxy regula rutas específicas hacia `https://capacita-edge.pages.dev`.
- Rutas no capturadas por el Worker se envían al origen original de `capacita.cl` (probablemente WordPress).
- El repositorio `misaeln-pc1/capacita-edge` contiene las versiones HTML estáticas y la documentación complementaria.
- Existe una función de Forms (`functions/api/forms/lead.js`) que valida Turnstile y reenvía leads a Zoho.

## Estado actual

- El Worker fue auditado en modo read-only y no consume previews.
- El contenido producido en `/docs` es documentación, no despliegue.
- La rama activa es `feature/html-estatico-docs-base`.

## Límites de la documentación base

- No se modifica `main`.
- No se modifica Cloudflare.
- No se modifica Worker productivo.
- No se modifican los HTML productivos.
- No se modifica `/functions`.
- No se modifica sitemap.
- No se instala Astro ni frameworks.

## Componentes clave

- HTML estático de landings: `landing-*.html`
- Worker: `capacita-edge-router` (auditado externalmente)
- API de formularios: `functions/api/forms/lead.js`
- Sitemap y SEO: `sitemap_index.xml`, `sitemap-estatico.xml`
- Docs base: archivos creados en `/docs` para guardar el diseño y la operación del proyecto.
