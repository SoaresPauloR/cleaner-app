// eslint-disable-next-line no-undef
module.exports = {
  parser: '@typescript-eslint/parser', // Define o parser do TypeScript
  extends: [
    'next',
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier', // Certifica-se de que a configuração do Prettier está sendo aplicada após todas as outras
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto', semi: true }],
    // Outras regras ESLint que você queira aplicar
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
