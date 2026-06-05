# HTML_ESTATICO Block Library

## Bloques detectados en las landings

### 1. SEO / Meta / Head
- `<meta charset="UTF-8">`
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- `<link rel="canonical" ...>`
- `<meta name="description" ...>`
- `<script type="application/ld+json">` para schema de curso

### 2. Tracking Engine
- Google Tag Manager (`GTM-52J4PSR`)
- `window.dataLayer` con `page_init`, `product_id`, `platform: html_static`, `deployment_mode: edge_worker`
- Zoho PageSense carga global
- En las landings empresariales, Turnstile cliente se carga desde Cloudflare

### 3. Hero Section
- Hero visual con copy principal, badge, subtítulo y CTA
- Varía según producto: presencial, e-learning, Power BI, empresas, Excel empresarial

### 4. Form Section
- Formularios de captura de leads con campos ocultos de tracking
- Presencia de formularios de Zoho o de proxy a `/api/forms/lead`
- Estructuras de inputs reutilizables: nombre, email, teléfono, mensaje
- Campos ocultos de UTM, referrer, landing_url, landing_code, device, user agent, timezone

### 5. Sitemap y XML
- Rutas `/sitemap_index.xml` y `/sitemap-estatico.xml` servidas desde Pages
- Uso del Worker para proxy de estos archivos

### 6. Redirecciones y canonicalización
- Bloques de `redirect 301` para rutas antiguas y técnicas
- Canonicalización de slash final en páginas públicas definidas

### 7. Bloques visuales comunes
- Tarjetas de precios
- Secciones de testimonios / clientes
- FAQ
- Syllabus / programa
- Call to action fijo

## Patrón de bloques para futuras landings

- Bloque SEO + canonical
- Tracking Engine + GTM + PageSense
- Hero con CTA
- Formulario principal con hidden fields de tracking
- Secciones de beneficios y confianza
- Sección de cierre con lead magnet o descarga
- Scripts de hidratación para UTM y referrer

## Reglas de uso

- Evitar cambios directos en HTML productivo sin revisión de Worker y rutas.
- Mantener los bloques de tracking y datos dentro de los mismos patrones existentes.
- Todas las nuevas landings deben documentarse aquí y en `LANDINGS_BACKLOG.md`.

## Biblioteca de bloques HTML estáticos V1

Se agregó la nueva biblioteca de bloques estáticos bajo `blocks/` para usos de landing pages que no requieren Astro ni frameworks.
- `blocks/course-fit.html`
- `blocks/infrastructure-gallery.html`
- `blocks/benefits-grid.html`
- `blocks/syllabus-section.html`
- `blocks/payment-options.html`
- `blocks/testimonials-section.html`
- `blocks/clients-wall.html`
- `blocks/location-section.html`
- `blocks/quality-seals.html`

Todos los bloques usan placeholders `{{...}}` y mantienen IDs semánticos para anclaje.
