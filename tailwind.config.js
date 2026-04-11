/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 40px rgba(99,102,241,0.25)"
      },
      backgroundImage: {
        mesh: "radial-gradient(circle at top left, rgba(99,102,241,0.20), transparent 30%), radial-gradient(circle at top right, rgba(16,185,129,0.18), transparent 28%), radial-gradient(circle at bottom center, rgba(236,72,153,0.16), transparent 26%)"
      }
    }
  },
  plugins: []
}
