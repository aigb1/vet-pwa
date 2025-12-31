
import React, { useState } from 'react';
import { MOCK_PET, getInitials } from '../constants';
import { Appointment, PetRecord } from '../types';
import { VetAvatar } from '../components/VetAvatar';
import { PetAvatar } from '../components/PetAvatar';

interface PetDashboardProps {
  appointments: Appointment[];
}

export const PetDashboard: React.FC<PetDashboardProps> = ({ appointments }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'medical' | 'lifestyle' | 'profile'>('overview');
  const [pets, setPets] = useState<PetRecord[]>([MOCK_PET]);
  const [selectedPetIdx, setSelectedPetIdx] = useState(0);
  const [showAddPet, setShowAddPet] = useState(false);

  // Current active pet
  const currentPet = pets[selectedPetIdx];
  const upcoming = appointments.filter(a => a.status === 'upcoming');

  const handleAddPet = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPet: PetRecord = {
      id: `p${Date.now()}`,
      name: formData.get('name') as string,
      type: formData.get('type') as string,
      breed: formData.get('breed') as string,
      age: parseInt(formData.get('age') as string),
      weight: formData.get('weight') as string,
      gender: formData.get('gender') as any,
      neutered: formData.get('neutered') === 'on',
      healthScore: 100,
      dailyCalories: 500,
      vaccinations: [],
      consultations: []
    };
    setPets([...pets, newPet]);
    setShowAddPet(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Profile Sidebar */}
        <aside className="w-full lg:w-80">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm sticky top-28">
            <div className="relative w-32 h-32 mx-auto mb-6">
               <div className="w-full h-full rounded-full overflow-hidden border-4 border-amber-50 shadow-inner flex items-center justify-center bg-slate-50">
                  <PetAvatar name={currentPet.name} imageUrl={currentPet.imageUrl} className="w-full h-full" />
               </div>
               <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 border-4 border-white rounded-full flex items-center justify-center text-white shadow-lg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
               </div>
            </div>
            
            <h3 className="text-2xl font-serif text-center mb-1">{currentPet.name}</h3>
            <p className="text-slate-500 text-sm text-center mb-8">{currentPet.breed}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 p-3 rounded-2xl text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Health</p>
                <p className="text-xl font-bold text-amber-600">{currentPet.healthScore}%</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Weight</p>
                <p className="text-xl font-bold text-slate-900">{currentPet.weight}</p>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-50">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 uppercase tracking-widest text-[10px] font-bold">Gender</span>
                <span className="font-bold text-slate-700">{currentPet.gender}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 uppercase tracking-widest text-[10px] font-bold">Neutered</span>
                <span className="font-bold text-slate-700">{currentPet.neutered ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 uppercase tracking-widest text-[10px] font-bold">Age</span>
                <span className="font-bold text-slate-700">{currentPet.age} Years</span>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-50 space-y-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">My Other Pets</p>
              <div className="flex flex-wrap gap-2">
                {pets.map((pet, i) => (
                  <button 
                    key={pet.id} 
                    onClick={() => setSelectedPetIdx(i)}
                    className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all ${selectedPetIdx === i ? 'border-amber-500 scale-110 shadow-lg' : 'border-white opacity-40 hover:opacity-100'}`}
                  >
                    <PetAvatar name={pet.name} imageUrl={pet.imageUrl} className="w-full h-full" />
                  </button>
                ))}
                <button 
                  onClick={() => setShowAddPet(true)}
                  className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center hover:bg-slate-200 transition-colors border-2 border-dashed border-slate-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                </button>
              </div>
            </div>

            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full mt-10 py-4 rounded-2xl font-bold transition-all shadow-lg active:scale-95 ${activeTab === 'profile' ? 'bg-amber-500 text-slate-900' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
            >
              My Owner Profile
            </button>
          </div>
        </aside>

        {/* Main Dashboard Content */}
        <div className="flex-1 space-y-8">
          {/* Header Stats / Quick Info */}
          <div className="flex flex-wrap gap-4">
             {['Overview', 'Medical Records', 'Lifestyle & Nutrition'].map((tab, i) => (
               <button 
                key={tab}
                onClick={() => setActiveTab(i === 0 ? 'overview' : i === 1 ? 'medical' : 'lifestyle')}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === (i === 0 ? 'overview' : i === 1 ? 'medical' : 'lifestyle') ? 'bg-slate-900 text-white shadow-xl' : 'bg-white text-slate-400 hover:text-slate-900 border border-slate-100'}`}
               >
                 {tab}
               </button>
             ))}
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {upcoming.length > 0 && (
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
                  <div className="relative">
                    <VetAvatar name={upcoming[0].vetName} imageUrl={upcoming[0].vetImageUrl} className="w-24 h-24 rounded-[1.5rem] ring-8 ring-white shadow-xl" />
                    <div className="absolute -top-3 -right-3 bg-slate-900 text-white text-[9px] font-bold px-3 py-1 rounded-full shadow-lg">UPCOMING</div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1">Clinical Session</p>
                    <h3 className="text-2xl font-serif text-slate-900 mb-2">Video Consult with {upcoming[0].vetName}</h3>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-500">
                       <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          {upcoming[0].date}
                       </span>
                       <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {upcoming[0].time}
                       </span>
                    </div>
                  </div>
                  <button className="w-full md:w-auto bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-slate-900/10 active:scale-95">
                    Launch Consultation
                  </button>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm group hover:shadow-md transition-all">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-lg font-serif">Health Trends for {currentPet.name}</h4>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+2% Weekly</span>
                  </div>
                  <div className="h-40 flex items-end gap-2 px-2">
                    {[40, 60, 55, 75, 88, 82, 88].map((val, i) => (
                      <div key={i} className="flex-1 bg-slate-100 rounded-t-lg relative group/bar transition-all" style={{height: `${val}%`}}>
                        <div className={`absolute inset-0 bg-amber-500 rounded-t-lg transition-all ${i === 6 ? 'opacity-100' : 'opacity-0 group-hover/bar:opacity-50'}`}></div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4 text-[9px] font-bold text-slate-300 uppercase">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group">
                   <div className="relative z-10">
                    <h4 className="text-xl font-serif mb-4">Immediate Actions</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-white/10 rounded-xl border border-white/10 flex items-center justify-between">
                        <span className="text-xs">Update {currentPet.name}'s Medical Profile</span>
                        <span className="text-[9px] font-bold bg-amber-500 text-slate-900 px-2 py-1 rounded">Required</span>
                      </div>
                      <div className="p-3 bg-white/10 rounded-xl border border-white/10 flex items-center justify-between">
                        <span className="text-xs">Schedule Recurring Grooming</span>
                        <span className="text-[9px] font-bold text-white/40">Optional</span>
                      </div>
                    </div>
                   </div>
                   <div className="absolute right-0 bottom-0 opacity-10 group-hover:scale-110 transition-transform">
                      <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.4503-1.4503l-7 7a1 1 0 000 1.4142l7 7a1 1 0 001.4503-1.4503L6.4142 10l5.9808-5.9808z" clipRule="evenodd" /></svg>
                   </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <h4 className="text-xl font-serif">Clinical History</h4>
                  <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-amber-600 transition-colors">Full Archive</button>
                </div>
                {currentPet.consultations.length > 0 ? (
                  <div className="space-y-6">
                    {currentPet.consultations.map(consult => (
                      <div key={consult.id} className="border border-slate-100 rounded-2xl p-6 hover:bg-slate-50 transition-all flex flex-col md:flex-row gap-6">
                        <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-900 shadow-sm text-center">
                          <span className="font-bold text-slate-400 text-[10px] uppercase tracking-tighter">{getInitials(consult.vetName)}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h5 className="font-bold text-slate-900">{consult.vetName}</h5>
                              <p className="text-[10px] text-amber-600 uppercase font-bold tracking-widest">{consult.date} • {consult.type}</p>
                            </div>
                            <button className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-600 hover:border-slate-900 transition-all">Details</button>
                          </div>
                          <p className="text-slate-500 text-sm italic">"{consult.summary}"</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-slate-50 rounded-2xl">
                    <p className="text-slate-400 text-sm italic">No recent clinical records found for {currentPet.name}.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'medical' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                 <div className="bg-white rounded-3xl p-8 border border-slate-100">
                    <h4 className="text-xl font-serif mb-6 flex items-center gap-2">
                      <span className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                      </span>
                      Immunization Status
                    </h4>
                    <div className="space-y-4">
                      {currentPet.vaccinations.length > 0 ? currentPet.vaccinations.map((v, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                           <div>
                             <p className="font-bold text-slate-900">{v.name}</p>
                             <p className="text-[10px] text-slate-400 uppercase font-bold">{v.date}</p>
                           </div>
                           <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase ${v.status === 'Due' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                             {v.status}
                           </span>
                        </div>
                      )) : (
                        <p className="text-slate-400 text-sm text-center py-6 border border-dashed border-slate-200 rounded-xl">No vaccination records provided.</p>
                      )}
                    </div>
                 </div>
                 <div className="bg-white rounded-3xl p-8 border border-slate-100">
                    <h4 className="text-xl font-serif mb-6 flex items-center gap-2">
                      <span className="w-8 h-8 bg-rose-50 rounded-lg flex items-center justify-center text-rose-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      </span>
                      London Pharmacy Access
                    </h4>
                    <div className="p-6 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200 text-center">
                       <p className="text-slate-400 text-sm mb-4">No active prescriptions for {currentPet.name}.</p>
                       <button className="text-[10px] font-bold text-amber-600 uppercase tracking-widest border-b border-amber-600 pb-0.5">Clinical Support</button>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'lifestyle' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 pb-12">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Calorie Card */}
                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm col-span-1 lg:col-span-2">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h4 className="text-xl font-serif text-slate-900 mb-1">Nutrition Hub</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Daily Balance for {currentPet.name}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-3xl font-bold text-slate-900 leading-none">{currentPet.dailyCalories}</p>
                       <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">KCAL / DAY</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="relative w-40 h-40">
                       <svg className="w-full h-full transform -rotate-90">
                          <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-50" />
                          <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * 0.75)} className="text-amber-500 transition-all duration-1000" />
                       </svg>
                       <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-bold text-slate-900">75%</span>
                          <span className="text-[8px] font-bold text-slate-400 uppercase">Intake</span>
                       </div>
                    </div>
                    <div className="flex-1 space-y-4">
                       <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500">Target Reached</span>
                          <span className="font-bold text-slate-900">487 kcal</span>
                       </div>
                       <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500">Remaining Today</span>
                          <span className="font-bold text-amber-600">{currentPet.dailyCalories - 487} kcal</span>
                       </div>
                       <div className="pt-2 border-t border-slate-50">
                          <button className="text-[10px] font-bold text-slate-900 uppercase tracking-widest underline decoration-amber-500 underline-offset-4">View Feeding Guide</button>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Activity Card */}
                <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                       <h4 className="text-xl font-serif">Activity Level</h4>
                       <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-amber-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                       </span>
                    </div>
                    <div className="space-y-6">
                       <div>
                          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">
                             <span>Walking Goal</span>
                             <span>45 / 60 MIN</span>
                          </div>
                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                             <div className="h-full bg-amber-500 w-[75%]" />
                          </div>
                       </div>
                       <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/5">
                          <p className="text-xs font-light text-white/60 leading-relaxed italic">"{currentPet.name} is hitting his targets for a London-based pet. Consider a longer walk in Hyde Park today."</p>
                       </div>
                    </div>
                </div>

                {/* Hydration Tracker */}
                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                   <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Hydration</h4>
                   <div className="flex items-end justify-between gap-1 h-24 mb-6">
                      {[60, 45, 90, 70, 40, 85, 55].map((h, i) => (
                        <div key={i} className="flex-1 bg-slate-50 rounded-lg relative overflow-hidden group">
                           <div className={`absolute bottom-0 w-full bg-indigo-500 transition-all ${i === 6 ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`} style={{height: `${h}%`}}></div>
                        </div>
                      ))}
                   </div>
                   <div className="flex justify-between items-center">
                      <p className="text-sm font-bold text-slate-900 leading-none">1.2 Litres</p>
                      <p className="text-[10px] text-emerald-600 font-bold uppercase">Optimal</p>
                   </div>
                </div>

                {/* Supplement Management */}
                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm col-span-1 lg:col-span-2">
                   <div className="flex justify-between items-center mb-6">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Daily Supplements</h4>
                      <button className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest border-b border-indigo-600">Clinical Review</button>
                   </div>
                   <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-lg transition-all">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-amber-500 shadow-sm">
                            💊
                         </div>
                         <div>
                            <p className="text-sm font-bold text-slate-900">Joint Support Plus</p>
                            <p className="text-[10px] text-slate-400 font-medium">1 Tablet • Morning</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-lg transition-all">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm">
                            💧
                         </div>
                         <div>
                            <p className="text-sm font-bold text-slate-900">Omega-3 Oils</p>
                            <p className="text-[10px] text-slate-400 font-medium">2 Pumps • Evening</p>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Feeding Schedule */}
                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                   <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Meal Schedule</h4>
                   <div className="space-y-4">
                      <div className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                         <div className="flex-1">
                            <p className="text-xs font-bold text-slate-900">Breakfast (07:30)</p>
                            <p className="text-[9px] text-slate-400 uppercase font-medium">150g Wet Mix • Completed</p>
                         </div>
                         <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                         <div className="flex-1">
                            <p className="text-xs font-bold text-slate-900">Lunch (13:00)</p>
                            <p className="text-[9px] text-slate-400 uppercase font-medium">80g Dry Kibble • Pending</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-3 opacity-40">
                         <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                         <div className="flex-1">
                            <p className="text-xs font-bold text-slate-900">Dinner (19:30)</p>
                            <p className="text-[9px] text-slate-400 uppercase font-medium">150g Wet Mix • Upcoming</p>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Body Condition Score (BCS) */}
                <div className="bg-indigo-50 rounded-[2rem] p-8 border border-indigo-100 shadow-sm lg:col-span-3">
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="max-w-md">
                         <h4 className="text-xl font-serif text-indigo-900 mb-2">Body Condition Assessment</h4>
                         <p className="text-indigo-700/70 text-sm leading-relaxed">Based on your last specialist consult, {currentPet.name} is currently a <span className="font-bold">4/9</span> on the BCS scale. This is considered ideal for his breed and age.</p>
                      </div>
                      <div className="flex-1 w-full max-w-lg">
                         <div className="relative h-12 flex items-center px-4">
                            <div className="absolute inset-x-0 h-3 bg-indigo-200/50 rounded-full" />
                            <div className="absolute left-[35%] w-10 h-10 bg-white border-4 border-amber-500 rounded-full shadow-xl flex items-center justify-center -translate-x-1/2">
                               <span className="text-xs font-bold text-amber-600">4</span>
                            </div>
                            <div className="w-full flex justify-between text-[9px] font-bold text-indigo-400 uppercase tracking-tighter mt-12 px-1">
                               <span>Underweight</span>
                               <span>Ideal</span>
                               <span>Overweight</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Dietary Restrictions */}
                <div className="bg-rose-50 rounded-[2rem] p-8 border border-rose-100 shadow-sm lg:col-span-3 flex items-center gap-6">
                   <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-rose-500 shadow-sm shrink-0">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                   </div>
                   <div>
                      <h4 className="text-rose-900 font-bold uppercase tracking-widest text-xs mb-1">Clinical Restriction: Grain Sensitivity</h4>
                      <p className="text-rose-700/70 text-sm italic leading-relaxed">"Avoid wheat and barley-based treats. Opt for single-protein dehydrated salmon or beef instead."</p>
                   </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <section className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                  <div>
                    <h3 className="text-3xl font-serif text-slate-900 mb-2">Owner Profile</h3>
                    <p className="text-slate-500 text-sm">Manage your clinical identity and contact preferences.</p>
                  </div>
                  <div className="px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Account Status</p>
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Premium Active</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Legal Name</label>
                    <input type="text" defaultValue="Sarah Jenkins" className="w-full bg-slate-50 border border-slate-200 px-6 py-4 rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-slate-900" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <input type="email" defaultValue="sarah.jenkins@example.com" className="w-full bg-slate-50 border border-slate-200 px-6 py-4 rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-slate-900" />
                  </div>
                  
                  <div className="md:col-span-2 grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Primary Phone</label>
                      <input type="tel" defaultValue="+44 7712 345 678" className="w-full bg-slate-50 border border-slate-200 px-6 py-4 rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-slate-900" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Landline (Optional)</label>
                      <input type="tel" defaultValue="+44 20 7123 4567" className="w-full bg-slate-50 border border-slate-200 px-6 py-4 rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-slate-900" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Emergency Secondary</label>
                      <input type="tel" placeholder="Backup contact number" className="w-full bg-slate-50 border border-slate-200 px-6 py-4 rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-slate-900" />
                    </div>
                  </div>

                  <div className="md:col-span-2 border-t border-slate-50 pt-8 mt-4">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em] mb-6">London Residency & Logistics</h4>
                    <div className="grid md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Clinical Borough</label>
                        <select className="w-full bg-slate-50 border border-slate-200 px-6 py-4 rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-slate-900 appearance-none">
                          <option>Kensington & Chelsea</option>
                          <option>Westminster</option>
                          <option>Camden</option>
                          <option>Islington</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Postal Code</label>
                        <input type="text" defaultValue="W8 4NR" className="w-full bg-slate-50 border border-slate-200 px-6 py-4 rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-slate-900 uppercase" />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Residential Address</label>
                        <textarea rows={2} defaultValue="Flat 4, 12 Lexham Gardens, London" className="w-full bg-slate-50 border border-slate-200 px-6 py-4 rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-slate-900 resize-none"></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 border-t border-slate-50 pt-8 mt-4">
                     <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.288a2 2 0 01-1.18.208l-2.486-.414a4.5 4.5 0 01-3.72-4.103l-.15-2.001A4.5 4.5 0 018.514 4h7.03a4.5 4.5 0 014.464 3.91l.15 2.001a4.5 4.5 0 01-.69 3.989l-.364.512a2 2 0 00-.312.417l-.364.6z" /></svg>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em]">Preferred Local Pharmacy</h4>
                     </div>
                     <select className="w-full bg-slate-50 border border-slate-200 px-6 py-4 rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-slate-900 appearance-none">
                       <option>Boots Kensington High St (Primary)</option>
                       <option>John Bell & Croyden - Marylebone</option>
                       <option>Zafash Pharmacy - Old Brompton Rd</option>
                       <option>LloydsPharmacy - Knightsbridge</option>
                     </select>
                  </div>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-6 pt-10 border-t border-slate-50">
                   <p className="text-[10px] text-slate-400 font-medium max-w-sm italic">Last clinical data update: Today, 09:12 AM. Data is encrypted according to RCVS privacy standards.</p>
                   <button className="w-full sm:w-auto bg-slate-900 text-white px-12 py-5 rounded-2xl font-bold hover:bg-amber-600 transition-all shadow-xl active:scale-95 transform hover:-translate-y-1">
                     Save Clinical Profile
                   </button>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>

      {/* Add Pet Modal Overlay */}
      {showAddPet && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setShowAddPet(false)}></div>
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10 md:p-14">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-3xl font-serif text-slate-900">Add New Pet</h3>
                <button onClick={() => setShowAddPet(false)} className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">✕</button>
              </div>
              
              <form onSubmit={handleAddPet} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pet Name</label>
                    <input name="name" required type="text" placeholder="e.g. Luna" className="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl outline-none focus:border-amber-500 transition-colors font-medium text-slate-900" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</label>
                    <select name="type" className="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl outline-none focus:border-amber-500 transition-colors font-medium text-slate-900 appearance-none">
                      <option>Dog</option><option>Cat</option><option>Rabbit</option><option>Exotic</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Breed</label>
                    <input name="breed" required type="text" placeholder="e.g. Golden Retriever" className="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl outline-none focus:border-amber-500 transition-colors font-medium text-slate-900" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Age (Years)</label>
                    <input name="age" required type="number" placeholder="2" className="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl outline-none focus:border-amber-500 transition-colors font-medium text-slate-900" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Weight (kg)</label>
                    <input name="weight" required type="text" placeholder="12kg" className="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl outline-none focus:border-amber-500 transition-colors font-medium text-slate-900" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gender</label>
                    <select name="gender" className="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl outline-none focus:border-amber-500 transition-colors font-medium text-slate-900 appearance-none">
                      <option>Male</option><option>Female</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 py-4">
                  <input type="checkbox" name="neutered" id="neutered" className="w-5 h-5 rounded border-slate-200 text-amber-500 focus:ring-amber-500" />
                  <label htmlFor="neutered" className="text-sm text-slate-600 font-medium">This pet is neutered/spayed</label>
                </div>

                <div className="pt-6 border-t border-slate-50 flex gap-4">
                  <button type="button" onClick={() => setShowAddPet(false)} className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-2xl font-bold hover:text-slate-900 transition-colors">Cancel</button>
                  <button type="submit" className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-amber-500 transition-all shadow-xl active:scale-95">Register Pet</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
