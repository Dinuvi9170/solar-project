import cron from "node-cron";
import dotenv from "dotenv";
import { detectAnomalies } from "./anomalydetection";
import { connectDB } from "../../infrastructure/db";

dotenv.config();

async function startCron() {
  await connectDB();
  console.log(" DB connected for anomaly cron");

  // Run every 15 minutes
  cron.schedule("*/15 * * * *", async () => {
    console.log(" Running anomaly detection job...");
    try {
      await detectAnomalies();
    } catch (err) {
      console.error(" Anomaly cron failed:", err);
    }
  });
}

startCron();
