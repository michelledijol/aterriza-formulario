/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Tipografías de Aterriza
      fontFamily: {
        'serif': ['Fraunces', 'Georgia', 'serif'],
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'accent': ['Poppins', 'sans-serif'],
      },
      // Colores personalizados de Aterriza
      colors: {
        // Colores principales
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#1d1d1f',
        },
        // Colores de acento (rosa)
        accent: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        // Colores específicos de Aterriza
        lilac: '#A78BFA',
        pink: '#F9A8D4',
        mint: '#86EFAC',
        ink: '#141414',
        muted: '#6B7280',
      },
      // Espaciados personalizados
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      // Breakpoints personalizados
      screens: {
        '3xl': '1920px',
      },
      // Bordes redondeados
      borderRadius: {
        'custom': '16px',
      },
      // Sombras personalizadas
      boxShadow: {
        'custom': '0 10px 30px rgba(16, 24, 40, 0.12)',
        'custom-hover': '0 8px 20px rgba(16, 24, 40, 0.12)',
      },
    },
  },
  plugins: [],
}
