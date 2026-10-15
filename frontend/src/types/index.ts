export type Role = 'TRAINER' | 'CLIENT';
export interface User {id:string;name:string;email:string;role:Role;clientId?:string}
export interface Client {id:string;name:string;sex:string|null;age:number|null;heightCm:number|null;weightKg:number|null;conditions:string;goals:string;equipment:string;schedule:string;experience?:string|null;trainerId:string;phase:number;nextRetest:string|null;compositionConsent:boolean;compositionFrequencyWeeks:number}
export interface MeasurementDefinition {key:string;label:string;units:string[];category:string;ambiguous?:boolean}
export interface TestDefinition {key:string;label:string;unit:string;notice?:string}
export interface Measurement {id:string;clientId:string;key:string;value:number;unit:string;date:string;responsible:string;notes:string;protocol?:string;meaning?:string;device?:string;conditions?:string}
export interface Assessment {id:string;clientId:string;key:string;status:'pending'|'completed'|'not_done'|'not_appropriate';value?:number|null;unit:string;date:string;responsible:string;notes:string;protocol?:string;kind:'initial'|'retest'}
export interface Exercise {id:string;name:string;category:string;equipment:string[];primaryMuscles:string[];secondaryMuscles:string[];technique:string;commonMistakes:string;alternatives:string[];sensations:string;stopSignals:string}
export interface PlanExercise {exerciseId:string;sets:number;reps:number|string;loadKg?:number|null;restSeconds:number;percent1RM?:number|null;oneRmKg?:number|null;notes:string;reason:string}
export interface PlanDay {day:string;title:string;exercises:PlanExercise[]}
export interface PlanWeek {week:number;phase:number;days:PlanDay[]}
export interface Plan {id:string;clientId:string;title:string;status:'draft'|'approved';startDate:string;weeks:PlanWeek[];fitt:{frequency:string;intensity:string;time:string;type:string};weeklySchedule:string;notes:string;source:'trainer'|'assistant'}
export interface Session {id:string;clientId:string;planId?:string;date:string;status:'planned'|'completed'|'missed';durationMinutes?:number|null;rpe?:number|null;fatigue?:number|null;motivation?:number|null;notes:string;trainerNotes?:string;exercises:{exerciseId:string;sets:number;reps:number|string;loadKg?:number|null;completed:boolean;notes?:string}[]}
export interface Report {clientId:string;comparisons:{key:string;label:string;unit:string;initial:{date:string;value:number};latest:{date:string;value:number};delta:number}[];excluded:{key:string;reason:string}[];summary:{completedSessions:number;plannedSessions:number;adherencePercent:number|null};derived:{bmi:number|null;waistHipRatio:number|null;oneRmEstimates?:{assessmentId:string;key:string;date:string;protocol?:string;load5RMKg:number;estimated1RMKg:number;formula:string;notice:string}[]};notice:string}
