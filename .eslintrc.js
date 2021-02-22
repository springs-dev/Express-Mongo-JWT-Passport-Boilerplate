/* eslint-disable global-require */
module.exports = {
  extends: ['plugin:node/recommended', 'plugin:prettier/recommended', 'airbnb-base'],
  env: {
    es6: true,
    commonjs: true,
    node: true,
  },
  plugins: ['prettier'],
  parserOptions: {
    ecmaFeatures: {
      ecmaVersion: 6,
      sourceType: 'module',
      impliedStrict: true,
    },
  },
  rules: {
    'import/prefer-default-export': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'consistent-return': 0,
    complexity: [2, { max: 8 }],
    'max-depth': [2, { max: 4 }],
    'node/exports-style': [2, 'module.exports'],
    'node/file-extension-in-import': [2, 'never'],
    'prettier/prettier': ['error', require('./.prettierrc.js')],
    'func-names': ['error', 'never'],
    semi: ['error', 'never'],
    'no-plusplus': 'off',
    'no-bitwise': 'off',
    'no-console': 'off',
    'max-len': [1, 120],
  },
}
