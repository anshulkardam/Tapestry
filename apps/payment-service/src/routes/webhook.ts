import { Hono } from "hono";
import Stripe from "stripe";
import stripe from "../utils/stripe";

const webHookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
const webhookRouter = new Hono();

webhookRouter.post("/stripe", async (c) => {
  const body = await c.req.text();
  const sig = c.req.header("stripe-signature");

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig!, webHookSecret);
  } catch (error) {
    console.log("Webhook Verification failed!");
    return c.json({ error: "Webhook verification failed" }, 400);
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;

      const line_items = await stripe.checkout.sessions.listLineItems(
        session.id
      );

      console.log("WEBHOOK RECEIVED", session);

      break;

    default:
      break;
  }
});

export default webhookRouter