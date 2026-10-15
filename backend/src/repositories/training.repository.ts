import {prisma} from '../db.js';
export const trainingRepository={
  client:prisma.client,
  measurement:prisma.measurement,
  assessment:prisma.assessment,
  plan:prisma.plan,
  session:prisma.trainingSession,
  user:prisma.user
};
