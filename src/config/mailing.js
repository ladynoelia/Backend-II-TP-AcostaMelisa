import nodemailer from "nodemailer";
import { env } from "./environment.js";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: env.MAILING_USER,
    pass: env.MAILING_PASS,
  },
});
