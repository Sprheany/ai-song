import {
  lemonSqueezySetup,
  type Subscription,
} from "@lemonsqueezy/lemonsqueezy.js";

export function configLemonsqueezy() {
  const requiredVars = [
    "LEMONSQUEEZY_API_KEY",
    "LEMONSQUEEZY_STORE_ID",
    "LEMONSQUEEZY_WEBHOOK_SECRET",
  ];

  const missingVars = requiredVars.filter((varName) => !process.env[varName]);
  if (missingVars.length > 0) {
    throw new Error(
      `Missing required Lemonsqueezy env variables: ${missingVars.join(", ")}`
    );
  }

  lemonSqueezySetup({
    apiKey: process.env.LEMONSQUEEZY_API_KEY,
    onError(error) {
      throw new Error(`Lemonsqueezy api error: ${error.message}`);
    },
  });
}

export type SubscriptionStatusType =
  Subscription["data"]["attributes"]["status"];
