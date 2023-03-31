import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'hard';

const JTW_CONFIG: jwt.SignOptions = { algorithm: 'HS256', expiresIn: '20h' };

const createToken = (data: string) => jwt.sign(data, secret, JTW_CONFIG);

export default createToken;
