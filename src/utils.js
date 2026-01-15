import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export function isValidPassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

export function generateToken(payload) {
  return jwt.sign(payload, "jwtdefuwafuwa");
}

export function verifyToken(token) {
  return jwt.verify(token, "jwtdefuwafuwa");
}
