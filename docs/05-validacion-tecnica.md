# Validación técnica, fuentes y límites

Fecha de consulta de las fuentes: **2026-10-14**, zona horaria del proyecto America/Costa_Rica. La investigación consulta fuentes primarias; no equivale a certificación clínica, licencia de contenido ni aprobación de una organización.

## Cómo leer el estado

- **Implementado**: existe código o documentación inspeccionable para el requisito.
- **Verificado en software**: se ejecutó una comprobación y se registra comando, resultado y alcance.
- **Pendiente**: todavía falta evidencia, configuración externa, licencia o revisión profesional. No debe interpretarse como una comprobación aprobada.

La aplicación usa cuentas y datos sintéticos. La autenticación y SQLite locales son exclusivamente de demostración; no se deben usar con datos reales de salud.

## Matriz de requisitos y evidencia

| Área | Criterio verificable | Implementado | Verificado en software | Pendiente externo o manual |
| --- | --- | --- | --- | --- |
| Base | Migración SQLite, carga inicial, login/logout, sesión y rutas protegidas | Sí | H1: migración/semilla/build, tests y navegación correctos; detalle abajo | Autenticación y despliegue de producción |
| Privacidad | Entrenador sólo accede a clientes asignados; cliente sólo a sus datos, incluidas mutaciones | Sí, rutas actuales | H1: aislamiento de lectura HTTP verificado; pruebas de mutaciones añadidas en H2 | Evaluación institucional de privacidad antes de datos reales |
| Mediciones | Campos solicitados; fecha, responsable, unidades, observaciones y valores opcionales | Sí | Catálogo 24 + 9 y persistencia verificados; H2 R3 peso pendiente | Definir profesionalmente las etiquetas ambiguas |
| Cálculos | Conversión lb/kg, IMC, ICC, 1RM estimado y porcentaje, con datos válidos | Sí | Fórmulas y ausencia de datos verificadas; formulario lb en R3 | Interpretación individual por profesional |
| Cinco fases | Evaluación, planificación, prescripción, seguimiento y retest, con estados | Sí | Cinco fases y estados en catálogo/UI; formularios recorridos | Validación de protocolos de cada prueba |
| Rutinas y sesiones | Seis semanas, detalle de ejercicios, registro y comparación planeado/realizado | Sí | Recorridos de entrenador y cliente; edición móvil de plan en corrección final | Revisión profesional de prescripción y técnica |
| Asistente | Demo sin conexión; sesión y validación; consentimiento para envío externo; aprobación del entrenador | Sí | UI demo y borrador verificadas; backend final pendiente de resultado | Configurar credenciales, proveedor y revisar sus condiciones |
| n8n | Contrato backend/webhook, timeout, HTTP y respuesta malformada | Sí | Pendiente de resultado de pruebas finales del backend | Importar y ejecutar plantilla en una instancia y versión identificadas |
| Anatomía educativa | Frente/espalda, principales/secundarios, teclado y nombres accesibles | Sí | SVG y teclado comprobados en suite central | Revisión anatómica profesional; no es diagnóstico |
| Accesibilidad | Contraste, foco, etiquetas, teclado, reflow y movimiento reducido | Sí | Axe 4/4 y pruebas de teclado/movimiento correctas en R2; revisión final en curso | Conformidad WCAG 2.2 AA pendiente de revisión manual con lector de pantalla |
| Responsive | Recorrido real en escritorio y móvil, sin controles decorativos | Sí | Recorridos reales realizados; defecto de intercepción móvil en corrección | Pruebas con dispositivos físicos y personas usuarias |
| Documentación | Instrucciones, contratos, decisiones, fuentes y limitaciones alineadas con código | En construcción | Pendiente de auditoría final | Revisión legal/institucional antes de producción |

## Fuentes primarias consultadas

Todas las entradas tienen fecha de consulta **2026-10-14**. Las fechas de publicación históricas se conservan cuando son relevantes; consultar una fuente hoy no convierte sus resultados en validación universal.

| Fuente y título | Alcance que sustenta | Límite y decisión del producto |
| --- | --- | --- |
| [Hevy — App Feature List](https://www.hevyapp.com/features/) | Inventario oficial de registro, progresión, funciones sociales y conexión con entrenador. | No copiar marca, textos, interfaz ni recursos. No afirmar superioridad. |
| [Hevy Help Centre — Everything You Need to Know About the Hevy App (2025 Features Guide)](https://help.hevyapp.com/hc/en-us/articles/33106320824727-Everything-You-Need-to-Know-About-the-Hevy-App-2025-Features-Guide) | Registro de series, repeticiones, carga y esfuerzo; rutinas, historial, 1RM estimado, medidas, mapas musculares y Hevy Trainer. | Las prestaciones cambian. No asumir que programación personalizada, métricas o funciones guiadas son exclusivas de esta aplicación. |
| [Hevy Coach — Client App For Coaches and Trainers](https://hevycoach.com/features/client-app/) | Asignación de entrenamientos, comunicación, sincronización y acceso del entrenador a estadísticas del cliente. | Esta investigación documental no es una prueba comparativa de productos ni demuestra ausencia de otras capacidades en Hevy. |
| [PAR-Q+ Collaboration — Terms and Conditions](https://eparmedx.com/about/terms-and-conditions/) | Titularidad, usos permitidos y restricciones de modificación, traducción y uso comercial. | No se obtuvo permiso. No reproducir ni alterar el cuestionario o atribuir su validación a preguntas originales. |
| [PAR-Q+ Collaboration — Download PDFs / Print Versions of PAR-Q+ and Other Documents](https://eparmedx.com/?page_id=79) | La incorporación en encuestas electrónicas, herramientas de investigación o materiales derivados requiere consentimiento escrito de la colaboración. | Alternativa: anamnesis original y registro de que un profesional revisó documentación externa, sin copiar formularios. La apertura directa de páginas de esta organización falló en el lector web; se consultó el contenido indexado del dominio oficial. |
| [Functional Movement Systems — Terms](https://www.functionalmovement.com/terms) | Secciones 4 y 8: las condiciones no conceden licencia implícita para reproducir, modificar o distribuir propiedad intelectual de FMS. | No se obtuvo autorización. Guardar estado, observaciones y referencia aportada por profesional; no reproducir rúbricas o formularios protegidos ni afirmar que el resultado predice una lesión. |
| [ACSM — Updating ACSM’s Recommendations for Exercise Preparticipation Health Screening](https://journals.lww.com/acsm-msse/fulltext/2015/11000/updating_acsm_s_recommendations_for_exercise.28.aspx) (2015) | La evaluación previa considera síntomas, enfermedades conocidas, actividad habitual e intensidad prevista; incluye signos como dolor torácico, mareo/síncope y falta de aire inusual. | Referencia de cautela general, no un algoritmo clínico implementado o un alta médica. La aplicación no determina aptitud clínica ni reemplaza una valoración profesional. |
| [CDC — Calculating BMI](https://www.cdc.gov/growth-chart-training/hcp/using-bmi/calculating-bmi.html) (2024) | Fórmula IMC = masa en kg / altura en m al cuadrado. | Requiere ambos valores válidos; el resultado calculado no equivale a diagnóstico ni se usa para interpretar menores mediante criterios adultos. |
| [WHO — Waist circumference and waist-hip ratio: report of a WHO expert consultation](https://www.who.int/publications-detail-redirect/9789241501491) (2011) | Importancia del método de medición y variación por sexo, edad y población. | Cintura y cadera deben estar identificadas de forma expresa; no equiparar automáticamente «densidad abdomen» a cintura. No se implementan umbrales diagnósticos. |
| [NIST — Mass Calibrations](https://www.nist.gov/system/files/documents/calibrations/sp250-31.pdf) | Equivalencia de libra avoirdupois: 1 lb = 0.45359237 kg. | Conservar valor/unidad de origen cuando corresponda, normalizar coherentemente y redondear sólo para presentar. |
| [Reynolds et al. — Prediction of one repetition maximum strength from multiple repetition maximum testing and anthropometry](https://pubmed.ncbi.nlm.nih.gov/16937972/) (2006) | Estudio de press de banca y prensa de piernas; en esa muestra, las pruebas de 5RM permitieron estimaciones más precisas que 10RM y 20RM. | No valida una fórmula universal para todos los ejercicios o personas. Conservar ejercicio, método, fecha, carga, unidad y repeticiones. |
| [Macarilla et al. — Accuracy of Predicting One-Repetition Maximum from Submaximal Velocity in the Barbell Back Squat and Bench Press](https://jhk.termedia.pl/Accuracy-of-Predicting-One-Repetition-Maximum-from-Submaximal-Velocity-in-the-Barbell,158707,0,2.html) (2022) | La introducción recoge Epley como carga × (1 + 0.0333 × repeticiones), y discute límites de las estimaciones. | El estudio principal trata métodos de velocidad en una muestra concreta: no constituye validación clínica del calculador. La aproximación repeticiones/30, si se usa, debe quedar documentada como decisión aritmética. |
| [W3C — Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/) | Norma para contraste, teclado, foco, nombre/rol/valor, reflow, errores y mensajes de estado; incluye objetivos de tamaño y foco no oculto. | Objetivo AA. Las pruebas automáticas cubren sólo parte de los criterios; no autorizan declarar conformidad completa. |
| [W3C — Understanding SC 2.5.8: Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum) | Objetivos de puntero de al menos 24 × 24 píxeles CSS o sus excepciones de espaciado, equivalencia, texto, control de usuario o necesidad esencial. | Elegir controles cómodos además del mínimo técnico; probar elementos SVG y controles en móvil. |
| [n8n — Webhook node documentation](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/) | URL de prueba y producción, métodos HTTP y autenticación Basic, Header o JWT. | La URL privada y credenciales sólo pertenecen al servidor. La documentación no demuestra que una plantilla particular se haya importado o ejecutado. |
| [n8n — Respond to Webhook node documentation](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook/) | Configuración de la respuesta al webhook y devolución de un cuerpo JSON. | Documentar versión realmente probada; sin instancia disponible, contrato y plantilla quedan sin verificación de importación. |

## Diferenciación propuesta, sin comparación de superioridad

Hevy ya documenta registro de entrenamiento, rutinas, progreso, medidas y acompañamiento del entrenador. La oportunidad elegida para esta demostración es reunir cinco fases con procedencia de las mediciones, etiquetas ambiguas explícitas, datos ausentes visibles, comparación de retests condicionada a métodos comparables y revisión humana de propuestas del asistente. Esta es una decisión de alcance del producto derivada de la investigación, no una afirmación de que Hevy carezca de esas capacidades ni de que el producto sea superior.

## Protocolos, mediciones y revisión profesional

No se reproduce PAR-Q+, su traducción, escalas de FMS ni formularios protegidos. Anamnesis y observaciones son registros originales no validados clínicamente. Las demás pruebas solicitadas deben admitir estado pendiente, realizada, no realizada o no apropiada, sin forzar su ejecución. Los nombres de las pruebas y el almacenamiento de resultados no demuestran que un protocolo concreto haya sido validado.

Sit and Reach, Thomas, Apley, Overhead Squat, pruebas de fuerza y resistencia, Cooper, Ruffier-Dickson, saltos, Sorensen y Side Plank requieren selección y revisión profesional de protocolo, técnica, equipo y pertinencia individual antes de uso real. No se considera completada esa revisión; la alternativa segura es registrar resultados, unidades, método y observaciones sin emitir diagnósticos o puntuaciones normativas no verificadas.

«Pie» conserva su etiqueta sin asumir ancho. «Densidad» conserva el nombre aportado y exige descripción para saber si representa perímetro u otra magnitud; no se trata como densidad física por defecto. Bioimpedancia se presenta como estimación del dispositivo, con dispositivo, fecha y condiciones cuando se conocen. Comparar cifras sin comprobar unidad, localización, método y condiciones puede mezclar magnitudes no equivalentes.

El IMC y el índice cintura-cadera sólo se calculan con datos disponibles y apropiados. El 1RM directo es un registro; el 1RM estimado debe distinguirse y no convierte el porcentaje calculado en una prescripción automática. La revisión del entrenador sigue siendo necesaria.

## Criterios de auditoría adversarial

Cada hito tiene un máximo de tres rondas. Una observación sólo cuenta como hallazgo confirmado con archivo/línea, prueba, respuesta HTTP, captura u otra evidencia reproducible. Un comando no ejecutado no se registra como aprobado. El límite de rondas no elimina defectos: los restantes se registran aquí y en PROGRESS.md antes de avanzar.

1. Base: instalación/migración, semillas, autenticación, sesión, errores y aislamiento por rol/propiedad.
2. Perfil y fases: inventario de campos, unidades, datos vacíos, cálculo y comparabilidad; cinco fases y cuatro estados de prueba.
3. Cliente: navegación real, rutina correspondiente, detalle, ejercicios completados, cargas y registro persistente, objetivos e historial.
4. Asistente: ausencia de conexión sin URL, entrada vacía/sin sesión, consentimiento antes de transmisión, payload mínimo, timeout/HTTP/JSON inválido y aprobación reservada al entrenador.
5. Anatomía: músculos solicitados, asociación al ejercicio, interacción con teclado, nombres accesibles y preferencia de movimiento reducido.
6. Cierre: escritorio/móvil, contraste y foco, errores/carga/vacío/éxito, controles funcionales, documentación y ausencia de secretos.

## Registro de rondas y resultados reales

| Hito | Rondas usadas | Evidencia ejecutada | Hallazgos y resolución | Resultado |
| --- | --- | --- | --- | --- |
| 1. Base | 2/3 | Árbitro: 17/17 HTTP; constructor: generate/migrate/seed/build correctos, Vitest 12 backend + 6 frontend y Playwright 8/8 | H1-01: creación de SQLite ausente corregida con helper no destructivo; reevaluada en R2 | Aprobado para alcance de demostración |
| 2. Perfil, mediciones y fases | 3/3, última ronda en curso | R2: 18 comprobaciones + Vitest H2 8/8; constructor: entrenador Playwright 6/6 | H2-07 corregido con step any; ejecución independiente R3 interrumpida sin resultado; prueba dedicada creada | R3 pendiente de ejecución central; no hay cuarta ronda |
| 3. Vista del cliente | 1/3 | Constructor: dos recorridos de cliente correctos, escritorio/móvil, dentro de client-assistant 4/4 | Registro, actualización sin duplicado, persistencia y detalle de técnica verificados | Aprobado en software para alcance demo; revisión profesional pendiente |
| 4. Asistente y n8n | 1/3 | Constructor: dos recorridos de asistente demo correctos, escritorio/móvil, dentro de client-assistant 4/4 | Propuesta de seis semanas permanece draft y requiere revisión; integración real sin credenciales | Auditoría final de backend pendiente; n8n real no verificado |
| 5. Ilustraciones musculares | 1/3 | Constructor: suite de accesibilidad verifica dos vistas, diez controles, Enter/Espacio, foco y movimiento reducido | Sin defecto de software reportado en SVG; no se realizó revisión anatómica profesional | Aprobado en software; anatomía y lector de pantalla pendientes |
| 6. Estilo, accesibilidad y documentos | 2/3 | Constructor: axe 4/4; suite global R2 23/26 correctas | Dos fallos de datos/selectores de prueba y un defecto móvil: contenido intercepta Guardar borrador; corrección en curso | R3 final pendiente; lector de pantalla pendiente |

## Pendientes externos permanentes de esta demostración

- Revisión profesional de pruebas físicas, antropometría, representaciones anatómicas y contenido de entrenamiento.
- Permisos de PAR-Q+/FMS si en el futuro se decide reproducir sus materiales; esta demostración no incorpora los formularios.
- Credenciales y ejecución real del flujo n8n en una versión identificada, junto con evaluación de proveedor y consentimiento.
- Revisión manual con lector de pantalla antes de declarar conformidad completa WCAG 2.2 AA.
- Autenticación, autorización, cifrado, retención, respaldo y revisión de privacidad para un futuro entorno con datos reales; no están validados por la demostración local.

### Hito 1 — Ronda 1, autenticación básica

Comando ejecutado por el árbitro en `backend/`: script ES module suministrado por entrada estándar a `node --import tsx --input-type=module`, usando `node:assert/strict`, `supertest`, `src/app.ts` y `newSession` de `src/auth.ts`. Salida real: `audit: H1-R1`, `passed: 7`, código de salida 0.

Comprobaciones: `/api/health` declara `demo:true`; cookie inventada devuelve 401; JSON malformado devuelve 400 `INVALID_JSON`; campo `role` inyectado en login devuelve 400 `VALIDATION_ERROR`; sesión válida entrega perfil sin hash; logout elimina cookie con `Path=/api`; reutilizar el token cerrado devuelve 401. La sesión se creó en memoria con un usuario sintético; esta prueba no valida la semilla ni la contraseña almacenada y no accede a una base de datos.

La inspección estática verificó el filtro de propiedad en `ownedClient`, el filtro de lista por rol, `requireAuth` antes de rutas privadas, opciones HttpOnly/SameSite de cookie, validación estricta de credenciales y límites de cuerpo/origen. Sigue pendiente cerrar la ronda con migración, compilación y pruebas de acceso a datos y navegación ejecutadas.

La segunda ejecución independiente, `H1-R1-DB`, usó las tres cuentas ficticias y la base SQLite ya migrada: **10/10 correctas, salida 0**. Verificó login sin hash expuesto (también con correo en mayúsculas), lista de tres clientes para el entrenador, un único perfil para la cuenta cliente, lista vacía para otro entrenador, bloqueo 404 al consultar IDs ajenos desde ambos roles, 404 uniforme para ID inexistente y catálogo de ejercicios disponible con sesión. No realizó mutaciones de datos.

Evidencia comunicada por el constructor raíz: generación Prisma 6.12 y compilación de ambos proyectos correctas; `prisma migrate deploy` falló inicialmente con `Schema engine error` cuando el archivo SQLite no existía. Crear un archivo vacío permitió migrar y cargar la semilla. **Hallazgo H1-01 confirmado:** la instalación desde cero necesita creación segura del archivo SQLite antes de migrar. Se mantiene abierto hasta integrar y probar el helper; los cinco tests de backend omitidos por fallo del setup no se cuentan como aprobados.

### Hito 1 — Ronda 2 y cierre

El constructor raíz ejecutó la secuencia `npm run db:migrate`, `npm run db:seed`, `npm run build`, `npm test`: **salida 0**, migración sin pendientes, semilla correcta, compilación de frontend/backend y **12 tests backend + 6 frontend correctos**. La suite ya incluía algunas comprobaciones de H2; esta cifra no representa doce pruebas exclusivas de H1. Además ejecutó Playwright para autenticación API/UI, protección de rutas y sesión tras recarga: **8/8 correctos en escritorio y móvil**.

El árbitro inspeccionó `backend/scripts/prepare-database.mjs`: crea directorios necesarios y abre SQLite en modo append, sin truncar archivos existentes. El setup de tests pasó con la base de prueba antes ausente, confirmando la corrección de H1-01. H1 queda **aprobado con 2/3 rondas usadas**, sin defectos abiertos de su alcance local. La validación no convierte la autenticación demo en autenticación de producción.

### Hito 2 — Ronda 1, hallazgos

Comando del árbitro en `backend/`: script por entrada estándar a `node --import tsx --input-type=module`, importando `assessmentSchema`, `measurementSchema`, `measurementCatalog` y `testCatalog`. Salida **0**, identificador `H2-R1-validation`. Se confirmó que el catálogo tiene nueve tipos de bioimpedancia y los nombres de pruebas requeridos.

- **H2-01, validación de resultados:** `safeParse` aceptó 1RM directo de -50 kg, Cooper de -10 m, 2,7 flexiones y press 5RM de 60 sin unidad. Se requieren restricciones por tipo de prueba y unidad para resultados numéricos completados; algunas pruebas de alcance sí pueden admitir valores negativos y no deben restringirse indiscriminadamente.
- **H2-02, metadatos opcionales:** bioimpedancia con valor válido y dispositivo/condiciones desconocidos fue rechazada, aunque el requisito admite estos campos cuando estén disponibles. La UI los anunciaba opcionales. Permitir ausencia y excluir comparaciones sin metadatos suficientes.
- **H2-03, contrato de planes:** la lectura ejecutada de PlanEditor mostró `status` en un cuerpo que el schema estricto no admite y fases textuales donde el servidor exige número. El constructor comunicó corrección; falta recorrer el guardado real.
- **H2-04, contrato del informe:** la lectura de Progress mostró acceso a `response.report` mientras el servidor devuelve el informe plano. Ocultaría estadísticas/comparaciones. El constructor prepara corrección y prueba de navegador.
- **H2-05, comparabilidad desde UI:** Measurements no capturaba ni enviaba `protocol`, aunque el informe exige protocolo no vacío para comparar. Añadir campo y comprobar dos registros compatibles.
- **H2-06, mezcla de planes:** la gráfica semanal seleccionaba sesiones realizadas por fecha sin comprobar `planId`. Filtrar por el plan activo para evitar sumar sesiones de otros planes.

Los hallazgos 03–06 se apoyan en la salida real de lectura de los archivos, no en un recorrido de navegador todavía. La segunda ronda comenzará después de que los constructores notifiquen sus correcciones. No se aprueba H2 con estas comprobaciones pendientes.

### Hito 2 — Ronda 2

El árbitro ejecutó `H2-R2` por entrada estándar con `node --import tsx --input-type=module`: **18/18 comprobaciones correctas, salida 0**. Se verificaron las 24 claves antropométricas originales, nueve tipos de bioimpedancia, cinco fases, cuatro regresiones de validación, admisión de alcance negativo legítimo, metadatos bio ausentes, conversiones/IMC/ICC/Epley/%1RM y conservación de campos vacíos. Se construyó un plan mediante `makePlan` real del frontend y se comprobó su compatibilidad con el schema del backend, así como rechazo de cinco semanas o semana duplicada.

Comando independiente: `npm run test -w backend -- -t 'Hito 2'`: **8 pruebas correctas, 5 omitidas por el filtro, salida 0**. El setup migró/sembró la base de pruebas. Las pruebas cubren persistencia, propiedad, aprobación, unidades, fórmulas y exclusión de comparaciones incompatibles. Las cinco pruebas omitidas corresponden a H1 y no se contaron como ejecutadas en esta ronda.

**H2-07, nuevo hallazgo de navegador:** tras login del entrenador y abrir `/trainer/clients/client-ana?tab=profile`, el árbitro seleccionó `lb` en «Unidad del peso» y ejecutó `checkValidity()` sobre «Valor del peso». Salida real: valor `148.59`, `valid:false`, `stepMismatch:true`; Chrome indicó valores vecinos válidos `148.582452436976` y `148.592452436976`. El mínimo convertido de kg a lb ancla el escalón decimal a una fracción incompatible, impidiendo enviar el formulario después del cambio de unidad. No se guardaron cambios de perfil en esta comprobación. Se requiere corregir el atributo step/min y verificar la conversión con guardado en la tercera y última ronda.

### Hito 2 — Ronda 3 interrumpida y continuación

Actualización **2026-10-15**. El comando independiente de navegador de esta ronda quedó interrumpido por el usuario y no devolvió ninguna salida ni identificador de proceso recuperable. Por tanto, **no se declara que el peso haya sido guardado, verificado o restaurado por ese comando**. Su código incluía restauración en finally, pero no existe evidencia de que se ejecutara.

Se creó `tests/profile-weight.spec.ts` para que el constructor central continúe la **misma tercera ronda**, sin una cuarta: valida el cambio automático a lb, guarda 120,5 lb como 54,658880585 kg, comprueba persistencia tras recarga y restaura únicamente `weightKg` original mediante API en finally. Adjunta evidencia JSON por proyecto. A la hora de esta actualización, la prueba estaba creada y **no ejecutada**.

Evidencia adicional comunicada por el constructor: `tests/trainer.spec.ts`, **6/6 correctas en escritorio/móvil**, guarda medición con protocolo y evaluación, crea seis semanas, aprueba el plan y muestra datos del informe sin desbordamiento. Los fallos previos de selección de controles se corrigieron en los selectores de prueba; no se registran como defectos adicionales del producto.

### Hitos 3, 4 y 5 — Evidencia central recibida

`tests/client-assistant.spec.ts`: **4/4 correctas**, dos casos por proyecto (escritorio/móvil). Dos ejecuciones corresponden al cliente: consulta de técnica y señales de parada, sesión realizada con cargas/esfuerzo/fatiga/motivación, persistencia tras recarga y actualización sin duplicado. Las otras dos corresponden al asistente: modo demo explícito, propuesta de seis semanas en draft, consentimiento inicialmente desmarcado y acceso a revisión del entrenador. No deben contarse como cuatro ejecuciones exclusivas de cada hito ni como conexión real con n8n.

La suite `tests/accessibility.spec.ts` recorre las pantallas principales y el detalle muscular. Verifica dos SVG, diez controles de grupo muscular, foco por Tab, activación mediante Enter/Espacio, aria-pressed y ausencia de animación bajo movimiento reducido. Estas comprobaciones sustentan el cierre de software de H5, sin validar anatomía clínica ni uso real de lector de pantalla.

### Hito 6 — Rondas 1 y 2

R1 detectó contraste insuficiente en fondos de acceso, hero/calendario y números de fase, además de una lista de fases desplazable sin acceso al foco. Se corrigió el producto sin desactivar reglas axe.

En R2, el constructor comunicó **4/4 casos de accesibilidad correctos** (escritorio/móvil). El resultado de su suite global fue **23/26 correctos**, no una aprobación completa: dos fallos correspondían a notas de prueba no únicas y uno a un defecto real móvil donde contenido del editor interceptaba el botón «Guardar borrador». Las correcciones y la tercera ronda final están pendientes de resultado. Los dos recorridos específicos de seguimiento del entrenador también fueron comunicados como correctos.

La conformidad completa con WCAG 2.2 AA sigue **pendiente de revisión manual con lector de pantalla**. Axe y las simulaciones de teclado no verifican por sí solas todos los criterios o necesidades de las personas usuarias.
