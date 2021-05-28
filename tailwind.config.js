const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        green: colors.emerald,
        blue: colors.indigo,
        gray: colors.warmGray,
      },
    },
  },
  variants: {},
  plugins: [],
}
