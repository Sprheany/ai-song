import { Prisma, PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

export default prisma;

export type NewPlan = Prisma.PlanUncheckedCreateInput;
