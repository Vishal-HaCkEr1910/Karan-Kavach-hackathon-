/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neu-dark': '#1a1c20',
        'neu-darker': '#111215',
        'neu-light': '#2d3138',
        'neu-card': '#1e2024',
        'neu-pink': '#f53d7a',
        'neu-purple': '#a855f7',
        'neu-cyan': '#4ceccb',
        'neu-text-dim': '#6b7280',
      },
      boxShadow: {
        'neu-out': '10px 10px 20px #111215, -5px -5px 15px #2d3138',
        'neu-in': 'inset 4px 4px 8px #111215, inset -4px -4px 8px #2d3138',
        'neu-container': '20px 20px 60px #111215',
        'neu-out-sm': '5px 5px 10px #111215, -3px -3px 8px #2d3138',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
