import z from "zod";

export const getAnomaliesBySolaridDto = z.object({
    groupBy:z.enum(["weekly","daily","hourly"]).optional(),
    limit:z.string().min(1).optional()
});