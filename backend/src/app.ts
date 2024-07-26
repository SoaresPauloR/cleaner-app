import express, { Application, Request, Response, NextFunction } from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import usersRouter from './routes/usersRoutes';
import cleanersRouter from './routes/cleanersRoutes';
import clientsRouter from './routes/clientsRoutes';
import eventsRouter from './routes/eventsRoutes';
import cors from 'cors';
import { authenticateJWT } from './middlewares/jwt';
import prisma from './lib/prisma';

class App {
  public app: Application;
  private corsOptions: cors.CorsOptions = {
    origin: ['http://localhost:3000', 'https://accounts.google.com'],
    optionsSuccessStatus: 200,
    credentials: true,
  };

  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
    this.configurePassport();
  }

  private configureMiddleware(): void {
    this.app.use(cors(this.corsOptions));
    this.app.use(express.json());
    this.app.use(
      session({
        secret: process.env.SECRET_KEY as string,
        resave: true,
        saveUninitialized: true,
      }),
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  private configureRoutes(): void {
    this.app.use('/users/', authenticateJWT, usersRouter);
    this.app.use('/cleaners/', cleanersRouter);
    this.app.use('/clients/', clientsRouter);
    this.app.use('/events/', eventsRouter);

    this.app.use('/verify-token/', (req: Request, res: Response) => {
      if (!req) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      const authHeader = req.headers['authorization'];

      if (!authHeader) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      const token = authHeader.split(' ')[1];

      jwt.verify(
        token,
        process.env.JWT_SECRET as string,
        (err: any, decoded: any) => {
          if (err) {
            return res.status(401).json({ message: 'Invalid token' });
          }

          return res.json({ isValid: true, user: decoded });
        },
      );
    });

    this.app.get(
      '/auth/google',
      passport.authenticate('google', { scope: ['profile', 'email'] }),
    );

    this.app.get(
      '/auth/google/callback',
      passport.authenticate('google', {
        failureRedirect: 'http://localhost:3000/error',
      }),
      (req: Request, res: Response) => {
        if (req.user) {
          const user = req.user as any;
          const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' },
          );

          console.log(token);

          res.redirect(`http://localhost:3000/callback?token=${token}`);
        } else {
          res.status(401).json({ message: 'Authentication failed' });
        }
      },
    );

    this.app.get(
      '/profile',
      this.ensureAuthenticated,
      (req: Request, res: Response) => {
        res.send(`Hello`);
      },
    );

    this.app.get(
      '/logout',
      (req: Request, res: Response, next: NextFunction) => {
        req.logout((err) => {
          if (err) return next(err);
          res.redirect('/');
        });
      },
    );
  }

  private configurePassport(): void {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          callbackURL: process.env.CALLBACK_URL as string,
        },
        async (token, tokenSecret, profile, done) => {
          try {
            let user = await prisma.users.findFirst({
              where: { id_google: profile.id },
            });

            if (!user && profile && profile.emails) {
              user = await prisma.users.create({
                data: {
                  id_google: profile.id,
                  email: profile.emails[0].value,
                  name: profile.displayName,
                  number: '',
                  type: 'Admin',
                  status: 'enable',
                },
              });
            }

            if (user) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'User creation failed' });
            }
          } catch (err) {
            return done(err, false);
          }
        },
      ),
    );

    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((obj, done) => {
      done(null, obj as false | Express.User | null | undefined);
    });
  }

  private ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }
}

export default App;
