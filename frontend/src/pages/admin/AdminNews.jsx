import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Edit, Trash2, Plus, Eye, Upload, X } from 'lucide-react';
import api from '../../utils/api';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';

function AdminNews() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({ 
    title: '', content: '', excerpt: '', thumbnail: '', youtube_url: '', is_published: false 
  });
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  
  const queryClient = useQueryClient();
  
  const { data, isLoading } = useQuery({
    queryKey: ['admin-news'],
    queryFn: async () => { 
      const res = await api.get('/news', { params: { admin: true } }); 
      return res.data.data; 
    }
  });
  
  // Funasaun upload thumbnail
  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast.error('Favór hili imajen de\'it!');
      return;
    }
    
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Imajen boot liu! Maksimu 2MB.');
      return;
    }
    
    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('image', file);
    
    try {
      const res = await api.post('/upload/image', uploadFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const imageUrl = res.data.data.url;
      setFormData({ ...formData, thumbnail: imageUrl });
      setThumbnailPreview(imageUrl);
      toast.success('Upload thumbnail susesu!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.response?.data?.message || 'Upload failed!');
    } finally {
      setUploading(false);
    }
  };
  
  // Funasaun remove thumbnail
  const removeThumbnail = () => {
    setFormData({ ...formData, thumbnail: '' });
    setThumbnailPreview('');
  };
  
  const createMutation = useMutation({
    mutationFn: async (newNews) => { await api.post('/news', newNews); },
    onSuccess: () => { 
      queryClient.invalidateQueries(['admin-news']); 
      toast.success('Notísia kria!'); 
      setModalOpen(false); 
      resetForm(); 
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Erro kria notísia!');
    }
  });
  
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => { await api.put(`/news/${id}`, data); },
    onSuccess: () => { 
      queryClient.invalidateQueries(['admin-news']); 
      toast.success('Notísia atualiza!'); 
      setModalOpen(false); 
      setEditingNews(null); 
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Erro atualiza notísia!');
    }
  });
  
  const deleteMutation = useMutation({
    mutationFn: async (id) => { await api.delete(`/news/${id}`); },
    onSuccess: () => { 
      queryClient.invalidateQueries(['admin-news']); 
      toast.success('Notísia hamos!'); 
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Erro hamos notísia!');
    }
  });
  
  const resetForm = () => {
    setFormData({ title: '', content: '', excerpt: '', thumbnail: '', youtube_url: '', is_published: false });
    setThumbnailPreview('');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) {
      toast.error('Títulu notísia tenke prense!');
      return;
    }
    if (editingNews) {
      updateMutation.mutate({ id: editingNews.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };
  
  if (isLoading) return <LoadingSpinner />;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Notísia</h1>
        <Button onClick={() => { setEditingNews(null); resetForm(); setModalOpen(true); }} variant="primary">
          <Plus className="w-4 h-4 mr-2" />Aumenta Notísia
        </Button>
      </div>
      
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left px-5 py-3 text-text-muted text-xs">Títulu</th>
                <th className="text-left px-5 py-3 text-text-muted text-xs">Thumbnail</th>
                <th className="text-left px-5 py-3 text-text-muted text-xs">Status</th>
                <th className="text-left px-5 py-3 text-text-muted text-xs">Data</th>
              </tr>
            </thead>
            <tbody>
              {data?.news?.map((news) => (
                <tr key={news.id} className="border-t border-border hover:bg-hover">
                  <td className="px-5 py-3 text-white">{news.title}</td>
                  <td className="px-5 py-3">
                    <img 
                      src={news.thumbnail || 'https://placehold.co/40x40/1a1d27/3b82f6?text=N'} 
                      alt={news.title} 
                      className="w-10 h-10 rounded object-cover" 
                    />
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${news.is_published ? 'bg-accent-green' : 'bg-accent-amber'} text-white`}>
                      {news.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-text-muted text-xs">
                    {new Date(news.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => window.open(`/news/${news.id}`, '_blank')} className="text-accent-green" title="Liaf nia pájina">
                        <Eye className="w-4 h-4" />
                      </button>
                      {news.youtube_url && (
                        <button onClick={() => window.open(news.youtube_url, '_blank')} className="text-red-400" title="Liaf Video YouTube">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        </button>
                      )}
                      <button onClick={() => { 
                        setEditingNews(news); 
                        setFormData({ 
                          title: news.title, 
                          content: news.content || '', 
                          excerpt: news.excerpt || '', 
                          thumbnail: news.thumbnail || '', 
                          youtube_url: news.youtube_url || '',
                          is_published: news.is_published 
                        }); 
                        setThumbnailPreview(news.thumbnail || '');
                        setModalOpen(true); 
                      }} className="text-accent">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => { 
                        if (confirm(`Hamos "${news.title}"?`)) deleteMutation.mutate(news.id); 
                      }} className="text-accent-red">
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
      
      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-xl p-6 w-full max-w-2xl border border-border">
            <h2 className="text-xl font-bold text-white mb-4">
              {editingNews ? 'Editar Notísia' : 'Aumenta Notísia'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-text-secondary text-sm mb-1">Títulu *</label>
                <input 
                  type="text" 
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})} 
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white" 
                  required 
                />
                
                <div>
                  <label className="block text-text-secondary text-sm mb-1 mt-4">YouTube URL (opsional)</label>
                  <input 
                    type="url" 
                    value={formData.youtube_url} 
                    onChange={(e) => setFormData({...formData, youtube_url: e.target.value})} 
                    placeholder="https://youtube.com/watch?v=xxx" 
                    className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-text-secondary text-sm mb-1">Liafuan resumo</label>
                <textarea 
                  value={formData.excerpt} 
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})} 
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white" 
                  rows="2"
                />
              </div>
              
              <div>
                <label className="block text-text-secondary text-sm mb-1">Konteúdu</label>
                <textarea 
                  value={formData.content} 
                  onChange={(e) => setFormData({...formData, content: e.target.value})} 
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white" 
                  rows="6"
                />
              </div>
              
              {/* UPLOAD THUMBNAIL */}
              <div>
                <label className="block text-text-secondary text-sm mb-1">Thumbnail</label>
                <div className="flex items-center gap-3">
                  <label className={`flex-1 cursor-pointer ${uploading ? 'opacity-50' : ''}`}>
                    <div className="flex items-center justify-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg text-text-secondary hover:text-white hover:border-accent transition">
                      <Upload className="w-4 h-4" />
                      <span className="text-sm">{uploading ? 'Uploading...' : 'Upload Thumbnail'}</span>
                    </div>
                    <input 
                      type="file" 
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      onChange={handleThumbnailUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                  {(thumbnailPreview || formData.thumbnail) && (
                    <button 
                      type="button"
                      onClick={removeThumbnail}
                      className="p-2 bg-accent-red/20 text-accent-red rounded-lg hover:bg-accent-red/30 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {(thumbnailPreview || formData.thumbnail) && (
                  <div className="mt-2">
                    <img 
                      src={thumbnailPreview || formData.thumbnail} 
                      alt="Preview" 
                      className="w-32 h-20 object-cover rounded-lg border border-border"
                    />
                    <p className="text-text-muted text-xs mt-1">Preview thumbnail</p>
                  </div>
                )}
                <p className="text-text-muted text-xs mt-1">Formatu: JPG, PNG, GIF. Maksimu 2MB</p>
              </div>
              
              <div>
                <label className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={formData.is_published} 
                    onChange={(e) => setFormData({...formData, is_published: e.target.checked})} 
                    className="w-4 h-4" 
                  />
                  <span className="text-text-secondary">Publika agora</span>
                </label>
              </div>
              
              <div className="flex gap-3">
                <Button type="submit" variant="primary" loading={createMutation.isPending || updateMutation.isPending}>
                  Save/Rai
                </Button>
                <Button type="button" variant="outline" onClick={() => { setModalOpen(false); setEditingNews(null); resetForm(); }}>
                  Kansela
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminNews;