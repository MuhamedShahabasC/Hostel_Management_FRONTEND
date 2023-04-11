/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        primary: '#00255F'
      },
      extend: {
        visibility: ["group-hover"],
      },
    },
  },
  plugins: [],
};
