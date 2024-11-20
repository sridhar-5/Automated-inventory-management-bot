const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

function connectDatabase() {
  const DatabaseConnection = mongoose.connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.noion.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.APP_NAME}`
  );

  DatabaseConnection.then(() => {
    console.log("Connection to the database successfully");
  });
  DatabaseConnection.catch((error) => {
    console.log(`Connection Refused...${error}`);
  });
}

module.exports = connectDatabase;
