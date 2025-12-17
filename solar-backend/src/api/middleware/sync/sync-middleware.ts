import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";
import { User } from "../../../infrastructure/entity/user";
import { NotFoundError } from "../../../domain/errors/errors";
import { SolarUnit } from "../../../infrastructure/entity/solar-units";
import { EnergyGenerationRecord } from "../../../infrastructure/entity/energyGenerationRecords";
import z from "zod";

export const DataEnergyRecordsDto = z.object({
  _id: z.string(),
  serialNumber: z.string(),
  time: z.string(),
  energyGenerated: z.number(),
  intervalHours: z.number(),
  temperature: z.number().nullable(),
  vibration: z.number().nullable(),
  mechanicalIssue: z.boolean().nullable()
});

export const syncMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = getAuth(req);
    const user = await User.findOne({ clerkId: auth.userId });
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const solarUnit = await SolarUnit.findOne({ userId: user._id });
    if (!solarUnit) {
      throw new NotFoundError("Solar Unit not found");
    }
    if (!solarUnit.serialNumber || typeof solarUnit.serialNumber !== 'string') {
      console.log(`Skipping sync for solar unit with invalid serialNumber: ${solarUnit._id}`);
      return next();
    }

    // Fetch the missing energy records
    const dataResponse = await fetch(
      `http://localhost:8001/api/energyRecords/solar-unit/${solarUnit.serialNumber}`
    );
    if (!dataResponse.ok) {
      throw new Error("Failed to fetch energy records from data API");
    }

    const latestEnergyRecords = DataEnergyRecordsDto.array().parse(await dataResponse.json());

    const existingRecords = await EnergyGenerationRecord.find({
      serialNumber: solarUnit.serialNumber,
    }).sort({ time: 1 });

    const missingRecords = latestEnergyRecords.filter((record: any) => {
      return !existingRecords.some(
        (existingRecord: any) => existingRecord.time.toISOString() === record.time
      );
    });

    if (missingRecords.length > 0) {
      const recordsToInsert = missingRecords.map(record => ({
        serialNumber: record.serialNumber,
        time: record.time,
        energyGenerated: record.energyGenerated,
        intervalHours: record.intervalHours,
        SolarUnitId: solarUnit._id,
        temperature: record.temperature,
        vibration: record.vibration,
        mechanicalIssue: record.mechanicalIssue
      }));
      await EnergyGenerationRecord.insertMany(recordsToInsert);
      console.log(`${missingRecords.length} new records synced.`);
    } else {
      console.log("No new records to sync.");
    }

    next();
  } catch (error) {
    console.error("Error during sync:", error);
    next(error);
  }
};