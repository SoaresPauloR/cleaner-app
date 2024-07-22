import prisma from '@/lib/prisma';
import { Events } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  const events = await prisma.events.findMany({
    include: { cleaner: true, client: true },
  });

  return NextResponse.json(events);
}

export async function POST(req: Request) {
  const {
    id_client,
    id_cleaner,
    more_cleaner,
    date_start,
    date_finish,
    more,
    value,
    value_type,
    pay_method,
  } = (await req.json()) as Events;

  const newEvents = await prisma.events.create({
    data: {
      id_client,
      id_cleaner,
      more_cleaner,
      date_start,
      date_finish,
      more,
      value,
      value_type,
      pay_method,
      status: 'enable',
    },
  });

  const events = await prisma.events.findUnique({
    where: { id: newEvents.id },
    include: { cleaner: true, client: true },
  });

  return NextResponse.json(events);
}
