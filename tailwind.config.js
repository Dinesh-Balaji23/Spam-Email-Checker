/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neon: {
          blue: '#00f3ff',
          purple: '#9d00ff',
          pink: '#ff00f7',
          green: '#00ff9d'
        },
        cyber: {
          dark: '#0a0a1f',
          darker: '#050514',
          light: '#2a2a4f'
        }
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { 'box-shadow': '0 0 10px #00f3ff, 0 0 20px #00f3ff, 0 0 30px #00f3ff' },
          '100%': { 'box-shadow': '0 0 20px #00f3ff, 0 0 30px #00f3ff, 0 0 40px #00f3ff' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};