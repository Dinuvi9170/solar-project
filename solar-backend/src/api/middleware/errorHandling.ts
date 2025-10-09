import {NextFunction, Request,Response} from "express";
import {NotFoundError,ValidationError} from "../../domain/errors/errors";

export const ErrorHandlingMiddleware=(
    err:Error,
    req:Request,
    res:Response,  
    next:NextFunction 
 )=>{
    console.error(err);
    if(err.name=== "NotFoundError"){
        return res.status(404).json({message:err.message});
    }
    if(err.name==="ValidationError"){
        return res.status(400).json({message:err.message});
    }
    
    return res.status(500).json({message:"Internal server error"});
 }