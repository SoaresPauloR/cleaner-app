import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';
import { Profile, VerifyCallback } from 'passport-google-oauth20';

/**
 * Handles user login using Google OAuth. And verifies if the user's email is associated with an existing account in the database.
 *
 * @param token - The OAuth token provided by Google.
 * @param tokenSecret - The OAuth token secret provided by Google.
 * @param profile - The user's profile information from Google.
 * @param done - The callback function to be called upon completion.
 *
 * @returns A promise that resolves to void. The `done` callback is called with either an error or the user and token information.
 */
export async function login(
  token: string,
  tokenSecret: string,
  profile: Profile,
  done: VerifyCallback,
): Promise<void> {
  try {
    if (!profile.emails) {
      return done('Email not found', false);
    }

    const email = profile.emails[0].value as string;

    const user = await prisma.users.findFirst({
      where: { email },
    });

    if (!user) {
      done(null, false);
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.SESSION_EXPIRATION as string,
      },
    );

    const newUser = await prisma.users.update({
      data: { ...user, id_google: profile.id.toString() },
      where: { id: user.id },
    });

    if (!newUser) {
      return done(null, false);
    }

    return done(null, { user, token: token });
  } catch (err) {
    return done(err, false);
  }
}
