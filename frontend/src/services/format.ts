export function today(){return new Intl.DateTimeFormat('en-CA',{timeZone:'America/Costa_Rica',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())}
export function dateLabel(value?:string|null){if(!value)return 'Sin fecha';const date=new Date(value.length===10?`${value}T12:00:00`:value);return Number.isNaN(date.getTime())?value:new Intl.DateTimeFormat('es-CR',{day:'numeric',month:'short',year:'numeric'}).format(date)}
export function numberLabel(value:number|null|undefined,digits=1){return value==null?'Sin datos':new Intl.NumberFormat('es-CR',{maximumFractionDigits:digits}).format(value)}
export const phaseNames=['Evaluación inicial','Planificación','Prescripción','Seguimiento','Retest y nuevo ciclo'];
export const statusLabels:Record<string,string>={pending:'Pendiente',completed:'Realizada',not_done:'No realizada',not_appropriate:'No apropiada',planned:'Planificada',missed:'No realizada',approved:'Aprobado',draft:'Borrador'};
export function nullableNumber(value:string){return value.trim()===''?null:Number(value)}
export function toKg(value:number,unit:string){return unit==='lb'?value*0.45359237:value}
export function loadFromPercent(oneRm:number|null|undefined,percent:number|null|undefined){return oneRm!=null&&oneRm>0&&percent!=null&&percent>0&&percent<=100?Math.round(oneRm*percent)/100:null}
export function volume(exercises:{sets:number;reps:number|string;loadKg?:number|null;completed?:boolean}[],completedOnly=false){const valid=exercises.filter(e=>(!completedOnly||e.completed)&&e.loadKg!=null&&Number.isFinite(Number(e.reps))&&Number(e.reps)>0);return valid.length?valid.reduce((total,e)=>total+e.sets*Number(e.reps)*e.loadKg!,0):null}
