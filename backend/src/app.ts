// Library imports
import express, { Application } from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import cors from 'cors';

// Middleware imports
import { authenticateJWT } from './middlewares/jwt';

// Utilities imports
import { googleCallback } from './utils/googleCallback';

// Route imports
import usersRouter from './routes/usersRoutes';
import cleanersRouter from './routes/cleanersRoutes';
import clientsRouter from './routes/clientsRoutes';
import eventsRouter from './routes/eventsRoutes';
import verifyToken from './routes/verifyTokenRoutes';
import { root } from './routes/rootRoute';
import { logout } from './routes/logoutRoute';
import { login } from './utils/login';

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

  /**
   * Configures middleware for the application.
   *
   * This function sets up various middleware components used by the Express application,
   * including CORS, JSON parsing, session management, and Passport.js initialization.
   *
   * @returns {void} This function does not return any value.
   */
  private configureMiddleware(): void {
    // Enable CORS with specified options
    this.app.use(cors(this.corsOptions));

    // Parse incoming JSON requests
    this.app.use(express.json());

    // Configure session management
    this.app.use(
      session({
        secret: process.env.SECRET_KEY as string,
        resave: true,
        saveUninitialized: true,
      }),
    );

    // Initialize Passport.js
    this.app.use(passport.initialize());

    // Integrate Passport.js with session management
    this.app.use(passport.session());
  }

  /**
   * Configures the routes for the application.
   *
   * This function sets up various routes for the Express application, including root, resource-specific routes,
   * token verification, Google OAuth authentication, and logout.
   *
   * @returns {void} This function does not return any value.
   */
  private configureRoutes(): void {
    // Root route
    this.app.get('/', root);

    // Routes for different resources, protected by JWT authentication
    this.app.use('/users/', authenticateJWT, usersRouter);
    this.app.use('/cleaners/', authenticateJWT, cleanersRouter);
    this.app.use('/clients/', authenticateJWT, clientsRouter);
    this.app.use('/events/', authenticateJWT, eventsRouter);

    // Route for verifying tokens
    this.app.use('/verify-token/', verifyToken);

    // Route for initiating Google OAuth authentication
    this.app.get(
      '/auth/google',
      passport.authenticate('google', { scope: ['profile', 'email'] }),
    );

    // Route for handling Google OAuth callback
    this.app.get(
      '/auth/google/callback',
      passport.authenticate('google', {
        failureRedirect:
          'http://localhost:3000/login?error=Authentication%20failed',
      }),
      googleCallback,
    );

    // Route for logging out
    this.app.get('/logout', logout);
  }

  /**
   * Configures Passport.js authentication strategies and session management.
   *
   * This function sets up Passport.js to authenticate users using the Google OAuth strategy.
   * It also configures session management by serializing and deserializing user information.
   *
   * @returns {void} This function does not return any value.
   */
  private configurePassport(): void {
    // Use GoogleStrategy for Passport.js authentication
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          callbackURL: process.env.CALLBACK_URL as string,
        },
        login, // Callback function for handling Google OAuth authentication
      ),
    );

    // Serialize user information into the session
    passport.serializeUser((user, done) => {
      done(null, user);
    });

    // Deserialize user information from the session
    passport.deserializeUser((obj, done) => {
      done(null, obj as false | Express.User | null | undefined);
    });
  }
}

export default App;
