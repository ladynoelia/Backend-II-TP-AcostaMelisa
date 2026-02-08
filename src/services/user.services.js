import { UserDAO } from "../models/dao/mongoose/user.dao.js";
import { UserDTO } from "../models/dto/user.dto.js";

const userDao = new UserDAO();
const userDto = new UserDTO();

export async function getUsers() {
  const users = await userDao.getUsers({});
  return users;
}

export async function getUserByEmail(email) {
  const user = await userDao.getUserByEmail(email);
  return user || null;
}

export async function createUser(user) {
  let newSecuredUser = userDto.setSecurePassword(user);
  const newUser = await userDao.createUser(newSecuredUser);
  return newUser;
}

export async function updateUser(email, updates) {
  const updatedUser = await userDao.updateUser(email, updates);
  return updatedUser;
}

export async function deleteUser(email) {
  const user = await userDao.deleteUser(email);
  return user;
}
