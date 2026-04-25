import nextConfig from 'eslint-config-next';
import eslintConfigPrettier from 'eslint-config-prettier';
import importHelpers from 'eslint-plugin-import-helpers';
import eslintPluginPrettier from 'eslint-plugin-prettier';

const sourceGlobs = [
  'app/**/*.{js,jsx,ts,tsx}',
  'components/**/*.{js,jsx,ts,tsx}',
  'lib/**/*.{js,jsx,ts,tsx}',
];

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/build/**',
      '**/dist/**',
      '**/.next/**',
      '**/out/**',
      '**/coverage/**',

      '*.config.js',
      '*.config.ts',
      '*.config.mjs',
      '*.config.cjs',

      'next-env.d.ts',
      'tsconfig.tsbuildinfo',

      'app/globals.css',

      'public/**',
      'scripts/**',
      'messages/**',
      'middlewares/**',
    ],
  },
  ...nextConfig,
  eslintConfigPrettier,
  {
    name: 'portfolio/custom',
    files: sourceGlobs,
    plugins: {
      'import-helpers': importHelpers,
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'warn',

      'no-console': 'error',
      'no-undef': 'off',
      'no-unused-vars': 'off',

      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: [
            ['/^react/', '/^next/', '/^@next/'],
            '/components/',
            'module',
            '/^@shared/',
            '/absolute/',
            ['parent', 'sibling', 'index'],
          ],
          alphabetize: { order: 'asc', ignoreCase: true },
        },
      ],
    },
  },
];
