"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var solar_unit_1 = __importDefault(require("./api/solar-unit"));
var db_1 = require("./infrastructure/db");
var energyRecords_1 = __importDefault(require("./api/energyRecords"));
var server = (0, express_1.default)();
server.use(express_1.default.json()); // convert structured data into json
server.use("/api/solar-units", solar_unit_1.default);
server.use("/api/energyRecords", energyRecords_1.default);
(0, db_1.connectDB)();
var PORT = 8000;
server.listen(PORT, function () {
    console.log("The server is running on port ".concat(PORT, " "));
});
//# sourceMappingURL=index.js.map