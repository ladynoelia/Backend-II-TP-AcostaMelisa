import { userModel } from "../../user.model.js";

export class UserDAO {
  async getUsers() {
    const users = await userModel.find({});
    return users;
  }

  async getUserByEmail(email) {
    const user = await userModel.findOne({ email });
    return user;
  }

  async createUser(user) {
    const newUser = await userModel.create(user);
    return newUser;
  }

  async updateUser(email, updates) {
    const updatedUser = await userModel.findOneAndUpdate({ email }, updates, {
      new: true,
    });
    return updatedUser;
  }

  async deleteUser(email) {
    const user = await userModel.findOneAndDelete({ email });
    return user;
  }
}
