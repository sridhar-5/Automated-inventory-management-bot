const dotenv = require("dotenv");
const express = require("express");
const session = require("express-session");
const app = express();
const bodyParser = require("body-parser");
const Twilio = require("twilio");
const connectDatabase = require("./config/DbConnection");
const logModel = require("./Models/logs");
const handleWhatsAppMessages = require("./BotHandlingMethods/handleWhatsAppMessages");
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./localStorage");
}

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

app.use(bodyParser.json());
app.use(session({ secret: process.env.COOKIE_SECRET }));

dotenv.config();

// function call to connect to the mongo database
connectDatabase();

//storing the data object we are collecting from user temporarily in local storage
var dataCollectionObject = {
  productImages: [],
};
localStorage.setItem(
  "dataCollectionObject",
  JSON.stringify(dataCollectionObject)
);

app.get("/", (request, response) => {
  response.status(200).send("Hello..! This is just to test.");
});

app.post("/", async (request, response) => {
  //logging the request body in development mode
  logRequestBody(request);
  //collect data and update in the local storage
  const findUser = await logModel.findOne({
    userName: request.body.ProfileName,
  });

  var answerObject = JSON.parse(localStorage.getItem("dataCollectionObject"));
  if (findUser) {
    if (findUser.Operation === "create") {
      if (findUser.QuestionStatus === 2) {
        answerObject.productName = request.body.Body;
      } else if (findUser.QuestionStatus === 3) {
        answerObject.productDescription = request.body.Body;
      } else if (findUser.QuestionStatus === 4) {
        answerObject.productPrice = request.body.Body;
      } else if (findUser.QuestionStatus === 5) {
        answerObject.productQuantity = request.body.Body;
      } else if (findUser.QuestionStatus === 6) {
        answerObject.NoOfPictures = request.body.Body;
        console.log("called for picture" + request.body);
      } else {
        console.log("imge" + request.body.MediaUrl0);
        answerObject.productImages.push(request.body.MediaUrl0);
        console.log(answerObject);
      }

      localStorage.setItem(
        "dataCollectionObject",
        JSON.stringify(answerObject)
      );
    }
  }

  console.log(answerObject);

  let twiml = new Twilio.twiml.MessagingResponse();

  var result = await handleWhatsAppMessages(request.body, response);

  if (process.env.NODE_ENV !== "production") {
    console.log(result);
  }

  // response to the user in thw whats app bot
  result.forEach((message) => {
    twiml.message(message);
  });

  response.end(twiml.toString());
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});

// function to log the request body in development mode
function logRequestBody(request) {
  if (process.env.NODE_ENV !== "production") {
    console.log(request.body);
  }
}
