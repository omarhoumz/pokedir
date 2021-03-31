const colors = require('tailwindcss/colors')

const pokeColors = [
  'black',
  'blue',
  'brow',
  'gray',
  'green',
  'pink',
  'purple',
  'red',
  'white',
  'yellow',
]

function getClasses(colors, shades, props) {
  return colors
    .map((color) =>
      shades.map((shade) => props.map((prop) => `${prop}-${color}-${shade}`)),
    )
    .flat()
    .flat()
}

const borderShades = getClasses(pokeColors, ['500'], ['border'])
const focusRingShades = getClasses(pokeColors, ['200'], ['focus:ring'])
const bgShades = getClasses(pokeColors, ['50', '400'], ['bg'])
const textShades = getClasses(pokeColors, ['700', '800'], ['text'])

module.exports = {
  purge: {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
    options: {
      safelist: [
        ...borderShades,
        ...bgShades,
        ...textShades,
        ...focusRingShades,
        'animation-fade',
      ],
    },
  },
  darkMode: false,
  theme: {
    extend: {
      colors: {
        brown: colors.amber,
        'white-400': colors.blueGray[400],
      },
      animation: {
        fade: 'fade 0.3s ease-in-out',
      },
      keyframes: {
        fade: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
