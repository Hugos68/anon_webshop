/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{svelte,html,js,ts}"],
  theme: {
    screens: {
      '2xl': {'max': '1500px'},
      'xl': {'max': '1250px'},
      'lg': {'max': '100px'},
      'md': {'max': '800px'},
      'sm': {'max': '600px'},
    },
    extend: {},
  },
  plugins: [],
}
