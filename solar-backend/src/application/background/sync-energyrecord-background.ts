import { EnergyGenerationRecord } from "../../infrastructure/entity/energyGenerationRecords";
import { SolarUnit } from "../../infrastructure/entity/solar-units";
import z from "zod";

export const DataEnergyRecordsDto = z.object({
  _id: z.string().optional(),
  serialNumber: z.string(),
  time: z.string(),
  energyGenerated: z.number(),
  intervalHours: z.number(),
  temperature: z.number().nullable().optional(),
  vibration: z.number().nullable().optional(),
  mechanicalIssue: z.boolean().nullable().optional()
});

type EnergyRecordData = z.infer<typeof DataEnergyRecordsDto>;

export const syncEnergyRecords = async (): Promise<void> => {
  try {
    const solarUnits = await SolarUnit.find();
    if (!solarUnits.length) return;

    for (const solarUnit of solarUnits) {
      const latestRecord = await EnergyGenerationRecord.findOne({
        SolarUnitId: solarUnit._id
      }).sort({ time: -1 });

      const apiUrl = `http://192.168.8.193:8001/api/energyRecords/solar-unit/${solarUnit.serialNumber}`;
      const response = await fetch(apiUrl);
      if (!response.ok) continue;

      const apiData = await response.json();
      if (!Array.isArray(apiData)) continue;

      const missingRecords = latestRecord
        ? apiData.filter(
            r => new Date(r.time) > new Date(latestRecord.time)
          )
        : apiData;

      if (!missingRecords.length) continue;

      await EnergyGenerationRecord.insertMany(
        missingRecords.map(r => ({
          time: new Date(r.time),
          energyGenerated: r.energyGenerated,
          intervalHours: r.intervalHours,
          SolarUnitId: solarUnit._id,
          temperature: r.temperature ?? null,
          vibration: r.vibration ?? null,
          mechanicalIssue: r.mechanicalIssue ?? null
        })),
        { ordered: false }
      );
    }
  } catch (err) {
    console.error("syncEnergyRecords error:", err);
  }
};
