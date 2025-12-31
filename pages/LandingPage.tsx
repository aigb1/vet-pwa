
import React, { useState } from 'react';
import { LONDON_BOROUGHS, PET_TYPES, FEATURED_VETS } from '../constants';
import { ViewState } from '../types';
import { VetAvatar } from '../components/VetAvatar';

interface LandingPageProps {
  onSearch: (borough: string, petType: string) => void;
  onViewChange: (view: ViewState) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSearch, onViewChange }) => {
  const [borough, setBorough] = useState('All');
  const [petType, setPetType] = useState('All');

  const staffAvatars = [
    "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=100&h=100",
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=100&h=100",
    "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=100&h=100",
    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=100&h=100"
  ];

  const specialties = [
    { label: 'Cardiology', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg> },
    { label: 'Dermatology', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.288a2 2 0 01-1.18.208l-2.486-.414a4.5 4.5 0 01-3.72-4.103l-.15-2.001A4.5 4.5 0 018.514 4h7.03a4.5 4.5 0 014.464 3.91l.15 2.001a4.5 4.5 0 01-.69 3.989l-.364.512a2 2 0 00-.312.417l-.364.6z" /></svg> },
    { label: 'Surgery', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758L5 19m0-14l4.121 4.121" /></svg> },
    { label: 'Oncology', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.288a2 2 0 01-1.18.208l-2.486-.414a4.5 4.5 0 01-3.72-4.103" /></svg> },
    { label: 'Feline Med', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg> },
    { label: 'Emergency', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg> }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-12 pb-20 md:pt-24 lg:pt-32 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-10 relative z-10">
            <div className="inline-flex items-center px-4 py-1.5 bg-amber-50 rounded-full border border-amber-100 shadow-sm animate-fade-in">
              <span className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></span>
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-[0.2em]">London's #1 Specialist Network</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-slate-900 leading-[1] tracking-tight">
              Elevated care <br/> for <span className="text-amber-600 italic">beloved</span> pets.
            </h2>
            
            <p className="text-xl text-slate-500 font-light max-w-xl leading-relaxed">
              Experience the future of veterinary medicine. Immediate video access to London's finest specialists, from Kensington to Greenwich.
            </p>

            <div className="bg-white p-3 rounded-3xl border border-slate-200 shadow-2xl flex flex-col md:flex-row gap-3 max-w-3xl ring-8 ring-slate-50 transition-all hover:ring-slate-100">
              <div className="flex-1 relative group">
                <label className="absolute left-12 top-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Location</label>
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-amber-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                </div>
                <select 
                  value={borough}
                  onChange={(e) => setBorough(e.target.value)}
                  className="w-full h-16 pl-12 pr-4 pt-4 bg-transparent text-slate-900 rounded-2xl focus:outline-none appearance-none cursor-pointer font-bold"
                >
                  <option value="All">All of London</option>
                  {LONDON_BOROUGHS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              
              <div className="flex-1 relative border-t md:border-t-0 md:border-l border-slate-100 group">
                <label className="absolute left-12 top-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Pet Type</label>
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-hover:animate-bounce transition-all">🐾</div>
                <select 
                  value={petType}
                  onChange={(e) => setPetType(e.target.value)}
                  className="w-full h-16 pl-12 pr-4 pt-4 bg-transparent text-slate-900 rounded-2xl focus:outline-none appearance-none cursor-pointer font-bold"
                >
                  <option value="All">All Pets</option>
                  {PET_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              
              <button 
                onClick={() => onSearch(borough, petType)}
                className="bg-slate-900 hover:bg-amber-500 text-white font-bold h-16 px-12 rounded-[1.25rem] transition-all shadow-xl active:scale-95 group flex items-center justify-center gap-2"
              >
                Find Specialists
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
            
            <div className="flex items-center space-x-6 pt-4 animate-fade-in-up">
              <div className="flex -space-x-4">
                {staffAvatars.map((url, i) => <img key={i} className="w-12 h-12 rounded-full border-4 border-white object-cover shadow-lg hover:z-20 transition-transform hover:scale-110" src={url} alt="Vet Staff"/>)}
              </div>
              <div>
                <p className="text-sm text-slate-900 font-bold">500+ Verified Specialists</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Available 24/7 for Londoners</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 hidden lg:block relative">
             <div className="relative group">
                <div className="absolute -inset-4 bg-amber-500/5 rounded-[4rem] blur-3xl group-hover:bg-amber-500/10 transition-colors"></div>
                <img 
                  src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=1200" 
                  className="relative rounded-[3.5rem] shadow-2xl border-8 border-white h-[650px] w-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                  alt="Luxury London Pet"
                />
                <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-50 max-w-[240px] animate-bounce-subtle">
                  <div className="flex gap-1 mb-2">
                    {[1,2,3,4,5].map(s => <span key={s} className="text-amber-500 text-sm">★</span>)}
                  </div>
                  <p className="text-sm font-bold text-slate-900 leading-tight mb-4">"The care quality rivals Harley Street. Unmatched speed."</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                    <div className="w-8 h-8 bg-slate-100 rounded-full"></div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-900 uppercase">Edward V.</p>
                      <p className="text-[9px] text-slate-400 uppercase">Mayfair Client</p>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Specialty Icons / Categories */}
      <section className="py-20 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {specialties.map(spec => (
            <button key={spec.label} className="group flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center group-hover:shadow-xl group-hover:scale-110 transition-all group-hover:bg-amber-500 text-slate-900 group-hover:text-white">
                {spec.icon}
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-900 transition-colors">{spec.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-2">
              <h3 className="text-4xl font-serif text-slate-900">Elite Specialists</h3>
              <p className="text-slate-500 max-w-md">Every veterinarian in our network is double-vetted and RCVS specialist recognized.</p>
            </div>
            <button 
              onClick={() => onViewChange('search')}
              className="px-8 py-3.5 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition-all active:scale-95"
            >
              Explore Full Network
            </button>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
            {FEATURED_VETS.map(vet => (
              <div 
                key={vet.id} 
                className="bg-white group rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col cursor-pointer"
                onClick={() => onViewChange('booking')}
              >
                <div className="relative h-64 overflow-hidden">
                  <VetAvatar name={vet.name} imageUrl={vet.imageUrl} className="w-full h-full group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-bold text-slate-900 uppercase tracking-widest shadow-lg">
                    {vet.borough}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors font-serif">{vet.name}</h4>
                    <div className="flex items-center text-xs font-bold">
                      <span className="text-amber-500 mr-1">★</span>
                      <span>{vet.rating}</span>
                    </div>
                  </div>
                  <p className="text-slate-500 text-[10px] mb-6 font-bold uppercase tracking-widest">{vet.specialty}</p>
                  <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center">
                    <div>
                      <span className="text-[9px] text-slate-400 block mb-0.5 uppercase font-bold tracking-widest">Consult</span>
                      <span className="font-bold text-slate-900">£{vet.price}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl uppercase tracking-widest">Available</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </section>

      {/* Call to Action: Triage */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-10">
          <h2 className="text-4xl md:text-6xl font-serif text-white">Not sure if it's <span className="text-amber-500">urgent</span>?</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Our AI-powered clinical triage bot provides instant urgency assessment using Gemini Vision and specialized veterinary protocols.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <button 
                onClick={() => onViewChange('triage')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-12 py-5 rounded-2xl transition-all shadow-xl active:scale-95 text-lg"
             >
                Start AI Triage
             </button>
             <button 
                onClick={() => onViewChange('search')}
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-12 py-5 rounded-2xl transition-all border border-white/10 text-lg"
             >
                Find a Vet
             </button>
          </div>
        </div>
        
        {/* Subtle Decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
      </section>

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounce-subtle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-fade-in { animation: fade-in 1s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 1.2s ease-out; }
        .animate-bounce-subtle { animation: bounce-subtle 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
};
