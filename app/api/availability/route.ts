import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const slots = await prisma.availability.findMany({
      where: { isBlocked: false },
      orderBy: [
        { dayOfWeek: 'asc' },
        { startTime: 'asc' }
      ]
    });
    return NextResponse.json({ slots });
  } catch (error) {
    console.error('Failed to fetch availability:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { dayOfWeek, startTime, endTime, isBlocked } = body;

    // Check if slot exists
    let slot = await prisma.availability.findFirst({
      where: {
        dayOfWeek: Number(dayOfWeek),
        startTime,
        endTime
      }
    });

    if (slot) {
      slot = await prisma.availability.update({
        where: { id: slot.id },
        data: { isBlocked }
      });
    } else {
      slot = await prisma.availability.create({
        data: {
          dayOfWeek: Number(dayOfWeek),
          startTime,
          endTime,
          isBlocked
        }
      });
    }

    return NextResponse.json({ slot });
  } catch (error) {
    console.error('Failed to update availability:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
