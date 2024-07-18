import prisma from '@/lib/prisma';
import { ParamsType } from '@/types/ParamsType';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: ParamsType) {
  const id = +params.id;
  const client = await prisma.client.findUnique({ where: { id } });

  return NextResponse.json(client);
}

export async function DELETE(req: Request, { params }: ParamsType) {
  const id = +params.id;

  const user = await prisma.client.delete({ where: { id } });

  return NextResponse.json(user);
}

export async function PUT(req: Request, { params }: ParamsType) {
  const id = +params.id;
  const { name } = await req.json();

  const user = await prisma.client.update({
    where: { id },
    data: { name },
  });

  return NextResponse.json(user);
}
