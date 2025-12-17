import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from './infrastructure/db';
import { SolarUnit } from "./infrastructure/entity/solar-units";

const seedData = async () => {
  try {
    await connectDB();
    console.log(" MongoDB connected");

    await mongoose.connection.collection("solarunits").deleteMany({});
    console.log(" Existing solar unit data cleared");

    // Create sample SolarUnits
    const solarUnits = [
      {
        serialNumber: "SUN-001",
        installationDate: new Date("2025-10-01"),
        capasity: 5000,
        status: "ACTIVE",
      },
      {
        serialNumber: "SUN-002",
        installationDate: new Date("2025-11-15"),
        capasity: 3000,
        status: "INACTIVE",
      }
    ];

    await SolarUnit.insertMany(solarUnits);
    console.log(" Solar units inserted");

    await mongoose.disconnect();
    console.log(" MongoDB disconnected");
  } catch (error) {
    console.error(" Error seeding data:", error);
    process.exit(1);
  }
};

seedData();