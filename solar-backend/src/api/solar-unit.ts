import express from 'express';
import { getAllUnits,createSolarUnit,getUnitId,updateSolarunit, deleteUnit } from '../application/solar-unit';

const SolarUnitRouter= express.Router();

SolarUnitRouter.route("/").get(getAllUnits).post(createSolarUnit);
SolarUnitRouter.route("/:id").get(getUnitId).put(updateSolarunit).delete(deleteUnit);

export default SolarUnitRouter;