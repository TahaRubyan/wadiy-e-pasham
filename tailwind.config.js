/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blush': '#FFDCDC',
        'brand-cream': '#FFF2EB',
        'brand-peach': '#FFE8CD',
        'brand-[#FFD6BA]': '#FFD6BA',
        'brand-amber': '#FFD6BA',
        'brand-mocha': '#4A2B20',
        'brand-deep': '#6B3E30',
        'brand-sage-dark': '#FFD6BA',
        'brand-sage-medium': '#FFE8CD',
        'brand-sage-light': '#FFDCDC',
        'brand-dark': '#4A2B20',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      animation: {
        'marquee-slow': 'marqueeSlow 32s linear infinite',
      },
    },
  },
  plugins: [],
}
