export function todayInCostaRica(){return new Intl.DateTimeFormat('en-CA',{timeZone:'America/Costa_Rica',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}
export function isCurrentPlan(startDate:string,today=todayInCostaRica()){const days=(Date.parse(today)-Date.parse(startDate))/86400000;return days>=0&&days<42;}
export function isExpiredPlan(startDate:string,today=todayInCostaRica()){return Date.parse(today)-Date.parse(startDate)>=42*86400000;}
