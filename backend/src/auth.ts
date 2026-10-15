import { randomBytes } from 'node:crypto';
import type { RequestHandler, Request } from 'express';
import type { User } from '@prisma/client';
import { ApiError } from './errors.js';
export type PublicUser = {id:string;name:string;email:string;role:'TRAINER'|'CLIENT';clientId?:string};
declare global {namespace Express {interface Request {user?:PublicUser}}}
const sessions = new Map<string,{user:PublicUser;expiresAt:number}>();
export function publicUser(user:User):PublicUser {return {id:user.id,name:user.name,email:user.email,role:user.role as PublicUser['role'],...(user.clientId?{clientId:user.clientId}:{})};}
export function newSession(user:PublicUser,ttlMs=Number(process.env.SESSION_TTL_MINUTES??480)*60_000) {const token=randomBytes(32).toString('hex');for(const [key,value] of sessions) if(value.expiresAt<=Date.now()) sessions.delete(key); sessions.set(token,{user,expiresAt:Date.now()+ttlMs});return token;}
export function deleteSession(token:unknown) {if(typeof token==='string') sessions.delete(token);}
export const requireAuth:RequestHandler = (req,_res,next)=> {const token:unknown=req.cookies?.session;const session=typeof token==='string'?sessions.get(token):undefined;if(!session || session.expiresAt<=Date.now()){deleteSession(token);next(new ApiError(401,'UNAUTHENTICATED','Inicia sesión para continuar.'));return;}req.user=session.user;next();};
export const requireTrainer:RequestHandler=(req,_res,next)=>{if(req.user?.role!=='TRAINER'){next(new ApiError(403,'FORBIDDEN','Esta acción requiere el rol de entrenador.'));return;}next();};
export function actor(req:Request):PublicUser {if(!req.user)throw new ApiError(401,'UNAUTHENTICATED','Inicia sesión para continuar.');return req.user;}
export const cookieOptions={httpOnly:true,sameSite:'strict' as const,secure:process.env.NODE_ENV==='production',path:'/api'};
