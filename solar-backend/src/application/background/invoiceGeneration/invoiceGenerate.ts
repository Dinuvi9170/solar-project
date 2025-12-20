import { SolarUnit } from "../../../infrastructure/entity/solar-units";
import Invoice from "../../../infrastructure/entity/invoice";
import mongoose from "mongoose";
import { EnergyGenerationRecord } from "../../../infrastructure/entity/energyGenerationRecords";

export const generateInvoices = async (userId: mongoose.Types.ObjectId) => {
  const solarUnits = await SolarUnit.find({ userId,status: "ACTIVE" });

  let createdInvoices = 0;

  for (const unit of solarUnits) {
    const lastInvoice = await Invoice.findOne({ solarUnitId: unit._id })
      .sort({ billingPeriodEnd: -1 });

    const start = lastInvoice ? lastInvoice.billingPeriodEnd : unit.installationDate;
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
        }
      },
      {
        $group: {
          _id:null,
          totalEnergy: { $sum: "$energyGenerated" }
        }
      }
    ])
    const totalEnergyGenerated = energyrecords.length > 0 ? energyrecords[0].totalEnergy: 0;

    await Invoice.create({
      solarUnitId: unit._id,
      userId,
      billingPeriodStart: start,
      billingPeriodEnd: end,
      totalEnergyGenerated,
      paymentStatus: "PENDING",
    });

    createdInvoices++;
  }

  return createdInvoices;
};
