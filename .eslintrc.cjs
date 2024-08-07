module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    "react/prop-types": "off",
    'semi': ['error', 'always'],
    '@typescript-eslint/semi': ['error', 'always'],
    'eol-last': ['error', 'always'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};