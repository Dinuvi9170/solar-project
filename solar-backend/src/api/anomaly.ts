import express from 'express';
import { getAnomaliesBySolarid, getAnomaliesByType } from '../application/anomalies';
const Anomalyrouter = express.Router();

Anomalyrouter.get('/solar-unit/:id', getAnomaliesBySolarid);
Anomalyrouter.get('/solar-unit/:id/:anomalyType',getAnomaliesByType)

export default Anomalyrouter;
