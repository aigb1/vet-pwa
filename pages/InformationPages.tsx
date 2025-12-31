
import React from 'react';
import { ViewState } from '../types';

export const AboutPage: React.FC = () => (
  <div className="max-w-5xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="text-center mb-16">
      <h2 className="text-5xl font-serif text-slate-900 mb-6">Redefining Urban Pet Care</h2>
      <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">Founded in the heart of Kensington, Veterinary.London was born from a simple vision: to provide Londoners with immediate, world-class specialist access for their beloved animals.</p>
    </div>
    
    <div className="grid md:grid-cols-2 gap-16 mb-20">
      <div className="space-y-6">
        <h3 className="text-2xl font-serif text-slate-900">Our Mission</h3>
        <p className="text-slate-600 leading-relaxed font-light">We leverage cutting-edge AI triage and high-definition telehealth to bridge the gap between pet owners and the UK's most elite veterinary specialists. Our network isn't just a list—it's a vetted community of RCVS-recognized practitioners.</p>
      </div>
      <div className="space-y-6">
        <h3 className="text-2xl font-serif text-slate-900">Clinical Excellence</h3>
        <p className="text-slate-600 leading-relaxed font-light">Every specialist on our platform undergoes a rigorous clinical peer-review process. We focus on advanced diagnostics, specialized surgical opinions, and holistic chronic care management that fits the modern London lifestyle.</p>
      </div>
    </div>

    <div className="bg-slate-900 rounded-[3rem] p-12 text-center text-white">
      <h3 className="text-3xl font-serif mb-6">A Member of the Royal Borough Network</h3>
      <p className="text-slate-400 font-light max-w-xl mx-auto mb-8">Part of a wider healthcare ecosystem dedicated to excellence in West and Central London. We are proud to set the gold standard in veterinary telehealth.</p>
      <div className="flex justify-center gap-8">
        <div className="text-center">
          <p className="text-4xl font-bold text-amber-500">15+</p>
          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Clinical Specialties</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold text-amber-500">10k+</p>
          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">London Patients</p>
        </div>
      </div>
    </div>
  </div>
);

export const VetOnboardingPage: React.FC = () => (
  <div className="max-w-5xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="flex flex-col lg:flex-row gap-16 items-center mb-20">
      <div className="flex-1">
        <div className="inline-flex items-center px-3 py-1 bg-amber-50 rounded-full border border-amber-100 mb-6">
          <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest">Join the Elite</span>
        </div>
        <h2 className="text-5xl font-serif text-slate-900 mb-6 leading-tight">Apply to our <span className="text-amber-600 italic">Specialist</span> Network</h2>
        <p className="text-lg text-slate-500 font-light leading-relaxed mb-8">Veterinary.London is exclusively for RCVS-recognized specialists and advanced practitioners living or working within the M25. We provide the platform, the triage, and the premium client base.</p>
        <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-amber-600 transition-all shadow-xl active:scale-95">Start Application</button>
      </div>
      <div className="flex-1">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm space-y-8">
          <div className="flex gap-6">
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl shrink-0">🏛️</div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Clinical Sovereignty</h4>
              <p className="text-sm text-slate-500">Set your own rates and schedule. Maintain your private clinical identity while leveraging our technology.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl shrink-0">📱</div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">AI-Powered Queue</h4>
              <p className="text-sm text-slate-500">Our Gemini-powered triage ensures cases in your queue are relevant and urgent, saving your clinical bandwidth.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl shrink-0">💎</div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Premium Client Base</h4>
              <p className="text-sm text-slate-500">Connect with dedicated pet owners in London's premier boroughs who value high-end clinical expertise.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const HelpPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <h2 className="text-4xl font-serif text-slate-900 mb-12 text-center">Help Center</h2>
    <div className="space-y-6">
      {[
        { q: "How does the AI Triage work?", a: "Our AI uses Google's most advanced Gemini models, specifically tuned with veterinary protocols, to analyze symptoms and images. It provides an immediate urgency rating (Red, Yellow, Green) to help you decide if your pet needs emergency care." },
        { q: "Are the consultations held via video?", a: "Yes, all consultations on our platform are high-definition video calls conducted within our secure clinical environment. This allows our specialists to visually assess your pet and provide real-time advice." },
        { q: "Can I get a prescription?", a: "Specialists can issue digital prescriptions during a consult if clinically appropriate. These are sent directly to your nominated London pharmacy for collection or delivery." },
        { q: "What if I need an in-person clinic visit?", a: "During your video consult, the specialist will advise if a physical examination is required and can recommend or refer you to a local clinic in our network across London." }
      ].map((faq, i) => (
        <details key={i} className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
          <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
            <span className="font-bold text-slate-900">{faq.q}</span>
            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <div className="px-6 pb-6 text-slate-500 font-light leading-relaxed">
            {faq.a}
          </div>
        </details>
      ))}
    </div>
    <div className="mt-20 p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 text-center">
      <h3 className="text-xl font-bold text-slate-900 mb-2">Still have questions?</h3>
      <p className="text-slate-500 mb-6">Our concierge team is available 24/7 for technical and account support.</p>
      <button className="text-amber-600 font-bold border-b-2 border-amber-600 pb-1 uppercase text-xs tracking-widest">Contact Concierge</button>
    </div>
  </div>
);

export const EmergencyPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="bg-rose-50 border border-rose-100 rounded-[3rem] p-12 mb-16 relative overflow-hidden">
      <div className="relative z-10 text-center">
        <div className="w-16 h-16 bg-rose-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-pulse">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        </div>
        <h2 className="text-4xl font-serif text-rose-900 mb-4 tracking-tight">Clinical Emergency?</h2>
        <p className="text-rose-700 font-medium max-w-xl mx-auto mb-10 leading-relaxed">If your pet is showing signs of acute distress, bleeding, or difficulty breathing, do not wait for a video consult. Contact an emergency facility immediately.</p>
        <div className="grid md:grid-cols-2 gap-4 max-w-lg mx-auto">
          <button className="bg-rose-600 text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-rose-700 transition-all flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
            Call 999 (VET)
          </button>
          <button className="bg-white text-rose-600 border border-rose-200 py-4 rounded-2xl font-bold hover:bg-rose-50 transition-all">Find Nearest Clinic</button>
        </div>
      </div>
    </div>

    <h3 className="text-2xl font-serif text-slate-900 mb-8 px-2">London Emergency Centers</h3>
    <div className="grid sm:grid-cols-2 gap-6">
      {[
        { name: "Medivet 24hr Kensington", addr: "Kensington High St, W8", tel: "020 7123 4567" },
        { name: "Vets Now Central London", addr: "Islington, N1", tel: "020 7987 6543" },
        { name: "Royal Veterinary College QE", addr: "Camden, NW1", tel: "020 7321 0987" },
        { name: "Elizabeth St Emergency", addr: "Belgravia, SW1", tel: "020 7555 1234" }
      ].map((clinic, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-slate-900 mb-1">{clinic.name}</h4>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-4">{clinic.addr}</p>
          </div>
          <p className="text-slate-900 font-bold text-sm mb-4">{clinic.tel}</p>
          <button className="w-full py-2.5 bg-slate-50 text-slate-900 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-colors">Call Clinic</button>
        </div>
      ))}
    </div>
  </div>
);

export const PharmaciesPage: React.FC = () => (
  <div className="max-w-5xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="mb-16">
      <h2 className="text-4xl font-serif text-slate-900 mb-4">London Partner Pharmacies</h2>
      <p className="text-slate-500 font-light max-w-2xl leading-relaxed">We work closely with London's most reputable pharmacies to ensure your pet's medications are handled with clinical precision and delivered with speed.</p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {[
        { name: "John Bell & Croyden", borough: "Marylebone", desc: "Specialist veterinary compounding and premium supplements.", status: "24/7 Service" },
        { name: "Boots Kensington High St", borough: "Kensington", desc: "Reliable stock of common medications and emergency supplies.", status: "Rapid Pickup" },
        { name: "Zafash Pharmacy", borough: "Old Brompton Rd", desc: "London's famous 24-hour pharmacy with specialized pet desk.", status: "24hr Open" },
        { name: "LloydsPharmacy", borough: "Knightsbridge", desc: "Premium pet care essentials and clinical prescriptions.", status: "Delivery Available" },
        { name: "Bliss Chemist", borough: "Mayfair", desc: "Bespoke pharmaceutical care in the heart of Mayfair.", status: "Specialist" },
        { name: "Harley Street Pet Care", borough: "W1G", desc: "Concierge pharmacy services for the Westminster area.", status: "Elite" }
      ].map((pharm, i) => (
        <div key={i} className="group bg-white rounded-3xl border border-slate-100 p-8 hover:shadow-xl transition-all duration-500 flex flex-col">
          <div className="mb-6 flex justify-between items-start">
            <span className="px-3 py-1 bg-amber-50 text-amber-700 text-[9px] font-bold uppercase rounded-lg">{pharm.status}</span>
          </div>
          <h4 className="text-xl font-serif text-slate-900 mb-1">{pharm.name}</h4>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">{pharm.borough}</p>
          <p className="text-sm text-slate-500 font-light leading-relaxed mb-8 flex-1">{pharm.desc}</p>
          <button className="w-full py-4 border border-slate-100 rounded-2xl text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em] group-hover:bg-slate-900 group-hover:text-white transition-all">Nominate Pharmacy</button>
        </div>
      ))}
    </div>
  </div>
);
