// import mongoose from "mongoose";
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    upi:{
        type:String,
        required:true,
        unique:true
    }
    
},{timestamps:true})

export default mongoose.models.User || mongoose.model('User',UserSchema)

// module.exports = mongoose.models.Users || mongoose.model('Users',userSchema)