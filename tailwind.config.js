/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      background: '#000000',
      foreground: '#E0E0E0',
      white: '#E0E0E0',
      black: '#0F0F0F',
      purple: {
        100: '#e0ccf4',
        200: '#d4bfeb',
        300: '#c9b2e2',
        400: '#bea6d9',
        500: '#b29bd1',
        600: '#a78fc8',
        700: '#9f88bf',
        800: '#9781b4',
        900: '#8e79aa',
      },
      blue: {
        100: '#c9d2f8',
        200: '#b9c4f0',
        300: '#abb7e7',
        400: '#9caadf',
        500: '#8f9fd6',
        600: '#8293ce',
      },
      yellow: {
        100: '#eef0a1',
        200: '#e2e293',
        300: '#d4d285',
        400: '#c6c277',
        500: '#b8b26b',
        600: '#aba45f',
      },
      red: {
        100: '#fad1d1',
        200: '#eec1c1',
        300: '#e3b2b2',
        400: '#d7a3a3',
        500: '#cc9595',
        600: '#c08888',
      },
      green: {
        100: '#d3f9b5',
        200: '#c4eda5',
        300: '#b6e095',
        400: '#a8d487',
        500: '#9ac779',
        600: '#8dba6b',
      },
      neutral: {
        100: '#c6c6c6',
        200: '#acacac',
        300: '#929292',
        400: '#787878',
        500: '#5d5d5d',
        600: '#434343',
        700: '#292929',
        800: '#222222',
        900: '#1b1b1b',
      },
    },
    fontFamily: {
      popBlack: 'Poppins-Black',
      popBlackItalic: 'Poppins-BlackItalic',

      popExtraBold: 'Poppins-ExtraBold',
      popExtraBoldItalic: 'Poppins-ExtraBoldItalic',

      popBold: 'Poppins-Bold',
      popBoldItalic: 'Poppins-BoldItalic',

      popSemiBold: 'Poppins-SemiBold',
      popSemiBoldItalic: 'Poppins-SemiBoldItalic',

      popMedium: 'Poppins-Medium',
      popMediumItalic: 'Poppins-MediumItalic',

      popRegular: 'Poppins-Regular',
      popItalic: 'Poppins-Italic',

      popLight: 'Poppins-Light',
      popLightItalic: 'Poppins-LightItalic',

      popExtraLight: 'Poppins-ExtraLight',
      popExtraLightItalic: 'Poppins-ExtraLightItalic',

      popThin: 'Poppins-Thin',
      popThinItalic: 'Poppins-ThinItalic',
    },
    extend: {
      padding: {
        offset: '90px',
      },
      margin: {
        page: '14px',
      },
    },
  },
  plugins: [],
};
