import mongoose from "mongoose";

/* export async function mongoConnection() {
  await mongoose.connect("mongodb+srv://kabigon:coderProyect04@fuwafuwa-cluster.mqb615u.mongodb.net/fuwaEcommerce?appName=fuwafuwa-cluster");
} */

const connectMongoDB = async() => {
  try {
    await mongoose.connect(process.env.MONGODB);
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;