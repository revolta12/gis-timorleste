import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MAP_CONFIG } from '../utils/mapConfig';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { TaisPattern, BenderaStrip, MountainSilhouette, CoastalWave } from '../components/TimorLesteMotif';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const FALLBACK_IMAGE = 'https://placehold.co/400x240/1a1d27/3b82f6?text=Minist%C3%A9riu';

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: mapData, isLoading: mapLoading } = useQuery({
    queryKey: ['ministries-map'],
    queryFn: async () => {
      const res = await api.get('/ministries/map');
      return res.data.data;
    }
  });

  const { data: ministriesData, isLoading: ministriesLoading } = useQuery({
    queryKey: ['ministries-home', searchTerm],
    queryFn: async () => {
      const params = { limit: 6 };
      if (searchTerm) params.search = searchTerm;
      const res = await api.get('/ministries', { params });
      return res.data.data;
    }
  });

  return (
    <div className="bg-primary min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <TaisPattern />
        <MountainSilhouette />
        <CoastalWave />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Bendera Strip Top */}
          <div className="flex justify-center mb-6">
            <div className="flex h-1 w-32 rounded-full overflow-hidden">
              <div className="flex-1 bg-tl-red"></div>
              <div className="flex-1 bg-tl-yellow"></div>
              <div className="flex-1 bg-tl-black"></div>
            </div>
          </div>

          {/* Logo Tanpa Border */}
          <div className="flex justify-center mb-6">
            <img
              src="/logo-timor-leste.webp"
              alt="Logo Timor-Leste"
              className="w-28 h-28 object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/112x112/FF0000/FFD700?text=TL';
              }}
            />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Sistema Informasaun Lokalizasaun
            <span className="text-tl-yellow block drop-shadow-md mt-2">Ministériu Timor-Leste</span>
          </h1>

          <p className="text-xl text-gray-200 mb-8 drop-shadow max-w-2xl mx-auto">
            Hetan lokál no informasaun ministériu sira ho interativu no fasil
          </p>

          {/* Bendera Strip Bottom */}
          <div className="flex justify-center mb-8">
            <div className="flex h-1 w-48 rounded-full overflow-hidden">
              <div className="flex-1 bg-tl-red"></div>
              <div className="flex-1 bg-tl-yellow"></div>
              <div className="flex-1 bg-tl-black"></div>
              <div className="flex-1 bg-tl-red"></div>
              <div className="flex-1 bg-tl-yellow"></div>
            </div>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <Button to="/map" variant="primary" size="lg">
              🗺️ Haree Mapa
            </Button>
            <Button to="/ministries" variant="outline" size="lg">
              📋 Eksplora Ministériu
            </Button>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-1 w-32 rounded-full overflow-hidden mx-auto my-4">
        <div className="flex h-full">
          <div className="flex-1 bg-tl-red"></div>
          <div className="flex-1 bg-tl-yellow"></div>
          <div className="flex-1 bg-tl-black"></div>
        </div>
      </div>

      {/* Map Preview Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Visualiza Mapa</h2>
            <p className="text-text-secondary text-sm">Satélite view - Timor-Leste</p>
          </div>
          <Button to="/map" variant="outline" size="sm">
            Haree Mapa Kompletu →
          </Button>
        </div>
        <div className="rounded-xl overflow-hidden shadow-2xl border border-border">
          {mapLoading ? (
            <div className="h-[380px] flex items-center justify-center bg-secondary">
              <LoadingSpinner />
            </div>
          ) : (
            <MapContainer
              center={[-8.55, 125.57]}
              zoom={9}
              style={{ height: '380px', width: '100%' }}
              scrollWheelZoom={false}
            >
              <TileLayer
                url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
                attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
                maxZoom={MAP_CONFIG.MAX_ZOOM}
                maxNativeZoom={22}
              />
              {mapData?.map((ministry) => (
                <Marker
                  key={ministry.id}
                  position={[ministry.latitude, ministry.longitude]}
                >
                  <Popup>
                    <div className="text-center">
                      <img
                        src={ministry.photo || FALLBACK_IMAGE}
                        alt={ministry.name}
                        className="w-32 h-20 object-cover rounded mb-2"
                      />
                      <strong className="text-sm">{ministry.name}</strong>
                      <p className="text-xs text-gray-500">{ministry.Category?.name}</p>
                      <Link
                        to={`/ministries/${ministry.id}`}
                        className="text-accent text-xs block mt-1"
                      >
                        Haree Detallu →
                      </Link>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
      </section>

      {/* Divider */}
      <div className="h-1 w-48 rounded-full overflow-hidden mx-auto my-4">
        <div className="flex h-full">
          <div className="flex-1 bg-tl-red"></div>
          <div className="flex-1 bg-tl-yellow"></div>
          <div className="flex-1 bg-tl-black"></div>
          <div className="flex-1 bg-tl-red"></div>
          <div className="flex-1 bg-tl-yellow"></div>
        </div>
      </div>

      {/* Ministry Grid Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h2 className="text-2xl font-bold text-white">Ministériu Sira</h2>
          <input
            type="text"
            placeholder="Buka ministériu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 bg-secondary border border-border rounded-lg text-white placeholder-text-muted focus:outline-none focus:border-red-500 transition w-64"
          />
        </div>

        {ministriesLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ministriesData?.ministries?.map((ministry) => (
              <div key={ministry.id} className="bg-card rounded-xl overflow-hidden hover:bg-hover transition border border-border">
                <img
                  src={ministry.photo || FALLBACK_IMAGE}
                  alt={ministry.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = FALLBACK_IMAGE;
                  }}
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-1">{ministry.name}</h3>
                  <p className="text-text-secondary text-sm mb-2 line-clamp-2">
                    {ministry.description || 'La iha deskrisaun.'}
                  </p>
                  {ministry.website && (
                    <a
                      href={ministry.website.startsWith('http') ? ministry.website : `https://${ministry.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-accent text-xs mb-2 hover:underline"
                    >
                      🌐 {ministry.website.length > 30 ? ministry.website.substring(0, 30) + '...' : ministry.website}
                    </a>
                  )}
                  <div className="flex gap-2 mt-2">
                    <Button to={`/ministries/${ministry.id}`} variant="primary" size="sm" fullWidth>
                      Haree Detallu
                    </Button>
                    <Button
                      href={`https://www.google.com/maps/dir/?api=1&destination=${ministry.latitude},${ministry.longitude}`}
                      variant="outline"
                      size="sm"
                    >
                      Rota
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {ministriesData && ministriesData.total > 6 && (
          <div className="text-center mt-8">
            <Button to="/ministries" variant="outline">
              Haree Hotu ({ministriesData.total}) →
            </Button>
          </div>
        )}
      </section>

      <BenderaStrip className="mt-8" />
      <Footer />
    </div>
  );
}

export default HomePage;