import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist/**', 'node_modules/**'] },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    plugins: { vue: pluginVue },
    rules: {
      ...pluginVue.configs['flat/recommended'].rules,
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
    },
  },
  eslintConfigPrettier
);