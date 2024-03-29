module.exports = {
  mode: "jit",
  darkMode: 'class',
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Poppins, sans-serif"],
    },
    extend: {
      colors: {
        grayblue: {
          100: "#D6E1FF",
          200: "#777B84",
          300: "#3C3C3E",
          400: "#818a9c",
          500: "#6f7787",
          600: "#36364A",
          700: "#182449",
          800: "#141726",
          900: "#11131F",
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
        neutral: {
          100: "#EFEFEF",
          200: "#CECECE",
          300: "#A7A7A7",
          400: "#838383",
          500: "#575757",
          600: "#3A3A3A",
          700: "#242424",
          800: "#151515",
          900: "#0F0F0F",
        },
      },
    },
  },
  plugins: [],
};
