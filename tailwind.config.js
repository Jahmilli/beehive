/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFFAEE", // Creamy
        primaryText: "#00004C", // navy blue like
        info: "#0052CC",
        warning: "#DE350B",
        secondary: "#FFCDA4",
        // secondary: "#FBCF7A", // yellow
        // secondaryText: "#F9F8FB", // white
        // disabledButton: "#abb0de", // lighter violet
        // yellow: "#FBCF7A",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
