import { MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function WhatsAppButton() {
  const t = useTranslations('WhatsApp');

  return (
    <a
      href="https://wa.me/+8801XXXXXXXXX"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#1ebd5b] hover:scale-110 transition-all group"
      title={t('chatTitle')}
    >
      <div className="absolute inset-0 rounded-full border-2 border-[#25D366] opacity-0 animate-ping" />
      <MessageCircle className="w-7 h-7 fill-current" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-4 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-md">
        {t('chatTitle')}
        <div className="absolute top-1/2 -right-1 w-2 h-2 bg-gray-900 transform -translate-y-1/2 rotate-45" />
      </span>
    </a>
  );
}
