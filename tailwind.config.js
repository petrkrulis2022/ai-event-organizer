/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Scan all files in the app directory
    "./components/**/*.{js,ts,jsx,tsx}", // Scan all files in the components directory
    "./pages/**/*.{js,ts,jsx,tsx}", // Scan all files in the pages directory (if using Next.js)
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all files in the src directory (if using Create React App or similar)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};