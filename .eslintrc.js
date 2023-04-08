module.exports = {
    extends: ["eslint:recommended", "plugin:prettier/recommended", "plugin:svelte3/recommended"],
    plugins: ["svelte3"],
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
    env: {
      browser: true,
      es6: true,
    },
    rules: {},
    settings: {
      "svelte3/ignore-styles": (attrs) => attrs.lang === "scss",
    },
  };
  