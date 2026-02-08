import mongoose from "mongoose";
import { env } from "../config/environment.js";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(env.MONGODB);
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
