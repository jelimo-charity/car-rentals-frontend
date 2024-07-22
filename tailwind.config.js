import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlueDarkest: "#0d1b2a",
        customBlueDarker: '#1B263B', 
        customBlue: '#5fa8d3',
        customBlueLight: '#E0E1DD',
        customLight: '#EFF6E0',
      },
    },
  },
  plugins: [
    daisyui
  ],
}

