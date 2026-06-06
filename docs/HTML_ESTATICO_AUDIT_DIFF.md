# HTML Estatico Audit Diff

## Rama

`audit/seo-worker-baseline-before-new-landings`

## Tipo de cambio

Solo documentacion de auditoria.

## Archivos productivos

No modificados:

- `landing-*.html`
- `functions/**`
- `assets/**`
- `sitemap*.xml`
- Worker real Cloudflare
- DNS
- Configuracion Cloudflare
- `.env`

## Archivos documentales creados o actualizados

- `docs/SEO_WORKER_BASELINE_AUDIT_2026-06-05.md`
- `docs/HTML_ESTATICO_AUDIT_DIFF.md`
- `docs/HTML_ESTATICO_REVIEW_REQUEST.md`
- `docs/HTML_ESTATICO_GIT_STATUS.txt`
- `docs/HTML_ESTATICO_SAFE_DIFF.txt`

## Hallazgos que requieren decision posterior

1. `landing-excel12-elearning.html` referencia 3 assets que no existen bajo `/assets/img/landings/excel-elearning/`.
2. Excel presencial y Excel e-learning tienen canonical con slash final, mientras sitemap y Worker usan rutas sin slash.
3. Empresas y Empresas Excel no declaran explicitamente `data-response-field-name="cf-turnstile-response"`.
4. El repo GitHub es publico.
5. Cloudflare Pages y Worker real no son verificables desde repo.

## Cambio propuesto no aplicado

No se aplico ninguna correccion funcional. Las correcciones quedan propuestas para un hito separado.
