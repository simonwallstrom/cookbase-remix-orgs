const defaultTheme = require('tailwindcss/defaultTheme')

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
      boxShadow: {
        'flat-sm': '1px 1px 0 #000',
        flat: '2px 2px 0 #000',
        'flat-lg': '3px 3px 0 #000',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
