# Rescate Selectivo desde Astro

Este documento resume la estrategia de rescate para el bloque estático desde el proyecto Astro local.

## Contexto
- Se rescataron ideas de la estructura de bloques listada en la solicitud.
- No se copió el proyecto Astro completo.
- No se utilizó `src/`, `.astro`, `package.json`, `package-lock.json`, `astro.config.mjs`, `dist/` ni `node_modules/`.
- Solo se crearon archivos estáticos en `blocks/`, documentación en `docs/` y datos de ejemplo en `data/landings/`.

## Alcance
- Se generaron bloques HTML estáticos con IDs semánticos.
- Se reemplazaron valores dinámicos por placeholders `{{...}}`.
- Se mantuvo la lógica de formulario sin importar datos productivos.

## Regla clave
- Los formularios nuevos deben apuntar a `/api/forms/lead` y contener el campo honeypot `hp_field`.
- En HTML estático, Turnstile solo debe usarse con `{{PUBLIC_TURNSTILE_SITEKEY}}` si se incorpora.
