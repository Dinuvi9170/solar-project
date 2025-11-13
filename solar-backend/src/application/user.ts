import {NextFunction, Request,Response} from "express";
import { User } from "../infrastructure/entity/user";

export const getAllUsers= async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const users = await User.find();
        res.status(200).json({message:"fetched",users});
    }catch(error){
        console.error(error)
        next(error);
    }   
};