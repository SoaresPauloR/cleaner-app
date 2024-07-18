import prisma from '@/lib/prisma';
import { Client, Address } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  const client = await prisma.client.findMany({ include: { address: true } });

  return NextResponse.json(client);
}

export async function POST(req: Request) {
  const data = await req.json();
  const { name, number } = data as Client;
  const address = data.address as Address;

  const newClient = await prisma.client.create({
    data: {
      name: name,
      number: number,
      address: {
        create: {
          postcode: address.postcode,
          street: address.street,
          house_number: address.house_number,
        },
      },
    },
    include: {
      address: true,
    },
  });

  return NextResponse.json(newClient);
}
