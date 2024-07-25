import express, { Application } from 'express';
import usersRouter from './routes/usersRoutes';
import cleanersRouter from './routes/cleanersRoutes';
import clientsRouter from './routes/clientsRoutes';
import eventsRouter from './routes/eventsRoutes';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.initRoutes();
  }
  private initRoutes(): void {
    this.app.use('/users/', usersRouter);
    this.app.use('/cleaners/', cleanersRouter);
    this.app.use('/clients/', clientsRouter);
    this.app.use('/events/', eventsRouter);
  }
}

export default App;
