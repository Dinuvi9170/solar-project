import cron from "node-cron";
import { syncEnergyRecords} from "./sync-energyrecord-background";

// Runs every day at 00:00 (midnight)
export const startEnergySyncJob = () => {
  cron.schedule(
    "0 0 * * *",
    async () => {
      console.log("🕛 Running daily energy sync job...");
      await syncEnergyRecords();
    },
    {
      timezone: "UTC" 
    }
  );
};
