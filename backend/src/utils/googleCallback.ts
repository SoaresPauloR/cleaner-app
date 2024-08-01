import { Request, Response } from 'express'; // Import Express.js types for request and response
import jwt from 'jsonwebtoken'; // Import jsonwebtoken library for token creation

/**
 * Handles the callback after successful authentication.
 *
 * This function checks if the user is authenticated, generates a JWT for the user,
 * and redirects to a specified URL with the token as a query parameter. If the user
 * is not authenticated, it responds with a 401 Unauthorized status and an error message.
 *
 * @param req - The HTTP request object, which should include user information if authenticated.
 * @param res - The HTTP response object, used to send a redirect or error response.
 *
 * @returns void
 */
export const googleCallback = (req: Request, res: Response): void => {
  if (req.user) {
    // Check if user information is present in the request (from authentication middleware)
    const user = req.user as { id: number; email: string };

    // Create a JWT token for the authenticated user
    const token = jwt.sign(
      {
        id: user.id, // User's ID
        email: user.email, // User's email
      },
      process.env.JWT_SECRET as string, // Secret key for signing the token
      {
        expiresIn: process.env.SESSION_EXPIRATION as string, // Token expiration time
      },
    );

    // Redirect the user to the client-side callback URL with the token as a query parameter
    res.redirect(`http://localhost:3000/callback?token=${token}`);
  } else {
    // If no user information is present, send a 401 Unauthorized response with an error message
    res.status(401).json({ message: 'Authentication failed' });
  }
};
