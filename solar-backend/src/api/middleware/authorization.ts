import { getAuth } from '@clerk/express';
import {Request,Response,NextFunction} from 'express';
import { UnAuthorizedError,ForbiddenError } from '../../domain/errors/errors';
import { UserPublicMetaData } from '../../domain/types';

export const Authorization =async (req: Request, res: Response, next: NextFunction) => {
    const auth= getAuth(req);
    if(!auth.userId){
        throw new UnAuthorizedError("UnAuthorized");
    }
    const publicMetadata= auth.sessionClaims?.metadata as UserPublicMetaData;
    console.log(publicMetadata.role)
    if(publicMetadata.role !== "admin"){
    throw new ForbiddenError("Frobidden");
    }
    next();
};