import prisma from '../lib/prisma';
import { Request, Response } from 'express';

class CleanersController {
  async index(req: Request, res: Response): Promise<void> {
    try {
      const cleaner = await prisma.users.findMany({
        where: { type: 'Cleaner' },
      });

      res.json(cleaner);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { name, email, number } = req.body;

      const type = 'Cleaner';
      const id_google = '';
      const status = 'enable';

      const newCleaner = await prisma.users.create({
        data: { name, email, number, type, status, id_google },
      });
      res.json(newCleaner);
    } catch (error) {
      res.status(400).json({ message: 'Bad Request' });
    }
  }

  async show(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        return res.status(404).json({ error: 'ID not found' });
      }

      const id = parseInt(req.params.id);

      const cleaner = await prisma.users.findUnique({
        where: { id, type: 'Cleaner' },
      });

      if (!cleaner) {
        return res.status(404).json({ error: 'Cleaner not found' });
      }

      res.json(cleaner);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        return res.status(404).json({ error: 'ID not found' });
      }

      const cleaner = await prisma.users.findUnique({
        where: { id: parseInt(req.params.id), type: 'Cleaner' },
      });

      if (!cleaner) {
        return res.status(404).json({ error: 'Cleaner not found' });
      }

      await prisma.users.delete({ where: { id: cleaner.id, type: 'Cleaner' } });

      res.json({
        message: 'Cleaner deleted!',
      });
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        return res.status(404).json({ error: 'ID not found' });
      }

      const cleaner = await prisma.users.findUnique({
        where: { id: parseInt(req.params.id), type: 'Cleaner' },
      });

      if (!cleaner) {
        return res.status(404).json({ error: 'Cleaner not found' });
      }

      const { name, email, number, status } = req.body;

      const newCleaner = await prisma.users.update({
        where: { id: parseInt(req.params.id), type: 'Cleaner' },
        data: { name, email, number, status },
      });

      res.json(newCleaner);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new CleanersController();
