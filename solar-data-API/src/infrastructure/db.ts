import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        console.log("connecting to MongoDB");
        const MONGO_URL=process.env.MONGODB_URL;
        if(!MONGO_URL){
            throw new Error("MONGO_URL is not defined");
        }
        await mongoose.connect(MONGO_URL);
        console.log("connected to MongoDB");
    }
    catch(error){
        console.log(error);
    }
}