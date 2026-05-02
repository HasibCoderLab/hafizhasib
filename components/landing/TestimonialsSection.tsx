import { useTranslations } from 'next-intl';

export default function TestimonialsSection() {
  const t = useTranslations('Testimonials');

  return (
    <section id="testimonials" className="py-20 bg-[#F0F4F0] relative border-b border-emerald-900/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-emerald-950 mb-4 tracking-tight">{t('title')}</h2>
          <span className="mx-auto mb-6 block h-1 w-24 rounded-full bg-gold-400" />
          <p className="text-lg text-emerald-900/70 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow relative border-l-4 border-gold-400 flex flex-col">
            <div className="flex gap-1 mb-4 text-gold-400 text-lg">
              ★★★★★
            </div>
            <p className="italic text-emerald-900/80 mb-6 flex-1">
              {t('quote1')}
            </p>
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-emerald-900/10">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center font-bold text-emerald-700">
                {t('name1').charAt(0)}
              </div>
              <div>
                <p className="font-bold text-emerald-950 text-sm">{t('name1')}</p>
                <p className="text-xs text-emerald-900/60">{t('country1')}</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow relative border-l-4 border-gold-400 flex flex-col">
            <div className="flex gap-1 mb-4 text-gold-400 text-lg">
              ★★★★★
            </div>
            <p className="italic text-emerald-900/80 mb-6 flex-1">
              {t('quote2')}
            </p>
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-emerald-900/10">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center font-bold text-emerald-700">
                {t('name2').charAt(0)}
              </div>
              <div>
                <p className="font-bold text-emerald-950 text-sm">{t('name2')}</p>
                <p className="text-xs text-emerald-900/60">{t('country2')}</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow relative border-l-4 border-gold-400 flex flex-col">
            <div className="flex gap-1 mb-4 text-gold-400 text-lg">
              ★★★★★
            </div>
            <p className="italic text-emerald-900/80 mb-6 flex-1">
              {t('quote3')}
            </p>
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-emerald-900/10">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center font-bold text-emerald-700">
                {t('name3').charAt(0)}
              </div>
              <div>
                <p className="font-bold text-emerald-950 text-sm">{t('name3')}</p>
                <p className="text-xs text-emerald-900/60">{t('country3')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
