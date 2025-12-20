import mongoose from 'mongoose';

const SolarUnitSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    serialNumber:{
        type: String,
        required:true,
        unique:true
    },
    installationDate:{
        type:Date,
        required:true
    },
    capasity:{
        type: Number,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:["ACTIVE","INACTIVE","MAINTAINANCE"]
    },
    ratePerKwh: {
        type: Number,
        default: 0.25, // default price per kWh
    }
})
export const SolarUnit= mongoose.model("solarunits",SolarUnitSchema);