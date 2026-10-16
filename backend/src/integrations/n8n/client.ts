import {z} from 'zod';
import {ApiError} from '../../errors.js';

async function readLimitedJson(response:Response){
  if(!response.body)throw new ApiError(502,'ASSISTANT_INVALID_RESPONSE','El asistente devolvió una respuesta vacía.');
  const reader=response.body.getReader();const chunks:Uint8Array[]=[];let size=0;
  while(true){const part=await reader.read();if(part.done)break;size+=part.value.byteLength;if(size>65536){await reader.cancel();throw new ApiError(502,'ASSISTANT_INVALID_RESPONSE','La respuesta del asistente excede el límite permitido.');}chunks.push(part.value);}
  try{return JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown;}catch{throw new ApiError(502,'ASSISTANT_INVALID_RESPONSE','El asistente devolvió un formato no válido.');}
}
export async function callWebhook<T>(payload:unknown,schema:z.ZodType<T,z.ZodTypeDef,unknown>):Promise<T>{
  const configured=process.env.N8N_WEBHOOK_URL?.trim();
  let url:URL;try{url=new URL(configured??'');}catch{throw new ApiError(503,'ASSISTANT_CONFIGURATION','Revisa la configuración del asistente en el servidor.');}
  if(!process.env.N8N_WEBHOOK_TOKEN?.trim())throw new ApiError(503,'ASSISTANT_CONFIGURATION','Configura la credencial del webhook en el servidor.');
  if(url.username||url.password||!['https:','http:'].includes(url.protocol)||(url.protocol==='http:'&&!['localhost','127.0.0.1','[::1]'].includes(url.hostname)))throw new ApiError(503,'ASSISTANT_CONFIGURATION','El asistente requiere HTTPS o una conexión local.');
  const timeout=Math.max(100,Math.min(20000,Number(process.env.N8N_TIMEOUT_MS)||8000));
  try{
    const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json',...(process.env.N8N_WEBHOOK_TOKEN?{Authorization:`Bearer ${process.env.N8N_WEBHOOK_TOKEN}`}:{})},body:JSON.stringify(payload),signal:AbortSignal.timeout(timeout),redirect:'error'});
    if(!response.ok)throw new ApiError(502,'ASSISTANT_UNAVAILABLE','El asistente conectado no está disponible. Puedes volver a intentar.');
    const parsed=schema.safeParse(await readLimitedJson(response));
    if(!parsed.success)throw new ApiError(502,'ASSISTANT_INVALID_RESPONSE','La respuesta no cumple el formato de una propuesta revisable.');
    return parsed.data;
  }catch(error:unknown){if(error instanceof ApiError)throw error;if(error instanceof Error&&['TimeoutError','AbortError'].includes(error.name))throw new ApiError(504,'ASSISTANT_TIMEOUT','El asistente tardó demasiado. No se guardó ninguna propuesta.');throw new ApiError(502,'ASSISTANT_UNAVAILABLE','No se pudo contactar con el asistente.');}
}
