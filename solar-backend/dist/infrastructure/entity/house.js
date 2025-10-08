"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.House = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var houseSchema = new mongoose_1.default.Schema({
    address: {
        type: String,
        required: true
    },
    solarUnitId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "SolarUnit",
        required: true
    }
});
exports.House = mongoose_1.default.model("house", houseSchema);
//# sourceMappingURL=house.js.map