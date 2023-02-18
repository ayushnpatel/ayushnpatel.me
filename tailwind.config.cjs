const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["*.{html, js}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        '88': '22rem',
        '59': '14.66rem',
        '27': '6.75rem',
        '24.75': '6.19rem',
        '37.33': '6.66rem',
        '78': '19.5rem'
      },
      fontFamily: {
        sans: ["Rubik", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "slate-grey": "#6B7F82",
        "eerie-black": "#171D1C",
        "aerospace-orange": "#FF500A",
        "dark-azure": "#042225",
        "alice-blue":'#F0F8FF',
        "dark-teal": "#013a2f",
        poppy: "#DD4045",
      },
      animation: {
        text: "text 4s ease infinite",
      },
      keyframes: {
        gradient: {
          "0%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
          "100%": {
            "background-position": "0% 50%",
          },
        },
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
    },
  },
  plugins: [],
};
