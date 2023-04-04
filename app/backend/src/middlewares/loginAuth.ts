import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import Users from '../database/models/Users';

const emailRegex = /^[\w+\-.]+@[a-z\d-]+(\.[a-z]+)*\.[a-z]+$/;
const errorMessage = 'Invalid email or password';

const validateInput = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
};

const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const users = await Users.findOne({ where: { email } });
  if (!users) {
    return res.status(401).json({ message: errorMessage });
  }

  if (!emailRegex.test(email)) {
    return res.status(401).json({ message: errorMessage });
  }

  const pass = await bcrypt.compare(password, users.password);
  if (!pass) {
    return res.status(401).json({ message: errorMessage });
  }
  if (password.length < 6) {
    return res.status(401).json({ message: errorMessage });
  }

  next();
};

export { validateInput, validateUser };
