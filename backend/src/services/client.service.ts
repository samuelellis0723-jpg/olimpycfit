import type {PublicUser} from '../auth.js';
import {ApiError} from '../errors.js';
import {trainingRepository as repository} from '../repositories/training.repository.js';
export async function getOwnedClient(user:PublicUser,id:string) {
  const client=await repository.client.findUnique({where:{id}});
  if(!client||(user.role==='TRAINER'?client.trainerId!==user.id:user.clientId!==client.id))throw new ApiError(404,'NOT_FOUND','Cliente no encontrado.');
  return client;
}
export async function getOwnedPlan(user:PublicUser,clientId:string,planId:string) {
  await getOwnedClient(user,clientId);
  const plan=await repository.plan.findFirst({where:{id:planId,clientId}});
  if(!plan)throw new ApiError(404,'NOT_FOUND','Rutina no encontrada.');
  return plan;
}
export async function getOwnedSession(user:PublicUser,clientId:string,sessionId:string) {
  await getOwnedClient(user,clientId);
  const session=await repository.session.findFirst({where:{id:sessionId,clientId}});
  if(!session)throw new ApiError(404,'NOT_FOUND','Sesión no encontrada.');
  return session;
}
