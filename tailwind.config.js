/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#8B5CF6',
          dark: '#7C3AED',
        },
        secondary: {
          light: '#A78BFA',
          dark: '#8B5CF6',
        },
      },
    },
  },
  plugins: [],
}

