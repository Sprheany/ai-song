import { processWebhookEvent, storeWebhookEvent } from "@/actions/payment";
import { webhookHasMeta } from "@/lib/typeguards";
import crypto from "node:crypto";

export async function POST(request: Request) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    return new Response("Lemonsqueezy webhook secret is not set", {
      status: 500,
    });
  }

  const rawBody = await request.text();

  const hmac = crypto.createHmac("sha256", secret);
  const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
  const signature = Buffer.from(
    request.headers.get("X-Signature") || "",
    "utf8"
  );

  if (!crypto.timingSafeEqual(digest, signature)) {
    throw new Error("Invalid signature");
  }

  const data = JSON.parse(rawBody) as unknown;

  if (webhookHasMeta(data)) {
    const webhookEvent = await storeWebhookEvent(data.meta.event_name, data);

    void processWebhookEvent(webhookEvent);

    return new Response("OK", {
      status: 200,
    });
  }
  return new Response("Data invalid", {
    status: 400,
  });
}
