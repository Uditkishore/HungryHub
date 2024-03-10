require("dotenv").config();
const mongoose = require("mongoose");

module.exports = async () => {
  try {
    mongoose.connect(process.env.DATABASE_URL);
    console.log("Database connected Successfully.");
  } catch (error) {
    console.log("err :", error);
  }
};
