import js from '@eslint/js';
import globals from 'globals';

/**
 * Flat config for the server workspace.
 */
export default [
  {
    ignores: ['node_modules/**'],
  },

  js.configs.recommended,

  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: globals.node,
    },
    rules: {
      // Express 5 requires the four-argument signature; `next` is required by
      // the framework even though it is unused in the error handler.
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', caughtErrors: 'none' }],
      'no-console': 'off',
      eqeqeq: ['error', 'smart'],
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
];
