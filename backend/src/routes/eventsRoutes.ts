import { Router } from 'express';
import eventsController from '../controllers/EventsController';

const eventsRouter = Router();

eventsRouter.post('/', eventsController.store);
eventsRouter.get('/', eventsController.index);
eventsRouter.get('/:id', eventsController.show);
eventsRouter.put('/:id', eventsController.update);
eventsRouter.delete('/:id', eventsController.delete);

export default eventsRouter;
