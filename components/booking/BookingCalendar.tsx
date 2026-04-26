'use client';

import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer, Views, View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

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

const myEventsList = [
  {
    title: 'Available Slot',
    start: new Date(new Date().setHours(10, 0, 0, 0)),
    end: new Date(new Date().setHours(11, 0, 0, 0)),
  },
  {
    title: 'Available Slot',
    start: new Date(new Date().setHours(14, 0, 0, 0)),
    end: new Date(new Date().setHours(14, 45, 0, 0)),
  },
];

export default function BookingCalendar() {
  const [view, setView] = useState<View>(Views.WEEK);
  const [date, setDate] = useState(new Date());

  const handleSelectEvent = (event: any) => {
    alert(`Selected slot: ${event.title} at ${format(event.start, 'hh:mm a')}`);
    // Here we would open a modal to confirm booking and proceed to payment
  };

  return (
    <div className="h-[600px] w-full bg-white p-6 rounded-2xl shadow-sm border border-emerald-900/10">
      <Calendar
        localizer={localizer}
        events={myEventsList}
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
        min={new Date(0, 0, 0, 8, 0, 0)} // Start at 8 AM
        max={new Date(0, 0, 0, 22, 0, 0)} // End at 10 PM
        components={{
          event: (props) => (
            <div className="bg-emerald-600 text-white h-full w-full rounded-md p-1 text-xs font-medium border border-emerald-700 shadow-sm transition-all hover:bg-emerald-700">
              {props.title}
            </div>
          ),
        }}
        formats={{
          timeGutterFormat: (date: Date, culture?: string, local?: any) =>
            local.format(date, 'h a', culture),
        }}
      />
    </div>
  );
}
