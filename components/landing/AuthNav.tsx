'use client';

import { useEffect, useState } from 'react';
import { Link, useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'STUDENT';
};

export default function AuthNav() {
  const router = useRouter();
  const t = useTranslations('auth');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadMe = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (!res.ok) {
          if (isMounted) setUser(null);
          return;
        }
        const data = await res.json();
        if (isMounted) setUser(data.user ?? null);
      } catch {
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadMe();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    setUser(null);
    router.refresh();
  };

  if (loading) {
    return (
      <div className="text-sm text-emerald-900/50">
        ...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/login" className="px-4 py-2 rounded-full border border-emerald-900/20 text-emerald-900 text-sm hover:bg-emerald-50">
          {t('signIn')}
        </Link>
        <Link href="/register" className="px-4 py-2 rounded-full bg-emerald-900 text-white text-sm hover:bg-emerald-800">
          {t('register')}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-emerald-900/80">{t('helloUser', {name: user.name})}</span>
      <button
        type="button"
        onClick={handleLogout}
        className="px-4 py-2 rounded-full border border-emerald-900/20 text-emerald-900 text-sm hover:bg-emerald-50"
      >
        {t('logout')}
      </button>
    </div>
  );
}
