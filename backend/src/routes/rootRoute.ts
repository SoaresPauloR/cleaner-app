import { Request, Response } from 'express';

export const root = (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Cleaning App API', version: '1.0.0' });
};
