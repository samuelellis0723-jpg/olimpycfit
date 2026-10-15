import {compare} from 'bcryptjs';
import {z} from 'zod';
import {trainingRepository as repository} from '../repositories/training.repository.js';
import {ApiError} from '../errors.js';
import {cookieOptions,deleteSession,newSession,publicUser} from '../auth.js';
import {asyncRoute} from '../middleware/http.js';
const schema=z.object({email:z.string().email().max(200),password:z.string().min(1).max(200)}).strict();
const attempts=new Map<string,{count:number;reset:number}>();
export const login=asyncRoute(async(req,res)=>{const data=schema.parse(req.body);const key=req.ip??'unknown';const previous=attempts.get(key);const current=previous&&previous.reset>Date.now()?previous:{count:0,reset:Date.now()+60_000};if(current.count>=30)throw new ApiError(429,'TOO_MANY_ATTEMPTS','Espera un minuto antes de volver a intentar.');current.count++;attempts.set(key,current);const user=await repository.user.findUnique({where:{email:data.email.toLowerCase()}});if(!user||!(await compare(data.password,user.passwordHash)))throw new ApiError(401,'INVALID_CREDENTIALS','Correo o contraseña incorrectos.');attempts.delete(key);deleteSession(req.cookies?.session);const safe=publicUser(user);res.cookie('session',newSession(safe),{...cookieOptions,maxAge:Number(process.env.SESSION_TTL_MINUTES??480)*60_000}).json({user:safe});});
