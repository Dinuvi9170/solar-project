import 'dotenv/config';
import express from 'express';
import SolarUnitRouter from './api/solar-unit.js';
import { connectDB } from './infrastructure/db.js';
import EnergyRecordRouter from './api/energyRecords.js';

const server= express();
server.use(express.json());// convert structured data into json
server.use("/api/solar-units",SolarUnitRouter);
server.use("/api/energyRecords",EnergyRecordRouter);

connectDB();

const PORT=8000;
server.listen(PORT,()=>{
    console.log(`The server is running on port ${PORT} `);
})