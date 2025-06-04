import stylistic from '@stylistic/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.js', '**/*.ts', '*.mjs'],
    plugins: {
      '@stylistic': stylistic,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      '@stylistic/comma-spacing': 'error',
      '@stylistic/indent': ['error', 2],
      'eqeqeq': 'error',
      '@stylistic/block-spacing': 'error',
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/arrow-spacing': 'error',
      '@stylistic/keyword-spacing': ['error', { before: true }],
    },
  },
];
