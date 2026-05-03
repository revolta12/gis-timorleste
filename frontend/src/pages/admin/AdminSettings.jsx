import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Save, Globe, Phone, Mail, MapPin, User, Upload, X } from 'lucide-react';
import api from '../../utils/api';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';

function AdminSettings() {
  const [formData, setFormData] = useState({
    site_name: '',
    site_description: '',
    contact_email: '',
    contact_phone: '',
    contact_address: '',
    default_lat: '',
    default_lng: '',
    default_zoom: '',
    profile_title: '',
    profile_description: '',
    profile_photo: ''
  });
  
  const [uploading, setUploading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState('');
  const queryClient = useQueryClient();
  
  const { data, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => { 
      const res = await api.get('/settings'); 
      return res.data.data;
    }
  });
  
  useEffect(() => {
    if (data) {
      setFormData({
        site_name: data.site_name || 'GIS Timor-Leste',
        site_description: data.site_description || 'Sistema Informasaun Lokalizasaun Ministériu',
        contact_email: data.contact_email || 'kontaktu@gis.tl',
        contact_phone: data.contact_phone || '+670 333 8888',
        contact_address: data.contact_address || 'Dili, Timor-Leste',
        default_lat: data.default_lat || '-8.55',
        default_lng: data.default_lng || '125.57',
        default_zoom: data.default_zoom || '8',
        profile_title: data.profile_title || 'GIS Timor-Leste',
        profile_description: data.profile_description || 'Sistema Informasaun Lokalizasaun Ministériu Timor-Leste',
        profile_photo: data.profile_photo || ''
      });
      setPhotoPreview(data.profile_photo || '');
    }
  }, [data]);
  
  // Upload profile photo
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast.error('Favór hili imajen de\'it!');
      return;
    }
    
    setUploading(true);
    const uploadData = new FormData();
    uploadData.append('image', file);
    
    try {
      const res = await api.post('/upload/image', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const photoUrl = res.data.data.url;
      setFormData({ ...formData, profile_photo: photoUrl });
      setPhotoPreview(photoUrl);
      toast.success('Upload foto profile susesu!');
    } catch (error) {
      toast.error('Upload failed!');
    } finally {
      setUploading(false);
    }
  };
  
  const removePhoto = () => {
    setFormData({ ...formData, profile_photo: '' });
    setPhotoPreview('');
  };
  
  const updateMutation = useMutation({
    mutationFn: async (newSettings) => {
      await api.put('/settings', newSettings);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['settings']);
      toast.success('Konfigurasaun atualiza susesu!');
    },
    onError: () => {
      toast.error('Erro atualiza konfigurasaun!');
    }
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };
  
  if (isLoading) return <LoadingSpinner />;
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Konfigurasaun Sistema</h1>
      
      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {/* Profile Photo Section */}
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-accent" />
              Foto Profile Sistema
            </h2>
            <div className="flex items-center gap-4">
              {photoPreview ? (
                <div className="relative">
                  <img 
                    src={photoPreview} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover border-2 border-accent"
                  />
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-secondary border-2 border-dashed border-border flex items-center justify-center">
                  <User className="w-8 h-8 text-text-muted" />
                </div>
              )}
              <label className={`cursor-pointer ${uploading ? 'opacity-50' : ''}`}>
                <div className="px-4 py-2 bg-secondary border border-border rounded-lg text-text-secondary hover:text-white hover:border-accent transition">
                  <Upload className="w-4 h-4 inline mr-2" />
                  {uploading ? 'Uploading...' : 'Troka Foto Profile'}
                </div>
                <input type="file" accept="image/*" onChange={handlePhotoUpload} disabled={uploading} className="hidden" />
              </label>
            </div>
            <p className="text-text-muted text-xs mt-2">Foto sei hatudu iha pájina "Profile Sistema"</p>
          </div>
          
          {/* Profile Information */}
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-white mb-4">Informasaun Profile</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-text-secondary text-sm mb-1">Títulu Profile</label>
                <input
                  type="text"
                  value={formData.profile_title}
                  onChange={(e) => setFormData({...formData, profile_title: e.target.value})}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white focus:outline-none focus:border-accent"
                  placeholder="GIS Timor-Leste"
                />
              </div>
              <div>
                <label className="block text-text-secondary text-sm mb-1">Deskrisaun Profile</label>
                <textarea
                  value={formData.profile_description}
                  onChange={(e) => setFormData({...formData, profile_description: e.target.value})}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white focus:outline-none focus:border-accent"
                  rows="3"
                  placeholder="Deskrisaun sistema..."
                />
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-accent" />
              Informasaun Kontaktu
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-text-secondary text-sm mb-1">Email Kontaktu</label>
                <input
                  type="email"
                  value={formData.contact_email}
                  onChange={(e) => setFormData({...formData, contact_email: e.target.value})}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-text-secondary text-sm mb-1">Telefone Kontaktu</label>
                <input
                  type="text"
                  value={formData.contact_phone}
                  onChange={(e) => setFormData({...formData, contact_phone: e.target.value})}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-text-secondary text-sm mb-1">Endereço</label>
                <input
                  type="text"
                  value={formData.contact_address}
                  onChange={(e) => setFormData({...formData, contact_address: e.target.value})}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white"
                />
              </div>
            </div>
          </div>
          
          {/* Map Settings */}
          <div className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-accent" />
              Konfigurasaun Mapa
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-text-secondary text-sm mb-1">Latitude Padraun</label>
                <input
                  type="text"
                  value={formData.default_lat}
                  onChange={(e) => setFormData({...formData, default_lat: e.target.value})}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-accent font-mono"
                />
              </div>
              <div>
                <label className="block text-text-secondary text-sm mb-1">Longitude Padraun</label>
                <input
                  type="text"
                  value={formData.default_lng}
                  onChange={(e) => setFormData({...formData, default_lng: e.target.value})}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-accent font-mono"
                />
              </div>
              <div>
                <label className="block text-text-secondary text-sm mb-1">Zoom Padraun</label>
                <input
                  type="number"
                  min="1"
                  max="18"
                  value={formData.default_zoom}
                  onChange={(e) => setFormData({...formData, default_zoom: e.target.value})}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex gap-3">
          <Button type="submit" variant="primary" loading={updateMutation.isPending}>
            <Save className="w-4 h-4 mr-2" />
            Salvar Konfigurasaun
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AdminSettings;