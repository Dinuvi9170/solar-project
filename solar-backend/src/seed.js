import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from './infrastructure/db.js';
import { SolarUnit } from "./infrastructure/entity/solar-units.js";
import { EnergyGenerationRecord } from "./infrastructure/entity/energyGenerationRecords.js";

const seedData = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");

    // Clear both collections
    await mongoose.connection.collection("solarunits").deleteMany({});
    await mongoose.connection.collection("energyrecords").deleteMany({});
    console.log("🗑️ Existing data cleared");

    // Create sample SolarUnit first
    const sampleSolarUnit = new SolarUnit({
      serialNumber: "SUN-001",
      installationDate: new Date("2025-9-10"),
      capasity: 5000,
      status: "ACTIVE",
      houseId: new mongoose.Types.ObjectId()
    });

    const savedSolarUnit = await sampleSolarUnit.save();

    // Create and save energy records with SolarUnitId as the savedSolarUnit's _id
    const energyRecordsData = [
      { SolarUnitId: savedSolarUnit._id, energyGenerated: 200, time: new Date("2025-10-07T06:00:00.000Z"), intervalHours: 2 },
      { SolarUnitId: savedSolarUnit._id, energyGenerated: 240, time: new Date("2025-10-07T08:00:00.000Z"), intervalHours: 2 },
      { SolarUnitId: savedSolarUnit._id, energyGenerated: 260, time: new Date("2025-10-07T10:00:00.000Z"), intervalHours: 2 },
    ];

    await EnergyGenerationRecord.insertMany(energyRecordsData);

    console.log("🌞 Sample Solar Unit and Energy Records inserted successfully");

    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedData();