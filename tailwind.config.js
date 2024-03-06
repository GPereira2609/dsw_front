/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        '030637': '#030637',
        '3C0753': '#3C0753',
        '720455': '#720455',
      }
    },
  },
  plugins: [],
}

