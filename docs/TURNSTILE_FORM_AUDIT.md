# Turnstile Form Audit

Tabla de auditoría de configuración Turnstile y formularios en cada landing.

## Resumen por landing

| Landing | Archivo | Action actual | /api/forms/lead | Zoho directo | Turnstile presente | Sitekey | Honeypot | Hidden fields tracking | Compatible | Riesgo | Corrección requerida | Estado |
|---------|---------|---|---|---|---|---|---|---|---|---|---|---|
| Empresas | landing-empresas.html | `/api/forms/lead` | ✅ | ❌ | ✅ | Real: `0x4AAAAAACyxbmmxJx_EtyEr` | ✅ hp_field | ✅ | ✅ | 🟢 Bajo | No aplica | ✅ Funcional |
| Empresas Excel | landing-empresas-excel.html | `/api/forms/lead` | ✅ | ❌ | ✅ | Real: `0x4AAAAAACyxbmmxJx_EtyEr` | ✅ hp_field | ✅ | ✅ | 🟢 Bajo | No aplica | ✅ Funcional |
| Excel Presencial | landing-excel12-presencial.html | Zoho directo | ❌ | ✅ | ❌ | Ausente | ❌ | ✅ | ❌ | 🔴 Alto | Migrar a `/api/forms/lead` + Turnstile | ⚠️ Comercial pero no seguro |
| Excel E-learning | landing-excel12-elearning.html | Zoho directo | ❌ | ✅ | ❌ | Ausente | ❌ | ✅ | ❌ | 🔴 Alto | Migrar a `/api/forms/lead` + Turnstile | ⚠️ Comercial pero no seguro |
| Power BI E-learning | landing-powerbi12-elearning.html | REEMPLAZAR_ACTION_ZOHO_O_WORKER | [POR_CONFIRMAR] | [POR_CONFIRMAR] | Parcial | REEMPLAZAR_SITEKEY_TURNSTILE | ✅ company_website | ✅ | ❌ | 🔴 Rota | Reemplazar placeholders | ❌ Rota |

## Detalles por landing

### ✅ landing-empresas.html
**Referencia de flujo seguro recomendado**

```html
<form action="/api/forms/lead" method="POST">
  <input type="text" name="hp_field" id="hp_field" tabindex="-1">
  <div class="cf-turnstile" data-sitekey="0x4AAAAAACyxbmmxJx_EtyEr"></div>
  <!-- campos visibles: nombre, email, teléfono, etc. -->
  <!-- campos ocultos: utm_source, landing_code, device, etc. -->
</form>
```

- **Validación**: Server-side Turnstile + honeypot
- **Normalización**: URLs normalizadas en Function
- **Protección**: Bot-proof
- **Auditoría**: Centralizada en Pages Function
- **Recomendación**: Usar como plantilla para nuevas landings

### ✅ landing-empresas-excel.html
**Igual a landing-empresas.html**

Idéntica configuración segura. Ambas son referencias válidas.

### ⚠️ landing-excel12-presencial.html
**Comercialmente funcional pero no seguro**

```html
<form action="https://forms.zohopublic.com/capacita736/form/CursodeExcelBasicoIntermedio/formperma/..." method="POST">
  <!-- campos visibles y ocultos se envían directamente a Zoho -->
</form>
```

**Problemas**:
- Sin validación server-side
- Sin Turnstile verificado
- Sin honeypot real (puede tener en JS pero no protege)
- Spammeable

**Corrección requerida**:
1. Cambiar action a `/api/forms/lead`
2. Agregar Turnstile cliente
3. Agregar honeypot HTML
4. Validar en `functions/api/forms/lead.js` que existe TURNSTILE_SECRET y ZOHO_LEAD_FORM_URL

**Prueba después**:
- Enviar formulario valido → debe redirigir con ?lead=ok#registro
- Enviar con Turnstile inválido → debe rechazar
- Enviar con honeypot relleno → debe rechazar

### ⚠️ landing-excel12-elearning.html
**Comercialmente funcional pero no seguro**

Igual problema que `landing-excel12-presencial.html`.

**Corrección**: Idéntica al anterior.

### ❌ landing-powerbi12-elearning.html
**Rota con placeholders**

```html
<form id="zoho-native-form" action="REEMPLAZAR_ACTION_ZOHO_O_WORKER" method="POST">
  <!-- honeypot: company_website -->
  <div class="cf-turnstile"
       data-sitekey="REEMPLAZAR_SITEKEY_TURNSTILE"
       data-response-field-name="cf-turnstile-response"></div>
</form>
```

**Problemas**:
- `action` tiene placeholder sin reemplazar
- `data-sitekey` tiene placeholder sin reemplazar
- Formulario no funciona en estado actual
- Script valida honeypot pero form no envía a ningún lado

**Corrección requerida**:
1. Decidir: ¿usar `/api/forms/lead` o Zoho directo?
   - **Recomendación**: `/api/forms/lead` (más seguro)
2. Reemplazar `action="/api/forms/lead"`
3. Reemplazar `data-sitekey="0x4AAAAAACyxbmmxJx_EtyEr"`
4. Validar que TURNSTILE_SECRET y ZOHO_LEAD_FORM_URL existan en Cloudflare

**Validación**: Igual que excel12-presencial.

## Campos esperados en formulario

### Token Turnstile
- **Campo**: `cf-turnstile-response`
- **Generado por**: `<div class="cf-turnstile"></div>`
- **Validado por**: `/api/forms/lead` en servidor
- **Requerido**: Sí

### Honeypot
- **Campo**: `hp_field` (recomendado) o `company_website` (usado en Power BI)
- **Atributos**: `type="text"`, `tabindex="-1"`, `autocomplete="off"`
- **Oculto a**: Humanos (CSS o JS)
- **Relleno por**: Bots simples
- **Validación**: Debe estar vacío

### Campos de captura
- `SingleLine` (nombre)
- `Email` (correo)
- `PhoneNumber_countrycode` (teléfono)
- `MultiLine` (mensaje)

### Campos de tracking (hidden)
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
- `gclid`, `fbclid`, `msclkid`
- `landing_code`
- `Website` (URL actual)
- `Website1` (referrer)
- `user_agent`
- `user_language`
- `dispositivo`
- etc.

## Checklist de auditoría para nueva landing

- [ ] ¿Tiene action="/api/forms/lead"?
- [ ] ¿Tiene Turnstile con sitekey real (no placeholder)?
- [ ] ¿Tiene honeypot HTML con tabindex="-1"?
- [ ] ¿Tiene campos de captura (nombre, email, teléfono)?
- [ ] ¿Tiene campos ocultos de tracking (utm_source, landing_code, etc.)?
- [ ] ¿Se valida en servidor FormData Turnstile antes de relay?
- [ ] ¿Se normalizan URLs en servidor antes de relay a Zoho?
- [ ] ¿Se eliminan campos internos (cf-turnstile-response, hp_field) antes de relay?
- [ ] ¿Redirect final incluye ?lead=ok#registro?
- [ ] ¿Se prueba exitosamente con Turnstile real?
- [ ] ¿Se prueba que rechaza honeypot relleno?
- [ ] ¿Se prueba que rechaza Turnstile inválido?

## Riesgo remanente

| Landing | Riesgo | Mitigación |
|---------|--------|-----------|
| landing-empresas.html | 🟢 Bajo | Mantener. Validación centralizada. |
| landing-empresas-excel.html | 🟢 Bajo | Mantener. Validación centralizada. |
| landing-excel12-presencial.html | 🔴 Alto | Urgente: migrar a `/api/forms/lead` + Turnstile. |
| landing-excel12-elearning.html | 🔴 Alto | Urgente: migrar a `/api/forms/lead` + Turnstile. |
| landing-powerbi12-elearning.html | 🔴 Crítica | Urgente: reemplazar placeholders. |

## Próximas acciones

1. **Inmediato**: Reemplazar placeholders en `landing-powerbi12-elearning.html`.
2. **Corto plazo**: Migrar Excel y Power BI a flujo seguro `/api/forms/lead` + Turnstile.
3. **Validación**: Auditar cada cambio con pruebas de envío.
4. **Documentación**: Actualizar ZOHOFORMS_FIELD_MAP.md con campos específicos por landing.
