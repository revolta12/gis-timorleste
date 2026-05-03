import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Edit, Trash2, Plus, GripVertical } from 'lucide-react';
import api from '../../utils/api';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';

function AdminFaqs() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [formData, setFormData] = useState({ question: '', answer: '', category: '', is_active: true });
  const queryClient = useQueryClient();
  
  const { data, isLoading } = useQuery({
    queryKey: ['faqs-admin'],
    queryFn: async () => { const res = await api.get('/faqs'); return res.data.data; }
  });
  
  const createMutation = useMutation({
    mutationFn: async (newFaq) => { await api.post('/faqs', newFaq); },
    onSuccess: () => { queryClient.invalidateQueries(['faqs-admin']); toast.success('FAQ kria!'); setModalOpen(false); resetForm(); }
  });
  
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => { await api.put(`/faqs/${id}`, data); },
    onSuccess: () => { queryClient.invalidateQueries(['faqs-admin']); toast.success('FAQ atualiza!'); setModalOpen(false); setEditingFaq(null); }
  });
  
  const deleteMutation = useMutation({
    mutationFn: async (id) => { await api.delete(`/faqs/${id}`); },
    onSuccess: () => { queryClient.invalidateQueries(['faqs-admin']); toast.success('FAQ hamos!'); }
  });
  
  const resetForm = () => setFormData({ question: '', answer: '', category: '', is_active: true });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingFaq) {
      updateMutation.mutate({ id: editingFaq.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };
  
  if (isLoading) return <LoadingSpinner />;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">FAQ (Pergunta Frequente)</h1>
        <Button onClick={() => { setEditingFaq(null); resetForm(); setModalOpen(true); }} variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Aumenta FAQ
        </Button>
      </div>
      
      <div className="space-y-3">
        {data?.map((faq) => (
          <div key={faq.id} className="bg-card rounded-xl p-4 border border-border">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <GripVertical className="w-4 h-4 text-text-muted" />
                  <h3 className="text-white font-medium">{faq.question}</h3>
                  {!faq.is_active && <span className="px-2 py-0.5 bg-accent-red/20 text-accent-red text-xs rounded">Draft</span>}
                </div>
                <p className="text-text-secondary text-sm">{faq.answer}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button onClick={() => { 
                  setEditingFaq(faq); 
                  setFormData({ question: faq.question, answer: faq.answer, category: faq.category || '', is_active: faq.is_active }); 
                  setModalOpen(true); 
                }} className="text-accent">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => { 
                  if (confirm(`Hamos FAQ "${faq.question}"?`)) 
                    deleteMutation.mutate(faq.id); 
                }} className="text-accent-red">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-xl p-6 w-full max-w-lg border border-border">
            <h2 className="text-xl font-bold text-white mb-4">
              {editingFaq ? 'Editar FAQ' : 'Aumenta FAQ'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-text-secondary text-sm mb-1">Pergunta</label>
                <input 
                  type="text" 
                  value={formData.question} 
                  onChange={(e) => setFormData({...formData, question: e.target.value})}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white" 
                  required 
                />
              </div>
              <div>
                <label className="block text-text-secondary text-sm mb-1">Resposta</label>
                <textarea 
                  value={formData.answer} 
                  onChange={(e) => setFormData({...formData, answer: e.target.value})}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white" 
                  rows="4" 
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-text-secondary text-sm mb-1">Kategoria (opsional)</label>
                <input 
                  type="text" 
                  value={formData.category} 
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white" 
                />
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={formData.is_active} 
                    onChange={(e) => setFormData({...formData, is_active: e.target.checked})} 
                    className="w-4 h-4" 
                  />
                  <span className="text-text-secondary">Aktivu</span>
                </label>
              </div>
              <div className="flex gap-3">
                <Button type="submit" variant="primary">Salvar</Button>
                <Button type="button" variant="outline" onClick={() => { setModalOpen(false); setEditingFaq(null); }}>Kansela</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminFaqs;