import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/View/Resources/**/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                display: ['Manrope', 'sans-serif'],
            },
            borderRadius: {
                DEFAULT: '0.25rem',
                lg: '0.5rem',
                xl: '0.75rem',
                'full': '9999px',
            },
            colors: {
                'deep-space-blue': {
                    DEFAULT: '#003049',
                    50: '#a7e0ff',
                    100: '#50c2ff',
                    200: '#00a0f7',
                    300: '#00679f',
                    400: '#002539',
                    500: '#003049',
                    600: '#001c2b',
                    700: '#00131d',
                    800: '#00090e',
                    900: '#000000',
                },
                'flag-red': {
                    DEFAULT: '#d62828',
                    50: '#f7d4d4',
                    100: '#efa9a9',
                    200: '#e77e7e',
                    300: '#df5353',
                    400: '#ac2020',
                    500: '#d62828',
                    600: '#811818',
                    700: '#561010',
                    800: '#2b0808',
                    900: '#000000',
                },
                'vivid-tangerine': {
                    DEFAULT: '#f77f00',
                    50: '#ffe5ca',
                    100: '#ffcc95',
                    200: '#ffb260',
                    300: '#ff982b',
                    400: '#c46500',
                    500: '#f77f00',
                    600: '#934c00',
                    700: '#623300',
                    800: '#311900',
                    900: '#000000',
                },
                'sunflower-gold': {
                    DEFAULT: '#fcbf49',
                    50: '#fef3db',
                    100: '#fee6b7',
                    200: '#fdda92',
                    300: '#fdcd6e',
                    400: '#fbab0a',
                    500: '#fcbf49',
                    600: '#c18203',
                    700: '#815602',
                    800: '#402b01',
                    900: '#000000',
                },
                'vanilla-custard': {
                    DEFAULT: '#eae2b7',
                    50: '#fbf9f1',
                    100: '#f7f4e3',
                    200: '#f3eed4',
                    300: '#eee8c6',
                    400: '#d8c977',
                    500: '#eae2b7',
                    600: '#c2ae38',
                    700: '#827426',
                    800: '#413a13',
                    900: '#000000',
                },
            },
        },
    },

    plugins: [forms],
};
