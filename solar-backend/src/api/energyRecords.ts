import express from 'express';
import{getCapacityFactor, getEnergyRecordsBySolarid} from "../application/energyRecords"
import { Authenticate } from './middleware/authentication';
import { syncMiddleware } from './middleware/sync/sync-middleware';
const EnergyRecordRouter= express.Router();

EnergyRecordRouter.route('/solar-unit/:id').get(Authenticate,syncMiddleware,getEnergyRecordsBySolarid);
EnergyRecordRouter.route('/solar-unit/:id/capacityfactor').get(Authenticate,syncMiddleware,getCapacityFactor)

export default EnergyRecordRouter;