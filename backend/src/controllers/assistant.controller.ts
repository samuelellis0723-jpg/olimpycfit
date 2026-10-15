import {actor} from '../auth.js';
import {asyncRoute} from '../middleware/http.js';
import {answerAssistant,assistantInput} from '../services/assistant.service.js';
export const assistant=asyncRoute(async(req,res)=>res.json(await answerAssistant(actor(req),assistantInput.parse(req.body))));
