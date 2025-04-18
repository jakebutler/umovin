/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ED6A5A",
        secondary: "#9BC1BC",
        accent: "#36C9C6",
        background: "#FAF5E6",
      },
      borderRadius: {
        'xl': '1.25rem',
        '2xl': '2rem',
      }
    },
  },
  plugins: [],
}
