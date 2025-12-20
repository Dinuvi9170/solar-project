import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

import { Request, Response } from "express";
import Invoice from "../infrastructure/entity/invoice";
import { NotFoundError, ValidationError } from "../domain/errors/errors";

export const createCheckoutSession = async (req: Request, res: Response) => {
  //Get invoice 
  const invoice = await Invoice.findById(req.body.invoiceId);

  if (!invoice) {
    throw new NotFoundError("Invoice not found");
  }

  if (invoice.paymentStatus === "PAID") {
    throw new ValidationError("Invoice already paid");
  }

  //Create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,  
        quantity: Math.round(invoice.totalEnergyGenerated),  // kWh as quantity
      },
    ],
    mode: "payment",
    return_url: `${process.env.FRONTEND_URL}/dashboard/invoices/complete?session_id={CHECKOUT_SESSION_ID}`,
    metadata: {
      invoiceId: invoice._id.toString(),  // links session to invoice
    },
  });

  //Return client secret to frontend
  res.json({ clientSecret: session.client_secret });
};

export const getSessionStatus = async (req: Request, res: Response) => {
  const { session_id } = req.query;

  const session = await stripe.checkout.sessions.retrieve(session_id as string);

  res.json({
    status: session.status,
    paymentStatus: session.payment_status,
    amountTotal: session.amount_total,  // Amount in cents
  });
};

