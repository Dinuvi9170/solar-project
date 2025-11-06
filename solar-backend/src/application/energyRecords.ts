import { getEnergyRecordsBySolaridDto} from "../domain/dtos/solar-unit";
import { ValidationError } from "../domain/errors/errors";
import {EnergyGenerationRecord} from "../infrastructure/entity/energyGenerationRecords";
import {Request,Response,NextFunction} from 'express';

export const getEnergyRecordsBySolarid= async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const result= getEnergyRecordsBySolaridDto.safeParse(req.query);
        if(!result.success){
            throw new ValidationError(result.error.message)
        }
        const {groupBy,limit}=result.data;

        if(!groupBy){
            const energyrecord = await EnergyGenerationRecord.find({
                SolarUnitId:req.params.id
            }).sort({time:-1})
            if(energyrecord.length===0){
                return res.status(404).json({message:"Energy record not found"});
            }
            res.status(200).json(energyrecord); 
        }
        if(groupBy==="date"){
            const energyrecord = await EnergyGenerationRecord.aggregate([
                {$group:{
                    _id:{
                        date:{$dateToString:{format: "%Y-%m-%d", date: "$time"}}
                    },
                    totalDayEnergy:{
                        $sum:"$energyGenerated"
                    },
                }},{
                    $sort:{"_id.date":-1}
                }
            ])
            if(!limit){
                res.status(200).json(energyrecord);
                return;
            }
            res.status(200).json(energyrecord.slice(0,parseInt(limit)));
        }
        if(groupBy==="hour"){
            const energyrecord = await EnergyGenerationRecord.aggregate([
                {$group:{
                    _id:{
                        date:{$dateToString:{format: "%Y-%m-%d", date: "$time"}},
                        time:{$dateToString:{format: "%H:%M", date: "$time"}}
                    },
                    totalHourEnergy: { $sum: "$energyGenerated" }
                    ,
                }},{
                    $sort:{"_id.date":-1}
                }
            ])
            res.status(200).json(energyrecord);
        }
    }catch(error){
        next(error);
    }
   
};