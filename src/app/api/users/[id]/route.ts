import prisma from '@/lib/prisma';
import { ParamsType } from '@/types/ParamsType';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: ParamsType) {
  const id = +params.id;
  const users = await prisma.users.findUnique({ where: { id } });

  return NextResponse.json(users);
}

export async function DELETE(req: Request, { params }: ParamsType) {
  const id = +params.id;

  const user = await prisma.users.delete({ where: { id } });

  return NextResponse.json(user);
}

export async function PUT(req: Request, { params }: ParamsType) {
  const id = +params.id;
  const { name, email, number, type, id_google } = await req.json();

  const user = await prisma.users.update({
    where: { id },
    data: { name, email, number, type, id_google },
  });

  return NextResponse.json(user);
}
