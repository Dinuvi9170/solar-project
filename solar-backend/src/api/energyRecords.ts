import express from 'express';
import{getEnergyRecordsBySolarid} from "../application/energyRecords"

const EnergyRecordRouter= express.Router();

EnergyRecordRouter.route('/solar-unit/:id').get(getEnergyRecordsBySolarid);

export default EnergyRecordRouter;