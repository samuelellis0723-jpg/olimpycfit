import type {Plan,Session} from '../types';
export const dayNames=['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
export function validCalendarDate(value:string|null|undefined):value is string{if(!value||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;const parsed=new Date(`${value}T00:00:00.000Z`);return Number.isFinite(parsed.getTime())&&parsed.toISOString().slice(0,10)===value}
export function routineDate(value:string|null|undefined,fallback:string){return validCalendarDate(value)?value:fallback}
export function dayName(date:string){return dayNames[new Date(`${date}T12:00:00-06:00`).getUTCDay()]}
export function cycleTiming(plan:Plan,date:string){const diff=Math.floor((Date.parse(`${date.slice(0,10)}T00:00:00Z`)-Date.parse(`${plan.startDate.slice(0,10)}T00:00:00Z`))/86400000);return{weekIndex:Math.max(0,Math.min(plan.weeks.length-1,Math.floor(diff/7))),future:diff<0,finished:diff>=plan.weeks.length*7,elapsedDays:diff}}
export function prescriptionForDate(plan:Plan,date:string){if(!validCalendarDate(date))return undefined;const timing=cycleTiming(plan,date);if(timing.future||timing.finished)return undefined;return plan.weeks[timing.weekIndex]?.days.find(day=>day.day.toLocaleLowerCase()===dayName(date).toLocaleLowerCase())}
export function sessionForDate(sessions:Session[],planId:string,date:string){return sessions.find(s=>s.planId===planId&&s.date.slice(0,10)===date)}
export function addDays(date:string,days:number){const d=new Date(`${date}T12:00:00Z`);d.setUTCDate(d.getUTCDate()+days);return d.toISOString().slice(0,10)}
