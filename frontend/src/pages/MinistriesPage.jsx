import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';

const FALLBACK_IMAGE = 'https://placehold.co/400x240/1a1d27/3b82f6?text=Minist%C3%A9riu';

function MinistriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['ministries', searchTerm, selectedCategory, currentPage, sortBy],
    queryFn: async () => {
      const params = { page: currentPage, limit: 9, sort: sortBy };
      if (searchTerm) params.search = searchTerm;
      if (selectedCategory) params.category = selectedCategory;
      const res = await api.get('/ministries', { params });
      return res.data.data;
    }
  });
  
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => { const res = await api.get('/categories'); return res.data.data; }
  });
  
  return (
    <div className="bg-primary min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">Ministériu Sira</h1>
        <p className="text-text-secondary mb-8">Lista hotu ministériu iha Timor-Leste</p>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <input type="text" placeholder="Buka ministériu..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="px-4 py-2 bg-secondary border border-border rounded-lg text-white placeholder-text-muted focus:outline-none focus:border-accent w-64" />
          <select value={selectedCategory} onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }} className="px-4 py-2 bg-secondary border border-border rounded-lg text-white focus:outline-none focus:border-accent">
            <option value="">Hotu Kategoria</option>
            {categories?.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 bg-secondary border border-border rounded-lg text-white focus:outline-none focus:border-accent">
            <option value="name">Sort: Naran A-Z</option>
            <option value="total_views">Sort: Vizualizasaun</option>
          </select>
        </div>
        
        {/* Results */}
        {isLoading ? (
          <div className="flex justify-center py-12"><LoadingSpinner /></div>
        ) : isError ? (
          <div className="text-center py-12"><p className="text-accent-red">Error carrega dadus. Favór tenta fali.</p></div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.ministries?.map((ministry) => (
                <div key={ministry.id} className="bg-card rounded-xl overflow-hidden hover:bg-hover transition border border-border">
                  <img src={ministry.photo || FALLBACK_IMAGE} alt={ministry.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-1">{ministry.name}</h3>
                    <p className="text-text-secondary text-sm mb-2 line-clamp-2">{ministry.description || 'La iha deskrisaun.'}</p>
                    {/* Link Website */}
                    {ministry.website && (
                      <a 
                        href={ministry.website.startsWith('http') ? ministry.website : `https://${ministry.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1 text-accent text-xs mb-3 hover:underline"
                      >
                        🌐 {ministry.website.length > 30 ? ministry.website.substring(0, 30) + '...' : ministry.website}
                      </a>
                    )}
                    <div className="flex gap-2 mt-2">
                      <Button to={`/ministries/${ministry.id}`} variant="primary" size="sm" fullWidth>Haree Detallu</Button>
                      <Button href={`https://www.google.com/maps/dir/?api=1&destination=${ministry.latitude},${ministry.longitude}`} variant="outline" size="sm">Rota</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            {data && data.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <Button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1} variant="outline" size="sm">Anterior</Button>
                <span className="px-4 py-2 bg-card rounded-lg text-white text-sm">Pájina {currentPage} husi {data.totalPages}</span>
                <Button onClick={() => setCurrentPage(p => Math.min(data.totalPages, p+1))} disabled={currentPage === data.totalPages} variant="outline" size="sm">Prósimu</Button>
              </div>
            )}
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default MinistriesPage;