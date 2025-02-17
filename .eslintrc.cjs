module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  // argsIgnorePattern: ['^_'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.3' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      // Node.js specific configuration
      files: ['src/api/**'], // Adjust the glob pattern to match your Node.js directory structure
      env: {
        node: true,
        browser: false,
      },
      rules: {
        // Node.js specific rules
      },
    },
    {
      files: ['*.js', '*.jsx'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
};
