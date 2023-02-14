const mongoose = require("mongoose");
const logs = require("../Models/logs");
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./localStorage");
}
const greetUserBeforeAuth = require("../BotHandlingMethods/greetUserBeforeAuth");
const {
  getHelpMessageAfterAuth,
  NotVerifiedMessage,
} = require("../BotHandlingMethods/greetUserAfterAuth");
const product = require("../Models/productModel");
const AuthenticateUser = require("./AuthenticateUser.js");
const sessionModel = require("../Models/sessionAuth");
const CheckVerificationStatusOfUser = require("./checkUserVerificationStatus.js");
const UnAuthorizedOperationMessage = require("./UnAuthorizedOperationMessage.js");
//help message for the user

async function handleWhatsAppMessages(requestBody, response) {
  var question = [];
  var operation;
  response.writeHead(200, { "Content-Type": "text/xml" });

  //split the request body with delimiter as space
  var requestBodyMsg = requestBody.Body.split(" ");

  console.log(requestBodyMsg);

  for (var i = 0; i < requestBodyMsg.length; i++) {
    if (
      ["hello", "hi", "hey", "hola", "namaste"].includes(
        requestBodyMsg[i].toLowerCase()
      )
    ) {
      var message = greetUserBeforeAuth(requestBody.ProfileName);
      return [message];
    }
  }

  // check if the user is authenticated
  if (requestBodyMsg[0] === "verifyme") {
    // check if the user is already in the database
    const Auth = await AuthenticateUser(requestBody.From);

    if (Auth) {
      // if the user is already in the database
      var message = getHelpMessageAfterAuth(requestBody.ProfileName);
      //create a new log with entry of auth user
      await new sessionModel({
        userName: requestBody.ProfileName,
        verificationStatus: true,
      }).save();
      return [message];
    } else {
      // if the user is not in the database save a session log with verification status false
      await new sessionModel({
        userName: requestBody.ProfileName,
        verificationStatus: false,
      }).save();

      return [NotVerifiedMessage(requestBody.ProfileName)];
    }
  }
  //initializing the sms count to find out which state of the form the user is in
  var getUserObjectIfThereAlready = await logs.findOne({
    userName: requestBody.ProfileName,
  });

  if (getUserObjectIfThereAlready) {
    operation = getUserObjectIfThereAlready.Operation;
  }

  //check if the request body is create
  if (requestBodyMsg[0] === "/create" || operation === "create") {
    //save the operation name in the database
    //check the verification status of the user
    if (!CheckVerificationStatusOfUser(requestBody.ProfileName)) {
      return [UnAuthorizedOperationMessage(requestBody.ProfileName)];
    }
    if (!getUserObjectIfThereAlready) {
      console.log("Creating new log");
      const newLog = await new logs({
        userName: requestBody.ProfileName,
        QuestionStatus: 1,
        Operation: "create",
        TotalQuestions: 6,
      }).save();

      question.push(`Name of the Item ?`);
    } else {
      var getQuestionStatus = getUserObjectIfThereAlready.QuestionStatus;
      //logging question status in development
      if (process.env.NODE_ENV !== "production") {
        console.log(getQuestionStatus);
      }

      if (getQuestionStatus == 2) {
        question.push(`Describe the Item ?`);
      } else if (getQuestionStatus == 3) {
        question.push(`Price of the Item ?`);
      } else if (getQuestionStatus == 4) {
        question.push(`Quantity of the Item Available ?`);
      } else if (getQuestionStatus == 5) {
        question.push(`How many images would you like to send in ?`);
      } else if (getQuestionStatus == 6) {
        //reserved picture message
        //update the
        if (parseInt(requestBody.Body) > 0) {
          question.push(
            Math.abs(
              getUserObjectIfThereAlready.TotalQuestions - getQuestionStatus
            ) + 1 || 1
          );
        }
      } else if (getQuestionStatus > 6) {
        //continue sending numbers and capture links
        if (getQuestionStatus != getUserObjectIfThereAlready.TotalQuestions) {
          question.push(
            Math.abs(
              getUserObjectIfThereAlready.TotalQuestions - getQuestionStatus
            ) + 1
          );
        } else {
          //get the local storaqe
          var dataCollectionObject = JSON.parse(
            localStorage.getItem("dataCollectionObject")
          );
          //log it if it is development environment
          if (process.env.NODE_ENV !== "production") {
            console.log(dataCollectionObject);
          }

          //push the data in local storage into the mongo database'
          const newProduct = await new product({
            productName: dataCollectionObject.productName,
            productDescription: dataCollectionObject.productDescription,
            productPrice: dataCollectionObject.productPrice,
            productQuantity: dataCollectionObject.productQuantity,
            NoOfPictures: dataCollectionObject.NoOfPictures,
            productImages: dataCollectionObject.productImages,
            Owner: dataCollectionObject.Owner,
          });
          const pushSuccess = await newProduct.save();

          //clear the local storage and logs
          if (pushSuccess) {
            var dataCollectionObject = {
              productImages: [],
            };
            localStorage.setItem(
              "dataCollectionObject",
              JSON.stringify(dataCollectionObject)
            );

            //clear logs in mongo
            const clearMongoLog = await logs.findOneAndDelete({
              userName: requestBody.ProfileName,
            });

            //clear session log in mongo
            const clearMongoSessionLog = await sessionModel.findOneAndDelete({
              userName: requestBody.ProfileName,
            });
          }
          question.push(
            "Thank you for choosing kalakaar..! Your Item will be soon reflected on the website."
          );
        }
      }
    }
    getUserObjectIfThereAlready = await logs.findOne({
      userName: requestBody.ProfileName,
    });
    // console.log(getUserObjectIfThereAlready);
    //updating the counter in the database
    if (getUserObjectIfThereAlready && getQuestionStatus !== 6) {
      const update = await updateQuestionStatus(getUserObjectIfThereAlready);

      if (update) {
        return question;
      }
    } else if (getUserObjectIfThereAlready && getQuestionStatus === 6) {
      //procedure has 6 steps in common in the seventh step update the no of total steps to total + noOfPhotos

      var tempObj = JSON.parse(localStorage.getItem("dataCollectionObject"));
      //for testing purpose
      // if (process.env.NODE_ENV != "production") {
      //   console.log("test", tempObj);
      // }

      localStorage.setItem("dataCollectionObject", JSON.stringify(tempObj));

      await logs.findOneAndUpdate(
        { _id: getUserObjectIfThereAlready._id },
        {
          TotalQuestions:
            parseInt(getUserObjectIfThereAlready.QuestionStatus) +
            parseInt(tempObj.NoOfPictures),
        },
        { new: true }
      );
      const update = await updateQuestionStatus(getUserObjectIfThereAlready);

      return question;
    }
  }
  return question;
}

async function updateQuestionStatus(getUserObjectIfThereAlready) {
  const update = await logs.findOneAndUpdate(
    { _id: getUserObjectIfThereAlready._id },
    { $inc: { QuestionStatus: 1 } },
    { new: true }
  );
  return update;
}

module.exports = handleWhatsAppMessages;
