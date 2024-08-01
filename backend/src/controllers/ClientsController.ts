import prisma from '../lib/prisma';
import { Request, Response } from 'express';

/**
 * ClientsController class handles CRUD operations for client data.
 */
class ClientsController {
  /**
   * Fetches and returns all clients with their addresses.
   * @param req - Express request object.
   * @param res - Express response object.
   * @returns Promise<void>
   */
  async index(req: Request, res: Response): Promise<void> {
    try {
      const clients = await prisma.clients.findMany({
        include: { address: true },
      });
      res.json(clients);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
  }

  /**
   * Creates a new client with address and returns the created client.
   * @param req - Express request object.
   * @param res - Express response object.
   * @returns Promise<void>
   */
  async store(req: Request, res: Response): Promise<void> {
    try {
      const { name, number, address } = req.body;
      const { postcode, house_number, street } = address;

      if (
        !name ||
        !number ||
        !address ||
        !postcode ||
        !house_number ||
        !street
      ) {
        res.status(400).json({
          message:
            'Name, number, postcode, house_number and street are required',
        });
        return;
      }

      const status = 'enable';

      const newClient = await prisma.clients.create({
        data: {
          name,
          number,
          status,
          address: { create: { postcode, house_number, street, status } },
        },
      });

      const clientRes = await prisma.clients.findUnique({
        where: { id: newClient.id },
        include: { address: true },
      });

      if (!clientRes) {
        res.status(404).json({ message: 'Client not found' });
        return;
      }

      res.json(clientRes);
    } catch (error) {
      res.status(400).json({ message: 'Bad Request' });
      return;
    }
  }

  /**
   * Fetches and returns a client by ID with their address.
   * @param req - Express request object.
   * @param res - Express response object.
   * @returns Promise<void>
   */
  async show(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid ID' });
        return;
      }

      const client = await prisma.clients.findUnique({
        where: { id },
        include: { address: true },
      });

      if (!client) {
        res.status(404).json({ error: 'Client not found' });
        return;
      }

      res.json(client);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
  }

  /**
   * Deletes a client by ID. Not implemented.
   * @param req - Express request object.
   * @param res - Express response object.
   * @returns Promise<void>
   */
  async delete(req: Request, res: Response): Promise<void> {
    try {
      res.status(500).json({ error: 'Not implemented' });
      return;
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
  }

  /**
   * Updates a client by ID and returns the updated client.
   * @param req - Express request object.
   * @param res - Express response object.
   * @returns Promise<void>
   */
  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid ID' });
        return;
      }

      const client = await prisma.clients.findUnique({
        where: { id },
      });

      if (!client) {
        res.status(404).json({ error: 'Client not found' });
        return;
      }

      const { name, number, address, status } = req.body;
      const { postcode, house_number, street } = address;

      if (
        !name ||
        !number ||
        !address ||
        !status ||
        !postcode ||
        !house_number ||
        !street
      ) {
        res.status(400).json({
          message:
            'Name, number, postcode, house_number, street and status are required',
        });
        return;
      }

      const updatedClient = await prisma.clients.update({
        where: { id },
        data: {
          name,
          number,
          status,
          address: {
            update: { postcode, house_number, street, status: address.status },
          },
        },
      });

      const clientRes = await prisma.clients.findUnique({
        where: { id: updatedClient.id },
        include: { address: true },
      });

      if (!clientRes) {
        res.status(404).json({ error: 'Client not found' });
        return;
      }

      res.json(clientRes);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
  }
}

export default new ClientsController();
