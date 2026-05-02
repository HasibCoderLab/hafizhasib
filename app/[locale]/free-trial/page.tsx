import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import FreeTrialForm from '@/components/booking/FreeTrialForm';

export default async function FreeTrialPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations('Navigation');
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream-50 p-6">
      <Link href="/" className="absolute top-8 left-8 text-emerald-900 font-medium hover:underline">
        &larr; Back to Home
      </Link>
      
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-emerald-900/10">
        <h1 className="text-3xl font-bold text-emerald-950 mb-2">Book Free Trial</h1>
        <p className="text-emerald-900/70 mb-8">Schedule a 30-minute free trial session with Hafiz Hasib Hasan.</p>
        
        <FreeTrialForm />
      </div>
    </div>
  );
}
