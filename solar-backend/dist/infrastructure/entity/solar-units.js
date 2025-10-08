"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolarUnit = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var SolarUnitSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    serialNumber: {
        type: String,
        required: true,
        unique: true
    },
    installationDate: {
        type: Date,
        required: true
    },
    capasity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["ACTIVE", "INACTIVE", "MAINTAINANCE"]
    },
    // houseId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"House",
    //     required:true
    // }
});
exports.SolarUnit = mongoose_1.default.model("solarunits", SolarUnitSchema);
//# sourceMappingURL=solar-units.js.map