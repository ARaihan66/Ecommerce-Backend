import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("Mongodb connected successfully");
  } catch (error) {
    console.log("Error");
    console.log(error);
  }
};

export default connectDB;
