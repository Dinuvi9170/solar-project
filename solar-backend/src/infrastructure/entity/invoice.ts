import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
    {
        SolarUnitId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "solarunits", 
            required: true 
        },
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "users",
            required: true
        },
        stripeInvoiceId: {
            type: String,
            required: true,
        },
        billingPeriodStart: { 
            type: Date, 
            required: true 
        },
        billingPeriodEnd: { 
            type: Date, 
            required: true 
        },
        totalEnergyGenerated: { 
            type: Number, 
            required: true 
        }, 
        paymentStatus: { 
            type: String, 
            enum: ["PENDING", "PAID", "FAILED"], 
            default: "PENDING" 
        },
        paidAt: { 
            type: Date, 
            default: Date.now 
        }
    },
    { timestamps: true }
);

const Invoice = mongoose.model("Invoice", InvoiceSchema);
export default Invoice;
