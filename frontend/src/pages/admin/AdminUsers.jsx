import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Edit, Trash2, Plus } from 'lucide-react';
import api from '../../utils/api';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';

function AdminUsers() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'viewer', is_active: true });
  const { user: currentUser } = useAuth();
  const queryClient = useQueryClient();
  
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => { const res = await api.get('/users'); return res.data.data; }
  });
  
  const createMutation = useMutation({
    mutationFn: async (newUser) => { await api.post('/users', newUser); },
    onSuccess: () => { queryClient.invalidateQueries(['users']); toast.success('Uza-na\'in kria!'); setModalOpen(false); resetForm(); },
    onError: () => toast.error('Erro!')
  });
  
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => { await api.put(`/users/${id}`, data); },
    onSuccess: () => { queryClient.invalidateQueries(['users']); toast.success('Uza-na\'in atualiza!'); setModalOpen(false); setEditingUser(null); },
    onError: () => toast.error('Erro!')
  });
  
  const deleteMutation = useMutation({
    mutationFn: async (id) => { await api.delete(`/users/${id}`); },
    onSuccess: () => { queryClient.invalidateQueries(['users']); toast.success('Uza-na\'in desativa!'); },
    onError: () => toast.error('La bele desativa ita nia an rasik!')
  });
  
  const resetForm = () => setFormData({ name: '', email: '', password: '', role: 'viewer', is_active: true });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      const { password, ...updateData } = formData;
      updateMutation.mutate({ id: editingUser.id, data: updateData });
    } else {
      createMutation.mutate(formData);
    }
  };
  
  if (isLoading) return <LoadingSpinner />;
  
  return (
    <div><div className="flex justify-between items-center mb-6"><h1 className="text-2xl font-bold text-white">Uza-na'in Sira</h1><Button onClick={() => { setEditingUser(null); resetForm(); setModalOpen(true); }} variant="primary"><Plus className="w-4 h-4 mr-2" />Aumenta Uza-na'in</Button></div>
    
    <div className="bg-card rounded-xl border border-border overflow-hidden"><table className="w-full"><thead className="bg-secondary"><tr><th className="text-left px-5 py-3 text-text-muted text-xs">Avatar</th><th className="text-left px-5 py-3 text-text-muted text-xs">Naran</th><th className="text-left px-5 py-3 text-text-muted text-xs">Email</th><th className="text-left px-5 py-3 text-text-muted text-xs">Papel</th><th className="text-left px-5 py-3 text-text-muted text-xs">Status</th><th className="text-left px-5 py-3 text-text-muted text-xs">Log-in Ikus</th><th className="text-left px-5 py-3 text-text-muted text-xs">Asaun</th></tr></thead><tbody>{data?.map((user) => (<tr key={user.id} className="border-t border-border hover:bg-hover"><td className="px-5 py-3"><div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center"><span className="text-white text-sm">{user.name?.charAt(0)}</span></div></td><td className="px-5 py-3 text-white">{user.name}</td><td className="px-5 py-3 text-text-secondary text-sm">{user.email}</td><td className="px-5 py-3"><span className={`px-2 py-1 rounded text-xs ${user.role === 'administrator' ? 'bg-accent' : user.role === 'editor' ? 'bg-accent-green' : 'bg-text-muted'} text-white`}>{user.role}</span></td><td className="px-5 py-3"><span className={`px-2 py-1 rounded text-xs ${user.is_active ? 'bg-accent-green' : 'bg-accent-red'} text-white`}>{user.is_active ? 'Ativu' : 'Desativa'}</span></td><td className="px-5 py-3 text-text-muted text-xs">{user.last_login ? new Date(user.last_login).toLocaleDateString() : '-'}</td><td className="px-5 py-3"><div className="flex gap-2"><button onClick={() => { setEditingUser(user); setFormData({ name: user.name, email: user.email, password: '', role: user.role, is_active: user.is_active }); setModalOpen(true); }} className="text-accent"><Edit className="w-4 h-4" /></button>{user.id !== currentUser?.id && <button onClick={() => { if (confirm(`Desativa "${user.name}"?`)) deleteMutation.mutate(user.id); }} className="text-accent-red"><Trash2 className="w-4 h-4" /></button>}</div></td></tr>))}</tbody></table></div>
    
    {modalOpen && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"><div className="bg-card rounded-xl p-6 w-full max-w-md border border-border"><h2 className="text-xl font-bold text-white mb-4">{editingUser ? 'Editar Uza-na\'in' : 'Aumenta Uza-na\'in'}</h2><form onSubmit={handleSubmit} className="space-y-4"><div><label className="block text-text-secondary text-sm mb-1">Naran</label><input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white" required /></div><div><label className="block text-text-secondary text-sm mb-1">Email</label><input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white" required /></div>{!editingUser && (<div><label className="block text-text-secondary text-sm mb-1">Liafuan-pase</label><input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white" required /></div>)}<div><label className="block text-text-secondary text-sm mb-1">Papel</label><select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white"><option value="viewer">Vizitador</option><option value="editor">Editór</option><option value="administrator">Administradór</option></select></div><div className="flex gap-3"><Button type="submit" variant="primary">Rai</Button><Button type="button" variant="outline" onClick={() => { setModalOpen(false); setEditingUser(null); }}>Kansela</Button></div></form></div></div>)}
    </div>
  );
}

export default AdminUsers;

