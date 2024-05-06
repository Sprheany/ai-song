"use server";

import { configLemonsqueezy } from "@/config/lemonsqueezy";
import prisma, { NewPlan } from "@/prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import {
  Variant,
  createCheckout,
  getProduct,
  listPrices,
} from "@lemonsqueezy/lemonsqueezy.js";

export const syncPlans = async () => {
  configLemonsqueezy();

  const productVariants: NewPlan[] = await prisma.plan.findMany({});

  const _addVariant = async (variant: NewPlan) => {
    console.log(`Syncing variant ${variant.name} with the database ...`);

    await prisma.plan.upsert({
      where: {
        variantId: variant.variantId,
      },
      create: variant,
      update: variant,
    });

    console.log(`${variant.name} synced with the database.`);

    productVariants.push(variant);
  };

  const product = await getProduct(process.env.LEMONSQUEEZY_PRODUCT_ID!, {
    include: ["variants"],
  });

  const productName = product.data?.data.attributes.name ?? "";

  const allVariants = product.data?.included as Variant["data"][] | undefined;

  if (allVariants) {
    for (const v of allVariants) {
      const variant = v.attributes;

      if (variant.status === "draft" || variant.status === "pending") {
        continue;
      }

      const variantPriceObject = await listPrices({
        filter: {
          variantId: v.id,
        },
      });

      const currentPriceObj = variantPriceObject.data?.data.at(0);
      const isUsageBased =
        currentPriceObj?.attributes.usage_aggregation !== null;
      const interval =
        currentPriceObj?.attributes.renewal_interval_unit ?? null;
      const intervalCount =
        currentPriceObj?.attributes.renewal_interval_quantity ?? null;
      const trialInterval =
        currentPriceObj?.attributes.trial_interval_unit ?? null;
      const trialIntervalCount =
        currentPriceObj?.attributes.trial_interval_quantity ?? null;

      const price = isUsageBased
        ? currentPriceObj?.attributes.unit_price_decimal
        : currentPriceObj?.attributes.unit_price;

      const priceString = price != null ? price.toString() : "";

      const isSubscription =
        currentPriceObj?.attributes.category === "subscription";

      const plan: NewPlan = {
        name: variant.name,
        description: variant.description,
        price: priceString,
        interval,
        intervalCount,
        isUsageBased,
        productId: variant.product_id,
        productName,
        variantId: parseInt(v.id) as unknown as number,
        trialInterval,
        trialIntervalCount,
        sort: variant.sort,
      };

      if (!isSubscription) {
        plan.interval = null;
        plan.intervalCount = null;
        plan.trialInterval = null;
        plan.trialIntervalCount = null;
      }

      await _addVariant(plan);
    }
  }

  return productVariants;
};

export const getCheckoutURL = async (variantId: number, embed = false) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("Please sign in");
  }

  configLemonsqueezy();

  const checkout = await createCheckout(
    process.env.LEMONSQUEEZY_STORE_ID!,
    variantId,
    {
      checkoutOptions: {
        embed,
        media: false,
        logo: !embed,
      },
      checkoutData: {
        email: user.emailAddresses?.at(0)?.emailAddress ?? undefined,
        name: user.fullName ?? user.username ?? undefined,
        custom: {
          user_id: user.id,
        },
      },
      productOptions: {
        enabledVariants: [variantId],
        redirectUrl: `${process.env.NEXT_PUBLIC_URL}/billing`,
        receiptButtonText: "Go to Billing",
        receiptThankYouNote: "Thank you for your purchase!",
      },
    }
  );

  return checkout.data?.data.attributes.url;
};
