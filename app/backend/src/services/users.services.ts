import User from '../database/models/Users';

class UserService {
  static async login(email: string) {
    const user = await User.findOne({ where: { email } });
    return user;
  }
}

export default UserService;
