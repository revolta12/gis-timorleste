import React from 'react';

export const TaisPattern = ({ className = "" }) => (
  <div className={`absolute inset-0 opacity-10 pointer-events-none ${className}`}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="tais-zigzag" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 20 L10 0 L20 20 L30 0 L40 20" stroke="#ffc72c" strokeWidth="1" fill="none"/>
          <path d="M0 40 L10 20 L20 40 L30 20 L40 40" stroke="#dc241f" strokeWidth="1" fill="none"/>
        </pattern>
        <pattern id="tais-diamond" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <rect x="10" y="0" width="10" height="10" fill="#dc241f" opacity="0.3"/>
          <rect x="0" y="10" width="10" height="10" fill="#ffc72c" opacity="0.3"/>
          <rect x="20" y="10" width="10" height="10" fill="#ffc72c" opacity="0.3"/>
          <rect x="10" y="20" width="10" height="10" fill="#dc241f" opacity="0.3"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#tais-zigzag)"/>
      <rect width="100%" height="100%" fill="url(#tais-diamond)"/>
    </svg>
  </div>
);

export const StarOfTimor = ({ className = "w-6 h-6", animate = false }) => (
  <svg 
    className={`text-white drop-shadow-lg ${animate ? 'animate-tl-float' : ''} ${className}`} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z"/>
  </svg>
);

export const FlagTriangle = ({ className = "" }) => (
  <div className={`absolute ${className}`}>
    <svg viewBox="0 0 200 200" className="w-full h-full" preserveAspectRatio="none">
      <polygon points="0,0 200,100 0,200" fill="#1a1a1a" opacity="0.6"/>
      <polygon points="0,10 180,100 0,190" fill="#dc241f" opacity="0.8"/>
    </svg>
  </div>
);

export const BenderaStrip = ({ className = "" }) => (
  <div className={`flex h-2 w-full ${className}`}>
    <div className="flex-1 bg-tl-red"></div>
    <div className="flex-1 bg-tl-yellow"></div>
    <div className="flex-1 bg-tl-black"></div>
    <div className="flex-1 bg-tl-red"></div>
    <div className="flex-1 bg-tl-yellow"></div>
  </div>
);

export const MountainSilhouette = ({ className = "" }) => (
  <div className={`absolute bottom-0 left-0 right-0 pointer-events-none ${className}`}>
    <svg viewBox="0 0 1440 320" className="w-full" preserveAspectRatio="none">
      <path 
        fill="#1a1a1a" 
        fillOpacity="0.4"
        d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
    </svg>
  </div>
);

export const CoastalWave = ({ className = "" }) => (
  <div className={`absolute bottom-0 left-0 right-0 pointer-events-none ${className}`}>
    <svg viewBox="0 0 1440 120" className="w-full" preserveAspectRatio="none">
      <path 
        fill="rgba(26,26,26,0.3)" 
        d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,69.3C960,85,1056,107,1152,101.3C1248,96,1344,64,1392,48L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
      ></path>
    </svg>
  </div>
);

export default TaisPattern;

