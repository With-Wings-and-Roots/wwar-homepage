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
      wwr_yellow_orange_hovered: "#efaa23",
      wwr_white: '#ffffff',
      wwr_black: '#000000',
      wwr_rich_black: '#030303',
      wwr_red_transparent: 'rgba(255,0,0,0.8)',
      wwr_gray_storm: '#757580'
     }
    },
  },
  plugins: [],
  darkMode: 'class',
}
