/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f0',
          100: '#dcf2dc',
          200: '#bbe5bb',
          300: '#8cd48c',
          400: '#5BBF7A', // Verde principal
          500: '#47a461',
          600: '#37864b',
          700: '#2d6a3e',
          800: '#265534',
          900: '#21462d',
        },
        secondary: {
          50: '#fff8f0',
          100: '#ffeedd',
          200: '#ffdabb',
          300: '#ffc088',
          400: '#FFB36B', // Naranja principal
          500: '#ff954d',
          600: '#f07a2e',
          700: '#c85f1f',
          800: '#a04b1d',
          900: '#823d1c',
        },
        neutral: {
          50: '#F8F9FA', // Fondo claro
          900: '#4A4A4A', // Texto principal
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'brand': '8px',
      }
    },
  },
  plugins: [],
}