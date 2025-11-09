import express from 'express';
import { getAllUnits,createSolarUnit,getUnitId,updateSolarunit, deleteUnit, getSolarUnitforUser } from '../application/solar-unit';
import { Authenticate } from './middleware/authentication';

const SolarUnitRouter= express.Router();

SolarUnitRouter.route("/").get(getAllUnits).post(createSolarUnit);
SolarUnitRouter.route("/me").get(Authenticate,getSolarUnitforUser);
SolarUnitRouter.route("/:id").get(getUnitId).put(updateSolarunit).delete(deleteUnit);

export default SolarUnitRouter;