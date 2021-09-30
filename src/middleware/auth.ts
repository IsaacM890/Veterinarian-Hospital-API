/** @format */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied ' });
  }
  try {
    const decoded = await jwt.verify(token, config.get('jwtSecret'));
    // @ts-ignore
    req.patient = decoded.patient;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
