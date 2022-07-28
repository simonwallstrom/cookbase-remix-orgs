const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
        gray: colors.zinc,
      },
      boxShadow: {
        flat: "2px 2px 0 #000",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
