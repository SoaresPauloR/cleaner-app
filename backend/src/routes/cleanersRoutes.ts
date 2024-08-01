import { Router } from 'express';
import cleanersController from '../controllers/CleanersController';

const cleanersRouter = Router();

cleanersRouter.get('/', cleanersController.index);
cleanersRouter.post('/', cleanersController.store);
cleanersRouter.get('/:id', cleanersController.show);
cleanersRouter.put('/:id', cleanersController.update);
cleanersRouter.delete('/:id', cleanersController.delete);

export default cleanersRouter;
