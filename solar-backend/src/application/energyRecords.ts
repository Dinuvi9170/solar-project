import {EnergyGenerationRecord} from "../infrastructure/entity/energyGenerationRecords";
import {Request,Response} from 'express';

export const getEnergyRecordsBySolarid= async (req:Request,res:Response)=>{
    try{
        const energyrecord = await EnergyGenerationRecord.find({SolarUnitId:req.params.id})
        if(energyrecord.length===0){
            return res.status(404).json({message:"Energy record not found"});
        }
        res.status(200).json(energyrecord); 
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
   
};