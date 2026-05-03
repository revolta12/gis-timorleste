// frontend/src/pages/MapPage.jsx
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, X, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import MapComponent from '../components/MapComponent';

function MapPage() {
    const [selectedMinistry, setSelectedMinistry] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    
    // Deteita if mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    const { data: ministries, isLoading } = useQuery({
        queryKey: ['ministries-map'],
        queryFn: async () => { 
            const res = await api.get('/ministries/map'); 
            return res.data.data; 
        }
    });
    
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => { 
            const res = await api.get('/categories'); 
            return res.data.data; 
        }
    });
    
    const filteredMinistries = ministries?.filter(m => {
        const matchesSearch = !searchTerm || 
            m.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || 
            (m.Category?.name === selectedCategory || m.category_id?.toString() === selectedCategory);
        return matchesSearch && matchesCategory;
    });
    
    const handleSelectMinistry = (ministry) => {
        setSelectedMinistry(ministry);
        if (isMobile) {
            setSidebarOpen(false);
        }
    };
    
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    
    return (
        <div className="bg-primary min-h-screen flex flex-col">
            <Navbar />
            
            <div className="flex flex-1 relative">
                {/* Toggle Sidebar Button */}
                <button
                    onClick={toggleSidebar}
                    className="fixed left-4 top-20 z-30 bg-tl-red rounded-lg p-2 shadow-lg hover:bg-red-700 transition md:hidden"
                >
                    {sidebarOpen ? <ChevronLeft className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
                </button>
                
                {/* Sidebar Overlay (mobile) */}
                {isMobile && sidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black/50 z-20 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
                
                {/* Sidebar List */}
                <div className={`
                    fixed md:relative top-16 md:top-0 left-0
                    w-80 h-[calc(100vh-64px)] md:h-auto
                    bg-secondary border-r border-border 
                    flex flex-col overflow-y-auto 
                    transition-transform duration-300 z-20
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:translate-x-0 md:block
                `}>
                    {/* Header Sidebar */}
                    <div className="p-4 border-b border-border sticky top-0 bg-secondary z-10">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-lg font-bold text-white">Ministériu Sira</h2>
                            <button 
                                onClick={() => setSidebarOpen(false)}
                                className="md:hidden text-text-muted hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        {/* Search Input */}
                        <div className="relative mb-3">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                            <input 
                                type="text" 
                                placeholder="Buka ministériu..." 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)} 
                                className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-lg text-white placeholder-text-muted focus:outline-none focus:border-accent text-sm" 
                            />
                        </div>
                        
                        {/* Category Filter */}
                        <select 
                            value={selectedCategory} 
                            onChange={(e) => setSelectedCategory(e.target.value)} 
                            className="w-full px-3 py-2 bg-card border border-border rounded-lg text-white text-sm focus:outline-none focus:border-accent"
                        >
                            <option value="">Hotu Kategoria</option>
                            {categories?.map(cat => (
                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                        
                        {/* Result Count */}
                        <p className="text-text-muted text-xs mt-3">
                            Rezultadu: {filteredMinistries?.length || 0} ministériu
                        </p>
                    </div>
                    
                    {/* List Ministries */}
                    <div className="flex-1 overflow-y-auto pb-20">
                        {isLoading ? (
                            <div className="p-8 flex justify-center">
                                <LoadingSpinner />
                            </div>
                        ) : filteredMinistries?.length === 0 ? (
                            <div className="p-8 text-center text-text-muted">
                                La iha ministériu ne'ebé koresponde
                            </div>
                        ) : (
                            filteredMinistries?.map(ministry => (
                                <div 
                                    key={ministry.id} 
                                    onClick={() => {
                                        setSelectedMinistry(ministry);
                                        if (isMobile) setSidebarOpen(false);
                                    }} 
                                    className={`p-4 border-b border-border cursor-pointer hover:bg-hover transition ${
                                        selectedMinistry?.id === ministry.id ? 'bg-hover border-l-4 border-l-tl-red' : ''
                                    }`}
                                >
                                    <div className="flex gap-3">
                                        <img 
                                            src={ministry.photo || 'https://placehold.co/50x50/1a1d27/3b82f6?text=M'} 
                                            alt={ministry.name}
                                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-white text-sm truncate">{ministry.name}</h3>
                                            <p className="text-text-muted text-xs mt-1 truncate">{ministry.Category?.name}</p>
                                            <p className="text-text-muted text-xs mt-1 truncate">{ministry.city}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                
                {/* Main Map */}
                <div className="flex-1 relative">
                    {isLoading ? (
                        <div className="h-full flex items-center justify-center">
                            <LoadingSpinner size="lg" />
                        </div>
                    ) : (
                        <MapComponent
                            ministries={filteredMinistries || []}
                            selectedMinistry={selectedMinistry}
                            onSelectMinistry={handleSelectMinistry}
                            height="calc(100vh - 64px)"
                            showControls={true}
                            defaultMapType="hybrid"
                        />
                    )}
                </div>
            </div>
            
            <Footer />
        </div>
    );
}

export default MapPage;