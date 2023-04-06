import { Request, Response } from 'express';
import UserService from '../services/users.services';
import createToken from '../middlewares/token';

class UserController {
  static async login(req: Request, res: Response) {
    const { email } = req.body;
    const user = await UserService.login(email);
    if (user === null) {
      return res.status(401).json({ message: 'user não encontrado' });
    }

    const { password: _, ...userWithoutPassword } = user.dataValues;

    const token = createToken.createToken(userWithoutPassword);
    res.status(200).json({ token });
  }
}

export default UserController;
