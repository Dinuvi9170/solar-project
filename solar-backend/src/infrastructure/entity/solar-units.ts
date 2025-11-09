import mongoose from 'mongoose';

const SolarUnitSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
    // houseId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"House",
    //     required:true
    // }
})
export const SolarUnit= mongoose.model("solarunits",SolarUnitSchema);