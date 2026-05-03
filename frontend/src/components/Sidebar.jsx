import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Building2, Tag, Users, Newspaper, 
  FileText, Settings, LogOut, Menu, X
} from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { TimorLesteFlag } from './TimorLesteLogo';
import api from '../utils/api';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Deteita tamanho tela
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileOpen(true);
      } else {
        setIsMobileOpen(false);
      }
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, prefetchKey: 'stats', prefetchFn: () => api.get('/stats') },
    { name: 'Ministériu', path: '/admin/ministries', icon: Building2, prefetchKey: 'admin-ministries', prefetchFn: () => api.get('/ministries', { params: { limit: 10 } }) },
    { name: 'Kategoria', path: '/admin/categories', icon: Tag, prefetchKey: 'categories', prefetchFn: () => api.get('/categories') },
    { name: 'Notísia', path: '/admin/news', icon: Newspaper, prefetchKey: 'admin-news', prefetchFn: () => api.get('/news') },
    { name: 'Log Atividade', path: '/admin/logs', icon: FileText, prefetchKey: 'admin-logs', prefetchFn: () => api.get('/logs') },
    { name: 'Uza-na\'in', path: '/admin/users', icon: Users, prefetchKey: 'admin-users', prefetchFn: () => api.get('/users') },
    { name: 'Konfigurasaun', path: '/admin/settings', icon: Settings, prefetchKey: 'settings', prefetchFn: () => api.get('/settings') }
  ];

  const handleLogout = () => {
    localStorage.removeItem('gis_token');
    localStorage.removeItem('gis_user');
    logout();
    navigate('/admin/login');
  };

  const handleMouseEnter = (item) => {
    if (item.prefetchKey && item.prefetchFn) {
      queryClient.prefetchQuery({
        queryKey: [item.prefetchKey],
        queryFn: async () => {
          const res = await item.prefetchFn();
          return res.data.data;
        },
        staleTime: 5 * 60 * 1000
      });
    }
  };

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : '?';

  // Sidebar mobile toggle button
  const MobileToggleButton = () => (
    <button
      onClick={() => setIsMobileOpen(!isMobileOpen)}
      className="md:hidden fixed top-4 left-4 z-50 p-2 bg-tl-red rounded-lg text-white shadow-lg"
    >
      {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );

  // Mobile overlay
  const MobileOverlay = () => (
    isMobileOpen && isMobile && (
      <div 
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={() => setIsMobileOpen(false)}
      />
    )
  );

  // Sidebar content
  const SidebarContent = () => (
    <aside className={`
      w-64 bg-secondary border-r border-border flex flex-col h-screen
      fixed md:sticky top-0 z-50 transition-transform duration-300
      ${isMobile ? (isMobileOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
    `}>
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <TimorLesteFlag className="w-10 h-10 rounded shadow-lg" />
          <div>
            <span className="text-white font-bold text-sm">GIS TIMOR-LESTE</span>
            <p className="text-text-muted text-xs">Admin Panel</p>
          </div>
        </div>
      </div>
      
      {/* User Info */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tl-red to-tl-red-dark flex items-center justify-center border-2 border-tl-yellow">
            <span className="text-white font-medium text-lg">{userInitial}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium text-sm truncate">{user?.name || 'Admin'}</p>
            <p className="text-text-muted text-xs capitalize">{user?.role || 'administrator'}</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="px-3 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onMouseEnter={() => handleMouseEnter(item)}
              onClick={() => isMobile && setIsMobileOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150
                ${isActive ? 'bg-tl-red/20 text-tl-red border-l-2 border-tl-red' : 'text-text-secondary hover:text-white hover:bg-hover'}
              `}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </nav>
      
      {/* Logout Button */}
      <div className="p-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-500 hover:bg-red-500/10 transition"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">Sai</span>
        </button>
      </div>
    </aside>
  );

  return (
    <>
      <MobileToggleButton />
      <MobileOverlay />
      <SidebarContent />
    </>
  );
};

export default Sidebar;