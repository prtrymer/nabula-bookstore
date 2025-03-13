import type { Config } from 'tailwindcss'
const config: Config = {
  darkMode: 'class', 
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],},
      colors: {
        primary: {
          DEFAULT: '#4f46e5',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f3f4f6',
          foreground: '#111827',
        },
        background: {
          light: '#ffffff',
          dark: '#090A0C',
          grey: '#1A1D21',
          green: '#589C5F',
          red: '#FB3F4A'
        },
        text: {
          light: '#000000',
          dark: '#ffffff',
        }
      },
    },
  },
  plugins: [],
}
export default config