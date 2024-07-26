import { EventPayload } from '@/types/EventPayload';
import prisma from '../lib/prisma';
import { Request, Response } from 'express';
import { PayMethod, Prisma, Status, ValueType } from '@prisma/client';

class EventsController {
  async index(req: Request, res: Response): Promise<void> {
    try {
      const event = await prisma.events.findMany({
        include: { client: true, cleaner: true },
      });

      res.json(event);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async show(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        return res.status(404).json({ error: 'ID not found' });
      }

      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
      }

      const event = await prisma.events.findUnique({
        where: { id },
        include: { client: true, cleaner: true },
      });

      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
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

      const status = 'enable' as Status;

      if (
        !id_client ||
        !id_cleaner ||
        !date_start ||
        !date_finish ||
        !value ||
        !value_type ||
        !pay_method
      ) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      if (typeof id_client !== 'number') {
        return res.status(400).json({ error: 'Invalid Client' });
      }

      if (typeof id_cleaner !== 'number') {
        return res.status(400).json({ error: 'Invalid Cleaner' });
      }

      if (value <= 0) {
        return res.status(400).json({ error: 'Invalid Value' });
      }

      if (!(value_type in ValueType)) {
        return res.status(400).json({ error: 'Invalid Pay Method' });
      }

      if (!(pay_method in PayMethod)) {
        return res.status(400).json({ error: 'Invalid Who pay' });
      }

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
      res.status(400).json({ error: 'Bad Request' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        return res.status(404).json({ error: 'ID not found' });
      }

      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
      }

      const event = await prisma.events.findUnique({
        where: { id },
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

      if (
        !id_client ||
        !id_cleaner ||
        !date_start ||
        !date_finish ||
        !value ||
        !value_type ||
        !pay_method
      ) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      if (typeof id_client !== 'number') {
        return res.status(400).json({ error: 'Invalid Client' });
      }

      if (typeof id_cleaner !== 'number') {
        return res.status(400).json({ error: 'Invalid Cleaner' });
      }

      if (value <= 0) {
        return res.status(400).json({ error: 'Invalid Value' });
      }

      if (!(value_type in ValueType)) {
        return res.status(400).json({ error: 'Invalid Pay method' });
      }

      if (!(pay_method in PayMethod)) {
        return res.status(400).json({ error: 'Invalid Who pay' });
      }

      if (!(status in Status)) {
        return res.status(400).json({ error: 'Invalid Status' });
      }

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
