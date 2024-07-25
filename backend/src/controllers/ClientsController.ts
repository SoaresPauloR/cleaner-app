import prisma from '../lib/prisma';
import { Request, Response } from 'express';

class ClientsController {
  async index(req: Request, res: Response): Promise<void> {
    try {
      const clients = await prisma.clients.findMany({
        include: { address: true },
      });

      res.json(clients);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { name, number, address } = req.body;
      const { postcode, house_number, street } = address;

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

      res.json(clientRes);
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

      const clients = await prisma.clients.findUnique({
        where: { id },
        include: { address: true },
      });

      if (!clients) {
        return res.status(404).json({ error: 'Client not found' });
      }

      res.json(clients);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      return res.status(500).json({ error: 'Not implemented' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        return res.status(404).json({ error: 'ID not found' });
      }

      const clients = await prisma.clients.findUnique({
        where: { id: parseInt(req.params.id) },
      });

      if (!clients) {
        return res.status(404).json({ error: 'Client not found' });
      }

      const { name, number, address, status } = req.body;
      const { postcode, house_number, street } = address;

      const newClient = await prisma.clients.update({
        where: { id: clients.id },
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
        where: { id: newClient.id },
        include: { address: true },
      });

      res.json(clientRes);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new ClientsController();
