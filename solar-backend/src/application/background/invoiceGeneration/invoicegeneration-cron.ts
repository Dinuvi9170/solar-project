import cron from "node-cron";
import { User } from "../../../infrastructure/entity/user";
import { generateInvoices } from "./invoiceGenerate";

export const startInvoiceCronJob = () => {
  //every month on the 1st at 00:00
  cron.schedule("0 0 1 * *", async () => {
    console.log("Starting monthly invoice generation...");

    try {
      const users = await User.find({});

      for (const user of users) {
        const created = await generateInvoices(user._id);
        console.log(
          `Generated ${created} invoices for user ${user._id}`
        );
      }

      console.log("Monthly invoice generation finished.");
    } catch (err) {
      console.error("Error generating invoices:", err);
    }
  });
};
