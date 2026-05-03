import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    return NextResponse.json({
      users: await prisma.user.count(),
      bookings: await prisma.booking.count(),
      availabilities: await prisma.availability.count(),
      progresses: await prisma.progress.count(),
      reviews: await prisma.review.count(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
