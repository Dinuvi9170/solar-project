import 'dotenv/config';
import express from 'express';
import SolarUnitRouter from './api/solar-unit';
import { connectDB } from './infrastructure/db';
import EnergyRecordRouter from './api/energyRecords';

const server= express();
server.use(express.json());// convert structured data into json
connectDB();

server.use("/api/solar-units",SolarUnitRouter);
server.use("/api/energyRecords",EnergyRecordRouter);



server.get("/test", (req, res) => {
    try{console.log("Test route hit");
    res.send("Test OK");}
    catch{console.log("Test route error");}
});

const PORT=8002;
server.listen(PORT,()=>{
    console.log(`The server is running on port ${PORT} `);
})