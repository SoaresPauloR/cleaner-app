import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware function to authenticate JSON Web Tokens (JWT).
 *
 * This function extracts the token from the Authorization header,
 * verifies it, and attaches the decoded user information to the request object.
 * If the token is invalid or missing, it responds with an appropriate HTTP status code.
 *
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @param next - The function to pass control to the next middleware.
 *
 * @returns void
 */
export function authenticateJWT(
  req: Request, // The incoming request object
  res: Response, // The outgoing response object
  next: NextFunction, // The function to call the next middleware
): void {
  const authHeader = req.headers.authorization; // Extract the Authorization header from the request

  if (authHeader) {
    // If Authorization header is present, extract the token
    const token = authHeader.split(' ')[1]; // Split 'Bearer <token>' and get the token part

    // Verify the token using the secret key from environment variables
    jwt.verify(token, process.env.JWT_SECRET as string, async (err, user) => {
      if (err) {
        // If token verification fails, respond with 403 Forbidden
        res.sendStatus(403);
        return;
      }

      // If token is valid, attach the decoded user information to the request object
      req.user = user;
      next(); // Pass control to the next middleware function
      return;
    });
  } else {
    // If Authorization header is missing, respond with 401 Unauthorized
    res.sendStatus(401);
    return;
  }
}
