import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Edit, Trash2, Plus } from 'lucide-react';
import api from '../../utils/api';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';

function AdminCategories() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', color: '#3b82f6' });
  const queryClient = useQueryClient();
  
  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => { const res = await api.get('/categories'); return res.data.data; }
  });
  
  const createMutation = useMutation({
    mutationFn: async (newCat) => { await api.post('/categories', newCat); },
    onSuccess: () => { queryClient.invalidateQueries(['categories']); toast.success('Kategoria kria!'); setModalOpen(false); setFormData({ name: '', description: '', color: '#3b82f6' }); },
    onError: () => toast.error('Erro!')
  });
  
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => { await api.put(`/categories/${id}`, data); },
    onSuccess: () => { queryClient.invalidateQueries(['categories']); toast.success('Kategoria atualiza!'); setModalOpen(false); setEditingCategory(null); },
    onError: () => toast.error('Erro!')
  });
  
  const deleteMutation = useMutation({
    mutationFn: async (id) => { await api.delete(`/categories/${id}`); },
    onSuccess: () => { queryClient.invalidateQueries(['categories']); toast.success('Kategoria hamos!'); },
    onError: () => toast.error('Kategoria iha ministériu! La bele hamos.')
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      updateMutation.mutate({ id: editingCategory.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };
  
  if (isLoading) return <LoadingSpinner />;
  
  const categories = data || [];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Kategoria</h1>
        <Button onClick={() => { setEditingCategory(null); setFormData({ name: '', description: '', color: '#3b82f6' }); setModalOpen(true); }} variant="primary">
          <Plus className="w-4 h-4 mr-2" />Aumenta Kategoria
        </Button>
      </div>
      
      {/* Tabela Kategoria */}
      {categories.length === 0 ? (
        <div className="bg-card rounded-xl p-8 text-center border border-border">
          <p className="text-text-secondary mb-2">Laiha kategoria iha database.</p>
          <p className="text-text-muted text-sm">Klik "Aumenta Kategoria" atu kria foun.</p>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="text-left px-5 py-3 text-text-muted text-xs font-medium">#</th>
                  <th className="text-left px-5 py-3 text-text-muted text-xs font-medium">Naran</th>
                  <th className="text-left px-5 py-3 text-text-muted text-xs font-medium">Deskrisaun</th>
                  <th className="text-left px-5 py-3 text-text-muted text-xs font-medium">Warna</th>
                  <th className="text-left px-5 py-3 text-text-muted text-xs font-medium">Ministériu</th>
                  <th className="text-right px-5 py-3 text-text-muted text-xs font-medium">Aksaun</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, index) => (
                  <tr key={cat.id} className="border-t border-border hover:bg-hover transition">
                    <td className="px-5 py-3 text-text-secondary text-sm">{index + 1}</td>
                    <td className="px-5 py-3 text-white text-sm font-medium">{cat.name}</td>
                    <td className="px-5 py-3 text-text-secondary text-sm max-w-xs truncate">{cat.description || '-'}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full border border-border" style={{ backgroundColor: cat.color }} />
                        <span className="text-text-secondary text-xs">{cat.color}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="px-2 py-1 bg-secondary rounded-full text-text-secondary text-xs">
                        {cat.ministry_count || 0}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingCategory(cat);
                            setFormData({ name: cat.name, description: cat.description || '', color: cat.color });
                            setModalOpen(true);
                          }}
                          className="p-2 rounded-lg hover:bg-hover text-text-secondary hover:text-tl-yellow transition"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Tebes atu hamos kategoria "${cat.name}"?`)) {
                              deleteMutation.mutate(cat.id);
                            }
                          }}
                          className="p-2 rounded-lg hover:bg-hover text-text-secondary hover:text-accent-red transition"
                          title="Hamos"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-xl p-6 w-full max-w-md border border-border">
            <h2 className="text-xl font-bold text-white mb-4">{editingCategory ? 'Editar Kategoria' : 'Aumenta Kategoria'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-text-secondary text-sm mb-1">Naran</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white" required />
              </div>
              <div>
                <label className="block text-text-secondary text-sm mb-1">Deskrisaun</label>
                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white" rows="3"></textarea>
              </div>
              <div>
                <label className="block text-text-secondary text-sm mb-1">Warna</label>
                <input type="color" value={formData.color} onChange={(e) => setFormData({...formData, color: e.target.value})} className="w-full h-10 bg-secondary border border-border rounded" />
              </div>
              <div className="flex gap-3">
                <Button type="submit" variant="primary">Salvar</Button>
                <Button type="button" variant="outline" onClick={() => { setModalOpen(false); setEditingCategory(null); }}>Kansela</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCategories;