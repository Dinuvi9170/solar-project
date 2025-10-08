//import { dataUnits } from "../infrastructure/data.js";
//import {v4 as uuid} from 'uuid';
import { CreateSolarUnitDto } from "../domain/dtos/solar-unit";
import { SolarUnit } from "../infrastructure/entity/solar-units";
import {Request,Response} from "express";

export const getAllUnits= async (req:Request,res:Response)=>{
    try{
        const dataUnits = await SolarUnit.find();
        res.status(200).json({message:"fetched",dataUnits});
    }catch(error){
        console.error(error)
        res.status(500).json({message:"Internal server error"});
    }
   
};

export const createSolarUnit= async(req:Request,res:Response)=>{
    try{
        const result= CreateSolarUnitDto.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({message:result.error.message});
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
        res.status(500).json({message:"Internal server error"}); 
    }
};

export const getUnitId= async (req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const solarUnit= await SolarUnit.findById(id);

        if(solarUnit)
            res.status(200).json(solarUnit);
        else
            res.status(404).json({message:"Not found."});
    }catch{
        res.status(500).json({message:"Internal server error"}); 
    }
}

export const updateSolarunit= async (req:Request,res:Response)=>{
    try{
        const {id} =req.params;
        const {installationDate,capasity,serialNumber,status}= req.body;

        const solarUnit= await SolarUnit.findById(id);

        if(solarUnit){ 
            const updateSolarUnit = await SolarUnit.findByIdAndUpdate(id,{
                installationDate,
                capasity,
                serialNumber,
                status
            });
            return res.status(200).json(updateSolarUnit);
        }else{
            return res.status(404).json({message:"Solar unit not found"});
        }
    }catch{
        res.status(500).json({message:"Internal server error"}); 
    }    
}

export const deleteUnit= async (req:Request,res:Response)=>{
    try{
        const {id} =req.params;
        const solarunit= await SolarUnit.findById(id);
        if(solarunit==null){
            return res.status(404).json({message:"Solar unit not found"});
        }
        await SolarUnit.findByIdAndDelete(id);
        return res.status(200).json({message:"Solar unit deleted successfully"});
    }catch{
        res.status(500).json({message:"Internal server error"}); 
    }
}