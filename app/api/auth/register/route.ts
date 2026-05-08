import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { generateToken, hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, country, timezone } = body ?? {};

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({
      where: { email: String(email).toLowerCase() }
    });

    if (existing) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email: String(email).toLowerCase(),
        password: hashedPassword,
        country,
        timezone,
        role: 'STUDENT'
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });

    const token = generateToken(user.id, user.role);
    const response = NextResponse.json({ user, message: 'Success' });

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    });

    return response;
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
