import { SolarUnit } from "../../../infrastructure/entity/solar-units";
import Invoice from "../../../infrastructure/entity/invoice";
import mongoose from "mongoose";
import { EnergyGenerationRecord } from "../../../infrastructure/entity/energyGenerationRecords";
import { User } from "../../../infrastructure/entity/user";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const generateInvoices = async (
  userId: mongoose.Types.ObjectId
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const userDoc = user as any;
  let stripeCustomerId = userDoc.stripeCustomerId;

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: userDoc.email,
      metadata: {
        userId: user._id.toString(),
      },
    });

    stripeCustomerId = customer.id;
    userDoc.stripeCustomerId = customer.id;
    await user.save();
    console.log(`Stripe customer created: ${customer.id}`);
  }

  const solarUnits = await SolarUnit.find({
    userId,
    status: "ACTIVE",
  });

  let createdInvoices = 0;

  for (const unit of solarUnits) {
    const lastInvoice = await Invoice.findOne({
      solarUnitId: unit._id,
    }).sort({ billingPeriodEnd: -1 });

    const start = lastInvoice
      ? lastInvoice.billingPeriodEnd
      : (unit as any).installationDate;

    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    const existingInvoice = await Invoice.findOne({
      solarUnitId: unit._id,
      billingPeriodStart: start,
      billingPeriodEnd: end,
    });

    if (existingInvoice) continue;

    const energyrecords = await EnergyGenerationRecord.aggregate([
      {
        $match: {
          SolarUnitId: unit._id,
          time: { $gte: start, $lt: end },
        },
      },
      {
        $group: {
          _id: null,
          totalEnergy: { $sum: "$energyGenerated" },
        },
      },
    ]);

    const totalEnergyGenerated =
      energyrecords.length > 0 ? energyrecords[0].totalEnergy : 0;
    //stripe invoice
    try {
      const stripeInvoice = await stripe.invoices.create({
        customer: stripeCustomerId,
        collection_method: "send_invoice",
        days_until_due: 14,
        metadata: {
          SolarUnitId: unit._id.toString(),
          billingStart: start.toISOString(),
          billingEnd: end.toISOString(),
        },
      });

      const pricePerKWh = parseFloat(process.env.PRICE_PER_KWH!);
      const amountInCents = Math.round(totalEnergyGenerated * pricePerKWh * 100);
      
      if (amountInCents > 0) {
        await stripe.invoiceItems.create({
          customer: stripeCustomerId,
          invoice: stripeInvoice.id,
          amount: amountInCents,
          currency: "usd",
          description: `Solar energy generated: ${totalEnergyGenerated.toFixed(2)} kWh`,
        });
      }

      await stripe.invoices.finalizeInvoice(stripeInvoice.id);

      await Invoice.create({
        SolarUnitId: unit._id,
        userId,
        billingPeriodStart: start,
        billingPeriodEnd: end,
        totalEnergyGenerated,
        paymentStatus: "PENDING",
        stripeInvoiceId: stripeInvoice.id,
      });

      createdInvoices++;
      console.log(`Invoice created for solar unit ${unit._id}`);
    } catch (error) {
      console.error(
        `Failed to create invoice for solar unit ${unit._id}:`,
        error instanceof Error ? error.message : String(error)
      );
      throw error;
    }
  }

  return createdInvoices;
};
