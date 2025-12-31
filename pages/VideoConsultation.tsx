
import React, { useState } from 'react';
import { MOCK_PET, MOCK_VETS } from '../constants';

interface VideoConsultationProps {
  onEnd?: () => void;
}

export const VideoConsultation: React.FC<VideoConsultationProps> = ({ onEnd }) => {
  const [notes, setNotes] = useState('');
  const [prescription, setPrescription] = useState('');
  const [activeTab, setActiveTab] = useState<'notes' | 'prescription'>('notes');

  return (
    <div className="h-[calc(100vh-80px)] bg-slate-950 flex flex-col md:flex-row">
      <div className="flex-1 relative bg-black flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1000" 
          className="w-full h-full object-cover opacity-80"
          alt="Video Feed"
        />
        
        <div className="absolute top-6 left-6 bg-slate-900/60 backdrop-blur px-4 py-2 rounded-xl text-white flex items-center space-x-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">{MOCK_PET.name} & Owner</span>
        </div>

        <div className="absolute bottom-6 right-6 w-48 h-32 bg-slate-800 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
          <img 
            src={MOCK_VETS[0].imageUrl} 
            className="w-full h-full object-cover"
            alt="Vet Preview"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center space-x-6">
          <button className="w-12 h-12 bg-slate-800/80 hover:bg-slate-700 rounded-full flex items-center justify-center text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
          </button>
          <button 
            onClick={onEnd}
            className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-red-500/30 transition-all"
          >
            <svg className="w-8 h-8 rotate-[135deg]" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
          </button>
          <button className="w-12 h-12 bg-slate-800/80 hover:bg-slate-700 rounded-full flex items-center justify-center text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          </button>
        </div>
      </div>

      <div className="w-full md:w-[450px] bg-white h-full flex flex-col border-l border-slate-200">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-xl font-serif text-slate-900 mb-1">Clinical Workspace</h3>
          <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Consultation ID: LV-9482</p>
        </div>

        <div className="flex border-b border-slate-100">
          <button 
            onClick={() => setActiveTab('notes')}
            className={`flex-1 py-4 text-sm font-bold tracking-wider uppercase transition-colors ${activeTab === 'notes' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Medical Notes
          </button>
          <button 
            onClick={() => setActiveTab('prescription')}
            className={`flex-1 py-4 text-sm font-bold tracking-wider uppercase transition-colors ${activeTab === 'prescription' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Prescription Pad
          </button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'notes' ? (
            <div className="h-full flex flex-col">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Clinical Observations</label>
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Examine skin lesions... check respiratory rate..."
                className="flex-grow w-full p-6 bg-slate-50 border border-slate-100 rounded-2xl resize-none focus:ring-2 focus:ring-amber-500 outline-none text-slate-800 leading-relaxed"
              ></textarea>
              <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
                <div className="flex items-center gap-1.5 mb-1">
                  <svg className="w-3.5 h-3.5 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                  <p className="text-xs font-bold text-amber-800 uppercase">AI Suggestion:</p>
                </div>
                <p className="text-xs text-amber-700">Based on owner symptoms: Consider Atopic Dermatitis or flea allergy.</p>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col">
              <div className="bg-slate-50 p-6 rounded-[2rem] border-2 border-dashed border-slate-200 flex-grow relative">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-slate-400">
                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                </div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Medication & Dosage</label>
                <textarea 
                  value={prescription}
                  onChange={(e) => setPrescription(e.target.value)}
                  placeholder="e.g. Apoquel 3.6mg - 1 tablet twice daily for 14 days."
                  className="w-full bg-transparent border-none focus:ring-0 text-slate-900 leading-relaxed resize-none h-64"
                ></textarea>
                <div className="absolute bottom-8 left-6 right-6 border-t border-slate-200 pt-4 flex justify-between">
                  <span className="text-[10px] text-slate-300 uppercase tracking-tighter">Verified Specialist Signature Required</span>
                  <span className="font-serif text-slate-400 italic">Dr. Sarah K.</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 text-center mt-4">This digital prescription will be sent to the owner's nominated London pharmacy.</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <button 
            onClick={onEnd}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center"
          >
            Finalise Consultation
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
};
