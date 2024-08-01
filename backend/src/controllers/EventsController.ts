import prisma from '../lib/prisma';
import { Request, Response } from 'express';
import { PayMethod, Status, ValueType } from '@prisma/client';

/**
 * EventsController class handles CRUD operations for event data.
 */
class EventsController {
  /**
   * Fetches and returns all events with associated client and cleaner data.
   * @param req - Express request object.
   * @param res - Express response object.
   * @returns Promise<void>
   */
  async index(req: Request, res: Response): Promise<void> {
    try {
      const events = await prisma.events.findMany({
        include: { client: true, cleaner: true },
      });
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
  }

  /**
   * Fetches and returns an event by ID with associated client and cleaner data.
   * @param req - Express request object.
   * @param res - Express response object.
   * @returns Promise<void>
   */
  async show(req: Request, res: Response): Promise<void> {
    try {
      if (!req.params.id) {
        res.status(404).json({ error: 'ID not found' });
        return;
      }

      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid ID' });
        return;
      }

      const event = await prisma.events.findUnique({
        where: { id },
        include: { client: true, cleaner: true },
      });

      if (!event) {
        res.status(404).json({ error: 'Event not found' });
        return;
      }

      res.json(event);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
  }

  /**
   * Creates a new event and returns the created event with associated client and cleaner data.
   * @param req - Express request object.
   * @param res - Express response object.
   * @returns Promise<void>
   */
  async store(req: Request, res: Response): Promise<void> {
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
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      if (typeof id_client !== 'number') {
        res.status(400).json({ error: 'Invalid Client' });
        return;
      }

      if (typeof id_cleaner !== 'number') {
        res.status(400).json({ error: 'Invalid Cleaner' });
        return;
      }

      if (value <= 0) {
        res.status(400).json({ error: 'Invalid Value' });
        return;
      }

      if (!(value_type in ValueType)) {
        res.status(400).json({ error: 'Invalid Value Type' });
        return;
      }

      if (!(pay_method in PayMethod)) {
        res.status(400).json({ error: 'Invalid Pay Method' });
        return;
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
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
  }

  /**
   * Updates an existing event by ID and returns the updated event with associated client and cleaner data.
   * @param req - Express request object.
   * @param res - Express response object.
   * @returns Promise<void>
   */
  async update(req: Request, res: Response): Promise<void> {
    try {
      if (!req.params.id) {
        res.status(404).json({ error: 'ID not found' });
        return;
      }

      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid ID' });
        return;
      }

      const event = await prisma.events.findUnique({ where: { id } });

      if (!event) {
        res.status(404).json({ error: 'Event not found' });
        return;
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
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      if (typeof id_client !== 'number') {
        res.status(400).json({ error: 'Invalid Client' });
        return;
      }

      if (typeof id_cleaner !== 'number') {
        res.status(400).json({ error: 'Invalid Cleaner' });
        return;
      }

      if (value <= 0) {
        res.status(400).json({ error: 'Invalid Value' });
        return;
      }

      if (!(value_type in ValueType)) {
        res.status(400).json({ error: 'Invalid Value Type' });
        return;
      }

      if (!(pay_method in PayMethod)) {
        res.status(400).json({ error: 'Invalid Pay Method' });
        return;
      }

      if (!(status in Status)) {
        res.status(400).json({ error: 'Invalid Status' });
        return;
      }

      const updatedEvent = await prisma.events.update({
        where: { id },
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
        where: { id: updatedEvent.id },
        include: { client: true, cleaner: true },
      });

      res.json(eventRes);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
  }

  /**
   * Deletes an event by ID. Currently not implemented.
   * @param req - Express request object.
   * @param res - Express response object.
   * @returns Promise<void>
   */
  async delete(req: Request, res: Response): Promise<void> {
    try {
      res.status(404).json({ error: 'Not implemented' });
      return;
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
  }
}

export default new EventsController();
