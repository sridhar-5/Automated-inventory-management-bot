const mongoose = require("mongoose");
const sessionModel = require("../Models/sessionAuth.js");

var CheckVerificationStatusOfUser = async function (userName) {
  var user = await sessionModel.findOne({ userName: userName });
  if (user) {
    return user.verificationStatus;
  } else {
    return false;
  }
};

module.exports = CheckVerificationStatusOfUser;
