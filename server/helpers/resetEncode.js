import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const encode = data => {
  const token = jwt.sign(data, process.env.JWT_KEY, { expiresIn: '1h' });
  return token;
};

export const decode = token => {
  const payload = jwt.verify(token, process.env.JWT_KEY);
  return payload;
};
