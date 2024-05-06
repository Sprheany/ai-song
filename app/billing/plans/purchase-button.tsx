"use client";

import { changePlan, getCheckoutURL } from "@/actions/payment";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NewPlan } from "@/prisma/client";
import { LemonSqueezySubscription } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ComponentProps, useEffect, useTransition } from "react";
import { toast } from "sonner";

type Props = {
  embed?: boolean;
  subscription?: LemonSqueezySubscription | null;
  plan: NewPlan;
} & ComponentProps<typeof Button>;

const PayButton = ({ embed = true, plan, subscription, ...props }: Props) => {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const isCurrent = subscription?.planId === plan.id;

  const label = isCurrent
    ? "Your plan"
    : subscription
    ? "Switch to this plan"
    : "Subscribe";

  useEffect(() => {
    if (typeof window.createLemonSqueezy === "function") {
      window.createLemonSqueezy();
    }
  }, []);

  const checkout = async () => {
    startTransition(async () => {
      try {
        if (subscription) {
          if (!plan.id) {
            throw new Error("Plan not found");
          }

          await changePlan(subscription.planId, plan.id);

          return;
        }

        const checkoutUrl = await getCheckoutURL(plan.variantId, embed);

        embed
          ? checkoutUrl && window.LemonSqueezy.Url.Open(checkoutUrl)
          : router.push(checkoutUrl ?? "/billing");
      } catch (error: any) {
        toast.error(error.message);
      }
    });
  };

  return (
    <Button
      disabled={pending || isCurrent || props.disabled}
      onClick={checkout}
      {...props}
      className={cn(props.className, isCurrent && "bg-green-700")}
    >
      {label}
    </Button>
  );
};

export default PayButton;
