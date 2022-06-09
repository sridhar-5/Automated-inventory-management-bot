function getHelpMessageBeforeAuth(userName) {
  var HelpMessage = `Hi ${userName},\n\nWelcome to InviChat. \nYou're session isn't verified yet...❌. \nPlease send a *verifyme* message to verify yourself...! \nThank you for your cooperation.`;
  return HelpMessage;
}

module.exports = getHelpMessageBeforeAuth;
