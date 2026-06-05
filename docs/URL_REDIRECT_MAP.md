# URL Redirect Map

Mapeo de URLs de WordPress actual → HTML_ESTATICO, con decisiones de migración y rutas de redirect.

## Rutas conocidas servidas o preparadas para Worker

Estas rutas están interceptadas por `capacita-edge-router` y apuntan a Cloudflare Pages.

> Nota: si la URL pública ya es la ruta final, la columna "URL nueva" debe repetir la misma URL y "Redirect" debe marcarse como "no aplica".

| URL actual | Landing | Decision | URL nueva | Redirect | Razón SEO | Prioridad | Estado |
|-----------|---------|----------|-----------|----------|-----------|-----------|---------|
| /curso-de-excel-presencial-en-santiago | landing-excel12-presencial.html | Mantener | /curso-de-excel-presencial-en-santiago | no aplica | Ruta final canónica | Alta | Legacy funcional temporal; no tocar en esta fase |
| /curso-de-excel-basico-intermedio-online-sincronico | landing-excel12-elearning.html | Mantener | /curso-de-excel-basico-intermedio-online-sincronico | no aplica | Ruta final canónica | Alta | Legacy funcional temporal; no tocar en esta fase |
| /cursos-para-empresas | landing-empresas.html | Mantener | /cursos-para-empresas | no aplica | Ruta final canónica | Media | ✅ Funcional |
| /curso-empresa-excel | landing-empresas-excel.html | Mantener | /curso-empresa-excel | no aplica | Ruta final canónica | Media | ✅ Funcional |
| /curso-power-bi-basico-intermedio-online-sincronico | landing-powerbi12-elearning.html | Preparar publicación controlada | /curso-power-bi-basico-intermedio-online-sincronico | no aplica | Ruta final canónica | Alta | Preparado para publicación controlada / pendiente activar Worker real |

## Rutas pendientes / no publicadas

Estas rutas todavía no están activas en el Worker y no deben contarse como URLs servidas actualmente por Worker.

| URL esperada | Landing | Estado | Nota |
|-------------|---------|--------|------|
| /curso-power-bi-empresas | landing-powerbi12-elearning.html | No publicar en esta fase | Ruta alternativa descartada para este hito; usar `/curso-power-bi-basico-intermedio-online-sincronico` como ruta canónica preparada |

## Rutas WordPress antiguas (potencialmente obsoletas)

| URL WordPress | Landing destino | Decision | Razón | Prioridad | Acción |
|-----------|---------|----------|-------|-----------|--------|
| /landing-excel-presencial | landing-excel12-presencial.html | Eliminar | Slug antiguo | Baja | Redirect 301 a nuevo |
| /landing-excel-online | landing-excel12-elearning.html | Eliminar | Slug antiguo | Baja | Redirect 301 a nuevo |
| /landing-empresas-vieja | Ninguna | Eliminar | Reemplazada | Baja | Redirect 301 a /cursos-para-empresas |
| /producto/excel | landing-excel12-presencial.html | Eliminar | Estructura antigua | Baja | Redirect 301 a nuevo |

## Sitemap

| Ruta | Estática | Servida por | Cambio requerido | Estado |
|-----|----------|-----------|---|---|
| /sitemap_index.xml | ✅ Sí | Worker Pages proxy | Ninguno | ✅ Funcional |
| /sitemap-estatico.xml | ✅ Sí | Worker Pages proxy | Agrega Power BI | Preparado para publicación controlada |
| /sitemap-wordpress.xml | N/A | WordPress directo | Ninguno | N/A |

## Rutas API (no públicas)

| Ruta | Destino | Validación | Estado |
|-----|---------|-----------|---------|
| /api/forms/lead | Cloudflare Pages Function | Turnstile + honeypot | ✅ Funcional |
| /api/forms/download | Cloudflare Pages Function | [POR_CONFIRMAR] | [POR_CONFIRMAR] |
| /api/landing-config/* | Cloudflare Pages Function | [POR_CONFIRMAR] | [POR_CONFIRMAR] |

## Rutas a mantener en WordPress (no migradas)

| URL WordPress | Razón | Cambio requerido | Estado |
|-----------|-------|---|---------|
| / (homepage) | Punto de entrada principal | No migrar ahora | ✅ Funcional |
| /blog | Contenido editorial | Evaluar después | ✅ Funcional |
| /about | Información corporativa | Posible menú global | ⏳ Futuro |
| /contact | Página de contacto | Posible formulario dinámico | ⏳ Futuro |
| /terminos-y-condiciones | Legal requerido | Mantener en WordPress | ✅ Funcional |
| /politica-privacidad | Legal requerido | Mantener en WordPress | ✅ Funcional |

## Reglas de redirect en Worker

Implementadas en `capacita-edge-router`:

```javascript
// Ruta: /curso-de-excel-presencial-en-santiago
if (path === '/curso-de-excel-presencial-en-santiago') {
  return fetch('https://capacita-edge.pages.dev/landing-excel12-presencial', options);
}

// Ruta: /curso-de-excel-basico-intermedio-online-sincronico
if (path === '/curso-de-excel-basico-intermedio-online-sincronico') {
  return fetch('https://capacita-edge.pages.dev/landing-excel12-elearning', options);
}

// Ruta: /cursos-para-empresas
if (path === '/cursos-para-empresas') {
  return fetch('https://capacita-edge.pages.dev/landing-empresas', options);
}

// Ruta: /curso-empresa-excel
if (path === '/curso-empresa-excel') {
  return fetch('https://capacita-edge.pages.dev/landing-empresas-excel.html', options);
}

// Ruta: /curso-power-bi-basico-intermedio-online-sincronico
if (path === '/curso-power-bi-basico-intermedio-online-sincronico') {
  return fetch('https://capacita-edge.pages.dev/landing-powerbi12-elearning.html', options);
}

// Rutas no capturadas → WordPress
return fetch(origin + request.url);
```

## SEO: Cambios necesarios

### Canonical URL
Cada landing tiene `<link rel="canonical">` que apunta a su URL canonical en `/`:
```html
<link rel="canonical" href="https://capacita.cl/curso-de-excel-presencial-en-santiago">
```

### Sitemap
- `/sitemap-estatico.xml` lista todas las URLs de landings
- `/sitemap_index.xml` referencia ambos sitemaps (estatico + wordpress)

### 301 Redirects
Configurar redirects 301 permanentes para URLs antiguas → nuevas.

**Implementación**: Agregar en Worker o DNS:
```
/landing-excel-presencial → /curso-de-excel-presencial-en-santiago (301)
/landing-excel-online → /curso-de-excel-basico-intermedio-online-sincronico (301)
/landing-powerbi12-elearning.html → /curso-power-bi-basico-intermedio-online-sincronico (301)
```

## Decisión operativa Power BI

Power BI queda preparado para publicación controlada en `/curso-power-bi-basico-intermedio-online-sincronico`. Este repositorio solo contiene `docs/WORKER_ROUTER_SOURCE.sanitized.js`; falta aplicar el cambio equivalente en el Worker real de Cloudflare en un paso posterior controlado. No hacer deploy manual desde este PR.

Excel presencial y Excel e-learning quedan como legacy funcional temporal y no se tocan en esta fase.

## Procedimiento de migración de URL

Para migrar una nueva landing:

1. **Determinar URL nueva** (slug WordPress o estático)
2. **Agregar ruta en Worker** (reescritura a Pages)
3. **Validar canonical URL** en landing HTML
4. **Agregar a sitemap-estatico.xml**
5. **Crear redirect 301** desde URLs antiguas
6. **Esperar 30 días** antes de eliminar URL antigua
7. **Validar GSC** (Google Search Console) que redirect se procesó
8. **Eliminar URL antigua** de WordPress si ya no es referenciada

## Testing de redirects

Verificar que redirect 301 funciona:
```bash
curl -I https://capacita.cl/landing-excel-presencial
# Debe mostrar: HTTP/1.1 301 Moved Permanently
# Location: https://capacita.cl/curso-de-excel-presencial-en-santiago
```

Verificar que landing se carga:
```bash
curl -I https://capacita.cl/curso-de-excel-presencial-en-santiago
# Debe mostrar: HTTP/1.1 200 OK
# Content-Type: text/html
```

## Próximos pasos

1. [ ] Auditar todas las URLs WordPress actuales
2. [ ] Decidir para cada URL: migrar / mantener / eliminar
3. [ ] Documentar URLs a migrar en futuro
4. [ ] Configurar Worker con reescrituras
5. [ ] Validar sitemap
6. [ ] Probar redirects 301
7. [ ] Enviar cambios a Google Search Console
8. [ ] Monitorear hits a URLs antiguas en analytics

## Estado

- **Rutas activas servidas por Worker**: 4
- **Power BI**: preparado para publicación controlada / pendiente activar Worker real
- **Rutas pendientes**: 2+ (futuras landings)
- **Rutas a eliminar**: 5+ (URLs WordPress antiguas)
- **Prioridad**: Media (después de validar landings actuales)
