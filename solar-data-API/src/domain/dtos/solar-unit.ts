import {z } from "zod";

export const CreateSolarUnitDto = z.object({
    serialNumber:z.string().min(1),
    installationDate: z.string(),
    capasity: z.number(),
    status: z.enum(["ACTIVE","INACTIVE","MAINTAINANCE"]),
    userId: z.string().optional().or(z.literal(""))
});

export const UpdateSolarUnitDto = z.object({
    serialNumber:z.string().min(1).optional(),
    installationDate: z.string().optional(),
    capasity: z.number().optional(),
    status: z.enum(["ACTIVE","INACTIVE","MAINTAINANCE"]).optional(),
    userId: z.string().optional().or(z.literal(""))
})

export const getEnergyRecordsBySolaridDto = z.object({
    groupBy:z.enum(["date","hour"]).optional(),
    limit:z.string().min(1).optional()
})