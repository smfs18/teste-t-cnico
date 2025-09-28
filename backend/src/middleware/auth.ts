import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest, JWTPayload } from '../types';
import { User } from '../models';


const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Token de acesso é necessário' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    
    const user = await User.findByPk(decoded.id);
    if (!user || !user.isActive) {
      res.status(401).json({ error: 'Token inválido ou expirado' });
      return;
    }

    
    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};


export const optionalAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
      const user = await User.findByPk(decoded.id);

      if (user && user.isActive) {
        req.user = {
          id: user.id,
          email: user.email,
          username: user.username,
        };
      }
    } catch (error) {
      
    }
  }

  next();
};