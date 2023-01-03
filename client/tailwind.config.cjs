/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{svelte,html,js,ts}"],
  theme: {
    colors : {
      lightBackground : "#e8e8e8",
      lightBackground2 : "#dedede",
      lightAccent : "#000000",
      lightAccent2: "#121212",
      darkBackground : "#121212",
      darkBackground2 : "#202020",
      darkAccent : "#ffffff",
      darkAccent2 : "#f8f8f8"
    },
    screens: {
      '2xl': {'max': '1500px'},
      'xl': {'max': '1250px'},
      'lg': {'max': '100px'},
      'md': {'max': '800px'},
      'sm': {'max': '600px'},
    },
    extend: {},
  },
  plugins: [require("daisyui")],
}
