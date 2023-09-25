/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
     colors: {
      wwr_yellow_orange: '#faba3a',
      wwr_white: '#ffffff',
      wwr_black: '#000000',
      wwr_rich_black: '#030303'
     }
    },
  },
  plugins: [],
}
