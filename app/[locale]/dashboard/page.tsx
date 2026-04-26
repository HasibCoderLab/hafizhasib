import { BookOpen, Calendar, CreditCard, History, Clock } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-cream-50 p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-emerald-900/10">
          <div>
            <h1 className="text-2xl font-bold text-emerald-950">Welcome, Student</h1>
            <p className="text-emerald-900/70">Here is your Quran learning progress and schedule.</p>
          </div>
          <Link href="/" className="px-4 py-2 border border-emerald-900/20 rounded-lg text-sm text-emerald-900 hover:bg-emerald-50">
            Back to Home
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-900/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                 <h2 className="text-lg font-semibold text-emerald-950">Next Class</h2>
                 <p className="text-sm text-emerald-900/60">Starts in 2 hours</p>
              </div>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
              <p className="font-medium text-emerald-900">Tajweed Fundamentals</p>
              <p className="text-sm text-emerald-800">Monday, 3:00 PM (GMT+6)</p>
            </div>
            <button className="w-full mt-4 bg-emerald-900 text-white py-2 rounded-lg font-medium hover:bg-emerald-800 transition-colors">
              Join Current Zoom Meeting
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-900/10 md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-emerald-950 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                Your Progress Tracker
              </h2>
            </div>
            <div className="space-y-4">
               <div className="p-4 border border-emerald-900/10 rounded-xl flex justify-between items-center">
                 <div>
                    <h3 className="font-medium text-emerald-900">Surah Al-Mulk Memorization</h3>
                    <p className="text-sm text-emerald-900/60">Verses 1-15 Completed</p>
                 </div>
                 <span className="bg-gold-100 text-gold-700 px-3 py-1 rounded-full text-xs font-semibold">Active</span>
               </div>
               
               <div className="p-4 border border-emerald-900/10 rounded-xl flex justify-between items-center">
                 <div>
                    <h3 className="font-medium text-emerald-900">Teacher Notes</h3>
                    <p className="text-sm text-emerald-900/60 mt-1">"Focus on the pronunciation of 'Ghain' during the next session. Excellent progress otherwise!"</p>
                 </div>
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
