import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { NewPlan } from "@/prisma/client";
import PurchaseButton from "./purchase-button";

type Props = {
  plan: NewPlan;
  currentPlan?: NewPlan;
};

const Plan = ({ plan, currentPlan }: Props) => {
  const { description, interval, name, price } = plan;
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="space-y-2">
          <span className="text-base">{name}</span>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold">{formatPrice(price)}</span>
            <span className="text-base font-normal">
              {!plan.isUsageBased && interval && `per ${interval}`}
              {plan.isUsageBased && interval && `/unit per ${interval}`}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="flex-1">
        {description && (
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className="pt-4 px-6 space-y-2 [&>ul]:list-disc "
          />
        )}
      </CardContent>
      <CardFooter>
        <PurchaseButton
          className="w-full"
          plan={plan}
          currentPlan={currentPlan}
        />
      </CardFooter>
    </Card>
  );
};

export default Plan;