import { Prisma, PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

export default prisma;

export type NewPlan = Prisma.PlanUncheckedCreateInput;
export type NewWebhookEvent =
  Prisma.LemonSqueezyWebhookEventUncheckedCreateInput;
export type NewSubscription =
  Prisma.LemonSqueezySubscriptionUncheckedCreateInput;
