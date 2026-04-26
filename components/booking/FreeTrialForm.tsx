'use client';

import { useState } from 'react';

export default function FreeTrialForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setSuccess(true);
    setLoading(false);
    
    // reset after 5 seconds
    setTimeout(() => {
        setSuccess(false);
    }, 5000);
  };

  if (success) {
      return (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center space-y-4 animate-in fade-in zoom-in duration-300">
             <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 text-3xl">
                ✓
             </div>
             <h3 className="text-xl font-bold">Booking Confirmed!</h3>
             <p className="text-sm opacity-80">
                 Jazakallah Khair! We've sent a confirmation email with the Zoom meeting link for your selected time. We will contact you soon.
             </p>
             <button onClick={() => setSuccess(false)} className="mt-4 px-4 py-2 border border-emerald-800/20 rounded-lg font-medium hover:bg-emerald-100 transition-colors">
                Book another trial
             </button>
          </div>
      );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-emerald-900 mb-1">Full Name</label>
        <input required type="text" className="w-full border border-emerald-900/20 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none" placeholder="Enter your name" />
      </div>
      <div>
        <label className="block text-sm font-medium text-emerald-900 mb-1">Email Address</label>
        <input required type="email" className="w-full border border-emerald-900/20 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none" placeholder="you@example.com" />
      </div>
      <div>
        <label className="block text-sm font-medium text-emerald-900 mb-1">Country / Timezone</label>
        <select required className="w-full border border-emerald-900/20 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none">
          <option value="">Select timezone</option>
          <option value="BD">GMT+6 (Bangladesh)</option>
          <option value="IT">GMT+1 (Italy)</option>
          <option value="US">GMT-4 (US Eastern)</option>
          <option value="UK">GMT+0 (UK)</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-emerald-900 mb-1">Preferred Time</label>
         <input required type="datetime-local" className="w-full border border-emerald-900/20 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
      </div>
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-emerald-900 text-white py-3 rounded-lg font-medium hover:bg-emerald-800 transition-colors mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
      >
        {loading ? (
             <>
               <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
               Booking...
             </>
        ) : (
            "Confirm Booking"
        )}
      </button>
    </form>
  );
}
