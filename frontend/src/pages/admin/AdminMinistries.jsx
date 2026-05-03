import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Eye, Edit, Trash2, Plus, Search } from 'lucide-react';
import api from '../../utils/api';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';

function AdminMinistries() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  
  const { data, isLoading } = useQuery({
    queryKey: ['admin-ministries', searchTerm, currentPage],
    queryFn: async () => {
      const params = { page: currentPage, limit: 10 };
      if (searchTerm) params.search = searchTerm;
      const res = await api.get('/ministries', { params });
      return res.data.data;
    }
  });
  
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/ministries/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-ministries']);
      toast.success('Ministériu desativa susesu!');
    },
    onError: () => {
      toast.error('Erro desativa ministériu!');
    }
  });
  
  const handleDelete = (id, name) => {
    if (window.confirm(`Seguru atu desativa "${name}"?`)) {
      deleteMutation.mutate(id);
    }
  };
  
  if (isLoading) return <LoadingSpinner />;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Ministériu Sira</h1>
        <Link to="/admin/ministries/new">
          <Button variant="primary"><Plus className="w-4 h-4 mr-2" />Aumenta Ministériu</Button>
        </Link>
      </div>
      
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input type="text" placeholder="Buka ministériu..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-secondary border border-border rounded-lg text-white placeholder-text-muted focus:outline-none focus:border-accent text-sm" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left px-5 py-3 text-text-muted text-xs font-medium">No</th>
                <th className="text-left px-5 py-3 text-text-muted text-xs font-medium">Foto</th>
                <th className="text-left px-5 py-3 text-text-muted text-xs font-medium">Naran</th>
                <th className="text-left px-5 py-3 text-text-muted text-xs font-medium">Kategoria</th>
                <th className="text-left px-5 py-3 text-text-muted text-xs font-medium">Postu</th>
                <th className="text-left px-5 py-3 text-text-muted text-xs font-medium">Rating</th>
                <th className="text-left px-5 py-3 text-text-muted text-xs font-medium">Views</th>
              </tr>
            </thead>
            <tbody>
              {data?.ministries?.map((ministry, idx) => (
                <tr key={ministry.id} className="border-t border-border hover:bg-hover">
                  <td className="px-5 py-3 text-text-secondary text-sm">{(currentPage - 1) * 10 + idx + 1}</td>
                  <td className="px-5 py-3">
<img 
                      src={ministry.photo || 'https://placehold.co/40x40/1a1d27/3b82f6?text=M'} 
                      alt={ministry.name} 
                      loading="lazy"
                      className="w-10 h-10 rounded-lg object-cover" 
                    />
                  </td>
                  <td className="px-5 py-3 text-white text-sm font-medium">{ministry.name}</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-1 rounded text-xs text-white" style={{ backgroundColor: ministry.Category?.color || '#3b82f6' }}>{ministry.Category?.name}</span>
                  </td>
                  <td className="px-5 py-3 text-text-secondary text-sm">{ministry.city}</td>
                  <td className="px-5 py-3 text-text-secondary text-sm">{ministry.rating} ⭐</td>
                  <td className="px-5 py-3 text-text-secondary text-sm">{ministry.total_views}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <Link to={`/ministries/${ministry.id}`} className="p-1 text-accent-green hover:text-green-400"><Eye className="w-4 h-4" /></Link>
                      <Link to={`/admin/ministries/${ministry.id}/edit`} className="p-1 text-accent hover:text-blue-400"><Edit className="w-4 h-4" /></Link>
                      <button onClick={() => handleDelete(ministry.id, ministry.name)} className="p-1 text-accent-red hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {data && data.totalPages > 1 && (
          <div className="flex justify-center gap-2 p-4 border-t border-border">
            <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1} className="px-3 py-1 bg-secondary rounded text-text-secondary disabled:opacity-50">Anterior</button>
            <span className="px-3 py-1 text-text-secondary">Página {currentPage} de {data.totalPages}</span>
            <button onClick={() => setCurrentPage(p => Math.min(data.totalPages, p+1))} disabled={currentPage === data.totalPages} className="px-3 py-1 bg-secondary rounded text-text-secondary disabled:opacity-50">Próximu</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminMinistries;