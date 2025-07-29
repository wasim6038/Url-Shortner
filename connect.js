require("dotenv").config();
const mongoose = require("mongoose");

let isConnected = false;

const connectToDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = connectToDB;
