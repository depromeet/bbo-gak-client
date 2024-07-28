import type { Config } from 'tailwindcss';

const px0To10 = { ...Array.from(Array(11)).reduce((acc, _, i) => ({ ...acc, [i]: `${i}px` }), {}) };
const px0To100 = { ...Array.from(Array(101)).reduce((acc, _, i) => ({ ...acc, [i]: `${i}px` }), {}) };
const px0To500 = { ...Array.from(Array(501)).reduce((acc, _, i) => ({ ...acc, [i]: `${i}px` }), {}) };

const config: Config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    extend: {
      width: px0To500,
      height: px0To500,
      borderWidth: px0To10,
      fontSize: px0To100,
      lineHeight: px0To100,
      minWidth: px0To500,
      minHeight: px0To500,
      spacing: px0To500,
      borderRadius: { ...px0To100, button: 6 },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: { drodpown: '0px 0px 10px 5px rgba(0, 0, 0, 0.08)', nav: '0px 4px 25px 1px rgba(0,0,0,0.05)' },
    },
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      neutral: {
        '1': '#F9F9FA',
        '5': '#EAEBEC',
        '10': '#DBDCDF',
        '20': '#CCCDD1',
        '30': '#AEB0B6',
        '35': '#989BA2',
        '40': '#878A93',
        '50': '#70737C',
        '60': '#5A5C63',
        '70': '#46474C',
        '75': '#37383C',
        '80': '#27282C',
        '90': '#212225',
        '95': '#1B1C1E',
      },
      red: {
        '1': '#FFFAF7',
        '5': '#FFEBE0',
        '10': '#FCAEA9',
        '20': '#FF8F87',
        '30': '#FE7A70',
        '40': '#FF6C62',
        '50': '#F1564B',
      },
      mint: {
        '1': '#C6FAE6',
        '10': '#98F9D5',
        '20': '#29FFB0',
        '30': '#08F29B',
        '40': '#0DD78C',
        '50': '#1BA673',
      },
      blue: {
        bg: {
          '1': '#E8F1FF',
        },
        text: {
          '1': '#418CC3',
        },
      },
      purple: {
        bg: {
          '1': '#F1E8FF',
        },
        text: {
          '1': '#9C6BB3',
        },
        keyframes: {
          'accordion-down': {
            from: { height: '0' },
            to: { height: 'var(—radix-accordion-content-height)' },
          },
          'accordion-up': {
            from: { height: 'var(—radix-accordion-content-height)' },
            to: { height: '0' },
          },
        },
        animation: {
          'accordion-down': 'accordion-down 0.2s ease-out',
          'accordion-up': 'accordion-up 0.2s ease-out',
        },
      },
    },
  },
};

export default config;