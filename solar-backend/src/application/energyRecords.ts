import {EnergyGenerationRecord} from "../infrastructure/entity/energyGenerationRecords";
import {Request,Response,NextFunction} from 'express';

export const getEnergyRecordsBySolarid= async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const energyrecord = await EnergyGenerationRecord.find({SolarUnitId:req.params.id}).sort({time:-1})
        if(energyrecord.length===0){
            return res.status(404).json({message:"Energy record not found"});
        }
        res.status(200).json(energyrecord); 
    }catch(error){
        next(error);
    }
   
};