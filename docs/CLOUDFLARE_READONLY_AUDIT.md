# Auditoria read-only Cloudflare - capacita-edge

> ESTADO: SUPERADO / HISTÓRICO.  
> Este diagnóstico fue reemplazado por `CLOUDFLARE_READONLY_AUDIT_REAL.md`, que sí usó MCP Cloudflare real. No usar este archivo como fuente operativa vigente.

Fecha de auditoria: 2026-06-05 00:58 CLT aprox.
Repo: `misaeln-pc1/capacita-edge`
Rama local auditada: `feature/html-estatico-docs-base`
Modo: solo lectura

## Resumen ejecutivo

No fue posible confirmar directamente la configuracion interna de Cloudflare Pages, Turnstile, variables/secrets, Workers ni controles de branch desde la consola/API de Cloudflare, porque esta maquina no expone `wrangler`, variables de entorno Cloudflare, perfiles locales Cloudflare ni un MCP Cloudflare disponible.

Con la evidencia disponible, no hay indicios publicos de que `capacita.cl` este sirviendo desde Cloudflare Pages. `https://capacita.cl` responde como WordPress/PHP detras de Cloudflare, con headers `x-powered-by: PHP/8.4.19`, `Link: ... wp-json ...` y `Server: cloudflare`. DNS publico para `capacita.cl` y `www.capacita.cl` resuelve a IPs proxy de Cloudflare, no a un CNAME `*.pages.dev`.

GitHub si muestra deployments del repo, pero en ambiente `github-pages`, no `cloudflare-pages`. Los 10 deployments mas recientes visibles son de `main`. No se observo deployment GitHub para ramas `feature/*`, `docs/html-estatico-safe-audit` ni `feat/cloudflare-lead-proxy`.

Conclusion operativa: es razonable trabajar localmente en una rama separada sin romper produccion mientras no se haga push. Antes de hacer push, falta validar en Cloudflare si el proyecto Pages conectado al repo tiene previews automaticos para todas las ramas. Si Cloudflare Pages preview esta configurado como "All non-Production branches", cualquier push a `docs/html-estatico-safe-audit`, `feature/*` o `feature/html-estatico-docs-base` podria disparar un preview publico.

## Alcance y limitaciones

| Area | Estado | Evidencia |
|---|---:|---|
| GitHub repo | Verificado | Repo publico `misaeln-pc1/capacita-edge`, default branch `main` |
| Git local | Verificado | Rama local `feature/html-estatico-docs-base`; mismo commit que `main` (`fe34a58`) |
| GitHub deployments | Verificado | Ambiente visible `github-pages` |
| Cloudflare DNS publico | Verificado parcialmente | `capacita.cl` y `www.capacita.cl` resuelven a IPs Cloudflare |
| Cloudflare Pages proyecto | No verificable con acceso actual | No hay `wrangler`, token, perfil ni MCP Cloudflare |
| Cloudflare branch controls | No verificable con acceso actual | Requiere consola/API Cloudflare |
| Cloudflare variables/secrets | No verificable con acceso actual | Requiere consola/API Cloudflare |
| Turnstile widgets/secrets | No verificable con acceso actual | Requiere consola/API Cloudflare |
| Workers/routes Cloudflare | No verificable con acceso actual | Requiere consola/API Cloudflare |

## Configuracion detectada

| Item | Valor detectado | Fuente | Confianza |
|---|---|---|---:|
| Repo conectado a trabajo local | `https://github.com/misaeln-pc1/capacita-edge.git` | `git remote -v` | Alta |
| Default branch GitHub | `main` | GitHub API read-only | Alta |
| Rama local actual | `feature/html-estatico-docs-base` | `git status --branch` | Alta |
| Commit local actual | `fe34a5896a6a72ccc8a2e62e10531908359f6e0b` | `git branch --verbose` | Alta |
| Ramas remotas | `origin/main`, `origin/feat/cloudflare-lead-proxy` | `git branch --all` | Alta |
| Build command Cloudflare Pages | No verificado | Falta acceso Cloudflare | Baja |
| Output directory Cloudflare Pages | No verificado | Falta acceso Cloudflare | Baja |
| Root directory Cloudflare Pages | No verificado | Falta acceso Cloudflare | Baja |
| Framework preset Cloudflare Pages | No verificado | Falta acceso Cloudflare | Baja |
| Sitio publico `capacita.cl` | WordPress/PHP detras de Cloudflare, no evidencia de Pages | HTTP HEAD publico | Media |

## Branch/deployment controls

| Control | Valor detectado | Riesgo para push de rama | Observacion |
|---|---|---:|---|
| Production branch GitHub | `main` | Alto si se toca `main` | No se toco `main` |
| Production branch Cloudflare Pages | No verificado | Desconocido | Confirmar en Cloudflare Pages > Settings > Builds & deployments |
| Automatic production deployments | No verificado | Desconocido | Confirmar si Cloudflare esta conectado a `main` |
| Preview deployments | No verificado | Desconocido | Punto critico antes de hacer push |
| Includes/excludes preview | No verificado | Desconocido | Confirmar patrones exactos |
| `docs/html-estatico-safe-audit` | No verificable | Desconocido | Si previews = all non-production, dispararia preview |
| `feature/*` | No verificable | Desconocido | Si previews = all non-production, dispararia preview |
| `feature/html-estatico-docs-base` | No verificable | Desconocido | Si previews = all non-production, dispararia preview |
| `feat/cloudflare-lead-proxy` | Rama remota Astro antigua | Medio/alto si previews activos | Contiene `astro.config.mjs`, `package.json`, `src/**` y cambios de Functions |

## Deployments recientes

Fuente: GitHub Deployments API read-only. Esto no reemplaza la lista de Cloudflare Pages Deployments.

| # | Rama | Commit | Estado | Fecha UTC | Ambiente | Production/preview |
|---:|---|---|---|---|---|---|
| 1 | `main` | `fe34a58` | `success` | 2026-05-29T05:36:24Z | `github-pages` | No indicado por GitHub |
| 2 | `main` | `6e7d2d7` | success no consultado individualmente | 2026-05-29T05:33:38Z | `github-pages` | No indicado por GitHub |
| 3 | `main` | `3d3e8d4` | success no consultado individualmente | 2026-05-29T05:28:14Z | `github-pages` | No indicado por GitHub |
| 4 | `main` | `8e4275d` | success no consultado individualmente | 2026-05-18T04:25:47Z | `github-pages` | No indicado por GitHub |
| 5 | `main` | `62fb060` | success no consultado individualmente | 2026-05-11T05:07:47Z | `github-pages` | No indicado por GitHub |
| 6 | `main` | `f3279a1` | success no consultado individualmente | 2026-05-05T01:51:33Z | `github-pages` | No indicado por GitHub |
| 7 | `main` | `e95c66b` | success no consultado individualmente | 2026-05-05T00:38:13Z | `github-pages` | No indicado por GitHub |
| 8 | `main` | `dae3144` | success no consultado individualmente | 2026-04-29T07:47:41Z | `github-pages` | No indicado por GitHub |
| 9 | `main` | `c7fc5a4` | success no consultado individualmente | 2026-04-29T07:46:07Z | `github-pages` | No indicado por GitHub |
| 10 | `main` | `503a33b` | success no consultado individualmente | 2026-04-29T07:42:43Z | `github-pages` | No indicado por GitHub |

Deteccion de ramas Astro: en GitHub Deployments visibles no aparecen deployments de `feat/cloudflare-lead-proxy`. Esa rama si contiene una migracion Astro amplia y debe tratarse como riesgosa si Cloudflare Pages tiene previews automaticos para ramas no productivas.

## Dominios

| Dominio | Estado detectado | Apunta a Pages project | Evidencia |
|---|---|---|---|
| `capacita.cl` | Activo detras de Cloudflare | No confirmado; evidencia publica sugiere que no sirve desde Pages | A records Cloudflare `[CLOUDFLARE_PROXY_IP_REDACTED]` x2; HTTP WordPress/PHP |
| `www.capacita.cl` | Activo detras de Cloudflare; redirige a apex | No confirmado; evidencia publica sugiere que no sirve desde Pages | A records Cloudflare; HTTP 301 WordPress a `https://capacita.cl/` |
| `*.pages.dev` | No detectado publicamente | No verificado | Busqueda publica no encontro `capacita-edge.pages.dev` |
| Aliases/rutas especiales | No verificado | No verificado | Requiere consola Cloudflare |

## Variables y secrets

No se leyeron ni revelaron valores de secrets. Solo se identificaron nombres esperados desde el codigo local.

| Nombre | Uso en repo | Production | Preview | Observacion |
|---|---|---|---|---|
| `TURNSTILE_SECRET` | `functions/api/forms/lead.js` verifica token Turnstile | No verificado | No verificado | Requerido para `/api/forms/lead` |
| `ZOHO_LEAD_FORM_URL` | `functions/api/forms/lead.js` envia lead a Zoho | No verificado | No verificado | Requerido para `/api/forms/lead` |

Riesgo especifico: si estos secrets existen solo en production y no en preview, un preview de Pages podria desplegar pero romper el formulario `/api/forms/lead`.

## Turnstile

| Item | Estado | Observacion |
|---|---|---|
| Widgets relacionados con `capacita.cl` | No verificado | Requiere Cloudflare Dashboard/API |
| Dominios autorizados | No verificado | Confirmar que incluya `capacita.cl`; evaluar previews `*.pages.dev` solo si se desean pruebas |
| Sitekeys publicas visibles | No detectadas en codigo auditado | Algunas paginas tienen placeholders o cargan script Turnstile |
| Secret keys | No reveladas | No se intento leer secretos |
| Rotacion requerida | No determinable | Rotar solo si hay exposicion, fuga o sospecha operacional |

## Workers / Pages Functions

| Item | Estado detectado | Observacion |
|---|---|---|
| Pages Functions en repo | Si | Existe `functions/api/forms/lead.js` |
| Endpoint `/api/forms/lead` | Depende de Pages Functions | Los formularios `landing-empresas.html` y `landing-empresas-excel.html` usan `action="/api/forms/lead"` |
| Worker separado relacionado | No verificado | Requiere Cloudflare Dashboard/API |
| Rutas Worker asociadas | No verificado | Requiere Cloudflare Dashboard/API |
| Dependencias runtime | `TURNSTILE_SECRET`, `ZOHO_LEAD_FORM_URL` | Si faltan, el endpoint falla |

## Riesgos

| Riesgo | Nivel | Detalle |
|---|---:|---|
| Deploy automatico por rama | Desconocido | Depende de Branch deployment controls en Cloudflare Pages, no verificados |
| Preview publico no deseado | Medio/alto hasta verificar | Si previews = all non-production, un push de cualquier rama puede crear URL publica |
| Variables faltantes | Medio | `/api/forms/lead` requiere secrets; si faltan en preview o production, el formulario falla |
| Secrets solo en production | Medio | Previews pueden fallar si no tienen variables equivalentes |
| Rama Astro antigua conectada | Alto si previews activos | `feat/cloudflare-lead-proxy` contiene migracion Astro y cambios extensos |
| Dominio production roto por rama | Bajo si no se toca `main` | GitHub default es `main`; production normalmente sigue `main`, pero Cloudflare debe confirmarse |
| `capacita.cl` en Pages project | Bajo segun evidencia publica, no concluyente | El sitio responde como WordPress/PHP, no como Pages |

## Recomendacion de rama segura

La rama mas segura para trabajar sin tocar produccion es una rama local nueva sin push, por ejemplo:

`docs/html-estatico-safe-audit`

Antes de hacer push, confirmar manualmente en Cloudflare Pages que los previews esten desactivados o restringidos de forma explicita. Si no se puede confirmar, mantener el trabajo local o usar un fork/repositorio separado para evitar cualquier trigger de Pages.

Evitar usar o empujar `feat/cloudflare-lead-proxy` para pruebas casuales: contiene una migracion Astro amplia y cambios de Functions.

## Acciones manuales requeridas antes de hacer push

1. Abrir Cloudflare Dashboard > Workers & Pages > Pages project conectado a `capacita-edge`.
2. Confirmar nombre del proyecto, repo conectado, production branch, build command, output directory, root directory y framework preset.
3. Revisar Settings > Builds & deployments > Branch control.
4. Confirmar si Preview deployments esta en `None`, `All non-Production branches` o `Custom branches`.
5. Si se desea evitar previews, configurar manualmente `None` o includes/excludes que excluyan `docs/html-estatico-safe-audit`, `feature/*` y `feature/html-estatico-docs-base`.
6. Revisar Variables and Secrets, listando solo nombres, y confirmar `TURNSTILE_SECRET` y `ZOHO_LEAD_FORM_URL` en production y preview segun corresponda.
7. Revisar Turnstile widgets para dominios autorizados de `capacita.cl` y decidir si `*.pages.dev` debe estar permitido.
8. Revisar Workers routes para confirmar que no haya Worker separado interceptando `/api/forms/lead`.
9. Revisar ultimos 10 deployments en Cloudflare Pages y confirmar si hubo deploys de ramas Astro.
10. Solo despues de esas verificaciones, decidir si hacer push de una rama no productiva.

## Validacion minima

| Control | Resultado |
|---|---|
| No se modifico Cloudflare | Confirmado desde esta sesion: no hubo acceso Cloudflare con capacidad de escritura |
| No hubo deploy | Confirmado: no se ejecuto build, Pages deploy, Wrangler deploy ni push |
| No hubo cambio DNS | Confirmado: solo consultas DNS/HTTP publicas |
| No hubo cambio de variables/secrets | Confirmado: no se leyeron ni modificaron valores |
| No se revelaron secrets | Confirmado: solo se listaron nombres esperados por codigo |
| No hubo push | Confirmado: no se ejecuto `git push` |
| No se toco `main` | Confirmado: no hubo checkout, merge ni commit sobre `main` |
| No se modificaron HTML, Functions ni sitemap | Confirmado: solo se creo este reporte en `docs/` |

