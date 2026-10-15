import {Router} from 'express';
import {cookieOptions,deleteSession,requireAuth} from '../auth.js';
import {login} from '../controllers/auth.controller.js';
export const authRouter=Router();
authRouter.post('/login',login);
authRouter.get('/me',requireAuth,(req,res)=>res.json({user:req.user}));
authRouter.post('/logout',(req,res)=>{deleteSession(req.cookies?.session);res.clearCookie('session',cookieOptions).json({ok:true});});
