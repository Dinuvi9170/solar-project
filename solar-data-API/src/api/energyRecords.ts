import express from 'express';
import{getEnergyRecordsBySerialNumber} from "../application/energyRecords"
const EnergyRecordRouter= express.Router();

EnergyRecordRouter.route('/solar-unit/:serialNumber').get(getEnergyRecordsBySerialNumber);

export default EnergyRecordRouter;