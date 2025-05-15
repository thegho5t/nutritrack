// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          100: '#DBF4FF',
          200: '#ACEBFF',
          500: '#00B2FF',
          600: '#008ECC',
          700: '#006699',
        },
      },
    },
  },
  plugins: [],
};
