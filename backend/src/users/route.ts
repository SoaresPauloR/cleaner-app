import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await prisma.users.findMany();

  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const { name, email, number, type, id_google, status } = await req.json();

  const newUser = await prisma.users.create({
    data: {
      name,
      email,
      number,
      type,
      id_google,
      status,
    },
  });

  return NextResponse.json(newUser);
}
