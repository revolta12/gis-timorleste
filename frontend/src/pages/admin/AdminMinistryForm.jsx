import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getTileUrl, MAP_TYPES, MAP_CONFIG } from '../../utils/mapConfig';
import { Satellite, Layers, Upload, X, Search, MapPin } from 'lucide-react';
import api from '../../utils/api';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

// Komponente Location Marker
function LocationMarker({ position, setPosition }) {
  useMapEvents({ click(e) { setPosition([e.latlng.lat, e.latlng.lng]); } });
  return position ? (
    <Marker 
      position={position} 
      draggable={true} 
      eventHandlers={{ dragend: (e) => setPosition([e.target.getLatLng().lat, e.target.getLatLng().lng]) }} 
    />
  ) : null;
}

// Komponente FlyTo
function FlyToLocation({ position }) {
  const map = useMap();
  useEffect(() => { if (position) map.flyTo(position, 16, { duration: 1.5 }); }, [position, map]);
  return null;
}

// Komponente Map Type Control
function MapTypeControl({ mapType, setMapType }) {
  const map = useMap();
  const changeMapType = (type) => {
    setMapType(type);
    map.eachLayer((layer) => { if (layer instanceof L.TileLayer) map.removeLayer(layer); });
    L.tileLayer(getTileUrl(type), { attribution: '&copy; <a href="https://www.google.com/maps">Google Maps</a>', maxZoom: MAP_CONFIG.MAX_ZOOM, maxNativeZoom: 22 }).addTo(map);
  };
  return (
    <div className="absolute bottom-3 right-3 z-[1000] bg-card rounded-lg shadow-lg border border-border overflow-hidden">
      <div className="flex flex-col">
        <button 
          onClick={() => changeMapType(MAP_TYPES.SATELLITE)} 
          className={`px-3 py-2 flex items-center gap-2 text-xs transition ${mapType === MAP_TYPES.SATELLITE ? 'bg-accent text-white' : 'text-text-secondary hover:bg-hover'}`}
        >
          <Satellite className="w-4 h-4" /> Satelite
        </button>
        <button 
          onClick={() => changeMapType(MAP_TYPES.HYBRID)} 
          className={`px-3 py-2 flex items-center gap-2 text-xs transition border-t border-border ${mapType === MAP_TYPES.HYBRID ? 'bg-accent text-white' : 'text-text-secondary hover:bg-hover'}`}
        >
          <Layers className="w-4 h-4" /> Hibridu
        </button>
      </div>
    </div>
  );
}

function AdminMinistryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditing = !!id;

  const [formData, setFormData] = useState({ 
    name: '', category_id: '', description: '', address: '', city: '', district: '', 
    latitude: -8.55, longitude: 125.57, phone: '', email: '', website: '', 
    founded_year: '', total_employees: '', photo: '' 
  });
  const [serviceInput, setServiceInput] = useState('');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mapType, setMapType] = useState(MAP_TYPES.SATELLITE);
  const [uploading, setUploading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [flyToPos, setFlyToPos] = useState(null);

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => { const res = await api.get('/categories'); return res.data.data; }
  });

  useEffect(() => { if (isEditing) fetchMinistry(); }, [id]);

  const fetchMinistry = async () => {
    try {
      const res = await api.get(`/ministries/${id}`);
      const data = res.data.data;
      setFormData({ 
        name: data.name, category_id: data.category_id, description: data.description || '', 
        address: data.address || '', city: data.city || '', district: data.district || '', 
        latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude), 
        phone: data.phone || '', email: data.email || '', website: data.website || '', 
        founded_year: data.founded_year || '', total_employees: data.total_employees || '', 
        photo: data.photo || '' 
      });
      setServices(data.services || []);
      if (data.photo) setPhotoPreview(data.photo);
    } catch (error) { toast.error('Erro carrega dadus!'); }
  };

  const handleSearchLocation = async () => {
    if (!searchQuery.trim()) { toast.error('Favor hakerek naran fatin!'); return; }
    setSearching(true); setShowResults(false);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&countrycodes=tl&limit=5`);
      const data = await response.json();
      if (data && data.length > 0) { setSearchResults(data); setShowResults(true); }
      else {
        const responseWorld = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5`);
        const dataWorld = await responseWorld.json();
        if (dataWorld && dataWorld.length > 0) { setSearchResults(dataWorld); setShowResults(true); }
        else toast.error('Lokasaun la hetan! Favor tenta naran seluk.');
      }
    } catch (error) { toast.error('Erro durante peskiza!'); }
    finally { setSearching(false); }
  };

  const selectLocation = (result) => {
    const lat = parseFloat(result.lat); const lon = parseFloat(result.lon);
    setFormData({ ...formData, latitude: lat, longitude: lon });
    setFlyToPos([lat, lon]); setShowResults(false);
    setSearchQuery(result.display_name.split(',')[0]);
    toast.success('Lokasaun hili susesu!');
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    if (!file.type.startsWith('image/')) { toast.error('Favor hili imajen deit!'); return; }
    if (file.size > 2 * 1024 * 1024) { toast.error('Imajen boot liu! Maksimu 2MB.'); return; }
    setUploading(true);
    const uploadFormData = new FormData(); uploadFormData.append('image', file);
    try {
      const res = await api.post('/upload/image', uploadFormData, { headers: { 'Content-Type': 'multipart/form-data' } });
      const imageUrl = res.data.data.url;
      setFormData({ ...formData, photo: imageUrl }); setPhotoPreview(imageUrl);
      toast.success('Karrega imajen susesu!');
    } catch (error) { toast.error(error.response?.data?.message || 'Upload failed!'); }
    finally { setUploading(false); }
  };

  const removePhoto = () => { setFormData({ ...formData, photo: '' }); setPhotoPreview(''); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category_id || !formData.latitude || !formData.longitude) { 
      toast.error('Naran, kategoria, no koordenasaun tenke prense!'); return; 
    }
    setLoading(true);
    try {
      const submitData = { ...formData, services };
      if (isEditing) { 
        await api.put(`/ministries/${id}`, submitData); 
        toast.success('Ministeriu atualiza susesu!'); 
      } else { 
        await api.post('/ministries', submitData); 
        toast.success('Ministeriu kria susesu!'); 
      }
      queryClient.invalidateQueries(['admin-ministries']);
      navigate('/admin/ministries');
    } catch (error) { 
      toast.error(error.response?.data?.message || 'Erro!'); 
    }
    finally { setLoading(false); }
  };

  const addService = () => { 
    if (serviceInput.trim()) { 
      setServices([...services, { service_name: serviceInput, description: '' }]); 
      setServiceInput(''); 
    } 
  };
  
  const removeService = (index) => { setServices(services.filter((_, i) => i !== index)); };

  if (categoriesLoading && !isEditing) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">{isEditing ? 'Editar Ministeriu' : 'Aumenta Ministeriu Foun'}</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-4">
          <div>
            <label className="block text-text-secondary text-sm mb-1">Naran Ministeriu *</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white focus:outline-none focus:border-accent" required />
          </div>
          
          <div>
            <label className="block text-text-secondary text-sm mb-1">Kategoria *</label>
            <select value={formData.category_id} onChange={(e) => setFormData({...formData, category_id: e.target.value})} className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white focus:outline-none focus:border-accent" required>
              <option value="">Hili Kategoria</option>
              {categories?.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
          </div>
          
          <div>
            <label className="block text-text-secondary text-sm mb-1">Deskrisaun</label>
            <textarea rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white focus:outline-none focus:border-accent" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-text-secondary text-sm mb-1">Postu</label><input type="text" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white" /></div>
            <div><label className="block text-text-secondary text-sm mb-1">Distritu</label><input type="text" value={formData.district} onChange={(e) => setFormData({...formData, district: e.target.value})} className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white" /></div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-text-secondary text-sm mb-1">Telefone</label><input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white" /></div>
            <div><label className="block text-text-secondary text-sm mb-1">Email</label><input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white" /></div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-text-secondary text-sm mb-1">Website</label><input type="text" value={formData.website} onChange={(e) => setFormData({...formData, website: e.target.value})} className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white" /></div>
            <div><label className="block text-text-secondary text-sm mb-1">Enderecu</label><input type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white" /></div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-text-secondary text-sm mb-1">Tinan Fundasaun</label><input type="number" value={formData.founded_year} onChange={(e) => setFormData({...formData, founded_year: e.target.value})} className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white" /></div>
            <div><label className="block text-text-secondary text-sm mb-1">Total Ema Servisu</label><input type="number" value={formData.total_employees} onChange={(e) => setFormData({...formData, total_employees: e.target.value})} className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white" /></div>
          </div>
          
          {/* UPLOAD IMAJEN */}
          <div>
            <label className="block text-text-secondary text-sm mb-1">Foto Ministeriu</label>
            <div className="flex items-center gap-3">
              <label className={`flex-1 cursor-pointer ${uploading ? 'opacity-50' : ''}`}>
                <div className="flex items-center justify-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg text-text-secondary hover:text-white hover:border-accent transition">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm">{uploading ? 'Karrega Ona...' : 'Hili Imajen'}</span>
                </div>
                <input type="file" accept="image/jpeg,image/png,image/gif,image/webp" onChange={handleFileUpload} disabled={uploading} className="hidden" />
              </label>
              {photoPreview && <button type="button" onClick={removePhoto} className="p-2 bg-accent-red/20 text-accent-red rounded-lg hover:bg-accent-red/30 transition"><X className="w-4 h-4" /></button>}
            </div>
            {photoPreview && <div className="mt-2"><img src={photoPreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border border-border" /><p className="text-text-muted text-xs mt-1">Haree Imajen</p></div>}
            {!photoPreview && <p className="text-text-muted text-xs mt-1">Formatu: JPG, PNG, GIF. Maksimu 2MB</p>}
          </div>
          
          {/* SERVICES */}
          <div>
            <label className="block text-text-secondary text-sm mb-1">Servisu Sira</label>
            <div className="flex gap-2 mb-2">
              <input type="text" value={serviceInput} onChange={(e) => setServiceInput(e.target.value)} placeholder="Servisu foun..." className="flex-1 px-4 py-2 bg-secondary border border-border rounded-lg text-white" />
              <Button type="button" onClick={addService} variant="primary" size="sm">Aumenta</Button>
            </div>
            <div className="space-y-1">
              {services.map((s, idx) => (
                <div key={idx} className="flex justify-between items-center px-3 py-1 bg-hover rounded">
                  <span className="text-text-secondary text-sm">{s.service_name}</span>
                  <button type="button" onClick={() => removeService(idx)} className="text-accent-red text-sm">Hamos</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* RIGHT COLUMN - MAP */}
        <div>
          <label className="block text-text-secondary text-sm mb-1">Lokalizasaun iha Mapa *</label>
          
          {/* SEARCH LOCATION */}
          <div className="relative mb-2">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input type="text" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); if (!e.target.value.trim()) setShowResults(false); }} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSearchLocation(); } }} placeholder="Buka fatin (ex: Dili, Becora, Ainaro...)" className="w-full pl-9 pr-4 py-2 bg-secondary border border-border rounded-lg text-white placeholder-text-muted focus:outline-none focus:border-accent text-sm" />
              </div>
              <Button type="button" onClick={handleSearchLocation} variant="primary" size="sm" loading={searching}>Buka</Button>
            </div>
            
            {/* SEARCH RESULTS */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-xl z-[1001] max-h-60 overflow-y-auto">
                <div className="p-2">
                  <p className="text-text-muted text-xs mb-2 px-2">Hili lokasaun:</p>
                  {searchResults.map((result, idx) => (
                    <button key={idx} type="button" onClick={() => selectLocation(result)} className="w-full text-left px-3 py-2 hover:bg-hover rounded-lg transition flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <div><p className="text-white text-sm">{result.display_name.split(',')[0]}</p><p className="text-text-muted text-xs truncate">{result.display_name}</p></div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* MAP */}
          <div className="relative rounded-lg overflow-hidden border border-border" style={{ height: '380px' }}>
            <MapContainer center={[formData.latitude, formData.longitude]} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer url={getTileUrl(mapType)} attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>' maxZoom={MAP_CONFIG.MAX_ZOOM} maxNativeZoom={22} />
              <LocationMarker position={[formData.latitude, formData.longitude]} setPosition={(pos) => setFormData({...formData, latitude: pos[0], longitude: pos[1]})} />
              <MapTypeControl mapType={mapType} setMapType={setMapType} />
              {flyToPos && <FlyToLocation position={flyToPos} />}
            </MapContainer>
          </div>
          
          {/* COORDINATES */}
          <div className="mt-3 grid grid-cols-2 gap-4">
            <div><label className="block text-text-muted text-xs mb-1">Latitude</label><input type="text" value={formData.latitude} readOnly className="w-full px-3 py-1 bg-secondary border border-border rounded text-accent text-sm font-mono" /></div>
            <div><label className="block text-text-muted text-xs mb-1">Longitude</label><input type="text" value={formData.longitude} readOnly className="w-full px-3 py-1 bg-secondary border border-border rounded text-accent text-sm font-mono" /></div>
          </div>
          
          <button type="button" onClick={() => { 
            if (navigator.geolocation) { 
              navigator.geolocation.getCurrentPosition((pos) => { 
                setFormData({...formData, latitude: pos.coords.latitude, longitude: pos.coords.longitude}); 
                setFlyToPos([pos.coords.latitude, pos.coords.longitude]); 
                toast.success('Lokal atualiza!'); 
              }); 
            } else { 
              toast.error('Geolokalizasaun la suporta iha ita nia navegador!'); 
            } 
          }} className="mt-2 w-full px-4 py-2 bg-secondary border border-border rounded-lg text-text-secondary hover:text-white transition">
            📍 Hetan Lokal Atual
          </button>
        </div>
        
        {/* SUBMIT BUTTONS */}
        <div className="lg:col-span-2 flex gap-3 pt-4">
          <Button type="submit" variant="primary" loading={loading}>{isEditing ? 'Atualiza' : 'Rai'}</Button>
          <Button type="button" variant="outline" onClick={() => navigate('/admin/ministries')}>Kansela</Button>
        </div>
      </form>
    </div>
  );
}

export default AdminMinistryForm;
