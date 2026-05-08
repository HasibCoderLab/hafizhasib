'use client';

import { FormEvent, useState } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Link, useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations('auth');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message ?? t('loginError'));
        return;
      }

      if (data.user?.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
      router.refresh();
    } catch {
      setError(t('loginError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] grid md:grid-cols-5">
      <section className="hidden md:flex md:col-span-2 bg-[#1B4332] text-white relative overflow-hidden p-10">
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <pattern id="islamic-login-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M20 0L40 20L20 40L0 20Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
              </pattern>
            </defs>
            <rect width="200" height="200" fill="url(#islamic-login-pattern)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-sm self-end space-y-4">
          <div className="w-12 h-12 rounded-full bg-gold-400 text-[#1B4332] font-bold text-xl flex items-center justify-center">H</div>
          <h1 className="text-3xl font-bold">{t('brandName')}</h1>
          <p className="text-emerald-100">{t('authSideText')}</p>
        </div>
      </section>

      <section className="md:col-span-3 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-emerald-950">{t('loginTitle')}</h2>
            <p className="text-emerald-900/60 mt-2">{t('loginSubtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-700/60" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-emerald-900/20 bg-white pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-emerald-800/20"
                placeholder={t('emailLabel')}
                required
              />
            </div>

            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-700/60" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-emerald-900/20 bg-white pl-10 pr-11 py-3 outline-none focus:ring-2 focus:ring-emerald-800/20"
                placeholder={t('passwordLabel')}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-700/60"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-gold-700 hover:text-gold-800">
                {t('forgotPassword')}
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-emerald-900 text-white font-semibold hover:bg-emerald-800 disabled:opacity-70"
            >
              {loading ? t('loggingIn') : t('loginButton')}
            </button>
          </form>

          <div className="flex items-center gap-4 text-emerald-900/40">
            <div className="h-px bg-emerald-900/20 flex-1" />
            <span className="text-sm">{t('or')}</span>
            <div className="h-px bg-emerald-900/20 flex-1" />
          </div>

          <p className="text-sm text-emerald-900/70">
            {t('noAccount')}{' '}
            <Link href="/register" className="text-emerald-900 font-semibold hover:underline">
              {t('register')}
            </Link>
          </p>
        </div>
      </section>

      {error && (
        <div className="fixed top-4 right-4 z-50 rounded-lg bg-red-600 text-white px-4 py-2 shadow-lg">
          {error}
        </div>
      )}
    </div>
  );
}
