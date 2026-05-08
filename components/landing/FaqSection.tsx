'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function FaqSection() {
  const t = useTranslations('FAQ');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    { q: t('q1'), a: t('a1') },
    { q: t('q2'), a: t('a2') },
    { q: t('q3'), a: t('a3') },
    { q: t('q4'), a: t('a4') },
    { q: t('q5'), a: t('a5') },
    { q: t('q6'), a: t('a6') },
    { q: t('q7'), a: t('a7') },
    { q: t('q8'), a: t('a8') },
  ];

  return (
    <section id="faq" className="py-20 bg-[#FDFBF7] relative border-b border-emerald-900/5">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-emerald-950 tracking-tight">{t('title')}</h2>
          <span className="mx-auto mt-4 block h-1 w-24 rounded-full bg-gold-400" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className="overflow-hidden rounded-2xl border border-gold-200 bg-white px-6 shadow-md"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className={`w-full flex items-center justify-between py-6 text-left transition-colors duration-200 ${isOpen ? 'text-emerald-600' : 'text-emerald-950 hover:text-emerald-700'}`}
                >
                  <span className="font-bold text-lg pr-8">{faq.q}</span>
                  <span className="text-2xl font-light leading-none">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-emerald-900/70 leading-relaxed text-base">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
