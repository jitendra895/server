// import mongoose from "mongoose";
const mongoose = require('mongoose');

const countDownTimeSchema = new mongoose.Schema({
    time:{
        type:String,
        required:true,
        unique:true
    }
    
},{timestamps:true})

export default mongoose.models.CountDownTime || mongoose.model('CountDownTime',countDownTimeSchema)

// module.exports = mongoose.models.Users || mongoose.model('Users',userSchema)