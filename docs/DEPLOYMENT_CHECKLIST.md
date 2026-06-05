# Deployment Checklist

Checklist de validación antes de desplegar una landing en producción.

## HTML Validación

- [ ] **HTML válido**: Usar validator.w3.org o herramienta local
  - Validar estructura
  - Sin etiquetas abiertas sin cerrar
  - Sin caracteres no escapados

- [ ] **Charset correcto**: `<meta charset="UTF-8">`

- [ ] **Viewport correcto**: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

- [ ] **Idioma declarado**: `<html lang="es">`

## SEO

- [ ] **Meta description presente**: `<meta name="description" content="...">`
  - 150-160 caracteres
  - Sin caracteres especiales problemáticos

- [ ] **Canonical URL correcto**: `<link rel="canonical" href="https://capacita.cl/ruta-actual">`
  - Apunta a URL propia
  - No apunta a dominio distinto

- [ ] **Open Graph tags**: 
  - `og:title`, `og:description`, `og:image`
  - Imágenes 1200x630px mínimo

- [ ] **Twitter Card tags** (opcional pero recomendado)
  - `twitter:card`, `twitter:title`, `twitter:description`

- [ ] **Schema.org presente**: `<script type="application/ld+json">`
  - Schema de Curso (si aplica)
  - Schema de Organización
  - Sin errores en Google Structured Data Testing Tool

## Tracking

- [ ] **Google Tag Manager**: `<!-- Google Tag Manager (noscript) -->`
  - GTM ID correcto: GTM-52J4PSR
  - Script cargado antes de `</head>`

- [ ] **Zoho PageSense**: Script cargado
  - URL correcta: `https://cdn.pagesense.io/js/capacita736/...`
  - No rompe performance

- [ ] **Google Analytics compatible**: GTM reenvía a GA4

- [ ] **GDPR cookies**: Si aplica, banner de consentimiento visible

## Formularios

- [ ] **Action correcto**: 
  - ✅ Preferible: `action="/api/forms/lead"`
  - ⚠️ Aceptable: `action="https://forms.zohopublic.com/..."`

- [ ] **Turnstile presente y funcional**:
  - `<div class="cf-turnstile" data-sitekey="..."></div>`
  - Script cargado: `https://challenges.cloudflare.com/turnstile/v0/api.js`
  - data-sitekey tiene valor real (no placeholder)
  - `data-response-field-name="cf-turnstile-response"`

- [ ] **Honeypot presente**:
  - `<input type="text" name="hp_field" tabindex="-1" autocomplete="off">`
  - Oculto a usuarios (CSS: `display: none` o similar)
  - No rompido por CSS de formulario

- [ ] **Campos de captura presentes**:
  - Nombre (visible)
  - Email (visible)
  - Teléfono (visible)
  - Mensaje (visible)
  - Con labels clara

- [ ] **Campos hidden de tracking**:
  - `utm_source`, `utm_medium`, `utm_campaign`
  - `landing_code`, `Website`, `Website1`
  - `user_agent`, `user_language`, `dispositivo`
  - `DateTime_date`, `DateTime_hours`, `DateTime_minutes`

- [ ] **JavaScript de inyección**:
  - Campos hidden inyectados correctamente con URLSearchParams
  - Fecha/hora capturadas
  - Conversión de timezone si aplica

- [ ] **Submit button accesible**:
  - Texto claro: "Registrarse", "Enviar", etc.
  - No deshabilitado por defecto
  - Spinner visible durante submit (opcional pero recomendado)

## Variables de Cloudflare

**Requeridas en Cloudflare Pages (production y preview)**:

- [ ] **TURNSTILE_SECRET**: 
  - Set en Pages Functions environment
  - No expuesto en frontend
  - Valor actual verificado en Cloudflare console

- [ ] **ZOHO_LEAD_FORM_URL**:
  - Set en Pages Functions environment
  - URL correcta de Zoho form
  - Sin typos

## Responsividad

- [ ] **Mobile (375px)**: Landing se ve correcta en teléfono
  - Texto legible
  - Botones clickeables (mínimo 44x44px)
  - Formulario funcional

- [ ] **Tablet (768px)**: Landing se ve correcta en tablet
  - Layout adaptado
  - Imágenes escaladas
  - Formulario accesible

- [ ] **Desktop (1024px+)**: Landing se ve correcta en desktop
  - Texto óptimo
  - Imágenes full quality
  - Formulario centrado o con sidebar

## Performance

- [ ] **Lighthouse**: Score mínimo 80/100
  - Performance: 80+
  - Accessibility: 80+
  - Best Practices: 80+
  - SEO: 90+

- [ ] **Imágenes optimizadas**:
  - Formato WebP + fallback JPG/PNG
  - Tamaño máximo 200KB por imagen
  - `loading="lazy"` para imágenes below the fold

- [ ] **CSS minimizado**: Archivo bundle.css no > 50KB

- [ ] **JavaScript minimizado**: Archivo bundle.js no > 100KB

- [ ] **Fuentes web**: Máximo 2 tipografías, pre-loaded

- [ ] **Carga de terceros** (GTM, Turnstile, PageSense):
  - No bloquea rendering
  - Async o defer atributos

## Seguridad

- [ ] **HTTPS**: Landing servida por HTTPS (Cloudflare garantiza)

- [ ] **HSTS header**: Set por Cloudflare (verificar en response headers)

- [ ] **No exponer secrets**:
  - Está permitido mencionar nombres de variables como `TURNSTILE_SECRET` y `ZOHO_LEAD_FORM_URL` en documentación y código.
  - Está prohibido exponer valores reales, URLs privadas completas, tokens, `client_secret`, `access_token`, `refresh_token`, cookies o claves privadas.
  - Verificar que los valores reales no están en HTML ni en los archivos de documentación.

- [ ] **CSP headers** (opcional pero recomendado):
  - `Content-Security-Policy` restricto
  - Permitir solo dominios necesarios

- [ ] **X-Frame-Options**: `SAMEORIGIN` o `DENY` (evitar clickjacking)

## Formulario: Prueba de envío

- [ ] **Envío exitoso con datos válidos**:
  - Rellenar formulario correctamente
  - Completar Turnstile (human verification)
  - Click en "Enviar"
  - Redirect a `landing_url?lead=ok#registro`
  - Sin errores en console

- [ ] **Rechazo de honeypot relleno**:
  - Inspeccionar elemento, enable `hp_field`
  - Rellenar `hp_field` con texto
  - Intentar enviar
  - Debe devolver 403 o error visible

- [ ] **Rechazo sin Turnstile**:
  - Inspeccionar elemento, remove Turnstile div
  - Intentar enviar
  - Debe devolver 400 o error visible

- [ ] **Rechazo con Turnstile inválido**:
  - Modificar token `cf-turnstile-response` con valor ficticio
  - Intentar enviar
  - Debe devolver 403 o error visible

- [ ] **Confirmación de recepción**:
  - Verificar en Zoho que el lead llegó
  - Campos están poblados correctamente
  - Timestamp es reciente

- [ ] **Email de confirmación** (si configurado):
  - Usuario recibe email de confirmación
  - Link de confirmación (si aplica) funciona

## Compatibilidad navegadores

- [ ] **Chrome / Edge**: Última versión, formulario funciona
- [ ] **Firefox**: Última versión, formulario funciona
- [ ] **Safari**: Última versión (macOS + iOS), formulario funciona
- [ ] **Mobile Safari (iOS)**: Última versión, formulario funciona

## Accesibilidad

- [ ] **WCAG 2.1 Level AA mínimo**:
  - Contraste texto/fondo: 4.5:1 para texto normal
  - Labels asociados a inputs
  - Error messages accesibles
  - Keyboard navigation funcional (Tab, Enter, ESC)

- [ ] **Screen reader compatible**:
  - Titles, headings, landmarks claros
  - Form labels con `<label for>`
  - Error messages en `aria-live`

- [ ] **Color no es único indicador**: Errores no solo en rojo

## Validación Worker

Si la landing usa `/api/forms/lead`:

- [ ] **Worker está deployado**: Cloudflare Pages Functions activo
- [ ] **Worker valida Turnstile**: Server-side verification funciona
- [ ] **Worker normaliza URLs**: Website y Website1 se normalizan
- [ ] **Worker relay a Zoho**: Formdata llega a ZOHO_LEAD_FORM_URL
- [ ] **Worker logging**: Errores se loguean para debugging

## Sitemap

- [ ] **Landing está en sitemap-estatico.xml**:
  - URL correcta: `https://capacita.cl/ruta-actual`
  - Priority y frequency marcadas
  - Lastmod es reciente (hoy)

- [ ] **sitemap_index.xml referencia ambos**:
  - `sitemap-estatico.xml` presente
  - `sitemap-wordpress.xml` presente (si existe)

## Analytics y Tracking

- [ ] **Google Analytics valida la landing**:
  - Ir a GA4 → Real-time → visible dentro de 60 segundos
  - Page view se registra correctamente
  - URL aparece correcta

- [ ] **GTM dataLayer eventos**:
  - Evento `page_init` se dispara al cargar
  - `product_id` correcto para esta landing
  - `platform: 'html_static'` presente
  - `deployment_mode: 'edge_worker'` presente

- [ ] **Zoho PageSense visible**:
  - Script cargado sin errores
  - Analytics data se captura

## Prueba final integrida

- [ ] **Sitio web funciona**: Landing visible en https://capacita.cl/ruta-actual
- [ ] **Sin 404**: Status HTTP 200
- [ ] **Sin 500**: Errores del servidor no presentes
- [ ] **Worker funciona**: Rutas se proxy correctamente
- [ ] **Formulario funciona**: Envío exitoso hasta Zoho
- [ ] **Redirect funciona**: ?lead=ok#registro se aplica
- [ ] **Sitemap funciona**: XML es válido, landings presentes

## Checklist de despliegue

Marcar en orden:

1. [ ] **Pre-despliegue**: Todas las validaciones anteriores pasadas
2. [ ] **Rama**: Confirmado en `feature/html-estatico-docs-base` sin cambios en `main`
3. [ ] **Git status limpio**: `git status --short` no muestra cambios no commitados
4. [ ] **No hay secretos**: `grep -r "TURNSTILE_SECRET\|ZOHO_LEAD_FORM_URL" .` no encuentra valores reales
5. [ ] **Cloudflare Pages**: Deploy completado sin errores
6. [ ] **DNS**: Todavía apunta a WordPress para rutas no migradas
7. [ ] **Worker**: Actualizado con nuevas rutas (si aplica)
8. [ ] **Analytics**: Esperado 5-10 minutos, validar data en GTM y GA4
9. [ ] **Notificación**: Team notificado de nuevo landing disponible

## Estado post-despliegue

Monitorear por 24 horas:

- [ ] **Errores de JavaScript console**: Ninguno crítico
- [ ] **404 errors**: Ningún patrón sospechoso
- [ ] **Performance**: Lighthouse sigue en 80+
- [ ] **Conversiones**: Form submissions se registran
- [ ] **Traffic**: Visitantes accediendo normalmente

---

**Nota**: Este checklist debe completarse ANTES de considerar una landing como "lista para producción".
