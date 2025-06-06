import { NextFunction, Request, Response } from 'express';

export const debug = (count: number) => (req: Request, res: Response, next: NextFunction) => {
  console.log(count);
  console.log('Auth Session:', req.session);
  console.log('Authenticated User:', req.user);
  next();
};
