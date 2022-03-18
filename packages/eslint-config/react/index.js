module.exports = {
  extends: ['eslint-config-airbnb/rules/react']
    .map(require.resolve)
    .concat([
      'plugin:react-hooks/recommended',
      'plugin:jsx-a11y/recommended',
      '@me/eslint-config-base',
    ]),

  env: {
    browser: true,
  },

  rules: {
    // Stop import React in jsx files
    'react/react-in-jsx-scope': 'off',

    // Prefer types.
    'react/prop-types': 'off',

    // Prefer default arguments.
    'react/require-default-props': 'off',

    // allow props spreading.
    'react/jsx-props-no-spreading': 'off',

    // This is breaking a lot of my projects that use const Foo = () => {}. I
    // haven't noticed any name inference problems with that pattern, so I'll
    // leave this off for now.
    'react/function-component-definition': 'off',
  },
}
