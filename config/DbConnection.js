const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

function connectDatabase() {
  const DatabaseConnection = mongoose.connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@sihhack.0ea71.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  );

  DatabaseConnection.then(() => {
    console.log("Connection to the database successfully");
  });
  DatabaseConnection.catch((error) => {
    console.log(`Connection Refused...${error}`);
  });
}

module.exports = connectDatabase;
