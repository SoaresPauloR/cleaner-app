import prisma from '../lib/prisma';
import { Request, Response } from 'express';

/**
 * CleanersController class handles CRUD operations for cleaner data.
 */
class CleanersController {
  /**
   * Fetches and returns all cleaners.
   * @param req - Express request object.
   * @param res - Express response object.
   * @returns Promise<void>
   */
  async index(req: Request, res: Response): Promise<void> {
    try {
      const cleaners = await prisma.users.findMany({
        where: { type: 'Cleaner' },
      });
      res.json(cleaners);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
  }

  /**
   * Creates a new cleaner and returns the created cleaner.
   * @param req - Express request object.
   * @param res - Express response object.
   * @returns Promise<void>
   */
  async store(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, number } = req.body;

      if (!name || !email || !number) {
        res
          .status(400)
          .json({ message: 'Name, email, and number are required' });
        return;
      }

      const type = 'Cleaner';
      const id_google = '';
      const status = 'enable';

      const newCleaner = await prisma.users.create({
        data: { name, email, number, type, status, id_google },
      });

      res.json(newCleaner);
    } catch (error) {
      res.status(400).json({ message: 'Bad Request' });
      return;
    }
  }

  /**
   * Fetches and returns a cleaner by ID.
   * @param req - Express request object.
   * @param res - Express response object.
   * @returns Promise<void>
   */
  async show(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid ID format' });
        return;
      }

      const cleaner = await prisma.users.findUnique({
        where: { id, type: 'Cleaner' },
      });

      if (!cleaner) {
        res.status(404).json({ error: 'Cleaner not found' });
        return;
      }

      res.json(cleaner);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
  }

  /**
   * Deletes a cleaner by ID and returns a confirmation message.
   * @param req - Express request object.
   * @param res - Express response object.
   * @returns Promise<void>
   */
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid ID format' });
        return;
      }

      const cleaner = await prisma.users.findUnique({
        where: { id, type: 'Cleaner' },
      });

      if (!cleaner) {
        res.status(404).json({ error: 'Cleaner not found' });
        return;
      }

      await prisma.users.delete({ where: { id: cleaner.id } });

      res.json({ message: 'Cleaner deleted!' });
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
  }

  /**
   * Updates a cleaner by ID and returns the updated cleaner.
   * @param req - Express request object.
   * @param res - Express response object.
   * @returns Promise<void>
   */
  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid ID format' });
        return;
      }

      const cleaner = await prisma.users.findUnique({
        where: { id, type: 'Cleaner' },
      });

      if (!cleaner) {
        res.status(404).json({ error: 'Cleaner not found' });
        return;
      }

      const { name, email, number, status } = req.body;

      if (!name || !email || !number || !status) {
        res
          .status(400)
          .json({ message: 'Name, email, number, and status are required' });
        return;
      }

      const updatedCleaner = await prisma.users.update({
        where: { id },
        data: { name, email, number, status },
      });

      res.json(updatedCleaner);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
  }
}

export default new CleanersController();
