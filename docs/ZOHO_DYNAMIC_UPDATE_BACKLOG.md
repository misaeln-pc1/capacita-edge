# Zoho Dynamic Update Backlog

## ⚠️ FASE FUTURA — NO IMPLEMENTAR ANTES DEL 14 DE JUNIO

Esta documentación describe una arquitectura futura en la que datos de Zoho CRM (cursos, precios, convocatorias) se sincronizan dinámicamente con landings HTML.

## Objetivo

Eliminar la duplicación manual de información entre Zoho CRM y landings estáticas, permitiendo que cambios en Zoho se reflejen automáticamente en las páginas.

## Módulo Zoho: Cursos

Estructura propuesta en Zoho CRM:

| Campo | Tipo | Ejemplo | Nota |
|-------|---|---|---|
| Nombre | Texto | "Curso de Excel Básico" | Público |
| Código | Texto | "excel-basico-02-2026" | Identificador única |
| Descripción | Textarea | "Aprende Excel desde cero..." | Público |
| Precio | Moneda | $99,990 | Público |
| Modalidad | Picklist | Presencial / Online Sincrónico / Asincrónico | Público |
| Fecha inicio | Fecha | 2026-07-01 | Público |
| Hora inicio | Hora | 09:00 | Público |
| Duración | Texto | "40 horas" | Público |
| Cupos disponibles | Número | 15 | Público |
| Cupos vendidos | Número | 8 | Interno |
| Estado convocatoria | Picklist | Abierta / Cerrada / Completa / Cancelada | Público |
| Formador | Lookup | Juan Pérez | Público |
| Sala / Ubicación | Texto | "Oficina Santigo Centro" o "Zoom" | Público |
| Temario | Textarea | (secciones separadas por línea) | Público |
| Requisitos | Textarea | "Excel nivel intermedio" | Público |

## Datos dinámicos en landing actual

Información fija en HTML (sin sincronización):
```html
<h2>Curso de Excel Básico</h2>
<p>$99,990</p>
<p>Inicio: 1 de julio de 2026</p>
<p>Cupos disponibles: 15</p>
```

## Arquitectura futura propuesta

```
Zoho CRM (Módulo Cursos)
         ↓
Webhook / API trigger
         ↓
Cloudflare Worker / Pages Function
         ├─ fetch() a Zoho API
         ├─ procesa datos
         └─ actualiza destino
         ↓
Destino (elegir uno):
   ├─ Cloudflare KV (cache rápido)
   ├─ Cloudflare R2 (JSON estático)
   └─ Cloudflare D1 (base datos)
         ↓
Landing HTML
         └─ fetch() en cliente (JavaScript)
            └─ consume datos dinámicos
               └─ actualiza DOM
```

## Opciones de implementación

### Opción 1: KV Store (más rápido)
```javascript
// Worker actualiza KV con datos Zoho
const coursesData = await env.COURSES_KV.get('excel-basico-02-2026');
// Landing fetch():
const course = await fetch('/api/courses/excel-basico-02-2026').then(r => r.json());
// Mostrar en HTML con JavaScript
```

**Ventajas**:
- Ultra rápido
- Sin base de datos
- Replicación global

**Desventajas**:
- Sync manual o webhook
- TTL limitado

### Opción 2: R2 (JSON estático)
```javascript
// Worker escribe JSON a R2
await env.BUCKET_R2.put('courses/excel-basico-02-2026.json', courseJSON);
// Landing fetch():
const course = await fetch('https://cdn.example.com/courses/excel-basico-02-2026.json').then(r => r.json());
```

**Ventajas**:
- Versionable
- Histórico
- Respaldo

**Desventajas**:
- Más lento que KV
- Storage limitado

### Opción 3: D1 (Base de datos)
```javascript
// Worker sincroniza D1 desde Zoho
await env.DB.prepare('INSERT INTO courses ...').run(courseData);
// Landing API:
const course = await fetch('/api/courses/excel-basico-02-2026').then(r => r.json());
// Landing fetch():
```

**Ventajas**:
- Consultas SQL potentes
- Relaciones entre tablas
- Auditoría

**Desventajas**:
- Más complejidad
- Latencia de red

## Flujo de sincronización

### Webhook Zoho → Worker
```javascript
// POST /api/courses/sync
export async function onRequestPost(context) {
  const payload = await context.request.json();
  
  // payload.event = 'record.updated'
  // payload.resource.id = Zoho record ID
  
  // 1. Fetch curso completo desde Zoho API
  const course = await fetchFromZoho(payload.resource.id);
  
  // 2. Transformar datos
  const normalized = {
    codigo: course.Nombre_Curso,
    precio: parseInt(course.Precio),
    disponibles: course.Cupos - course.Cupos_Vendidos,
    proxima_fecha: course.Fecha_Inicio,
    estado: course.Estado_Convocatoria
  };
  
  // 3. Guardar en KV/R2/D1
  await env.COURSES_KV.put(
    course.Codigo,
    JSON.stringify(normalized),
    { expirationTtl: 3600 } // 1 hora
  );
  
  return new Response('OK');
}
```

### Landing consume datos
```javascript
// landing-excel12-presencial.html
async function loadCourseData(courseCode) {
  const response = await fetch(`/api/courses/${courseCode}`);
  const course = await response.json();
  
  // Inyectar en DOM
  document.getElementById('course-price').textContent = `$${course.precio.toLocaleString('es-CL')}`;
  document.getElementById('course-next-date').textContent = new Date(course.proxima_fecha).toLocaleDateString('es-CL');
  document.getElementById('course-availability').textContent = `${course.disponibles} cupos`;
  
  // Mostrar aviso si está completo
  if (course.disponibles === 0) {
    document.getElementById('course-sold-out').style.display = 'block';
  }
}

// Ejecutar al cargar
window.addEventListener('load', () => loadCourseData('excel-basico-02-2026'));
```

## Datos a sincronizar por landing

### landing-excel12-presencial.html
- [ ] Precio curso
- [ ] Fecha próxima convocatoria
- [ ] Cupos disponibles
- [ ] Modalidad (presencial)
- [ ] Ubicación / sala
- [ ] Horario

### landing-excel12-elearning.html
- [ ] Precio curso
- [ ] Fechas inicio (ondas)
- [ ] Cupos disponibles por onda
- [ ] Temario (sin riesgo)
- [ ] Duración exacta

### landing-powerbi12-elearning.html
- [ ] Precio curso
- [ ] Fecha próxima convocatoria
- [ ] Cupos disponibles
- [ ] Temario

### landing-empresas.html
- [ ] Precios planes empresa
- [ ] Capacidad actual
- [ ] Disponibilidad de customización

## Riesgos

### Falla de Zoho API
- **Riesgo**: Landing muestra datos viejos o vacíos
- **Mitigación**: Fallback a datos estáticos hardcodeados en HTML

### Latencia de sync
- **Riesgo**: Usuario ve precio viejo en landing
- **Mitigación**: TTL 1 hora máximo, webhook inmediato desde Zoho

### Inconsistencia de datos
- **Riesgo**: KV/R2 desincronizado de Zoho
- **Mitigación**: Timestamp en cada registro, validación antes de mostrar

### Carga extra en API Zoho
- **Riesgo**: Demasiadas llamadas, rate limit
- **Mitigación**: Cachear 1 hora, batch updates, deduplicar webhooks

## Checklist de implementación

Cuando se implemente (DESPUÉS del 14 de junio):

- [ ] ¿Webhook configurado en Zoho?
- [ ] ¿Endpoint `/api/courses/sync` auditado?
- [ ] ¿KV/R2/D1 provisioned y configurado?
- [ ] ¿Landing tiene fallback si fetch falla?
- [ ] ¿Datos sensibles (IDs internos) no expuestos?
- [ ] ¿Rate limit de Zoho respetado?
- [ ] ¿TTL/expiración configurado?
- [ ] ¿Prueba manual: Zoho → landing (5 min)?
- [ ] ¿Prueba manual: sin conexión → fallback funciona?
- [ ] ¿Monitored en Cloudflare Analytics?

## Estado

- **Decisión**: Diferida hasta post-14 de junio
- **Prioridad**: Baja (landings actuales funcionan sin sincronización)
- **Complejidad**: Media (requiere webhook Zoho)
- **Risk**: Bajo (no afecta landings actuales)
- **Beneficio**: Mejora UX, reduce manual updates, escalable

## Referencia

- Cloudflare KV: https://developers.cloudflare.com/workers/runtime-apis/kv/
- Cloudflare R2: https://developers.cloudflare.com/r2/
- Cloudflare D1: https://developers.cloudflare.com/d1/
- Zoho Webhook API: https://www.zoho.com/crm/developer/docs/
