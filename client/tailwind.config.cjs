const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{svelte,html,js,ts}"],
  theme: {
    extend: {
      content: '',
      transitionProperty: {
        w : 'width',
      }
    },
    screens: {
      '2xl': {'max': '1500px'},
      'xl': {'max': '1250px'},
      'lg': {'max': '100px'},
      'md': {'max': '800px'},
      'sm': {'max': '600px'},
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: {
          "primary": "#202020",
          "secondary": "#121212",
          "accent": "#ffffff",
          "neutral": "#f8f8f8",
          "base-100": "#ffffff",
          "info": "#ffffff",
          "success": "#ffffff",
          "warning": "#ffffff",
          "error": "#ffffff",
        },
        light: {
          "primary": "#dedede",
          "secondary": "#e8e8e8",
          "accent": "#000000",
          "neutral": "#121212",
          "base-100": "#ffffff",
          "info": "#ffffff",
          "success": "#ffffff",
          "warning": "#ffffff",
          "error": "#ffffff",
        },
      }
    ],
  },
}

