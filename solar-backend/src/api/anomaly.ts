import express from 'express';
import { getAnomaliesBySolarid, getAnomaliesByType, getresolveStatusCounts } from '../application/anomalies';
const Anomalyrouter = express.Router();

Anomalyrouter.get('/solar-unit/:id', getAnomaliesBySolarid);
Anomalyrouter.get('/solar-unit/:id/status-counts',getresolveStatusCounts);
Anomalyrouter.get('/solar-unit/:id/:anomalyType',getAnomaliesByType);

export default Anomalyrouter;
