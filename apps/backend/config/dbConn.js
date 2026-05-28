// import mongoose from "mongoose";
const mongoose = require('mongoose'); 

import "dotenv/config";

const connectDB = async () => {
  console.log("connecting to atlas");
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "test123",
    });
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
