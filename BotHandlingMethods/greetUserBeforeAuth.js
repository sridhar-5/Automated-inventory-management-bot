function getHelpMessageAfterAuth(username) {
  var HelpMessage = `Hi ${username}, You're verified now. You can ask me to do the following things:\n*/create* - To Create an Item\n*/update <product-id>* - To Update an already exisiting item`;
  return HelpMessage;
}

function getHelpMessageBeforeAuth(userName) {
  var HelpMessage = `Hi ${userName}, You're not verified yet. Please wait while i'm verifying you...! Thank you for your patience.`;
  return HelpMessage;
}

module.exports = { getHelpMessageAfterAuth, getHelpMessageBeforeAuth };
