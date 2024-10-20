/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    extend: {
      screens: {
        main: '375px',
      },
      fontFamily: {
        inter: 'Inter',
        outfit: 'Outfit',
        chakra: 'Chakra Petch',
        jakarta: 'Plus Jakarta Sans',
        backToSchool: 'Back to School',
      },
      colors: {
        primary: '#5E8EFF',
        main: '#3873FF',
        warning: 'hsl(var(--warning))',
        gold: '#FDC237',
        gray: '#848486',
        'warning-foreground': 'hsl(var(--warning-foreground))',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(261.5deg, #5F9FFF -11.41%, #5F73DF 36.54%, #3B40BB 84.5%)',
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/aspect-ratio')],
};
