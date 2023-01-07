// import mongoose from "mongoose";
const mongoose = require('mongoose');

const WinnerSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    }
    
},{timestamps:true})

export default mongoose.models.Winners || mongoose.model('Winners',WinnerSchema)

// module.exports = mongoose.models.Users || mongoose.model('Users',userSchema)