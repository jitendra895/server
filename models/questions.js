// import mongoose from "mongoose";
const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  id: { type: String },
  text: { type: String },
  correct: { type: Boolean },
});

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answers: [answerSchema],
});

export default mongoose.models.QuestionDetails ||
  mongoose.model("QuestionDetails", questionSchema);
