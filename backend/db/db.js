import mongoose from "mongoose";
export const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("connected to mongoDb successfully");

  } catch (error) {
    console.log("Error : ", error);
    process.exit(1)

  }
}