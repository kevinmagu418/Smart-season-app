/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  corePlugins: {
    // Disable preflight to prevent conflicts with MUI CSS Baseline
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          800: '#166534',
          900: '#14532d',
        },
        accent: {
          light: '#f5f5f4', // warm gray
          main: '#d7cec7',
          dark: '#a19286',
        },
        status: {
          active: '#22c55e',
          risk: '#ef4444',
          completed: '#64748b'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
export default config
