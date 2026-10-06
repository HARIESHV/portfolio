import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

/**
 * Flat config for the client workspace.
 *
 * React 19 with the automatic JSX runtime, so no `React` import is required in
 * any component and the `react/*` lint rules that expect the legacy import are
 * deliberately omitted.
 */
export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'src/data/generated/**'],
  },

  js.configs.recommended,

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // Without this, a variable used only as a JSX element (`motion.div`,
      // `Icon`) is reported as unused by the core rule.
      'react/jsx-uses-vars': 'error',

      ...reactHooks.configs.recommended.rules,

      // Fast Refresh only needs to keep component exports in their own module.
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Unused args prefixed with _ are intentional (catch-all params, etc).
      'no-unused-vars': [
        'error',
        { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_', caughtErrors: 'none' },
      ],

      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'smart'],
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },

  {
    // Build-time Node scripts, not browser code.
    files: ['scripts/**/*.mjs', 'vite.config.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
];
