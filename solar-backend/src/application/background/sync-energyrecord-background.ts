import { SolarUnit } from "../../infrastructure/entity/solar-units";
import { EnergyGenerationRecord } from "../../infrastructure/entity/energyGenerationRecords";
import z from "zod";

export const DataEnergyRecordsDto = z.object({
  _id: z.string(),
  serialNumber: z.string(),
  time: z.string(),
  energyGenerated: z.number(),
  intervalHours: z.number(),
});

export const syncMiddleware = async () => {
  try {
    const solarUnits = await SolarUnit.find();
    
    for(const solarUnit of solarUnits) {
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
            SolarUnitId: solarUnit._id
        }));
        await EnergyGenerationRecord.insertMany(recordsToInsert);
        console.log(`${missingRecords.length} new records synced.`);
        } else {
        console.log("No new records to sync.");
        }
    }

  } catch (error) {
    console.error("Error during sync:", error);
  }
};