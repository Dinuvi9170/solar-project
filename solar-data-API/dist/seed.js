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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var db_1 = require("./infrastructure/db");
var solar_units_1 = require("./infrastructure/entity/solar-units");
var energyGenerationRecords_1 = require("./infrastructure/entity/energyGenerationRecords");
var seedData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var sampleSolarUnit, savedSolarUnit, energyRecordsData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                return [4 /*yield*/, (0, db_1.connectDB)()];
            case 1:
                _a.sent();
                console.log(" MongoDB connected");
                // Clear both collections
                return [4 /*yield*/, mongoose_1.default.connection.collection("solarunits").deleteMany({})];
            case 2:
                // Clear both collections
                _a.sent();
                return [4 /*yield*/, mongoose_1.default.connection.collection("energyrecords").deleteMany({})];
            case 3:
                _a.sent();
                console.log(" Existing data cleared");
                sampleSolarUnit = new solar_units_1.SolarUnit({
                    serialNumber: "SUN-001",
                    installationDate: new Date("2025-9-10"),
                    capasity: 5000,
                    status: "ACTIVE",
                    houseId: new mongoose_1.default.Types.ObjectId()
                });
                return [4 /*yield*/, sampleSolarUnit.save()];
            case 4:
                savedSolarUnit = _a.sent();
                energyRecordsData = [
                    { SolarUnitId: savedSolarUnit._id, energyGenerated: 200, time: new Date("2025-10-07T06:00:00.000Z"), intervalHours: 2 },
                    { SolarUnitId: savedSolarUnit._id, energyGenerated: 240, time: new Date("2025-10-07T08:00:00.000Z"), intervalHours: 2 },
                    { SolarUnitId: savedSolarUnit._id, energyGenerated: 260, time: new Date("2025-10-07T10:00:00.000Z"), intervalHours: 2 },
                ];
                return [4 /*yield*/, energyGenerationRecords_1.EnergyGenerationRecord.insertMany(energyRecordsData)];
            case 5:
                _a.sent();
                console.log(" Sample Solar Unit and Energy Records inserted successfully");
                return [4 /*yield*/, mongoose_1.default.disconnect()];
            case 6:
                _a.sent();
                console.log(" MongoDB disconnected");
                return [3 /*break*/, 8];
            case 7:
                error_1 = _a.sent();
                console.error(" Error seeding data:", error_1);
                process.exit(1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
seedData();
//# sourceMappingURL=seed.js.map