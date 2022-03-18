module.exports = {
  extends: ['@me/eslint-config-typescript', '@me/eslint-config-react'],

  env: {
    browser: true,
  },

  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
  },

  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off',
        'no-shadow': 'off',
        'no-param-reassign': [2, { props: false }],
      },
    },
  ],
}
