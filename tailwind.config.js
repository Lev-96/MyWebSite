/** @type {import('tailwindcss').Config} */
module.exports = {
  // 🔑 This is the most crucial part for class generation
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Make sure this covers all your component files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
