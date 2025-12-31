
import React, { useState, useMemo, useRef } from 'react';
import { MOCK_VETS, LONDON_BOROUGHS, PET_TYPES } from '../constants';
import { ViewState, Vet } from '../types';
import { VetAvatar } from '../components/VetAvatar';

interface SearchPageProps {
  onViewChange: (view: ViewState) => void;
  onSelectVet?: (vet: Vet) => void;
}

const CONCERNS = [
  { id: 'allergies', label: 'Allergies', icon: 'SPA' },
  { id: 'skin', label: 'Skin', icon: 'HAND' },
  { id: 'ear', label: 'Ear', icon: 'EAR' },
  { id: 'urinary', label: 'Urinary', icon: 'DRIP' },
  { id: 'eye', label: 'Eye', icon: 'EYE' },
  { id: 'flea_tick', label: 'Flea & tick', icon: 'BUG' },
];

export const SearchPage: React.FC<SearchPageProps> = ({ onViewChange, onSelectVet }) => {
  const [selectedBorough, setSelectedBorough] = useState<string>('All');
  const [selectedPet, setSelectedPet] = useState<string>('All');
  const [selectedConcern, setSelectedConcern] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('next');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVet, setActiveVet] = useState<Vet | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [instantBookingOnly, setInstantBookingOnly] = useState(false);

  const dateScrollRef = useRef<HTMLDivElement>(null);

  const filteredVets = useMemo(() => {
    return MOCK_VETS.filter(vet => {
      const matchesBorough = selectedBorough === 'All' || vet.borough === selectedBorough;
      const matchesPet = selectedPet === 'All' || true; 
      
      let matchesConcern = true;
      if (selectedConcern) {
        const concernLabel = CONCERNS.find(c => c.id === selectedConcern)?.label.toLowerCase() || '';
        matchesConcern = vet.specialty.toLowerCase().includes(concernLabel) || 
                         (vet.bio || '').toLowerCase().includes(concernLabel);
      }

      const matchesSearch = vet.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            vet.specialty.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesBorough && matchesSearch && matchesConcern;
    });
  }, [selectedBorough, searchQuery, selectedPet, selectedConcern]);

  const handleBooking = (vet: Vet) => {
    if (onSelectVet) {
      onSelectVet(vet);
    }
  };

  const clearFilters = () => {
    setSelectedBorough('All');
    setSelectedPet('All');
    setSelectedConcern(null);
    setSelectedDate('next');
    setInstantBookingOnly(false);
  };

  const scrollDates = (direction: 'left' | 'right') => {
    if (dateScrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      dateScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push({
        id: d.toISOString().split('T')[0],
        label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-GB', { weekday: 'short' }),
        num: d.getDate(),
      });
    }
    return dates;
  };

  const mockDates = generateDates();

  const getConcernIcon = (iconId: string) => {
    switch (iconId) {
      case 'SPA': return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
      case 'HAND': return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0V12m-3 .5a3 3 0 006 0V6a1.5 1.5 0 113 0v10a6 6 0 01-12 0V10a1.5 1.5 0 113 0v1.5" />
        </svg>
      );
      case 'EAR': return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      );
      case 'DRIP': return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.288a2 2 0 01-1.18.208l-2.486-.414a4.5 4.5 0 01-3.72-4.103l-.15-2.001A4.5 4.5 0 018.514 4h7.03a4.5 4.5 0 014.464 3.91l.15 2.001a4.5 4.5 0 01-.69 3.989l-.364.512a2 2 0 00-.312.417l-.364.6z" />
        </svg>
      );
      case 'EYE': return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      );
      case 'BUG': return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1V5a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 00-1 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2a1 1 0 00-1-1H5a1 1 0 01-1-1V5a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1z" />
        </svg>
      );
      default: return null;
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-2">London Specialists</h2>
            <p className="text-slate-400 font-medium">{filteredVets.length} elite practitioners available for immediate consultation.</p>
          </div>
          
          <div className="w-full md:w-[500px] flex gap-3">
            <div className="relative flex-1">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input 
                type="text"
                placeholder="Search by specialty, clinic, or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-16 pl-14 pr-4 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-amber-500/10 focus:bg-white focus:border-amber-500 outline-none transition-all text-slate-900 font-medium shadow-sm"
              />
            </div>
            <button 
              onClick={() => setShowFilters(true)}
              className="w-16 h-16 bg-white border border-slate-200 rounded-3xl flex items-center justify-center text-slate-900 hover:border-slate-900 hover:shadow-lg transition-all active:scale-95 group shrink-0 shadow-sm"
            >
              <svg className={`w-6 h-6 transition-transform group-hover:rotate-180 duration-500 ${(selectedBorough !== 'All' || selectedPet !== 'All' || selectedConcern || instantBookingOnly) ? 'text-amber-600' : 'text-slate-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredVets.map(vet => (
                <div 
                  key={vet.id} 
                  className="group bg-white rounded-[2.5rem] border border-slate-100 p-2 hover:shadow-2xl transition-all duration-500 flex flex-col cursor-pointer"
                  onClick={() => setActiveVet(vet)}
                >
                  <div className="relative h-56 rounded-[2rem] overflow-hidden mb-6">
                    <VetAvatar name={vet.name} imageUrl={vet.imageUrl} className="w-full h-full group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-xl">
                      <svg className="w-3.5 h-3.5 text-amber-500 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      <span className="text-xs font-bold text-slate-900">{vet.rating}</span>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-6 flex-1 flex flex-col">
                    <h4 className="text-xl font-serif text-slate-900 mb-1 group-hover:text-amber-600 transition-colors">{vet.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">{vet.specialty}</p>
                    
                    <div className="flex items-center gap-4 text-slate-500 mb-8">
                       <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          <span className="text-xs font-medium">{vet.borough}</span>
                       </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2">Available</span>
                        <div className="flex flex-col">
                           <span className="text-[9px] text-slate-400 uppercase font-bold tracking-widest leading-none mb-1">Consult Fee</span>
                           <span className="text-xl font-bold text-slate-900">£{vet.price}</span>
                        </div>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleBooking(vet); }}
                        className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-amber-500 transition-all active:scale-95"
                      >
                        Book Slot
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredVets.length === 0 && (
              <div className="text-center py-40 bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
                <div className="text-slate-300 mb-8 flex justify-center">
                   <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <h4 className="text-2xl font-serif text-slate-900 mb-3">No Specialists Matching Filters</h4>
                <p className="text-slate-400 max-w-sm mx-auto mb-10">Try broadening your search or clearing your active filters.</p>
                <button 
                  onClick={() => {setSearchQuery(''); clearFilters();}}
                  className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-amber-500 transition-all shadow-lg"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Advanced Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowFilters(false)}></div>
          <div className="bg-white w-full max-w-xl rounded-[1.5rem] shadow-2xl relative overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 max-h-[90vh]">
            <header className="px-6 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <button onClick={() => setShowFilters(false)} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <h3 className="text-lg font-bold text-slate-900">Filters</h3>
              <div className="w-8"></div>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-10">
              {/* 1. Choose a date Section */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-base font-bold text-slate-900">Choose a date</h4>
                  <div className="flex gap-2">
                    <button onClick={() => scrollDates('left')} className="p-1 rounded-full border border-slate-200 text-slate-400 hover:text-slate-900">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={() => scrollDates('right')} className="p-1 rounded-full border border-slate-200 text-slate-400 hover:text-slate-900">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                </div>
                
                <div 
                  ref={dateScrollRef}
                  className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide no-scrollbar px-1"
                >
                  <button 
                    onClick={() => setSelectedDate('next')}
                    className={`flex-shrink-0 w-28 h-20 rounded-xl border flex items-center justify-between px-3 transition-all duration-200 ${selectedDate === 'next' ? 'border-pink-500 bg-pink-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                  >
                    <div className="flex flex-col text-left">
                      <span className={`text-[9px] font-bold uppercase leading-tight ${selectedDate === 'next' ? 'text-pink-700' : 'text-slate-500'}`}>Next<br/>available</span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${selectedDate === 'next' ? 'border-pink-700 bg-pink-700' : 'border-slate-200 bg-white'}`}>
                      {selectedDate === 'next' && <div className="w-1 h-1 bg-white rounded-full"></div>}
                    </div>
                  </button>
                  
                  {mockDates.map(d => (
                    <button 
                      key={d.id}
                      onClick={() => setSelectedDate(d.id)}
                      className={`flex-shrink-0 w-24 h-20 rounded-xl border flex flex-col items-center justify-center transition-all duration-200 relative group ${selectedDate === d.id ? 'border-slate-900 bg-slate-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                    >
                      <span className={`text-[9px] font-bold uppercase mb-1 ${selectedDate === d.id ? 'text-slate-900' : 'text-slate-400'}`}>{d.label}</span>
                      <span className={`text-xl font-bold ${selectedDate === d.id ? 'text-slate-900' : 'text-slate-600'}`}>{d.num}</span>
                      <div className={`absolute top-2 right-2 w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${selectedDate === d.id ? 'border-slate-900 bg-slate-900' : 'border-slate-200 bg-white'}`}>
                        {selectedDate === d.id && <div className="w-1 h-1 bg-white rounded-full"></div>}
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              {/* Location Section */}
              <section>
                <div className="mb-4">
                  <h4 className="text-base font-bold text-slate-900">Location</h4>
                  <p className="text-xs text-slate-500">Select a London borough</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['All', ...LONDON_BOROUGHS].map(borough => (
                    <button 
                      key={borough}
                      onClick={() => setSelectedBorough(borough)}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                        selectedBorough === borough
                          ? 'border-slate-900 bg-slate-50'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <span className={`text-sm font-medium ${selectedBorough === borough ? 'text-slate-900' : 'text-slate-600'}`}>
                        {borough}
                      </span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        selectedBorough === borough 
                          ? 'border-slate-900 bg-slate-900' 
                          : 'border-slate-300 bg-white'
                      }`}>
                        {selectedBorough === borough && (
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              {/* 2. Species Section */}
              <section>
                <div className="mb-4">
                  <h4 className="text-base font-bold text-slate-900">Species</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['All', ...PET_TYPES].map(type => (
                    <button 
                      key={type}
                      onClick={() => setSelectedPet(type)}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                        selectedPet === type
                          ? 'border-slate-900 bg-slate-50'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-medium ${selectedPet === type ? 'text-slate-900' : 'text-slate-600'}`}>
                          {type}
                        </span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        selectedPet === type 
                          ? 'border-slate-900 bg-slate-900' 
                          : 'border-slate-300 bg-white'
                      }`}>
                        {selectedPet === type && (
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              {/* 3. Concern Section */}
              <section>
                <div className="mb-4">
                  <h4 className="text-base font-bold text-slate-900">Concern</h4>
                  <p className="text-xs text-slate-500">Please select your main concern</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CONCERNS.map((concern) => (
                    <button
                      key={concern.id}
                      onClick={() => setSelectedConcern(selectedConcern === concern.id ? null : concern.id)}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                        selectedConcern === concern.id
                          ? 'border-slate-900 bg-slate-50'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`transition-colors ${selectedConcern === concern.id ? 'text-slate-900' : 'text-slate-400'}`}>
                          {getConcernIcon(concern.icon)}
                        </div>
                        <span className={`text-sm font-medium ${selectedConcern === concern.id ? 'text-slate-900' : 'text-slate-600'}`}>
                          {concern.label}
                        </span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        selectedConcern === concern.id 
                          ? 'border-slate-900 bg-slate-900' 
                          : 'border-slate-300 bg-white'
                      }`}>
                        {selectedConcern === concern.id && (
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                <button className="mt-3 flex items-center gap-1 text-[11px] font-bold text-slate-900 hover:text-amber-600 transition-colors">
                  Show all concerns
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
              </section>

              {/* 4. Instant Booking Section */}
              <section className="pt-8 border-t border-slate-50">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-amber-500 shadow-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Instant Booking</h4>
                      <p className="text-[10px] text-slate-500 font-medium">Only specialists with immediate slots</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setInstantBookingOnly(!instantBookingOnly)}
                    className={`w-12 h-6 rounded-full relative transition-all duration-300 ${instantBookingOnly ? 'bg-amber-500' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${instantBookingOnly ? 'left-7' : 'left-1'}`}></div>
                  </button>
                </div>
              </section>
            </div>

            <footer className="px-6 py-4 border-t border-slate-100 flex items-center gap-4 bg-white sticky bottom-0 z-20">
              <button 
                onClick={clearFilters}
                className="flex-1 h-12 rounded-full border border-slate-200 text-sm font-bold text-slate-900 hover:bg-slate-50 transition-all"
              >
                Clear
              </button>
              <button 
                onClick={() => setShowFilters(false)}
                className="flex-1 h-12 rounded-full bg-[#0F172A] text-white text-sm font-bold hover:bg-slate-800 transition-all"
              >
                Apply ({filteredVets.length})
              </button>
            </footer>
          </div>
        </div>
      )}

      {/* Vet Detail Modal */}
      {activeVet && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setActiveVet(null)}></div>
           <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
              <div className="w-full md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                 <VetAvatar name={activeVet.name} imageUrl={activeVet.imageUrl} className="w-full h-full" />
                 <div className="absolute bottom-8 left-8 text-white z-10">
                    <h3 className="text-4xl font-serif mb-2">{activeVet.name}</h3>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-80">{activeVet.specialty}</p>
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              </div>
              <div className="flex-1 p-8 md:p-12 overflow-y-auto">
                 <div className="flex justify-between items-start mb-10">
                    <div className="flex gap-4">
                       <div className="text-center">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Rating</p>
                          <div className="flex items-center gap-1.5 justify-center">
                             <svg className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                             <p className="text-xl font-bold text-slate-900">{activeVet.rating}</p>
                          </div>
                       </div>
                       <div className="text-center">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Reviews</p>
                          <p className="text-xl font-bold text-slate-900">{activeVet.reviewCount}</p>
                       </div>
                    </div>
                    <button onClick={() => setActiveVet(null)} className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">✕</button>
                 </div>

                 <div className="space-y-8">
                    <div>
                       <div className="flex items-center gap-2 mb-3">
                         <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                         <h5 className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Available For Consult</h5>
                       </div>
                       <h5 className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-3">Clinical Bio</h5>
                       <p className="text-slate-600 leading-relaxed text-sm font-light">{activeVet.bio || "Dedicated specialist serving the London community with advanced clinical excellence."}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                       <div>
                          <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Credentials</h5>
                          <ul className="text-xs font-bold text-slate-900 space-y-2">
                             <li>• Royal Veterinary College</li>
                             <li>• RCVS Specialist Registry</li>
                             <li>• University of Cambridge - DVM</li>
                          </ul>
                       </div>
                       <div>
                          <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Expertise</h5>
                          <div className="flex flex-wrap gap-2">
                             <span className="px-2.5 py-1 bg-slate-50 text-slate-700 border border-slate-100 rounded-lg text-[9px] font-bold uppercase tracking-wider">Advanced Imaging</span>
                             <span className="px-2.5 py-1 bg-slate-50 text-slate-700 border border-slate-100 rounded-lg text-[9px] font-bold uppercase tracking-wider">Soft Tissue</span>
                          </div>
                       </div>
                    </div>

                    <div className="pt-8 border-t border-slate-50 flex flex-col sm:flex-row gap-4">
                       <div className="flex-1">
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Video Consultation</p>
                          <p className="text-2xl font-bold text-slate-900">£{activeVet.price}</p>
                       </div>
                       <button 
                         onClick={() => { setActiveVet(null); handleBooking(activeVet); }}
                         className="flex-[2] bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-amber-500 transition-all shadow-xl active:scale-95"
                       >
                         Book Now
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
