function getHelpMessageAfterAuth(username) {
  var HelpMessage = `Yayyy ${username} 🎉..!, \n\nYou're verified now ✅.\nYou can now ask me to do the following things:\n*1.) /create* - To Create an Item\n*2.) /update <product-id>* - To Update an already exisiting item`;
  return HelpMessage;
}

function NotVerifiedMessage(username) {
  var HelpMessage = `Ouch ${username}..! \n\nYou're not a registered seller...❌.\nPlease register on our portal to be able to use the features of the bot.\n\n\t\t\t\t\t\t\tThank you\n\nRegards,\nTeam InviChat`;
  return HelpMessage;
}
module.exports = { getHelpMessageAfterAuth, NotVerifiedMessage };
