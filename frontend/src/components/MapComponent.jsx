// frontend/src/components/MapComponent.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getTileUrl, MAP_CONFIG, MAP_TYPES } from '../utils/mapConfig';
import { Layers, Satellite } from 'lucide-react';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({ 
    iconUrl: icon, 
    shadowUrl: iconShadow, 
    iconSize: [25, 41], 
    iconAnchor: [12, 41] 
});
L.Marker.prototype.options.icon = DefaultIcon;

function FlyToMarker({ position, zoom = 15 }) {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.flyTo(position, zoom, { duration: 1.5 });
        }
    }, [position, zoom, map]);
    return null;
}

function MapTypeControl({ mapType, setMapType }) {
    const map = useMap();
    
    const changeMapType = (type) => {
        setMapType(type);
        map.eachLayer((layer) => {
            if (layer instanceof L.TileLayer) {
                map.removeLayer(layer);
            }
        });
        L.tileLayer(getTileUrl(type), {
            attribution: '&copy; <a href="https://www.google.com/maps">Google Maps</a>',
            maxZoom: MAP_CONFIG.MAX_ZOOM,
            maxNativeZoom: 22
        }).addTo(map);
    };
    
    return (
        <div className="absolute bottom-4 right-4 z-[1000] bg-card rounded-lg shadow-lg border border-border overflow-hidden">
            <div className="flex flex-row md:flex-col">
                <button
                    onClick={() => changeMapType(MAP_TYPES.SATELLITE)}
                    className={`px-3 py-2 flex items-center gap-2 text-xs transition ${
                        mapType === MAP_TYPES.SATELLITE 
                            ? 'bg-accent text-white' 
                            : 'text-text-secondary hover:bg-hover'
                    }`}
                >
                    <Satellite className="w-4 h-4" />
                    <span className="hidden md:inline">Satelite</span>
                </button>
                <button
                    onClick={() => changeMapType(MAP_TYPES.HYBRID)}
                    className={`px-3 py-2 flex items-center gap-2 text-xs transition border-t md:border-t-0 md:border-l border-border ${
                        mapType === MAP_TYPES.HYBRID 
                            ? 'bg-accent text-white' 
                            : 'text-text-secondary hover:bg-hover'
                    }`}
                >
                    <Layers className="w-4 h-4" />
                    <span className="hidden md:inline">Hibridu</span>
                </button>
            </div>
        </div>
    );
}

function MapComponent({ 
    ministries = [], 
    selectedMinistry = null, 
    onSelectMinistry,
    height = '100%',
    showControls = true,
    defaultMapType = MAP_TYPES.HYBRID
}) {
    const [mapType, setMapType] = useState(defaultMapType);
    const [mapCenter, setMapCenter] = useState(MAP_CONFIG.DEFAULT_CENTER);
    const [mapZoom, setMapZoom] = useState(MAP_CONFIG.DEFAULT_ZOOM);
    
    const FALLBACK_IMAGE = 'https://placehold.co/400x240/1a1d27/3b82f6?text=Minist%C3%A9riu';
    
    return (
        <div style={{ height, width: '100%', position: 'relative' }}>
            <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                style={{ height: '100%', width: '100%' }}
                zoomControl={true}
                minZoom={MAP_CONFIG.MIN_ZOOM}
                maxZoom={MAP_CONFIG.MAX_ZOOM}
            >
                <TileLayer
                    url={getTileUrl(mapType)}
                    attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
                    maxZoom={MAP_CONFIG.MAX_ZOOM}
                    maxNativeZoom={22}
                />
                
                {ministries.map((ministry) => (
                    <Marker
                        key={ministry.id}
                        position={[parseFloat(ministry.latitude), parseFloat(ministry.longitude)]}
                        eventHandlers={{
                            click: () => onSelectMinistry && onSelectMinistry(ministry)
                        }}
                    >
                        <Popup>
                            <div className="text-center min-w-[200px] max-w-[250px]">
                                <img 
                                    src={ministry.photo || FALLBACK_IMAGE} 
                                    alt={ministry.name} 
                                    className="w-full h-24 md:h-28 object-cover rounded-lg mb-2" 
                                />
                                <strong className="text-sm block text-white break-words">{ministry.name}</strong>
                                <p className="text-xs text-gray-400 mt-1">{ministry.Category?.name}</p>
                                <div className="flex flex-col gap-1 mt-2">
                                    <button
                                        onClick={() => window.location.href = `/ministries/${ministry.id}`}
                                        className="w-full px-3 py-1.5 bg-accent text-white text-xs rounded-lg hover:bg-blue-600 transition"
                                    >
                                        Haree Detallu
                                    </button>
                                    <button
                                        onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${ministry.latitude},${ministry.longitude}`)}
                                        className="w-full px-3 py-1.5 bg-secondary text-text-secondary text-xs rounded-lg hover:bg-hover transition"
                                    >
                                        Rota
                                    </button>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
                
                {selectedMinistry && (
                    <FlyToMarker 
                        position={[parseFloat(selectedMinistry.latitude), parseFloat(selectedMinistry.longitude)]} 
                        zoom={15}
                    />
                )}
                
                {showControls && <MapTypeControl mapType={mapType} setMapType={setMapType} />}
            </MapContainer>
        </div>
    );
}

export default MapComponent;