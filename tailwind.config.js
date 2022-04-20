module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          400: '#28A45A',
          300: '#45D37E'
        },
        black: {
          400: '#000',
          300: '#262626',
          200: '#292929',
        },
        white: {
          400: '#FFF',
          300: '#F1F1F1',
          200: '#F5F5F5',
        },
        grey: {
          400: '#969696',
          300: '#E3E3E3'
        },
        red: {
          400: '#F44366'
        },
        blue: {
          400: '#27303A'
        }
      }
    },
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
