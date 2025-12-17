"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUnit = exports.updateSolarunit = exports.getUnitId = exports.createSolarUnit = exports.getAllUnits = void 0;
//import { dataUnits } from "../infrastructure/data.js";
//import {v4 as uuid} from 'uuid';
var solar_unit_1 = require("../domain/dtos/solar-unit");
var solar_units_1 = require("../infrastructure/entity/solar-units");
var getAllUnits = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dataUnits, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, solar_units_1.SolarUnit.find()];
            case 1:
                dataUnits = _a.sent();
                res.status(200).json(dataUnits);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllUnits = getAllUnits;
var createSolarUnit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, newSolarUnit, createdSolarUnit, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Hello");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                console.log("Inside try block");
                result = solar_unit_1.CreateSolarUnitDto.safeParse(req.body);
                if (!result.success) {
                    console.log("Validation failed");
                    return [2 /*return*/, res.status(400).json({ message: result.error.message })];
                }
                newSolarUnit = {
                    installationDate: new Date(result.data.installationDate),
                    capasity: result.data.capasity,
                    serialNumber: result.data.serialNumber,
                    status: result.data.status
                };
                return [4 /*yield*/, solar_units_1.SolarUnit.create(newSolarUnit)];
            case 2:
                createdSolarUnit = _a.sent();
                console.log("Created:", createdSolarUnit);
                res.status(201).json(createdSolarUnit);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.log("Inside catch");
                console.error(error_2);
                res.status(500).json({ message: " server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createSolarUnit = createSolarUnit;
var getUnitId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, solarUnit, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, solar_units_1.SolarUnit.findById(id)];
            case 1:
                solarUnit = _b.sent();
                if (solarUnit)
                    res.status(200).json(solarUnit);
                else
                    res.status(404).json({ message: "Not found." });
                return [3 /*break*/, 3];
            case 2:
                _a = _b.sent();
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUnitId = getUnitId;
var updateSolarunit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, installationDate, capasity, serialNumber, status, solarUnit, updateSolarUnit, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 5, , 6]);
                id = req.params.id;
                _a = req.body, installationDate = _a.installationDate, capasity = _a.capasity, serialNumber = _a.serialNumber, status = _a.status;
                return [4 /*yield*/, solar_units_1.SolarUnit.findById(id)];
            case 1:
                solarUnit = _c.sent();
                if (!solarUnit) return [3 /*break*/, 3];
                return [4 /*yield*/, solar_units_1.SolarUnit.findByIdAndUpdate(id, {
                        installationDate: installationDate,
                        capasity: capasity,
                        serialNumber: serialNumber,
                        status: status
                    })];
            case 2:
                updateSolarUnit = _c.sent();
                return [2 /*return*/, res.status(200).json(updateSolarUnit)];
            case 3: return [2 /*return*/, res.status(404).json({ message: "Solar unit not found" })];
            case 4: return [3 /*break*/, 6];
            case 5:
                _b = _c.sent();
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updateSolarunit = updateSolarunit;
var deleteUnit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, solarunit, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, solar_units_1.SolarUnit.findById(id)];
            case 1:
                solarunit = _b.sent();
                if (solarunit == null) {
                    return [2 /*return*/, res.status(404).json({ message: "Solar unit not found" })];
                }
                return [4 /*yield*/, solar_units_1.SolarUnit.findByIdAndDelete(id)];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(200).json({ message: "Solar unit deleted successfully" })];
            case 3:
                _a = _b.sent();
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteUnit = deleteUnit;
//# sourceMappingURL=solar-unit.js.map