
import React, { useState, useRef, useEffect } from 'react';
import { analyzeSymptoms, TriageResult } from '../services/geminiService';
import { ViewState } from '../types';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  triage?: TriageResult;
  imageUrl?: string;
}

interface TriageBotProps {
  onViewChange: (view: ViewState) => void;
}

export const TriageBot: React.FC<TriageBotProps> = ({ onViewChange }) => {
  const [input, setInput] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('Initializing analysis...');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Welcome to the Veterinary.London Clinical Triage. I am an advanced AI assistant trained on specialist protocols. You can describe symptoms or even upload a photo of a skin concern or injury for visual analysis."
    }
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = input.trim();
    if ((!query && !image) || loading) return;
    
    const base64 = image ? image.split(',')[1] : undefined;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query || "Analyzing attached image...",
      imageUrl: image || undefined
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setImage(null);
    setLoading(true);

    const statuses = [
      "Consulting clinical database...",
      "Analyzing visual evidence...",
      "Symptom cross-referencing...",
      "Determining urgency protocols...",
      "Finalizing medical summary..."
    ];

    let statusIdx = 0;
    const interval = setInterval(() => {
      setLoadingStatus(statuses[statusIdx % statuses.length]);
      statusIdx++;
    }, 1500);

    try {
      const triage = await analyzeSymptoms(query || "Image analysis only", base64);
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: triage.summary || "Assessment complete.",
        triage: triage
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Clinical connectivity error. Please describe the symptoms again or book an immediate video consultation."
      }]);
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const urgencyStyles = {
    'Green': {
      bg: 'bg-emerald-50/50',
      text: 'text-emerald-700',
      accent: 'text-emerald-500',
      border: 'border-emerald-100',
      indicator: 'bg-emerald-500',
      label: 'Routine Care Recommended',
      shadow: 'shadow-emerald-900/5'
    },
    'Yellow': {
      bg: 'bg-amber-50/50',
      text: 'text-amber-800',
      accent: 'text-amber-600',
      border: 'border-amber-100',
      indicator: 'bg-amber-500',
      label: 'Urgent Consultation Advised',
      shadow: 'shadow-amber-900/5'
    },
    'Red': {
      bg: 'bg-rose-50/50',
      text: 'text-rose-800',
      accent: 'text-rose-600',
      border: 'border-rose-100',
      indicator: 'bg-rose-500',
      label: 'Emergency Attention Required',
      shadow: 'shadow-rose-900/5'
    }
  };

  return (
    <div className="bg-slate-50/50 py-4 md:py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 bg-white rounded-full border border-slate-200 shadow-sm mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Specialist Multimodal AI</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-slate-900 mb-1 tracking-tight">AI Clinical Triage</h2>
          <p className="text-slate-500 max-w-md mx-auto font-light text-xs">
            Using Gemini Vision to identify critical pet health indicators.
          </p>
        </header>

        <div className="bg-white rounded-[1.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[600px] relative ring-1 ring-slate-100">
          <div 
            ref={scrollRef}
            className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4 scroll-smooth z-10"
          >
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}
              >
                <div className={`max-w-[90%] md:max-w-[80%] ${msg.role === 'user' ? 'order-2' : ''}`}>
                  {msg.role === 'assistant' && msg.triage ? (
                    <div className={`bg-white border rounded-[1.25rem] overflow-hidden shadow-xl transition-all ${urgencyStyles[msg.triage.urgency].border} ${urgencyStyles[msg.triage.urgency].shadow}`}>
                      <div className={`px-5 py-2.5 ${urgencyStyles[msg.triage.urgency].bg} border-b ${urgencyStyles[msg.triage.urgency].border} flex justify-between items-center`}>
                        <div className="flex items-center space-x-2">
                           <div className={`w-1.5 h-1.5 rounded-full ${urgencyStyles[msg.triage.urgency].indicator}`}></div>
                           <span className={`text-[9px] font-bold uppercase tracking-widest ${urgencyStyles[msg.triage.urgency].text}`}>
                             {urgencyStyles[msg.triage.urgency].label}
                           </span>
                        </div>
                      </div>

                      <div className="p-5 space-y-4">
                        <div>
                          <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Assessment</h4>
                          <p className="text-slate-900 text-sm font-serif italic leading-relaxed">
                            "{msg.triage.summary}"
                          </p>
                        </div>

                        {msg.triage.possibleConditions && (
                          <div className="flex flex-wrap gap-1.5">
                            {msg.triage.possibleConditions.map((cond, i) => (
                              <span key={i} className="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                                {cond}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                          <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Action Plan</h4>
                          <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                            {msg.triage.advice}
                          </p>
                        </div>

                        <div className="pt-2 flex gap-2">
                          <button 
                            onClick={() => onViewChange('search')}
                            className="flex-1 bg-slate-900 text-white py-2.5 rounded-lg text-[10px] font-bold hover:bg-amber-500 transition-all shadow-md active:scale-95"
                          >
                            Book Specialist
                          </button>
                          <button 
                            onClick={() => setMessages([messages[0]])}
                            className="px-4 py-2.5 bg-slate-100 text-slate-500 rounded-lg hover:bg-slate-200 transition-all text-[10px] font-bold"
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={`p-4 rounded-[1rem] text-[13px] leading-relaxed shadow-sm relative ${
                      msg.role === 'user' 
                        ? 'bg-slate-900 text-white rounded-tr-none' 
                        : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none ring-1 ring-slate-50'
                    }`}>
                      {msg.imageUrl && (
                        <img src={msg.imageUrl} className="w-48 h-48 object-cover rounded-lg mb-3 border-2 border-white/20 shadow-md" alt="Uploaded symptom" />
                      )}
                      <p className="whitespace-pre-wrap font-medium">{msg.content}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start animate-in fade-in duration-300">
                <div className="bg-white border border-slate-100 p-4 rounded-[1rem] rounded-tl-none flex flex-col space-y-2 min-w-[180px] shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                  </div>
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{loadingStatus}</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-100 bg-white/80 backdrop-blur-md z-20">
            {image && (
              <div className="mb-3 flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-100">
                <div className="relative">
                  <img src={image} className="w-12 h-12 object-cover rounded-lg" alt="Preview" />
                  <button onClick={() => setImage(null)} className="absolute -top-2 -right-2 bg-red-500 text-white w-4 h-4 rounded-full text-[8px] flex items-center justify-center">✕</button>
                </div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Image attached</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="flex gap-2">
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors shrink-0"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </button>
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <div className="relative flex-1">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe concern or upload photo..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500/20 focus:bg-white focus:border-amber-500 outline-none transition-all text-slate-900 text-[13px] font-medium"
                  disabled={loading}
                />
                <button 
                  type="submit"
                  disabled={loading || (!input.trim() && !image)}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-amber-500 transition-all disabled:opacity-20 font-bold text-[10px]"
                >
                  Analyze
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
