import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    if (payload.role === 'ADMIN') {
      const bookings = await prisma.booking.findMany({
        orderBy: { date: 'desc' },
        include: {
          student: {
            select: { name: true, email: true, country: true }
          }
        }
      });
      return NextResponse.json({ bookings });
    } else {
      const bookings = await prisma.booking.findMany({
        where: { studentId: payload.userId },
        orderBy: { date: 'desc' }
      });
      return NextResponse.json({ bookings });
    }
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || payload.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { date, duration, subject, timezone } = body;

    const requestedDate = new Date(date);

    // Check if slot already booked
    const existing = await prisma.booking.findFirst({
      where: {
        date: requestedDate,
        status: { not: 'CANCELLED' }
      }
    });

    if (existing) {
      return NextResponse.json({ error: 'Slot already booked' }, { status: 409 });
    }

    const booking = await prisma.booking.create({
      data: {
        studentId: payload.userId,
        date: requestedDate,
        duration: Number(duration),
        subject,
        status: 'PENDING',
        paymentStatus: 'PENDING'
      }
    });

    return NextResponse.json({ booking });
  } catch (error) {
    console.error('Failed to create booking:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
