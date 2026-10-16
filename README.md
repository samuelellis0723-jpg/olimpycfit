# Olimpyc Fit

Aplicación local para evaluación física, planificación individual y seguimiento del entrenamiento. React/TypeScript/Vite/React Router, Express/TypeScript y Prisma con SQLite. CSS propio, sin Tailwind.

**Demostración con cuentas y datos ficticios. No ingresar datos reales de salud.** No diagnostica, certifica aptitud ni garantiza prevenir lesiones. Las propuestas de IA requieren aprobación del entrenador.

## Instalación y ejecución

Requisitos: Node.js 22.12 o posterior y npm. Verificado en Windows con Node 24.18.0 y npm 11.16.0. Chrome instalado para pruebas de navegador. n8n no requiere credenciales para la demostración.

Desde la raíz:

```powershell
npm install
if (-not (Test-Path backend/.env)) { Copy-Item backend/.env.example backend/.env }
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

En macOS/Linux, copiar backend/.env.example a backend/.env si no existe y usar los mismos comandos npm. Esas plataformas no tienen un recorrido específico verificado.

Abrir **http://127.0.0.1:5173**. API local: http://127.0.0.1:3001/api/health. Ctrl+C detiene ambos procesos. Los datos persisten en backend/prisma/demo.db; las sesiones de acceso se reinician con el backend.

`db:migrate` aplica las migraciones versionadas y crea el archivo SQLite si falta, sin truncar uno existente. `db:seed` es idempotente: crea los registros ficticios que faltan y actualiza las contraseñas demo; conserva los cambios y registros existentes. El escenario inicial abarca septiembre–noviembre de 2026. Al terminar el ciclo, el entrenador debe publicar uno nuevo. No usar esta base ni estos comandos con datos reales.

## Cuentas ficticias

| Rol | Correo | Contraseña |
| --- | --- | --- |
| Entrenador | trainer@demo.local | Demo123! |
| Cliente (Ana) | client@demo.local | Demo123! |

El entrenador tiene tres clientes asignados. La cuenta cliente sólo accede a Ana y a sus planes aprobados. El servidor verifica permisos aunque se intente abrir otra ficha por URL.

## Recorridos

1. Entrar como entrenador y abrir Mis clientes; buscar o filtrar por fase.
2. Editar una ficha y registrar mediciones/evaluaciones con fecha, unidad, responsable y protocolo. Lo desconocido permanece vacío.
3. Crear un plan de seis semanas, completar FITT y sesiones. Copiar una semana y ajustar cada progresión. Guardar borrador, revisar y aprobar.
4. En Seguimiento e informe, programar sesiones, registrar técnica y observaciones, consultar cargas y comparaciones compatibles e imprimir.
5. Entrar como cliente, consultar el programa aprobado, registrar ejercicios/sesiones y revisar objetivos e historial.
6. Consultar el asistente en modo demostración. Las respuestas simuladas se identifican y las propuestas permanecen en borrador hasta aprobación.

## Verificación

```powershell
npm run build
npm test
npm run test:e2e
npm audit
```

Vitest utiliza backend/prisma/test.db. Playwright inicia servidores locales si no hay una instancia activa, usa Chrome en escritorio y viewport móvil y guarda capturas/trazas. Las pruebas de navegador escriben registros ficticios identificados como E2E y propuestas en la base de demostración. `db:seed` no los elimina.

Si Chrome no está instalado, instalarlo o adaptar el canal en playwright.config.ts a un navegador disponible. Emular móvil en Chromium no demuestra compatibilidad con Safari ni sustituye dispositivos físicos.

Resultados reales y rondas: [PROGRESS.md](PROGRESS.md) y [validación técnica](docs/05-validacion-tecnica.md). WCAG 2.2 AA completa queda pendiente de revisión manual con lector de pantalla.

## Documentación y configuración

- [Producto y flujos](docs/01-producto-y-flujos.md).
- [Arquitectura, dependencias y migración futura a PostgreSQL](docs/02-arquitectura.md).
- [Datos, unidades y fórmulas](docs/03-modelo-de-datos.md).
- [Asistente, consentimiento y configuración n8n](docs/04-ia-y-n8n.md).
- [Fuentes primarias, pruebas y pendientes](docs/05-validacion-tecnica.md).
- [Reglas para futuras tareas](AGENTS.md).

URL y token de n8n sólo en backend/.env, excluido de Git. Sin URL no hay llamadas externas. Plantilla n8n sin importación/ejecución real verificada: credenciales y versión siguen pendientes. PAR-Q+ y FMS se referencian sin copiar cuestionarios ni rúbricas. Pruebas físicas e ilustraciones requieren revisión profesional antes de uso real.
