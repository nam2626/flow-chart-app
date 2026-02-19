module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'eslint-config-prettier'],
  ignorePatterns: ['node_modules/', 'dist/', 'build/', 'coverage/'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
    '@typescript-eslint/naming-convention': [
      'error',
      { 'selector': 'typeLike', 'format': ['PascalCase'] },
      { 'selector': 'variableLike', 'format': ['camelCase', 'UPPER_CASE'] }
    ]
  }
};
