# Arquitectura

## Estructura y flujo

Monorepositorio npm con `frontend/` y `backend/`. React renderiza las vistas y React Router protege los recorridos por rol. El navegador llama exclusivamente a `/api` con la cookie de sesión. Vite reenvía `/api` al servidor local Express en desarrollo. Express autentica, verifica la asignación del cliente, valida el cuerpo y ejecuta servicios/repositorios con Prisma. SQLite mantiene los datos ficticios entre reinicios; las sesiones de acceso de demostración caducan y se reinician con el proceso.

Las capas del backend separan rutas, controladores, reglas de negocio, acceso a datos, middleware y la integración n8n. Las carpetas del frontend separan aplicación/rutas, componentes, funciones de producto, servicios HTTP, tipos, datos y estilos. Los SVG musculares son originales y forman parte del código, sin recursos de terceros.

## Dependencias y decisiones

| Dependencia | Necesidad |
| --- | --- |
| React y React DOM | Formularios y estados interactivos de entrenador/cliente |
| TypeScript | Contratos explícitos y detección de incompatibilidades al compilar |
| Vite y plugin React | Servidor de desarrollo, proxy API y empaquetado del frontend |
| React Router | Rutas navegables, layouts y protección de experiencias por rol |
| Express | API HTTP y composición de middleware |
| bcryptjs | Hash de las contraseñas de las cuentas ficticias, sin guardarlas en texto plano en SQLite |
| cookie-parser | Lectura de la cookie opaca de sesión en Express |
| cors | Lista explícita de orígenes locales permitidos durante desarrollo |
| Prisma y Prisma Client 6 | Modelo relacional, acceso tipado, migraciones reproducibles y SQLite local |
| Zod | Validación de entradas y contratos de integración en ejecución |
| dotenv | Configuración privada del servidor mediante archivo local no versionado |
| tsx | Ejecución del backend y del seed TypeScript durante desarrollo |
| Vitest | Pruebas de lógica, conversiones, reglas de acceso y errores |
| Supertest | Peticiones de prueba a Express sin depender de un servidor publicado |
| concurrently | Ejecutar API y frontend con un único comando local |
| Playwright Test | Recorrer Chromium real en escritorio y viewport móvil, teclado y formularios persistentes |
| axe-core/playwright | Detectar automáticamente problemas de accesibilidad y contraste en las vistas recorridas |
| Paquetes `@types/*` | Declaraciones de desarrollo para las bibliotecas correspondientes |

La revisión de navegador usa Chrome instalado en Windows mediante el canal `chrome`, evitando descargas innecesarias. El perfil móvil emula viewport y entrada táctil en Chromium: no demuestra compatibilidad con Safari ni constituye una prueba en un teléfono físico. Axe complementa pruebas de teclado; no certifica conformidad WCAG. No se usa Tailwind ni un proveedor externo de tipografías.

Prisma 6 se fija de forma deliberada para mantener el flujo de SQLite y migraciones de esta demostración. Una actualización mayor requiere revisar configuración, generación del cliente y migraciones. Referencias consultadas el 2026-10-14: [Prisma 6 CLI](https://www.prisma.io/docs/orm/v6/reference/prisma-cli-reference), [seeding](https://www.prisma.io/docs/orm/v6/prisma-migrate/workflows/seeding), [Vite](https://vite.dev/guide/), [React Router declarativo](https://reactrouter.com/start/declarative/routing).

## Seguridad de la demostración

La protección del frontend facilita la navegación; la autorización efectiva se ejecuta en cada ruta del backend. Un cliente sólo accede a su ficha y a los programas aprobados. El entrenador sólo accede a clientes asignados. Ni un estado enviado por el cliente ni una respuesta de IA pueden saltarse la aprobación del entrenador. No se registran mensajes de salud, cuerpos completos ni credenciales en los errores HTTP.

Las variables n8n pertenecen al servidor. Sin webhook no hay solicitudes externas. Con webhook, cada solicitud requiere consentimiento; el contexto enviado se minimiza y se valida la respuesta. El contenido generado se representa como texto, sin ejecutar HTML del proveedor.

Esta autenticación con cuentas conocidas y datos locales es exclusivamente demostrativa. Para un servicio real hacen falta identidad robusta, sesiones persistentes revocables, TLS, cookies seguras según despliegue, controles de abuso, auditoría, consentimiento y retención de datos, copias verificadas y revisión legal/profesional pertinente. Ninguna de esas revisiones se declara completada.

## Migración futura a PostgreSQL

1. Mantener una copia verificable de la base SQLite y detener escrituras durante la transferencia.
2. Preparar PostgreSQL en un entorno separado y cambiar el datasource/URL de servidor. Nunca colocar la URL en Vite.
3. Crear una nueva línea de migraciones PostgreSQL desde el esquema revisado; el SQL SQLite no es portable directamente. Conservar el historial SQLite para la demo.
4. Revisar tipos de fecha, índices, restricciones, relaciones y campos JSON. Exportar e importar por entidades preservando IDs y unidades; verificar recuentos, referencias y valores ausentes.
5. Ejecutar las pruebas de acceso, cálculo, contratos y navegador contra el nuevo entorno. Validar copia/restauración y plan de reversión antes del cambio.
6. Sustituir autenticación demo y establecer controles operativos y de privacidad antes de usar datos reales. Cambiar sólo de base de datos no convierte esta demo en un producto sanitario seguro.
