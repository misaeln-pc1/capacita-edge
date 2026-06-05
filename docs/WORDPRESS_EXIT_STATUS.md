# WordPress Exit Status

## Fecha del sprint
2026-06-05

## Objetivo
Reducir dependencia funcional de WordPress migrando imagenes usadas por landings HTML raiz hacia assets locales del repo, manteniendo formularios existentes y sin tocar Cloudflare, DNS, Worker real ni Functions productivas.

## Assets migrados

| Landing | URL WordPress original | Ruta local nueva | Estado |
|---|---|---|---|
| landing-empresas.html | https://capacita.cl/wp-content/uploads/2023/06/sence.jpg | /assets/img/landings/empresas/sence.jpg | migrated |
| landing-empresas.html | https://capacita.cl/wp-content/uploads/2026/04/alumnos-clases-beiersdorf.webp | /assets/img/landings/empresas/alumnos-clases-beiersdorf.webp | migrated |
| landing-empresas.html | https://capacita.cl/wp-content/uploads/2026/04/Cliente-Codelco-logo.webp | /assets/img/landings/empresas/cliente-codelco-logo.webp | migrated |
| landing-empresas.html | https://capacita.cl/wp-content/uploads/2026/04/Cliente-Logo-Lo-barnechea.webp | /assets/img/landings/empresas/cliente-logo-lo-barnechea.webp | migrated |
| landing-empresas.html | https://capacita.cl/wp-content/uploads/2026/04/Cliente-Logo-NovoFarma.webp | /assets/img/landings/empresas/cliente-logo-novofarma.webp | migrated |
| landing-empresas.html | https://capacita.cl/wp-content/uploads/2026/04/Cliente-Logo-Telefonica.webp | /assets/img/landings/empresas/cliente-logo-telefonica.webp | migrated |
| landing-empresas.html | https://capacita.cl/wp-content/uploads/2026/04/Cliente-siemens-logo.webp | /assets/img/landings/empresas/cliente-siemens-logo.webp | migrated from existing local copy |
| landing-empresas.html | https://capacita.cl/wp-content/uploads/2026/04/Cliente-unicef-Logo.webp | /assets/img/landings/empresas/cliente-unicef-logo.webp | migrated |
| landing-empresas.html | https://capacita.cl/wp-content/uploads/2026/04/Cliente-Utalca-logo.webp | /assets/img/landings/empresas/cliente-utalca-logo.webp | migrated |
| landing-empresas.html | https://capacita.cl/wp-content/uploads/2026/04/Cliente-vialcorp-logo.webp | /assets/img/landings/empresas/cliente-vialcorp-logo.webp | migrated |
| landing-empresas.html | https://capacita.cl/wp-content/uploads/2026/04/ejecutiva.webp | /assets/img/landings/empresas/ejecutiva.webp | migrated |
| landing-empresas-excel.html | https://capacita.cl/wp-content/uploads/2020/08/CetChile-logo.png | /assets/img/landings/empresas-excel/cetchile-logo.png | migrated |
| landing-empresas-excel.html | https://capacita.cl/wp-content/uploads/2020/08/covenco-logo.png | /assets/img/landings/empresas-excel/covenco-logo.png | migrated |
| landing-empresas-excel.html | https://capacita.cl/wp-content/uploads/2020/08/Hospitalia-logo.jpg | /assets/img/landings/empresas-excel/hospitalia-logo.jpg | migrated |
| landing-empresas-excel.html | https://capacita.cl/wp-content/uploads/2020/08/NuestrosParques-logo.png | /assets/img/landings/empresas-excel/nuestrosparques-logo.png | migrated |
| landing-empresas-excel.html | https://capacita.cl/wp-content/uploads/2020/08/siemens-logo.png | /assets/img/landings/empresas-excel/siemens-logo.png | migrated |
| landing-empresas-excel.html | https://capacita.cl/wp-content/uploads/2020/08/unicef-Logo.jpg | /assets/img/landings/empresas-excel/unicef-logo.jpg | migrated |
| landing-empresas-excel.html | https://capacita.cl/wp-content/uploads/2020/08/Utalca-logo.png | /assets/img/landings/empresas-excel/utalca-logo.png | migrated |
| landing-empresas-excel.html | https://capacita.cl/wp-content/uploads/2020/08/vialcorp-logo.jpg | /assets/img/landings/empresas-excel/vialcorp-logo.jpg | migrated |
| landing-empresas-excel.html | https://capacita.cl/wp-content/uploads/2023/06/sence.jpg | /assets/img/landings/empresas-excel/sence.jpg | migrated |
| landing-empresas-excel.html | https://capacita.cl/wp-content/uploads/2026/01/BlueExpress-Logo.png | /assets/img/landings/empresas-excel/blueexpress-logo.png | migrated |
| landing-empresas-excel.html | https://capacita.cl/wp-content/uploads/2026/01/Fundacion-Tacal_Logo.jpg | /assets/img/landings/empresas-excel/fundacion-tacal-logo.jpg | migrated |
| landing-empresas-excel.html | https://capacita.cl/wp-content/uploads/2026/01/Heel-Logo.png | /assets/img/landings/empresas-excel/heel-logo.png | migrated |
| landing-empresas-excel.html | https://capacita.cl/wp-content/uploads/2026/01/Logo-Lo-barnechea.jpg | /assets/img/landings/empresas-excel/logo-lo-barnechea.jpg | migrated |
| landing-empresas-excel.html | https://capacita.cl/wp-content/uploads/2026/01/Logo-NovoFarma.jpg | /assets/img/landings/empresas-excel/logo-novofarma.jpg | migrated |
| landing-empresas-excel.html | https://capacita.cl/wp-content/uploads/2026/01/Logo-Oficina-sustentable.webp | /assets/img/landings/empresas-excel/logo-oficina-sustentable.webp | migrated |
| landing-empresas-excel.html | https://capacita.cl/wp-content/uploads/2026/01/Logo-Telefonica.jpg | /assets/img/landings/empresas-excel/logo-telefonica.jpg | migrated |
| landing-empresas-excel.html | https://capacita.cl/wp-content/uploads/2026/01/Sala-de-Clases-Equipada-y-Presencial-1-1.webp | /assets/img/landings/empresas-excel/sala-de-clases-equipada-y-presencial-1-1.webp | migrated |
| landing-empresas-excel.html | https://capacita.cl/wp-content/uploads/2026/01/Sala-de-Clases-Equipada-y-Presencial-2-1.webp | /assets/img/landings/empresas-excel/sala-de-clases-equipada-y-presencial-2-1.webp | migrated |
| landing-empresas-excel.html | https://capacita.cl/wp-content/uploads/2026/01/Sala-de-Clases-Equipada-y-Presencial-3-1.webp | /assets/img/landings/empresas-excel/sala-de-clases-equipada-y-presencial-3-1.webp | migrated |
| landing-empresas-excel.html | https://capacita.cl/wp-content/uploads/2026/01/SELLO_2728-2x-150x150-1-1.webp | /assets/img/landings/empresas-excel/sello-2728-2x-150x150-1-1.webp | migrated |
| landing-empresas-excel.html | https://capacita.cl/wp-content/uploads/2026/01/SELLO-40-HORAS-1-.webp | /assets/img/landings/empresas-excel/sello-40-horas-1.webp | migrated |
| landing-empresas-excel.html | https://capacita.cl/wp-content/uploads/2026/04/alumnos-clases-beiersdorf.webp | /assets/img/landings/empresas-excel/alumnos-clases-beiersdorf.webp | migrated |
| landing-empresas-excel.html | https://capacita.cl/wp-content/uploads/2026/04/Cliente-Codelco-logo.webp | /assets/img/landings/empresas-excel/cliente-codelco-logo.webp | migrated |
| landing-empresas-excel.html | https://capacita.cl/wp-content/uploads/2026/04/ejecutiva.webp | /assets/img/landings/empresas-excel/ejecutiva.webp | migrated |
| landing-excel12-elearning.html | https://capacita.cl/wp-content/uploads/2019/02/Logo_Capacita_850x300-e1602863310152.jpg | /assets/img/landings/excel-elearning/logo-capacita-850x300-e1602863310152.jpg | migrated |
| landing-excel12-elearning.html | https://capacita.cl/wp-content/uploads/2020/08/CetChile-logo.png | /assets/img/landings/excel-elearning/cetchile-logo.png | migrated |
| landing-excel12-elearning.html | https://capacita.cl/wp-content/uploads/2020/08/covenco-logo.png | /assets/img/landings/excel-elearning/covenco-logo.png | migrated |
| landing-excel12-elearning.html | https://capacita.cl/wp-content/uploads/2020/08/Hospitalia-logo.jpg | /assets/img/landings/excel-elearning/hospitalia-logo.jpg | migrated |
| landing-excel12-elearning.html | https://capacita.cl/wp-content/uploads/2020/08/NuestrosParques-logo.png | /assets/img/landings/excel-elearning/nuestrosparques-logo.png | migrated |
| landing-excel12-elearning.html | https://capacita.cl/wp-content/uploads/2020/08/siemens-logo.png | /assets/img/landings/excel-elearning/siemens-logo.png | migrated |
| landing-excel12-elearning.html | https://capacita.cl/wp-content/uploads/2020/08/unicef-Logo.jpg | /assets/img/landings/excel-elearning/unicef-logo.jpg | migrated |
| landing-excel12-elearning.html | https://capacita.cl/wp-content/uploads/2020/08/Utalca-logo.png | /assets/img/landings/excel-elearning/utalca-logo.png | migrated |
| landing-excel12-elearning.html | https://capacita.cl/wp-content/uploads/2020/08/vialcorp-logo.jpg | /assets/img/landings/excel-elearning/vialcorp-logo.jpg | migrated |
| landing-excel12-elearning.html | https://capacita.cl/wp-content/uploads/2026/01/BlueExpress-Logo.png | /assets/img/landings/excel-elearning/blueexpress-logo.png | migrated |
| landing-excel12-elearning.html | https://capacita.cl/wp-content/uploads/2026/01/Fundacion-Tacal_Logo.jpg | /assets/img/landings/excel-elearning/fundacion-tacal-logo.jpg | migrated |
| landing-excel12-elearning.html | https://capacita.cl/wp-content/uploads/2026/01/Heel-Logo.png | /assets/img/landings/excel-elearning/heel-logo.png | migrated |
| landing-excel12-elearning.html | https://capacita.cl/wp-content/uploads/2026/01/Logo-Lo-barnechea.jpg | /assets/img/landings/excel-elearning/logo-lo-barnechea.jpg | migrated |
| landing-excel12-elearning.html | https://capacita.cl/wp-content/uploads/2026/01/Logo-NovoFarma.jpg | /assets/img/landings/excel-elearning/logo-novofarma.jpg | migrated |
| landing-excel12-elearning.html | https://capacita.cl/wp-content/uploads/2026/01/Logo-Oficina-sustentable.webp | /assets/img/landings/excel-elearning/logo-oficina-sustentable.webp | migrated |
| landing-excel12-elearning.html | https://capacita.cl/wp-content/uploads/2026/01/Logo-Telefonica.jpg | /assets/img/landings/excel-elearning/logo-telefonica.jpg | migrated |
| landing-excel12-elearning.html | https://capacita.cl/wp-content/uploads/2026/01/SELLO_2728-2x-150x150-1-1.webp | /assets/img/landings/excel-elearning/sello-2728-2x-150x150-1-1.webp | migrated |
| landing-excel12-elearning.html | https://capacita.cl/wp-content/uploads/2026/01/SELLO-40-HORAS-1-.webp | /assets/img/landings/excel-elearning/sello-40-horas-1.webp | migrated |
| landing-excel12-presencial.html | https://capacita.cl/wp-content/uploads/2019/02/Logo_Capacita_850x300-e1602863310152.jpg | /assets/img/landings/excel-presencial/logo-capacita-850x300-e1602863310152.jpg | migrated |
| landing-excel12-presencial.html | https://capacita.cl/wp-content/uploads/2020/08/CetChile-logo.png | /assets/img/landings/excel-presencial/cetchile-logo.png | migrated |
| landing-excel12-presencial.html | https://capacita.cl/wp-content/uploads/2020/08/covenco-logo.png | /assets/img/landings/excel-presencial/covenco-logo.png | migrated |
| landing-excel12-presencial.html | https://capacita.cl/wp-content/uploads/2020/08/Hospitalia-logo.jpg | /assets/img/landings/excel-presencial/hospitalia-logo.jpg | migrated |
| landing-excel12-presencial.html | https://capacita.cl/wp-content/uploads/2020/08/NuestrosParques-logo.png | /assets/img/landings/excel-presencial/nuestrosparques-logo.png | migrated |
| landing-excel12-presencial.html | https://capacita.cl/wp-content/uploads/2020/08/siemens-logo.png | /assets/img/landings/excel-presencial/siemens-logo.png | migrated |
| landing-excel12-presencial.html | https://capacita.cl/wp-content/uploads/2020/08/unicef-Logo.jpg | /assets/img/landings/excel-presencial/unicef-logo.jpg | migrated |
| landing-excel12-presencial.html | https://capacita.cl/wp-content/uploads/2020/08/Utalca-logo.png | /assets/img/landings/excel-presencial/utalca-logo.png | migrated |
| landing-excel12-presencial.html | https://capacita.cl/wp-content/uploads/2020/08/vialcorp-logo.jpg | /assets/img/landings/excel-presencial/vialcorp-logo.jpg | migrated |
| landing-excel12-presencial.html | https://capacita.cl/wp-content/uploads/2026/01/BlueExpress-Logo.png | /assets/img/landings/excel-presencial/blueexpress-logo.png | migrated |
| landing-excel12-presencial.html | https://capacita.cl/wp-content/uploads/2026/01/Frontis-Edificio1.jpeg | /assets/img/landings/excel-presencial/frontis-edificio1.jpeg | migrated |
| landing-excel12-presencial.html | https://capacita.cl/wp-content/uploads/2026/01/Frontis-Oficina-Capacita-0-liviana.jpg | /assets/img/landings/excel-presencial/frontis-oficina-capacita-0-liviana.jpg | migrated |
| landing-excel12-presencial.html | https://capacita.cl/wp-content/uploads/2026/01/Fundacion-Tacal_Logo.jpg | /assets/img/landings/excel-presencial/fundacion-tacal-logo.jpg | migrated |
| landing-excel12-presencial.html | https://capacita.cl/wp-content/uploads/2026/01/Heel-Logo.png | /assets/img/landings/excel-presencial/heel-logo.png | migrated |
| landing-excel12-presencial.html | https://capacita.cl/wp-content/uploads/2026/01/Logo-Lo-barnechea.jpg | /assets/img/landings/excel-presencial/logo-lo-barnechea.jpg | migrated |
| landing-excel12-presencial.html | https://capacita.cl/wp-content/uploads/2026/01/Logo-NovoFarma.jpg | /assets/img/landings/excel-presencial/logo-novofarma.jpg | migrated |
| landing-excel12-presencial.html | https://capacita.cl/wp-content/uploads/2026/01/Logo-Oficina-sustentable.webp | /assets/img/landings/excel-presencial/logo-oficina-sustentable.webp | migrated |
| landing-excel12-presencial.html | https://capacita.cl/wp-content/uploads/2026/01/Logo-Telefonica.jpg | /assets/img/landings/excel-presencial/logo-telefonica.jpg | migrated |
| landing-excel12-presencial.html | https://capacita.cl/wp-content/uploads/2026/01/Sala-de-Clases-Equipada-y-Presencial-1-1.webp | /assets/img/landings/excel-presencial/sala-de-clases-equipada-y-presencial-1-1.webp | migrated |
| landing-excel12-presencial.html | https://capacita.cl/wp-content/uploads/2026/01/Sala-de-Clases-Equipada-y-Presencial-2-1.webp | /assets/img/landings/excel-presencial/sala-de-clases-equipada-y-presencial-2-1.webp | migrated |
| landing-excel12-presencial.html | https://capacita.cl/wp-content/uploads/2026/01/Sala-de-Clases-Equipada-y-Presencial-3-1.webp | /assets/img/landings/excel-presencial/sala-de-clases-equipada-y-presencial-3-1.webp | migrated |
| landing-excel12-presencial.html | https://capacita.cl/wp-content/uploads/2026/01/SELLO_2728-2x-150x150-1-1.webp | /assets/img/landings/excel-presencial/sello-2728-2x-150x150-1-1.webp | migrated |
| landing-excel12-presencial.html | https://capacita.cl/wp-content/uploads/2026/01/SELLO-40-HORAS-1-.webp | /assets/img/landings/excel-presencial/sello-40-horas-1.webp | migrated |
| landing-excel12-presencial.html | https://capacita.cl/wp-content/uploads/2026/01/TESTIMONIO1-1-.webp | /assets/img/landings/excel-presencial/testimonio1-1.webp | migrated |
| landing-excel12-presencial.html | https://capacita.cl/wp-content/uploads/2026/01/TESTIMONIO2-1-.webp | /assets/img/landings/excel-presencial/testimonio2-1.webp | migrated |
| landing-excel12-presencial.html | https://capacita.cl/wp-content/uploads/2026/01/TESTIONIO-3_1.webp | /assets/img/landings/excel-presencial/testionio-3-1.webp | migrated |
| landing-powerbi12-elearning.html | https://capacita.cl/wp-content/uploads/2019/02/Logo_Capacita_850x300-e1602863310152.jpg | /assets/img/landings/power-bi/logo-capacita-850x300-e1602863310152.jpg | migrated |
| landing-powerbi12-elearning.html | https://capacita.cl/wp-content/uploads/2026/04/Cliente-Aport-logo.webp | /assets/img/landings/power-bi/cliente-aport-logo.webp | migrated |
| landing-powerbi12-elearning.html | https://capacita.cl/wp-content/uploads/2026/04/Cliente-BlueExpress-Logo.webp | /assets/img/landings/power-bi/cliente-blueexpress-logo.webp | migrated |
| landing-powerbi12-elearning.html | https://capacita.cl/wp-content/uploads/2026/04/Cliente-CetChile-logo.webp | /assets/img/landings/power-bi/cliente-cetchile-logo.webp | migrated |
| landing-powerbi12-elearning.html | https://capacita.cl/wp-content/uploads/2026/04/Cliente-Codelco-logo.webp | /assets/img/landings/power-bi/cliente-codelco-logo.webp | migrated |
| landing-powerbi12-elearning.html | https://capacita.cl/wp-content/uploads/2026/04/Cliente-Fundacion-Tacal_Logo.webp | /assets/img/landings/power-bi/cliente-fundacion-tacal-logo.webp | migrated |
| landing-powerbi12-elearning.html | https://capacita.cl/wp-content/uploads/2026/04/Cliente-Heel-Logo.webp | /assets/img/landings/power-bi/cliente-heel-logo.webp | migrated |
| landing-powerbi12-elearning.html | https://capacita.cl/wp-content/uploads/2026/04/Cliente-Hospitalia-logo.webp | /assets/img/landings/power-bi/cliente-hospitalia-logo.webp | migrated |
| landing-powerbi12-elearning.html | https://capacita.cl/wp-content/uploads/2026/04/Cliente-Logo-Lo-barnechea.webp | /assets/img/landings/power-bi/cliente-logo-lo-barnechea.webp | migrated |
| landing-powerbi12-elearning.html | https://capacita.cl/wp-content/uploads/2026/04/Cliente-Logo-NovoFarma.webp | /assets/img/landings/power-bi/cliente-logo-novofarma.webp | migrated |
| landing-powerbi12-elearning.html | https://capacita.cl/wp-content/uploads/2026/04/Cliente-Logo-Telefonica.webp | /assets/img/landings/power-bi/cliente-logo-telefonica.webp | migrated |
| landing-powerbi12-elearning.html | https://capacita.cl/wp-content/uploads/2026/04/Control-Gestion-Power-bi3.webp | /assets/img/landings/power-bi/control-gestion-power-bi3.webp | migrated |
| landing-powerbi12-elearning.html | https://capacita.cl/wp-content/uploads/2026/04/Dashboard-financiero-power-bi-3.webp | /assets/img/landings/power-bi/dashboard-financiero-power-bi-3.webp | migrated |
| landing-powerbi12-elearning.html | https://capacita.cl/wp-content/uploads/2026/04/Hero-power-bi.webp | /assets/img/landings/power-bi/hero-power-bi.webp | migrated |
| landing-powerbi12-elearning.html | https://capacita.cl/wp-content/uploads/2026/04/matricula-Pago-online3.webp | /assets/img/landings/power-bi/matricula-pago-online3.webp | migrated |
| landing-powerbi12-elearning.html | https://capacita.cl/wp-content/uploads/2026/04/Pantalla-power-bi-clases-online3.webp | /assets/img/landings/power-bi/pantalla-power-bi-clases-online3.webp | migrated |
| landing-powerbi12-elearning.html | https://capacita.cl/wp-content/uploads/2026/04/Pantalla-Power-bi-online-Profesor-guia-3.webp | /assets/img/landings/power-bi/pantalla-power-bi-online-profesor-guia-3.webp | migrated |
| landing-powerbi12-elearning.html | https://capacita.cl/wp-content/uploads/2026/04/power-bi-reportes3.webp | /assets/img/landings/power-bi/power-bi-reportes3.webp | migrated |

## Assets pendientes

| Landing | URL | Motivo | Accion requerida |
|---|---|---|---|
| Ninguna | Ninguna | No quedan assets WordPress pendientes en HTML raiz | No aplica |

## Riesgos remanentes
- Las imagenes JPG/PNG/JPEG se preservaron en su formato original cuando no existia herramienta local de conversion WebP; no se crearon archivos con extension falsa.
- Excel presencial y Excel e-learning siguen como legacy funcional temporal con envio directo a Zoho; no se modifico su flujo de formulario.
- Referencias documentales a WordPress pueden permanecer para describir sitemap o decisiones historicas; no son dependencias de imagen en HTML raiz.
- No se aplicaron cambios al Worker real de Cloudflare desde este sprint.

## Proximos pasos concretos
1. Revisar visualmente las cinco landings con assets locales.
2. Aplicar cambios equivalentes en Worker real solo mediante flujo controlado si corresponde.
3. Mantener nuevas landings con imagenes bajo `/assets/img/landings/...`, no desde WordPress.
4. Mantener formularios nuevos con `/api/forms/lead`, `hp_field`, `Website`/`Website1`, Turnstile `interaction-only` y validacion server-side.

## Actualización Sprint 2026-06-05

### GitHub URLs Migradas
Se encontraron y migraron 7 URLs alojadas en GitHub (misaeln-pc1.github.io) desde landing-excel12-elearning.html:

| Archivo | URL GitHub original | Ruta local nueva | Estado |
|---|---|---|---|
| landing-excel12-elearning.html | https://misaeln-pc1.github.io/capacita-edge/assets/img/logo-oficial-capacita.webp | /assets/img/landings/excel-elearning/logo-oficial-capacita.webp | migrated |
| landing-excel12-elearning.html | https://misaeln-pc1.github.io/capacita-edge/assets/img/Pantalla-Excel-online-1.webp | /assets/img/landings/excel-elearning/pantalla-excel-online-1.webp | migrated |
| landing-excel12-elearning.html | https://misaeln-pc1.github.io/capacita-edge/assets/img/Pantalla-Excel-online-2.webp | /assets/img/landings/excel-elearning/pantalla-excel-online-2.webp | migrated |
| landing-excel12-elearning.html | https://misaeln-pc1.github.io/capacita-edge/assets/img/Pantalla-Excel-online-3.webp | /assets/img/landings/excel-elearning/pantalla-excel-online-3.webp | migrated |
| landing-excel12-elearning.html | https://misaeln-pc1.github.io/capacita-edge/assets/img/testimonio-curso-excel-online-felipe.webp | /assets/img/landings/excel-elearning/testimonio-curso-excel-online-felipe.webp | migrated |
| landing-excel12-elearning.html | https://misaeln-pc1.github.io/capacita-edge/assets/img/testimonio-curso-excel-online-daniela.webp | /assets/img/landings/excel-elearning/testimonio-curso-excel-online-daniela.webp | migrated |
| landing-excel12-elearning.html | https://misaeln-pc1.github.io/capacita-edge/assets/img/testimonio-curso-excel-online-carolina.webp | /assets/img/landings/excel-elearning/testimonio-curso-excel-online-carolina.webp | migrated |

### Formularios Migrados
- **landing-excel12-elearning.html**: Formulario principal migrado de `forms.zohopublic.com` a `/api/forms/lead` con Turnstile `interaction-only`
  - Agregado: `hp_field` (honeypot trap)
  - Agregado: `Website` / `Website1` campos ocultos para tracking
  - Agregado: Turnstile con `data-appearance="interaction-only"`
  - Agregado: Script de poblado automático de campos de tracking
  - Mantenido: Formulario secundario de descarga de temario (Zoho) como legacy

### Estado actual de landings
Todas las 5 landings raíz están ahora:
✅ Sin dependencia de WordPress en imágenes
✅ Con assets locales en `/assets/img/landings/{landing-key}/`
✅ Con formularios modernos usando `/api/forms/lead` (excepto Excel presencial legacy)
✅ Con Turnstile `interaction-only` en formularios nuevos (Power BI, Empresas, Empresas-Excel, Excel e-learning)
