module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: [
        "Poppins, sans-serif"
      ]
    },
    extend: {
      colors: {
        grayblue: {
          100: "#B3B3BF",
          200: "#D8D8D8",
          300: "#3C3C3E",
          400: "#616178",
          500: "#5c6372",
          600: "#36364A",
          700: "#383b4b",
          800: "#171b2e",
          900: "#0d1124",
          950: "#000",
        },
        brand: {
          100: "#90AEFC",
          200: "#6991F8",
          300: "#5983EF",
          400: "#426BD5",
          500: "#3157B8",
          600: "#22449B",
          700: "#16337D",
          800: "#102865",
          900: "#0B1C47",
          950: "#07153A",
        },
      },
    },
  },
  plugins: [],
};
