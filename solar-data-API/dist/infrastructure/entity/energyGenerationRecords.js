"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnergyGenerationRecord = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var EnergyGenerationRecordsSchema = new mongoose_1.default.Schema({
    SolarUnitId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "SolarUnit",
        required: true
    },
    energyGenerated: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    },
    intervalHours: {
        type: Number,
        default: 2,
        min: 0.1,
        max: 24
    }
});
exports.EnergyGenerationRecord = mongoose_1.default.model("energyrecords", EnergyGenerationRecordsSchema);
//# sourceMappingURL=energyGenerationRecords.js.map