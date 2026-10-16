# Modelo de datos, unidades y cálculos

## Entidades y relaciones

Un usuario tiene rol entrenador o cliente. Cada cliente pertenece a un entrenador; el usuario cliente está vinculado a una única ficha. La ficha reúne perfil, padecimientos declarados, objetivos, equipo, horario, fase activa y configuración de seguimiento. Sus mediciones, evaluaciones, planes y sesiones se conservan como registros independientes con fechas. Un plan contiene seis semanas y días con ejercicios del catálogo. Las propuestas de IA son planes borrador y sólo un entrenador autorizado puede aprobarlas.

Los valores no conocidos son opcionales o nulos. Un cero nunca sustituye automáticamente un campo vacío. La persona responsable, observaciones, unidades y fecha acompañan los registros donde corresponde. Las fechas de actividad se almacenan como fechas de calendario ISO `AAAA-MM-DD`; no convertirlas de zona horaria para mostrarlas. La zona de referencia de esta demostración es America/Costa_Rica.

## Mediciones

El catálogo conserva las siguientes etiquetas antropométricas:

- Largo del pie (talón a punta) y «Pie» como campo independiente de significado por aclarar.
- «Densidad del tobillo» y distancia inferior del tobillo a parte superior de rodilla.
- «Densidad» de pantorrilla, rodilla, muslo, glúteo, cadera, abdomen y pecho.
- Distancia rodilla superior a pelvis y pelvis a clavícula.
- Perímetro torácico superior indicado como hombros; ancho de espalda u hombros.
- Largo de mano (muñeca a punta de dedo medio), «densidad de la muñeca», distancia codo a muñeca y «densidad del antebrazo».
- Bíceps sin flexionar, bíceps flexionado, distancia hombro a codo, clavícula a barbilla y «densidad del cuello».

«Densidad» no se trata como una magnitud física determinada. El entrenador debe describir qué midió, por ejemplo un perímetro y su referencia anatómica, antes de interpretar o comparar. La medida «Pie» no implica ancho. Se incluyen cintura y cadera explícitamente definidas para calcular ICC sin reinterpretar las etiquetas ambiguas.

Bioimpedancia: peso total (lb), grasa corporal (%), masa musculoesquelética (lb), masa muscular total (lb), masa ósea (lb), agua corporal (%), proteínas (%), nivel de grasa visceral y tasa metabólica basal (kcal/día). Se registra dispositivo y condiciones cuando se conocen. Todos son estimaciones del dispositivo; porcentajes de componentes diferentes no se suman como una composición exhaustiva.

## Unidades y fórmulas

| Cálculo | Entradas válidas | Fórmula y alcance |
| --- | --- | --- |
| Libras a kg | Masa positiva finita | `kg = lb × 0.45359237`; factor exacto |
| Kg a libras | Masa positiva finita | `lb = kg / 0.45359237`; redondear sólo la presentación |
| IMC | Peso kg y altura cm positivos disponibles | `kg / (cm / 100)²`; índice descriptivo sin diagnóstico |
| ICC | Cintura y cadera expresamente definidas, misma fecha y protocolo, en cm | `cintura / cadera`; no inferir cintura del campo abdomen |
| 1RM estimado desde 5RM | Carga conocida y cinco repeticiones máximas documentadas en el mismo ejercicio | Epley: `carga × (1 + 5 / 30)`; estimación, no prueba directa ni carga prescrita |
| Porcentaje del 1RM | 1RM válido del mismo ejercicio y porcentaje explícito | `1RM × porcentaje / 100`; cálculo aritmético sujeto a revisión del entrenador |
| Volumen externo | Ejercicio con carga kg, series y repeticiones conocidas | `kg × series × repeticiones`; no equipara esfuerzo interno ni peso corporal |
| Asistencia | Sesiones vencidas o cerradas como realizadas/no realizadas | Completadas / total de sesiones vencidas o cerradas; se excluyen futuras aún planificadas. Una sesión vencida pendiente no equivale a ausencia confirmada |

El uso de `repeticiones/30` aproxima el coeficiente 0.0333 de la fórmula Epley. Por ejemplo, 100 kg × 5 repeticiones da 116.67 kg estimados. No se extrapola a repeticiones arbitrarias ni se aplica a otro ejercicio. No se prescriben cargas automáticamente cuando faltan datos.

Los valores canónicos del perfil son kg y cm. La API convierte las mediciones recibidas en libras a kg y en milímetros a cm al guardarlas; no conserva por separado la cifra original. Las demás unidades admitidas se conservan. La conversión no redefine una etiqueta ambigua: su significado sigue siendo obligatorio. Se muestran fecha, unidad y procedencia de los datos utilizados, y se distingue entre medición, estimación y cálculo. El ICC exige fecha y protocolo iguales; el modelo no diferencia dos tomas del mismo día con idéntico protocolo, por lo que el responsable debe usar una referencia de protocolo suficientemente específica.

Los planes aprobados son inmutables. Para adaptar uno, el entrenador crea y revisa un nuevo borrador; las sesiones históricas conservan el plan original. La rutina vigente es la aprobada más reciente cuyo inicio ya ocurrió y cuyas seis semanas no han terminado. Las sesiones planificadas o no realizadas no admiten ejercicios marcados como completados, también al actualizar parcialmente por API.

## Evaluaciones y retests

Se registran anamnesis/PAR-Q de referencia, postura, Sit and Reach, Thomas, Apley, Overhead Squat, 1RM directo o estimado desde 5RM, push-ups, dominadas, plancha, Cooper, Ruffier-Dickson, Sargent Jump, Broad Jump, FMS, Sorensen y Side Plank. Los estados son pendiente, realizada, no realizada y no apropiada. Un estado realizado requiere un resultado coherente; los otros estados no equivalen a un resultado cero.

Las pruebas cualitativas pueden documentarse en observaciones. El campo protocolo permite indicar versión, ejercicio, lado y condiciones relevantes. No se reproducen instrucciones licenciadas ni se asegura que un resultado prediga lesiones. La elección de pruebas, su ejecución y la interpretación requieren un profesional competente.

Para comparar inicio y retest se exige que la métrica y el método sean compatibles. Se conserva la fecha de ambos registros y su unidad. Una definición ambigua ausente, un protocolo distinto o un dispositivo no comparable impiden una conclusión directa. La ausencia de comparación es un resultado informativo, no un error a rellenar con valores inventados.
