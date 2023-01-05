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
    darkMode : 'class',
    screens: {
      'xl': {'max': '1250px'},
      'lg': {'max': '1000px'},
      'md': {'max': '800px'},
      'sm': {'max': '600px'},
      'min-xl': {'min': '1250px'},
      'min-lg': {'min': '1000px'},
      'min-md': {'min': '800px'},
      'min-sm': {'min': '600px'},
    },
  },
  plugins: [
      require("daisyui"),
      require('@tailwindcss/line-clamp')
  ],
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

