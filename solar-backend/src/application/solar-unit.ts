//import { dataUnits } from "../infrastructure/data.js";
//import {v4 as uuid} from 'uuid';
import { CreateSolarUnitDto, UpdateSolarUnitDto } from "../domain/dtos/solar-unit";
import { NotFoundError, ValidationError } from "../domain/errors/errors";
import { SolarUnit } from "../infrastructure/entity/solar-units";
import {NextFunction, Request,Response} from "express";
import { User } from "../infrastructure/entity/user";
import { getAuth } from "@clerk/express";

export const getAllUnits= async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const dataUnits = await SolarUnit.find().populate("userId", "firstName lastName email");
        res.status(200).json({message:"fetched",dataUnits});
    }catch(error){
        console.error(error)
        next(error);
    }   
};

export const createSolarUnit= async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const result= CreateSolarUnitDto.safeParse(req.body);
        if(!result.success){
            throw new ValidationError(result.error.message);
        }
        const newSolarUnit={
            installationDate:new Date(result.data.installationDate),
            capasity:result.data.capasity,
            serialNumber:result.data.serialNumber,
            status:result.data.status,
            userId:result.data.userId
        };

        const createdSolarUnit=await SolarUnit.create(newSolarUnit);
        res.status(201).json(createdSolarUnit );
    }catch(error){
        console.error(error);
        next(error);
    }
};

export const getUnitId= async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const {id}=req.params;
        const solarUnit= await SolarUnit.findById(id);

        if(solarUnit)
            res.status(200).json(solarUnit);
        else
            throw new NotFoundError("Solar unit not found");
    }catch(error){
        next(error); 
    }
}

export const getSolarUnitforUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const auth=getAuth(req);
        const clerkId=auth.userId;

        if (!clerkId) {
            return res.status(400).json({ message: "clerkId parameter is required" });
        }

        const user = await User.findOne({ clerkId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const solarUnits = await SolarUnit.find({ userId: user._id });

        if (solarUnits.length > 0) {
            console.log(`Found ${solarUnits.length} solar unit(s) for userId: ${user._id}`);
            return res.status(200).json(solarUnits[0]);
        } else {
            return console.log("No solar units found" );
        }
    } catch (error) {
        next(error); 
    }
};

export const updateSolarunit= async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const {id} =req.params;
        const result= UpdateSolarUnitDto.safeParse(req.body);

        if(!result.success){
            throw new ValidationError(result.error.message);
        }
        const solarUnit= await SolarUnit.findById(id);

        if(solarUnit){ 
            const updateData:any={};
            if(result.data.installationDate)
                updateData.installationDate=new Date(result.data.installationDate);
            if(result.data.capasity)
                updateData.capasity=result.data.capasity;
            if(result.data.serialNumber)
                updateData.serialNumber=result.data.serialNumber;
            if(result.data.status)
                updateData.status=result.data.status;
            const updateSolarUnit = await SolarUnit.findByIdAndUpdate(id,updateData,{new:true,runValidators: true});
            return res.status(200).json(updateSolarUnit);
        }else{
            throw new NotFoundError("Solar unit not found");
        }
    }catch(error){
        next(error);
    }    
}

export const deleteUnit= async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const {id} =req.params;
        const solarunit= await SolarUnit.findById(id);
        if(solarunit==null){
            throw new NotFoundError("Solar unit not found");
        }
        await SolarUnit.findByIdAndDelete(id);
        return res.status(200).json({message:"Solar unit deleted successfully"});
    }catch(error){
        next(error);
    }
}