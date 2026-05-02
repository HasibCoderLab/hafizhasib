import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, country, timezone, subject, preferredTime } = body ?? {};

    if (!name || !email || !subject || !preferredTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email: String(email).toLowerCase() }
    });

    if (!user) {
      // Create guest user
      const randomPassword = await hashPassword(Math.random().toString(36).slice(-10));
      user = await prisma.user.create({
        data: {
          name,
          email: String(email).toLowerCase(),
          password: randomPassword,
          role: 'STUDENT',
          country: country || null,
          timezone: timezone || null,
        }
      });
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        studentId: user.id,
        date: new Date(preferredTime),
        duration: 60,
        subject,
        status: 'PENDING',
        paymentStatus: 'PENDING',
      }
    });

    return NextResponse.json({ success: true, bookingId: booking.id });
  } catch (error) {
    console.error('Free trial booking error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
