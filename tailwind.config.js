/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': 'rgba(28, 14, 94, 0.5)', // Using RGBA format
        'custom-pink':'rgba(94, 52, 161, 0.479)',
        'custom-bg':'rgba(94, 52, 161, 0.479)',
      },
    },
  },
  plugins: [],
};