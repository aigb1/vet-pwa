
export type Urgency = 'Green' | 'Yellow' | 'Red';
export type UserRole = 'owner' | 'vet';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Vet {
  id: string;
  name: string;
  specialty: string;
  borough: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  price: number;
  bio?: string;
  education?: string[];
  languages?: string[];
}

export interface Appointment {
  id: string;
  vetId: string;
  vetName: string;
  vetImageUrl: string;
  petName: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  price: number;
}

export interface Consultation {
  id: string;
  date: string;
  petName: string;
  vetName: string;
  summary: string;
  notes?: string;
  prescription?: string;
  type: 'Video' | 'Clinic';
}

export interface PetRecord {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: number;
  weight: string;
  gender: 'Male' | 'Female';
  neutered: boolean;
  vaccinations: Array<{ name: string; date: string; status: 'Up-to-date' | 'Due' }>;
  consultations: Consultation[];
  healthScore: number;
  dailyCalories: number;
  imageUrl?: string;
}

export type ViewState = 'landing' | 'owner-dash' | 'vet-dash' | 'triage' | 'booking' | 'consult' | 'search' | 'auth' | 'about' | 'vet-onboarding' | 'help' | 'emergency' | 'pharmacies';
