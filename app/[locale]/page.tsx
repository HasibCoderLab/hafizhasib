import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Calendar, Globe2, Star, BookOpen, Clock, CheckCircle } from 'lucide-react';
import BookingCalendar from '@/components/booking/BookingCalendar';
import PricingSection from '@/components/landing/PricingSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import FaqSection from '@/components/landing/FaqSection';
import Footer from '@/components/landing/Footer';
import WhatsAppButton from '@/components/landing/WhatsAppButton';
import IslamicPattern from '@/components/ui/IslamicPattern';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('Hero');
  const tNav = await getTranslations('Navigation');
  const tLanding = await getTranslations('Landing');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Placeholder */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-emerald-900/10 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          {/* Logo Placeholder */}
          <div className="w-10 h-10 bg-emerald-900 text-gold-400 rounded-full flex items-center justify-center font-bold text-xl">{tLanding('logoLetter')}</div>
          <span className="font-bold text-emerald-900 text-xl tracking-tight hidden sm:block">{tNav('brandName')}</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-emerald-950/70">
          <Link href="/" className="hover:text-emerald-900">{tNav('home')}</Link>
          <Link href="#about" className="hover:text-emerald-900">{tNav('about')}</Link>
          <Link href="#courses" className="hover:text-emerald-900">{tNav('courses')}</Link>
          <Link href="#pricing" className="hover:text-emerald-900">{tNav('pricing')}</Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* Language Toggle Placeholder */}
          <div className="flex gap-2 text-sm font-medium border border-emerald-900/20 rounded-full px-3 py-1.5">
            <Link href="/" locale="en" className={locale === 'en' ? 'text-emerald-900' : 'text-emerald-900/50'}>{tNav('localeEn')}</Link>
            <span className="text-emerald-900/30">|</span>
            <Link href="/" locale="bn" className={locale === 'bn' ? 'text-emerald-900' : 'text-emerald-900/50'}>{tNav('localeBn')}</Link>
            <span className="text-emerald-900/30">|</span>
            <Link href="/" locale="ar" className={locale === 'ar' ? 'text-emerald-900 font-amiri' : 'text-emerald-900/50 font-amiri'}>{tNav('localeAr')}</Link>
          </div>
          
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden flex-1 flex flex-col justify-center bg-[#FDFBF7]">
        <IslamicPattern />
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-8 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-900 text-sm font-medium border border-emerald-100 shadow-sm animate-fade-in-up">
              <Globe2 className="w-4 h-4 text-emerald-600" />
              <span>{t('teachingBadge')}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-[#1B4332] tracking-tight leading-tight">
              {locale === 'ar' ? (
                <span className="font-amiri font-normal leading-normal">{t('name')}</span>
              ) : (
                t('name')
              )}
            </h1>
            
            <p className="text-xl text-[#1B4332] max-w-2xl mx-auto md:mx-0">
              {t('subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <Link 
                href="/free-trial" 
                className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg shadow-gold-500/20 flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                {t('bookTrial')}
              </Link>
              <Link 
                href="#schedule" 
                className="bg-white text-emerald-900 hover:bg-emerald-50 border border-emerald-900/20 px-8 py-4 rounded-full font-medium transition-all flex items-center justify-center gap-2"
              >
                <Clock className="w-5 h-5" />
                {t('viewSchedule')}
              </Link>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-lg relative">
            {/* Image Placeholder */}
            <div className="aspect-square rounded-3xl bg-emerald-100 border-8 border-white shadow-2xl relative overflow-hidden">
               {/* Just a symbolic icon or placeholder until a real photo is uploaded */}
               <div className="absolute inset-0 flex items-center justify-center text-emerald-200">
                 <BookOpen className="w-48 h-48 opacity-20" />
               </div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4">
              <div className="w-12 h-12 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-950">{tLanding('statCountries')}</p>
                <p className="text-xs text-emerald-900/60 font-medium">{tLanding('countriesLabel')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-[#F0F4F0] relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-emerald-950 tracking-tight">{tLanding('aboutTitle')}</h2>
              <p className="text-lg text-emerald-900/70 leading-relaxed">
                {tLanding('aboutDescription')}
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                  <p className="text-3xl font-bold text-emerald-900 mb-1">{tLanding('yearsValue')}</p>
                  <p className="text-sm font-medium text-emerald-800">{tLanding('yearsLabel')}</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                  <p className="text-3xl font-bold text-emerald-900 mb-1">{tLanding('studentsValue')}</p>
                  <p className="text-sm font-medium text-emerald-800">{tLanding('studentsLabel')}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100/50 text-emerald-800 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> {tLanding('tagOnline')}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100/50 text-emerald-800 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> {tLanding('tagFlexible')}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100/50 text-emerald-800 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> {tLanding('tagLevels')}
                </span>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl bg-emerald-900/5 border border-emerald-900/10 overflow-hidden relative">
                {/* Photo Placeholder */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-emerald-900/40">
                   <BookOpen className="w-24 h-24 mb-4 opacity-50" />
                   <p className="font-medium">{tLanding('teacherPortrait')}</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gold-400 p-8 rounded-3xl shadow-xl max-w-xs text-white">
                <p className="font-semibold text-lg leading-snug">"{tLanding('teacherQuote')}"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-24 bg-[#FDFBF7] relative border-y border-emerald-900/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emerald-950 mb-4 tracking-tight">{tLanding('coursesTitle')}</h2>
            <p className="text-lg text-emerald-900/70 max-w-2xl mx-auto">
              {tLanding('coursesSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Course 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-200 relative overflow-hidden group hover:shadow-md transition-all">
               <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-6">
                 <BookOpen className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold text-emerald-950 mb-2">{tLanding('course1Title')}</h3>
               <p className="text-sm text-emerald-900/70 mb-6">{tLanding('course1Desc')}</p>
               <div className="space-y-2 mb-8">
                 <p className="text-xs font-semibold text-emerald-900 uppercase tracking-wider">{tLanding('course1Level')}</p>
                 <p className="text-lg font-bold text-emerald-700">{tLanding('pricePerHour')}</p>
               </div>
               <Link href="/free-trial" className="block w-full py-2.5 px-4 bg-emerald-50 text-emerald-900 text-center font-medium rounded-xl group-hover:bg-emerald-900 group-hover:text-white transition-colors">
                 {tLanding('bookNow')}
               </Link>
            </div>

            {/* Course 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-200 relative overflow-hidden group hover:shadow-md transition-all">
               <div className="w-12 h-12 bg-gold-100 text-gold-700 rounded-2xl flex items-center justify-center mb-6">
                 <Star className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold text-emerald-950 mb-2">{tLanding('course2Title')}</h3>
               <p className="text-sm text-emerald-900/70 mb-6">{tLanding('course2Desc')}</p>
               <div className="space-y-2 mb-8">
                 <p className="text-xs font-semibold text-emerald-900 uppercase tracking-wider">{tLanding('course2Level')}</p>
                 <p className="text-lg font-bold text-emerald-700">{tLanding('pricePerHour')}</p>
               </div>
               <Link href="/free-trial" className="block w-full py-2.5 px-4 bg-emerald-50 text-emerald-900 text-center font-medium rounded-xl group-hover:bg-emerald-900 group-hover:text-white transition-colors">
                 {tLanding('bookNow')}
               </Link>
            </div>

            {/* Course 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-200 relative overflow-hidden group hover:shadow-md transition-all">
               <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-6">
                 <BookOpen className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold text-emerald-950 mb-2">{tLanding('course3Title')}</h3>
               <p className="text-sm text-emerald-900/70 mb-6">{tLanding('course3Desc')}</p>
               <div className="space-y-2 mb-8">
                 <p className="text-xs font-semibold text-emerald-900 uppercase tracking-wider">{tLanding('course3Level')}</p>
                 <p className="text-lg font-bold text-emerald-700">{tLanding('pricePerHour')}</p>
               </div>
               <Link href="/free-trial" className="block w-full py-2.5 px-4 bg-emerald-50 text-emerald-900 text-center font-medium rounded-xl group-hover:bg-emerald-900 group-hover:text-white transition-colors">
                 {tLanding('bookNow')}
               </Link>
            </div>

            {/* Course 4 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-200 relative overflow-hidden group hover:shadow-md transition-all">
               <div className="w-12 h-12 bg-gold-100 text-gold-700 rounded-2xl flex items-center justify-center mb-6">
                 <Star className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold text-emerald-950 mb-2">{tLanding('course4Title')}</h3>
               <p className="text-sm text-emerald-900/70 mb-6">{tLanding('course4Desc')}</p>
               <div className="space-y-2 mb-8">
                 <p className="text-xs font-semibold text-emerald-900 uppercase tracking-wider">{tLanding('course4Level')}</p>
                 <p className="text-lg font-bold text-emerald-700">{tLanding('pricePerHour')}</p>
               </div>
               <Link href="/free-trial" className="block w-full py-2.5 px-4 bg-emerald-50 text-emerald-900 text-center font-medium rounded-xl group-hover:bg-emerald-900 group-hover:text-white transition-colors">
                 {tLanding('bookNow')}
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule / Booking Section */}
      <section id="schedule" className="py-24 bg-[#F0F4F0] relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emerald-950 mb-4 tracking-tight">{tLanding('scheduleTitle')}</h2>
            <p className="text-lg text-emerald-900/70 max-w-2xl mx-auto text-balance">
              {tLanding('scheduleSubtitle')}
            </p>
          </div>
          
          <BookingCalendar />
        </div>
      </section>

      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
