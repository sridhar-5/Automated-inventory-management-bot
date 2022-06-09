const axios = require("axios");

async function AuthenticateUser(phoneNumberText) {
  console.log(phoneNumberText);
  const PhoneNumber = phoneNumberText.split("whatsapp:+91")[1];

  //get request to the api to check if the user is already registered
  const response = await axios.get(
    "https://amazon-sambhav-website-server.herokuapp.com/api/checkSellerExists",
    {
      params: {
        phone: PhoneNumber,
      },
    }
  );
  console.log("num" + response.data.status);
  if (response.data.status === "success") {
    return true;
  } else {
    return false;
  }
}

module.exports = AuthenticateUser;
