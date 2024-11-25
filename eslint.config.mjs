import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      '@stylistic': stylistic,
    },

    languageOptions: {
      parser: tsParser,
    },

    rules: {
      'max-lines': [
        'error',
        {
          max: 200,
          skipComments: true,
        },
      ],

      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'newline-before-return': 'error',
      curly: ['error', 'multi-line'],

      '@stylistic/quotes': [
        'error',
        'single',
        {
          avoidEscape: true,
        },
      ],

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      '@typescript-eslint/explicit-function-return-type': 'error',

      '@stylistic/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'return',
        },
      ],

      '@stylistic/arrow-parens': ['error', 'as-needed'],

      '@stylistic/indent': [
        'error',
        2,
        {
          SwitchCase: 1,
          ignoredNodes: ['ConditionalExpression', 'TemplateLiteral'],
        },
      ],

      indent: ['off'],

      'prefer-const': [
        'error',
        {
          destructuring: 'all',
        },
      ],

      '@stylistic/comma-dangle': ['error', 'always-multiline'],

      '@stylistic/no-multiple-empty-lines': [
        'error',
        {
          max: 2,
        },
      ],

      '@stylistic/semi': ['error', 'always'],
      '@stylistic/linebreak-style': ['error', 'unix'],
    },
  },
];
