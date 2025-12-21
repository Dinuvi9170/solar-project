import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import { User } from "../../../infrastructure/entity/user";
import { NotFoundError } from "../../../domain/errors/errors";
import { syncEnergyRecords } from "../../../application/background/sync-energyrecord-background";

export const syncMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = getAuth(req);
    const user = await User.findOne({ clerkId: auth.userId });
    if (!user) throw new NotFoundError("User not found");

    await syncEnergyRecords();

    next();
  } catch (error) {
    console.error("Error in sync middleware:", error);
    next(error);
  }
};
