/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      'title': ['"Roboto Slab"', 'serif'],
      'nunito': ['"Nunito"', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}