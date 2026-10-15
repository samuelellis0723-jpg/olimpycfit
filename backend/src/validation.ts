import {z} from 'zod';
import {measurementCatalog,testCatalog,canonicalWeight} from './catalog.js';
import {exercises} from './exercises.js';
export const dateSchema=z.string().regex(/^\d{4}-\d{2}-\d{2}$/,'Usa una fecha AAAA-MM-DD.').refine(value=>{const date=new Date(`${value}T12:00:00Z`);return !Number.isNaN(date.valueOf())&&date.toISOString().slice(0,10)===value;},'La fecha no existe.');
const text=z.string().trim().max(3000);
const smallText=z.string().trim().max(300);
const nullableText=text.nullable().optional();
export const profileSchema=z.object({name:smallText.min(2).optional(),sex:z.enum(['female','male','other','unspecified']).nullable().optional(),age:z.number().int().min(18).max(100).nullable().optional(),heightCm:z.number().min(100).max(250).nullable().optional(),weightKg:z.number().min(20).max(500).nullable().optional(),conditions:text.optional(),goals:text.optional(),equipment:text.optional(),schedule:text.optional(),experience:nullableText,phase:z.number().int().min(1).max(5).optional(),nextRetest:dateSchema.nullable().optional(),compositionConsent:z.boolean().optional(),compositionFrequencyWeeks:z.number().int().min(4).max(8).optional()}).strict().refine(data=>Object.keys(data).length>0,'No hay cambios para guardar.');
export const measurementSchema=z.object({key:smallText.min(1),value:z.number().finite(),unit:smallText.min(1),date:dateSchema,responsible:smallText.min(1),notes:text.default(''),meaning:nullableText,device:nullableText,conditions:nullableText,protocol:nullableText}).strict().superRefine((data,ctx)=>{const definition=measurementCatalog.find(item=>item.key===data.key);if(!definition){ctx.addIssue({code:'custom',path:['key'],message:'Medida no reconocida.'});return;}if(!definition.units.includes(data.unit))ctx.addIssue({code:'custom',path:['unit'],message:'Unidad incompatible con esta medida.'});const value=canonicalWeight(data.value,data.unit);if(value<definition.min||value>definition.max)ctx.addIssue({code:'custom',path:['value'],message:`Valor fuera de rango (${definition.min}–${definition.max}, unidad canónica).`});if(definition.ambiguous&&!data.meaning?.trim())ctx.addIssue({code:'custom',path:['meaning'],message:'Documenta qué significa esta etiqueta antes de guardarla.'});});
export const assessmentSchema=z.object({
  key:smallText.min(1),status:z.enum(['pending','completed','not_done','not_appropriate']),
  value:z.number().finite().min(-100).max(10000).nullable().optional(),unit:smallText.nullable().optional(),
  date:dateSchema,responsible:smallText.min(1),notes:text.default(''),protocol:nullableText,kind:z.enum(['initial','retest'])
}).strict().superRefine((data,ctx)=>{
  const definition=testCatalog.find(item=>item.key===data.key);
  const issue=(field:string,message:string)=>ctx.addIssue({code:'custom',path:[field],message});
  if(!definition){issue('key','Prueba no reconocida.');return;}
  if(data.unit!=null&&data.unit!==definition.unit)issue('unit','Unidad incompatible con la prueba.');
  if(data.status==='completed'&&definition.unit!=='observación'&&(data.value==null||data.unit==null))issue('value','Completa valor y unidad o registra la prueba como no realizada.');
  if(data.status!=='completed'&&data.value!=null)issue('value','Una prueba pendiente o no realizada no debe tener valor.');
  if((data.status==='not_done'||data.status==='not_appropriate'||(data.status==='completed'&&definition.unit==='observación'))&&!data.notes.trim())issue('notes','Documenta el resultado observado o el motivo de no realizar la prueba.');
  if((data.key.endsWith('_5rm')||data.key==='direct_1rm')&&data.value!=null&&(data.value<=0||data.value>500))issue('value','La carga debe ser mayor que 0 y no superar 500 kg.');
  if((data.key.endsWith('_5rm')||data.key==='direct_1rm')&&data.status==='completed'&&!data.protocol?.trim())issue('protocol','Identifica el ejercicio y el protocolo para registrar una carga de fuerza.');
  const bounds:Record<string,[number,number]>={reps:[0,500],s:[0,3600],m:[0,10000],cm:[['sit_and_reach','apley'].includes(data.key)?-100:0,500],'°':[0,360],'índice':[-20,50]};
  const bound=bounds[definition.unit];
  if(data.value!=null&&bound&&(data.value<bound[0]||data.value>bound[1]))issue('value','Valor fuera del rango admitido para esta prueba.');
  if(definition.unit==='reps'&&data.value!=null&&!Number.isInteger(data.value))issue('value','Registra un número entero de repeticiones.');
  if(definition.unit==='observación'&&data.value!=null)issue('value','Esta observación se documenta en notas; no uses una puntuación inventada.');
});
const exerciseId=smallText.refine(id=>exercises.some(exercise=>exercise.id===id),'Ejercicio no reconocido.');
export const planExerciseSchema=z.object({exerciseId,sets:z.number().int().min(1).max(20),reps:z.union([z.string().trim().min(1).max(100),z.number().int().min(1).max(1000)]),loadKg:z.number().min(0).max(500).nullable().optional(),restSeconds:z.number().int().min(0).max(1800),percent1RM:z.number().min(1).max(100).nullable().optional(),oneRmKg:z.number().min(0.1).max(600).nullable().optional(),notes:text.default(''),reason:text.min(1)}).strict().superRefine((data,ctx)=>{if(data.percent1RM!=null&&data.oneRmKg==null)ctx.addIssue({code:'custom',path:['oneRmKg'],message:'Falta un 1RM registrado o estimado para usar el porcentaje.'});if(data.percent1RM!=null&&data.oneRmKg!=null&&data.loadKg!=null&&Math.abs(data.loadKg-data.oneRmKg*data.percent1RM/100)>0.51)ctx.addIssue({code:'custom',path:['loadKg'],message:'La carga no coincide con el porcentaje de 1RM (tolerancia 0,5 kg).'});});
export const planBody=z.object({title:smallText.min(2),startDate:dateSchema,weeks:z.array(z.object({week:z.number().int().min(1).max(6),phase:z.number().int().min(1).max(3),days:z.array(z.object({day:z.enum(['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo']),title:smallText.min(1),exercises:z.array(planExerciseSchema).min(1).max(20)}).strict()).min(1).max(7)}).strict()).length(6,'El mesociclo debe contener exactamente seis semanas.'),fitt:z.object({frequency:smallText.min(1),intensity:smallText.min(1),time:smallText.min(1),type:smallText.min(1)}).strict(),weeklySchedule:text,notes:text.default(''),source:z.enum(['trainer','assistant']).default('trainer')}).strict();
export const planSchema=planBody.superRefine((data,ctx)=>{
  if(new Set(data.weeks.map(week=>week.week)).size!==6)ctx.addIssue({code:'custom',path:['weeks'],message:'Registra una vez cada semana del 1 al 6.'});
  data.weeks.forEach((week,index)=>{if(new Set(week.days.map(day=>day.day)).size!==week.days.length)ctx.addIssue({code:'custom',path:['weeks',index,'days'],message:'No repitas un día dentro de la misma semana.'});});
});
const sessionExercise=z.object({exerciseId,sets:z.number().int().min(0).max(20),reps:z.union([z.string().max(100),z.number().int().min(0).max(1000)]),loadKg:z.number().min(0).max(500).nullable().optional(),completed:z.boolean(),notes:text.optional()}).strict();
export const sessionBody=z.object({planId:smallText.nullable().optional(),date:dateSchema,status:z.enum(['planned','completed','missed']),durationMinutes:z.number().int().min(1).max(360).nullable().optional(),rpe:z.number().int().min(0).max(10).nullable().optional(),fatigue:z.number().int().min(0).max(10).nullable().optional(),motivation:z.number().int().min(0).max(10).nullable().optional(),notes:text.default(''),exercises:z.array(sessionExercise).max(30),trainerNotes:nullableText}).strict();
export const sessionPatch=sessionBody.partial().refine(data=>Object.keys(data).length>0,'No hay cambios para guardar.');
