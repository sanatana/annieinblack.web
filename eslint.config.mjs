import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import stylistic from '@stylistic/eslint-plugin';

const globalsFix = {
  ...globals.browser,
  AudioWorkletGlobalScope: globals['AudioWorkletGlobalScope '],
};

// eslint complains about space!!!!
delete globalsFix['AudioWorkletGlobalScope '];

export default [
  { ignores: ['dist', '.yarn', 'node_modules'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globalsFix,
        ...globals.jest,
        process: 'readonly',
        AudioWorkletGlobalScope: null,
      },
      parserOptions: {
        ecmaVersion: 2022,
        ecmaFeatures: { jsx: true },
        sourceType: 'module'
      }
    },
    plugins: {
      react,
      '@stylistic': stylistic,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        "typescript": {},
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules', 'src'], // ✅ This ensures folders with index.js are recognized
        },
      },
    },

    rules: {
      // Recommended JavaScript rules from ESLint
      ...js.configs.recommended.rules,

      // React rules
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      // Import rules
      ...importPlugin.configs.recommended.rules,

      // Accessibility rules for JSX
      ...jsxA11y.configs.recommended.rules,
      'no-restricted-imports': [
        'error',
        {
          patterns: ['*/index.js', '*/index.jsx'],
        },
      ],

      'no-multiple-empty-lines': [
        'error',
        {
          'max': 1, // Allow at most 1 empty line
        }
      ],
      'object-curly-newline': ['error', { consistent: true }],
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
      'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.js'] }],
      'react/jsx-props-no-spreading': 'error',
      'react/react-in-jsx-scope': 'off', // Not needed with React 17+ (since JSX transform is enabled)
      'import/prefer-default-export': 'off',
      'react/prop-types': ['error', { skipUndeclared: false }],
      'react/display-name': 0,
      'no-undef': 'error',
      'no-console': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      '@stylistic/indent': ['error', 2],
      'object-curly-spacing': ['error', 'always'],
      'semi': ['error', 'always'],
      'no-shadow': ['error'],
      'no-case-declarations': 'error',
      'curly': ['error', 'all'],
      'block-spacing': ['error', 'always'],
      'import/no-useless-path-segments': [
        'error',
        {
          noUselessIndex: true,
        },
      ],
      'import/extensions': [
        'error',
        'never', // This setting enforces not to use file extensions in imports.
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'react/jsx-curly-spacing': [
        2,
        {
          'when': 'always',
          'spacing': {
            'objectLiterals': 'never'
          },
          'children': true
        }
      ],
    }
  }
];
