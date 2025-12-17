import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from './infrastructure/db';
import { EnergyGenerationRecord } from "./infrastructure/entity/energyGenerationRecords";

const seedData = async () => {
  const serialNumber="SUN-001";
  try {
    await connectDB();
    console.log(" MongoDB connected");

    await mongoose.connection.collection("solarunits").deleteMany({});
    await mongoose.connection.collection("energyrecords").deleteMany({});
    //await mongoose.connection.collection("users").deleteMany({});
    console.log(" Existing data cleared");

    //create user
    // const sampleUser= [
        
    //     {name:"Bob Smith", email:"bob@gmail.com",createdAt:new Date("2025-10-11T06:00:00.000Z")}
    // ];
   
    // Create sample SolarUnit first

    const energyrecords=[];
    const startDate=new Date("2025-10-01T06:00:00.000Z")
    const endDate=new Date("2025-12-17T06:00:00.000Z")

    let currentDate= new Date(startDate);
    let recordcount=0;

    while (currentDate<=endDate){
      //Generate realistic energyvalues according to time & season
      const hour=currentDate.getUTCHours();
      const month = currentDate.getUTCMonth();

      let baseEnergy=200;
      if(month>=5 && month<=7){
        baseEnergy=300;
      }
      else if(month>=2 && month<=4){
        baseEnergy=250;
      }
      else if(month>=8 && month<=10){
        baseEnergy=200;
      }
      else{
        baseEnergy=150;
      }
      
      //Adjesments based on day & night
      let timemultipler=1;
      if(hour>=6&& hour<=18){
        timemultipler=1.2;
        if(hour>=10 && hour<=14){
          timemultipler=1.5;
        }
      }else{
        timemultipler=0.1;
      }

      const variation= 0.8+Math.random()*0.4;
      let energyGenerated=Math.round(baseEnergy*timemultipler*variation);

      //normal sensor values
      let temperature = 30 + Math.random() * 20; // normal 30–50°C
      let vibration = Math.random() * 2;          // normal 0–2
      let mechanicalIssue = false;

      const anomalyChance = Math.random();

      // Power Output Deviation (low power)
      if (anomalyChance < 0.05) {
        energyGenerated = Math.round(energyGenerated * 0.2); // sudden drop
      }

      // Power Output Inflation (above capacity)
      if (anomalyChance >= 0.05 && anomalyChance < 0.08) {
        energyGenerated = Math.round(energyGenerated * 1.6); // unrealistic high
      }

      // Temperature Anomaly
      if (anomalyChance >= 0.08 && anomalyChance < 0.11) {
        temperature = 85 + Math.random() * 15; // overheating
      }

      // Vibration + Mechanical Anomaly
      if (anomalyChance >= 0.11 && anomalyChance < 0.14) {
        vibration = 6 + Math.random() * 4; // high vibration
        mechanicalIssue = true;
      }

      energyrecords.push({
        serialNumber:serialNumber,
        time: new Date(currentDate),
        energyGenerated:energyGenerated,
        temperature:temperature,
        vibration:vibration,
        mechanicalIssue:mechanicalIssue
      })
      //move to next 2 hours interval
      currentDate=new Date(currentDate.getTime()+2*60*60*1000);
      recordcount++;
    }
    
    await EnergyGenerationRecord.insertMany(energyrecords);
    await mongoose.disconnect();
    console.log(" MongoDB disconnected");
  } catch (error) {
    console.error(" Error seeding data:", error);
    process.exit(1);
  }
};

seedData();