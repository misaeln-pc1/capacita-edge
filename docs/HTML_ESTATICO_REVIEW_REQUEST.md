# HTML Estatico Review Request

## PR solicitado

Abrir PR no draft contra `main` desde:

`audit/seo-worker-baseline-before-new-landings`

## Resumen para reviewer

Este PR documenta una auditoria read-only de linea base antes de crear nuevas landings. El objetivo es revisar consistencia entre HTML, canonical, sitemap, Worker sanitized, assets y formularios sin cambiar comportamiento productivo.

## Alcance

- Solo documentacion en `docs/`.
- No HTML productivo.
- No Functions.
- No assets.
- No sitemaps.
- No Cloudflare.
- No DNS.

## Puntos principales a revisar

1. `landing-excel12-elearning.html` tiene 3 assets faltantes bajo `/assets/img/landings/excel-elearning/`.
2. Excel presencial y Excel e-learning mantienen canonical con slash final, distinto a sitemap/Worker sin slash.
3. Empresas y Empresas Excel usan Turnstile `interaction-only`, pero no declaran explicitamente `data-response-field-name="cf-turnstile-response"`.
4. El repositorio es publico segun `gh repo view`; documentado como riesgo.
5. Cloudflare Pages queda marcado como "No verificable desde repo"; solo hay evidencia documental y Worker sanitized.

## Resultado esperado

Validar que el reporte es fiel al estado actual y decidir si las correcciones propuestas deben ejecutarse antes de crear nuevas landings.

## SOLICITUD DE AUDITORIA A CHATGPT

Por favor auditar el PR documental con foco en:

- Confirmar que no hay cambios productivos.
- Confirmar si el asset gap de Excel e-learning bloquea nuevas landings.
- Confirmar si canonical con slash final debe corregirse ahora o en hito SEO separado.
- Confirmar si falta explicitar `data-response-field-name` en Empresas y Empresas Excel.
- Confirmar si el repo publico debe tratarse como riesgo bloqueante antes de nuevos formularios o integraciones.
