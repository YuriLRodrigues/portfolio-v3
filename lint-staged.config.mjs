export default {
  'app/**/*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  'components/**/*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  'lib/**/*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],

  'app/**/*.{json,css,scss,md}': ['prettier --write'],
  'components/**/*.{json,css,scss,md}': ['prettier --write'],
  'lib/**/*.{json,css,scss,md}': ['prettier --write'],

  '{eslint,commitlint,lint-staged,postcss}.config.mjs': ['prettier --write'],
  'next.config.ts': ['prettier --write'],
  'tsconfig.json': ['prettier --write'],
  'components.json': ['prettier --write'],
  'package.json': ['prettier --write'],
};
