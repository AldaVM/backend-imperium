import { sign } from 'jsonwebtoken';
import config from '../config';

const generateToken = (user: any) => {
  return sign({ user }, config.JWT_SECRET, { expiresIn: config.EXPIRES_IN });
}

export {
  generateToken
}
