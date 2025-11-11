import express from 'express';
import{getEnergyRecordsBySolarid} from "../application/energyRecords"
import { Authenticate } from './middleware/authentication';
const EnergyRecordRouter= express.Router();

EnergyRecordRouter.route('/solar-unit/:id').get(Authenticate,getEnergyRecordsBySolarid);

export default EnergyRecordRouter;