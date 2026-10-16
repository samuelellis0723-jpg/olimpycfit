# Progreso — Olimpyc Fit

Inicio: 2026-10-14. Cierre de implementación local: **2026-10-15**, America/Costa_Rica.

## Decisiones transversales
- Demostración con datos sintéticos, sin publicación ni operaciones remotas de GitHub.
- React/TypeScript/Vite/React Router y CSS propio; Express/TypeScript, Prisma/SQLite.
- Autorización por rol y propiedad en servidor. Secretos de n8n exclusivamente en backend.
- Etiquetas ambiguas conservadas; kg/cm canónicos; pruebas protegidas sólo referenciadas.
- Propuestas del asistente siempre borradores; planes aprobados inmutables.
- Máximo tres rondas por hito. Las revisiones externas pendientes no se presentan como aprobadas.

## Hitos
| Hito | Estado local | Rondas | Evidencia de cierre | Pendiente externo |
| --- | --- | --- | --- | --- |
| 1. Base | Completado | 2/3 | Migración, seed, build, API y navegación | Identidad y operación de producción |
| 2. Perfil, mediciones y fases | Completado | 3/3 | Catálogo, fórmulas, formularios; peso kg/lb guardado y restaurado en escritorio/móvil | Definición profesional de etiquetas y protocolos |
| 3. Vista del cliente | Completado | 1/3 | Rutina, técnica, sesiones persistentes, actualización sin duplicar e historial | Revisión de prescripción |
| 4. Asistente y n8n | Completado en demo y contrato simulado | 2/3 | Sin red en demo, consentimiento, payload mínimo, errores, cargas sin respaldo y aprobación | Importación/ejecución real de n8n y modelo |
| 5. Ilustraciones musculares | Completado en software | 1/3 | SVG original, diez grupos, dos vistas, teclado y movimiento reducido | Anatomía y lector de pantalla |
| 6. Estilo, accesibilidad y documentación | Completado en alcance automático | 3/3 | Recorridos escritorio/móvil, axe y cierre dirigido de tablas; documentos actualizados | Conformidad WCAG completa y dispositivos físicos |

## Resultados finales ejecutados
- `npm run build`: backend y frontend correctos; frontend 72 módulos.
- `npm test`: **23 pruebas backend + 16 frontend correctas**, salida 0.
- Última suite completa `npm run test:e2e`: **26/28 correctas**. Los 24 recorridos funcionales pasaron; dos casos móviles de accesibilidad detectaron tablas desplazables sin foco.
- Se añadió foco, nombre de región y contorno visible a las tablas. Verificación dirigida de cierre: `npm run test:e2e -- tests/accessibility.spec.ts --project=mobile --reporter=list --output=test-results/accessibility-closure`: **2/2 correctas**, salida 0. No se volvió a ejecutar toda la suite: 24 casos funcionales y cuatro casos de accesibilidad quedan verificados entre la ejecución completa y el cierre dirigido.
- Tras ese ajuste: build frontend y sus 16 pruebas correctos. El backend no cambió.
- `npm audit`: **0 vulnerabilidades** reportadas en dependencias de ejecución y desarrollo.
- Inspección visual de capturas de panel en escritorio y detalle muscular móvil. Pruebas usan Chrome instalado; móvil es emulación Chromium.

## Hallazgos por ronda
H1 R1: Prisma Windows fallaba al crear SQLite inexistente; el helper abre el archivo en append, sin truncarlo. R2 confirmó migración/semilla y tests. Se corrigieron BOM inicial y vulnerabilidades de dependencias; Prisma 6.12.0 y Vitest 4.1.11.

H2 R1: corregidos rangos/unidades, metadatos bio opcionales, contratos de planes/informe, protocolo de medición y separación de sesiones por plan. R2: 18 comprobaciones independientes correctas; detectó stepMismatch al convertir kg/lb. R3: step any y prueba dedicada confirmaron validez, conversión exacta, recarga y restauración de sólo weightKg en ambos proyectos. Una primera ejecución de R3 se interrumpió sin resultado; no se contó como aprobada.

H3: rutina vigente y consulta histórica; registro del cliente y edición del entrenador con series, repeticiones, cargas y estado. El calendario toma la semana/día de la fecha. URL con fecha imposible vuelve a hoy sin romper la pantalla.

H4 R1/R2: extracción de cliente HTTP n8n, catálogo conservado con exerciseId/label, bandera de limitaciones sin detalle privado, retiro de cargas/1RM sin referencia, plantilla canónica y tests con fetch simulado. No se usaron credenciales ni una instancia real.

H5: SVG de código original, no imagen licenciada. Principales/secundarios diferenciados por color y trazo, controles HTML equivalentes y anuncios accesibles.

H6 R1: contraste y foco de fases corregidos. R2: 23/26; dos fallos eran notas E2E no únicas, uno era desbordamiento del editor móvil que bloqueaba Guardar. R3 corrigió mínimos de grilla/controles y confirmó guardado; detectó foco ausente en tablas ahora desplazables. Ajuste y comprobación dirigida 2/2 completaron el cierre de esa ronda. No se desactivaron reglas axe.

## Límites y uso
No hay defectos de software conocidos pendientes en los recorridos ejecutados. Esto no prueba ausencia de errores en todos los estados. La base demo conserva registros sintéticos generados por Playwright; el seed idempotente no los borra.

Pendientes: importar y ejecutar n8n con versión/modelo identificados; revisión manual con lector de pantalla; revisión profesional de anatomía, protocolos y contenido. No se declara certificación clínica ni conformidad WCAG completa. Detalle y fuentes: [docs/05-validacion-tecnica.md](docs/05-validacion-tecnica.md).
