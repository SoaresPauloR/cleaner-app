import express, { Application } from 'express';
import usersRouter from './routes/usersRoutes';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.initRoutes();
  }
  private initRoutes(): void {
    this.app.use('/users/', usersRouter);
  }
}

export default App;
