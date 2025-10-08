"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var solar_unit_1 = require("../application/solar-unit");
var SolarUnitRouter = express_1.default.Router();
SolarUnitRouter.route("/").get(solar_unit_1.getAllUnits).post(solar_unit_1.createSolarUnit);
SolarUnitRouter.route("/:id").get(solar_unit_1.getUnitId).put(solar_unit_1.updateSolarunit).delete(solar_unit_1.deleteUnit);
exports.default = SolarUnitRouter;
//# sourceMappingURL=solar-unit.js.map