"use server";

import {
  SubscriptionStatusType,
  configLemonsqueezy,
} from "@/config/lemonsqueezy";
import { webhookHasData, webhookHasMeta } from "@/lib/typeguards";
import { isValidSubscription } from "@/lib/utils";
import prisma, {
  NewPlan,
  NewSubscription,
  NewWebhookEvent,
} from "@/prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import {
  Variant,
  createCheckout,
  getPrice,
  getProduct,
  listPrices,
  updateSubscription,
} from "@lemonsqueezy/lemonsqueezy.js";
import { LemonSqueezyWebhookEvent } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
    throw new Error("Unauthorized");
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

export const changePlan = async (currentPlanId: string, newPlanId: string) => {
  configLemonsqueezy();

  const userSubscription =
    await prisma.lemonSqueezySubscription.findFirstOrThrow({
      where: {
        planId: currentPlanId,
      },
    });

  const newPlan = await prisma.plan.findUniqueOrThrow({
    where: {
      id: newPlanId,
    },
  });

  const updatedSub = await updateSubscription(userSubscription.lemonSqueezyId, {
    variantId: newPlan.variantId,
  });

  await prisma.lemonSqueezySubscription.update({
    where: {
      lemonSqueezyId: userSubscription.lemonSqueezyId,
    },
    data: {
      planId: newPlanId,
      price: newPlan.price,
      endsAt: updatedSub.data?.data.attributes.ends_at,
    },
  });

  revalidatePath("/");
};

export const storeWebhookEvent = async (
  eventName: string,
  body: NewWebhookEvent["body"]
) => {
  const returnedValue = await prisma.lemonSqueezyWebhookEvent.create({
    data: {
      eventName,
      body,
      processed: false,
    },
  });

  return returnedValue;
};

export const processWebhookEvent = async (
  webhookEvent: LemonSqueezyWebhookEvent
) => {
  configLemonsqueezy();

  const dbWebhookEvent = await prisma.lemonSqueezyWebhookEvent.findMany({
    where: {
      id: webhookEvent.id,
    },
  });

  if (dbWebhookEvent.length < 1) {
    throw new Error(`Webhook Event ${webhookEvent.id} not found`);
  }

  let processingError = "";
  const eventBody = webhookEvent.body;

  if (!webhookHasMeta(eventBody)) {
    processingError = "Event body is missing the 'meta' property";
  } else if (webhookHasData(eventBody)) {
    if (webhookEvent.eventName.startsWith("subscription_payment_")) {
    } else if (webhookEvent.eventName.startsWith("subscription_")) {
      const attributes = eventBody.data.attributes;
      const variantId = attributes.variant_id as string;

      const plan = await prisma.plan.findUnique({
        where: {
          variantId: parseInt(variantId, 10),
        },
      });
      if (!plan) {
        processingError = `Plan with variantId ${variantId} not found`;
      } else {
        const priceId = attributes.first_subscription_item.price_id;

        const priceData = await getPrice(priceId);
        if (priceData.error) {
          processingError = `Failed to get the price data for the subscription ${eventBody.data.id}`;
        }

        const isUsageBased = attributes.first_subscription_item.is_usage_based;
        const price = isUsageBased
          ? priceData.data?.data.attributes.unit_price_decimal
          : priceData.data?.data.attributes.unit_price;

        const updateData: NewSubscription = {
          lemonSqueezyId: eventBody.data.id,
          orderId: attributes.order_id as number,
          name: attributes.user_name as string,
          email: attributes.user_email as string,
          status: attributes.status as string,
          renewsAt: attributes.renews_at as string,
          endsAt: attributes.ends_at as string,
          trialEndsAt: attributes.trial_ends_at as string,
          price: price?.toString() ?? "",
          isUsageBased,
          isPaused: false,
          userId: eventBody.meta.custom_data.user_id,
          planId: plan.id,
        };

        try {
          await prisma.lemonSqueezySubscription.upsert({
            where: {
              lemonSqueezyId: updateData.lemonSqueezyId,
            },
            create: updateData,
            update: updateData,
          });
        } catch (error) {
          processingError = `Failed to upsert Subscription ${updateData.lemonSqueezyId} to the database`;
          console.error(error);
        }
      }
    }

    await prisma.lemonSqueezyWebhookEvent.update({
      where: {
        id: webhookEvent.id,
      },
      data: {
        processed: true,
        processingError,
      },
    });
  }
};

export const getUserSubscription = async () => {
  const user = await currentUser();
  if (!user?.id) {
    return null;
  }

  const subscriptions = await prisma.lemonSqueezySubscription.findMany({
    where: {
      userId: user.id,
    },
  });
  const validSubscription = subscriptions.find((subscription) => {
    const status = subscription.status as SubscriptionStatusType;
    return isValidSubscription(status);
  });

  return validSubscription;
};
