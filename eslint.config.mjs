import zacatl from '@sentzunhat/zacatl/eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

const projectConfigs = [
  './src/apps/frontend/tsconfig.json',
  './src/apps/backend/tsconfig.json',
]

export default [
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/coverage/**'],
  },
  ...zacatl,
  {
    files: ['src/apps/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: projectConfigs,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          noWarnOnMultipleProjects: true,
          project: projectConfigs,
        },
      },
    },
  },
  {
    files: ['src/apps/frontend/src/**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: false,
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    files: ['src/apps/frontend/vite.config.ts'],
    rules: {
      'import/no-default-export': 'off',
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
  },
]
