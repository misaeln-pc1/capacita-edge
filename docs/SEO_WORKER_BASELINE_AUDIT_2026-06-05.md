# SEO / Worker Baseline Audit - 2026-06-05

## Objetivo

Auditoria read-only de linea base antes de crear nuevas landings, validando consistencia entre HTML, canonical, sitemap, Worker sanitized, assets y formularios.

## Alcance y restricciones

- Rama: `audit/seo-worker-baseline-before-new-landings`
- Base: `main` actualizado antes de crear rama.
- No se modifico HTML productivo.
- No se modificaron Functions.
- No se modificaron assets.
- No se modificaron sitemaps.
- No se toco Cloudflare, DNS ni Worker real.
- Cambios permitidos: documentacion de auditoria en `docs/`.

## Estado Git verificado

- `Get-Location`: `C:\Users\TECH\Documents\Proyectos\HTML Estatico\capacita-edge`
- `git rev-parse --show-toplevel`: `C:/Users/TECH/Documents/Proyectos/HTML Estatico/capacita-edge`
- `origin`: `https://github.com/misaeln-pc1/capacita-edge.git`
- `main`: actualizado con `git pull --ff-only origin main`.
- SHA base de rama: `bb97b73ea6891c9f0d2e6e0b9c4873d9cd57da6a`
- Working tree limpio antes de empezar.

## Privacidad GitHub

- Comando: `gh repo view misaeln-pc1/capacita-edge --json visibility,nameWithOwner,url`
- Resultado: `visibility=PUBLIC`
- Riesgo: el repositorio es publico. No se cambio privacidad desde esta auditoria.

## Cloudflare Pages

Estado: No verificable desde repo.

No se usaron credenciales ni dashboard de Cloudflare. La evidencia disponible en repo indica:

- `docs/WORKER_ROUTER_SOURCE.sanitized.js` define `EDGE_URL = 'https://capacita-edge.pages.dev'`.
- `docs/WORKER_ROUTER_AUDIT.md` documenta que el Worker usa `capacita-edge.pages.dev` y no previews.
- `docs/HTML_ESTATICO_HANDOFF_2026-06-05.md` documenta que `/assets/` debe proxyarse hacia Cloudflare Pages.

## Archivos revisados

- `docs/HTML_ESTATICO_HANDOFF_2026-06-05.md`
- `docs/WORDPRESS_EXIT_STATUS.md`
- `docs/WORKER_ROUTER_AUDIT.md`
- `docs/WORKER_ROUTER_SOURCE.sanitized.js`
- `docs/FORM_FLOW_ARCHITECTURE.md`
- `docs/LANDING_PUBLICATION_MATRIX.md`
- `sitemap_index.xml`
- `sitemap-estatico.xml`
- `landing-excel12-presencial.html`
- `landing-excel12-elearning.html`
- `landing-powerbi12-elearning.html`
- `landing-empresas-excel.html`
- `landing-empresas.html`
- `functions/api/forms/lead.js`

## Rutas publicas auditadas

| Ruta | Worker sanitized | Sitemap | Landing |
|---|---:|---:|---|
| `/curso-de-excel-presencial-en-santiago` | OK | OK | `landing-excel12-presencial.html` |
| `/curso-de-excel-basico-intermedio-online-sincronico` | OK | OK | `landing-excel12-elearning.html` |
| `/curso-power-bi-basico-intermedio-online-sincronico` | OK | OK | `landing-powerbi12-elearning.html` |
| `/curso-empresa-excel` | OK | OK | `landing-empresas-excel.html` |
| `/cursos-para-empresas` | OK | OK | `landing-empresas.html` |

## Resumen por landing

| Landing | Estado | Hallazgos |
|---|---|---|
| `landing-excel12-presencial.html` | WARNING | Canonical con slash final no coincide exactamente con sitemap/Worker sin slash. Formulario Zoho directo es legacy aceptado. Assets locales OK. |
| `landing-excel12-elearning.html` | FAIL | Canonical con slash final no coincide exactamente con sitemap/Worker sin slash. Faltan 3 assets locales de testimonios referenciados por el HTML. Formulario principal OK. |
| `landing-powerbi12-elearning.html` | OK | Canonical sin slash, sitemap y Worker consistentes. Formulario seguro OK. Assets locales OK. |
| `landing-empresas-excel.html` | WARNING | Canonical, sitemap y Worker consistentes. Formulario usa `/api/forms/lead`, `hp_field`, `Website`, `Website1` y Turnstile `interaction-only`; falta declarar explicitamente `data-response-field-name="cf-turnstile-response"`. Assets locales OK. |
| `landing-empresas.html` | WARNING | Canonical, sitemap y Worker consistentes. Formulario usa `/api/forms/lead`, `hp_field`, `Website`, `Website1` y Turnstile `interaction-only`; falta declarar explicitamente `data-response-field-name="cf-turnstile-response"`. Assets locales OK. |

## Detalle SEO / canonical / sitemap

| Landing | Title | Canonical | Sitemap | Estado |
|---|---|---|---|---|
| `landing-excel12-presencial.html` | `Curso de Excel Presencial en Santiago | Basico e Intermedio` | `https://capacita.cl/curso-de-excel-presencial-en-santiago/` | `https://capacita.cl/curso-de-excel-presencial-en-santiago` | WARNING |
| `landing-excel12-elearning.html` | `Curso de Excel Online Basico e Intermedio (En Vivo) | Capacita.cl` | `https://capacita.cl/curso-de-excel-basico-intermedio-online-sincronico/` | `https://capacita.cl/curso-de-excel-basico-intermedio-online-sincronico` | WARNING |
| `landing-powerbi12-elearning.html` | `Curso de Power BI Online Basico e Intermedio (En Vivo) | Capacita.cl` | `https://capacita.cl/curso-power-bi-basico-intermedio-online-sincronico` | `https://capacita.cl/curso-power-bi-basico-intermedio-online-sincronico` | OK |
| `landing-empresas-excel.html` | `Curso de Excel para Empresas | Capacitacion Empresarial` | `https://capacita.cl/curso-empresa-excel` | `https://capacita.cl/curso-empresa-excel` | OK |
| `landing-empresas.html` | `Cursos para Empresas | Programas de Capacitacion Empresarial` | `https://capacita.cl/cursos-para-empresas` | `https://capacita.cl/cursos-para-empresas` | OK |

Nota: `docs/HTML_ESTATICO_HANDOFF_2026-06-05.md` ya indica que algunas landings legacy pueden conservar canonical con slash final y que deben corregirse solo en un hito SEO controlado.

## Schema

- `landing-excel12-presencial.html`: tiene `application/ld+json`.
- `landing-excel12-elearning.html`: tiene `application/ld+json`.
- `landing-powerbi12-elearning.html`: tiene `application/ld+json`.
- `landing-empresas-excel.html`: no se detecto `application/ld+json`.
- `landing-empresas.html`: no se detecto `application/ld+json`.

## Assets

Busqueda de dependencias externas en las 5 landings y sitemaps:

- `wp-content`: OK, no encontrado.
- `raw.githubusercontent.com`: OK, no encontrado.
- `github.com/.../blob`: OK, no encontrado.
- `misaeln-pc1.github.io`: OK, no encontrado en HTML productivo auditado.

Existencia local de assets referenciados:

| Landing | Assets `/assets/` unicos | Faltantes | Estado |
|---|---:|---:|---|
| `landing-excel12-presencial.html` | 26 | 0 | OK |
| `landing-excel12-elearning.html` | 24 | 3 | FAIL |
| `landing-powerbi12-elearning.html` | 17 | 0 | OK |
| `landing-empresas-excel.html` | 24 | 0 | OK |
| `landing-empresas.html` | 11 | 0 | OK |

Assets faltantes detectados:

- `/assets/img/landings/excel-elearning/testimonio-curso-excel-online-felipe.webp`
- `/assets/img/landings/excel-elearning/testimonio-curso-excel-online-daniela.webp`
- `/assets/img/landings/excel-elearning/testimonio-curso-excel-online-carolina.webp`

Evidencia adicional: existen archivos con esos nombres en `assets/img/`, pero no bajo `assets/img/landings/excel-elearning/`.

## Formularios

| Landing | Action principal | Turnstile | `hp_field` | `Website` / `Website1` | Estado |
|---|---|---|---|---|---|
| `landing-excel12-presencial.html` | Zoho directo | No | No | Si | WARNING legacy aceptado |
| `landing-excel12-elearning.html` | `/api/forms/lead` | Si, `interaction-only`, `cf-turnstile-response` explicito | Si | Si | OK |
| `landing-powerbi12-elearning.html` | `/api/forms/lead` | Si, `interaction-only`, `cf-turnstile-response` explicito | Si | Si | OK |
| `landing-empresas-excel.html` | `/api/forms/lead` | Si, `interaction-only`; response field no explicito | Si | Si | WARNING |
| `landing-empresas.html` | `/api/forms/lead` | Si, `interaction-only`; response field no explicito | Si | Si | WARNING |

Coherencia con `docs/FORM_FLOW_ARCHITECTURE.md`:

- Excel presencial queda como legacy Zoho directo y no se migra en este hito.
- Excel e-learning, Power BI, Empresas y Empresas Excel usan `/api/forms/lead`.
- `functions/api/forms/lead.js` valida `hp_field`, exige `cf-turnstile-response`, verifica Turnstile server-side con `context.env.TURNSTILE_SECRET`, normaliza `Website` y `Website1`, elimina campos internos y reenvia a Zoho usando `context.env.ZOHO_LEAD_FORM_URL`.
- No se detecto valor real de `TURNSTILE_SECRET`; solo nombres de variables en codigo/documentacion.

## Worker sanitized

`docs/WORKER_ROUTER_SOURCE.sanitized.js`:

- Incluye las 5 rutas publicas en canonicalizacion y `HTML_ROUTES`.
- Incluye redirects desde rutas tecnicas `landing-*`.
- Incluye `/sitemap_index.xml` y `/sitemap-estatico.xml`.
- Incluye proxy `/api/forms/lead`.
- Incluye proxy `/assets/` hacia `EDGE_URL`.
- Usa `https://capacita-edge.pages.dev`.
- No apunta a previews.
- No apunta a GitHub Pages, `raw.githubusercontent.com` ni `github.com/.../blob`.

## Seguridad

Busquedas ejecutadas:

- `wp-content`
- `raw.githubusercontent.com`
- `github.com/`
- `TURNSTILE_SECRET`
- `client_secret`
- `access_token`
- `refresh_token`
- `cookie`
- `private key`

Resultados:

- No se detectaron valores reales de secretos.
- `TURNSTILE_SECRET` y `ZOHO_LEAD_FORM_URL` aparecen por nombre en codigo y documentacion, no como valores.
- `client_secret`, `access_token`, `refresh_token` y claves privadas no aparecen como valores.
- `cookie` aparece como lectura de `document.cookie` en scripts de medicion GA en `landing-powerbi12-elearning.html` y `landing-excel12-presencial.html`, no como cookie hardcodeada.
- El repo es publico; esto aumenta el impacto si se sube accidentalmente un secreto en el futuro.

## Hallazgos

### FAIL

1. `landing-excel12-elearning.html` referencia 3 assets de testimonios que no existen bajo `/assets/img/landings/excel-elearning/`.

### WARNING

1. `landing-excel12-presencial.html` y `landing-excel12-elearning.html` tienen canonical con slash final, mientras sitemap y Worker usan rutas sin slash.
2. `landing-empresas.html` y `landing-empresas-excel.html` no declaran explicitamente `data-response-field-name="cf-turnstile-response"`, aunque usan Turnstile y Cloudflare puede generar el campo default.
3. Repo GitHub publico.
4. Cloudflare Pages y Worker real no son verificables desde repo; solo hay evidencia documental/sanitizada.
5. `sitemap_index.xml` mantiene `https://capacita.cl/wp-sitemap.xml`; esto parece intencional por convivencia WordPress, pero debe considerarse al planificar salida total.

## Correcciones propuestas para otro hito

1. Copiar o mover los 3 assets de testimonios existentes desde `assets/img/` hacia `assets/img/landings/excel-elearning/`, o ajustar el HTML en un PR funcional controlado.
2. Normalizar canonical sin slash final en Excel presencial y Excel e-learning junto con validacion SEO.
3. Agregar `data-response-field-name="cf-turnstile-response"` explicitamente a Empresas y Empresas Excel.
4. Versionar el Worker real como fuente mantenible en el repo y validar contra Cloudflare cuando haya acceso.
5. Revisar estrategia de repo publico antes de cualquier cambio que involucre configuracion sensible.

## Pendientes

- No se verifico dashboard de Cloudflare.
- No se verifico Pages runtime production.
- No se probaron formularios en vivo.
- No se corrigieron assets faltantes por restriccion read-only.
- No se modificaron canonical ni sitemaps.

## Definition of Done

- Auditoria read-only documentada: cumplido.
- No se modifico HTML productivo: cumplido.
- No se modificaron Functions: cumplido.
- No se modificaron assets: cumplido.
- No se modificaron sitemaps: cumplido.
- No se toco Cloudflare ni DNS: cumplido.
- Repo publico/privado documentado: cumplido, repo `PUBLIC`.
- Cloudflare Pages marcado como no verificable desde repo: cumplido.
- `docs/HTML_ESTATICO_AUDIT_DIFF.md` actualizado: cumplido.
- `docs/HTML_ESTATICO_REVIEW_REQUEST.md` actualizado: cumplido.

## SOLICITUD DE AUDITORIA A CHATGPT

Revisar este PR documental como una auditoria read-only previa a nuevas landings. Confirmar especialmente:

1. Si el hallazgo de assets faltantes en Excel e-learning debe corregirse antes de crear landings nuevas.
2. Si la normalizacion de canonical sin slash final debe separarse en un PR SEO independiente.
3. Si Empresas y Empresas Excel deben agregar explicitamente `data-response-field-name="cf-turnstile-response"` aunque Cloudflare use ese nombre por defecto.
4. Si conviene convertir el repo a privado antes de avanzar con mas integraciones, considerando que hoy `misaeln-pc1/capacita-edge` es publico.
