import prisma from '@/lib/prisma';
import { ParamsType } from '@/types/ParamsType';
import { Client } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: ParamsType) {
  const id = +params.id;
  const client = await prisma.client.findUnique({
    where: { id },
    include: { address: true },
  });

  return NextResponse.json(client);
}

export async function DELETE(req: Request, { params }: ParamsType) {
  const id = +params.id;
  const client = await prisma.client.findUnique({
    where: { id },
    include: { address: true },
  });

  return NextResponse.json({ client: 'Not implemented' });
}

export async function PUT(req: Request, { params }: ParamsType) {
  // const id = +params.id;
  // const data = (await req.json()) as Client;

  // const client = await prisma.client.update({
  //   where: { id },
  //   data: { ...data },
  // });

  return NextResponse.json({ client: 'Not implemented' });
}
