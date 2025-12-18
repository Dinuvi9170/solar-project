import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./infrastructure/db";
import { EnergyGenerationRecord } from "./infrastructure/entity/energyGenerationRecords";

const seedData = async () => {
  const serialNumber = "SUN-001";

  try {
    await connectDB();
    console.log(" MongoDB connected");

    await mongoose.connection.collection("energyrecords").deleteMany({});
    console.log(" Existing data cleared");

    const energyrecords: any[] = [];

    const startDate = new Date("2025-10-01T06:00:00.000Z");
    const endDate = new Date("2025-12-17T06:00:00.000Z");

    let currentDate = new Date(startDate);

    let currentDay = currentDate.toISOString().slice(0, 10);
    let dayHasAnomaly = false;
    let dayRecordIndexes: number[] = [];

    while (currentDate <= endDate) {
      const hour = currentDate.getUTCHours();
      const month = currentDate.getUTCMonth();

      // ----- Energy model -----
      let baseEnergy = 200;
      if (month >= 5 && month <= 7) baseEnergy = 300;
      else if (month >= 2 && month <= 4) baseEnergy = 250;
      else if (month >= 8 && month <= 10) baseEnergy = 200;
      else baseEnergy = 150;

      let timeMultiplier = 0.1;
      if (hour >= 6 && hour <= 18) {
        timeMultiplier = hour >= 10 && hour <= 14 ? 1.5 : 1.2;
      }

      const variation = 0.8 + Math.random() * 0.4;
      let energyGenerated = Math.round(baseEnergy * timeMultiplier * variation);

      // ----- Normal sensor values -----
      let temperature = 30 + Math.random() * 20;
      let vibration = Math.random() * 2;
      let mechanicalIssue = false;

      const anomalyChance = Math.random();

      // ----- Random anomalies -----
      if (anomalyChance < 0.05) {
        energyGenerated *= 0.2;
        dayHasAnomaly = true;
      } else if (anomalyChance < 0.08) {
        energyGenerated *= 1.6;
        dayHasAnomaly = true;
      } else if (anomalyChance < 0.11) {
        temperature = 85 + Math.random() * 15;
        dayHasAnomaly = true;
      } else if (anomalyChance < 0.14) {
        vibration = 6 + Math.random() * 4;
        mechanicalIssue = true;
        dayHasAnomaly = true;
      }

      const recordIndex = energyrecords.length;

      energyrecords.push({
        serialNumber,
        time: new Date(currentDate),
        energyGenerated: Math.round(energyGenerated),
        temperature,
        vibration,
        mechanicalIssue,
      });

      dayRecordIndexes.push(recordIndex);

      // ----- Move time forward -----
      currentDate = new Date(currentDate.getTime() + 2 * 60 * 60 * 1000);
      const nextDay = currentDate.toISOString().slice(0, 10);

      // ----- Day boundary check -----
      if (nextDay !== currentDay) {
        // Ensure at least one anomaly per day
        if (!dayHasAnomaly && dayRecordIndexes.length > 0) {
          const randomIndex =
            dayRecordIndexes[
              Math.floor(Math.random() * dayRecordIndexes.length)
            ];

          energyrecords[randomIndex].temperature = 90;
        }

        // Reset day tracking
        currentDay = nextDay;
        dayHasAnomaly = false;
        dayRecordIndexes = [];
      }
    }

    await EnergyGenerationRecord.insertMany(energyrecords);
    await mongoose.disconnect();

    console.log(" Seed completed with daily anomalies injected");
  } catch (error) {
    console.error(" Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
