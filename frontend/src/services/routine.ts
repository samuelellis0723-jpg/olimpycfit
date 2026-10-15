import type {Plan,Session} from '../types';
export const dayNames=['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
export function dayName(date:string){return dayNames[new Date(`${date}T12:00:00-06:00`).getUTCDay()]}
export function cycleTiming(plan:Plan,date:string){const diff=Math.floor((Date.parse(`${date.slice(0,10)}T00:00:00Z`)-Date.parse(`${plan.startDate.slice(0,10)}T00:00:00Z`))/86400000);return{weekIndex:Math.max(0,Math.min(plan.weeks.length-1,Math.floor(diff/7))),future:diff<0,finished:diff>=plan.weeks.length*7,elapsedDays:diff}}
export function sessionForDate(sessions:Session[],planId:string,date:string){return sessions.find(s=>s.planId===planId&&s.date.slice(0,10)===date)}
export function addDays(date:string,days:number){const d=new Date(`${date}T12:00:00Z`);d.setUTCDate(d.getUTCDate()+days);return d.toISOString().slice(0,10)}
