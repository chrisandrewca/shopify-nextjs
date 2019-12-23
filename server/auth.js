import jwt from 'jsonwebtoken'
import { log } from '../utils/error'

export const generateJwt = async (payload) => {
  const token = jwt.sign(payload, process.env.FOR_SERVER_CODE_JWT_SECRET, { expiresIn: 60, algorithm: 'HS256' });
  await log('generated jwt', { payload, token });
  return token;
}

export const validateJwt = async (token) => {
  const valid = jwt.verify(token, process.env.FOR_SERVER_CODE_JWT_SECRET);
  await log('validated jwt', { token, valid });
  return valid;
}