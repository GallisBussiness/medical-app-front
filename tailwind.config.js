/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'back': "url('./backgrounds/img3.jpg')",
      },
      colors: {
        'whity': '#FDFFFC',
        'primary': '#4464AD',
        'secondary': '#20BF55',
        'blacky':'#0C0910',
        'danger': '#C1292E',
      },
    },
  },
  plugins: [],
}
