import express from 'express';
import{getEnergyRecordsBySolarid} from "../application/energyRecords.js"

const EnergyRecordRouter= express.Router();

EnergyRecordRouter.route('/solar-unit/:id').get(getEnergyRecordsBySolarid);

export default EnergyRecordRouter;