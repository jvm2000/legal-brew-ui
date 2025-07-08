/** @type {import('tailwindcss').Config} */

const { colors: defaultColors } = require('tailwindcss/defaultTheme')

const colors = {
  ...defaultColors,
  ...{
    "custom-brown": {
      "100": "#FAF1E9",
      "200": "#EDE0D4",
      "300": "#A68A64",
      "400": "#7F5539",
      "500": "#3A1F09",
    },
  },
}

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "colors": colors,
    },
  },
  plugins: [],
}

