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
    date,
    how_long,
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
      date,
      how_long,
      more,
      value,
      value_type,
      pay_method,
    },
  });

  return NextResponse.json(newEvents);
}
