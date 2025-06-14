// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  files: ['source/js/**/*.ts'],
  extends: [
    eslint.configs.recommended,
    tseslint.configs.recommended,
  ],
 })
 