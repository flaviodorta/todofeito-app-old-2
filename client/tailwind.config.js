/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        '3xl':
          'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
        '4xl': 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px',
        'dragging-item': 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px',
      },
      zIndex: {
        60: '60',
        70: '70',
        80: '80',
        90: '90',
        100: '100',
      },
      colors: {
        black: '#202020',
      },
    },
  },
  plugins: [require('tailwindcss-scoped-groups')],
};
