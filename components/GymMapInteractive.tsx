'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}

// Add custom styles for popup z-index
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    .leaflet-popup {
      z-index: 9999 !important;
    }
    .leaflet-popup-content-wrapper {
      z-index: 9999 !important;
    }
    .leaflet-popup-pane {
      z-index: 9999 !important;
    }
  `;
  document.head.appendChild(style);
}

interface Gym {
  id: string;
  name: string;
  address: string;
  district: string;
  latitude: number;
  longitude: number;
  rating: number;
  reviews: number;
}

interface GymMapInteractiveProps {
  gyms: Gym[];
  onGymClick: (gym: Gym) => void;
}

export default function GymMapInteractive({ gyms, onGymClick }: GymMapInteractiveProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <MapContainer
      center={[47.9196, 106.9176]}
      zoom={13}
      className="h-full w-full"
      style={{ background: '#0B0B0B', zIndex: 1 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      
      {gyms.map((gym) => (
        <Marker
          key={gym.id}
          position={[gym.latitude, gym.longitude]}
          eventHandlers={{
            click: () => onGymClick(gym),
          }}
        >
          <Popup className="custom-popup">
            <div className="bg-[#1A1A1A] text-white p-4 rounded-xl min-w-[280px] z-[9999]">
              <h3 className="font-bold text-lg mb-2">{gym.name}</h3>
              <p className="text-yellow-400 text-sm mb-2">★ {gym.rating} ({gym.reviews} reviews)</p>
              <p className="text-white/60 text-sm">{gym.address}</p>
              <p className="text-[#D4FF00] text-xs mt-2">{gym.district} District</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
