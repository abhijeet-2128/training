import { Request as ExpressRequest, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


const JWT_SECRET_KEY = 'asdfgh';

//  custom interface for Request that includes the user property
interface AuthenticatedRequest extends ExpressRequest {
  user?: { username: string; email: string };
}

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from the Authorization header
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token missing.' });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Access denied. Invalid token.' });
    }
    req.user = user as { username: string; email: string };
    next();
  });
}
