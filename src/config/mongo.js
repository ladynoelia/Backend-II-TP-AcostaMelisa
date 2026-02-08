import mongoose from "mongoose";
import { env } from "./environment.js";

export default class MongoSingleton {
  static #instance;

  constructor() {
    mongoose.connect(env.MONGODB);
  }

  static getInstance() {
    if (this.#instance) {
      console.log("Ya estas conectada a la DB");
      return this.#instance;
    }
    this.#instance = new MongoSingleton();
    console.log("Base de datos conectada xD");
    return this.#instance;
  }
}
