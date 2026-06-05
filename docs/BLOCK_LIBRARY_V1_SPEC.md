# BLOCK LIBRARY V1 SPEC

## Objetivo
Definir el primer set de bloques estáticos para landings basadas en el rescate del proyecto Astro local.

## Bloques generados
- `blocks/course-fit.html` → `id="perfil-recomendado-curso"`
- `blocks/infrastructure-gallery.html` → `id="infraestructura"`
- `blocks/benefits-grid.html` → `id="beneficios"`
- `blocks/syllabus-section.html` → `id="temario"`
- `blocks/payment-options.html` → `id="formas-de-pago"`
- `blocks/testimonials-section.html` → `id="testimonios"`
- `blocks/clients-wall.html` → `id="clientes"`
- `blocks/location-section.html` → `id="ubicacion"`
- `blocks/quality-seals.html` → `id="sellos-calidad"`

## Principios
- Bloques estáticos, sin sintaxis Astro, JSX ni TypeScript.
- Contenido dinámico representado mediante placeholders `{{...}}`.
- Estilos mínimos inline para mantener la estructura y accesibilidad.
- Se mantienen IDs útiles para anclajes y referencias de navegación.

## Convenciones de contenido
- Los valores de texto deben ser reemplazados por variables de datos antes de desplegar.
- Los estilos no deben contener dependencias de frameworks.
- No deben agregarse scripts de interacción más allá de la presentación estática.
