# Auditoría read-only del Worker `capacita-edge-router`

## Resumen ejecutivo

- El Worker `capacita-edge-router` intercepta la ruta `capacita.cl/*`.
- El Worker no usa previews ni URLs de GitHub Pages.
- El Worker hace fetch explícito a `https://capacita-edge.pages.dev` para rutas específicas y APIs determinadas.
- Las rutas restantes se proxy al origen original de `capacita.cl` (probablemente WordPress).
- No hay variables ni secretos usados dentro del script.
- No depende de la rama `main` dentro del código del Worker.
- Una rama `feature/*` no debería afectar producción directamente porque el Worker no apunta a previews.
- La rama `docs/html-estatico-safe-audit` también no debería afectar producción por la misma razón.
- De todos modos, es recomendable revisar manualmente el Worker y versionarlo en el repo.

## Tabla de rutas detectadas

| Patrón de ruta | Origen/destino | Comportamiento | Riesgo | Observación |
|---|---|---|---|---|
| `capacita.cl/*` | Worker `capacita-edge-router` | Intercepta todas las solicitudes de `capacita.cl` | Alto (ruta principal) | El Worker controla el tráfico del dominio |
| `/curso-de-excel-presencial-en-santiago` | `https://capacita-edge.pages.dev/landing-excel12-presencial` | Proxy HTML desde Pages | Bajo | Canonicaliza via Pages producción |
| `/curso-de-excel-basico-intermedio-online-sincronico` | `https://capacita-edge.pages.dev/landing-excel12-elearning` | Proxy HTML desde Pages | Bajo | Canonicaliza via Pages producción |
| `/cursos-para-empresas` | `https://capacita-edge.pages.dev/landing-empresas` | Proxy HTML desde Pages | Bajo | Canonicaliza via Pages producción |
| `/curso-empresa-excel` | `https://capacita-edge.pages.dev/landing-empresas-excel.html` | Proxy HTML desde Pages | Bajo | Canonicaliza via Pages producción |
| `/sitemap_index.xml` | `https://capacita-edge.pages.dev/sitemap_index.xml` | Proxy XML desde Pages | Bajo | Sitemap servido desde Pages producción |
| `/sitemap-estatico.xml` | `https://capacita-edge.pages.dev/sitemap-estatico.xml` | Proxy XML desde Pages | Bajo | Sitemap estático servido desde Pages producción |
| `/api/forms/lead` | `https://capacita-edge.pages.dev/api/forms/lead` | Proxy API forms | Moderado | API se sirve desde Pages producción |
| `/api/forms/download` | `https://capacita-edge.pages.dev/api/forms/download` | Proxy API forms | Moderado | API se sirve desde Pages producción |
| `/api/landing-config/*` | `https://capacita-edge.pages.dev` + mismo path | Proxy dinámico de landing config | Moderado | Mapea dinámicamente a Pages producción |
| Todo lo demás | Origen original de `capacita.cl` | Fetch directo al origen | Moderado-alto | Probable WordPress | 
| Rutas antiguas `/landing-*` | Redirecciones 301 a rutas canónicas | Redirect 301 | Bajo | Redirecciones de SEO / legacy |

## Tabla de orígenes

| Origen | Tipo | Usado para qué rutas | Riesgo |
|---|---|---|---|
| `https://capacita-edge.pages.dev` | Pages / producción | HTML canónicos, XML sitemaps, APIs `/api/forms/*`, `/api/landing-config/*` | Bajo | Siempre apunta al dominio Pages de producción |
| Origen original de `capacita.cl` | Externo / WordPress probable | Todas las demás rutas no capturadas | Moderado-alto | Este tráfico no pasa por Pages, depende del origen DNS de `capacita.cl` |

## Variables / secrets por nombre

- Ninguna variable ni secret usada dentro del script.

## Revisión de lógica del Worker

- Intercepta `capacita.cl/*`: sí, por la ruta asignada.
- Hace fetch a WordPress: implícitamente para todo lo que no coincide con rutas específicas.
- Hace fetch a `capacita-edge.pages.dev`: sí, para contenido específico y APIs.
- Hace fetch a GitHub Pages: no.
- Usa rutas específicas para landings HTML: sí, varias rutas canónicas de landing.
- Usa `sitemap-estatico.xml` o `sitemap_index.xml`: sí, ambas rutas proxies a Pages.
- Enruta `/api/forms/lead`: sí, proxy hacia Pages al mismo endpoint.
- Llama a Pages Functions: no explícitamente, solo proxy a endpoints de Pages.
- Usa variables/secrets por nombre: no.
- Depende de rama `main`: no en el código del Worker.
- Podría depender de previews o ramas no principales: no, el Worker usa un dominio Pages fijo de producción.
- Una rama `feature/*` puede afectar producción: no directamente, porque el Worker no consume previews.
- La rama `docs/html-estatico-safe-audit` puede afectar producción: no directamente, por el mismo motivo.

## Conclusión

- Clasificación: `SEGURO_PARA_PUSH`

> El Worker está diseñado para usar el dominio fijo `capacita-edge.pages.dev`, que corresponde al Pages de producción, y no realiza fetch hacia URLs de preview. Por tanto, los pushes de ramas no principales no deberían afectar directamente el dominio `capacita.cl` en producción.

## Recomendación

- Revisar manualmente el Worker y versionarlo en el repo para mantener la lógica auditada.
- No es estrictamente necesario desactivar previews; sin embargo, limitar previews por rama puede reducir ruido si se desea.
- No es necesario trabajar solo local sin push: las ramas feature pueden seguirse trabajando.
- Crear una rama docs sin push no es obligatoria, excepto si se quiere documentar la lógica antes de cambios grandes.
- Migrar el Worker al repo como fuente versionada futura es aconsejable.

## Validación final

- Solo se usaron métodos `GET`.
- No se modificó Cloudflare.
- No se modificó el Worker.
- No hubo deploy.
- No hubo cambio DNS.
- No se revelaron secrets.
- No hubo push.
- No se tocó main.
