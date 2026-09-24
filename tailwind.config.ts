import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        espresso: '#241A16',
        coffee: '#5A3828',
        caramel: '#A66A3F',
        cream: '#F6F0E7',
        'warm-white': '#FCFAF7',
        beige: '#E9DED0',
        gold: '#C9A45C',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '10px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(36,26,22,0.25)',
        deep: '0 30px 60px -20px rgba(36,26,22,0.45)',
        glass: '0 8px 32px -8px rgba(36,26,22,0.18)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(.22,.61,.36,1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'steam': {
          '0%':   { strokeDashoffset: '60', transform: 'translateY(0)' },
          '50%':  { strokeDashoffset: '0',  transform: 'translateY(-2px)' },
          '100%': { strokeDashoffset: '-60', transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up .6s cubic-bezier(.22,.61,.36,1) both',
        'float-soft': 'float-soft 6s ease-in-out infinite',
        'steam': 'steam 4s ease-in-out infinite',
        'shimmer': 'shimmer 1.6s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;