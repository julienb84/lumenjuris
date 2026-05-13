import { prisma } from "../../prisma/singletonPrisma";

type PlanSeed = {
  name: string;
  price: number;
  interval: string;
  creditAnalyse: number;
  creditSignature: number;
  creditGenerationDoc: number;
};

const PLANS_SEED: PlanSeed[] = [
  {
    name: "Freemium",
    price: 0,
    interval: "month",
    creditAnalyse: 500,
    creditSignature: 20,
    creditGenerationDoc: 30,
  },
  {
    name: "Starter",
    price: 2900,
    interval: "month",
    creditAnalyse: 500,
    creditSignature: 5,
    creditGenerationDoc: 5,
  },
  {
    name: "Starter",
    price: 28800,
    interval: "year",
    creditAnalyse: 500,
    creditSignature: 5,
    creditGenerationDoc: 5,
  },
  {
    name: "Pro",
    price: 7900,
    interval: "month",
    creditAnalyse: 2000,
    creditSignature: 20,
    creditGenerationDoc: 30,
  },
  {
    name: "Pro",
    price: 78000,
    interval: "year",
    creditAnalyse: 2000,
    creditSignature: 20,
    creditGenerationDoc: 30,
  },
];

export async function seedPlans(): Promise<void> {
  for (const plan of PLANS_SEED) {
    const exists = await prisma.plan.findFirst({
      where: { name: plan.name, interval: plan.interval },
    });

    if (!exists) {
      await prisma.plan.create({ data: plan });
    }
  }

  console.log("Plans ready.");
}
