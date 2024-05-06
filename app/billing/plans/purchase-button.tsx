"use client";

import { getCheckoutURL } from "@/actions/payment";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NewPlan } from "@/prisma/client";
import { useRouter } from "next/navigation";
import { ComponentProps, useEffect, useTransition } from "react";
import { toast } from "sonner";

type Props = {
  embed?: boolean;
  isChangingPlan?: boolean;
  currentPlan?: NewPlan;
  plan: NewPlan;
} & ComponentProps<typeof Button>;

const PayButton = ({ embed = true, plan, currentPlan, ...props }: Props) => {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const isCurrent = currentPlan?.id === plan.id;

  const label = isCurrent ? "Your plan" : `Switch to this plan`;

  useEffect(() => {
    if (typeof window.createLemonSqueezy === "function") {
      window.createLemonSqueezy();
    }
  }, []);

  const checkout = async () => {
    startTransition(async () => {
      try {
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
