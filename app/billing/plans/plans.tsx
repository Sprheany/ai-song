import { syncPlans } from "@/actions/payment";
import { Separator } from "@/components/ui/separator";
import prisma, { NewPlan } from "@/prisma/client";
import Plan from "./plan";

const Plans = async () => {
  let allPlans: NewPlan[] = await prisma.plan.findMany({});

  if (!allPlans.length) {
    allPlans = await syncPlans();
  }

  if (!allPlans.length) {
    return <p>No plans available.</p>;
  }

  const sortedPlans = allPlans.sort((a, b) => {
    return a.sort - b.sort;
  });

  return (
    <div>
      <h2 className="flex items-center gap-5">
        Plans <Separator />
      </h2>
      <div className="mb-6 mt-4 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
        {sortedPlans.map((plan, index) => {
          return <Plan key={index} plan={plan} />;
        })}
      </div>
    </div>
  );
};

export default Plans;
