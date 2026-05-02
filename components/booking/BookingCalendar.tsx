'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer, Views, View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, addDays, startOfDay, addWeeks } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useRouter } from '@/i18n/routing';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function BookingCalendar() {
  const [view, setView] = useState<View>(Views.WEEK);
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState<any[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const fetchAvailability = async () => {
    try {
      const res = await fetch('/api/availability');
      const data = await res.json();
      if (data.slots) {
        // Generate next 4 weeks
        const generatedEvents = [];
        const today = startOfDay(new Date());
        
        for (let week = 0; week < 4; week++) {
          const currentWeekStart = addWeeks(startOfWeek(today), week);
          
          for (const slot of data.slots) {
            const slotDate = addDays(currentWeekStart, slot.dayOfWeek);
            if (slotDate < today) continue; // skip past dates
            
            const [startH, startM] = slot.startTime.split(':').map(Number);
            const [endH, endM] = slot.endTime.split(':').map(Number);
            
            const start = new Date(slotDate);
            start.setHours(startH, startM, 0, 0);
            
            const end = new Date(slotDate);
            end.setHours(endH, endM, 0, 0);
            
            generatedEvents.push({
              title: 'Available',
              start,
              end,
            });
          }
        }
        setEvents(generatedEvents);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  const handleSelectEvent = async (event: any) => {
    // Check if logged in
    const meRes = await fetch('/api/auth/me');
    if (!meRes.ok) {
      router.push('/login');
      return;
    }
    setSelectedSlot(event);
    setBookingStatus('idle');
  };

  const handleBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBookingStatus('loading');
    const formData = new FormData(e.currentTarget);
    const data = {
      date: selectedSlot.start,
      duration: Number(formData.get('duration')),
      subject: formData.get('subject'),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 409) {
          setErrorMsg('Slot already taken');
        } else {
          setErrorMsg('Failed to book class');
        }
        setBookingStatus('error');
        return;
      }

      setBookingStatus('success');
      // remove slot from events locally
      setEvents(events.filter(ev => ev !== selectedSlot));
      setTimeout(() => setSelectedSlot(null), 2000);
    } catch (e) {
      setErrorMsg('Network error');
      setBookingStatus('error');
    }
  };

  return (
    <>
      <div className="h-[600px] w-full bg-white p-6 rounded-2xl shadow-sm border border-emerald-900/10">
        {loading ? (
           <div className="h-full flex items-center justify-center text-emerald-900/50">Loading slots...</div>
        ) : (
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            view={view}
            onView={setView}
            date={date}
            onNavigate={setDate}
            onSelectEvent={handleSelectEvent}
            defaultView={Views.WEEK}
            views={[Views.WEEK, Views.DAY]}
            min={new Date(0, 0, 0, 8, 0, 0)}
            max={new Date(0, 0, 0, 22, 0, 0)}
            components={{
              event: (props) => (
                <div className="bg-[#1B4332] text-white h-full w-full rounded-md p-1 text-xs font-medium border border-emerald-700 shadow-sm transition-all hover:bg-emerald-700">
                  {props.title}
                </div>
              ),
            }}
            formats={{
              timeGutterFormat: (date: Date, culture?: string, local?: any) =>
                local.format(date, 'h a', culture),
            }}
          />
        )}
      </div>

      {selectedSlot && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-emerald-950 mb-4">Book Class</h3>
            
            {bookingStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 text-3xl">✓</div>
                <p className="font-bold text-emerald-900">Booking Confirmed!</p>
              </div>
            ) : (
              <form onSubmit={handleBook} className="space-y-4">
                <p className="text-sm text-emerald-900/70 font-medium">
                  {format(selectedSlot.start, 'EEEE, MMMM d, yyyy')} at {format(selectedSlot.start, 'h:mm a')}
                </p>

                {bookingStatus === 'error' && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{errorMsg}</div>
                )}

                <div>
                  <label className="block text-sm font-medium text-emerald-900 mb-1">Subject</label>
                  <select name="subject" required className="w-full border border-emerald-900/20 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500">
                    <option value="Tajweed">Tajweed</option>
                    <option value="Hifz">Hifz</option>
                    <option value="Nazra">Nazra</option>
                    <option value="Duas">Duas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-emerald-900 mb-1">Duration</label>
                  <select name="duration" required className="w-full border border-emerald-900/20 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500">
                    <option value="30">30 min</option>
                    <option value="45">45 min</option>
                    <option value="60">60 min</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setSelectedSlot(null)} className="flex-1 px-4 py-2 border border-emerald-900/20 rounded-lg font-medium">Cancel</button>
                  <button type="submit" disabled={bookingStatus === 'loading'} className="flex-1 bg-emerald-900 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50">
                    {bookingStatus === 'loading' ? 'Booking...' : 'Confirm Booking'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
