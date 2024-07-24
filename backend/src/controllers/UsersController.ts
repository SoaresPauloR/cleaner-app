import prisma from '../lib/prisma';
import { Request, Response } from 'express';

class UsersController {
  async index(req: Request, res: Response): Promise<void> {
    try {
      const users = await prisma.users.findMany();
      res.json(users);
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

      const newUser = await prisma.users.create({
        data: { name, email, number, type, status, id_google },
      });
      res.json(newUser);
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

      const user = await prisma.users.findUnique({ where: { id } });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        return res.status(404).json({ error: 'ID not found' });
      }

      const user = await prisma.users.findUnique({
        where: { id: parseInt(req.params.id) },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await prisma.users.delete({ where: { id: user.id } });

      res.json({
        message: 'User deleted!',
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

      const user = await prisma.users.findUnique({
        where: { id: parseInt(req.params.id) },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const { name, email, number, status } = req.body;

      const newUser = await prisma.users.update({
        where: { id: parseInt(req.params.id) },
        data: { name, email, number, status },
      });

      res.json(newUser);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new UsersController();
