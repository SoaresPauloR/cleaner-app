import prisma from '@/lib/prisma';
import { ParamsType } from '@/types/ParamsType';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: ParamsType) {
  const id = +params.id;
  const events = await prisma.events.findUnique({
    where: { id },
    include: { cleaner: true, client: true },
  });

  return NextResponse.json(events);
}

export async function DELETE(req: Request, { params }: ParamsType) {
  return NextResponse.json({ events: 'Not implemented' });
}

export async function PUT(req: Request, { params }: ParamsType) {
  return NextResponse.json({ events: 'Not implemented' });
}
