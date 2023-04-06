import User from '../database/models/Users';
import { IRole } from '../interfaces/UserInterface';

class UserService implements IRole {
  email: string;
  password: string;
  role: string;
  username: string;

  constructor(email: string, password: string, role:string, username:string) {
    this.email = email;
    this.password = password;
    this.role = role;
    this.username = username;
  }

  static async login(email: string) {
    const user = await User.findOne({ where: { email } });
    console.log(user);
    return user;
  }
}

export default UserService;
