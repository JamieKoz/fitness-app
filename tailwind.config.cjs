/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: true,
  content: [],
  theme: {
    extend: {
      position: ['sticky'],
      minHeight: {
        '1920': '1920px',
      },
      screens: {
        '4xl': '2560px',
      },
      container: {
        screens: {
          '4xl': '2560px',
        }
      }
    },
  },
  plugins: [],
}