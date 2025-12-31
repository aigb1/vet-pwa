
import React, { useState } from 'react';
import { Vet, ViewState } from '../types';
import { VetAvatar } from '../components/VetAvatar';

interface BookingFlowProps {
  vet: Vet;
  onComplete: (date: string, time: string) => void;
  onViewChange: (view: ViewState) => void;
}

export const BookingFlow: React.FC<BookingFlowProps> = ({ vet, onComplete, onViewChange }) => {
  const [selectedDayIdx, setSelectedDayIdx] = useState(2);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  const days = [
    { day: "Mon", date: "15", full: "Mon 15 Oct" },
    { day: "Tue", date: "16", full: "Tue 16 Oct" },
    { day: "Wed", date: "17", full: "Wed 17 Oct" },
    { day: "Thu", date: "18", full: "Thu 18 Oct" },
    { day: "Fri", date: "19", full: "Fri 19 Oct" },
    { day: "Sat", date: "20", full: "Sat 20 Oct" },
  ];

  const morningSlots = ["09:00", "09:20", "09:40", "10:00", "10:20", "10:40", "11:00", "11:20"];
  const afternoonSlots = ["14:00", "14:20", "14:40", "15:00", "15:20", "15:40", "16:00", "16:20"];

  const handleConfirm = () => {
    if (selectedTime) {
      setIsConfirming(true);
      // Simulate payment delay
      setTimeout(() => {
        onComplete(days[selectedDayIdx].full, selectedTime);
      }, 1500);
    }
  };

  if (isConfirming) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mb-8 animate-bounce text-amber-500">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
        </div>
        <h2 className="text-4xl font-serif text-slate-900 mb-4">Securing your session</h2>
        <p className="text-slate-500 max-w-sm">Please wait while we confirm your appointment with {vet.name} and process your secure payment.</p>
        <div className="mt-12 w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-amber-500 animate-[loading_2s_ease-in-out_infinite]"></div>
        </div>
        <style>{`
          @keyframes loading {
            0% { width: 0%; transform: translateX(-100%); }
            50% { width: 100%; transform: translateX(0); }
            100% { width: 0%; transform: translateX(100%); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center space-x-4 mb-12">
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">1</span>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-900">Consultation</span>
          </div>
          <div className="w-12 h-px bg-slate-200"></div>
          <div className="flex items-center space-x-2 opacity-30">
            <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold">2</span>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Payment</span>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row min-h-[700px]">
          <aside className="bg-slate-900 text-white p-10 md:w-[400px] flex flex-col">
            <div className="mb-10">
              <h3 className="text-3xl font-serif mb-2 text-white">Booking Details</h3>
              <p className="text-slate-400 text-sm font-light">Confirm your specialist and chosen time.</p>
            </div>

            <div className="flex-1 space-y-10">
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                <p className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Assigned Specialist</p>
                <div className="flex items-center mb-4">
                  <div className="relative">
                    <VetAvatar name={vet.name} imageUrl={vet.imageUrl} className="w-16 h-16 rounded-2xl ring-2 ring-white/10" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-lg leading-none mb-1">{vet.name}</p>
                    <p className="text-xs text-slate-400">{vet.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center text-xs text-amber-500 font-bold">
                  <svg className="w-3.5 h-3.5 mr-1 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  <span>{vet.rating}</span>
                  <span className="text-slate-500 ml-1 font-normal">({vet.reviewCount} reviews)</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Service Type</p>
                  <p className="font-serif text-lg">20-Minute Clinical Video Consult</p>
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Consultation Fee</p>
                  <p className="text-2xl font-bold text-amber-500">£{vet.price}.00</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 mt-10">
              <div className="flex items-center text-slate-400">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                <span className="text-[10px] uppercase tracking-widest font-bold">Secure Telehealth Link</span>
              </div>
            </div>
          </aside>

          <div className="flex-1 p-8 md:p-14 bg-white overflow-y-auto">
            <header className="mb-12">
              <h2 className="text-3xl font-serif text-slate-900 mb-2">Select Your Slot</h2>
              <p className="text-slate-500">Times are shown in GMT (London Time).</p>
            </header>
            
            <div className="mb-12">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">October 2024</h4>
              <div className="flex gap-3 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
                {days.map((item, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedDayIdx(idx)}
                    className={`flex-shrink-0 w-20 h-24 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ${selectedDayIdx === idx ? 'bg-slate-900 text-white shadow-2xl scale-105' : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 border border-transparent'}`}
                  >
                    <span className="text-[10px] font-bold uppercase mb-1">{item.day}</span>
                    <span className="text-xl font-bold">{item.date}</span>
                    <div className={`w-1 h-1 rounded-full mt-2 ${selectedDayIdx === idx ? 'bg-amber-400' : 'bg-transparent'}`}></div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-10 mb-16">
              <div>
                <div className="flex items-center mb-6">
                  <div className="text-amber-500 mr-3">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z" /></svg>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Morning Availability</h4>
                  <div className="flex-1 h-px bg-slate-100 ml-4"></div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {morningSlots.map(slot => (
                    <button 
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`py-4 rounded-xl text-xs font-bold border transition-all duration-200 ${selectedTime === slot ? 'bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-500/20 transform scale-[1.02]' : 'bg-white text-slate-600 border-slate-100 hover:border-slate-300 hover:bg-slate-50'}`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center mb-6">
                  <div className="text-amber-600 mr-3">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 21l-8-8 8-8" /></svg>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Afternoon Availability</h4>
                  <div className="flex-1 h-px bg-slate-100 ml-4"></div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {afternoonSlots.map(slot => (
                    <button 
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`py-4 rounded-xl text-xs font-bold border transition-all duration-200 ${selectedTime === slot ? 'bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-500/20 transform scale-[1.02]' : 'bg-white text-slate-600 border-slate-100 hover:border-slate-300 hover:bg-slate-50'}`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-10 border-t border-slate-50">
              <button 
                onClick={() => onViewChange('search')}
                className="text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-slate-900 transition-colors"
              >
                Cancel & Return
              </button>
              <div className="flex-grow"></div>
              <div className="text-right hidden sm:block">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Total Fee</p>
                <p className="text-2xl font-serif text-slate-900 leading-none">£{vet.price}.00</p>
              </div>
              <button 
                disabled={!selectedTime}
                onClick={handleConfirm}
                className="w-full sm:w-auto bg-slate-900 text-white px-12 py-5 rounded-2xl font-bold shadow-2xl hover:bg-amber-500 transition-all disabled:opacity-20 disabled:cursor-not-allowed transform hover:-translate-y-1"
              >
                Confirm Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
