import express from 'express';
import { getAllUnits,createSolarUnit,getUnitId,updateSolarunit, deleteUnit, getSolarUnitforUser } from '../application/solar-unit';
import { Authenticate } from './middleware/authentication';
import { Authorization } from './middleware/authorization';

const SolarUnitRouter= express.Router();

SolarUnitRouter.route("/").get(Authenticate,Authorization,getAllUnits).post(Authenticate,Authorization,createSolarUnit);
SolarUnitRouter.route("/me").get(Authenticate,getSolarUnitforUser);
SolarUnitRouter.route("/:id")
.get(Authenticate,Authorization,getUnitId)
.put(Authenticate,Authorization,updateSolarunit)
.delete(Authenticate,Authorization,deleteUnit);

export default SolarUnitRouter;