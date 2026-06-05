# DATA MODEL LANDING V1

Este documento describe la plantilla de datos para landings estáticas version 1.

## Estructura principal
- `landing_key`: identificador único de la landing.
- `title`: título SEO del curso.
- `description`: descripción corta para la landing.
- `course_fit`: contenido del bloque `perfil-recomendado-curso`.
- `infrastructure`: contenido del bloque `infraestructura`.
- `benefits`: contenido del bloque `beneficios`.
- `syllabus`: contenido del bloque `temario`.
- `payment_options`: contenido del bloque `formas-de-pago`.
- `testimonials`: contenido del bloque `testimonios`.
- `clients`: contenido del bloque `clientes`.
- `location`: contenido del bloque `ubicacion`.
- `quality_seals`: contenido del bloque `sellos-calidad`.

## Ejemplo de campos
- `course_fit.title`
- `course_fit.description`
- `course_fit.criteria`
- `infrastructure.title`
- `infrastructure.images`
- `benefits.cards`
- `syllabus.modules`
- `payment_options.methods`
- `testimonials.items`
- `clients.logos`
- `location.google_maps_url`
- `quality_seals.items`

## Notas
- Los valores de imagen deben usar rutas absolutas o URLs sanitizadas.
- No se debe incluir ningún secreto en la sección de datos.
- El modelo debe ser fácil de consumir desde plantillas estáticas.
