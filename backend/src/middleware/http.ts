import type {RequestHandler,Request,Response} from 'express';
export function asyncRoute(handler:(req:Request,res:Response)=>Promise<unknown>):RequestHandler{return(req,res,next)=>{void handler(req,res).catch(next);};}
