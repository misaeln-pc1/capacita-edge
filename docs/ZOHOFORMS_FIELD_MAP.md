# Zoho Forms Field Map

Documentación de campos reales detectados en formularios de HTML_ESTATICO.

## Convención de capas

- **Visible**: Usuario ve y rellena
- **Hidden tracking**: Inyectado por JavaScript, usuario no ve
- **Internal**: Procesado por función, no enviado a Zoho
- **[POR_CONFIRMAR]**: Necesita validación en Zoho admin

## Campos de contacto

### Nombre
- **HTML field**: `SingleLine` o `<input name="SingleLine">`
- **Etiqueta típica**: "Nombre"
- **Tipo**: Texto
- **Requerido**: Sí
- **Zoho field**: [POR_CONFIRMAR] Contact Name o SingleLine
- **Ejemplo**: "Juan Pérez"

### Email
- **HTML field**: `Email`
- **Etiqueta típica**: "Correo electrónico"
- **Tipo**: Email
- **Requerido**: Sí
- **Zoho field**: [POR_CONFIRMAR] Email
- **Ejemplo**: "juan@ejemplo.com"

### Teléfono
- **HTML field**: `PhoneNumber_countrycode`
- **Etiqueta típica**: "Teléfono"
- **Tipo**: Tel
- **Requerido**: No
- **Zoho field**: [POR_CONFIRMAR] Phone o PhoneNumber
- **Ejemplo**: "+56912345678"

### Empresa
- **HTML field**: `Company` o `SingleLine2`
- **Etiqueta típica**: "Empresa"
- **Tipo**: Texto
- **Requerido**: No
- **Zoho field**: [POR_CONFIRMAR] Company o SingleLine2
- **Ejemplo**: "Acme Inc."

### Mensaje / Consulta
- **HTML field**: `MultiLine`
- **Etiqueta típica**: "Mensaje"
- **Tipo**: Textarea
- **Requerido**: No
- **Zoho field**: [POR_CONFIRMAR] Description o MultiLine
- **Ejemplo**: "Me interesa más información sobre..."

## Campos de producto / interés

### Código de landing
- **HTML field**: `landing_code` (hidden)
- **Inyección**: JavaScript desde `window.location.pathname`
- **Tipo**: Texto
- **Zoho mapping**: [POR_CONFIRMAR] SingleLine3 o Landing_Code
- **Ejemplo**: "curso-excel-presencial", "cursos-empresas"
- **Nota**: Identifica qué landing genera el lead

### URL de landing
- **HTML field**: `Website` (hidden)
- **Inyección**: JavaScript desde `window.location.href`
- **Tipo**: URL
- **Zoho mapping**: [POR_CONFIRMAR] Website
- **Ejemplo**: "https://capacita.cl/curso-excel-presencial?utm_source=google"
- **Nota**: Se normaliza en `/api/forms/lead`

### Referrer
- **HTML field**: `Website1` (hidden) / `referente`
- **Inyección**: JavaScript desde `document.referrer`
- **Tipo**: URL
- **Zoho mapping**: [POR_CONFIRMAR] Website1 o Referrer
- **Ejemplo**: "https://google.com/search?q=excel"
- **Nota**: Se normaliza en `/api/forms/lead` a `zf_referrer_name`

## Campos de tracking UTM

Todos hidden, inyectados por JavaScript desde `window.location.search`.

| Campo HTML | Parámetro URL | Zoho field | Ejemplo | Nota |
|-----------|---|---|---|---|
| `utm_source` | utm_source | [POR_CONFIRMAR] UTM_Source | google | Origen del tráfico |
| `utm_medium` | utm_medium | [POR_CONFIRMAR] UTM_Medium | cpc | Medio (cpc, organic, social, email) |
| `utm_campaign` | utm_campaign | [POR_CONFIRMAR] UTM_Campaign | verano-2026 | Nombre de campaña |
| `utm_term` | utm_term | [POR_CONFIRMAR] UTM_Term | "excel basico" | Palabra clave (si pagada) |
| `utm_content` | utm_content | [POR_CONFIRMAR] UTM_Content | bannner-hero | Variante de creativo |
| `utm_id` | utm_id | [POR_CONFIRMAR] UTM_ID | [POR_CONFIRMAR] | ID único de campaña |

## Campos de tracking avanzado

Todos hidden, inyectados por JavaScript.

| Campo HTML | Fuente | Tipo | Zoho field | Ejemplo |
|-----------|--------|---|---|---|
| `gclid` | URL param | String | [POR_CONFIRMAR] GCLID | (Google Ads) |
| `fbclid` | URL param | String | [POR_CONFIRMAR] FBCLID | (Facebook Ads) |
| `msclkid` | URL param | String | [POR_CONFIRMAR] MSCLKID | (Microsoft Ads) |
| `li_fat_id` | URL param | String | [POR_CONFIRMAR] LI_FAT_ID | (LinkedIn) |
| `ttclid` | URL param | String | [POR_CONFIRMAR] TTCLID | (TikTok) |
| `wbraid` | URL param | String | [POR_CONFIRMAR] WBRAID | (Google) |
| `gbraid` | URL param | String | [POR_CONFIRMAR] GBRAID | (Google) |

## Campos técnicos del dispositivo

Todos hidden, inyectados por JavaScript.

| Campo HTML | Fuente | Zoho field | Ejemplo | Uso |
|-----------|--------|---|---|---|
| `dispositivo` | Navigator User Agent | [POR_CONFIRMAR] Dispositivo | Mobile, Desktop | Tipo de dispositivo |
| `user_agent` | Navigator User Agent | [POR_CONFIRMAR] User_Agent | Mozilla/5.0... | Detalle del navegador |
| `user_language` | Navigator Language | [POR_CONFIRMAR] User_Language | es-CL, es, en | Idioma del navegador |

## Campos de fecha/hora captura

Todos hidden, inyectados por JavaScript en el momento del envío.

| Campo HTML | Fuente | Formato | Zoho field | Ejemplo |
|-----------|--------|---|---|---|
| `DateTime_date` | new Date() | YYYY-MM-DD | [POR_CONFIRMAR] | 2026-06-05 |
| `DateTime_hours` | new Date() | HH (00-23) | [POR_CONFIRMAR] | 14 |
| `DateTime_minutes` | new Date() | MM (00-59) | [POR_CONFIRMAR] | 35 |
| `DateTime_meridiem` | new Date() | AM/PM | [POR_CONFIRMAR] | PM |

## Campos de geo ubicación [FUTURO]

No implementados actualmente.

| Campo | Tipo | Fuente futura | Nota |
|-------|---|---|---|
| `ciudad_user` | Texto | IP Geolocation API | [POR_CONFIRMAR] |
| `pais_user` | Texto | IP Geolocation API | [POR_CONFIRMAR] |
| `timezone` | Texto | Intl.DateTimeFormat | [POR_CONFIRMAR] |

## Campos internos (NO enviados a Zoho)

Eliminados en `/api/forms/lead` antes del relay.

| Campo | Tipo | Origen | Validación | Nota |
|-------|---|---|---|---|
| `cf-turnstile-response` | Token | Cloudflare Turnstile | Server-side | Removido después de verificación |
| `hp_field` | String (debe estar vacío) | HTML honeypot | Server-side | Removido después de validación |

## Campos Zoho-only (inyectados por Function)

Agregados por `/api/forms/lead` antes de relay a Zoho.

| Campo | Valor | Razón | Ejemplo |
|-------|---|---|---|
| `zf_referrer_name` | Normalizado desde `Website1` | Zoho espera este nombre | https://google.com |
| `zf_redirect_url` | Normalizado desde `Website` | Redirige después de submit | https://capacita.cl/curso-excel?lead=ok |

## Diferencias por landing

### landing-empresas.html
Campos esperados en Zoho:
- Contacto: SingleLine (nombre), Email, PhoneNumber_countrycode, MultiLine (consulta)
- Producto: landing_code, Website, Website1
- Tracking: utm_source, utm_medium, utm_campaign, utm_term, utm_content, utm_id, gclid, fbclid, etc.
- Dispositivo: dispositivo, user_agent, user_language, DateTime_date, DateTime_hours, DateTime_minutes, DateTime_meridiem
- Interno: zf_referrer_name, zf_redirect_url

### landing-empresas-excel.html
Idéntico a landing-empresas.html.

### landing-excel12-presencial.html
**[POR_CONFIRMAR]** Campos específicos en Zoho. Requiere auditoría en consola Zoho.

### landing-excel12-elearning.html
**[POR_CONFIRMAR]** Campos específicos en Zoho. Requiere auditoría en consola Zoho.

### landing-powerbi12-elearning.html
**[POR_CONFIRMAR]** Placeholders no reemplazados, landing rota. Revisar tras corrección.

## Procedimiento de validación

Para confirmar campos en Zoho:
1. Ir a consola Zoho admin
2. Módulo Forms → (landing correspondiente)
3. Revisar "Field Mapping"
4. Reemplazar `[POR_CONFIRMAR]` con valores reales en esta tabla
5. Documentar cambios en CHANGELOG.md

## Auditoría pendiente

- [ ] Confirmar campos exactos en Zoho para landing-empresas.html
- [ ] Confirmar campos exactos en Zoho para landing-excel12-presencial.html
- [ ] Confirmar campos exactos en Zoho para landing-excel12-elearning.html
- [ ] Confirmar comportamiento de normalización de URLs en Functions
- [ ] Confirmar que zf_referrer_name y zf_redirect_url se inyectan correctamente
- [ ] Validar que campos internos no llegan a Zoho
- [ ] Validar que Zoho recibe todos los campos de tracking
