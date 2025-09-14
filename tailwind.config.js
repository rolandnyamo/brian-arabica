/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        espresso: "#3B2A22",
        clay: "#815B48",
        stone: "#F5F0E6",
        equator: "#F2C300",
        forest: "#2F6B3F",
        nile: "#2A5C8D",
        accentRed: "#CE1126",
        accentYellow: "#FCDC04",
        accentBlack: "#000000"
      },
      boxShadow: {
        brand: "0 10px 30px rgba(0,0,0,0.15)"
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        display: ["var(--font-fraunces)"]
      }
    },
  },
  plugins: [],
};
