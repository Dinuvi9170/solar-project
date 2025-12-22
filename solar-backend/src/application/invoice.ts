
import {Request, Response, NextFunction} from "express";
import { generateInvoices } from "./background/invoiceGeneration/invoiceGenerate";
import { getAuth} from "@clerk/express";
import { User } from "../infrastructure/entity/user";
import Invoice from "../infrastructure/entity/invoice";
import mongoose from "mongoose";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const GenerateInvoice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth=getAuth(req);
    const clerkId=auth.userId;

    if (!clerkId) {
      return res.status(400).json({ message: "clerkId parameter is required" });
    }

    const user = await User.findOne({ clerkId });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    const count=await generateInvoices(user._id);
    res.status(200).json({ message: "Invoices generated successfully",createdInvoices: count });
  } catch (err) {
    next(err);
  }
};

export const getInvoicesforUser= async(req: Request, res: Response, next: NextFunction) =>{
  try{
    const auth=getAuth(req);
    const clerkId= auth.userId;
    if(!clerkId){
      return res.status(400).json({message: "clerkId is required"});
    }
    const user= await User.findOne({clerkId});

    if(!user){
      return res.status(404).json({message:"User not found"});
    }

    const invoices= await Invoice.find({userId:user._id}).sort({billingPeriodEnd:-1});

    res.status(200).json(invoices);

  }catch(err){
    next(err);
  }
}

export const getInvoiceById= async(req: Request, res: Response, next: NextFunction) =>{
  try{
    const { invoiceId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(invoiceId)) {
      return res.status(400).json({ message: "Invalid invoice ID" });
    }

    const auth = getAuth(req);
    const clerkId = auth.userId;

    if (!clerkId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user= await User.findOne({clerkId})
    if(!user){
      return res.status(404).json({message:"User not found"});
    }

    const invoice = await Invoice.findOne({ _id: invoiceId, userId: user._id });

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json(invoice);
  } catch (err) {
    next(err);
  }
}

export const getAllInvoices = async (req: Request,res: Response,next: NextFunction) => {
  try {
    const auth = getAuth(req);
    const clerkId = auth.userId;

    if (!clerkId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const filter: any = {};
    if (req.query.status) {
      filter.paymentStatus = req.query.status;
    }

    const invoices = await Invoice.find(filter)
      .populate("userId", "email")
      .populate("SolarUnitId")
      .sort({ billingPeriodEnd: -1 });

    res.status(200).json(invoices);
  } catch (err) {
    next(err);
  }
};

export const getInvoiceAmountFromStripe = async (req: Request,res: Response,next: NextFunction) => {
  try {
    const { stripeInvoiceId } = req.params;

    const auth = getAuth(req);
    if (!auth.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findOne({ clerkId: auth.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const invoice = await stripe.invoices.retrieve(stripeInvoiceId);

    res.status(200).json({
      stripeInvoiceId: invoice.id,
      total: invoice.total, // cents
      amountDue: invoice.amount_due,
      currency: invoice.currency,
      status: invoice.status,
      hostedInvoiceUrl: invoice.hosted_invoice_url,
      pdf: invoice.invoice_pdf,
    });
  } catch (err) {
    next(err);
  }
};
