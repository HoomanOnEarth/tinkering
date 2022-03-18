module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', '@me/eslint-config-base'],

  parser: '@typescript-eslint/parser',

  plugins: ['@typescript-eslint'],

  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },

    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },

  rules: {
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-empty-function': 'off',
  },

  overrides: [
    {
      files: ['*.ts'],
      rules: {
        'no-undef': 'off',
        'no-shadow': 'off',
      },
    },
  ],
}
