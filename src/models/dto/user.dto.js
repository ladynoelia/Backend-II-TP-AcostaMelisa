import { createHash } from "../../utils.js";

export class UserDTO {
  setSecurePassword(user) {
    user.password = createHash(user.password);
    return user;
  }

  setSessionUserData(user) {
    const userData = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    };
    return userData;
  }
}
