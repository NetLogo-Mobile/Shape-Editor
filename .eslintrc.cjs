module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:css/recommended'
  ],
  plugins: ['@typescript-eslint', 'svelte3', 'css'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    browser: true,
    es6: true,
  },
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
    },
    {
      files: ["*.ts"], // This can also be ["*.ts", "*.tsx"] if you're using tsx files
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
  settings: {
    'svelte3/typescript': require('typescript'), // pass the TypeScript package to the Svelte plugin
    'svelte3/ignore-styles': (attrs) => attrs.lang === 'scss',
  },
  rules: {
    'no-trailing-spaces': 'error',
  },
};
