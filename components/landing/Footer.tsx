import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-[#F0F4F0] text-emerald-950 py-20 border-t border-emerald-900/10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-12 text-center">
          <h3 className="text-3xl font-bold tracking-tight text-emerald-950">{t('quickLinks')}</h3>
          <span className="mx-auto mt-4 block h-1 w-24 rounded-full bg-gold-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1 - Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gold-400 text-emerald-950 rounded-full flex items-center justify-center font-bold text-2xl shadow-md">
                H
              </div>
              <span className="font-bold text-xl tracking-tight text-emerald-950">{t('brandName')}</span>
            </div>
            <div className="text-emerald-900/80 space-y-1 font-medium">
              <p>{t('taglineEn')}</p>
              <p>{t('taglineBn')}</p>
              <p className="font-amiri text-lg tracking-wide">{t('taglineAr')}</p>
            </div>
            <div className="flex gap-4 pt-2 text-emerald-900">
               <a href="#" className="hover:text-gold-500 transition-colors border border-emerald-900/15 p-2 rounded-full hover:bg-white shadow-sm"><Facebook className="w-5 h-5" /></a>
               <a href="#" className="hover:text-gold-500 transition-colors border border-emerald-900/15 p-2 rounded-full hover:bg-white shadow-sm"><Instagram className="w-5 h-5" /></a>
               <a href="#" className="hover:text-gold-500 transition-colors border border-emerald-900/15 p-2 rounded-full hover:bg-white shadow-sm"><Youtube className="w-5 h-5" /></a>
               <a href="#" className="hover:text-gold-500 transition-colors border border-emerald-900/15 p-2 rounded-full hover:bg-white shadow-sm"><MessageCircle className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-gold-600 mb-6 uppercase tracking-wider">{t('quickLinks')}</h4>
            <ul className="space-y-4 text-emerald-900/80 font-medium">
              <li><Link href="/" className="hover:text-gold-600 transition-colors">{t('home')}</Link></li>
              <li><Link href="#about" className="hover:text-gold-600 transition-colors">{t('about')}</Link></li>
              <li><Link href="#courses" className="hover:text-gold-600 transition-colors">{t('courses')}</Link></li>
              <li><Link href="#pricing" className="hover:text-gold-600 transition-colors">{t('pricing')}</Link></li>
              <li><Link href="/free-trial" className="hover:text-gold-600 transition-colors">{t('bookTrial')}</Link></li>
            </ul>
          </div>

          {/* Column 3 - Subjects */}
          <div>
            <h4 className="text-lg font-bold text-gold-600 mb-6 uppercase tracking-wider">{t('subjects')}</h4>
            <ul className="space-y-4 text-emerald-900/80 font-medium">
              <li><Link href="#courses" className="hover:text-gold-600 transition-colors">{t('tajweed')}</Link></li>
              <li><Link href="#courses" className="hover:text-gold-600 transition-colors">{t('hifz')}</Link></li>
              <li><Link href="#courses" className="hover:text-gold-600 transition-colors">{t('nazra')}</Link></li>
              <li><Link href="#courses" className="hover:text-gold-600 transition-colors">{t('duas')}</Link></li>
              <li><Link href="/free-trial" className="text-gold-600 hover:text-emerald-900 transition-colors">{t('freeTrial')}</Link></li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="text-lg font-bold text-gold-600 mb-6 uppercase tracking-wider">{t('contact')}</h4>
            <ul className="space-y-4 text-emerald-900/80 font-medium text-sm">
              <li className="flex gap-3">
                 <span className="text-xl">📱</span>
                 <span className="pt-1">{t('whatsappLabel')}: +880 1XXX-XXXXXX</span>
              </li>
              <li className="flex gap-3">
                 <span className="text-xl">📧</span>
                 <span className="pt-1">{t('emailLabel')}: hasib@hafizhasib.com</span>
              </li>
              <li className="flex gap-3">
                 <span className="text-xl">📍</span>
                 <span className="pt-1">{t('locationLabel')}: {t('location')}</span>
              </li>
              <li className="flex gap-3">
                 <span className="text-xl">🕐</span>
                 <span className="pt-1">{t('hoursLabel')}: {t('hours')}</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-emerald-900/10 py-6 text-emerald-900/70 text-sm font-medium">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4">
          <p>{t('rights')}</p>
          <p className="flex items-center gap-2">{t('serving')}</p>
        </div>
      </div>
    </footer>
  );
}
