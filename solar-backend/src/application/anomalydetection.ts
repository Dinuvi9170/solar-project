import { EnergyGenerationRecord } from "../infrastructure/entity/energyGenerationRecords";
import { SolarUnit } from "../infrastructure/entity/solar-units";
import Anomalies from "../infrastructure/entity/anomalies";

export async function detectAnomalies() {
    const POWER_DEVIATION_RATIO = 0.3;   // <30% of expected
    const POWER_INFLATION_RATIO = 1.2;   // >120% of capasity
    const TEMP_THRESHOLD = 85;           // °C
    const VIBRATION_THRESHOLD = 5;       // unit

    const records = await EnergyGenerationRecord.find()
        .sort({ time: -1 })
        .limit(20);

    for (const rec of records) {
        const solarUnit = await SolarUnit.findById(rec.SolarUnitId);
        if (!solarUnit) continue;

        const anomalies: any[] = [];

        const expectedEnergy =
        solarUnit.capasity * (rec.intervalHours || 1);

        if (rec.energyGenerated < expectedEnergy * POWER_DEVIATION_RATIO) {
        anomalies.push({
            solarUnitId: rec.SolarUnitId,
            anomalyType: "PowerOutput",
            severity: "medium",
            description: `Low power output detected. Expected ≈ ${expectedEnergy} kWh, got ${rec.energyGenerated} kWh`,
        });
        }

        if (rec.energyGenerated > expectedEnergy * POWER_INFLATION_RATIO) {
        anomalies.push({
            solarUnitId: rec.SolarUnitId,
            anomalyType: "PowerOutput",
            severity: "high",
            description: `Energy exceeds capacity. Max ≈ ${expectedEnergy} kWh, got ${rec.energyGenerated} kWh`,
        });
        }

        if (rec.temperature && rec.temperature > TEMP_THRESHOLD) {
        anomalies.push({
            solarUnitId: rec.SolarUnitId,
            anomalyType: "Temperature",
            severity: "high",
            description: `High temperature detected: ${rec.temperature}°C`,
        });
        }

        if (rec.vibration && rec.vibration > VIBRATION_THRESHOLD) {
        anomalies.push({
            solarUnitId: rec.SolarUnitId,
            anomalyType: "Vibration",
            severity: "medium",
            description: `Excessive vibration detected: ${rec.vibration}`,
        });
        }

        if (rec.mechanicalIssue === true) {
        anomalies.push({
            solarUnitId: rec.SolarUnitId,
            anomalyType: "Mechanical",
            severity: "medium",
            description: "Mechanical issue reported by sensor/system",
        });
        }

        for (const anomaly of anomalies) {
        const exists = await Anomalies.findOne({
            solarUnitId: anomaly.solarUnitId,
            anomalyType: anomaly.anomalyType,
            resolved: false
        });

        if (!exists) {
            await Anomalies.create(anomaly);
        }
        }
    }

    console.log(" Anomaly detection completed");
}
