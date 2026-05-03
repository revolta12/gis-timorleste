// frontend/src/utils/mapConfig.js

// Konfigurasaun Mapa Satélite
export const MAP_CONFIG = {
    // Google Maps Satellite + Labels (naran fatin, estrada - hanesan Google Maps app)
    SATELLITE_URL: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',

    // Google Hybrid (Satellite + Label estrada/naran fatin)
    HYBRID_URL: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',

    // Esri Satellite (Alternativa)
    ESRI_SATELLITE_URL: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',

    // Default zoom no center
    DEFAULT_CENTER: [-8.55, 125.57], // Dili, Timor-Leste
    DEFAULT_ZOOM: 12,
    MIN_ZOOM: 8,
    MAX_ZOOM: 22,

    // Tipe marker kona ba kategoria
    CATEGORY_MARKERS: {
        'Assuntu Internu': { color: '#3b82f6', icon: 'Shield' },
        'Saúde': { color: '#10b981', icon: 'Heart' },
        'Edukasaun': { color: '#8b5cf6', icon: 'GraduationCap' },
        'Finansas': { color: '#f59e0b', icon: 'Wallet' },
        'Lei no Justisa': { color: '#ef4444', icon: 'Scale' },
        'Agrikultura': { color: '#22c55e', icon: 'Sprout' },
        'Infraestrutura': { color: '#f97316', icon: 'HardHat' },
        'Ambiente': { color: '#06b6d4', icon: 'Leaf' },
        'Turizmu': { color: '#ec4899', icon: 'Palmtree' },
        'Komérsiu': { color: '#a855f7', icon: 'Store' }
    }
};

// Tipe mapa ne'ebé disponivel
export const MAP_TYPES = {
    SATELLITE: 'satellite',
    HYBRID: 'hybrid',
    STREET: 'street',
    DARK: 'dark'
};

// Configurasaun URL ba kada tipe
export const getTileUrl = (type) => {
    switch(type) {
        case MAP_TYPES.SATELLITE:
            return MAP_CONFIG.SATELLITE_URL;
        case MAP_TYPES.HYBRID:
            return MAP_CONFIG.HYBRID_URL;
        case MAP_TYPES.STREET:
            return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        case MAP_TYPES.DARK:
            return 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
        default:
            return MAP_CONFIG.HYBRID_URL;
    }
};
