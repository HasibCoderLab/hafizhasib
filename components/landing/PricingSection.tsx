'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Check } from 'lucide-react';

export default function PricingSection() {
  const t = useTranslations('Pricing');
  const [isBD, setIsBD] = useState(false);

  useEffect(() => {
    // Auto detect if user is in BD
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setIsBD(tz.includes('Dhaka'));
  }, []);

  const bdtPrices = { starter: '৳1,200', popular: '৳2,200', intensive: '৳3,000' };
  const usdPrices = { starter: '$20', popular: '$36', intensive: '$48' };

  const prices = isBD ? bdtPrices : usdPrices;

  return (
    <section id="pricing" className="py-20 bg-[#FDFBF7] relative border-y border-emerald-900/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-emerald-950 mb-4 tracking-tight">{t('title')}</h2>
          <span className="mx-auto mb-6 block h-1 w-24 rounded-full bg-gold-400" />
          <p className="text-lg text-emerald-900/70 max-w-2xl mx-auto mb-8">
            {t('subtitle')}
          </p>

          <div className="inline-flex bg-emerald-50 p-1 rounded-full border border-emerald-900/10">
            <button
              onClick={() => setIsBD(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                isBD ? 'bg-white shadow-sm text-emerald-900 border border-emerald-900/10' : 'text-emerald-800/60 hover:text-emerald-900'
              }`}
            >
              {t('bdToggle')}
            </button>
            <button
              onClick={() => setIsBD(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                !isBD ? 'bg-white shadow-sm text-emerald-900 border border-emerald-900/10' : 'text-emerald-800/60 hover:text-emerald-900'
              }`}
            >
              {t('intlToggle')}
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Starter */}
          <div className="bg-white rounded-3xl p-8 border border-gold-400 border-opacity-30 flex flex-col shadow-md hover:shadow-xl transition-shadow relative">
            <h3 className="text-xl font-bold text-emerald-950 mb-4">{t('starterName')}</h3>
            <p className="text-emerald-900/70 text-sm mb-6">{t('starterClasses')}</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-emerald-950">{prices.starter}</span>
              <span className="text-sm font-medium text-emerald-900/60 ml-2">/ {t('perMonth')}</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0" /><span className="text-emerald-900/80 text-sm">{t('benefit1')}</span></li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0" /><span className="text-emerald-900/80 text-sm">{t('benefit2')}</span></li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0" /><span className="text-emerald-900/80 text-sm">{t('benefit3')}</span></li>
            </ul>
            <Link href="/free-trial" className="block w-full py-3 px-4 bg-emerald-50 text-emerald-900 border border-emerald-200 text-center font-semibold rounded-xl hover:bg-emerald-900 hover:text-white hover:border-emerald-900 transition-colors">
              {t('getStarted')}
            </Link>
          </div>

          {/* Popular */}
          <div className="bg-white rounded-3xl p-8 border-2 border-gold-400 shadow-2xl flex flex-col relative transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold-400 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md whitespace-nowrap">
              {t('mostPopular')}
            </div>
            <h3 className="text-xl font-bold text-emerald-950 mb-4">{t('popularName')}</h3>
            <p className="text-emerald-900/70 text-sm mb-6">{t('popularClasses')}</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-emerald-950">{prices.popular}</span>
              <span className="text-sm font-medium text-emerald-900/60 ml-2">/ {t('perMonth')}</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0" /><span className="text-emerald-900/80 text-sm">{t('benefit1')}</span></li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0" /><span className="text-emerald-900/80 text-sm">{t('benefit2')}</span></li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0" /><span className="text-emerald-900/80 text-sm">{t('benefit3')}</span></li>
            </ul>
            <Link href="/free-trial" className="block w-full py-3 px-4 bg-emerald-900 text-white text-center font-semibold rounded-xl hover:bg-emerald-800 transition-colors shadow-md">
              {t('getStarted')}
            </Link>
          </div>

          {/* Intensive */}
          <div className="bg-white rounded-3xl p-8 border border-gold-400 border-opacity-30 flex flex-col shadow-md hover:shadow-xl transition-shadow relative">
            <h3 className="text-xl font-bold text-emerald-950 mb-4">{t('intensiveName')}</h3>
            <p className="text-emerald-900/70 text-sm mb-6">{t('intensiveClasses')}</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-emerald-950">{prices.intensive}</span>
              <span className="text-sm font-medium text-emerald-900/60 ml-2">/ {t('perMonth')}</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0" /><span className="text-emerald-900/80 text-sm">{t('benefit1')}</span></li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0" /><span className="text-emerald-900/80 text-sm">{t('benefit2')}</span></li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0" /><span className="text-emerald-900/80 text-sm">{t('benefit3')}</span></li>
            </ul>
            <Link href="/free-trial" className="block w-full py-3 px-4 bg-emerald-50 text-emerald-900 border border-emerald-200 text-center font-semibold rounded-xl hover:bg-emerald-900 hover:text-white hover:border-emerald-900 transition-colors">
              {t('getStarted')}
            </Link>
          </div>
        </div>

        <div className="mt-20 text-center bg-cream-50 rounded-3xl p-8 md:p-12 border border-gold-200">
          <p className="text-xl md:text-2xl font-bold text-emerald-950 mb-6">{t('tryFree')}</p>
          <Link href="/free-trial" className="inline-block px-8 py-4 bg-gold-400 hover:bg-gold-500 text-white font-bold rounded-full transition-all shadow-lg shadow-gold-400/30">
            {t('bookFreeTrial')}
          </Link>
        </div>
      </div>
    </section>
  );
}
