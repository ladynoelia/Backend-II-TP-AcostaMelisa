import mongoose from "mongoose";

/* export async function mongoConnection() {
  await mongoose.connect(process.env.MONGODB);
} */

const connectMongoDB = async() => {
  try {
    await mongoose.connect(process.env.MONGODB);
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;