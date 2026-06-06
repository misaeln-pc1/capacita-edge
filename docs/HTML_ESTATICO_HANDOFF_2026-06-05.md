# HTML Estatico Handoff - 2026-06-05

## Objetivo del documento

Registrar el cierre del hito HTML estatico / salida de WordPress / Power BI / Excel / formularios / Turnstile / Worker, sin cambiar comportamiento productivo.

Este documento debe permitir continuar el trabajo en otro chat sin perder contexto operativo.

## Regla de carpeta local

Ruta local valida:

```text
C:/Users/TECH/Documents/Proyectos/HTML Estatico/capacita-edge
```

Se detecto antes una estructura duplicada:

```text
C:/Users/TECH/Documents/Proyectos/HTML Estatico/capacita-edge/capacita-edge
```

La carpeta duplicada fue movida a un backup local con nombre similar a:

```text
_backup_capacita-edge-duplicado-...
```

Reglas operativas:

- Abrir siempre VS Code en `C:/Users/TECH/Documents/Proyectos/HTML Estatico/capacita-edge`.
- No abrir la carpeta padre `C:/Users/TECH/Documents/Proyectos/HTML Estatico`.
- No abrir rutas antiguas tipo `capacita-edge/capacita-edge`.

## Estado base del repo

Repositorio GitHub:

```text
origin https://github.com/misaeln-pc1/capacita-edge.git
```

Rama documental de este cierre:

```text
docs/html-estatico-handoff-2026-06-05
```

Base esperada:

```text
main actualizado en 7194f7c7eeb2caa0d0c3016e1bf90bfe919cbfb1
```

## Historial relevante

### PR #5

Objetivo: preparar ruta publica Power BI.

Resultado: mergeado.

Commit final en `main`:

```text
16eac94e869f334548940d93196684cb63ef1e7d
```

Resultado funcional:

- Ruta publica: `/curso-power-bi-basico-intermedio-online-sincronico`.
- Canonical sin slash final.
- Sitemap y Worker sanitizado alineados.
- El Worker real fue actualizado manualmente despues.

### PR #6

Objetivo: reducir friccion visual Turnstile en Power BI.

Resultado: mergeado.

Cambio clave:

```html
data-appearance="interaction-only"
```

### PR #7

Objetivo: estandarizar Turnstile en bloque reusable.

Resultado: cerrado sin merge.

Motivo: fue reemplazado por PR #8 para evitar micro-PRs y consolidar el sprint funcional.

### PR #8

Titulo: WordPress exit functional sprint.

Resultado: mergeado con squash.

Commit final en `main`:

```text
e32c54aa36bb6bfe01fe4693bc4ffd10ed1233ef
```

Cambios principales:

- Migracion de assets desde WordPress a `/assets/img/landings/...`.
- Actualizacion de 5 landings raiz.
- Power BI se mantuvo en `/api/forms/lead`.
- Excel e-learning paso a `/api/forms/lead` con Turnstile `interaction-only`.
- Excel presencial quedo como legacy funcional con Zoho directo.
- Se crearon `docs/WORDPRESS_EXIT_STATUS.md` y `docs/LANDING_PUBLICATION_MATRIX.md`.

### Hotfix posterior directo en main

Commit:

```text
7194f7c7eeb2caa0d0c3016e1bf90bfe919cbfb1
```

Mensaje:

```text
fix: add missing Excel e-learning visual assets
```

Motivo:

`landing-excel12-elearning.html` apuntaba a estos assets locales, pero no existian en el repo:

- `/assets/img/landings/excel-elearning/pantalla-excel-online-1.webp`
- `/assets/img/landings/excel-elearning/pantalla-excel-online-2.webp`
- `/assets/img/landings/excel-elearning/pantalla-excel-online-3.webp`
- `/assets/img/landings/excel-elearning/logo-oficial-capacita.webp`

Solucion:

- Se agregaron esos assets faltantes reutilizando blobs locales ya versionados.

## Estado de formularios

Estado acordado al cierre:

- Power BI: `/api/forms/lead` con Turnstile `interaction-only`.
- Empresas: `/api/forms/lead` con Turnstile `interaction-only`.
- Empresas Excel: `/api/forms/lead` con Turnstile `interaction-only`.
- Excel e-learning: `/api/forms/lead` con Turnstile `interaction-only`.
- Excel presencial: legacy funcional con Zoho directo.

Regla para nuevos formularios:

- Usar `/api/forms/lead`.
- Incluir validacion server-side de Turnstile.
- Usar `data-appearance="interaction-only"` en Turnstile.
- Mantener `hp_field` como honeypot.
- Poblar campos de tracking `Website` / `Website1` cuando aplique.

## Estado de landings publicas

Ver tambien `docs/LANDING_PUBLICATION_MATRIX.md`.

Rutas relevantes:

- `/curso-power-bi-basico-intermedio-online-sincronico`
- `/curso-de-excel-basico-intermedio-online-sincronico`
- `/curso-de-excel-presencial-en-santiago`
- `/cursos-para-empresas`
- `/curso-empresa-excel`

Regla SEO vigente:

- Para cada ruta publicada, canonical HTML, sitemap y Worker deben coincidir.
- Power BI ya fue alineada sin slash final.
- Algunas landings legacy pueden conservar canonical con slash final; corregirlas solo en un hito SEO controlado y no dentro de PRs documentales.
- Mantener sitemap y Worker alineados cuando se publique una nueva ruta.

## Worker real Cloudflare

Se aplico manualmente en el Worker real de Cloudflare una regla critica:

```text
/assets/ debe proxyarse hacia Cloudflare Pages.
```

Motivo:

- Las landings servidas desde `capacita.cl` cargan HTML por Worker.
- Las imagenes locales viven en Cloudflare Pages bajo `capacita-edge.pages.dev`.
- Si el Worker no proxya `/assets/`, entonces `capacita.cl/assets/...` cae al origen WordPress y las imagenes quedan rotas.

Bloque minimo que debe existir en el Worker real:

```js
  // Proxy de assets estaticos servidos desde Cloudflare Pages
  if (path.startsWith('/assets/')) {
    const assetUrl = `${EDGE_URL}${url.pathname}${url.search}`
    return fetch(assetUrl, {
      method: 'GET',
      redirect: 'follow'
    })
  }
```

La copia sanitizada en `docs/WORKER_ROUTER_SOURCE.sanitized.js` debe mantenerse alineada con esta regla cuando se documenten cambios futuros.

## No cambiar en este PR

Este PR de cierre documental no debe cambiar:

- HTML productivo.
- `functions/api/forms/lead.js`.
- Sitemaps productivos.
- Assets.
- Configuracion real de Cloudflare.
- Worker real.
- DNS.

## Continuacion recomendada

1. Validar visualmente las 5 landings publicas desde `capacita.cl`.
2. Confirmar que las imagenes bajo `/assets/img/landings/...` responden via `capacita.cl/assets/...`.
3. Versionar formalmente el Worker real como fuente mantenible en el repo.
4. Mantener Excel presencial como legacy hasta que se programe una migracion explicita a `/api/forms/lead`.
5. Para nuevas landings, actualizar juntos HTML, assets locales, sitemap, Worker sanitizado y matriz de publicacion.
