/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{vue,js}',
    './components/**/*.{vue,js}',
    './layouts/**/*.{vue,js}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ef4444', // Replace with your desired primary color
        secondary: '#9333EA', // Replace with your desired secondary color
      },
    },
  },
  plugins: [],
};
