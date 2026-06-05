# Cutover Plan

Plan de migración de landings desde WordPress a Cloudflare Pages + Worker proxy.

## Situación actual

```
capacita.cl (DNS → WordPress)
     ├─ / (WordPress)
     ├─ /blog (WordPress)
     ├─ /curso-de-excel-presencial-en-santiago (WordPress)
     ├─ /curso-de-excel-basico-intermedio-online-sincronico (WordPress)
     ├─ /cursos-para-empresas (WordPress)
     ├─ /curso-empresa-excel (WordPress)
     └─ /curso-power-bi-empresas (WordPress)
```

## Fase 1: Arquitectura dual (ACTUAL)

```
capacita.cl (DNS → WordPress)
     ├─ WordPress rutas estándar
     └─ Worker proxy (en Cloudflare)
         └─ Captura rutas específicas → capacita-edge.pages.dev (Cloudflare Pages)
             ├─ landing-empresas.html
             ├─ landing-empresas-excel.html
             ├─ landing-excel12-presencial.html
             ├─ landing-excel12-elearning.html
             ├─ landing-powerbi12-elearning.html
             └─ otros assets (CSS, JS, imágenes)
```

**Ventaja**: Cero impacto en WordPress, landing fallback garantizado.

**Riesgo**: Si Worker se cae, rutas específicas no responden. Solución: Worker redirecciona a WordPress directo.

## Fase 2: Validación de landings (ACTUAL)

### Criterio: Landing "lista para producción"
1. ✅ HTML válido
2. ✅ Formulario funciona end-to-end
3. ✅ Turnstile / honeypot funcionan
4. ✅ Sendor a Zoho exitoso
5. ✅ Redirect ?lead=ok#registro funciona
6. ✅ Analytics (GTM, PageSense) capturan eventos
7. ✅ Lighthouse 80+ en móvil
8. ✅ Canonical URL correcta
9. ✅ Sitemap actualizado
10. ✅ Checklist deployment completada

### Landings actualmente en Fase 2

| Landing | Completo | Riesgo | Acción |
|---------|----------|--------|--------|
| landing-empresas.html | ✅ 80% | 🟢 Bajo | Validar /api/forms/lead |
| landing-empresas-excel.html | ✅ 80% | 🟢 Bajo | Validar /api/forms/lead |
| landing-excel12-presencial.html | ⚠️ 50% | 🔴 Alto | Migrar a `/api/forms/lead` |
| landing-excel12-elearning.html | ⚠️ 50% | 🔴 Alto | Migrar a `/api/forms/lead` |
| landing-powerbi12-elearning.html | ❌ 0% | 🔴 Crítica | Reemplazar placeholders |

## Fase 3: Migración gradual de landings (FUTURO)

**No tomar decisiones sobre DNS todavía.**

### Timeline estimado

| Week | Acción | Landing | Status |
|------|--------|---------|--------|
| Semana 1 | Arreglar Power BI | landing-powerbi12-elearning.html | Reemplazar placeholders |
| Semana 1-2 | Migrar Excel landings | landing-excel12-* | Mover a `/api/forms/lead` + Turnstile |
| Semana 2-3 | Validación completa | Todas | Pasar DEPLOYMENT_CHECKLIST |
| Semana 3 | Audit interno | Todas | Revisar formularios, analytics, performance |
| Semana 4 | Soft launch (opcional) | 1-2 landings | Tráfico pequeño, monitoreo 24h |
| Semana 5 | Full production | Todas | Si soft launch exitoso |

### Soft launch (recomendado)

Antes de committed a producción, hacer "soft launch" con tráfico limitado:

1. Mantener Worker con rutas específicas
2. Enviar 10% del tráfico a Cloudflare Pages
3. Monitorear errores, performance, leads
4. Si todo bien, aumentar a 50%, luego 100%
5. Mantener WordPress como fallback

**Herramienta**: Cloudflare Load Balancer o Worker traffic splitting.

## Fase 4: DNS cutover (FUTURO - DESPUÉS DE VALIDACIÓN)

**Decisión irreversible**: Cambiar DNS de WordPress a Cloudflare.

```
capacita.cl (DNS → Cloudflare nameservers)
     ├─ Cloudflare Worker
         ├─ /api/* → Cloudflare Pages Functions
         ├─ /curso-* → Cloudflare Pages (landings)
         ├─ /* (fallback) → WordPress origin (todavía en segundo plano)
         └─ Sitemap, robots.txt → Cloudflare Pages
```

**Precondiciones para cutover**:
- ✅ 100% landings validadas
- ✅ 100% formularios funcionando
- ✅ ✅ Analytics correctas
- ✅ 100% Redirect 301 configurados
- ✅ WordPress sigue corriendo como backup
- ✅ Monitoring 24/7 activo
- ✅ Rollback plan probado

**Riesgo de cutover**:
- DNS TTL cambios pueden tardar 24-48h en propagarse
- Si algo falla, volver a DNS viejo
- Usuarios pueden ver versión cacheada de la vieja
- WordPress debe seguir corriendo

## Fase 5: Decomisioning de WordPress (MUCHO FUTURO)

Solo después de 6 meses sin issues:

1. Migrar datos de WordPress necesarios a archivos estáticos
2. Blog → archivos markdown en repo
3. Contacto → función sin WordPress
4. Backend → API functions en Cloudflare
5. Apagar WordPress (guardar backup)

**Nota**: NO planear esto ahora. Esperar que Cloudflare Pages sea 100% confiable.

## Criterios de rollback en cada fase

### Si falla en Fase 2 (validación)
- Arreglar landing HTML/JS
- No afecta a usuarios
- Rollback: simplemente no desplegar

### Si falla en Fase 3 (migración gradual)
- Volver a 0% tráfico en Cloudflare Pages
- Worker redirecciona a WordPress
- DNS sigue apuntando a WordPress
- Rollback: quitar ruta del Worker

### Si falla en Fase 4 (DNS cutover)
- DNS: cambiar nameservers de vuelta a WordPress
- Esperar 24-48h propagación
- Worker queda inútil temporalmente
- Rollback: reversa DNS

### Si falla en Fase 5 (decomisioning)
- Revertir cambios, mantener WordPress
- WordPress está backing todos los requests
- Rollback: restore del backup

## Comunicaciones

### Antes de cutover
- [ ] Notificar al equipo de marketing
- [ ] Notificar al equipo de ventas
- [ ] Notificar a clientes (si aplica)
- [ ] Documentar cambios en MIGRATION_STATUS.md

### Durante cutover
- [ ] Monitoring 24/7 activo
- [ ] Slack notifications setup
- [ ] Status page público (opcional)

### Después de cutover
- [ ] Debriefing con team
- [ ] Documentar lecciones aprendidas
- [ ] Actualizar runbooks

## Métricas de éxito

Después de cutover, confirmar:
- ✅ 99.9% uptime en landings
- ✅ Form submission rate no disminuye > 5%
- ✅ Lighthouse score se mantiene
- ✅ GTM/GA4 data completa
- ✅ Zoho recibe leads correctamente
- ✅ Redirect 301 funciona
- ✅ Sitemap válido

## Checklist pre-cutover

Semana antes de DNS cutover:

- [ ] Todas las landings en DEPLOYMENT_CHECKLIST ✅
- [ ] Todas las landings pasan Lighthouse 80+
- [ ] Todas las landings envían leads a Zoho correctamente
- [ ] Sitemap-estatico.xml contiene todas las landings
- [ ] Sitemap_index.xml referencia ambos sitemaps
- [ ] Redirect 301 configurado en Worker o DNS
- [ ] Monitoring alerts configurados
- [ ] Rollback procedure documentada y probada
- [ ] Team entrenado en rollback
- [ ] DNS TTL reducido a 300s (5 minutos) por 1 semana antes
- [ ] WordPress sigue corriendo y accesible
- [ ] Backup completo de WordPress taken
- [ ] Prueba de failover (simular fallo de Cloudflare): User ve WordPress

## Estado actual

- **Fase**: 2 - Validación
- **Landings funcionales**: 2/5 (empresas, empresas-excel)
- **Landings pendientes**: 3/5 (excel presencial, excel elearning, powerbi)
- **Bloqueos**: Placeholders en Power BI, envío directo a Zoho en Excel
- **Next step**: Arreglar Power BI, migrar Excel a `/api/forms/lead`
- **Estimado para Fase 3**: 2-3 semanas

## No hacer (prohibido hasta post-fase 4)

- ❌ Eliminar WordPress
- ❌ Cambiar DNS permanentemente
- ❌ Cerrar Workers
- ❌ Eliminar landings antiguas de WordPress
- ❌ Dejar sin backup de WordPress
