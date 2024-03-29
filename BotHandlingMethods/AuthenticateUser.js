const axios = require("axios");

async function AuthenticateUser(phoneNumberText) {
  console.log(phoneNumberText);
  const PhoneNumber = phoneNumberText.split("whatsapp:+91")[1];

  //get request to the api to check if the user is already registered
  console.log(PhoneNumber);
  const response = await axios.get(
    "https://invichat-website-server.azurewebsites.net/api/checkSellerExists",
    {
      params: {
        phone: PhoneNumber,
      },
    }
  );
  console.log(response);
  if (response.status === 200) {
    return true;
  } else {
    return false;
  }
}

module.exports = AuthenticateUser;
