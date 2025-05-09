/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#e6f8ff',
          100: '#ccf1ff',
          200: '#99e3ff',
          300: '#66d6ff',
          400: '#33c8ff',
          500: '#00baff',
          600: '#0095cc',
          700: '#007099',
          800: '#004b66',
          900: '#002533',
        },
        'secondary': {
          50: '#e6fff9',
          100: '#ccfff2',
          200: '#99ffe6',
          300: '#66ffd9',
          400: '#33ffcc',
          500: '#00ffc0',
          600: '#00cc99',
          700: '#009973',
          800: '#00664d',
          900: '#003326',
        },
        'accent': {
          50: '#fff2e6',
          100: '#ffe6cc',
          200: '#ffcc99',
          300: '#ffb366',
          400: '#ff9933',
          500: '#ff8000',
          600: '#cc6600',
          700: '#994d00',
          800: '#663300',
          900: '#331a00',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        }
      }
    },
  },
  plugins: [],
};