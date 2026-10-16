# Integración opcional del asistente

La aplicación arranca en modo **demo**, sin red, mientras `N8N_WEBHOOK_URL` esté vacío. No requiere n8n ni un modelo para recorrer el producto. Las respuestas demo son reglas locales y lo indican explícitamente.

El backend ofrece `GET /api/assistant/status` y `POST /api/assistant` con `{clientId,message,consent}`. La sesión y la propiedad se verifican antes de preparar el contexto. En modo conectado cada mensaje exige `consent: true`; el consentimiento no se conserva para el siguiente envío. No se guarda historial de conversación en el servidor.

## Plantillas incluidas

- `workflow-contract-demo.json`: comprueba la conexión backend → n8n sin consultar un modelo.
- `workflows/fitness-assistant.template.json` (copia compatible: `workflow-assistant.json`): n8n recibe el contexto autorizado, llama a un modelo local por la API de Ollama, valida JSON y responde al backend. Se entrega inactivo y sin credenciales.

Importa la plantilla elegida en una instancia local de n8n. En el nodo Webhook selecciona una credencial **Header Auth** con nombre de cabecera `Authorization` y valor `Bearer <token-local>`. Guarda el mismo token sólo en `backend/.env` como `N8N_WEBHOOK_TOKEN`. La exportación no contiene tokens ni IDs de credenciales.

Para la plantilla de modelo, sustituye `REEMPLAZAR_MODELO_INSTALADO` en el nodo de preparación por el nombre de un modelo ya disponible en tu instancia de Ollama. Ajusta la URL del nodo HTTP: `host.docker.internal` corresponde al acceso desde un contenedor al host; si ambos procesos corren directamente en el host, usa `http://127.0.0.1:11434/api/chat`. Elige un modelo capaz de devolver JSON y cumplir el contrato. No se descarga ni instala ningún modelo automáticamente.

Usa la URL de prueba que muestre n8n mientras escucha eventos. Para una ejecución local persistente activa la plantilla en tu propia instancia y copia su URL de producción a `N8N_WEBHOOK_URL`. El servidor sólo permite HTTP para loopback; cualquier n8n remoto requiere HTTPS. `N8N_TIMEOUT_MS` vale 8000 por defecto, con máximo 20000. El tiempo del nodo HTTP de la plantilla es 7000 ms y debe permanecer por debajo del límite del backend.

La plantilla desactiva el guardado de ejecuciones exitosas, fallidas y manuales. Verifica también la política global de tu instancia. En las pruebas manuales, la interfaz de n8n puede mostrar el contexto mientras ejecuta. Utiliza exclusivamente datos sintéticos.

## Datos y contrato

Se envían una referencia aleatoria de solicitud, la consulta redactada, objetivo, equipo, disponibilidad, fase y una bandera que indica si hay limitaciones declaradas (sin su detalle); para progreso se añaden cambios comparables sin identidad; para una propuesta puede adjuntarse la estructura de una rutina vigente. Se omiten nombre de cliente, correo, IDs de cliente/entrenador, condiciones de salud, notas profesionales, notas de ejercicios, contraseñas y tokens. La redacción automática de texto libre es limitada: no convierte datos reales en datos anónimos. La demostración no admite información real de salud.

Respuesta de n8n: `{reply:string,missingData:string[],proposal?:PlanInput}`. `reply` tiene máximo 8000 caracteres y toda la respuesta está limitada a 64 KiB. `PlanInput` usa el contrato de `backend/src/validation.ts`: seis semanas, fases 1–3, días españoles, ejercicios del catálogo, FITT, motivo por ejercicio y cargas sólo si existen. No admite `id`, `clientId`, `status`, `approvedAt` ni `approvedBy`. Los datos faltantes deben quedar ausentes o `null`.

El backend valida nuevamente la respuesta y guarda cualquier propuesta como `draft`, con `source: assistant`. Sólo el entrenador propietario puede aprobarla. Las rutinas aprobadas son inmutables: para adaptarlas se crea un nuevo borrador y se conserva el historial. Las cargas externas sin coincidencia en el mismo ejercicio de la rutina aprobada se retiran y aparecen en datos faltantes. Una respuesta inválida, un error de red o un timeout no crea una propuesta. No se reintenta automáticamente para evitar envíos duplicados sin un nuevo consentimiento.

## Verificación y límites

Las pruebas de API simulan la frontera HTTP y comprueban consentimiento por envío, propiedad, minimización, timeout, formato inválido, error HTTP, límite de tamaño y borradores sin aprobación. Las plantillas se validan como JSON y por su estructura. No se ha ejecutado una instancia real de n8n ni un modelo: la importación y generación real dependen de la versión y configuración que el usuario seleccione.

Referencias oficiales consultadas: [Webhook y modos de respuesta](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/), [autenticación del Webhook](https://docs.n8n.io/integrations/builtin/credentials/webhook/), [nodo HTTP Request](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) y [contrato `/api/chat` de Ollama](https://docs.ollama.com/api/chat).
