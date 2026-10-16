export class ApiError extends Error {constructor(message:string,public status:number){super(message)}}
export async function api<T>(path:string,options:RequestInit={}):Promise<T>{
  let response:Response;
  try{response=await fetch(`/api${path}`,{credentials:'include',...options,headers:{'Content-Type':'application/json',...options.headers}})}catch{throw new ApiError('No fue posible conectar con el servidor local. Comprueba que esté en ejecución e inténtalo de nuevo.',0)}
  const body=await response.json().catch(()=>null);
  if(!response.ok)throw new ApiError(body?.error?.fields?.length?`${body.error.message} ${body.error.fields.map((f:{message:string})=>f.message).join(' ')}`:body?.error?.message||body?.message||'No se pudo completar la solicitud. Inténtalo de nuevo.',response.status);
  if(body===null&&response.status!==204)throw new ApiError('El servidor devolvió una respuesta no válida. Inténtalo de nuevo.',502);
  return body as T;
}
export const post=<T>(path:string,body:unknown)=>api<T>(path,{method:'POST',body:JSON.stringify(body)});
export const patch=<T>(path:string,body:unknown)=>api<T>(path,{method:'PATCH',body:JSON.stringify(body)});
