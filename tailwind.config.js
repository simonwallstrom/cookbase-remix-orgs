const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Recursive', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        sm: ['0.8125rem', { lineHeight: '1.25rem' }],
      },
      colors: {
        zinc: {
          950: '#131316',
        },
        gray: colors.zinc,
      },
      boxShadow: {
        'flat-sm': '1px 1px 0 #000',
        flat: '2px 2px 0 #000',
        'flat-lg': '3px 3px 0 #000',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
