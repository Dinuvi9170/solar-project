import mongoose from "mongoose";

const EnergyGenerationRecordsSchema =new mongoose.Schema(
    {
        serialNumber:{
        type: String,
        required: true
        },
        energyGenerated:{
            type:Number,
            required:true
        },
        time:{
            type:Date,
            default:Date.now
        },
        intervalHours:{
            type:Number,
            default:2,
            min:0.1,
            max:24
        },
        temperature: { 
            type: Number 
        },     
        vibration: { 
            type: Number 
        },       
        mechanicalIssue: { 
            type: Boolean 
        } 
    }
);

export const EnergyGenerationRecord= mongoose.model("energyrecords",EnergyGenerationRecordsSchema);
