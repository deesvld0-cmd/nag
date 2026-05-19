'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import the interactive map to avoid SSR issues
const GymMapInteractive = dynamic(() => import('./GymMapInteractive'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-[#111111]">
      <div className="text-white/50">Loading map...</div>
    </div>
  )
});

interface Gym {
  id: string;
  name: string;
  address: string;
  district: string;
  latitude: number;
  longitude: number;
  phone?: string;
  rating: number;
  reviews: number;
  image?: string;
  amenities?: string[];
  tags?: string[];
  isFeatured?: boolean;
  website?: string;
}

const gyms: Gym[] = [
  {
    id: '1',
    name: 'Kempinski Hotel Fitness',
    address: 'Olympic Street 2, Sukhbaatar District, Ulaanbaatar',
    district: 'Sukhbaatar',
    latitude: 47.9196,
    longitude: 106.9176,
    phone: '+976 11 330 999',
    rating: 4.8,
    reviews: 156,
    image: 'https://images.pexels.com/photos/1534438/pexels-photo-1534438.jpeg?auto=compress&cs=tinysrgb&w=800',
    amenities: ['Swimming Pool', 'Sauna', 'Spa', 'Personal Training', 'Group Classes'],
    tags: ['Luxury', 'Hotel Gym', 'Full Service', 'Spa'],
    isFeatured: true,
    website: 'https://kempinski.com'
  },
  {
    id: '2',
    name: 'World Class Fitness',
    address: 'Peace Avenue 15, Bayangol District, Ulaanbaatar',
    district: 'Bayangol',
    latitude: 47.9184,
    longitude: 106.9055,
    phone: '+976 11 322 222',
    rating: 4.9,
    reviews: 234,
    image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800',
    amenities: ['Cardio Equipment', 'Free Weights', 'Personal Training', 'CrossFit Zone'],
    tags: ['Premium', 'CrossFit', 'Personal Training'],
    isFeatured: true,
    website: 'https://worldclass.mn'
  },
  {
    id: '3',
    name: 'Fit Zone',
    address: 'Enkh Taivny Orgon 14, Khan-Uul District, Ulaanbaatar',
    district: 'Khan-Uul',
    latitude: 47.9152,
    longitude: 106.9234,
    phone: '+976 11 323 333',
    rating: 4.6,
    reviews: 189,
    image: 'https://images.pexels.com/photos/4162585/pexels-photo-4162585.jpeg?auto=compress&cs=tinysrgb&w=800',
    amenities: ['Cardio Equipment', 'Free Weights', 'Group Classes', 'Personal Training'],
    tags: ['Affordable', 'Group Classes', 'Cardio'],
    isFeatured: false,
    website: 'https://fitzone.mn'
  },
  {
    id: '4',
    name: 'Iron Gym',
    address: 'Baga Toiruu 4, Chingeltei District, Ulaanbaatar',
    district: 'Chingeltei',
    latitude: 47.9245,
    longitude: 106.9087,
    phone: '+976 11 324 444',
    rating: 4.7,
    reviews: 178,
    image: 'https://images.pexels.com/photos/1756959/pexels-photo-1756959.jpeg?auto=compress&cs=tinysrgb&w=800',
    amenities: ['Cardio Equipment', 'Free Weights', 'Personal Training', 'Sauna'],
    tags: ['Premium', 'Bodybuilding', 'Cardio'],
    isFeatured: true,
    website: 'https://irongym.mn'
  },
  {
    id: '5',
    name: 'MMA Mongolia',
    address: 'Narny Zam Road 8, Sukhbaatar District, Ulaanbaatar',
    district: 'Sukhbaatar',
    latitude: 47.9212,
    longitude: 106.9156,
    phone: '+976 11 325 555',
    rating: 4.8,
    reviews: 267,
    image: 'https://images.pexels.com/photos/1534438/pexels-photo-1534438.jpeg?auto=compress&cs=tinysrgb&w=800',
    amenities: ['MMA Training', 'Boxing Ring', 'Cardio Equipment', 'Free Weights'],
    tags: ['MMA', 'Boxing', 'Combat Sports'],
    isFeatured: true,
    website: 'https://mmamongolia.mn'
  },
  {
    id: '6',
    name: 'Sky Wellness',
    address: 'Sky Tower Building, Peace Avenue 25, Sukhbaatar District, Ulaanbaatar',
    district: 'Sukhbaatar',
    latitude: 47.9201,
    longitude: 106.9198,
    phone: '+976 11 328 888',
    rating: 4.9,
    reviews: 289,
    image: 'https://images.pexels.com/photos/1756959/pexels-photo-1756959.jpeg?auto=compress&cs=tinysrgb&w=800',
    amenities: ['Swimming Pool', 'Sauna', 'Spa', 'Personal Training', 'Rooftop Terrace'],
    tags: ['Luxury', 'Rooftop', 'Premium'],
    isFeatured: true,
    website: 'https://skywellness.mn'
  },
  {
    id: '7',
    name: 'Fitness Palace',
    address: 'Juulchin Street 3, Bayangol District, Ulaanbaatar',
    district: 'Bayangol',
    latitude: 47.9108,
    longitude: 106.9102,
    phone: '+976 11 326 666',
    rating: 4.7,
    reviews: 312,
    image: 'https://images.pexels.com/photos/1534438/pexels-photo-1534438.jpeg?auto=compress&cs=tinysrgb&w=800',
    amenities: ['Cardio Equipment', 'Free Weights', 'Personal Training', 'Group Classes', 'Yoga'],
    tags: ['International', 'Premium', 'Full Service'],
    isFeatured: true,
    website: 'https://fitnesspalace.mn'
  },
  {
    id: '8',
    name: 'Body Fit',
    address: 'Sansar Tower 5, Khan-Uul District, Ulaanbaatar',
    district: 'Khan-Uul',
    latitude: 47.9125,
    longitude: 106.9189,
    phone: '+976 11 327 777',
    rating: 4.5,
    reviews: 145,
    image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800',
    amenities: ['Cardio Equipment', 'Free Weights', 'Personal Training'],
    tags: ['Affordable', 'Basic', 'Strength Training'],
    isFeatured: false,
    website: 'https://bodyfit.mn'
  },
  {
    id: '9',
    name: 'Power House Gym',
    address: 'Narantuul Market Road, Songinokhairkhan District, Ulaanbaatar',
    district: 'Songinokhairkhan',
    latitude: 47.9056,
    longitude: 106.8954,
    phone: '+976 11 329 999',
    rating: 4.4,
    reviews: 98,
    image: 'https://images.pexels.com/photos/4162585/pexels-photo-4162585.jpeg?auto=compress&cs=tinysrgb&w=800',
    amenities: ['Free Weights', 'Cardio Equipment', 'Powerlifting'],
    tags: ['Strength', 'Powerlifting', 'Budget'],
    isFeatured: false,
    website: 'https://powerhouse.mn'
  },
  {
    id: '10',
    name: 'Ladies Fitness',
    address: 'Peace Avenue 42, Sukhbaatar District, Ulaanbaatar',
    district: 'Sukhbaatar',
    latitude: 47.9231,
    longitude: 106.9223,
    phone: '+976 11 330 000',
    rating: 4.8,
    reviews: 203,
    image: 'https://images.pexels.com/photos/1756959/pexels-photo-1756959.jpeg?auto=compress&cs=tinysrgb&w=800',
    amenities: ['Cardio Equipment', 'Yoga', 'Pilates', 'Spa', 'Personal Training'],
    tags: ['Women Only', 'Wellness', 'Yoga'],
    isFeatured: true,
    website: 'https://ladiesfitness.mn'
  },
  {
    id: '11',
    name: 'CrossFit 47',
    address: 'Industrial Zone Road 8, Bayangol District, Ulaanbaatar',
    district: 'Bayangol',
    latitude: 47.9089,
    longitude: 106.8998,
    phone: '+976 11 331 111',
    rating: 4.9,
    reviews: 189,
    image: 'https://images.pexels.com/photos/1534438/pexels-photo-1534438.jpeg?auto=compress&cs=tinysrgb&w=800',
    amenities: ['CrossFit Equipment', 'Functional Training', 'Personal Training', 'Group Classes'],
    tags: ['CrossFit', 'Functional Training', 'High Intensity'],
    isFeatured: true,
    website: 'https://crossfit47.mn'
  },
  {
    id: '12',
    name: 'Erdenet Sports Complex',
    address: 'Khan-Uul Street 15, Erdenet City',
    district: 'Erdenet',
    latitude: 49.0278,
    longitude: 104.9097,
    phone: '+976 13 322 222',
    rating: 4.6,
    reviews: 87,
    image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800',
    amenities: ['Cardio Equipment', 'Free Weights', 'Personal Training', 'Sauna'],
    tags: ['Regional', 'Full Service', 'Affordable'],
    isFeatured: false,
    website: 'https://erdenetsports.mn'
  },
  {
    id: '13',
    name: 'Darkhan Fitness Center',
    address: 'Sukhbaatar Street 22, Darkhan City',
    district: 'Darkhan',
    latitude: 49.4628,
    longitude: 105.9333,
    phone: '+976 13 333 444',
    rating: 4.5,
    reviews: 65,
    image: 'https://images.pexels.com/photos/4162585/pexels-photo-4162585.jpeg?auto=compress&cs=tinysrgb&w=800',
    amenities: ['Cardio Equipment', 'Free Weights', 'Personal Training'],
    tags: ['Regional', 'Basic', 'Strength Training'],
    isFeatured: false,
    website: 'https://darkhanfitness.mn'
  },
  {
    id: '14',
    name: 'Dornod Sports Club',
    address: 'Central Square 5, Choibalsan City',
    district: 'Dornod',
    latitude: 48.0647,
    longitude: 114.5336,
    phone: '+976 13 444 555',
    rating: 4.4,
    reviews: 42,
    image: 'https://images.pexels.com/photos/1756959/pexels-photo-1756959.jpeg?auto=compress&cs=tinysrgb&w=800',
    amenities: ['Cardio Equipment', 'Free Weights', 'Group Classes'],
    tags: ['Regional', 'Community', 'Budget'],
    isFeatured: false,
    website: 'https://dornodsports.mn'
  },
  {
    id: '15',
    name: 'Gobi Wellness Center',
    address: 'Main Street 8, Dalanzadgad City',
    district: 'Umnugovi',
    latitude: 43.5847,
    longitude: 104.4442,
    phone: '+976 13 555 666',
    rating: 4.3,
    reviews: 38,
    image: 'https://images.pexels.com/photos/1534438/pexels-photo-1534438.jpeg?auto=compress&cs=tinysrgb&w=800',
    amenities: ['Cardio Equipment', 'Free Weights', 'Personal Training'],
    tags: ['Regional', 'Desert', 'Adventure'],
    isFeatured: false,
    website: 'https://gobiwellness.mn'
  }
];

export default function GymMap() {
  const [selectedGym, setSelectedGym] = useState<Gym | null>(null);

  const handleGetDirections = (gym: Gym) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${gym.latitude},${gym.longitude}`;
    window.open(url, '_blank');
  };

  return (
    <section className="relative py-32 bg-[#0B0B0B] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-bebas text-[clamp(40px,6vw,80px)] leading-none text-white mb-4">
            MONGOLIA FITNESS
            <br />
            <span className="gradient-text">GYM LOCATOR</span>
          </h2>
          <p className="text-white/40 max-w-md mx-auto">
            Discover premium fitness centers across Mongolia.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Map */}
          <div className="h-[380px] sm:h-[520px] lg:h-[600px] relative rounded-2xl overflow-hidden border border-white/10 bg-[#111111]">
            <GymMapInteractive gyms={gyms} onGymClick={setSelectedGym} />
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-xl p-4 border border-white/10 pointer-events-none">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <MapPin className="w-4 h-4 text-[#D4FF00]" />
                <span>{gyms.length} gyms in Ulaanbaatar</span>
              </div>
            </div>
          </div>

          {/* Gym List */}
          <div className="h-[420px] sm:h-[520px] lg:h-[600px] overflow-y-auto space-y-4 pr-2">
            {gyms.map((gym) => (
              <div
                key={gym.id}
                onClick={() => setSelectedGym(gym)}
                className={`relative bg-gradient-to-br from-[#111111] to-[#0A0A0A] border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${selectedGym?.id === gym.id ? 'border-[#D4FF00]/50 shadow-[0_0_30px_rgba(212,255,0,0.2)]' : 'border-white/10 hover:border-[#D4FF00]/30'}`}
              >
                {gym.isFeatured && (
                  <div className="absolute top-3 right-3 z-10">
                    <div className="bg-[#D4FF00] text-black text-xs font-bold px-3 py-1 rounded-full">
                      Featured
                    </div>
                  </div>
                )}

                <div className="relative h-40 overflow-hidden">
                  <img
                    src={gym.image}
                    alt={gym.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <span className="text-[#D4FF00] text-sm font-semibold">★ {gym.rating}</span>
                    <span className="text-white/50 text-xs">({gym.reviews})</span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bebas text-xl text-white mb-1">{gym.name}</h3>
                  <p className="text-white/50 text-sm mb-2">{gym.district} District</p>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-3 h-3 text-[#D4FF00]" />
                    <p className="text-white/60 text-xs">{gym.address}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGetDirections(gym);
                    }}
                    className="w-full bg-[#D4FF00] text-black font-bold py-2 rounded-lg text-xs hover:bg-[#D4FF00]/90 transition-colors"
                  >
                    Get Directions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gym Detail Modal */}
        {selectedGym && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedGym(null)}
          >
            <div
              className="relative w-full max-w-2xl bg-[#0B0B0B] border border-[#D4FF00]/20 rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedGym(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white"
              >
                ✕
              </button>

              <div className="relative h-64 overflow-hidden">
                <img
                  src={selectedGym.image}
                  alt={selectedGym.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent" />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="font-bebas text-3xl text-white mb-1">{selectedGym.name}</h2>
                    <p className="text-[#D4FF00] text-sm">{selectedGym.district} District</p>
                  </div>
                  <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <span className="text-[#D4FF00] font-bold">★ {selectedGym.rating}</span>
                    <span className="text-white/50 text-sm">({selectedGym.reviews})</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-[#D4FF00]" />
                  <p className="text-white/60 text-sm">{selectedGym.address}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedGym.tags?.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-white/5 text-white/50 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mb-4">
                  <p className="text-white font-semibold text-sm mb-2">Amenities</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedGym.amenities?.map((amenity) => (
                      <span key={amenity} className="px-2 py-1 bg-[#D4FF00]/10 text-[#D4FF00] text-xs rounded-full">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleGetDirections(selectedGym)}
                    className="flex-1 bg-[#D4FF00] text-black font-bold py-3 rounded-xl hover:bg-[#D4FF00]/90 transition-colors"
                  >
                    Get Directions
                  </button>
                  {selectedGym.phone && (
                    <a
                      href={`tel:${selectedGym.phone}`}
                      className="px-6 py-3 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-colors"
                    >
                      Call
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
