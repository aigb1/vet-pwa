
import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface AuthPageProps {
  onLogin: (user: User) => void;
  onCancel: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onCancel }) => {
  const [role, setRole] = useState<UserRole>('owner');
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth logic
    onLogin({
      id: Math.random().toString(36).substr(2, 9),
      name: name || (role === 'vet' ? 'Dr. Kensington' : 'Sarah Jenkins'),
      email: email || 'user@london.vet',
      role
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Column: Visual/Marketing */}
      <div className="hidden md:flex md:w-1/2 bg-slate-900 relative overflow-hidden p-16 flex-col justify-between">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=1200" 
            alt="Luxury Pet Care" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/40 to-transparent"></div>
        </div>

        <div className="relative z-10">
           <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center">
              <span className="font-serif text-xl font-bold text-slate-900">V</span>
            </div>
            <h1 className="text-xl font-serif text-white tracking-tight">veterinary.london</h1>
          </div>
          <h2 className="text-5xl font-serif text-white leading-tight mb-6">
            Connecting London's <br/> finest <span className="text-amber-500 italic">specialists</span> with the pets they love.
          </h2>
          <p className="text-slate-400 max-w-md font-light text-lg">
            Join the elite network of veterinary excellence serving the Royal Boroughs.
          </p>
        </div>

        <div className="relative z-10 flex gap-12">
          <div>
            <p className="text-3xl font-bold text-white mb-1">500+</p>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Verified Vets</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white mb-1">24/7</p>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Clinical Support</p>
          </div>
        </div>
      </div>

      {/* Right Column: Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-24 bg-slate-50/30">
        <div className="max-w-md w-full">
          <div className="mb-10 text-center md:text-left">
            <h3 className="text-3xl font-serif text-slate-900 mb-2">
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </h3>
            <p className="text-slate-500 text-sm">
              {isSignUp ? 'Start your journey with elevated pet care.' : 'Please enter your credentials to continue.'}
            </p>
          </div>

          <div className="flex p-1 bg-white rounded-2xl border border-slate-100 shadow-sm mb-8">
            <button 
              onClick={() => setRole('owner')}
              className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${role === 'owner' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Pet Owner
            </button>
            <button 
              onClick={() => setRole('vet')}
              className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${role === 'vet' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Specialist Vet
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-amber-500 transition-colors font-medium text-slate-900 shadow-sm"
                  placeholder="e.g. Sarah Jenkins"
                />
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-amber-500 transition-colors font-medium text-slate-900 shadow-sm"
                placeholder="name@example.com"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
                {!isSignUp && <button type="button" className="text-[9px] font-bold text-amber-600 uppercase">Forgot?</button>}
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-amber-500 transition-colors font-medium text-slate-900 shadow-sm"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold shadow-2xl hover:bg-amber-500 transition-all transform active:scale-95 mt-4"
            >
              {isSignUp ? 'Create Specialist Account' : 'Sign In to Portal'}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-400 text-sm">
              {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}
              <button 
                onClick={() => setIsSignUp(!isSignUp)}
                className="ml-2 text-slate-900 font-bold hover:text-amber-600 transition-colors"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
            
            <button 
              onClick={onCancel}
              className="mt-8 text-[10px] font-bold text-slate-300 uppercase tracking-widest hover:text-slate-500 transition-colors"
            >
              Back to veterinary.london
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
