import { EnergyGenerationRecord } from "../../infrastructure/entity/energyGenerationRecords";
import { SolarUnit } from "../../infrastructure/entity/solar-units"; 
import Anomalies from "../../infrastructure/entity/anomalies";

export async function detectAnomalies() {
  const CAPACITY_FACTOR_LOW = 0.2;   // 20%
  const CAPACITY_FACTOR_HIGH = 1.1;  // 110% impossible
  const TEMP_THRESHOLD = 85;
  const VIBRATION_THRESHOLD = 5;

  const lastAnomaly = await Anomalies.findOne().sort({ detection_time: -1 });
  const sinceTime = lastAnomaly?.detection_time ?? new Date(0);

  const records = await EnergyGenerationRecord.find({
    time: { $gt: sinceTime }
  });

  if (!records.length) {
    console.log("No new energy records to analyze");
    return;
  }

  const solarUnits = await SolarUnit.find();
  const solarMap = new Map(
    solarUnits.map(s => [String(s._id), s])
  );

  const anomaliesToInsert: any[] = [];

  for (const rec of records) {
    const solarUnit = solarMap.get(String(rec.SolarUnitId));
    if (!solarUnit) continue;

    const interval = rec.intervalHours || 1;

    // Theoretical maximum (kWh)
    const theoreticalMax = solarUnit.capasity * interval;

    // Capacity factor
    const capacityFactor =
      theoreticalMax > 0
        ? rec.energyGenerated / theoreticalMax
        : 0;

    //LOW POWER
    if (capacityFactor < CAPACITY_FACTOR_LOW) {
      anomaliesToInsert.push({
        solarUnitId: rec.SolarUnitId,
        energyRecordId: rec._id,
        anomalyType: "PowerOutputLow",
        severity: "medium",
        description: `Low production (${(capacityFactor * 100).toFixed(1)}%)`,
        detection_time: rec.time
      });
    }

    //IMPOSSIBLE POWER
    if (capacityFactor > CAPACITY_FACTOR_HIGH) {
      anomaliesToInsert.push({
        solarUnitId: rec.SolarUnitId,
        energyRecordId: rec._id,
        anomalyType: "PowerOutputHigh",
        severity: "high",
        description: `Production exceeds capacity (${(capacityFactor * 100).toFixed(1)}%)`,
        detection_time: rec.time
      });
    }

    //TEMPERATURE
    if (rec.temperature && rec.temperature > TEMP_THRESHOLD) {
      anomaliesToInsert.push({
        solarUnitId: rec.SolarUnitId,
        energyRecordId: rec._id,
        anomalyType: "Temperature",
        severity: rec.temperature > 95 ? "critical" : "high",
        description: `High temperature: ${rec.temperature}°C`,
        detection_time: rec.time
      });
    }

    //VIBRATION
    if (rec.vibration && rec.vibration > VIBRATION_THRESHOLD) {
      anomaliesToInsert.push({
        solarUnitId: rec.SolarUnitId,
        energyRecordId: rec._id,
        anomalyType: "Vibration",
        severity: "medium",
        description: `Excessive vibration: ${rec.vibration}`,
        detection_time: rec.time
      });
    }

    //MECHANICAL FLAG
    if (rec.mechanicalIssue === true) {
      anomaliesToInsert.push({
        solarUnitId: rec.SolarUnitId,
        energyRecordId: rec._id,
        anomalyType: "Mechanical",
        severity: "high",
        description: "Mechanical issue reported by sensor",
        detection_time: rec.time
      });
    }
  }

  if (anomaliesToInsert.length > 0) {
    await Anomalies.insertMany(anomaliesToInsert, { ordered: false });
  }

  console.log(`✓ Detected ${anomaliesToInsert.length} anomalies`);
}
