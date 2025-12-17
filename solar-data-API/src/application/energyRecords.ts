import {EnergyGenerationRecord} from "../infrastructure/entity/energyGenerationRecords";
import {Request,Response,NextFunction} from 'express';

export const getEnergyRecordsBySerialNumber= async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const {serialNumber}= req.params;
        const energyGenerationRecords= await EnergyGenerationRecord.find({serialNumber:serialNumber}).sort({time:1});
        res.status(200).json(energyGenerationRecords);
    }catch(error){
        next(error);
    }
   
};