import mongoose from "mongoose";
import "dotenv/config";

let dbInstance = null;

const connectDB = async () => {
  console.log("connecting to atlas");
  try {
    const client = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "test123",
    });
    dbInstance = client.connection;
  } catch (error) {
    console.log(error);
  }
};

const getInstance = async () => {
  if (!dbInstance) await connectDB();
  return dbInstance;
};

export default getInstance;
