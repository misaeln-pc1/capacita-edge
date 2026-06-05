# Landing Publication Matrix

| Landing HTML | URL publica | Estado publicacion | Formulario | Turnstile | Imagenes locales | Depende de WordPress | Sitemap | Worker | Observaciones |
|---|---|---|---|---|---|---|---|---|---|
| landing-excel12-presencial.html | /curso-de-excel-presencial-en-santiago | Publicada legacy funcional | Zoho directo legacy | No | Si | No | Si | Si | No se toca flujo de formulario; solo imagenes locales. |
| landing-excel12-elearning.html | /curso-de-excel-basico-intermedio-online-sincronico | Publicada MIGRADA | /api/forms/lead + Turnstile | Si, interaction-only | Si | No | Si | Si | Migrado de Zoho directo a /api/forms/lead con Turnstile interaction-only en sprint 2026-06-05; imagenes desde GitHub a local. |
| landing-empresas.html | /cursos-para-empresas | Publicada | /api/forms/lead | Si, interaction-only | Si | No | Si | Si | Usa Turnstile interaction-only y assets locales. |
| landing-empresas-excel.html | /curso-empresa-excel | Publicada | /api/forms/lead | Si, interaction-only | Si | No | Si | Si | Usa Turnstile interaction-only y assets locales. |
| landing-powerbi12-elearning.html | /curso-power-bi-basico-intermedio-online-sincronico | Publicada / preparada segun Worker real | /api/forms/lead | Si, interaction-only | Si | No | Si | Si (sanitized en repo) | Canonical sin slash final; no se cambia ruta en este sprint. |