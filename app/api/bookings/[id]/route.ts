import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
    const { status, meetLink } = body;

    const data: any = {};
    if (status !== undefined) data.status = status;
    if (meetLink !== undefined) data.meetLink = meetLink;

    const booking = await prisma.booking.update({
      where: { id },
      data
    });

    return NextResponse.json({ booking });
  } catch (error) {
    console.error('Failed to update booking:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id }
    });

    if (!booking) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    if (payload.role === 'STUDENT') {
      if (booking.studentId !== payload.userId) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }

      const now = new Date();
      const bookingDate = new Date(booking.date);
      const hoursDiff = (bookingDate.getTime() - now.getTime()) / (1000 * 60 * 60);

      if (hoursDiff < 24) {
        return NextResponse.json({ error: 'Cannot cancel less than 24 hours before' }, { status: 400 });
      }
    }

    await prisma.booking.update({
      where: { id },
      data: { status: 'CANCELLED' }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to cancel booking:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
