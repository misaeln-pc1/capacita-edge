# Rollback Plan

Plan de reversión en caso de fallo crítico durante migración o después de despliegue.

## Escenarios de rollback

### Escenario 1: Landing HTML rota (Antes del despliegue)
**Síntoma**: Landing HTML no valida, formulario no funciona.

**Acción**:
1. No desplegar
2. Arreglar HTML localmente
3. Validar con validator.w3.org
4. Prueba de envío OK
5. Desplegar nuevamente

**Tiempo de rollback**: 0 minutos (no se desplegó).

---

### Escenario 2: Form submissions fallan después de despliegue (Fase 2/3)
**Síntoma**: Usuarios ven error 502 al enviar, Zoho no recibe leads.

**Causa probable**:
- `/api/forms/lead` offline
- TURNSTILE_SECRET no configurado
- ZOHO_LEAD_FORM_URL incorrecto
- Zoho endpoint caído

**Acción inmediata**:
1. Revisar Cloudflare Pages Functions dashboard
   - ¿La función está deployada?
   - ¿Hay errores en logs?
2. Revisar Cloudflare Pages Variables
   - ¿TURNSTILE_SECRET existe?
   - ¿ZOHO_LEAD_FORM_URL es válida?
3. Verificar que Zoho está up (ping endpoint)

**Rollback si no se puede arreglar en < 30 min**:
1. Modificar Worker: redirigir landing a fallback
   ```javascript
   // En capacita-edge-router:
   if (path === '/cursos-para-empresas') {
     // Enviar directamente a WordPress
     return fetch(origin + request.url, options);
   }
   ```
2. Deployar cambio del Worker (< 1 min)
3. Landing ahora usa formulario Zoho directo (sin validación server-side)
4. Usuarios pueden seguir registrándose
5. Revisar /api/forms/lead en segundo plano

**Tiempo de rollback**: ~5 minutos.

---

### Escenario 3: Turnstile no funciona (Fase 2/3)
**Síntoma**: Widget Turnstile no aparece, usuarios ven "Error de verificación".

**Causa probable**:
- data-sitekey inválido o placeholder no reemplazado
- Sitekey no autorizado para dominio capacita.cl
- CDN Turnstile caído
- CORS bloqueado

**Acción inmediata**:
1. Revisar landing HTML
   - ¿data-sitekey es válido? (debe ser `0x4AAAAAACyxbmmxJx_EtyEr` o similar)
   - ¿No es placeholder `REEMPLAZAR_SITEKEY_TURNSTILE`?
2. Verificar Cloudflare console
   - ¿Sitekey autorizado para capacita.cl?
   - ¿Sitekey activo y no disabled?

**Rollback si no se puede arreglar en < 30 min**:
1. Cambiar formulario action a Zoho directo (sin Turnstile)
   ```html
   <form action="https://forms.zohopublic.com/capacita736/form/.../htmlRecords/submit" method="POST">
     <!-- sin Turnstile widget -->
   </form>
   ```
2. Remover honeypot validación del JS (si estaba)
3. Desplegar (< 1 min)
4. Landing funciona sin protección anti-bot temporalmente
5. Revisar Turnstile config en segundo plano

**Tiempo de rollback**: ~15 minutos.

---

### Escenario 4: Performance degradada (Fase 3/4)
**Síntoma**: Landing tarda > 5 segundos en cargar, Lighthouse < 60.

**Causa probable**:
- Images no optimizadas
- JavaScript bundle demasiado grande
- Terceros (GTM, PageSense) no async
- Cloudflare cache no configurado

**Acción inmediata**:
1. Revisar Cloudflare Analytics
   - ¿TTFB es lento? (Network issue)
   - ¿Rendering lento? (JavaScript issue)
2. Ejecutar Lighthouse en incógnito
   - ¿Performance < 60?
   - ¿Qué métrica específica falla?
3. Revisar tamaño de assets:
   - Images: `du -sh assets/img/`
   - CSS: `wc -c bundle.css`
   - JS: `wc -c bundle.js`

**Rollback si no se puede arreglar en < 1 hora**:
1. Revertir cambios últimos a landing HTML
   - Remover images de bajo valor
   - Minificar JS/CSS
   - Reorder scripts: críticos primero
   - Lazy load images
2. Desplegar (< 1 min)
3. Re-run Lighthouse, confirmar 80+
4. Optimizar en segundo plano

**Tiempo de rollback**: ~30 minutos.

---

### Escenario 5: Analytics no captura eventos (Fase 2/3)
**Síntoma**: Landing visible pero Google Analytics no registra pageviews, GTM no dispara eventos.

**Causa probable**:
- Google Tag Manager ID incorrecto
- GTM script tiene error sintáctico
- dataLayer push tiene error
- PageSense script bloqueado por CSP

**Acción inmediata**:
1. Revisar landing HTML
   - ¿GTM ID es `GTM-52J4PSR`?
   - ¿Script cargado antes de `</head>`?
2. Abrir DevTools Console
   - ¿Hay errores JavaScript?
   - ¿`window.dataLayer` existe?
3. Revisar Google Tag Manager dashboard
   - ¿Contenedor deployed?
   - ¿Tag de GA4 activo?

**Rollback si no se puede arreglar en < 30 min**:
- Analytics no es crítico para conversión
- Landing sigue siendo deployable
- Arreglar analytics en segundo plano sin rollback
- ¿Necesario rollback? No, conversiones siguen registrándose en Zoho

**Tiempo de rollback**: 0 minutos (no bloquea).

---

### Escenario 6: Worker proxy falla (Fase 3/4)
**Síntoma**: Landing URL retorna 404 o 502, usuario redirigido a WordPress.

**Causa probable**:
- Ruta no coincide en Worker
- Pages Functions offline
- Cloudflare outage
- Worker tiene error en rewrite

**Acción inmediata**:
1. Revisar Cloudflare Workers dashboard
   - ¿Hay errores en logs?
   - ¿Worker status es "Deployed"?
2. Revisar ruta específica en Worker code
   - ¿Ruta exacta: `/cursos-para-empresas` vs `/cursos-para-empresas/`?
   - ¿Regex coincide?
3. Test directo:
   ```bash
   curl -H "Host: capacita.cl" https://capacita-edge.pages.dev/landing-empresas.html
   ```

**Rollback si no se puede arreglar en < 30 min**:
1. Comentar ruta en Worker temporalmente
   ```javascript
   // if (path === '/cursos-para-empresas') {
   //   return fetch('https://capacita-edge.pages.dev/landing-empresas.html');
   // }
   ```
2. Deploy Worker (< 30 seg)
3. Landing ahora redirige a WordPress (fallback)
4. Revisar Worker config en segundo plano

**Tiempo de rollback**: ~5 minutos.

---

### Escenario 7: DNS cutover fallido (Fase 4)
**Síntoma**: Después de cambiar nameservers, capacita.cl no responde o responde lentamente.

**Causa probable**:
- Cloudflare nameservers no correctos
- DNS propagación incompleta
- Worker sin fallback a WordPress
- WordPress offline

**Acción inmediata**:
1. Verificar DNS con `dig`
   ```bash
   dig capacita.cl +short
   dig capacita.cl NS +short
   ```
2. Verificar que Cloudflare nameservers están correctos
3. Esperar 5-10 minutos para propagación
4. Verificar que Worker tiene fallback a WordPress
   ```javascript
   // Último else debe ir a WordPress
   return fetch(origin + request.url, options);
   ```

**Rollback si no se puede arreglar en < 60 min**:
1. **REVERSA DNS**: Cambiar nameservers de vuelta al registrador anterior
   - Ir a Domain Registrar (GoDaddy, Namecheap, etc.)
   - Cambiar NS records a valores anteriores
   - Esperar 5-30 minutos propagación
2. capacita.cl ahora apunta a WordPress nuevamente
3. Revisar Cloudflare config en segundo plano
4. Esperar 24-48h antes de reintentar

**Tiempo de rollback**: ~60 minutos (propagación DNS).

---

## General rollback procedure

### Paso 1: Confirmar fallo
- Síntoma claramente reproducible
- No es problema del usuario (limpiar cache, probar incógnito)
- Fallo afecta > 1% de visitantes

### Paso 2: Determinar alcance
- ¿Fallo en 1 landing o todas?
- ¿Fallo en formulario o en todo el sitio?
- ¿Fallo es permanente o intermitente?

### Paso 3: Ejecutar rollback específico
- Usar procedure del escenario que coincida
- Seguir pasos en orden
- No improvisar cambios

### Paso 4: Validar rollback
- Landing funciona nuevamente
- Usuarios pueden acceder
- Formularios funcionan (Zoho o directo)
- Analytics capturan eventos

### Paso 5: Post-mortem (24h después)
- ¿Qué causó el fallo?
- ¿Cómo se podría haber evitado?
- ¿Qué cambios previenen futuro?
- Documentar en CHANGELOG.md

---

## Rollback checklist

Para cada rollback:
- [ ] Sé qué escenario es (ver arriba)
- [ ] Tengo acceso a Cloudflare console
- [ ] Tengo acceso a Worker code (GitHub)
- [ ] He comunicado a team (Slack)
- [ ] He ejecutado pasos del escenario
- [ ] He validado que rollback funcionó
- [ ] He confirmado que usuarios pueden acceder
- [ ] He confirmado que formularios funcionan
- [ ] He documentado qué pasó en CHANGELOG.md

---

## Prevención de rollbacks futuros

### Testing antes de despliegue
- [ ] Validar HTML con validator.w3.org
- [ ] Probar formulario end-to-end
- [ ] Probar en 3 navegadores (Chrome, Firefox, Safari)
- [ ] Probar en móvil (5G + WiFi)
- [ ] Validar Lighthouse 80+
- [ ] Validar no hay secretos en HTML

### Monitoring post-despliegue
- [ ] Alertas de error rate > 5%
- [ ] Alertas de Lighthouse < 60
- [ ] Alertas de form failures > 10/hora
- [ ] Alertas de Worker timeout
- [ ] Manual check a las 1h, 4h, 24h post-despliegue

### Documentación
- [ ] DEPLOYMENT_CHECKLIST completada
- [ ] ROLLBACK_PLAN revisado
- [ ] CHANGELOG.md actualizado
- [ ] Team entrenado en rollback

---

## Contactos de emergencia

| Rol | Contacto | Disponibilidad |
|-----|----------|---|
| Cloudflare Admin | [TBD] | 24/7 |
| DNS Registrar | [TBD] | 24/7 |
| WordPress Admin | [TBD] | Office hours |
| Zoho Admin | [TBD] | Office hours |
| Team Lead | [TBD] | On-call |

---

## Histórico de rollbacks

| Fecha | Escenario | Causa | Tiempo | Resultado |
|-------|-----------|-------|--------|-----------|
| - | - | - | - | - |

(A completar cuando ocurran rollbacks reales)
