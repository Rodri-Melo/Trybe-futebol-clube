import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction as Next } from 'express';
import { IRole } from '../interfaces/UserInterface';

const secret = process.env.JWT_SECRET || 'hard';

const JTW_CONFIG: jwt.SignOptions = { algorithm: 'HS256', expiresIn: '20h' };

const createToken = (data: IRole): string => jwt.sign(data, secret, JTW_CONFIG);

const verifyToken = (token: string, secreto: string) => jwt.verify(token, secreto);

const verify = (req: Request, res: Response, next: Next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const data = jwt.verify(authorization, secret) as IRole;
    req.body.user = data;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default {
  createToken, verifyToken, verify,
};
