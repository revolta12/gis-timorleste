import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Map, Building2, Newspaper, Mail, LogIn, LayoutDashboard, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { TimorLesteFlag } from './TimorLesteLogo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const menuItems = [
    { name: 'Mapa', path: '/map', icon: Map },
    { name: 'Ministériu', path: '/ministries', icon: Building2 },
    { name: 'Notísia', path: '/news', icon: Newspaper },
    { name: 'Profile Sistema', path: '/profile', icon: User }
  ];

  return (
    <nav className="bg-secondary/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <TimorLesteFlag className="w-10 h-10 rounded-lg shadow-lg shadow-tl-red/20 group-hover:shadow-tl-red/40 transition-shadow duration-300" />
            <div>
              <span className="text-white font-bold text-lg tracking-tight">GIS TIMOR-LESTE</span>
              <p className="text-text-muted text-xs">Sistema Informasaun Lokalizasaun</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-text-secondary hover:text-white hover:bg-hover px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium"
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}

            {/* SÓ HATUDU SE USER LOGIN */}
            {user ? (
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-border">
                {user.role !== 'viewer' && (
                  <Link to="/admin" className="text-tl-red hover:text-tl-yellow flex items-center gap-2 text-sm font-medium transition-colors">
                    <LayoutDashboard className="w-4 h-4" />
                    Admin
                  </Link>
                )}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-tl-red to-tl-red-dark flex items-center justify-center shadow-lg shadow-tl-red/20">
                    <span className="text-white text-sm font-bold">{user?.name?.charAt(0) || 'U'}</span>
                  </div>
                  <span className="text-white text-sm font-medium">{user.name}</span>
                  <button onClick={logout} className="text-text-muted hover:text-accent-red text-sm font-medium transition-colors ml-1">Sai</button>
                </div>
              </div>
            ) : (
              // ✅ PUBLIK: LA HATUDU LOGIN BUTTON (HILA)
              <></>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2 hover:bg-hover rounded-lg transition-colors">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-secondary border-t border-border">
          <div className="px-4 py-3 space-y-1">
            {menuItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                onClick={() => setIsOpen(false)} 
                className="flex items-center gap-3 px-3 py-2.5 text-text-secondary hover:text-white hover:bg-hover rounded-lg transition-all text-sm font-medium"
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
            {user ? (
              <>
                <div className="pt-3 mt-2 border-t border-border">
                  <div className="flex items-center gap-3 px-3 py-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-tl-red to-tl-red-dark flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{user?.name?.charAt(0) || 'U'}</span>
                    </div>
                    <span className="text-white font-medium">{user.name}</span>
                  </div>
                  {user.role !== 'viewer' && (
                    <Link 
                      to="/admin" 
                      onClick={() => setIsOpen(false)} 
                      className="flex items-center gap-3 px-3 py-2.5 text-tl-red hover:bg-hover rounded-lg text-sm font-medium"
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      Admin Panel
                    </Link>
                  )}
                  <button 
                    onClick={() => { 
                      logout(); 
                      setIsOpen(false); 
                    }} 
                    className="w-full text-left flex items-center gap-3 px-3 py-2.5 text-accent-red hover:bg-hover rounded-lg text-sm font-medium"
                  >
                    <LogIn className="w-5 h-5" />
                    Sai
                  </button>
                </div>
              </>
            ) : (
              // ✅ MOBILE: LA HATUDU LOGIN BUTTON
              <></>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;