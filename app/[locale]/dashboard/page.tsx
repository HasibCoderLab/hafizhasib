'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Calendar, CreditCard, History, Clock } from 'lucide-react';
import { Link, useRouter } from '@/i18n/routing';

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    const init = async () => {
      try {
        const meRes = await fetch('/api/auth/me');
        if (!meRes.ok) {
          router.push('/login');
          return;
        }
        const meData = await meRes.json();
        setUser(meData.user);

        const bRes = await fetch('/api/bookings');
        if (bRes.ok) {
          const bData = await bRes.json();
          setBookings(bData.bookings || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [router]);

  const handleCancel = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Failed to cancel');
        return;
      }
      setBookings(bookings.map(b => b.id === id ? { ...b, status: 'CANCELLED' } : b));
    } catch (e) {
      alert('Network error');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return null;

  const upcoming = bookings.filter(b => b.status === 'PENDING' || b.status === 'CONFIRMED');
  const past = bookings.filter(b => b.status === 'COMPLETED');
  
  // calculate progress
  const progressBySubject = past.reduce((acc: any, b: any) => {
    acc[b.subject] = (acc[b.subject] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-cream-50 p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-emerald-900/10">
          <div>
            <h1 className="text-2xl font-bold text-emerald-950">Welcome, {user.name}</h1>
            <p className="text-emerald-900/70">Here is your Quran learning progress and schedule.</p>
          </div>
          <Link href="/" className="px-4 py-2 border border-emerald-900/20 rounded-lg text-sm text-emerald-900 hover:bg-emerald-50">
            Back to Home
          </Link>
        </div>

        <div className="flex gap-4 border-b border-emerald-900/10 pb-4 overflow-x-auto">
          <button onClick={() => setActiveTab('upcoming')} className={`px-4 py-2 font-medium rounded-lg whitespace-nowrap ${activeTab === 'upcoming' ? 'bg-emerald-900 text-white' : 'text-emerald-900 hover:bg-emerald-100'}`}>Upcoming Classes</button>
          <button onClick={() => setActiveTab('past')} className={`px-4 py-2 font-medium rounded-lg whitespace-nowrap ${activeTab === 'past' ? 'bg-emerald-900 text-white' : 'text-emerald-900 hover:bg-emerald-100'}`}>Past Classes</button>
          <button onClick={() => setActiveTab('progress')} className={`px-4 py-2 font-medium rounded-lg whitespace-nowrap ${activeTab === 'progress' ? 'bg-emerald-900 text-white' : 'text-emerald-900 hover:bg-emerald-100'}`}>My Progress</button>
          <button onClick={() => setActiveTab('payments')} className={`px-4 py-2 font-medium rounded-lg whitespace-nowrap ${activeTab === 'payments' ? 'bg-emerald-900 text-white' : 'text-emerald-900 hover:bg-emerald-100'}`}>Payments</button>
        </div>

        {activeTab === 'upcoming' && (
          <div className="space-y-4">
            {upcoming.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl text-center border border-emerald-900/10">
                <p className="text-emerald-900/70 mb-4">No upcoming classes. Book your first class!</p>
                <Link href="/free-trial" className="bg-emerald-900 text-white px-6 py-2 rounded-lg font-medium inline-block">Book a Class</Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {upcoming.map(b => {
                   const bDate = new Date(b.date);
                   const isCancelable = (bDate.getTime() - new Date().getTime()) > 24 * 60 * 60 * 1000;
                   return (
                     <div key={b.id} className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-900/10">
                       <div className="flex justify-between items-start mb-4">
                         <h3 className="font-bold text-lg text-emerald-950">{b.subject}</h3>
                         <span className={`px-2 py-1 text-xs font-semibold rounded ${b.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{b.status}</span>
                       </div>
                       <p className="text-emerald-900/80 mb-2">{bDate.toLocaleString('en', { timeZone: user.timezone || undefined })}</p>
                       <p className="text-sm text-emerald-900/60 mb-4">{b.duration} minutes</p>
                       
                       <div className="flex gap-2">
                         {b.meetLink && (
                           <a href={b.meetLink} target="_blank" rel="noreferrer" className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 text-center flex-1">
                             Join Meeting
                           </a>
                         )}
                         {isCancelable && (
                           <button onClick={() => handleCancel(b.id)} className="border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 flex-1">
                             Cancel
                           </button>
                         )}
                       </div>
                     </div>
                   );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'past' && (
          <div className="bg-white rounded-2xl shadow-sm border border-emerald-900/10 overflow-hidden">
             {past.length === 0 ? (
               <div className="p-8 text-center text-emerald-900/70">No completed classes yet</div>
             ) : (
               <table className="w-full text-left">
                 <thead className="bg-emerald-50 text-emerald-900 text-sm">
                   <tr>
                     <th className="p-4 font-semibold">Date</th>
                     <th className="p-4 font-semibold">Subject</th>
                     <th className="p-4 font-semibold">Duration</th>
                     <th className="p-4 font-semibold">Notes</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-emerald-900/10">
                   {past.map(b => (
                     <tr key={b.id}>
                       <td className="p-4 text-emerald-950">{new Date(b.date).toLocaleDateString()}</td>
                       <td className="p-4 text-emerald-950">{b.subject}</td>
                       <td className="p-4 text-emerald-950">{b.duration} min</td>
                       <td className="p-4 text-emerald-900/60">-</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             )}
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="grid md:grid-cols-2 gap-4">
            {['Tajweed', 'Hifz', 'Nazra', 'Duas'].map(subject => {
               const count = progressBySubject[subject] || 0;
               const percent = Math.min((count / 20) * 100, 100);
               return (
                 <div key={subject} className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-900/10">
                   <div className="flex justify-between items-center mb-4">
                     <h3 className="font-bold text-emerald-950">{subject}</h3>
                     <span className="text-sm font-medium text-emerald-900/70">{count} / 20 classes</span>
                   </div>
                   <div className="h-2 w-full bg-emerald-100 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${percent}%` }}></div>
                   </div>
                 </div>
               );
            })}
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="bg-white p-8 rounded-2xl text-center border border-emerald-900/10 shadow-sm">
             <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
               <CreditCard className="w-8 h-8" />
             </div>
             <h3 className="text-xl font-bold text-emerald-950 mb-2">Payments</h3>
             <p className="text-emerald-900/70">💳 Payment integration coming soon.<br/>Your booking history is saved above.</p>
          </div>
        )}

      </div>
    </div>
  );
}
