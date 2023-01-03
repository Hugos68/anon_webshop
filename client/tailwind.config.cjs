const plugin = require('tailwindcss/plugin')
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
  plugins: [
    plugin(function groupPeer({ addVariant }) {
      let pseudoVariants = [
        "checked",
      ].map((variant) =>
          Array.isArray(variant) ? variant : [variant, `&:${variant}`],
      );

      for (let [variantName, state] of pseudoVariants) {
        addVariant(`group-peer-${variantName}`, (ctx) => {
          let result = typeof state === "function" ? state(ctx) : state;
          return result.replace(/&(\S+)/, ":merge(.peer)$1 ~ .group &");
        });
      }
    })
  ],
}
