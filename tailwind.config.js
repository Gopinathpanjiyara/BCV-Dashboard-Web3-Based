/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'background': '#1a1a1a',
        'background-lighter': '#242424',
        'primary': '#3b82f6',
      },
      boxShadow: {
        'neumorph': '5px 5px 10px #151515, -5px -5px 10px #1f1f1f',
      }
    },
  },
  plugins: [],
}
