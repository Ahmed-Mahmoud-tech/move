module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    indent: ['error', 2],
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'no-undef': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'comma-dangle': 'off',
    'no-unused-expressions': 'off',
    'no-const-assign': 'error',
    'object-curly-spacing': ['error', 'always'],
    'no-mixed-spaces-and-tabs': 'error',
  },
};
