const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/mongo-taskAPI";

async function connectToDataBase() {
  try {
    await mongoose.connect(url);
    console.log("DataBase connected");
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectToDataBase;
