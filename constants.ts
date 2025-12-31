
import { Vet, PetRecord, Appointment } from './types';

export const LONDON_BOROUGHS = [
  "Kensington & Chelsea",
  "Westminster",
  "Hackney",
  "Islington",
  "Camden",
  "Richmond",
  "Greenwich",
  "Southwark",
  "Hammersmith & Fulham",
  "Lambeth"
];

export const PET_TYPES = ["Dog", "Cat", "Rabbit", "Exotic", "Horse"];

const SPECIALTIES = [
  "Small Animal Internal Medicine",
  "Emergency & Critical Care",
  "Senior Pet Specialist",
  "Orthopedic Surgery",
  "Feline Medicine",
  "Exotic Pet Specialist",
  "Dermatology",
  "Ophthalmology"
];

const NAMES = [
  "Dr. Sarah Kensington", "Dr. Mark Thorne", "Dr. James Mayfair", "Dr. Elena Southwark",
  "Dr. William Richmond", "Dr. Amara Greenwich", "Dr. Thomas Islington", "Dr. Olivia Camden",
  "Dr. Henry Fulham", "Dr. Sofia Lambeth", "Dr. Arthur Westminster", "Dr. Chloe Hackney",
  "Dr. Julian Chelsea", "Dr. Beatrice Marylebone", "Dr. Jasper Putney", "Dr. Imogen Dulwich",
  "Dr. Sebastian Hampstead", "Dr. Clara Belgravia", "Dr. Felix Brixton", "Dr. Maeva Shoreditch"
];

const VET_IMAGE_IDS = [
  "photo-1612349317150-e413f6a5b16d",
  "photo-1559839734-2b71f1536783",
  "photo-1594824476967-48c8b964273f",
  "photo-1622253692010-333f2da6031d",
  "photo-1628033036937-299066661453",
  "photo-1537368910025-700350fe46c7",
  "photo-1623854767233-24383aa9a6bb",
  "photo-1584467541268-b040f83be3fd"
];

export const getInitials = (name: string) => {
  return name
    .split(' ')
    .filter(n => !['dr', 'dr.'].includes(n.toLowerCase()))
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const MOCK_VETS: Vet[] = NAMES.map((name, i) => ({
  id: `v${i + 1}`,
  name,
  specialty: SPECIALTIES[i % SPECIALTIES.length],
  borough: LONDON_BOROUGHS[i % LONDON_BOROUGHS.length],
  rating: parseFloat((4.5 + Math.random() * 0.5).toFixed(1)),
  reviewCount: Math.floor(Math.random() * 200) + 20,
  imageUrl: `https://images.unsplash.com/${VET_IMAGE_IDS[i % VET_IMAGE_IDS.length]}?auto=format&fit=crop&q=80&w=400&h=400`,
  price: 50 + (Math.floor(Math.random() * 10) * 10),
  bio: "Expert clinician with over 15 years experience in urban veterinary medicine. Dedicated to compassionate care and evidence-based diagnostics.",
  education: ["Royal Veterinary College", "University of Cambridge - DVM"],
  languages: ["English", i % 3 === 0 ? "French" : "Spanish"]
}));

export const FEATURED_VETS = MOCK_VETS.slice(0, 8);

export const MOCK_PET: PetRecord = {
  id: "p1",
  name: "Buster",
  type: "Dog",
  breed: "Cavalier King Charles Spaniel",
  age: 4,
  weight: "8.5kg",
  gender: "Male",
  neutered: true,
  healthScore: 88,
  dailyCalories: 650,
  imageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400&h=400",
  vaccinations: [
    { name: "Rabies", date: "2023-10-12", status: 'Up-to-date' },
    { name: "DHPP", date: "2023-11-05", status: 'Up-to-date' },
    { name: "Leptospirosis", date: "2024-02-15", status: 'Up-to-date' },
    { name: "Kennel Cough", date: "2024-09-01", status: 'Due' }
  ],
  consultations: [
    {
      id: "c1",
      date: "2024-03-01",
      petName: "Buster",
      vetName: "Dr. Sarah Kensington",
      summary: "Annual wellness checkup. Heart sounds normal. Suggested mild diet adjustment.",
      notes: "Owner reports slight lethargy in mornings.",
      prescription: "Pro-biotic supplements 1x daily",
      type: 'Clinic'
    },
    {
      id: "c2",
      date: "2023-12-15",
      petName: "Buster",
      vetName: "Dr. Mark Thorne",
      summary: "Ear infection treatment. Cleaned and treated with antibiotic drops.",
      prescription: "Ototopical drops - 2 drops per ear",
      type: 'Video'
    }
  ]
};

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "a1",
    vetId: "v1",
    vetName: "Dr. Sarah Kensington",
    vetImageUrl: MOCK_VETS[0].imageUrl,
    petName: "Buster",
    date: "Tue 16 Oct",
    time: "10:20",
    status: 'upcoming',
    price: 80
  }
];
