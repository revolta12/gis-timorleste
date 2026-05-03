module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#0b0f19',
        secondary: '#111827',
        card: '#1a1f2e',
        hover: '#1f2937',
        accent: '#dc241f',
        'accent-yellow': '#ffc72c',
        'accent-green': '#10b981',
        'accent-amber': '#f59e0b',
        'accent-red': '#ef4444',
        'text-primary': '#f1f5f9',
        'text-secondary': '#94a3b8',
        'text-muted': '#64748b',
        border: 'rgba(255,255,255,0.06)',
        // Timor-Leste theme colors - Bendera Timor-Leste
        'tl-red': '#dc241f',
        'tl-yellow': '#ffc72c',
        'tl-black': '#1a1a1a',
        'tl-white': '#ffffff',
        'tl-red-dark': '#b91c1c',
        'tl-red-light': '#ef4444',
        'tl-yellow-dark': '#d4a017',
        'tl-yellow-light': '#fde047',
      },
      backgroundImage: {
        'tl-flag-gradient': 'linear-gradient(135deg, #dc241f 0%, #b91c1c 50%, #1a1a1a 100%)',
        'tl-hero-gradient': 'linear-gradient(135deg, rgba(220,36,31,0.95) 0%, rgba(26,26,26,0.9) 50%, rgba(255,199,44,0.8) 100%)',
        'tl-triangle-red': 'linear-gradient(135deg, #dc241f 0%, #b91c1c 100%)',
        'tl-triangle-yellow': 'linear-gradient(135deg, #ffc72c 0%, #d4a017 100%)',
      },
      animation: {
        'tl-pulse': 'tlPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'tl-float': 'tlFloat 3s ease-in-out infinite',
        'tl-shimmer': 'tlShimmer 2s linear infinite',
      },
      keyframes: {
        tlPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        tlFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        tlShimmer: {
          'from': { backgroundPosition: '-200% 0' },
          'to': { backgroundPosition: '200% 0' },
        },
      },
    }
  },
  plugins: []
}

