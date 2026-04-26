import type { Metadata } from 'next';
import { Inter, Amiri, Hind_Siliguri } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import AuthNav from '@/components/landing/AuthNav';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const amiri = Amiri({ subsets: ['arabic'], weight: ['400', '700'], variable: '--font-amiri' });
const hindSiliguri = Hind_Siliguri({ subsets: ['bengali'], weight: ['400', '500', '600', '700'], variable: '--font-hind' });

export const metadata: Metadata = {
  title: 'Hafiz Hasib Hasan | Online Quran Teacher',
  description: 'Learn Quran Online — Tajweed, Hifz, Nazra & Dua with Hafiz Hasib Hasan.',
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  // Direction is right-to-left for Arabic
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${amiri.variable} ${hindSiliguri.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased text-foreground">
        <NextIntlClientProvider messages={messages}>
          <div className="sticky top-0 z-[60] w-full border-b border-emerald-900/10 bg-white/90 backdrop-blur-sm">
            <div className="container mx-auto px-6 py-3 flex justify-end">
              <AuthNav />
            </div>
          </div>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
