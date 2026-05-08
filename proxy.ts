import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { verifyToken } from '@/lib/auth';

const intlProxy = createMiddleware(routing);

function getLocaleFromPath(pathname: string) {
  const maybeLocale = pathname.split('/')[1];
  return routing.locales.includes(maybeLocale as (typeof routing.locales)[number])
    ? maybeLocale
    : routing.defaultLocale;
}

function getPathWithoutLocale(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && routing.locales.includes(segments[0] as (typeof routing.locales)[number])) {
    return `/${segments.slice(1).join('/')}`;
  }
  return pathname;
}

export default function proxy(request: NextRequest) {
  const locale = getLocaleFromPath(request.nextUrl.pathname);
  const pathname = getPathWithoutLocale(request.nextUrl.pathname);
  const token = request.cookies.get('auth-token')?.value;
  const payload = token ? verifyToken(token) : null;

  if (pathname.startsWith('/dashboard')) {
    if (!payload || payload.role !== 'STUDENT') {
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  if (pathname.startsWith('/admin')) {
    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  return intlProxy(request);
}

export const config = {
  matcher: ['/', '/(en|ar|bn)/:path*', '/dashboard/:path*', '/admin/:path*']
};
