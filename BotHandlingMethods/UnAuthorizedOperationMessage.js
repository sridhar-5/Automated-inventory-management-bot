function UnAuthorizedOperationMessage(username) {
  var HelpMessage = `Ouch ${username}..! \n\nYou're not authorized to perform this operation...❌.\nPlease register on our portal to be able to use the features of the bot.\n\n\t\t\t\t\t\t\tThank you\n\nRegards,\nTeam InviChat`;
  return HelpMessage;
}

module.exports = UnAuthorizedOperationMessage;
