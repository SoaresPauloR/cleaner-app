import { Router } from 'express';
import usersController from '../controllers/UsersController';

const usersRouter = Router();

usersRouter.post('/', usersController.store);
usersRouter.get('/', usersController.index);
usersRouter.get('/:id', usersController.show);
usersRouter.put('/:id', usersController.update);
usersRouter.delete('/:id', usersController.delete);

export default usersRouter;
