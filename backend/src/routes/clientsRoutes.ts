import { Router } from 'express';
import clientsController from '../controllers/ClientsController';

const clientsRouter = Router();

clientsRouter.post('/', clientsController.store);
clientsRouter.get('/', clientsController.index);
clientsRouter.get('/:id', clientsController.show);
clientsRouter.put('/:id', clientsController.update);
clientsRouter.delete('/:id', clientsController.delete);

export default clientsRouter;
