import 'dotenv/config';
import express from 'express';
import SolarUnitRouter from './api/solar-unit';
import { connectDB } from './infrastructure/db';
import EnergyRecordRouter from './api/energyRecords';
import { LoggerMiddleware } from './api/middleware/logger';

const server= express();
server.use(express.json());// convert structured data into json

server.use(LoggerMiddleware);

server.use("/api/solar-units",SolarUnitRouter);
server.use("/api/energyRecords",EnergyRecordRouter);

connectDB();
const PORT=8002;
server.listen(PORT,()=>{
    console.log(`The server is running on port ${PORT} `);
})