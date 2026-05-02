'use client';

import { useEffect, useState } from 'react';
import { Users, Calendar as CalendarIcon, CheckCircle, Clock } from 'lucide-react';
import { Link, useRouter } from '@/i18n/routing';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [availability, setAvailability] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const fetchData = async () => {
    try {
      const meRes = await fetch('/api/auth/me');
      if (!meRes.ok) {
        router.push('/login');
        return;
      }
      const meData = await meRes.json();
      if (meData.user.role !== 'ADMIN') {
        router.push('/dashboard');
        return;
      }
      setUser(meData.user);

      const [bRes, aRes] = await Promise.all([
        fetch('/api/bookings'),
        fetch('/api/availability')
      ]);

      if (bRes.ok) {
        const bData = await bRes.json();
        setBookings(bData.bookings || []);
      }
      if (aRes.ok) {
        const aData = await aRes.json();
        setAvailability(aData.slots || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [router]);

  const updateBooking = async (id: string, data: any) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setBookings(bookings.map(b => b.id === id ? { ...b, ...data } : b));
      }
    } catch (e) {
      alert('Failed to update');
    }
  };

  const toggleAvailability = async (dayOfWeek: number, startTime: string, endTime: string, currentBlocked: boolean) => {
    try {
      const res = await fetch('/api/availability', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dayOfWeek, startTime, endTime, isBlocked: !currentBlocked })
      });
      if (res.ok) {
        fetchData(); // refresh slots
      }
    } catch (e) {
      alert('Failed to update availability');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return null;

  const todayStr = new Date().toDateString();
  const todayBookings = bookings.filter(b => new Date(b.date).toDateString() === todayStr);
  const uniqueStudents = new Set(bookings.map(b => b.studentId));
  const pendingBookings = bookings.filter(b => b.status === 'PENDING');
  
  const next7Days = new Date();
  next7Days.setDate(next7Days.getDate() + 7);
  const weeklyBookings = bookings.filter(b => {
    const d = new Date(b.date);
    return d >= new Date() && d <= next7Days;
  });

  const studentsMap = new Map();
  bookings.forEach(b => {
    if (b.student) {
      if (!studentsMap.has(b.studentId)) {
        studentsMap.set(b.studentId, { ...b.student, total: 0, lastClass: b.date });
      }
      const s = studentsMap.get(b.studentId);
      s.total += 1;
      if (new Date(b.date) > new Date(s.lastClass)) s.lastClass = b.date;
    }
  });
  const studentsList = Array.from(studentsMap.values());

  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = ['08:00', '09:00', '10:00', '16:00', '17:00', '20:00', '21:00'];

  return (
    <div className="min-h-screen bg-cream-50 p-6 font-sans flex flex-col md:flex-row gap-6">
      
      <div className="w-full md:w-64 bg-emerald-950 text-white p-6 rounded-2xl flex flex-col gap-2">
        <h2 className="text-xl font-bold mb-6 text-gold-400">Admin Portal</h2>
        <button onClick={() => setActiveTab('overview')} className={`text-left px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'overview' ? 'bg-emerald-900' : 'hover:bg-emerald-900/50'}`}>Overview</button>
        <button onClick={() => setActiveTab('bookings')} className={`text-left px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'bookings' ? 'bg-emerald-900' : 'hover:bg-emerald-900/50'}`}>All Bookings</button>
        <button onClick={() => setActiveTab('availability')} className={`text-left px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'availability' ? 'bg-emerald-900' : 'hover:bg-emerald-900/50'}`}>Availability</button>
        <button onClick={() => setActiveTab('students')} className={`text-left px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'students' ? 'bg-emerald-900' : 'hover:bg-emerald-900/50'}`}>Students</button>
        <div className="mt-auto">
           <Link href="/" className="block w-full text-center py-2 text-emerald-300 hover:text-white transition-colors">Back to site</Link>
        </div>
      </div>

      <div className="flex-1 space-y-6">
        
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
             <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-sm">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-4"><CalendarIcon className="w-5 h-5"/></div>
                <p className="text-sm font-medium text-emerald-900/60 mb-1">Today's Classes</p>
                <p className="text-3xl font-bold text-emerald-950">{todayBookings.length}</p>
             </div>
             <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-sm">
                <div className="w-10 h-10 bg-gold-100 text-gold-600 rounded-lg flex items-center justify-center mb-4"><Users className="w-5 h-5"/></div>
                <p className="text-sm font-medium text-emerald-900/60 mb-1">Total Students</p>
                <p className="text-3xl font-bold text-emerald-950">{uniqueStudents.size}</p>
             </div>
             <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-sm">
                <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center mb-4"><Clock className="w-5 h-5"/></div>
                <p className="text-sm font-medium text-emerald-900/60 mb-1">Pending Requests</p>
                <p className="text-3xl font-bold text-emerald-950">{pendingBookings.length}</p>
             </div>
             <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-sm">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4"><CheckCircle className="w-5 h-5"/></div>
                <p className="text-sm font-medium text-emerald-900/60 mb-1">Classes This Week</p>
                <p className="text-3xl font-bold text-emerald-950">{weeklyBookings.length}</p>
             </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl border border-emerald-900/10 shadow-sm overflow-hidden">
             <table className="w-full text-left text-sm">
               <thead className="bg-emerald-50 text-emerald-900">
                 <tr>
                   <th className="p-4 font-semibold">Student</th>
                   <th className="p-4 font-semibold">Subject</th>
                   <th className="p-4 font-semibold">Date/Time</th>
                   <th className="p-4 font-semibold">Status</th>
                   <th className="p-4 font-semibold">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-emerald-900/10">
                 {bookings.map(b => (
                   <tr key={b.id} className="hover:bg-emerald-50/50">
                     <td className="p-4">
                       <p className="font-medium text-emerald-950">{b.student?.name || 'Unknown'}</p>
                       <p className="text-emerald-900/60 text-xs">{b.student?.email}</p>
                     </td>
                     <td className="p-4 text-emerald-950">{b.subject}</td>
                     <td className="p-4 text-emerald-950">{new Date(b.date).toLocaleString()}</td>
                     <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          b.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                          b.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>{b.status}</span>
                     </td>
                     <td className="p-4">
                       <div className="flex gap-2">
                         {b.status === 'PENDING' && (
                           <button onClick={() => updateBooking(b.id, { status: 'CONFIRMED' })} className="px-3 py-1 bg-emerald-900 text-white rounded font-medium text-xs">Confirm</button>
                         )}
                         <button onClick={() => {
                           const link = prompt('Enter Zoom/Meet link:', b.meetLink || '');
                           if (link !== null) updateBooking(b.id, { meetLink: link });
                         }} className="px-3 py-1 bg-emerald-100 text-emerald-900 rounded font-medium text-xs">Link</button>
                         {b.status !== 'CANCELLED' && (
                           <button onClick={() => updateBooking(b.id, { status: 'CANCELLED' })} className="px-3 py-1 bg-red-100 text-red-700 rounded font-medium text-xs">Cancel</button>
                         )}
                       </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        )}

        {activeTab === 'availability' && (
          <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-sm overflow-x-auto">
             <h3 className="font-bold text-emerald-950 text-lg mb-6">Weekly Schedule</h3>
             <table className="w-full text-center">
               <thead>
                 <tr>
                   <th className="p-2">Time</th>
                   {weekDays.map((d, i) => <th key={d} className="p-2 text-sm font-semibold text-emerald-900">{d}</th>)}
                 </tr>
               </thead>
               <tbody className="divide-y divide-emerald-900/10">
                 {timeSlots.map(time => (
                   <tr key={time}>
                     <td className="p-2 text-sm text-emerald-900/60 font-medium">{time}</td>
                     {weekDays.map((_, dayIdx) => {
                       // Find if there's a slot in DB. If not found, it's effectively blocked/not available
                       const slot = availability.find(s => s.dayOfWeek === dayIdx && s.startTime === time);
                       const isAvailable = slot ? !slot.isBlocked : false;
                       return (
                         <td key={dayIdx} className="p-2">
                           <button 
                             onClick={() => toggleAvailability(dayIdx, time, (parseInt(time) + 1).toString().padStart(2, '0') + ':00', !isAvailable)}
                             className={`w-full py-2 rounded text-xs font-bold transition-colors ${isAvailable ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                           >
                             {isAvailable ? 'OPEN' : 'CLOSED'}
                           </button>
                         </td>
                       );
                     })}
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="bg-white rounded-2xl border border-emerald-900/10 shadow-sm overflow-hidden">
             <table className="w-full text-left text-sm">
               <thead className="bg-emerald-50 text-emerald-900">
                 <tr>
                   <th className="p-4 font-semibold">Name</th>
                   <th className="p-4 font-semibold">Email</th>
                   <th className="p-4 font-semibold">Country</th>
                   <th className="p-4 font-semibold">Total Bookings</th>
                   <th className="p-4 font-semibold">Last Class</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-emerald-900/10">
                 {studentsList.map((s, i) => (
                   <tr key={i} className="hover:bg-emerald-50/50">
                     <td className="p-4 font-medium text-emerald-950">{s.name}</td>
                     <td className="p-4 text-emerald-900/70">{s.email}</td>
                     <td className="p-4 text-emerald-900/70">{s.country || '-'}</td>
                     <td className="p-4 text-emerald-950 font-bold">{s.total}</td>
                     <td className="p-4 text-emerald-900/70">{new Date(s.lastClass).toLocaleDateString()}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        )}

      </div>
    </div>
  );
}
