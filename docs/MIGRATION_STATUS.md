# Migration Status

Estado actual de la migración HTML_ESTATICO del repo `capacita-edge` (rama `feature/html-estatico-docs-base`).

**Fecha**: 2026-06-05  
**Rama**: `feature/html-estatico-docs-base`  
**Última actualización**: 2026-06-05 14:35 UTC

---

## Resumen ejecutivo

**Estado general**: 🟡 En progreso - Fase 2/Validación

- ✅ Arquitectura Worker validada y segura
- ✅ 2/5 landings funcionales en producción
- ⏳ 3/5 landings requieren correcciones críticas
- ⏳ Documentación base creada completa
- ❌ DNS cutover: No planificado antes de Q3 2026

### Scorecard

| Ítem | Completo | Bloqueador | Responsable | ETA |
|------|----------|-----------|-------------|-----|
| Auditoría Cloudflare | ✅ 100% | ❌ No | Equipo | Completado |
| Worker source audit | ✅ 100% | ❌ No | Equipo | Completado |
| Documentación base | ✅ 100% | ❌ No | Equipo | Completado |
| Landing empresas.html | ✅ 80% | ❌ No | Equipo | Completado |
| Landing empresas-excel.html | ✅ 80% | ❌ No | Equipo | Completado |
| Landing powerbi12-elearning.html | ❌ 0% | ✅ SÍ - Placeholders | Equipo | 2026-06-07 |
| Landing excel12-presencial.html | ⚠️ 50% | ✅ SÍ - No Turnstile | Equipo | 2026-06-14 |
| Landing excel12-elearning.html | ⚠️ 50% | ✅ SÍ - No Turnstile | Equipo | 2026-06-14 |
| Validación end-to-end | ⏳ 0% | ✅ SÍ - Require landings | Equipo | 2026-06-21 |
| Soft launch | ⏳ 0% | ✅ SÍ - Require validación | Equipo | 2026-07-01 |
| DNS cutover | ❌ 0% | ✅ SÍ - NO ANTES Q3 | TBD | TBD |

---

## Qué se auditó

### ✅ Completado

1. **Cloudflare Pages + Worker**
   - Account state: No datos sensibles encontrados públicamente
   - Pages project: `capacita-edge` deployado y funcional
   - Worker `capacita-edge-router`: Auditado read-only, proxy pattern confirmado
   - Rutas capturadas: 4 landings identificadas

2. **Formularios y seguridad**
   - Flujo Turnstile: Validación server-side confirmada en `functions/api/forms/lead.js`
   - Honeypot: Implementado en landings empresariales
   - Anti-bot: Conforme con auditoría Cloudflare

3. **Tracking y analytics**
   - GTM-52J4PSR: Presente en todas las landings
   - Zoho PageSense: Cargado correctamente
   - UTM tracking: Campos hidden identificados

4. **Documentación base**
   - 10 archivos de documentación creados
   - Cobertura: Arquitectura, forms, tracking, bloques, design tokens, backlog

---

## Qué está seguro

### 🟢 Landings funcionales

#### landing-empresas.html
- ✅ Action: `/api/forms/lead` (server-side validation)
- ✅ Turnstile: Real sitekey `0x4AAAAAACyxbmmxJx_EtyEr`
- ✅ Honeypot: `hp_field` implementado
- ✅ Campos hidden: Completos
- ✅ Formulario: Enviable a Zoho
- **Estado**: Funcional, listo para auditoría completa

#### landing-empresas-excel.html
- ✅ Idéntico a landing-empresas.html
- ✅ Action: `/api/forms/lead`
- ✅ Turnstile: Real
- ✅ Honeypot: Presente
- **Estado**: Funcional, listo para auditoría completa

### 🟡 Landings parciales

#### landing-excel12-presencial.html
- ✅ Formulario HTML válido
- ❌ Action: Zoho directo (sin validación server-side)
- ❌ Turnstile: Ausente
- ❌ Honeypot: Ausente
- **Riesgo**: Spammeable (alto)
- **Corrección requerida**: Migrar a `/api/forms/lead` + Turnstile
- **Prioridad**: Alta

#### landing-excel12-elearning.html
- ✅ Formulario HTML válido
- ❌ Action: Zoho directo (sin validación server-side)
- ❌ Turnstile: Ausente
- ❌ Honeypot: Ausente
- **Riesgo**: Spammeable (alto)
- **Corrección requerida**: Migrar a `/api/forms/lead` + Turnstile
- **Prioridad**: Alta

### 🔴 Landings rotas

#### landing-powerbi12-elearning.html
- ❌ Action: Placeholder `REEMPLAZAR_ACTION_ZOHO_O_WORKER`
- ❌ Sitekey: Placeholder `REEMPLAZAR_SITEKEY_TURNSTILE`
- ❌ Formulario: No funciona (placeholders sin reemplazar)
- **Riesgo**: Crítica (no envía en absoluto)
- **Corrección requerida**: Reemplazar placeholders inmediatamente
- **Prioridad**: Crítica

---

## Qué falta

### 🔴 Bloqueadores críticos (antes de Fase 3)

1. **landing-powerbi12-elearning.html**: Reemplazar 2 placeholders
   - `action="/api/forms/lead"` (decidir)
   - `data-sitekey="0x4AAAAAACyxbmmxJx_EtyEr"` (real)
   - **ETA**: 2026-06-07 (2 días)

2. **landing-excel12-presencial.html + landing-excel12-elearning.html**: Migrar a `/api/forms/lead`
   - Cambiar action
   - Agregar Turnstile widget
   - Agregar honeypot
   - **ETA**: 2026-06-14 (9 días)

### 🟡 Validación end-to-end (antes de Fase 4)

1. **Prueba completa de cada landing**:
   - Cargar landing
   - Rellenar formulario
   - Enviar
   - Turnstile/honeypot funciona
   - Redirect ?lead=ok#registro
   - Zoho recibe lead
   - Analytics captura evento

2. **Lighthouse + performance**:
   - Score 80+ en móvil
   - Imágenes optimizadas
   - No hay errores de console

3. **SEO validación**:
   - Canonical URL correcta
   - Sitemap actualizado
   - Schema.org presente

**ETA**: 2026-06-21 (16 días)

---

## Próximos pasos ordenados

### Semana 1 (2026-06-05 a 2026-06-07)

**Objetivo**: Arreglar landing Power BI

- [ ] Reemplazar `action="/api/forms/lead"` en landing-powerbi12-elearning.html
- [ ] Confirmar sitekey `0x4AAAAAACyxbmmxJx_EtyEr` en Cloudflare
- [ ] Prueba de envío: Rellenar → enviar → Zoho recibe
- [ ] Validar Lighthouse 80+
- [ ] Documentar cambios en CHANGELOG.md

**Responsable**: Equipo dev  
**Status**: No iniciado

---

### Semana 2-3 (2026-06-08 a 2026-06-21)

**Objetivo**: Migrar landings Excel a `/api/forms/lead`

- [ ] landing-excel12-presencial.html:
  - [ ] Cambiar action a `/api/forms/lead`
  - [ ] Agregar Turnstile widget con sitekey real
  - [ ] Agregar honeypot `hp_field`
  - [ ] Agregar campos hidden de tracking
  - [ ] Prueba de envío OK

- [ ] landing-excel12-elearning.html: (idéntico)

- [ ] Validación todas las landings:
  - [ ] DEPLOYMENT_CHECKLIST completado
  - [ ] Lighthouse 80+ en móvil
  - [ ] Analytics funciona
  - [ ] Sitemap.xml actualizado

**Responsable**: Equipo dev  
**Status**: No iniciado

---

### Semana 4 (2026-06-22 a 2026-06-28)

**Objetivo**: Preparar soft launch

- [ ] Monitoring setup:
  - [ ] Cloudflare Analytics alertas
  - [ ] Error rate > 5%
  - [ ] Form failures monitoring
  - [ ] Slack notifications

- [ ] Documentación final:
  - [ ] RUNBOOK.md (how to deploy, how to troubleshoot)
  - [ ] ROLLBACK_PLAN validado
  - [ ] Team training

- [ ] Soft launch planning:
  - [ ] Decidir 10% tráfico a Cloudflare Pages
  - [ ] Preparar traffic split en Worker
  - [ ] Test failover

**Responsable**: Equipo ops  
**Status**: No iniciado

---

### Semana 5+ (2026-07-01+)

**Objetivo**: Soft launch y ramp-up (SIN DNS cutover)

- [ ] Semana 1: 10% tráfico a Pages
- [ ] Monitoreo 24h: Errores? Conversión ↓?
- [ ] Si OK: Semana 2: 50% tráfico
- [ ] Si OK: Semana 3: 100% tráfico (sin cambiar DNS)
- [ ] Mantener WordPress como fallback indefinidamente

**Responsable**: Equipo ops + team lead  
**Status**: No iniciado

---

## Decisión sobre DNS cutover

### Recomendación
**❌ NO hacer DNS cutover en junio.**

Razones:
- Cloudflare Pages + Workers: Nueva arquitectura, requiere 1-3 meses estabilidad
- WordPress: Fallback seguro, sigue funcionando
- Marketing campaigns: No dependen de Pages (yet)
- Risk/benefit: Riesgo alto, benefit bajo en corto plazo

### Cuándo reconsiderar
- Después de 3 meses operando Pages con 100% tráfico exitoso
- Después de Q3 2026 (mínimo)
- Cuando todo Cloudflare ecosystem sea 100% confiable
- Cuando WordPress sea "legacy" y Pages sea "primary"

---

## Documentación completada

✅ Documentos creados en `/docs`:

1. PROJECT_CONTEXT.md - Contexto general del proyecto
2. BLOCK_LIBRARY.md - Bloques reutilizables identificados
3. DESIGN_TOKENS.md - Tokens visuales
4. LANDING_VARIABLES.md - Variables de formularios
5. TRACKING_AND_UTM.md - Tracking y analytics
6. FORMS_AND_INTEGRATIONS.md - Integración con Zoho y Turnstile
7. LANDINGS_BACKLOG.md - Backlog de landings futuras
8. FORM_FLOW_ARCHITECTURE.md - Arquitectura del flujo de formularios
9. TURNSTILE_FORM_AUDIT.md - Auditoría de Turnstile por landing
10. ZOHOFORMS_FIELD_MAP.md - Mapeo de campos Zoho
11. GLOBAL_MENU_INJECTION.md - Plan de inyección de menú (futuro)
12. ZOHO_DYNAMIC_UPDATE_BACKLOG.md - Sincronización Zoho dinámica (futuro, post-14 junio)
13. URL_REDIRECT_MAP.md - Mapa de URLs y redirects
14. DEPLOYMENT_CHECKLIST.md - Checklist de despliegue
15. CUTOVER_PLAN.md - Plan de migración de fases
16. ROLLBACK_PLAN.md - Plan de reversión ante fallos

---

## Riesgos remanentes

| Riesgo | Severidad | Probabilidad | Mitigación |
|--------|-----------|--------------|-----------|
| Landing Power BI rota | 🔴 Alta | 🔴 Alta (estado actual) | Arreglar antes del 7 de junio |
| Landings Excel sin Turnstile | 🟠 Media | 🟠 Media | Migrar antes del 14 de junio |
| Form submissions bajan 10%+ | 🔴 Alta | 🟡 Media (nueva arquitectura) | Testing exhaustivo antes de deploy |
| Turno de Turnstile requiere rekey | 🟠 Media | 🟡 Media | Mantener sitekey en Cloudflare con TTL alto |
| DNS outage en Cloudflare | 🔴 Alta | 🟢 Baja (Cloudflare SLA 99.99%) | Mantener WordPress fallback |
| WordPress offline durante migration | 🔴 Alta | 🟢 Baja (si no se toca) | No tocar WordPress ahora |

---

## Métricas de éxito

Post-despliegue validar:
- ✅ 99.5% uptime en landings
- ✅ Form submission rate ≥ baseline (no < -5%)
- ✅ Lighthouse score 80+ en móvil
- ✅ GTM/GA4 data completa
- ✅ Zoho recibe 100% de leads
- ✅ Redirect 301 working
- ✅ Sitemap válido y indexado

---

## Notas y aclaraciones

### Rama y código
- **Rama activa**: `feature/html-estatico-docs-base`
- **Cambios**: Solo en `/docs` (documentación)
- **HTML productivo**: Sin cambios (pendientes correcciones)
- **Main**: No tocado, no mergeado

### Secretos y seguridad
- ❌ TURNSTILE_SECRET no en HTML ni en repo
- ❌ ZOHO_LEAD_FORM_URL no en HTML ni en repo
- ✅ Valores en Cloudflare Pages Variables (ambiente)
- ✅ Worker source audit completado sin exposición

### Testing
- Todas las pruebas manuales, sin automatización actual
- Script de testing manual propuesto en DEPLOYMENT_CHECKLIST.md

---

## Contactos

| Rol | Contacto | Notas |
|-----|----------|-------|
| Project Lead | [TBD] | Decisiones finales |
| Tech Lead | [TBD] | Auditoría arquitectura |
| Dev Team | [TBD] | Implementación |
| Ops Team | [TBD] | Deployment y monitoring |

---

## Changelog

| Fecha | Acción | Responsable | Status |
|-------|--------|------------|--------|
| 2026-06-05 | Crear MIGRATION_STATUS.md (este doc) | Equipo | ✅ Completado |
| 2026-06-05 | Crear 10 docs base | Equipo | ✅ Completado |
| 2026-06-07 | Arreglar landing Power BI | [TBD] | ⏳ Pendiente |
| 2026-06-14 | Migrar landings Excel | [TBD] | ⏳ Pendiente |
| 2026-06-21 | Validación end-to-end | [TBD] | ⏳ Pendiente |
| 2026-06-28 | Soft launch planning | [TBD] | ⏳ Pendiente |
| 2026-07-01 | Soft launch (10% tráfico) | [TBD] | ⏳ Pendiente |

---

**Documento: MIGRATION_STATUS.md**  
**Versión**: 1.0  
**Última revisión**: 2026-06-05  
**Próxima revisión**: 2026-06-07
