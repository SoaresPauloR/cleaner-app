import prisma from '../lib/prisma';
import { Request, Response } from 'express';

/**
 * UsersController class handles CRUD operations for user data.
 */
class UsersController {
  /**
   * Fetches and returns all users.
   * @param req - Express request object.
   * @param res - Express response object.
   * @returns Promise<void>
   */
  async index(req: Request, res: Response): Promise<void> {
    try {
      const users = await prisma.users.findMany();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
  }

  /**
   * Creates a new user and returns the created user data.
   * @param req - Express request object.
   * @param res - Express response object.
   * @returns Promise<void>
   */
  async store(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, number } = req.body;

      // Validate required fields
      if (!name || !email || !number) {
        res
          .status(400)
          .json({ message: 'Name, email, and number are required' });
        return;
      }

      // Default values for the new user
      const type = 'Admin';
      const id_google = '';
      const status = 'enable';

      const newUser = await prisma.users.create({
        data: { name, email, number, type, status, id_google },
      });

      // Check if user creation was successful
      if (!newUser) {
        res.status(400).json({ message: 'Failed to create user' });
        return;
      }

      res.json(newUser);
    } catch (error) {
      res.status(400).json({ message: 'Bad Request' });
      return;
    }
  }

  /**
   * Fetches and returns a user by ID.
   * @param req - Express request object.
   * @param res - Express response object.
   * @returns Promise<void>
   */
  async show(req: Request, res: Response): Promise<void> {
    try {
      // Check if ID is provided in the request parameters
      if (!req.params.id) {
        res.status(404).json({ error: 'ID not found' });
        return;
      }

      const id = parseInt(req.params.id);

      // Validate if ID is a number
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid ID' });
        return;
      }

      const user = await prisma.users.findUnique({ where: { id } });

      // Check if user exists
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
  }

  /**
   * Deletes a user by ID and returns a confirmation message.
   * @param req - Express request object.
   * @param res - Express response object.
   * @returns Promise<void>
   */
  async delete(req: Request, res: Response): Promise<void> {
    try {
      // Check if ID is provided in the request parameters
      if (!req.params.id) {
        res.status(404).json({ error: 'ID not found' });
        return;
      }

      const id = parseInt(req.params.id);

      // Validate if ID is a number
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid ID' });
        return;
      }

      const user = await prisma.users.findUnique({ where: { id } });

      // Check if user exists
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      await prisma.users.delete({ where: { id: user.id } });

      res.json({ message: 'User deleted!' });
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
  }

  /**
   * Updates a user by ID and returns the updated user data.
   * @param req - Express request object.
   * @param res - Express response object.
   * @returns Promise<void>
   */
  async update(req: Request, res: Response): Promise<void> {
    try {
      // Check if ID is provided in the request parameters
      if (!req.params.id) {
        res.status(404).json({ error: 'ID not found' });
        return;
      }

      const id = parseInt(req.params.id);

      // Validate if ID is a number
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid ID' });
        return;
      }

      const user = await prisma.users.findUnique({ where: { id } });

      // Check if user exists
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      const { name, email, number, status } = req.body;

      // Validate required fields for update
      if (!name || !email || !number || !status) {
        res
          .status(400)
          .json({ message: 'Name, email, number, and status are required' });
        return;
      }

      const newUser = await prisma.users.update({
        where: { id },
        data: { name, email, number, status },
      });

      // Check if user update was successful
      if (!newUser) {
        res.status(400).json({ message: 'Failed to update user' });
        return;
      }

      res.json(newUser);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
  }
}

export default new UsersController();
