import jwt from 'jsonwebtoken';

export const validateToken = (token: string): string | object => {
  try {
    const decoded = jwt.verify(token, 'asdfg');
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};
