import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MAP_CONFIG } from '../utils/mapConfig';
import { Phone, Mail, Globe, MapPin, Calendar, Users, ArrowLeft } from 'lucide-react';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

const FALLBACK_IMAGE = 'https://placehold.co/600x400/1a1d27/3b82f6?text=Minist%C3%A9riu';

function MinistryDetail() {
  const { id } = useParams();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['ministry', id],
    queryFn: async () => { const res = await api.get(`/ministries/${id}`); return res.data.data; }
  });
  
  if (isLoading) {
    return (
      <div className="bg-primary min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center h-96"><LoadingSpinner size="lg" /></div>
        <Footer />
      </div>
    );
  }
  
  if (error || !data) {
    return (
      <div className="bg-primary min-h-screen">
        <Navbar />
        <div className="text-center py-20"><p className="text-accent-red">Ministériu la hetan!</p></div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="bg-primary min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/ministries" className="inline-flex items-center gap-2 text-text-secondary hover:text-accent mb-6">
          <ArrowLeft className="w-4 h-4" /> Kuda ba lista ministériu
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <img src={data.photo || FALLBACK_IMAGE} alt={data.name} className="w-full h-80 object-cover rounded-xl" />
            
            {/* Title & Category */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 rounded text-xs text-white" style={{ backgroundColor: data.Category?.color || '#3b82f6' }}>{data.Category?.name}</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">{data.name}</h1>
              <p className="text-text-muted text-sm">{data.city}, {data.district}</p>
            </div>
            
            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">Deskrisaun</h2>
              <p className="text-text-secondary leading-relaxed">{data.description}</p>
            </div>
            
            {/* Services */}
            {data.services && data.services.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">Servisu Sira</h2>
                <div className="flex flex-wrap gap-2">
                  {data.services.map((service, idx) => (
                    <span key={idx} className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">{service.service_name}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-card rounded-xl p-5 border border-border">
              <h3 className="text-lg font-semibold text-white mb-4">Informasaun Kontaktu</h3>
              <div className="space-y-3">
                {data.address && <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-accent mt-0.5" /><span className="text-text-secondary text-sm">{data.address}</span></div>}
                <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-accent mt-0.5" /><span className="text-text-secondary text-sm">{data.city}, {data.district}</span></div>
                {data.phone && <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-accent" /><a href={`tel:${data.phone}`} className="text-text-secondary hover:text-accent text-sm">{data.phone}</a></div>}
                {data.email && <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-accent" /><a href={`mailto:${data.email}`} className="text-text-secondary hover:text-accent text-sm">{data.email}</a></div>}
                {data.website && <div className="flex items-center gap-3"><Globe className="w-5 h-5 text-accent" /><a href={data.website.startsWith('http') ? data.website : `https://${data.website}`} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent text-sm">{data.website}</a></div>}
                <div className="flex items-center gap-3"><Calendar className="w-5 h-5 text-accent" /><span className="text-text-secondary text-sm">Fundasaun: {data.founded_year || 'N/A'}</span></div>
                <div className="flex items-center gap-3"><Users className="w-5 h-5 text-accent" /><span className="text-text-secondary text-sm">Ema servisu: {data.total_employees || 'N/A'}</span></div>
              </div>
            </div>
            
            {/* Map */}
            <div className="bg-card rounded-xl overflow-hidden border border-border">
              <h3 className="text-lg font-semibold text-white p-5 pb-0">Lokalizasaun</h3>
              <MapContainer center={[data.latitude, data.longitude]} zoom={14} style={{ height: '250px', width: '100%' }}>
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  maxZoom={MAP_CONFIG.MAX_ZOOM}
                  maxNativeZoom={22}
                />
                <Marker position={[data.latitude, data.longitude]}>
                  <Popup>{data.name}</Popup>
                </Marker>
              </MapContainer>
              <div className="p-4">
                <p className="text-text-muted text-xs mb-2">GPS Koordenasaun:</p>
                <p className="text-accent font-mono text-sm">Latitude: {data.latitude}</p>
                <p className="text-accent font-mono text-sm">Longitude: {data.longitude}</p>
              </div>
              <div className="p-4 pt-0">
                <Button href={`https://www.google.com/maps/dir/?api=1&destination=${data.latitude},${data.longitude}`} variant="primary" fullWidth>Hola Rota →</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default MinistryDetail;