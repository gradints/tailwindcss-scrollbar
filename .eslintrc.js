module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    requireConfigFile: false,
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    // https://typescript-eslint.io/rules/no-explicit-any/
    '@typescript-eslint/no-explicit-any': 'warn',

    // https://typescript-eslint.io/rules/no-unused-vars/
    '@typescript-eslint/no-unused-vars': 'error',

    // https://typescript-eslint.io/rules/member-delimiter-style/
    '@typescript-eslint/member-delimiter-style': ['error', {
      'multiline': {
        'delimiter': 'comma', // default: 'semi'
      },
      'singleline': {
        'delimiter': 'comma', // default: 'semi'
      },
    }],

    // https://typescript-eslint.io/rules/type-annotation-spacing/
    '@typescript-eslint/type-annotation-spacing': 'error',


    // https://eslint.org/docs/latest/rules/brace-style
    'brace-style': 'warn', // [1tbs default, stroustrup, allman]

    // https://eslint.org/docs/latest/rules/comma-dangle
    'comma-dangle': ['warn', 'always-multiline'],

    // https://eslint.org/docs/latest/rules/indent
    'indent': ['warn', 2],

    // https://eslint.org/docs/latest/rules/no-unused-vars
    'no-unused-vars': 'off', // turn off when using typescript https://typescript-eslint.io/rules/no-unused-vars/

    // https://eslint.org/docs/latest/rules/quotes
    'quotes': ['warn', 'single', { avoidEscape: true }],

    // https://eslint.org/docs/latest/rules/semi
    'semi': ['warn', 'never'],

    // https://eslint.org/docs/latest/rules/array-bracket-spacing
    'array-bracket-spacing': ['warn', 'never'],

    // https://eslint.org/docs/latest/rules/comma-spacing
    'comma-spacing': ['warn', { before: false, after: true }],

    // https://eslint.org/docs/latest/rules/key-spacing
    'key-spacing': ['warn'],

    // https://eslint.org/docs/latest/rules/keyword-spacing
    'keyword-spacing': ['warn'],

    // https://eslint.org/docs/latest/rules/no-multi-spaces
    'no-multi-spaces': ['warn'],

    // https://eslint.org/docs/latest/rules/no-trailing-spaces
    'no-trailing-spaces': ['warn'],

    // https://eslint.org/docs/latest/rules/object-curly-spacing
    'object-curly-spacing': ['warn', 'always'],

    // https://eslint.org/docs/latest/rules/space-before-function-paren
    'space-before-function-paren': ['warn', 'always'],

    // https://eslint.org/docs/latest/rules/space-before-blocks
    'space-before-blocks': 'warn',

    // https://eslint.org/docs/latest/rules/space-infix-ops
    'space-infix-ops': ['warn'],

    // https://eslint.org/docs/latest/rules/space-in-parens
    'space-in-parens': ['warn', 'never'],

    // https://eslint.org/docs/latest/rules/linebreak-style
    'linebreak-style': ['off'],
  },
}
