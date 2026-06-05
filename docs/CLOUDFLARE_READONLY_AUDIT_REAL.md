# Cloudflare Read-Only Audit (Real)

## Resumen ejecutivo

- Cuenta Cloudflare detectada: `[CLOUDFLARE_ACCOUNT_REDACTED]`
- Pages project detectado: `capacita-edge`
- No hay dominios Pages personalizados para `capacita.cl` o `www.capacita.cl`
- El proyecto Pages usa `capacita-edge.pages.dev` como dominio principal
- Existe un Worker `capacita-edge-router` con ruta `capacita.cl/*`
- Variables/secrets detectadas por nombre: `PUBLISH_TOKEN`, `TURNSTILE_SECRET`, `ZOHO_LEAD_FORM_URL`
- No se revelaron valores secretos
- Exploración realizada sólo con métodos `GET`
- No se modificó Cloudflare, no se hizo deploy, no se cambió DNS y no se tocó `main`

## 1. Cuentas Cloudflare disponibles

- Cuenta: `[CLOUDFLARE_ACCOUNT_REDACTED]`
- Account ID parcial: `1000****************a5f`
- Permisos visibles en zona `capacita.cl`: lectura de zona, dominios, workers, DNS, analytics, etc.

## 2. Proyectos Pages encontrados

### Project: `capacita-edge`

- Nombre del proyecto: `capacita-edge`
- Subdominio Pages: `capacita-edge.pages.dev`
- Repositorio conectado:
  - Owner: `misaeln-pc1`
  - Repo: `capacita-edge`
- Branch de producción: `main`
- Build command: `exit 0`
- Output directory: `` (vacío)
- Root directory: `` (vacío)
- Framework preset: no definido explícitamente en la metadata

## 3. Controles de branch y preview

- `production_branch`: `main`
- `preview_deployment_setting`: `all`
- `preview_branch_includes`: `[*]`
- `preview_branch_excludes`: `[]`
- `path_excludes`: `astro-app/*`
- `path_includes`: `[*]`

### Interpretación

- Las ramas no principales están habilitadas para preview deployments.
- No hay exclusiones de ramas específicas.
- Se excluye únicamente el path `astro-app/*`, lo cual puede afectar ramas que dependan de contenido dentro de `astro-app/`.

## 4. Últimos deployments

Los últimos deployments observados para `capacita-edge` son todos en:
- Entorno: `production`
- Branch: `main`
- Estado: `success`
- Fecha: mayo 2026

### Ejemplos recientes

- `2026-05-29T05:36:01Z` - branch `main` - commit `fe34a589...` - producción
- `2026-05-29T05:33:10Z` - branch `main` - commit `6e7d2d74...` - producción
- `2026-05-29T05:27:50Z` - branch `main` - commit `3d3e8d41...` - producción
- `2026-05-18T04:25:25Z` - branch `main` - commit `8e4275dc...` - producción
- `2026-05-11T05:07:22Z` - branch `main` - commit `62fb0604...` - producción

> Observación: los deployments listados son todos producción en `main`. No se encontraron deployments de preview en los registros retornados.

## 5. Dominios Pages y custom domains

- Custom domains de Pages encontrados: ninguno
- Dominios Pages asociados al proyecto: `capacita-edge.pages.dev`
- No se halló `capacita.cl` ni `www.capacita.cl` en la lista de dominios Pages

## 6. Variables / secrets por nombre

Variables presentes en Pages:
- `PUBLISH_TOKEN`
- `TURNSTILE_SECRET`
- `ZOHO_LEAD_FORM_URL`

> Estas variables aparecen como `secret_text` en producción y preview. No se expusieron valores.

## 7. Turnstile widgets

- Se intentó consultar `GET /accounts/{account_id}/challenges/widgets`
- Resultado: error de autenticación
- Conclusión: no se pudo verificar Turnstile widgets desde esta sesión. Puede faltar permiso de lectura para el endpoint `challenges/widgets`.

## 8. Workers y rutas relacionados

### Worker detectado
- Script: `capacita-edge-router`
- Ruta: `capacita.cl/*`
- Zona: `capacita.cl`

### Observaciones
- La ruta `capacita.cl/*` está vinculada a un Worker, lo que sugiere que el dominio `capacita.cl` está gestionado por ese Worker.
- El proyecto Pages `capacita-edge` no tiene dominios personalizados directos para `capacita.cl`; esto sugiere que la integración con `capacita.cl` puede ocurrir mediante Worker y no como alias de Pages.

## 9. Riesgos

### Riesgo de hacer push a `feature/html-estatico-docs-base`
- Riesgo bajo-moderado para el Pages project, porque preview deployments están habilitados para todas las ramas.
- Riesgo moderado en integración general porque `capacita.cl` está cubierto por un Worker route, y no podemos confirmar la lógica interna del Worker con acceso sólo a metadatos.

### Riesgo de hacer push a `feature/*`
- Riesgo moderado: las ramas están configuradas para generar previews, pero la presencia del Worker `capacita-edge-router` en `capacita.cl/*` requiere revisar su comportamiento antes de asumir que no impacta producción.

### Riesgo de ramas Astro antiguas
- Hay un `path_excludes` de `astro-app/*` en la configuración de Pages.
- Cualquier rama que dependa de `astro-app/*` podría no ser desplegada en previews, por lo que existe riesgo de que contenido Astro antiguo no esté cubierto por las previews automáticas.

## 10. Recomendación

- **Estado general:** no se detectan cambios directos en DNS ni en la configuración de Pages que apunten a `capacita.cl` como custom domain.
- **Recomendación:** `requiere ajuste manual previo`.
- **Motivo:** el proyecto Pages está configurado para previews en todas las ramas y la producción está en `main`, pero `capacita.cl` se encuentra detrás de un Worker route. Antes de trabajar en producción, conviene revisar la lógica del Worker `capacita-edge-router` y confirmar cómo consume el proyecto Pages.

## Validación de cumplimiento

- Solo se usaron métodos `GET`.
- No se modificó Cloudflare.
- No se creó ningún deploy.
- No se cambió DNS.
- No se revelaron valores de secrets.
- No se hizo push.
- No se tocó `main`.
