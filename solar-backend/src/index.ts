import 'dotenv/config';
import express from 'express';
import SolarUnitRouter from './api/solar-unit';
import { connectDB } from './infrastructure/db';
import EnergyRecordRouter from './api/energyRecords';
import { LoggerMiddleware } from './api/middleware/logger';
import { ErrorHandlingMiddleware } from './api/middleware/errorHandling';
import cors from "cors";
import webhooksRouter from './api/webhooks';
import { clerkMiddleware } from '@clerk/express';
import UserRouter from './api/user';
import { startEnergySyncJob } from './application/background/energy-sync-cron';
import Anomalyrouter from './api/anomaly';
import InvoiceRouter from './api/invoice';
import { startInvoiceCronJob } from './application/background/invoiceGeneration/invoicegeneration-cron';
import PaymentRouter from './api/payment';
import { handleStripeWebhook } from './application/stripe/stripe.webhooks';

const server= express();

server.use(cors({origin:[
  "http://192.168.8.193:5173",
  "https://solarix-energy-dinuvi.netlify.app",
  "http://localhost:5173",
  "http://192.168.8.193:8000"]}));

server.use(LoggerMiddleware);

server.use(
  "/api/stripe/webhooks",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);

server.use("/api/webhooks",webhooksRouter);

server.use(clerkMiddleware());

server.use(express.json());// convert structured data into json

server.use("/api/solar-units",SolarUnitRouter);
server.use("/api/energyRecords",EnergyRecordRouter);
server.use("/api/users",UserRouter);
server.use("/api/anomalies",Anomalyrouter);
server.use("/api/invoices",InvoiceRouter);
server.use("/api/payments",PaymentRouter);

server.use(ErrorHandlingMiddleware);

connectDB();
startEnergySyncJob();
startInvoiceCronJob();

const PORT=process.env.PORT||8000;
server.listen(PORT,()=>{
    console.log(`The server is running on port ${PORT} `);
})