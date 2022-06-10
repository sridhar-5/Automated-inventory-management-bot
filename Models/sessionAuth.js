const mongoose = require("mongoose");

const sessionAuthSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  verificationStatus: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const sessionModel = mongoose.model("sessionAuth", sessionAuthSchema);

module.exports = sessionModel;
