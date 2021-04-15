module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'brace-style': 'warn', // [1tbs default, stroustrup, allman]
    'comma-dangle': ['warn', 'always-multiline'],
    'indent': ['warn', 2],
    'no-unused-vars': 'warn',
    'quotes': ['warn', 'single', { avoidEscape: true }],
    'semi': ['warn', 'never'],

    'array-bracket-spacing': ['warn', 'never'],
    'comma-spacing': ['warn', { before: false, after: true }],
    'key-spacing': ['warn'],
    'keyword-spacing': ['warn'],
    'no-multi-spaces': ['warn'],
    'no-trailing-spaces': ['warn'],
    'object-curly-spacing': ['warn', 'always'],
    'space-before-function-paren': ['warn', 'always'],
    'space-before-blocks': 'warn',
    'space-infix-ops': ['warn'],
    'space-in-parens': ['warn', 'never'],
  },
}
