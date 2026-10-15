import type {Assessment,Measurement} from '@prisma/client';
import {bmi,epley5RM,measurementCatalog,testCatalog,waistHipRatio} from '../catalog.js';
import {trainingRepository as repository} from '../repositories/training.repository.js';
import {getOwnedClient} from './client.service.js';
import type {PublicUser} from '../auth.js';
import {todayInCostaRica} from './date.service.js';
type Comparison={key:string;label:string;unit:string;initial:{date:string;value:number};latest:{date:string;value:number};delta:number};
export async function clientReport(user:PublicUser,clientId:string) {
  const client=await getOwnedClient(user,clientId);
  const [measurements,assessments,sessions]=await Promise.all([repository.measurement.findMany({where:{clientId},orderBy:{date:'asc'}}),repository.assessment.findMany({where:{clientId},orderBy:{date:'asc'}}),repository.session.findMany({where:{clientId}})]);
  const comparisons:Comparison[]=[];const excluded:{key:string;reason:string}[]=[];
  const compare=(key:string,label:string,items:(Measurement|Assessment)[],bio=false,ambiguous=false)=>{
    if(items.length<2){excluded.push({key,reason:'Faltan dos registros realizados comparables.'});return;}
    const initial=items[0];const latest=items[items.length-1];
    if(ambiguous&&'meaning'in initial&&'meaning'in latest&&(!initial.meaning?.trim()||!latest.meaning?.trim())){excluded.push({key,reason:'La etiqueta ambigua requiere una definición explícita en ambos registros.'});return;}
    if(initial.date===latest.date||initial.value==null||latest.value==null||!initial.unit||initial.unit!==latest.unit||!initial.protocol?.trim()||initial.protocol!==latest.protocol){excluded.push({key,reason:'Fecha, unidad, resultado o protocolo ausente/diferente; no se calcula cambio.'});return;}
    if('meaning'in initial&&'meaning'in latest&&initial.meaning!==latest.meaning){excluded.push({key,reason:'Cambió la definición de la medida.'});return;}
    if(bio&&'device'in initial&&'device'in latest&&(!initial.device||initial.device!==latest.device||!initial.conditions||initial.conditions!==latest.conditions)){excluded.push({key,reason:'Dispositivo o condiciones de bioimpedancia ausentes o diferentes.'});return;}
    comparisons.push({key,label,unit:initial.unit,initial:{date:initial.date,value:initial.value},latest:{date:latest.date,value:latest.value},delta:latest.value-initial.value});
  };
  for(const definition of measurementCatalog){const items=measurements.filter(item=>item.key===definition.key);if(items.length)compare(definition.key,definition.label,items,definition.category==='Bioimpedancia',definition.ambiguous);}
  for(const definition of testCatalog){const items=assessments.filter(item=>item.key===definition.key&&item.status==='completed');if(items.length)compare(definition.key,definition.label,items);}
  const waist=measurements.filter(item=>item.key==='waist'&&item.unit==='cm'&&item.protocol?.trim()).at(-1);
  const hip=waist?measurements.find(item=>item.key==='hip_circumference'&&item.unit==='cm'&&item.date===waist.date&&item.protocol===waist.protocol):undefined;
  const today=todayInCostaRica();
  const due=sessions.filter(session=>session.date<=today||session.status==='completed'||session.status==='missed');
  const completedSessions=due.filter(session=>session.status==='completed').length;
  const oneRmEstimates=assessments.filter(item=>item.status==='completed'&&(item.key.endsWith('_5rm')||item.key==='estimated_5rm')).map(item=>({assessmentId:item.id,key:item.key,date:item.date,protocol:item.protocol,load5RMKg:item.value,estimated1RMKg:epley5RM(item.value),formula:'Epley: 5RM × (1 + 5/30)',notice:'Estimación; no equivale a una prueba directa de 1RM.'}));
  return {clientId,comparisons,excluded,summary:{completedSessions,plannedSessions:due.length,adherencePercent:due.length?completedSessions/due.length*100:null},derived:{bmi:bmi(client.weightKg,client.heightCm),waistHipRatio:waistHipRatio(waist?.value,hip?.value),oneRmEstimates},notice:'Datos sintéticos. Sólo se comparan registros con la misma definición, unidad y protocolo. La bioimpedancia depende del dispositivo y las condiciones. Los índices no son diagnósticos.'};
}
