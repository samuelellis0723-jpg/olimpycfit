export class ApiError extends Error {constructor(message:string,public status:number){super(message)}}
export async function api<T>(path:string,options:RequestInit={}):Promise<T>{
  const response=await fetch(`/api${path}`,{credentials:'include',...options,headers:{'Content-Type':'application/json',...options.headers}});
  const body=await response.json().catch(()=>null);
  if(!response.ok)throw new ApiError(body?.error?.fields?.length?`${body.error.message} ${body.error.fields.map((f:{message:string})=>f.message).join(' ')}`:body?.error?.message||body?.message||'No se pudo completar la solicitud. Inténtalo de nuevo.',response.status);
  return body as T;
}
export const post=<T>(path:string,body:unknown)=>api<T>(path,{method:'POST',body:JSON.stringify(body)});
export const patch=<T>(path:string,body:unknown)=>api<T>(path,{method:'PATCH',body:JSON.stringify(body)});
