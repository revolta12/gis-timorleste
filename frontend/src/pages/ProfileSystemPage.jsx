import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Phone, Mail, User } from 'lucide-react';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';

function ProfileSystemPage() {
  const { data: settings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => { 
      const res = await api.get('/settings'); 
      return res.data.data;
    }
  });
  
  if (isLoading) return <LoadingSpinner />;
  
  const profilePhoto = settings?.profile_photo || '';
  const profileTitle = settings?.profile_title || 'GIS Timor-Leste';
  const profileDescription = settings?.profile_description || 'Sistema Informasaun Lokalizasaun Ministériu Timor-Leste';
  
  return (
    <div className="bg-primary min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">Profile Sistema</h1>
        <p className="text-text-secondary mb-8">Informasaun kona-ba sistema GIS Timor-Leste.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Photo & Title */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-6">
                {profilePhoto ? (
                  <img 
                    src={profilePhoto} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover border-2 border-accent"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-secondary border-2 border-border flex items-center justify-center">
                    <User className="w-8 h-8 text-text-muted" />
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-semibold text-white">{profileTitle}</h2>
                  <p className="text-text-muted text-sm mt-1">Sistema Informasaun Lokalizasaun</p>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="text-xl font-semibold text-white mb-4">Kona-ba Sistema</h2>
              <p className="text-text-secondary leading-relaxed">{profileDescription}</p>
            </div>
            
            {/* Features */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="text-xl font-semibold text-white mb-4">Fitur Sira</h2>
              <ul className="space-y-2 text-text-secondary">
                <li>✓ Mapa interativu ho marker ministériu sira</li>
                <li>✓ Lista kompletu ministériu ho informasaun</li>
                <li>✓ Sistema rating ba servisu ministériu</li>
                <li>✓ Notísia no atualizasaun kona-ba ministériu</li>
              </ul>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="text-xl font-semibold text-white mb-4">Kontaktu</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-accent" />
                  <span className="text-text-secondary">{settings?.contact_email || 'kontaktu@gis.tl'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-accent" />
                  <span className="text-text-secondary">{settings?.contact_phone || '+670 333 8888'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span className="text-text-secondary">{settings?.contact_address || 'Dili, Timor-Leste'}</span>
                </div>
              </div>
              <Button to="/contact" variant="primary" className="mt-6 w-full">
                Haree Pájina Kontaktu
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default ProfileSystemPage;