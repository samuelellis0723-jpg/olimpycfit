import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
export class ApiError extends Error {
  constructor(public status:number, public code:string, message:string) { super(message); }
}
export const errorHandler: ErrorRequestHandler = (error:unknown,_req,res,_next) => {
  if(error instanceof ZodError) { res.status(400).json({error:{code:'VALIDATION_ERROR',message:'Revisa los campos indicados.',fields:error.issues.map(i=>({field:i.path.join('.'),message:i.message}))}}); return; }
  if(error instanceof ApiError) {res.status(error.status).json({error:{code:error.code,message:error.message}}); return;}
  if(typeof error==='object' && error!==null && 'type' in error && error.type==='entity.too.large') {res.status(413).json({error:{code:'PAYLOAD_TOO_LARGE',message:'El envío supera el tamaño permitido.'}});return;}
  if(error instanceof SyntaxError) {res.status(400).json({error:{code:'INVALID_JSON',message:'El formato JSON no es válido.'}});return;}
  res.status(500).json({error:{code:'INTERNAL_ERROR',message:'No se pudo completar la operación.'}});
};
