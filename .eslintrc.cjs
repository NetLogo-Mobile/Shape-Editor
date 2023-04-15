module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:css/recommended"
  ],
  plugins: ["svelte3", "css"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  env: {
    browser: true,
    es6: true,
  },
  overrides: [
    {
      files: ["*.svelte"],
      processor: "svelte3/svelte3",
    },
  ],
  settings: {
    "svelte3/ignore-styles": (attrs) => attrs.lang === "scss",
  },
  rules: {
    "css/no-duplicate-selectors": ["error", { "count": 1 }],
    // Add more CSS rules here
  }
};
