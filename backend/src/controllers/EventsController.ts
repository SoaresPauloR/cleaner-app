import prisma from '../lib/prisma';
import { Request, Response } from 'express';

class EventsController {
  async index(req: Request, res: Response): Promise<void> {
    try {
      const event = await prisma.events.findMany({
        include: { client: true, cleaner: true },
      });

      res.json(event);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async show(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        return res.status(404).json({ error: 'ID not found' });
      }

      const id = parseInt(req.params.id);

      const event = await prisma.events.findUnique({
        where: { id },
        include: { client: true, cleaner: true },
      });

      if (!event) {
        return res.status(404).json({ error: 'Cleaner not found' });
      }

      res.json(event);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async store(req: Request, res: Response) {
    try {
      const {
        id_client,
        id_cleaner,
        more_cleaner,
        date_start,
        date_finish,
        more,
        value,
        value_type,
        pay_method,
      } = req.body;

      const status = 'enable';

      const newEvent = await prisma.events.create({
        data: {
          id_client,
          id_cleaner,
          more_cleaner,
          date_start,
          date_finish,
          more,
          value,
          value_type,
          pay_method,
          status,
        },
      });

      const eventRes = await prisma.events.findUnique({
        where: { id: newEvent.id },
        include: { client: true, cleaner: true },
      });

      res.json(eventRes);
    } catch (error) {
      res.status(400).json({ message: 'Bad Request' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        return res.status(404).json({ error: 'ID not found' });
      }

      const event = await prisma.events.findUnique({
        where: { id: parseInt(req.params.id) },
      });

      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      const {
        id_client,
        id_cleaner,
        more_cleaner,
        date_start,
        date_finish,
        more,
        value,
        status,
        value_type,
        pay_method,
      } = req.body;

      const newEvent = await prisma.events.update({
        where: { id: parseInt(req.params.id) },
        data: {
          id_client,
          id_cleaner,
          more_cleaner,
          date_start,
          date_finish,
          more,
          value,
          value_type,
          pay_method,
          status,
        },
      });

      const eventRes = await prisma.events.findUnique({
        where: { id: newEvent.id },
        include: { client: true, cleaner: true },
      });

      res.json(eventRes);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      return res.status(404).json({ error: 'Not implemented' });
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new EventsController();
