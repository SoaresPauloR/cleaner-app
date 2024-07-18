import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ cleaners: 'Paulo' });
}

export async function POST(request: Request) {
  const { name, route } = await request.json();
  return NextResponse.json({ message: 'Cleaner added', name, route });
}
