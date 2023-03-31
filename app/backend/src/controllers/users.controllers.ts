import { Request, Response } from 'express';
import UserService from '../services/users.services';
import createToken from '../middlewares/token';

class UserController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await UserService.login(email, password);

    const { password: _, ...userWithoutPassword } = user.dataValues;

    const token = createToken(userWithoutPassword);
    console.log(token);
    res.status(200).json({ token });
  }
}

export default UserController;
