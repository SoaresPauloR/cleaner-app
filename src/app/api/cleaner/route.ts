import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const cleaners = await prisma.users.findMany({ where: { type: 'Cleaner' } });

  return NextResponse.json(cleaners);
}

export async function POST(req: Request) {
  // const { name, email, number, type, id_google } = await req.json();
  // const newUser = await prisma.users.create({
  //   data: {
  //     name,
  //     email,
  //     number,
  //     type,
  //     id_google,
  //   },
  // });
  // return NextResponse.json(newUser);
}
