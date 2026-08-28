/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#2F302A',
        forest: '#007940',
        'forest-dark': '#005F32',
        lime: '#C5E838',
        sand: '#F3EEE4',
        leaf: '#6EB02E',
        sun: '#E7C221',
        light: '#EFE98C',
        mist: '#C5E838',
        canvas: '#F3EEE4',
        slate: {
          50: '#FBF9F4',
          100: '#F3EEE4',
          200: '#E4DED2',
          300: '#CDC5B7',
          400: '#969187',
          500: '#6D6D65',
          600: '#55564F',
          700: '#3F4039',
          800: '#2F302A',
          900: '#23241F',
        },
      },
      boxShadow: {
        soft: '0 10px 28px -24px rgba(47, 48, 42, 0.5)',
      },
    },
  },
  plugins: [],
}
