import {z } from "zod";

export const CreateSolarUnitDto = z.object({
    serialNumber:z.string().min(1),
    installationDate: z.string(),
    capasity: z.number(),
    status: z.enum(["ACTIVE","INACTIVE","MAINTAINANCE"]),
    userId: z.string().min(1)
});

export const UpdateSolarUnitDto = z.object({
    serialNumber:z.string().min(1),
    installationDate: z.string(),
    capasity: z.number(),
    status: z.enum(["ACTIVE","INACTIVE","MAINTAINANCE"])
}).partial();