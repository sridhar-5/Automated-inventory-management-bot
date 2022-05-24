const mongoose = require("mongoose");

const MessageFlowLogSchema = new mongoose.Schema({
  userName: String,
  QuestionStatus: Number,
  Operation: String,
  TotalQuestions: Number,
});

const MessageFlowLogModel = mongoose.model("flowlog", MessageFlowLogSchema);

module.exports = MessageFlowLogModel;
