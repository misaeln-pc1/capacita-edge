# Global Menu Injection

## Premisa

HTML_ESTATICO evita la duplicación de menú global manteniendo landings limpias y enfocadas en conversión.

## Estado actual

Ninguna landing tiene un menú global inyectado automáticamente.

## Decisión de diseño

### Landings comerciales (conversión)
- **Ejemplos**: `landing-empresas.html`, `landing-excel12-*`, `landing-powerbi12-*`
- **Menú global**: NO (confunde usuario, reduce conversión)
- **CTA único**: Formulario de captura de leads

### Páginas institucionales (futuro)
- **Ejemplos**: Página de "Acerca de", "Blog", "Términos"
- **Menú global**: SÍ (navegación necesaria, baja prioridad de conversión)
- **CTA**: Links a landings, información corporativa

## Solución futura

### Marcador estándar

Placeholder que indica dónde irá el menú global:

```html
<!-- SITE_HEADER_SLOT -->
```

### Fuente de menú

Archivo centralizado (futuro):
```
blocks/global/site-header.html
```

Contenido propuesto:
```html
<header class="site-header">
  <nav class="site-nav">
    <a href="/" class="logo">Capacita</a>
    <ul>
      <li><a href="/blog">Blog</a></li>
      <li><a href="/about">Acerca de</a></li>
      <li><a href="/contact">Contacto</a></li>
    </ul>
  </nav>
</header>
```

### Método de inyección

Futuro (no implementar ahora):

**Opción 1: Cloudflare Worker**
```javascript
// En capacita-edge-router
env.HTMLRewriter new HTMLRewriter()
  .on('head', new MenuInjector(env.SITE_HEADER))
  .transform(response)
```

**Opción 2: Cloudflare Pages Function**
```javascript
// Middleware que intercepta respuestas HTML
return new HTMLRewriter()
  .on('head', new PrependHeaderHandler(siteHeader))
  .transform(response)
```

**Opción 3: Server-side en build (Astro/11ty)**
No aplica actualmente (sin framework).

## Reglas de aplicación

### NO inyectar menú en:
- ❌ Landings de captura (`landing-empresas*`, `landing-excel12-*`, `landing-powerbi12-*`)
- ❌ Páginas de descarga con honeypot
- ❌ Rutas API (`/api/*`)
- ❌ Sitemaps XML

### SÍ inyectar menú en:
- ✅ Páginas de información corporativa (futuro)
- ✅ Blog y artículos (futuro)
- ✅ Páginas de error 404 (futuro)
- ✅ Páginas de política / términos (futuro)

## Riesgos de inyección

### Cache
- **Riesgo**: Cache de landing con menú inyectado, después inyectar menú distinto → usuarios ven menú viejo
- **Mitigación**: Versionar menú. Invalidar cache solo cuando menú cambia.

### SEO
- **Riesgo**: Menú global añade links internos no intencionales, afecta PageRank de landing
- **Mitigación**: Links del menú redirigen a landing principal (peso distribuido) o usar `rel="nofollow"` en menú

### Accesibilidad
- **Riesgo**: Menú inyectado sin atributos ARIA rompe screenreaders
- **Mitigación**: Menú debe tener `role="navigation"`, items con `aria-label`, tab order correcto

### Fallback
- **Riesgo**: Menú no carga (fallo de Worker/Function) → landing queda sin header
- **Mitigación**: Landing debe verse correcta incluso sin menú. Menú es mejora, no esencial.

### Breakage
- **Riesgo**: Inyectar en elemento incorrecto, romper CSS, romper JavaScript
- **Mitigación**: Inyectar solo al inicio de `<body>`, usar marcador `<!-- SITE_HEADER_SLOT -->` explícito

## Próximos pasos

1. **Fase 1 (Ahora)**: Documentar patrón, sin inyectar
2. **Fase 2 (Futuro)**: Crear `blocks/global/site-header.html` con menú base
3. **Fase 3 (Futuro)**: Implementar inyección en Worker o Pages Function
4. **Fase 4 (Futuro)**: Validar menú en landings comerciales sin romper conversión
5. **Fase 5 (Futuro)**: Aplicar menú a páginas institucionales

## Checklist de implementación

Para cuando se implemente inyección:

- [ ] ¿Landing tiene `<!-- SITE_HEADER_SLOT -->`?
- [ ] ¿Menú HTML válido y accesible?
- [ ] ¿Menú cargado desde CDN o KV almacenado?
- [ ] ¿Cache invalidado correctamente?
- [ ] ¿SEO no afectado?
- [ ] ¿Fallback funciona si menú no carga?
- [ ] ¿Prueba manual de landing no rota?
- [ ] ¿Links de menú correctos?

## Referencias

- Cloudflare HTMLRewriter: https://developers.cloudflare.com/workers/runtime-apis/html-rewriter/
- Accesibilidad de navegación: https://www.w3.org/WAI/tutorials/menus/
- Cache headers: https://developers.cloudflare.com/workers/runtime-apis/cache/
