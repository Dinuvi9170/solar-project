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

const server= express();

server.use(cors({origin:"http://localhost:5173"}));

server.use(LoggerMiddleware);

server.use("/api/webhooks",webhooksRouter);
server.use(clerkMiddleware());

server.use(express.json());// convert structured data into json

server.use("/api/solar-units",SolarUnitRouter);
server.use("/api/energyRecords",EnergyRecordRouter);

server.use(ErrorHandlingMiddleware);

connectDB();
const PORT=process.env.PORT||8000;
server.listen(PORT,()=>{
    console.log(`The server is running on port ${PORT} `);
})