/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#c5a572",
        "gold-dark": "#9b834c",
        cream: "#f8f5f0",
      },
      fontFamily: {
        sans: ["Montserrat", "Helvetica Neue", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
