import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
    {
        solarUnitId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "SolarUnit", 
            required: true 
        },
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "users",
            required: true
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
