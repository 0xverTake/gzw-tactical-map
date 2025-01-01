/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #d4a559, 0 0 40px #d4a559' },
          '100%': { textShadow: '0 0 20px #fff, 0 0 30px #8b4513, 0 0 40px #8b4513, 0 0 50px #8b4513' },
        },
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)',
      },
      colors: {
        rust: {
          light: '#d4a559',
          DEFAULT: '#8b4513',
          dark: '#5c2d0d',
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
