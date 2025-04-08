const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/task-api-express";

async function connectToDataBase() {
  try {
    await mongoose.connect(url);
    console.log("DataBase connected");
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectToDataBase;
