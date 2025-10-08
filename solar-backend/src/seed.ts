import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from './infrastructure/db';
import { SolarUnit } from "./infrastructure/entity/solar-units";
import { EnergyGenerationRecord } from "./infrastructure/entity/energyGenerationRecords";
import {User} from "./infrastructure/entity/user";

const seedData = async () => {
  try {
    await connectDB();
    console.log(" MongoDB connected");

    // Clear both collections
    await mongoose.connection.collection("solarunits").deleteMany({});
    await mongoose.connection.collection("energyrecords").deleteMany({});
    await mongoose.connection.collection("users").deleteMany({});
    console.log(" Existing data cleared");

    //create and save user
    const sampleUser= [
        {name:"Alice Johnson", email:"alice@gmail.com",createdAt:new Date("2025-10-10T06:00:00.000Z")},
        {name:"Bob Smith", email:"bob@gmail.com",createdAt:new Date("2025-10-11T06:00:00.000Z")}
    ];
    const users= await User.insertMany(sampleUser);

    // Create sample SolarUnit first
    const sampleSolarUnit = new SolarUnit({
      serialNumber: "SUN-001",
      installationDate: new Date("2025-9-10"),
      capasity: 5000,
      status: "ACTIVE",
      userId: users[0]._id
    });

    const savedSolarUnit = await sampleSolarUnit.save();

    // Create and save energy records with SolarUnitId as the savedSolarUnit's _id
    const energyRecordsData = [
      { SolarUnitId: savedSolarUnit._id, energyGenerated: 200, time: new Date("2025-10-07T06:00:00.000Z"), intervalHours: 2 },
      { SolarUnitId: savedSolarUnit._id, energyGenerated: 240, time: new Date("2025-10-07T08:00:00.000Z"), intervalHours: 2 },
      { SolarUnitId: savedSolarUnit._id, energyGenerated: 260, time: new Date("2025-10-07T10:00:00.000Z"), intervalHours: 2 },
    ];

    await EnergyGenerationRecord.insertMany(energyRecordsData);

    console.log(" Sample Solar Unit and Energy Records inserted successfully");

    await mongoose.disconnect();
    console.log(" MongoDB disconnected");
  } catch (error) {
    console.error(" Error seeding data:", error);
    process.exit(1);
  }
};

seedData();