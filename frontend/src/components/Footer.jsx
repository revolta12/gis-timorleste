import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Eye } from 'lucide-react';
import { TimorLesteFlag } from './TimorLesteLogo';
import api from '../utils/api';

const Footer = () => {
  const [totalViews, setTotalViews] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/stats/public');
        if (res.data.success) {
          setTotalViews(res.data.data.totalViews);
        }
      } catch (err) {
        console.error('Erro busca stats:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <TimorLesteFlag className="w-10 h-10 rounded shadow-lg" />
              <span className="text-white font-bold text-lg">GIS TIMOR-LESTE</span>
            </div>
            <p className="text-text-secondary text-sm">
              Sistema Informasaun Lokalizasaun Ministériu Timor-Leste.
              Fó fasilidade atu hetan informasaun kona-ba lokalizasaun no servisu ministériu sira.
            </p>
            {totalViews !== null && (
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-hover rounded-full border border-border">
                <Eye className="w-4 h-4 text-tl-red" />
                <span className="text-text-secondary text-sm">
                  {totalViews.toLocaleString()} lansun bainak si
                </span>
              </div>
            )}
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Link Susuk</h3>
            <ul className="space-y-2">
              <li><Link to="/map" className="text-text-secondary hover:text-tl-red text-sm">Mapa</Link></li>
              <li><Link to="/ministries" className="text-text-secondary hover:text-tl-red text-sm">Ministériu Sira</Link></li>
              <li><Link to="/news" className="text-text-secondary hover:text-tl-red text-sm">Notísia</Link></li>
<li><Link to="/profile" className="text-text-secondary hover:text-tl-red text-sm">Profile Sistema</Link></li>
            </ul>
          </div>
          
          {/* Information */}
          <div>
            <h3 className="text-white font-semibold mb-4">Informasaun</h3>
            <ul className="space-y-2">
              <li><Link to="/profile" className="text-text-secondary hover:text-tl-red text-sm">Profile Sistema</Link></li>
              <li><Link to="/privacy" className="text-text-secondary hover:text-tl-red text-sm">Polítika Privasidade</Link></li>
              <li><Link to="/terms" className="text-text-secondary hover:text-tl-red text-sm">Termu no Kondisaun</Link></li>
              <li><Link to="/about" className="text-text-secondary hover:text-tl-red text-sm">Kona-ba Sistema</Link></li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div>
            <h3 className="text-white font-semibold mb-4">Redes Sosiais</h3>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-hover flex items-center justify-center text-text-secondary hover:text-tl-red transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-hover flex items-center justify-center text-text-secondary hover:text-tl-red transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-hover flex items-center justify-center text-text-secondary hover:text-tl-red transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-hover flex items-center justify-center text-text-secondary hover:text-tl-red transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-text-muted text-sm">© 2024 GIS Timor-Leste. Direitu hotu rezerva.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
