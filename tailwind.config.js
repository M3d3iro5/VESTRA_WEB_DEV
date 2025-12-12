/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Permite alternar manualmente
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modo Escuro (Cyberpunk Data)
        "vestra-dark": "#0a0a0a", // Preto quase absoluto
        "vestra-purple": {
          400: "#c084fc",
          600: "#9333ea",
          900: "#581c87",
        },
        // Modo Claro (Clean Tech)
        "vestra-light": "#ffffff",
        "vestra-pink": {
          50: "#fdf2f8",
          500: "#ec4899",
          700: "#be185d",
        },
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
