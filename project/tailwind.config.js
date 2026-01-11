/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'heading-1': ['Bungee', 'cursive'],
        'heading-2': ['Caveat Brush', 'cursive'],
        'body': ['Solway', 'serif'],
      },
    },
  },
  plugins: [],
};
