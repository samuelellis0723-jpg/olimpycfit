# Asistente y n8n

## Arquitectura y estado

El navegador consulta `GET /api/assistant/status` y envía a `POST /api/assistant`. El servidor identifica al usuario, comprueba acceso al cliente, valida el mensaje y selecciona el modo. Sin `N8N_WEBHOOK_URL`, genera una respuesta simulada y no intenta conectarse a la red. La interfaz muestra ese modo expresamente. El cliente HTTP externo está separado en `backend/src/integrations/n8n/client.ts`.

Con webhook configurado, se requiere consentimiento explícito en cada envío. El servidor envía un contexto mínimo y valida la respuesta. El mensaje libre puede contener datos sensibles: la interfaz debe explicar este riesgo antes de aceptar consentimiento. Los nombres, correos, contraseñas y tokens de sesión no deben formar parte del contexto. La demo no debe utilizarse con información real de salud.

## Contrato de la aplicación

Solicitud autenticada a `/api/assistant`:

```json
{
  "clientId": "client-ana",
  "message": "Resume mi programa y señala qué datos faltan",
  "consent": false
}
```

Respuesta de la aplicación sin propuesta:

```json
{
  "mode": "demo",
  "reply": "Respuesta simulada. La propuesta necesita revisión del entrenador.",
  "missingData": ["Carga de referencia del mismo ejercicio"]
}
```

La respuesta puede incluir `proposal`, un plan persistido como `draft`, con sus seis semanas y FITT. Nunca se publica directamente por venir del proveedor. El entrenador revisa y edita el borrador, y ejecuta la acción de aprobación. La autorización vuelve a comprobarse en backend. Una vez aprobado, el plan es inmutable; se crea otro borrador para adaptarlo sin cambiar el historial.

La solicitud admite sólo esos tres campos: mensaje no vacío de hasta 2000 caracteres y consentimiento booleano. El backend conectado exige consentimiento en cada petición; el frontend desmarca la casilla al enviar, incluso si falla. No se guarda un historial de conversaciones en el servidor.

## Contexto y respuesta del webhook

El contexto contiene objetivo, equipo, disponibilidad, fase, datos faltantes y `hasDeclaredLimitations` sin texto de padecimientos. Para progreso añade cambios comparables (clave, unidad y diferencia); para propuestas puede añadir semanas/FITT de una rutina vigente. Se envía además un identificador aleatorio de solicitud y el catálogo permitido con `exerciseId`, `label` y equipo. Se omiten IDs de personas, nombre, correo, notas, responsables y detalles de salud. La redacción de nombres conocidos, correos y números en texto libre es limitada y no garantiza anonimización; sólo se admiten datos sintéticos.

Respuesta externa: `{reply: string, missingData: string[], proposal?: PlanInput}`. `reply` no puede estar vacío ni superar 8000 caracteres; la respuesta total tiene un límite de 64 KiB. `PlanInput` está definido en `backend/src/validation.ts`: seis semanas únicas, fases numéricas 1–3, días españoles sin repetir, ejercicios del catálogo, FITT y justificación. No admite campos de identidad o aprobación. El servidor retira cargas, bases 1RM y porcentajes sin respaldo en el mismo ejercicio de la rutina aprobada y lo declara en `missingData`. La respuesta de texto sigue requiriendo revisión humana; las pruebas de contrato no certifican la conducta de un modelo real.

## Configuración local

1. Copiar `backend/.env.example` a `backend/.env`. Mantener `.env` fuera de control de versiones.
2. Dejar `N8N_WEBHOOK_URL` vacío para la demostración sin conexión.
3. Preparar una instancia n8n propia. Importar `n8n/workflows/fitness-assistant.template.json` o crear un Webhook POST y un nodo Respond to Webhook siguiendo las referencias oficiales.
4. Configurar Header Auth del Webhook: cabecera `Authorization` con valor `Bearer <token-local>`. Guardar el token sólo como `N8N_WEBHOOK_TOKEN` en backend. Configurar el modelo de Ollama y su URL siguiendo `n8n/README.md`; la plantilla tiene un marcador de modelo, no descarga uno. No incrustar claves en JSON exportado.
5. Implementar generación estructurada y validar el contrato antes de activar la URL de producción. Las URL de prueba y producción de n8n son distintas.
6. Reiniciar el backend tras cambiar variables, comprobar consentimiento, timeout, error HTTP y respuesta inválida con datos sintéticos.

La plantilla no contiene credenciales. No se ha importado ni ejecutado en una instancia real de n8n; la compatibilidad con una versión concreta, las credenciales y la conducta de un modelo real quedan pendientes. No se afirma que haya una conexión real cuando sólo funciona la simulación.

Se incluye también `n8n/workflow-assistant.json` como copia compatible y `n8n/workflow-contract-demo.json` para comprobar el transporte sin modelo. Las plantillas llegan inactivas y deshabilitan guardar ejecuciones; debe revisarse también la configuración global de la instancia.

El backend exige HTTPS salvo HTTP de loopback. No sigue redirecciones ni reintenta automáticamente. `N8N_TIMEOUT_MS` vale 8000 ms por defecto y se limita a 100–20000 ms. URL y token nunca se entregan al navegador ni se incluyen en errores públicos.

## Reglas de contenido y datos

- Explicar motivos de las propuestas y datos faltantes. No inventar evaluaciones, cargas máximas o limitaciones.
- No diagnosticar, garantizar prevención de lesiones ni indicar una carga exacta sin referencia suficiente.
- No sustituir el programa aprobado cuando el cliente consulta al asistente.
- Ante síntomas o incertidumbres relevantes, remitir al entrenador o a valoración profesional según corresponda.
- Tratar el mensaje y la respuesta como datos sin ejecutar HTML ni instrucciones externas.
- Describir la propuesta como borrador pendiente de revisión incluso si el proveedor solicita publicarla.

## Errores esperados

La API distingue sesión ausente, acceso denegado a otra ficha, mensaje vacío/inválido, consentimiento externo ausente, timeout, fallo del proveedor y respuesta malformada. El frontend conserva la posibilidad de reintentar y muestra un error comprensible. Nunca presenta una respuesta fallida como guardada, y los errores no deben revelar la URL privada o las credenciales.

Referencias consultadas el 2026-10-14: [Webhook de n8n](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/) y [Respond to Webhook](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook/). Estas páginas documentan el mecanismo; no verifican la plantilla entregada ni una integración real.
