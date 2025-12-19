/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Knight Financial Brand Colors
        'knight-black': '#000000',
        'knight-gold': '#FFD700',
        'knight-gold-dark': '#B8860B',
        'knight-gold-light': '#FFF4CC',
        'knight-silver': '#C0C0C0',
        'knight-bronze': '#CD7F32',
        'knight-card': '#0a0a0a',
        'knight-hover': '#1a1a1a',
        'knight-bg': '#000000',
        
        // Semantic colors with gold accents
        'primary': '#FFD700',
        'secondary': '#B8860B',
        'accent': '#FFF4CC',
        
        // Gray scale
        'gray-850': '#1a1a1a',
        'gray-950': '#0a0a0a',
      },
      backgroundColor: {
        'knight-bg': '#000000',
        'knight-card': '#0a0a0a',
        'knight-hover': '#1a1a1a',
      },
      borderColor: {
        'knight-gold': '#FFD700',
        'knight-gold-dark': '#B8860B',
      },
      boxShadow: {
        'gold': '0 0 20px rgba(255, 215, 0, 0.3)',
        'gold-lg': '0 0 40px rgba(255, 215, 0, 0.5)',
        'gold-inner': 'inset 0 0 10px rgba(255, 215, 0, 0.2)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        glow: {
          'from': {
            'box-shadow': '0 0 10px rgba(255, 215, 0, 0.2)',
          },
          'to': {
            'box-shadow': '0 0 20px rgba(255, 215, 0, 0.5)',
          },
        },
        shimmer: {
          'from': {
            'background-position': '0% 0%',
          },
          'to': {
            'background-position': '-200% 0%',
          },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        slideUp: {
          'from': { 
            opacity: '0',
            transform: 'translateY(20px)',
          },
          'to': { 
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      fontFamily: {
        'knight': ['system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FFD700 0%, #B8860B 100%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.3), transparent)',
      },
    },
  },
  plugins: [],
}
