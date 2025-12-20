import { Request, Response } from "express";
import Stripe from "stripe";
import Invoice from "../../infrastructure/entity/invoice";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15" as Stripe.LatestApiVersion,
});

export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;
  let event: Stripe.Event;

  // 1. Verify webhook signature
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 2. Checkout completed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const invoiceId = session.metadata?.invoiceId;

    if (invoiceId && session.payment_status === "paid") {
      await Invoice.findByIdAndUpdate(invoiceId, {
        paymentStatus: "PAID",
        stripePaymentIntentId: session.payment_intent,
        paidAt: new Date(),
      });

      console.log("Invoice marked as PAID:", invoiceId);
    }
  }

  // 3. Always acknowledge Stripe
  res.status(200).json({ received: true });
};
