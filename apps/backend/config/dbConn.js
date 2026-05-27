import mongoose from "mongoose";

const connectDB = async () => {
  console.log("connecting to atlas");
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "test123",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
