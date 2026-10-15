import { hash } from 'bcryptjs';
import { pathToFileURL } from 'node:url';
import { prisma } from '../src/db.js';
export async function seed() {
  const passwordHash=await hash('Demo123!',10);
  const profiles=[
    {id:'client-ana',name:'Ana Solís',sex:'female',age:32,heightCm:165,weightKg:67.4,conditions:'Sin condiciones declaradas. Perfil completamente sintético.',goals:'Mejorar fuerza general y constancia.',equipment:'Mancuernas, bandas y banco',schedule:'Lunes, miércoles y viernes · 45 min',experience:'Principiante: 4 meses de práctica',phase:2,nextRetest:'2026-10-28',compositionConsent:true,compositionFrequencyWeeks:6},
    {id:'client-luis',name:'Luis Méndez',sex:'male',age:45,heightCm:178,weightKg:84.2,conditions:'Molestia de rodilla declarada en escenario sintético; adaptar según tolerancia.',goals:'Retomar actividad y mejorar movilidad.',equipment:'Bandas y colchoneta',schedule:'Martes y jueves · 35 min',experience:'Retoma después de una pausa',phase:1,nextRetest:'2026-11-04',compositionConsent:false,compositionFrequencyWeeks:8},
    {id:'client-maria',name:'María Vega',sex:'female',age:28,heightCm:null,weightKg:null,conditions:'Sin información adicional registrada.',goals:'Construir hábitos de movimiento.',equipment:'Peso corporal',schedule:'Pendiente de acordar',experience:null,phase:1,nextRetest:null,compositionConsent:false,compositionFrequencyWeeks:6}
  ];
  for(const client of profiles)await prisma.client.upsert({where:{id:client.id},create:{...client,trainerId:'trainer-demo'},update:{}});
  for(const user of [{id:'trainer-demo',name:'Daniel Herrera',email:'trainer@demo.local',role:'TRAINER',clientId:null},{id:'user-ana',name:'Ana Solís',email:'client@demo.local',role:'CLIENT',clientId:'client-ana'},{id:'trainer-other',name:'Entrenador de aislamiento',email:'other@demo.local',role:'TRAINER',clientId:null}]) await prisma.user.upsert({where:{id:user.id},create:{...user,passwordHash},update:{passwordHash}});
  const weeks=Array.from({length:6},(_,index)=>({week:index+1,phase:[1,1,2,2,3,3][index],days:['Lunes','Miércoles','Viernes'].map((day,dayIndex)=>({day,title:dayIndex===1?'Control y movilidad':'Fuerza de cuerpo completo',exercises:[
    {exerciseId:'goblet-squat',sets:index<2?2:3,reps:'10',loadKg:8+(index>=4?2:0),restSeconds:90,notes:'Rango cómodo y ejecución controlada.',reason:'Desarrollar fuerza general de piernas según el objetivo declarado.'},
    {exerciseId:'seated-row',sets:3,reps:'10–12',loadKg:12,restSeconds:75,notes:'Mantener tronco estable.',reason:'Practicar un patrón de tracción equilibrado.'},
    {exerciseId:'incline-push-up',sets:2,reps:'8–10',loadKg:null,restSeconds:75,notes:'Ajustar altura del apoyo a tolerancia.',reason:'Practicar empuje con una variante adaptable.'},
    {exerciseId:'dead-bug',sets:2,reps:'6 por lado',loadKg:null,restSeconds:45,notes:'Respiración continua.',reason:'Trabajar control del tronco.'}
  ]}))}));
  const basePlan={clientId:'client-ana',title:'Base de fuerza · 6 semanas',startDate:'2026-09-21',weeks:JSON.stringify(weeks),fitt:JSON.stringify({frequency:'3 sesiones por semana',intensity:'Esfuerzo moderado · RPE 5–7, ajustable',time:'45 minutos',type:'Fuerza general y control motor'}),weeklySchedule:'Lunes, miércoles y viernes. Descanso o paseo cómodo entre sesiones.',notes:'Plan sintético aprobado por el entrenador. Cargas orientativas ajustables, sin promesas de prevención de lesiones.',source:'trainer'};
  await prisma.plan.upsert({where:{id:'plan-ana-base'},create:{...basePlan,id:'plan-ana-base',status:'approved',approvedAt:'2026-09-20T15:00:00Z',approvedBy:'trainer-demo'},update:{}});
  await prisma.plan.upsert({where:{id:'plan-ana-draft'},create:{...basePlan,id:'plan-ana-draft',title:'Próximo bloque · pendiente de revisión',startDate:'2026-11-02',status:'draft'},update:{}});
  const measurementInputs=[
    {key:'weight',value:68.5,unit:'kg',date:'2026-09-01'}, {key:'weight',value:67.4,unit:'kg',date:'2026-10-13'},
    {key:'waist',value:80,unit:'cm',date:'2026-09-01'}, {key:'waist',value:78,unit:'cm',date:'2026-10-13'},
    {key:'hip_circumference',value:100,unit:'cm',date:'2026-09-01'}, {key:'hip_circumference',value:99,unit:'cm',date:'2026-10-13'},
    {key:'body_fat',value:29,unit:'%',date:'2026-09-01'}, {key:'body_fat',value:28.1,unit:'%',date:'2026-10-13'},
    {key:'muscle_mass',value:42,unit:'kg',date:'2026-09-01'}, {key:'muscle_mass',value:42.3,unit:'kg',date:'2026-10-13'},
    {key:'abdomen_density',value:81,unit:'cm',date:'2026-09-01'}
  ];
  for(const [index,input] of measurementInputs.entries()){const bio=['body_fat','muscle_mass'].includes(input.key);const data={...input,id:`measurement-ana-${index}`,clientId:'client-ana',responsible:'Daniel Herrera',notes:'Registro sintético de demostración.',protocol:bio?'Bioimpedancia · protocolo demo A':'Antropometría · protocolo demo A',meaning:input.key==='abdomen_density'?'Etiqueta original conservada. En este registro representa perímetro a nivel del ombligo; no equivale a cintura.':null,device:bio?'BIA demo 01':null,conditions:bio?'Misma franja horaria; condiciones registradas para comparación.':null};await prisma.measurement.upsert({where:{id:data.id},create:data,update:{}});}
  const assessmentInputs=[
    {key:'pushups',status:'completed',value:8,unit:'reps',date:'2026-09-01',kind:'initial',protocol:'Flexión inclinada en banco de 70 cm; rango cómodo.'},
    {key:'pushups',status:'completed',value:12,unit:'reps',date:'2026-10-13',kind:'retest',protocol:'Flexión inclinada en banco de 70 cm; rango cómodo.'},
    {key:'plank',status:'completed',value:25,unit:'s',date:'2026-09-01',kind:'initial',protocol:'Antebrazos y pies; detener al perder control.'},
    {key:'plank',status:'completed',value:40,unit:'s',date:'2026-10-13',kind:'retest',protocol:'Antebrazos y pies; detener al perder control.'},
    {key:'squat_5rm',status:'completed',value:30,unit:'kg',date:'2026-09-01',kind:'initial',protocol:'Sentadilla goblet; cinco repeticiones válidas supervisadas.'},
    {key:'cooper',status:'not_appropriate',value:null,unit:'m',date:'2026-09-01',kind:'initial',protocol:null},
    {key:'sit_and_reach',status:'pending',value:null,unit:'cm',date:'2026-10-28',kind:'retest',protocol:null}
  ];
  for(const [index,input]of assessmentInputs.entries())await prisma.assessment.upsert({where:{id:`assessment-ana-${index}`},create:{...input,id:`assessment-ana-${index}`,clientId:'client-ana',responsible:'Daniel Herrera',notes:input.status==='not_appropriate'?'No indicada en esta etapa; decisión del entrenador.':'Dato sintético. No constituye diagnóstico.'},update:{}});
  for(const[index,date]of ['2026-09-21','2026-09-23','2026-09-25','2026-09-28','2026-09-30','2026-10-02','2026-10-05','2026-10-07','2026-10-09','2026-10-12','2026-10-14','2026-10-16'].entries()){const completed=index<10&&index!==4;await prisma.trainingSession.upsert({where:{id:`session-ana-${index}`},create:{id:`session-ana-${index}`,clientId:'client-ana',planId:'plan-ana-base',date,status:index===4?'missed':completed?'completed':'planned',durationMinutes:completed?42:null,rpe:completed?6:null,fatigue:completed?4:null,motivation:completed?8:null,notes:index===4?'No asistió; reprogramación pendiente.':completed?'Sesión completada con esfuerzo tolerable.':'Pendiente de realizar.',trainerNotes:completed?'Buena continuidad técnica; mantener progresión individual.':null,exercises:JSON.stringify(weeks[0].days[0].exercises.map(exercise=>({exerciseId:exercise.exerciseId,sets:exercise.sets,reps:exercise.reps,loadKg:exercise.loadKg,completed})))},update:{}});}
}
if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href)seed().then(()=>prisma.$disconnect()).catch(async()=>{console.error('No se pudo preparar la demostración. Revisa la configuración local.');await prisma.$disconnect();process.exit(1);});
