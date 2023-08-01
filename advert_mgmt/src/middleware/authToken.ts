import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
 // Replace this with your secret key

interface DecodedToken {
  userId: number;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decodedToken = jwt.verify(token, 'asdfg') as DecodedToken;
    req.body.userId = decodedToken.userId; // Attach the decoded userId to the request object
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
