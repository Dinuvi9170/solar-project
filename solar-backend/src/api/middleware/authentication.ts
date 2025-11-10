import { getAuth } from "@clerk/express";
import { Request,Response,NextFunction } from "express";
import { UnAuthorizedError } from "../../domain/errors/errors";

export const Authenticate = (req: Request, res: Response, next: NextFunction) => {
 const auth= getAuth(req);
 console.log(auth)
 if(!auth.userId){
   throw new UnAuthorizedError("UnAuthorized");
 }
 next();
};