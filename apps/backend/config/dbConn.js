import mongoose from "mongoose";
import "dotenv/config";

let dbInstance = null;

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

const getInstance = async () => {
  if (!dbInstance) await connectDB();
  return dbInstance;
};

export default getInstance;
