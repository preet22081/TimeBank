/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,

  theme: {
    extend: {
      colors: {
        mint: "#3EB489",
        mintHover: "#32a17b",
        slateText: "#334155",
        slateDark: "#1E293B",
        lightBG: "#F8FAFC",
      },
    },
  },
  plugins: [],
};
