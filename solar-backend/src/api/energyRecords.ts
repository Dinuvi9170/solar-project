import express from 'express';
import{getEnergyRecordsBySolarid} from "../application/energyRecords"
import { Authenticate } from './middleware/authentication';
import { syncMiddleware } from './middleware/sync/sync-middleware';
const EnergyRecordRouter= express.Router();

EnergyRecordRouter.route('/solar-unit/:id').get(Authenticate,syncMiddleware,getEnergyRecordsBySolarid);

export default EnergyRecordRouter;