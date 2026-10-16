# Progreso — Olimpyc Fit

Fecha de inicio: 2026-10-14 (America/Costa_Rica). Repositorio inicial: solo README, sin cambios previos.

## Decisiones transversales
- Entrega local en este repositorio, sin publicación ni operaciones de GitHub.
- Dos cuentas sintéticas, sesión de demostración y autorización de propiedad en backend.
- Campos ambiguos conservan su etiqueta y requieren descripción para poder compararse.
- Pruebas protegidas: registrar estado/resultados y referencia; no reproducir cuestionarios licenciados.
- Se emplea Playwright para recorrer navegador real y axe para verificaciones automáticas; lector de pantalla y revisión profesional permanecen pendientes.

## Hitos
| Hito | Estado | Rondas del árbitro | Defectos abiertos | Siguiente paso |
| --- | --- | --- | --- | --- |
| 1. Base | completado | 2/3 | Ninguno abierto | Migración, seed, compilación, Vitest y navegador aprobados |
| 2. Perfil, mediciones y fases | en curso | 3/3 | Cierre de verificación peso kg/lb | Formularios y plan aprobados en 6 recorridos Playwright |
| 3. Vista del cliente | en curso | 1/3 | Cierre del árbitro | Rutinas, registro persistente y sin duplicados verificados en escritorio/móvil |
| 4. Asistente y n8n | en curso | 1/3 | Configuración externa no disponible; revisión payload | Demo y borradores verificados en navegador; pruebas backend finales pendientes |
| 5. Ilustraciones musculares | en curso | 1/3 | Revisión independiente y anatomía profesional | SVG original integrado; teclado y movimiento reducido recorridos |
| 6. Estilo, accesibilidad y documentación | en curso | 1/3 | Contraste en 3 fondos y foco del selector de fases | Correcciones axe, seguimiento entrenador y documentación final |

## Reanudación
H1 cerrado: `npm install`, `db:generate`, `db:migrate`, `db:seed` y `build` ejecutados. Vitest: 12 pruebas backend y 6 frontend aprobadas. Playwright: 8 pruebas de acceso/API/navegación aprobadas en escritorio y móvil. Auditoría independiente: 17 verificaciones HTTP aprobadas.

H1 R1 encontró un fallo de Prisma al crear un archivo SQLite inexistente en Windows; el helper `backend/scripts/prepare-database.mjs` crea el archivo sin truncar datos y R2 confirmó migración y pruebas. Se corrigió BOM de package.json que impedía Vite. Avisos iniciales de dependencias corregidos fijando Prisma/cliente 6.12.0 y Vitest 4.1.11; instalación final: 0 vulnerabilidades reportadas por npm. La lectura inicial del adjunto bloqueó temporalmente tareas paralelas; se retomó desde el contenido ya leído. No se realizaron operaciones remotas de GitHub.

Actualización 2026-10-15: H2 tiene catálogo de 41 mediciones (incluye las 24 antropometrías solicitadas y 9 bio), 27 pruebas, validación y formularios. R1 corrigió contratos de planes/informe, unidades/rangos, metadatos bio opcionales, protocolo y cohortes de gráficos; R2 detectó stepMismatch al cambiar a lb, corregido con step any; R3 dirigida pendiente de resultado final del árbitro. Playwright entrenador 6/6 aprobadas tras corregir selectores de prueba.

H3 y H4: `tests/client-assistant.spec.ts` 4/4 aprobadas en escritorio/móvil: consulta de técnica, registro/actualización sin duplicar, persistencia al recargar y propuesta demo que conserva estado draft. No hay conexión real con n8n. Frontend compila (69 módulos), últimas pruebas unitarias comunicadas: 14/14.

H5: `MuscleMap.tsx` y `muscles.css` originales con dos vistas y diez grupos musculares, controles SVG y HTML, Enter/Espacio y movimiento reducido. Integrado en detalle de ejercicio.

H6 R1: suite `tests/accessibility.spec.ts` detectó contraste insuficiente en fondos de login/hero/calendario y números de fases, más lista de fases desplazable sin foco. Frontend corrige, sin desactivar reglas axe. También completa cargas/ejercicios en edición del seguimiento del entrenador y programación de la sesión correspondiente a fecha. Root hará rerun y revisión visual, actualizará docs03/04/README al contrato final. Backend refuerza inmutabilidad de planes aprobados, mm→cm y minimización n8n; sus pruebas finales siguen pendientes. Preservar cambios existentes del usuario y no ejecutar acciones remotas.
