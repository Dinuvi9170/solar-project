import mongoose from "mongoose";

const UserSchema= new mongoose.Schema({
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role:{
      type: String,
      enum:['admin','staff'],
    },
    clerkId:{
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },

})

export const User= mongoose.model("users",UserSchema);