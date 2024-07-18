import prisma from '@/lib/prisma';
import { Client, Address } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  const client = await prisma.client.findMany();

  return NextResponse.json(client);
}

export async function POST(req: Request) {
  const data = await req.json();
  const { name, number } = data as Client;
  const address = data.address as Address;

  // const newAddress = await prisma.address.create({
  //   data: {
  //     ...address,
  //   },
  // });

  // Cria o cliente associado ao endereço criado
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
      address: true, // Inclui o endereço criado na resposta
    },
  });

  return NextResponse.json(newClient);
}
