/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/*.{js,jsx,ts,tsx}",
    "./components/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1C1C1E",
        secondary: "#2C2C2E",
        tertiary: "#3A3A3C",
      },
    },
  },
  plugins: [],
};
