import { config } from "dotenv";

config();

export const env = {
  MONGODB: process.env.MONGODB,
  PORT: process.env.PORT,
  JWT_KEY: process.env.JWT_KEY,
  JWT_RESET_SECRET: process.env.JWT_RESET_SECRET,
  MAILING_USER: process.env.MAILING_USER,
  MAILING_PASS: process.env.MAILING_PASS,
};
