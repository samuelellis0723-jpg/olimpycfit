import {Router} from 'express';
import {assistant} from '../controllers/assistant.controller.js';
import {assistantMode} from '../services/assistant.service.js';
export const assistantRouter=Router();
assistantRouter.get('/status',(_req,res)=>res.json({mode:assistantMode(),requiresConsent:assistantMode()==='connected'}));
assistantRouter.post('/',assistant);
