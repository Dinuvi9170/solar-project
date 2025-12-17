"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSolarUnitDto = void 0;
var zod_1 = require("zod");
exports.CreateSolarUnitDto = zod_1.z.object({
    serialNumber: zod_1.z.string().min(1),
    installationDate: zod_1.z.string(),
    capasity: zod_1.z.number(),
    status: zod_1.z.enum(["ACTIVE", "INACTIVE", "MAINTAINANCE"])
});
//# sourceMappingURL=solar-unit.js.map