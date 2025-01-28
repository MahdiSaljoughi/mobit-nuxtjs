/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        main: "#377DFF",
      },
      fontSize: {
        sx: "12.8px",
      },
      fontFamily: {
        IRANr: ["IRAN-R"],
      },
    },
  },
  plugins: [],
};
