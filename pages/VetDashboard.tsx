
import React, { useState } from 'react';
import { Appointment, Vet } from '../types';
import { MOCK_VETS, LONDON_BOROUGHS } from '../constants';
import { VetAvatar } from '../components/VetAvatar';

interface VetDashboardProps {
  appointments: Appointment[];
  onLaunchConsult: () => void;
}

export const VetDashboard: React.FC<VetDashboardProps> = ({ appointments, onLaunchConsult }) => {
  const [activeTab, setActiveTab] = useState<'clinical' | 'schedule' | 'profile'>('clinical');
  const upcoming = appointments.filter(a => a.status === 'upcoming');
  const onlineTeam = MOCK_VETS.slice(1, 5);

  // Mock schedule state
  const [availableSlots, setAvailableSlots] = useState(['09:00', '09:20', '10:00', '14:30', '16:00']);
  const [newSlot, setNewSlot] = useState('');

  const addSlot = () => {
    if (newSlot && !availableSlots.includes(newSlot)) {
      setAvailableSlots([...availableSlots].sort());
      setNewSlot('');
    }
  };

  const removeSlot = (slot: string) => {
    setAvailableSlots(availableSlots.filter(s => s !== slot));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8">
        <div>
          <div className="inline-flex items-center px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100 mb-4">
            <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2 animate-pulse"></span>
            <span className="text-[9px] font-bold text-indigo-800 uppercase tracking-widest">Mayfair Clinical Hub</span>
          </div>
          <h2 className="text-5xl font-serif text-slate-900 mb-2">Specialist Portal</h2>
          <p className="text-slate-500 font-light">Welcome back, Dr. Kensington. Managing your clinical presence.</p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <nav className="flex bg-white border border-slate-100 p-1.5 rounded-[2rem] shadow-sm">
            {[
              { id: 'clinical', label: 'Clinical Feed', icon: '🩺' },
              { id: 'schedule', label: 'Schedule', icon: '📅' },
              { id: 'profile', label: 'Profile', icon: '👤' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-[1.5rem] text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900'}`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Main Workspace */}
        <div className="lg:col-span-8 space-y-12">
          
          {activeTab === 'clinical' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Analytics Section */}
              <section className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
                <div className="flex justify-between items-end mb-10">
                  <div>
                    <h3 className="text-xl font-serif text-slate-900 mb-1">Clinic Insights</h3>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Consultation Volume (Last 7 Days)</p>
                  </div>
                  <div className="flex gap-2">
                     <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full">+12% vs LW</span>
                  </div>
                </div>
                
                <div className="h-48 flex items-end gap-3 px-4">
                  {[45, 62, 58, 85, 92, 74, 88].map((val, i) => (
                    <div key={i} className="flex-1 group relative">
                      <div 
                        className={`w-full rounded-t-2xl transition-all duration-500 relative ${i === 4 ? 'bg-slate-900' : 'bg-slate-100 group-hover:bg-amber-100'}`} 
                        style={{ height: `${val}%` }}
                      >
                        {i === 4 && <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold px-2 py-1 rounded">Peak</div>}
                      </div>
                      <p className="text-center mt-4 text-[9px] font-bold text-slate-300 uppercase tracking-tighter">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Clinical Queue */}
              <section className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-[0.2em] flex items-center">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 animate-pulse"></span>
                    Today's Clinical Queue
                  </h3>
                </div>
                <div className="space-y-4">
                  {upcoming.length > 0 ? (
                    upcoming.map((appt) => (
                      <div key={appt.id} className="bg-white border border-slate-100 rounded-[2.5rem] p-8 hover:shadow-2xl transition-all duration-500 group border-l-4 border-l-amber-500">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                          <div className="text-center md:text-left min-w-[120px]">
                            <p className="text-3xl font-serif text-slate-900 leading-none mb-1">{appt.time}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Confirmed Slot</p>
                          </div>
                          <div className="flex-1 flex items-center gap-6">
                            <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-slate-400 border border-slate-100 group-hover:bg-amber-50 transition-colors">
                               <svg className="w-8 h-8 group-hover:text-amber-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            </div>
                            <div>
                              <p className="text-[9px] font-bold text-amber-600 uppercase tracking-[0.2em] mb-1">Pet Patient</p>
                              <h4 className="text-2xl font-serif text-slate-900">{appt.petName}</h4>
                              <p className="text-xs text-slate-400 font-medium">Primary: Sarah Jenkins (Owner)</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button onClick={onLaunchConsult} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-amber-500 transition-all shadow-xl shadow-slate-900/10 active:scale-95 flex items-center gap-3">
                              <span className="text-sm">Start Session</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                      <p className="text-slate-400 font-medium">No consultations remaining.</p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <section className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
                <div className="mb-10">
                  <h3 className="text-2xl font-serif text-slate-900 mb-2">Manage Availability</h3>
                  <p className="text-slate-500 text-sm">Submit slots for your next clinical window. Patients can book these instantly.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Add New Slot</h4>
                    <div className="flex gap-3">
                      <input 
                        type="time" 
                        value={newSlot}
                        onChange={(e) => setNewSlot(e.target.value)}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 transition-colors font-bold text-slate-900"
                      />
                      <button 
                        onClick={addSlot}
                        className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-amber-500 transition-all shadow-xl active:scale-95"
                      >
                        Add
                      </button>
                    </div>
                    <div className="p-6 bg-amber-50 rounded-[2rem] border border-amber-100">
                      <p className="text-xs text-amber-800 leading-relaxed font-medium">
                        <span className="font-bold">Pro Tip:</span> Morning slots (09:00 - 11:00) generally fill 40% faster in Central London.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Active Live Slots</h4>
                    <div className="flex flex-wrap gap-2">
                      {availableSlots.map((slot) => (
                        <div key={slot} className="group relative">
                          <div className="bg-white border border-slate-100 pl-5 pr-12 py-3 rounded-xl font-bold text-slate-900 shadow-sm">
                            {slot}
                          </div>
                          <button 
                            onClick={() => removeSlot(slot)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-red-500 transition-colors"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                    {availableSlots.length === 0 && <p className="text-slate-400 text-sm italic">No slots currently active.</p>}
                  </div>
                </div>
              </section>

              <section className="bg-slate-900 rounded-[2.5rem] p-10 text-white flex justify-between items-center">
                <div>
                  <h4 className="text-xl font-serif mb-1">Clinic Synchronization</h4>
                  <p className="text-white/50 text-xs uppercase tracking-widest font-bold">Automatic scheduling with London Hub</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full">ACTIVE SYNC</span>
                  <div className="w-12 h-6 bg-emerald-500 rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-lg"></div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <section className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-10 mb-12">
                   <div className="relative group">
                      <VetAvatar name="Sarah Kensington" imageUrl={MOCK_VETS[0].imageUrl} className="w-32 h-32 rounded-[2.5rem] border-4 border-slate-50 shadow-xl" />
                      <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white border border-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 shadow-lg transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
                      </button>
                   </div>
                   <div className="flex-1">
                      <h3 className="text-3xl font-serif text-slate-900 mb-2">Public Profile</h3>
                      <p className="text-slate-500 text-sm">How you appear to pet owners across London.</p>
                   </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Specialty Title</label>
                    <input type="text" defaultValue="Small Animal Internal Medicine" className="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl outline-none focus:border-amber-500 transition-colors font-medium text-slate-900" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Base Borough</label>
                    <select defaultValue="Kensington & Chelsea" className="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl outline-none focus:border-amber-500 transition-colors font-medium text-slate-900 appearance-none">
                      {LONDON_BOROUGHS.map(b => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Professional Bio</label>
                    <textarea rows={4} className="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl outline-none focus:border-amber-500 transition-colors font-medium text-slate-900 resize-none">Expert clinician with over 15 years experience in urban veterinary medicine. Dedicated to compassionate care and evidence-based diagnostics in the heart of London.</textarea>
                  </div>
                </div>

                <div className="mt-12 flex justify-end gap-4">
                  <button className="px-8 py-4 bg-slate-50 text-slate-400 rounded-2xl font-bold hover:text-slate-900 transition-colors">Discard</button>
                  <button className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-amber-500 transition-all shadow-xl active:scale-95">Save Profile</button>
                </div>
              </section>
            </div>
          )}
        </div>

        {/* Clinical Sidebar */}
        <div className="lg:col-span-4 space-y-10">
          
          {/* Clinic Status */}
          <section className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
            <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-8">Clinical Environment</h4>
            <div className="space-y-6">
              <div className="flex items-center justify-between group">
                <span className="text-sm text-slate-500 group-hover:text-slate-900 transition-colors">Virtual Waiting Room</span>
                <div className="flex items-center gap-2">
                   <span className="text-[10px] font-bold text-emerald-600">6 ACTIVE</span>
                   <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                </div>
              </div>
              <div className="flex items-center justify-between group">
                <span className="text-sm text-slate-500 group-hover:text-slate-900 transition-colors">Pharmacy Fulfillment</span>
                <span className="text-[10px] font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">OPERATIONAL</span>
              </div>
              <div className="flex items-center justify-between group">
                <span className="text-sm text-slate-500 group-hover:text-slate-900 transition-colors">AI Triage Monitor</span>
                <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg">3 URGENT</span>
              </div>
            </div>
          </section>

          {/* Online Team */}
          <section className="bg-slate-50 rounded-[2.5rem] p-8">
            <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-6">Colleagues Active</h4>
            <div className="space-y-4">
              {onlineTeam.map((vet) => (
                <div key={vet.id} className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm transition-transform hover:scale-[1.02] cursor-pointer">
                  <div className="relative">
                    <VetAvatar name={vet.name} imageUrl={vet.imageUrl} className="w-10 h-10 rounded-xl" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 leading-none mb-0.5">{vet.name}</p>
                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">{vet.specialty.split(' ')[0]}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:border-slate-900 hover:text-slate-900 transition-all">Clinical Chat</button>
          </section>

          {/* CPD Card */}
          <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-indigo-600/30 relative overflow-hidden group">
             <div className="relative z-10">
               <h4 className="text-2xl font-serif mb-4 leading-tight">Advanced <br/> Endocrinology</h4>
               <p className="text-indigo-100 text-sm font-light mb-8 leading-relaxed opacity-80">New protocols for feline thyroid management are now available.</p>
               <button className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition-all shadow-xl active:scale-95">Review Protocols</button>
             </div>
             <div className="absolute right-[-20%] bottom-[-20%] opacity-10 group-hover:rotate-12 transition-transform duration-700">
               <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.827a1 1 0 00-.788 0l-7 3a1 1 0 000 1.846l7 3a1 1 0 00.788 0l7-3a1 1 0 000-1.846l-7-3zM3.108 8.1l6.892 2.954V18l-6.892-2.954a1 1 0 01-.608-.92V9.02a1 1 0 01.608-.92zM18 10.454l-6.101 2.615v7.502l6.101-2.615a1 1 0 00.608-.92v-5.66a1 1 0 00-.608-.922z"></path></svg>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};
