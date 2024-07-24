import prisma from '@/lib/prisma';
import { Client, Address } from '@prisma/client';
import { NextResponse } from 'next/server';

/**
 * Handles GET requests to fetch all clients along with their associated addresses.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the list of clients and their addresses,
 * or an error message if the fetch operation fails.
 */
export async function GET(): NextResponse {
  try {
    const client = await prisma.client.findMany({ include: { address: true } });
    return NextResponse.json(client);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, number } = data as Client;
    const address = data.address as Address;

    // Basic validation
    if (!name || !number || !address || !address.postcode || !address.street || !address.house_number) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newClient = await prisma.client.create({
      data: {
        name: name,
        number: number,
        address: {
          create: {
            postcode: address.postcode,
            street: address.street,
            house_number: address.house_number,
            status: 'enable',
          },
        },
        status: 'enable',
      },
      include: {
        address: true,
      },
    });

    return NextResponse.json(newClient);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
  }
}
