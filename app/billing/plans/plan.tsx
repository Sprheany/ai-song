import LoginButton from "@/components/login-button";
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
import { LemonSqueezySubscription } from "@prisma/client";
import PurchaseButton from "./purchase-button";

type Props = {
  plan: NewPlan;
  subscription?: LemonSqueezySubscription | null;
};

const Plan = ({ plan, subscription }: Props) => {
  const { description, interval, name, price } = plan;
  const message =
    subscription?.planId === plan.id
      ? `Renews on ${subscription?.renewsAt?.toLocaleDateString()}`
      : "";

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
            className="pt-4 px-6 [&>ul]:list-disc [&>ul]:space-y-2"
          />
        )}
      </CardContent>
      <CardFooter>
        <LoginButton className="w-full">
          <div className="w-full flex flex-col items-center gap-2">
            <p className="text-sm opacity-50">{message}</p>
            <PurchaseButton
              plan={plan}
              subscription={subscription}
              className="w-full"
            />
          </div>
        </LoginButton>
      </CardFooter>
    </Card>
  );
};

export default Plan;
