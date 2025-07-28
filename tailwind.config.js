/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        airtable: {
          blue: '#2D7FF9',
          'blue-dark': '#1E5FCC',
          'blue-light': '#E6F2FF',
          gray: '#6B7280',
          'gray-light': '#F9FAFB',
          'gray-dark': '#374151',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
