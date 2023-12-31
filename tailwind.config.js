/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.ejs'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    function({addUtilities}){
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".text-xxs": {
          "font-size": "0.60rem",
        },
        ".border-3": {
          "border-width": "3px",
        },
      }
      addUtilities(newUtilities);
    }
  ],
}

