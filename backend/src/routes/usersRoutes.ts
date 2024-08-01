import { Router } from 'express';
import usersController from '../controllers/UsersController';

const usersRouter = Router();

// Opened (Admin)
usersRouter.post('/', usersController.store);
usersRouter.get('/:id', usersController.show);
usersRouter.put('/:id', usersController.update);

// Closed
// usersRouter.get('/', usersController.index);
// usersRouter.delete('/:id', usersController.delete);

export default usersRouter;
