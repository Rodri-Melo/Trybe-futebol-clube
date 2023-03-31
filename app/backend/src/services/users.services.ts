import User from '../database/models/Users';
import { IUser } from '../interfaces/UserInterface';

class UserService implements IUser {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  static async login(email: string, password: string) {
    const user = await User.create({ email, password });

    return user;
  }
}

export default UserService;
