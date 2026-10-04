// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettierConfig = require('eslint-config-prettier/flat');

module.exports = defineConfig([
  expoConfig,
  // Biçimlendirme kurallarını Prettier'a bırakır; ESLint ile çakışmaz.
  prettierConfig,
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always'],
    },
  },
  {
    ignores: ['dist/*', 'coverage/*', 'supabase/functions/*'],
  },
]);
