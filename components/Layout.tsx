
import React, { useState } from 'react';
import { ViewState, User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewState;
  onViewChange: (view: ViewState) => void;
  user: User | null;
  onLogout: () => void;
  onNavigateProtected: (view: ViewState) => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeView, 
  onViewChange, 
  user,
  onLogout,
  onNavigateProtected
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLinks = ({ mobile = false }) => (
    <>
      <button 
        onClick={() => { onViewChange('search'); if(mobile) setIsMobileMenuOpen(false); }}
        className={`${activeView === 'search' ? 'text-amber-600' : 'hover:text-slate-900'} transition-colors ${mobile ? 'text-2xl font-serif py-4 border-b border-slate-50 w-full text-left' : ''}`}
      >
        Search Vets
      </button>
      
      {user && (
        <button 
          onClick={() => { onNavigateProtected(user?.role === 'vet' ? 'vet-dash' : 'owner-dash'); if(mobile) setIsMobileMenuOpen(false); }}
          className={`${activeView === 'owner-dash' || activeView === 'vet-dash' ? 'text-amber-600' : 'hover:text-slate-900'} transition-colors ${mobile ? 'text-2xl font-serif py-4 border-b border-slate-50 w-full text-left' : ''}`}
        >
          Dashboard
        </button>
      )}

      <button 
        onClick={() => { onViewChange('triage'); if(mobile) setIsMobileMenuOpen(false); }}
        className={`${activeView === 'triage' ? 'text-amber-600' : 'hover:text-slate-900'} transition-colors ${mobile ? 'text-2xl font-serif py-4 border-b border-slate-50 w-full text-left' : ''}`}
      >
        AI Triage
      </button>

      {mobile && (
        <>
          <button 
            onClick={() => { onViewChange('emergency'); if(mobile) setIsMobileMenuOpen(false); }}
            className={`text-rose-600 hover:text-rose-700 transition-colors ${mobile ? 'text-2xl font-serif py-4 border-b border-slate-50 w-full text-left' : ''}`}
          >
            Emergency
          </button>
          {!user && (
            <button 
              onClick={() => { onViewChange('auth'); if(mobile) setIsMobileMenuOpen(false); }}
              className={`text-slate-900 transition-colors ${mobile ? 'text-2xl font-serif py-4 w-full text-left' : ''}`}
            >
              Sign In
            </button>
          )}
        </>
      )}
    </>
  );

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <header className="bg-white/80 backdrop-blur-md text-slate-900 border-b border-slate-100 sticky top-0 z-[100]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => onViewChange('landing')}
          >
            <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center mr-3 group-hover:bg-amber-500 transition-colors duration-300">
              <span className="font-serif text-xl font-bold text-white">V</span>
            </div>
            <div>
              <h1 className="text-xl font-serif tracking-tight leading-none">veterinary.london</h1>
              <p className="text-[10px] uppercase tracking-widest text-amber-600 font-bold">Specialist Network</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10 text-sm font-bold uppercase tracking-widest text-slate-400">
            <NavLinks />
            <div className="h-4 w-px bg-slate-200"></div>

            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] ring-2 ring-transparent group-hover:ring-amber-500 transition-all">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-slate-900 font-bold text-[10px] tracking-widest">{user.name.split(' ')[0]}</span>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-4 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-2 border-b border-slate-50 mb-2">
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user.role === 'vet' ? 'Specialist' : 'Pet Owner'}</p>
                       <p className="text-xs font-bold text-slate-900 truncate">{user.email}</p>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-amber-600 transition-colors">Settings</button>
                    <button 
                      onClick={() => { onLogout(); setShowUserMenu(false); }}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => onViewChange('auth')}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-full hover:bg-amber-500 transition-all text-[10px]"
              >
                Sign In
              </button>
            )}
          </nav>

          {/* Mobile Hamburger Button */}
          <button 
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-900"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-white animate-in slide-in-from-right duration-300 md:hidden overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center mr-3">
                  <span className="font-serif text-xl font-bold text-white">V</span>
                </div>
                <h1 className="text-xl font-serif tracking-tight leading-none text-slate-900">veterinary.london</h1>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <nav className="flex flex-col items-start text-slate-600">
              <NavLinks mobile />
            </nav>

            {user && (
              <div className="mt-12 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white text-sm font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{user.name}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{user.role}</p>
                  </div>
                </div>
                <button 
                  onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}
                  className="w-full py-4 bg-white border border-rose-100 text-rose-600 font-bold rounded-2xl text-xs uppercase tracking-widest"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <main className="flex-grow">
        {children}
      </main>

      {/* Mobile Bottom Navigation Bar (PWA Style) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-xl border-t border-slate-100 flex items-center justify-around px-4 z-[90] safe-area-bottom">
        <button 
          onClick={() => onViewChange('landing')}
          className={`flex flex-col items-center gap-1 ${activeView === 'landing' ? 'text-amber-600' : 'text-slate-400'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          <span className="text-[9px] font-bold uppercase tracking-tighter">Home</span>
        </button>
        <button 
          onClick={() => onViewChange('search')}
          className={`flex flex-col items-center gap-1 ${activeView === 'search' ? 'text-amber-600' : 'text-slate-400'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <span className="text-[9px] font-bold uppercase tracking-tighter">Find Vet</span>
        </button>
        <button 
          onClick={() => onViewChange('triage')}
          className={`flex flex-col items-center gap-1 ${activeView === 'triage' ? 'text-amber-600' : 'text-slate-400'}`}
        >
          <div className="relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full"></div>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-tighter">Triage</span>
        </button>
        <button 
          onClick={() => onNavigateProtected(user?.role === 'vet' ? 'vet-dash' : 'owner-dash')}
          className={`flex flex-col items-center gap-1 ${activeView === 'owner-dash' || activeView === 'vet-dash' ? 'text-amber-600' : 'text-slate-400'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          <span className="text-[9px] font-bold uppercase tracking-tighter">My Pet</span>
        </button>
      </nav>

      <footer className="bg-white text-slate-400 py-16 border-t border-slate-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <h4 className="text-slate-900 font-serif text-2xl mb-4">veterinary.london</h4>
              <p className="text-slate-500 max-w-sm font-light">Dedicated to providing the highest quality veterinary care in London through innovative technology and a world-class network of specialists.</p>
              <button 
                onClick={() => onViewChange('about')}
                className="mt-6 text-[10px] font-bold text-amber-600 uppercase tracking-widest hover:text-amber-700 transition-colors border-b border-amber-600"
              >
                Our Story & Vision
              </button>
            </div>
            <div>
              <h5 className="text-slate-900 font-bold mb-4 uppercase tracking-widest text-xs">Platform</h5>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => onViewChange('search')} className="hover:text-amber-600 transition-colors">Search Vets</button></li>
                <li><button onClick={() => onViewChange('triage')} className="hover:text-amber-600 transition-colors">AI Triage</button></li>
                {user && <li><button onClick={() => onNavigateProtected('owner-dash')} className="hover:text-amber-600 transition-colors">Pet Dashboard</button></li>}
                <li><button onClick={() => onViewChange('vet-onboarding')} className="hover:text-amber-600 transition-colors font-bold text-slate-900">Join as Specialist</button></li>
              </ul>
            </div>
            <div>
              <h5 className="text-slate-900 font-bold mb-4 uppercase tracking-widest text-xs">Support</h5>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => onViewChange('help')} className="hover:text-amber-600 transition-colors">Help Center</button></li>
                <li><button onClick={() => onViewChange('emergency')} className="hover:text-rose-600 transition-colors">Emergency Care</button></li>
                <li><button onClick={() => onViewChange('pharmacies')} className="hover:text-amber-600 transition-colors">London Pharmacies</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] uppercase tracking-tighter">&copy; 2024 Veterinary.London. A member of the Royal Borough Healthcare Network.</p>
            <div className="flex space-x-6 text-[10px] uppercase font-bold tracking-widest text-slate-900">
              <a href="#" className="hover:text-amber-600">Privacy</a>
              <a href="#" className="hover:text-amber-600">Terms</a>
              <a href="#" className="hover:text-amber-600">Ethics</a>
            </div>
          </div>
        </div>
      </footer>
      <style>{`
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </div>
  );
};
