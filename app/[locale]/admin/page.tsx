import { Calendar, Users, DollarSign, Settings } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-emerald-950 p-6 font-sans text-white">
      <div className="max-w-7xl mx-auto flex gap-6">
        
        {/* Sidebar */}
        <div className="w-64 bg-emerald-900 p-6 rounded-2xl flex flex-col gap-6">
          <div className="font-bold text-xl text-gold-400">Hasib Admin</div>
          <nav className="flex flex-col gap-2">
             <button className="flex items-center gap-3 px-4 py-2 bg-emerald-800 rounded-lg text-sm font-medium">
               <Calendar className="w-4 h-4" /> Bookings
             </button>
             <button className="flex items-center gap-3 px-4 py-2 hover:bg-emerald-800/50 rounded-lg text-sm font-medium text-emerald-100">
               <Users className="w-4 h-4" /> Students
             </button>
             <button className="flex items-center gap-3 px-4 py-2 hover:bg-emerald-800/50 rounded-lg text-sm font-medium text-emerald-100">
               <DollarSign className="w-4 h-4" /> Revenue
             </button>
             <button className="flex items-center gap-3 px-4 py-2 hover:bg-emerald-800/50 rounded-lg text-sm font-medium text-emerald-100">
               <Settings className="w-4 h-4" /> Settings
             </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
           <header className="flex justify-between items-center bg-emerald-900 p-6 rounded-2xl">
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-emerald-300/70 text-sm">Manage your Quran teaching platform</p>
              </div>
           </header>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Stats */}
             <div className="bg-emerald-900 p-6 rounded-2xl">
                <h3 className="text-emerald-300/70 text-sm font-medium mb-1">Total Revenue</h3>
                <p className="text-3xl font-bold font-mono">$1,200.00</p>
             </div>
             
             <div className="bg-emerald-900 p-6 rounded-2xl">
                <h3 className="text-emerald-300/70 text-sm font-medium mb-1">Active Students</h3>
                <p className="text-3xl font-bold">24</p>
             </div>
             
             <div className="bg-emerald-900 p-6 rounded-2xl">
                <h3 className="text-emerald-300/70 text-sm font-medium mb-1">Upcoming Classes</h3>
                <p className="text-3xl font-bold">5</p>
             </div>
           </div>
           
           <div className="bg-emerald-900 p-6 rounded-2xl h-96">
               <h3 className="text-lg font-bold mb-4">Calendar & Availability</h3>
               <div className="w-full h-full border-2 border-emerald-800 border-dashed rounded-xl flex items-center justify-center text-emerald-300/50">
                 [Interactive Teacher Calendar View Here]
               </div>
           </div>
        </div>

      </div>
    </div>
  );
}
