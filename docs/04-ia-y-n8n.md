# Asistente y n8n

## Arquitectura y estado

El navegador sólo conoce `POST /api/assistant`. El servidor identifica al usuario, comprueba acceso al cliente, valida el mensaje y selecciona el modo. Sin `N8N_WEBHOOK_URL`, genera una respuesta simulada y no intenta conectarse a la red. La interfaz debe mostrar ese modo expresamente.

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

Respuesta conceptual de la aplicación:

```json
{
  "mode": "demo",
  "reply": "Respuesta simulada. La propuesta necesita revisión del entrenador.",
  "missingData": ["Carga de referencia del mismo ejercicio"],
  "proposal": null
}
```

La respuesta puede incluir un plan borrador. Nunca se publica directamente por venir del proveedor. El entrenador revisa y edita la planificación, y ejecuta la acción de aprobación. La autorización vuelve a comprobarse en backend.

## Configuración local

1. Copiar `backend/.env.example` a `backend/.env`. Mantener `.env` fuera de control de versiones.
2. Dejar `N8N_WEBHOOK_URL` vacío para la demostración sin conexión.
3. Preparar una instancia n8n propia. Importar `n8n/workflows/fitness-assistant.template.json` o crear un Webhook POST y un nodo Respond to Webhook siguiendo las referencias oficiales.
4. Configurar autenticación del webhook y del proveedor dentro de n8n y las variables privadas de backend. No incrustar claves en JSON exportado.
5. Implementar generación estructurada y validar el contrato antes de activar la URL de producción. Las URL de prueba y producción de n8n son distintas.
6. Reiniciar el backend tras cambiar variables, comprobar consentimiento, timeout, error HTTP y respuesta inválida con datos sintéticos.

La plantilla no contiene credenciales. No se ha importado ni ejecutado en una instancia real de n8n; la compatibilidad con una versión concreta, las credenciales y la conducta de un modelo real quedan pendientes. No se afirma que haya una conexión real cuando sólo funciona la simulación.

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
