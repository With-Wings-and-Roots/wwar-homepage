/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    fontFamily: {
      main: ['proxima-nova', 'serif'],
      special: ['Open Sans', 'Helvetica', 'sans-serif'],
    },
    extend: {
      fontSize: {
        '26px': '1.625rem',
      },
      colors: {
        wwr_yellow_orange: '#faba3a',
        wwr_yellow_orange_hovered: '#efaa23',
        wwr_white: '#ffffff',
        wwr_black: '#000000',
        wwr_rich_black: '#030303',
        wwr_red_transparent: 'rgba(255,0,0,0.8)',
        wwr_gray_storm: '#757580',
        wwr_outer_space: '#46464d',
        wwr_turquoise: '#35D0DC',
        wwr_light: '#fff4df',
        wwr_majorelle_blue: '#564AE9',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
