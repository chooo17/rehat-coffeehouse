const nextJest = require('next/jest')
const createJestConfig = nextJest({ dir: './' })
module.exports = createJestConfig({
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  projects: [
    {
      displayName: 'dom',
      testEnvironment: 'jest-environment-jsdom',
      testMatch: ['**/__tests__/**/*.test.tsx'],
      transform: {
        '^.+\\.tsx?$': ['ts-jest', { tsconfig: { jsx: 'react-jsx', esModuleInterop: true } }],
      },
      moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
      setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    },
    {
      displayName: 'node',
      testEnvironment: 'node',
      testMatch: ['**/__tests__/api/**/*.test.ts'],
      preset: 'ts-jest',
      moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
    },
  ],
})
