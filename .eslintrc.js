module.exports = {
  env: {
    es6: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json'
  },
  plugins: ['@typescript-eslint', 'jest', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:import/errors',
    'plugin:import/typescript',
  ],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/explicit-function-return-type': ['error', { 'allowExpressions': true }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'variableLike',
        'format': ['PascalCase', 'camelCase', 'UPPER_CASE'],
        'leadingUnderscore': 'allow',
      },
    ],
    'no-unused-vars': 'off', // Disable base rule first
    '@typescript-eslint/no-unused-vars': [
      'error',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ],
    'prettier/prettier': ['error',
      {
        'endOfLine':'auto'
      }
    ],
    'require-atomic-updates': 'error',
    'jest/no-mocks-import': 'off',
    'jest/no-conditional-expect': 'warn',
    'import/no-extraneous-dependencies': ['error'],
    'no-restricted-imports': ['error', {
      'patterns': ['ormconfig']
    }],
  },
  overrides: [
    {
      files: ['src/migrations/*','src/seeds/*'],
      rules: {
        '@typescript-eslint/no-empty-function': 'off'
      }
    }
  ]
}
