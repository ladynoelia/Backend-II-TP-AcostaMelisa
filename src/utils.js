import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "./config/environment.js";

//Funciones de Bcrypt
export function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export function isValidPassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

//Funciones de JsonWebToken
export const generateToken = (user) => {
  const payload = {
    id: user._id.toString(),
    first_name: user.first_name,
    last_name: user.last_name,
    age: user.age,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, env.JWT_KEY, { expiresIn: "1h" });
};

export function verifyToken(token) {
  return jwt.verify(token, env.JWT_KEY);
}
