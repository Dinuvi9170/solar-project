import mongoose from 'mongoose';

const AnomaliesSchema= new mongoose.Schema({
    solarUnitId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SolarUnit",
        required:true
    },
    anomalyType:{
        type:String,
        enum:['Vibration','Temperature','PowerOutput','Mechanical'],
        required:true
    },
    severity:{
        type:String,
        enum:['low','medium','high'],
        required:true
    },
    detection_time:{
        type:Date,
        default:Date.now
    },
    description:{
        type:String,
        required:true
    },
    resolved:{
        type:String,
        enum:['active','under review','resolved'],
        default:'active'
    }  
})

const Anomalies= mongoose.model('anomalies',AnomaliesSchema);
export default Anomalies;