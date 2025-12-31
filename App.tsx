
import React, { useState } from 'react';
import { ViewState, Appointment, Vet, User } from './types';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { TriageBot } from './pages/TriageBot';
import { BookingFlow } from './pages/BookingFlow';
import { PetDashboard } from './pages/PetDashboard';
import { VideoConsultation } from './pages/VideoConsultation';
import { SearchPage } from './pages/SearchPage';
import { VetDashboard } from './pages/VetDashboard';
import { AuthPage } from './pages/AuthPage';
import { AboutPage, VetOnboardingPage, HelpPage, EmergencyPage, PharmaciesPage } from './pages/InformationPages';
import { INITIAL_APPOINTMENTS, MOCK_VETS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [selectedVet, setSelectedVet] = useState<Vet>(MOCK_VETS[0]);

  const handleSearch = (borough: string, petType: string) => {
    setView('search'); 
  };

  const handleBook = (vet: Vet, date: string, time: string) => {
    if (!user) {
      setView('auth');
      return;
    }
    const newAppointment: Appointment = {
      id: `a${Date.now()}`,
      vetId: vet.id,
      vetName: vet.name,
      vetImageUrl: vet.imageUrl,
      petName: "Buster",
      date,
      time,
      status: 'upcoming',
      price: vet.price
    };
    setAppointments([newAppointment, ...appointments]);
    setView('owner-dash');
  };

  const handleVetSelection = (vet: Vet) => {
    setSelectedVet(vet);
    if (!user) {
      setView('auth');
    } else {
      setView('booking');
    }
  };

  const handleLogin = (u: User) => {
    setUser(u);
    setView(u.role === 'owner' ? 'owner-dash' : 'vet-dash');
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
  };

  const navigateProtected = (target: ViewState) => {
    if (!user) {
      setView('auth');
    } else {
      // Logic for role based routing
      if (target === 'owner-dash' && user.role !== 'owner') {
        setView('vet-dash');
      } else if (target === 'vet-dash' && user.role !== 'vet') {
        setView('owner-dash');
      } else {
        setView(target);
      }
    }
  };

  const renderView = () => {
    switch (view) {
      case 'landing':
        return <LandingPage onSearch={handleSearch} onViewChange={setView} />;
      case 'auth':
        return <AuthPage onLogin={handleLogin} onCancel={() => setView('landing')} />;
      case 'search':
        return <SearchPage onViewChange={setView} onSelectVet={handleVetSelection} />;
      case 'triage':
        return <TriageBot onViewChange={setView} />;
      case 'booking':
        return (
          <BookingFlow 
            vet={selectedVet}
            onComplete={(date, time) => handleBook(selectedVet, date, time)} 
            onViewChange={setView} 
          />
        );
      case 'owner-dash':
        return <PetDashboard appointments={appointments} />;
      case 'vet-dash':
        return <VetDashboard appointments={appointments} onLaunchConsult={() => setView('consult')} />;
      case 'consult':
        return <VideoConsultation onEnd={() => setView(user?.role === 'owner' ? 'owner-dash' : 'vet-dash')} />;
      case 'about':
        return <AboutPage />;
      case 'vet-onboarding':
        return <VetOnboardingPage />;
      case 'help':
        return <HelpPage />;
      case 'emergency':
        return <EmergencyPage />;
      case 'pharmacies':
        return <PharmaciesPage />;
      default:
        return <LandingPage onSearch={handleSearch} onViewChange={setView} />;
    }
  };

  return (
    <Layout 
      activeView={view} 
      onViewChange={setView} 
      user={user}
      onLogout={handleLogout}
      onNavigateProtected={navigateProtected}
    >
      {renderView()}
    </Layout>
  );
};

export default App;
