// import mongoose from "mongoose";
const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    score:{
        type:String,
    }
    
},{timestamps:true})

export default mongoose.models.Result || mongoose.model('Result',resultSchema)