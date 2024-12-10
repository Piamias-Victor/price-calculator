/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./entities/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1B301E",  // Couleur principale (ancien bg du header/footer)
        secondary: "#2A7B3B", // Couleur secondaire (accents, hover sur textes)
        light: "#EFDEBA",     // Couleur hover ancienne background
        background: "#F5FFF8", // Fond principal blanc-vert clair
      },
    },
  },
  safelist: [
    {
      pattern: /(text|bg|border|outline|from|to)-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(400|500)(\/90)?/,
      variants: ["dark", "enabled:hover", "dark:enabled:hover", "focus-visible", "dark:focus-visible"]
    },
  ],
};
