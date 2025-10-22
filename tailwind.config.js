/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        'brand': {
          // Pantone 356 - Verde institucional primario
          356: '#007A3D',
          // Pantone 364 - Verde medio
          364: '#4A7729',
          // Pantone 354 - Verde claro brillante
          354: '#00AB4E',
          // Pantone 348 - Verde intenso
          348: '#00843D',
          // Pantone 362 - Verde oscuro
          362: '#26603C',
          // Pantone 7488 - Verde para fondos oscuros
          7488: '#3A913F',
          // Negro 80%
          'black80': '#333333',
          // Amarillo corporativo
          yellow: '#FFF500',
        },
      },
      fontFamily: {
        'sans': ['Arial', 'Franklin Gothic Book', 'system-ui', 'sans-serif'],
        'franklin': ['Franklin Gothic Book', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
