import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

class VerifyTokenController {
  /**
   * @route GET /verify-token
   * @description Verify the JWT token provided in the Authorization header.
   * @access Public
   */
  index(req: Request, res: Response): void {
    // Check if the request is valid
    if (!req) {
      res.status(401).json({ message: 'Invalid request' });
      return;
    }

    // Retrieve the Authorization header
    const authHeader = req.headers['authorization'];

    // If the Authorization header is not provided, respond with 401 Unauthorized
    if (!authHeader) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    // Verify the JWT token
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: any, decoded: any) => {
        // If token verification fails, respond with 401 Unauthorized
        if (err) {
          res.status(401).json({ message: 'Invalid token' });
          return;
        }

        // If token verification is successful, respond with the decoded token information
        res.json({ isValid: true, user: decoded });
        return;
      },
    );
  }
}

export default new VerifyTokenController();
