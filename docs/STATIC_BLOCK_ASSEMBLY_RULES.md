# STATIC BLOCK ASSEMBLY RULES

## Reglas de ensamblaje
1. Cada bloque debe ser un fragmento HTML independiente con su propio `section`.
2. Los IDs de bloque deben ser únicos y semánticos.
3. No incluir lógica de ejecución ni sintaxis de template de framework en el HTML final.
4. Reemplazar datos variables por placeholders `{{...}}`.
5. Solo usar CSS inline estrictamente necesario para mantener presentación mínima.
6. Evitar formularios productivos en los bloques. Si se incluye un formulario, usar `/api/forms/lead`, campo honeypot `hp_field`, `Website`, `Website1` y nombres Zoho/SingleLine compatibles.
7. No introducir scripts de terceros salvo Turnstile en bloques con formulario, usando solo sitekey publica o placeholder. La secret key nunca debe ir en HTML.
8. Turnstile en formularios nuevos debe usar `class="cf-turnstile"`, `data-response-field-name="cf-turnstile-response"` y `data-appearance="interaction-only"` para baja friccion visual sin ocultar el widget.
9. No ocultar Turnstile con CSS (`display:none`, `visibility:hidden`, `opacity:0`, posicionamiento fuera de pantalla ni hacks visuales). La validacion debe seguir ocurriendo server-side en `/api/forms/lead`.

## Estructura recomendada
- `section` con `aria-labelledby`.
- Títulos con encabezados semánticos (`h2`, `h3`).
- Contenido organizado en listas, tarjetas o grid según corresponda.
- Imágenes con `alt` descriptivo.

## Exclusiones
- No copiar `src/pages/index.astro` ni variables de configuración de Astro.
- No introducir `package.json`, `astro.config.mjs`, `.env` ni valores secretos.
- No usar `node_modules` ni distros generadas.
