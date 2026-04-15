import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // await mongoose.connect(process.env.DATABASE_URI,{dbName:"sample_mflix"});
    await mongoose.connect(process.env.DATABASE_URI,{dbName:"test123"});
  } catch (error) {
    console.log(error);
  }
};

export default connectDB